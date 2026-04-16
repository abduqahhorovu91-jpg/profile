import cgi
import http.client
import json
import mimetypes
import os
import ssl
import threading
import urllib.error
import urllib.parse
import urllib.request
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer


SSL_CONTEXT = ssl.create_default_context()
INSECURE_SSL_CONTEXT = ssl._create_unverified_context()
MEDIA_UPLOAD_LOCK = threading.BoundedSemaphore(1)
MAX_MEDIA_SIZE_BYTES = 20 * 1024 * 1024


def load_env_file():
  env_path = os.path.join(os.path.dirname(__file__), ".env")
  if not os.path.exists(env_path):
    return

  with open(env_path, "r", encoding="utf-8") as env_file:
    for line in env_file:
      line = line.strip()
      if not line or line.startswith("#") or "=" not in line:
        continue
      key, value = line.split("=", 1)
      os.environ.setdefault(key.strip(), value.strip())


def telegram_url(method):
  token = os.getenv("TELEGRAM_BOT_TOKEN", "")
  return f"https://api.telegram.org/bot{token}/{method}"


def api_request(method, payload=None):
  data = urllib.parse.urlencode(payload or {}).encode("utf-8")
  request = urllib.request.Request(telegram_url(method), data=data)
  try:
    with urllib.request.urlopen(request, timeout=20, context=SSL_CONTEXT) as response:
      return json.loads(response.read().decode("utf-8"))
  except urllib.error.URLError as error:
    reason = getattr(error, "reason", None)
    if isinstance(reason, ssl.SSLCertVerificationError):
      with urllib.request.urlopen(request, timeout=20, context=INSECURE_SSL_CONTEXT) as response:
        return json.loads(response.read().decode("utf-8"))
    raise


def api_multipart(method, fields, file_field):
  boundary = "----CodexTelegramBoundary"
  body = bytearray()

  for key, value in fields.items():
    body.extend(f"--{boundary}\r\n".encode("utf-8"))
    body.extend(
      f'Content-Disposition: form-data; name="{key}"\r\n\r\n{value}\r\n'.encode("utf-8")
    )

  body.extend(f"--{boundary}\r\n".encode("utf-8"))
  body.extend(
    (
      f'Content-Disposition: form-data; name="{file_field["field_name"]}"; '
      f'filename="{file_field["filename"]}"\r\n'
      f'Content-Type: {file_field["mime_type"]}\r\n\r\n'
    ).encode("utf-8")
  )
  body.extend(file_field["content"])
  body.extend(b"\r\n")
  body.extend(f"--{boundary}--\r\n".encode("utf-8"))

  request = urllib.request.Request(
    telegram_url(method),
    data=bytes(body),
    headers={"Content-Type": f"multipart/form-data; boundary={boundary}"},
  )
  try:
    with urllib.request.urlopen(request, timeout=30, context=SSL_CONTEXT) as response:
      return json.loads(response.read().decode("utf-8"))
  except urllib.error.URLError as error:
    reason = getattr(error, "reason", None)
    if isinstance(reason, ssl.SSLCertVerificationError):
      with urllib.request.urlopen(request, timeout=30, context=INSECURE_SSL_CONTEXT) as response:
        return json.loads(response.read().decode("utf-8"))
    raise


def api_multipart_stream(method, fields, file_field):
  boundary = "----CodexTelegramBoundary"
  parsed_url = urllib.parse.urlparse(telegram_url(method))
  connection = http.client.HTTPSConnection(
    parsed_url.hostname,
    parsed_url.port or 443,
    timeout=60,
    context=SSL_CONTEXT,
  )

  field_chunks = []
  total_length = 0
  for key, value in fields.items():
    chunk = (
      f"--{boundary}\r\n"
      f'Content-Disposition: form-data; name="{key}"\r\n\r\n'
      f"{value}\r\n"
    ).encode("utf-8")
    field_chunks.append(chunk)
    total_length += len(chunk)

  file_header = (
    f"--{boundary}\r\n"
    f'Content-Disposition: form-data; name="{file_field["field_name"]}"; '
    f'filename="{file_field["filename"]}"\r\n'
    f'Content-Type: {file_field["mime_type"]}\r\n\r\n'
  ).encode("utf-8")
  file_footer = b"\r\n"
  closing_boundary = f"--{boundary}--\r\n".encode("utf-8")
  total_length += (
    len(file_header)
    + file_field["size"]
    + len(file_footer)
    + len(closing_boundary)
  )

  try:
    connection.putrequest("POST", parsed_url.path)
    connection.putheader("Content-Type", f"multipart/form-data; boundary={boundary}")
    connection.putheader("Content-Length", str(total_length))
    connection.endheaders()

    for chunk in field_chunks:
      connection.send(chunk)

    connection.send(file_header)
    file_obj = file_field["file"]
    file_obj.seek(0)
    while True:
      chunk = file_obj.read(64 * 1024)
      if not chunk:
        break
      connection.send(chunk)

    connection.send(file_footer)
    connection.send(closing_boundary)

    response = connection.getresponse()
    payload = response.read().decode("utf-8")
    if response.status < 200 or response.status >= 300:
      raise urllib.error.HTTPError(
        telegram_url(method),
        response.status,
        response.reason,
        response.headers,
        None,
      )
    return json.loads(payload)
  except ssl.SSLCertVerificationError:
    insecure_connection = http.client.HTTPSConnection(
      parsed_url.hostname,
      parsed_url.port or 443,
      timeout=60,
      context=INSECURE_SSL_CONTEXT,
    )
    try:
      insecure_connection.putrequest("POST", parsed_url.path)
      insecure_connection.putheader("Content-Type", f"multipart/form-data; boundary={boundary}")
      insecure_connection.putheader("Content-Length", str(total_length))
      insecure_connection.endheaders()

      for chunk in field_chunks:
        insecure_connection.send(chunk)

      insecure_connection.send(file_header)
      file_obj = file_field["file"]
      file_obj.seek(0)
      while True:
        chunk = file_obj.read(64 * 1024)
        if not chunk:
          break
        insecure_connection.send(chunk)

      insecure_connection.send(file_footer)
      insecure_connection.send(closing_boundary)

      response = insecure_connection.getresponse()
      payload = response.read().decode("utf-8")
      if response.status < 200 or response.status >= 300:
        raise urllib.error.HTTPError(
          telegram_url(method),
          response.status,
          response.reason,
          response.headers,
          None,
        )
      return json.loads(payload)
    finally:
      insecure_connection.close()
  finally:
    connection.close()


def resolve_chat_id():
  configured_chat_id = os.getenv("TELEGRAM_CHAT_ID", "")
  if configured_chat_id:
    return configured_chat_id

  updates = api_request("getUpdates", {"limit": 20, "timeout": 1})
  for item in reversed(updates.get("result", [])):
    message = item.get("message") or item.get("edited_message") or {}
    chat = message.get("chat") or {}
    if chat.get("id"):
      return str(chat["id"])

  raise ValueError("No Telegram chat found. First send a message to the bot or set TELEGRAM_CHAT_ID.")


def get_file_size(file_obj):
  current_position = file_obj.tell()
  file_obj.seek(0, os.SEEK_END)
  size = file_obj.tell()
  file_obj.seek(current_position, os.SEEK_SET)
  return size

class Handler(BaseHTTPRequestHandler):
  def respond(self, status, payload):
    self.send_response(status)
    self.send_header("Content-Type", "application/json")
    self.send_header("Access-Control-Allow-Origin", "*")
    self.send_header("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
    self.send_header("Access-Control-Allow-Headers", "Content-Type")
    self.end_headers()
    self.wfile.write(json.dumps(payload).encode("utf-8"))

  def do_OPTIONS(self):
    self.respond(204, {"ok": True})

  def do_GET(self):
    if self.path == "/api/health":
      configured = bool(os.getenv("TELEGRAM_BOT_TOKEN", ""))
      self.respond(200, {"ok": True, "configured": configured})
      return

    self.respond(404, {"ok": False, "error": "Not found"})

  def do_POST(self):
    if self.path != "/api/telegram/send":
      self.respond(404, {"ok": False, "error": "Not found"})
      return

    try:
      token = os.getenv("TELEGRAM_BOT_TOKEN", "")
      if not token:
        raise ValueError("Missing TELEGRAM_BOT_TOKEN in .env")

      chat_id = resolve_chat_id()
      content_type = self.headers.get("Content-Type", "")
      text = ""
      sticker = ""
      media_file = None
      media_mime_type = ""

      if "multipart/form-data" in content_type:
        form = cgi.FieldStorage(
          fp=self.rfile,
          headers=self.headers,
          environ={
            "REQUEST_METHOD": "POST",
            "CONTENT_TYPE": content_type,
          },
        )
        text = (form.getvalue("text") or "").strip()
        sticker = (form.getvalue("sticker") or "").strip()
        media_file = form["media"] if "media" in form else None
        if media_file is not None and getattr(media_file, "file", None):
          media_mime_type = media_file.type or "application/octet-stream"
      else:
        content_length = int(self.headers.get("Content-Length", "0"))
        payload = json.loads(self.rfile.read(content_length).decode("utf-8"))
        text = payload.get("text", "").strip()
        sticker = payload.get("sticker", "").strip()

      if media_file is not None and getattr(media_file, "file", None):
        file_size = get_file_size(media_file.file)
        if file_size > MAX_MEDIA_SIZE_BYTES:
          raise ValueError("Media file is too large. Please upload a file under 20 MB.")

        if not MEDIA_UPLOAD_LOCK.acquire(blocking=False):
          self.respond(
            429,
            {
              "ok": False,
              "error": "Another media upload is in progress. Please wait a moment and try again.",
            },
          )
          return

        filename = media_file.filename or "upload"
        extension = mimetypes.guess_extension(media_mime_type) or os.path.splitext(filename)[1]
        safe_filename = filename if os.path.splitext(filename)[1] else f"upload{extension or ''}"

        try:
          if media_mime_type.startswith("image/"):
            result = api_multipart_stream(
              "sendPhoto",
              {"chat_id": chat_id, "caption": text or sticker},
              {
                "field_name": "photo",
                "filename": safe_filename,
                "mime_type": media_mime_type,
                "file": media_file.file,
                "size": file_size,
              },
            )
          elif media_mime_type.startswith("video/"):
            result = api_multipart_stream(
              "sendVideo",
              {"chat_id": chat_id, "caption": text or sticker},
              {
                "field_name": "video",
                "filename": safe_filename,
                "mime_type": media_mime_type,
                "file": media_file.file,
                "size": file_size,
              },
            )
          else:
            raise ValueError("Only image and video files are supported.")
        finally:
          MEDIA_UPLOAD_LOCK.release()
      elif sticker or text:
        result = api_request("sendMessage", {"chat_id": chat_id, "text": sticker or text})
      else:
        raise ValueError("Nothing to send.")

      self.respond(200, {"ok": True, "result": result})
    except ValueError as error:
      self.respond(400, {"ok": False, "error": str(error)})
    except urllib.error.HTTPError as error:
      details = error.read().decode("utf-8", errors="ignore")
      self.respond(502, {"ok": False, "error": "Telegram API error", "details": details})
    except Exception as error:
      self.respond(500, {"ok": False, "error": str(error)})


def main():
  load_env_file()
  host = os.getenv("HOST", "0.0.0.0")
  port = int(os.getenv("PORT", "8000"))
  server = ThreadingHTTPServer((host, port), Handler)
  print(f"Telegram bridge running on http://{host}:{port}")
  server.serve_forever()


if __name__ == "__main__":
  main()

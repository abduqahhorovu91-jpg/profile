import { useRef, useState } from "react";
import PageTransition from "../components/common/PageTransition";

function getTelegramApiUrl() {
  const configuredBaseUrl = import.meta.env.VITE_API_BASE_URL?.trim();
  const apiPath = "/api/telegram/send";

  if (configuredBaseUrl) {
    return `${configuredBaseUrl.replace(/\/$/, "")}${apiPath}`;
  }

  if (import.meta.env.DEV) {
    return apiPath;
  }

  return `${window.location.protocol}//${window.location.hostname}:8000${apiPath}`;
}

function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    comment: "",
  });
  const [selectedMediaName, setSelectedMediaName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const activeRequestRef = useRef(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    const mediaFile = event.currentTarget.media.files[0];

    const text = [
      "New contact message",
      `Name: ${formData.name.trim()}`,
      `Comment: ${formData.comment.trim()}`,
    ].join("\n");

    try {
      const requestData = new FormData();
      requestData.append("text", text);
      if (mediaFile) {
        requestData.append("media", mediaFile);
      }

      const data = await new Promise((resolve, reject) => {
        const request = new XMLHttpRequest();
        activeRequestRef.current = request;
        request.open("POST", getTelegramApiUrl());

        request.upload.onprogress = (progressEvent) => {
          if (!progressEvent.lengthComputable) {
            return;
          }
        };

        request.onload = () => {
          if (request.status < 200 || request.status >= 300) {
            try {
              const errorPayload = JSON.parse(request.responseText);
              reject(new Error(errorPayload.error || "Message could not be sent."));
            } catch {
              reject(new Error("Message could not be sent."));
            }
            return;
          }

          try {
            resolve(JSON.parse(request.responseText));
          } catch {
            reject(new Error("Invalid server response."));
          }
        };

        request.onerror = () => reject(new Error("Message could not be sent."));
        request.onabort = () => reject(new Error("Message sending was cancelled."));
        request.send(requestData);
      });

      if (!data.ok) {
        throw new Error(data.error || "Failed to send message.");
      }
      setFormData({
        name: "",
        comment: "",
      });
      setSelectedMediaName("");
      event.currentTarget.reset();
    } catch (error) {
      console.error(error);
    } finally {
      activeRequestRef.current = null;
      setIsSubmitting(false);
    }
  };

  return (
    <PageTransition>
      <section className="relative flex min-h-[70vh] items-start justify-center px-2 pt-6 pb-12">
        <div className="w-full max-w-md rounded-[22px] bg-[#64ffda] p-[1px] transition duration-300 hover:shadow-[0_0_30px_1px_rgba(100,255,218,0.3)]">
          <div className="transition duration-200 hover:scale-[0.98] hover:rounded-[20px]">
            <form
              className="flex flex-col gap-2.5 rounded-[20px] bg-[#171717] px-8 pt-4 pb-2"
              onSubmit={handleSubmit}
            >
              <p className="my-8 self-center text-center text-[1.2em] text-[#64ffda]">
                Adminga habar yo'lang 🖋️
              </p>

              <div className="flex items-center justify-center rounded-[10px] bg-[#171717] px-3 py-2.5 shadow-[inset_2px_5px_10px_rgb(5,5,5)]">
                <input
                  required
                  name="name"
                  placeholder="Name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-transparent px-4 text-[#ccd6f6] outline-none placeholder:text-[#ccd6f6]/70"
                />
              </div>

              <div className="flex items-center justify-center rounded-[10px] bg-[#171717] px-3 py-2.5 shadow-[inset_2px_5px_10px_rgb(5,5,5)]">
                <textarea
                  required
                  name="comment"
                  placeholder="Comment"
                  rows="3"
                  value={formData.comment}
                  onChange={handleChange}
                  className="w-full resize-none bg-transparent px-4 text-[#ccd6f6] outline-none placeholder:text-[#ccd6f6]/70"
                />
              </div>

              <label className="flex cursor-pointer items-center justify-between rounded-[10px] border border-[#64ffda]/60 bg-[#171717] px-4 py-3 text-[#ccd6f6] transition hover:border-[#64ffda]">
                <span className={selectedMediaName ? "text-[#ccd6f6]" : "text-[#ccd6f6]/70"}>
                  {selectedMediaName || "Rasm yoki video yuklang"}
                </span>
                <span className="font-semibold text-[#64ffda]">Choose File</span>
                <input
                  accept="image/*,video/*"
                  className="hidden"
                  name="media"
                  type="file"
                  onChange={(event) =>
                    setSelectedMediaName(event.target.files?.[0]?.name || "")
                  }
                />
              </label>

              <button
                className="mb-12 cursor-pointer rounded-[10px] bg-transparent p-4 font-bold text-[#64ffda] outline outline-1 outline-[#64ffda] transition duration-300 hover:bg-[#64ffda] hover:text-black hover:shadow-[inset_2px_5px_10px_rgb(5,5,5)]"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </section>
    </PageTransition>
  );
}

export default ContactPage;

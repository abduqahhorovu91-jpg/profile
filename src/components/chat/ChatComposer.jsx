import { Send } from "lucide-react";
import { useState } from "react";

function ChatComposer({ onSend }) {
  const [value, setValue] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!value.trim()) return;
    onSend(value.trim());
    setValue("");
  };

  return (
    <form onSubmit={handleSubmit} className="glass-panel mt-4 flex items-center gap-3 rounded-[28px] p-3">
      <input
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder="Send a project brief..."
        className="h-11 flex-1 bg-transparent px-2 text-sm outline-none placeholder:text-muted"
      />
      <button
        type="submit"
        className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white text-app transition hover:scale-95"
      >
        <Send size={18} />
      </button>
    </form>
  );
}

export default ChatComposer;

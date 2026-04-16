import { Grid2x2, Rows3 } from "lucide-react";

function ViewToggle({ mode, onChange }) {
  return (
    <div className="glass-panel inline-flex rounded-full p-1">
      <button
        onClick={() => onChange("grid")}
        className={`rounded-full px-3 py-2 ${mode === "grid" ? "bg-white text-app" : "text-muted"}`}
      >
        <Grid2x2 size={16} />
      </button>
      <button
        onClick={() => onChange("list")}
        className={`rounded-full px-3 py-2 ${mode === "list" ? "bg-white text-app" : "text-muted"}`}
      >
        <Rows3 size={16} />
      </button>
    </div>
  );
}

export default ViewToggle;

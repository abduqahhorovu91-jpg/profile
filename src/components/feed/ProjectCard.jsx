import { motion } from "framer-motion";
import { Bookmark, Heart, MessageCircle, Send, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { revealSoft } from "../../lib/motion";
import { formatCompactNumber } from "../../lib/utils";
import { usePortfolioStore } from "../../store/usePortfolioStore";
import LazyMedia from "../common/LazyMedia";

function ProjectCard({ project }) {
  const savedIds = usePortfolioStore((state) => state.savedIds);
  const toggleSaved = usePortfolioStore((state) => state.toggleSaved);
  const isSaved = savedIds.includes(project.id);

  const handleSave = () => {
    toggleSaved(project.id);
    toast(isSaved ? "Removed from your playlist" : "Saved to your playlist");
  };

  return (
    <motion.article
      layout
      {...revealSoft}
      whileHover={{ y: -8, scale: 1.01 }}
      transition={{ type: "spring", stiffness: 180, damping: 22 }}
      className="glass-panel surface-highlight overflow-hidden rounded-[30px] p-3"
    >
      <Link to={`/project/${project.id}`} className="block">
        <div className="relative mb-3 overflow-hidden rounded-[26px]">
          <div
            className={`absolute inset-0 z-10 bg-gradient-to-br ${project.accent} mix-blend-screen opacity-70`}
          />
          <motion.div whileHover={{ scale: 1.035 }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}>
            <LazyMedia src={project.thumbnail} alt={project.title} className="h-72 w-full" />
          </motion.div>
          <div className="absolute inset-x-3 top-3 z-20 flex items-center justify-between">
            <span className="rounded-full border border-white/10 bg-black/25 px-3 py-1 text-[11px] uppercase tracking-[0.25em] text-white/85 backdrop-blur-md">
              Featured Build
            </span>
            <div className="rounded-full border border-white/10 bg-black/25 p-2 text-white/85 backdrop-blur-md">
              <Sparkles size={14} />
            </div>
          </div>
        </div>
      </Link>

      <div className="px-1">
        <div className="mb-2 flex items-start justify-between gap-3">
          <div>
            <h3 className="text-lg font-semibold">{project.title}</h3>
            <p className="mt-1 text-sm leading-6 text-muted">{project.shortDescription}</p>
          </div>
          <div className="rounded-2xl bg-white/6 px-3 py-2 text-right text-[11px] text-muted">
            <div>{formatCompactNumber(project.views)} views</div>
            <div>{formatCompactNumber(project.likes)} likes</div>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button className="glass-panel rounded-full p-2.5 text-white transition hover:text-rose-300">
              <Heart size={18} />
            </button>
            <button className="glass-panel rounded-full p-2.5 text-white transition hover:text-cyan-300">
              <MessageCircle size={18} />
            </button>
            <button className="glass-panel rounded-full p-2.5 text-white transition hover:text-violet-300">
              <Send size={18} />
            </button>
          </div>

          <button
            onClick={handleSave}
            className={`rounded-full p-2.5 transition ${
              isSaved ? "bg-white text-app" : "glass-panel text-white"
            }`}
          >
            <Bookmark size={18} fill={isSaved ? "currentColor" : "none"} />
          </button>
        </div>
      </div>
    </motion.article>
  );
}

export default ProjectCard;

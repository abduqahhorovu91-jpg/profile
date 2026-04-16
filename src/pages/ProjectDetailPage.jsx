import { motion } from "framer-motion";
import { ArrowUpRight, Bookmark, Github, MessageCircleMore } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { toast } from "sonner";
import LazyMedia from "../components/common/LazyMedia";
import PageTransition from "../components/common/PageTransition";
import { usePortfolioStore } from "../store/usePortfolioStore";

const comments = [
  { id: "c1", author: "Maya", text: "This visual direction feels incredibly polished.", time: "2h" },
  { id: "c2", author: "Jon", text: "Would love to see the onboarding flow next.", time: "5h" },
  { id: "c3", author: "Sana", text: "The motion and hierarchy are excellent.", time: "1d" },
];

function ProjectDetailPage() {
  const { projectId } = useParams();
  const projects = usePortfolioStore((state) => state.projects);
  const savedIds = usePortfolioStore((state) => state.savedIds);
  const toggleSaved = usePortfolioStore((state) => state.toggleSaved);
  const project = projects.find((item) => item.id === projectId) ?? projects[0];
  const isSaved = savedIds.includes(project.id);

  return (
    <PageTransition>
      <div className="glass-panel overflow-hidden rounded-[32px] p-3 md:p-5">
        <div className="relative mb-5 overflow-hidden rounded-[28px]">
          <div className={`absolute inset-0 z-10 bg-gradient-to-br ${project.accent} opacity-70`} />
          <LazyMedia src={project.thumbnail} alt={project.title} className="h-[24rem] w-full md:h-[32rem]" />
          <Link
            to="/"
            className="absolute left-3 top-3 z-20 rounded-full border border-white/10 bg-black/30 px-4 py-2 text-xs uppercase tracking-[0.3em] text-white/85 backdrop-blur-md"
          >
            Back
          </Link>
        </div>

        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="max-w-2xl">
            <p className="mb-2 text-[11px] uppercase tracking-[0.3em] text-cyan-200">Case Study</p>
            <h2 className="font-display text-3xl font-bold md:text-5xl">{project.title}</h2>
            <p className="mt-3 text-sm leading-7 text-muted md:text-base">{project.description}</p>
          </div>

          <button
            onClick={() => {
              toggleSaved(project.id);
              toast(isSaved ? "Removed from saved projects" : "Saved project");
            }}
            className={`rounded-full px-4 py-3 text-sm font-medium ${
              isSaved ? "bg-white text-app" : "glass-panel"
            }`}
          >
            <span className="inline-flex items-center gap-2">
              <Bookmark size={16} fill={isSaved ? "currentColor" : "none"} />
              {isSaved ? "Saved" : "Save Project"}
            </span>
          </button>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {project.tech.map((item) => (
            <span
              key={item}
              className="rounded-full border border-white/10 bg-white/6 px-3 py-2 text-xs text-white/90"
            >
              {item}
            </span>
          ))}
        </div>

        <div className="mt-5 grid gap-3 md:grid-cols-[1fr_0.9fr]">
          <div className="grid grid-cols-2 gap-3">
            <a
              href={project.demoUrl}
              className="rounded-[24px] bg-white px-4 py-4 text-sm font-semibold text-app"
            >
              <span className="inline-flex items-center gap-2">
                Live Demo
                <ArrowUpRight size={16} />
              </span>
            </a>
            <a
              href={project.githubUrl}
              className="glass-panel rounded-[24px] px-4 py-4 text-sm font-semibold"
            >
              <span className="inline-flex items-center gap-2">
                GitHub
                <Github size={16} />
              </span>
            </a>
          </div>

          <div className="glass-panel rounded-[24px] p-4">
            <div className="mb-3 flex items-center gap-2 text-sm font-semibold">
              <MessageCircleMore size={16} className="text-accent" />
              Comments
            </div>
            <div className="space-y-3">
              {comments.map((comment) => (
                <motion.div
                  key={comment.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-[20px] bg-white/6 p-3"
                >
                  <div className="mb-1 flex items-center justify-between text-xs">
                    <span className="font-semibold text-white">{comment.author}</span>
                    <span className="text-muted">{comment.time}</span>
                  </div>
                  <p className="text-sm text-white/85">{comment.text}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}

export default ProjectDetailPage;

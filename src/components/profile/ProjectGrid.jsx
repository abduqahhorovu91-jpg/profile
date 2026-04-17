import { AnimatePresence, motion } from "framer-motion";
import { Eye, Play, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { profileVideos } from "../../data/profileVideos";
import { revealSoft, staggerItem, staggerParent } from "../../lib/motion";
import LazyMedia from "../common/LazyMedia";

function ProjectGrid({ projects }) {
  const [activeVideo, setActiveVideo] = useState(null);

  useEffect(() => {
    if (!activeVideo) {
      return undefined;
    }

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setActiveVideo(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeVideo]);

  if (profileVideos.length > 0) {
    return (
      <>
        <motion.div
          className="grid grid-cols-3 gap-[2px] overflow-hidden rounded-[24px] bg-white/6 md:gap-[3px]"
          variants={staggerParent}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.12 }}
        >
          {profileVideos.map((video) => (
            <motion.button
              key={video.id}
              type="button"
              onClick={() => setActiveVideo(video)}
              className="group relative aspect-[0.72] overflow-hidden bg-black text-left"
              variants={staggerItem}
              whileHover={{ y: -6, scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
            >
              {video.kind === "local" ? (
                <video
                  src={video.src}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="metadata"
                />
              ) : (
                <div className="h-full w-full bg-[radial-gradient(circle_at_top,#1a2748_0%,#07090f_55%,#000_100%)]">
                  {video.cover ? (
                    <img
                      src={video.cover}
                      alt={video.alt}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                      loading="lazy"
                    />
                  ) : null}
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/15" />
              <motion.div
                className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-white text-black shadow-[0_6px_20px_rgba(255,255,255,0.25)]"
                animate={{ scale: [1, 1.08, 1] }}
                transition={{ duration: 2.6, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
              >
                <Play size={14} className="translate-x-[1px] fill-current" />
              </motion.div>
              <div className="absolute bottom-2 left-2 flex items-center gap-1.5 text-sm font-semibold text-white">
                <Eye size={14} />
                <span>{video.views}</span>
              </div>
            </motion.button>
          ))}
        </motion.div>

        <AnimatePresence>
          {activeVideo ? (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 px-3 py-6 backdrop-blur-sm"
              onClick={() => setActiveVideo(null)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="relative w-full max-w-[28rem] overflow-hidden rounded-[28px] border border-white/10 bg-[#05070d] shadow-2xl"
                onClick={(event) => event.stopPropagation()}
                initial={{ opacity: 0, y: 32, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 18, scale: 0.98 }}
                transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
              >
                <button
                  type="button"
                  aria-label="Close video"
                  className="absolute right-3 top-3 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-black/55 text-white"
                  onClick={() => setActiveVideo(null)}
                >
                  <X size={18} />
                </button>

                <motion.div className="aspect-[9/16] w-full bg-black" {...revealSoft}>
                  {activeVideo.kind === "local" ? (
                    <video
                      src={activeVideo.src}
                      className="h-full w-full object-contain"
                      controls
                      autoPlay
                      playsInline
                    />
                  ) : (
                    <iframe
                      title={activeVideo.alt}
                      src={activeVideo.embedUrl}
                      className="h-full w-full border-0"
                      allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                      allowFullScreen
                    />
                  )}
                </motion.div>
              </motion.div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </>
    );
  }

  return (
    <motion.div
      className="grid grid-cols-3 gap-2 md:gap-3"
      variants={staggerParent}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.12 }}
    >
      {projects.map((project) => (
        <motion.div key={project.id} variants={staggerItem}>
          <Link
            to={`/project/${project.id}`}
            className="group relative block aspect-square overflow-hidden rounded-[22px]"
          >
            <div className={`absolute inset-0 z-10 bg-gradient-to-t ${project.accent} opacity-70`} />
            <LazyMedia src={project.thumbnail} alt={project.title} className="h-full w-full" />
            <div className="absolute inset-x-0 bottom-0 z-20 p-2">
              <div className="text-xs font-medium text-white">{project.title}</div>
            </div>
          </Link>
        </motion.div>
      ))}
    </motion.div>
  );
}

export default ProjectGrid;

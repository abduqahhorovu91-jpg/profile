import { Eye, Play } from "lucide-react";
import { Link } from "react-router-dom";
import LazyMedia from "../common/LazyMedia";
import { profileVideos } from "../../data/profileVideos";

function ProjectGrid({ projects }) {
  if (profileVideos.length > 0) {
    return (
      <div className="grid grid-cols-3 gap-[2px] overflow-hidden rounded-[24px] bg-white/6 md:gap-[3px]">
        {profileVideos.map((video) => (
          <a
            key={video.id}
            href={video.href}
            target="_blank"
            rel="noreferrer"
            className="group relative aspect-[0.72] overflow-hidden bg-black"
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
            <div className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-white text-black shadow-[0_6px_20px_rgba(255,255,255,0.25)]">
              <Play size={14} className="translate-x-[1px] fill-current" />
            </div>
            <div className="absolute bottom-2 left-2 flex items-center gap-1.5 text-sm font-semibold text-white">
              <Eye size={14} />
              <span>{video.views}</span>
            </div>
          </a>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-2 md:gap-3">
      {projects.map((project) => (
        <Link
          key={project.id}
          to={`/project/${project.id}`}
          className="group relative aspect-square overflow-hidden rounded-[22px]"
        >
          <div className={`absolute inset-0 z-10 bg-gradient-to-t ${project.accent} opacity-70`} />
          <LazyMedia src={project.thumbnail} alt={project.title} className="h-full w-full" />
          <div className="absolute inset-x-0 bottom-0 z-20 p-2">
            <div className="text-xs font-medium text-white">{project.title}</div>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default ProjectGrid;

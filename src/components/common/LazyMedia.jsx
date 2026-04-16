import { useState } from "react";
import { cn } from "../../lib/utils";

function LazyMedia({ src, alt, className }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={cn("relative overflow-hidden", className)}>
      {!loaded ? <div className="absolute inset-0 animate-pulse bg-white/8" /> : null}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        className={cn(
          "h-full w-full object-cover transition duration-700",
          loaded ? "scale-100 opacity-100" : "scale-105 opacity-0",
        )}
      />
    </div>
  );
}

export default LazyMedia;

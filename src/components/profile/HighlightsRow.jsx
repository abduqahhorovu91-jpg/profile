import { useEffect, useMemo, useRef, useState } from "react";
import { profile } from "../../data/projects";
import { usePortfolioStore } from "../../store/usePortfolioStore";

function HighlightsRow() {
  const [activeHighlight, setActiveHighlight] = useState(null);
  const [activeReelIndex, setActiveReelIndex] = useState(0);
  const highlightOrder = profile.highlights;
  const setOverlayOpen = usePortfolioStore((state) => state.setOverlayOpen);
  const preloadRefs = useRef([]);
  const allReels = useMemo(
    () => profile.highlights.flatMap((item) => item.reels ?? []),
    [],
  );

  const openHighlight = (item) => {
    setActiveHighlight(item);
    setActiveReelIndex(0);
    setOverlayOpen(true);
  };

  const showPreviousReel = () => {
    if (!activeHighlight?.reels?.length) {
      return;
    }

    setActiveReelIndex((current) =>
      current === 0 ? activeHighlight.reels.length - 1 : current - 1,
    );
  };

  const showNextReel = () => {
    if (!activeHighlight?.reels?.length) {
      return;
    }

    setActiveReelIndex((current) =>
      current === activeHighlight.reels.length - 1 ? 0 : current + 1,
    );
  };

  const handleVideoEnded = () => {
    if (!activeHighlight?.reels?.length) {
      return;
    }

    const isLastReel = activeReelIndex === activeHighlight.reels.length - 1;
    if (!isLastReel) {
      setActiveReelIndex((current) => current + 1);
      return;
    }

    const currentHighlightIndex = highlightOrder.findIndex(
      (item) => item.id === activeHighlight.id,
    );
    const nextHighlight = highlightOrder[currentHighlightIndex + 1];

    if (nextHighlight?.reels?.length) {
      setActiveHighlight(nextHighlight);
      setActiveReelIndex(0);
    }
  };

  const closeOverlay = () => {
    setActiveHighlight(null);
    setOverlayOpen(false);
  };

  useEffect(() => {
    preloadRefs.current.forEach((video) => {
      if (video) {
        video.load();
      }
    });
  }, [activeHighlight, allReels]);

  return (
    <>
      <div className="mb-6 flex gap-3 overflow-x-auto pb-2">
        {profile.highlights.map((item) => (
          <button
            key={item.id}
            type="button"
            className="shrink-0 text-center"
            onClick={() => openHighlight(item)}
          >
            <div
              className={`mb-2 flex h-[4.9rem] w-[4.9rem] items-center justify-center rounded-full bg-gradient-to-br ${item.color} p-[2px]`}
            >
              <div className="flex h-full w-full items-center justify-center rounded-full bg-[#1b2230] p-[2px]">
                <div className="flex h-full w-full items-center justify-center overflow-hidden rounded-full bg-app-soft text-xs font-semibold">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.label}
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                  ) : (
                    item.label.slice(0, 2)
                  )}
                </div>
              </div>
            </div>
            <p className="text-xs text-muted">{item.label}</p>
          </button>
        ))}
      </div>

      {activeHighlight ? (
        <button
          type="button"
          className="fixed inset-0 z-50 flex items-start justify-center bg-black/85 px-4 pt-6"
          onClick={closeOverlay}
        >
          <div
            className="w-full max-w-[27rem]"
            onClick={(event) => event.stopPropagation()}
          >
            {activeHighlight.reels?.length ? (
              <div className="relative aspect-[9/18] overflow-hidden rounded-[18px] bg-transparent">
                <div className="pointer-events-none absolute inset-0 z-10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06)_0%,rgba(0,0,0,0)_18%,rgba(0,0,0,0)_82%,rgba(255,255,255,0.06)_100%)]" />
                <video
                  key={activeHighlight.reels[activeReelIndex]}
                  src={activeHighlight.reels[activeReelIndex]}
                  className="h-full w-full object-contain"
                  autoPlay
                  onEnded={handleVideoEnded}
                  playsInline
                  preload="auto"
                  controls={false}
                  controlsList="nodownload noplaybackrate nofullscreen noremoteplayback"
                  disablePictureInPicture
                />
                <button
                  type="button"
                  aria-label="Previous reel"
                  className="absolute inset-y-0 left-0 z-20 w-1/3 bg-transparent"
                  onClick={showPreviousReel}
                />
                <button
                  type="button"
                  aria-label="Next reel"
                  className="absolute inset-y-0 right-0 z-20 w-1/3 bg-transparent"
                  onClick={showNextReel}
                />
                <div className="pointer-events-none absolute bottom-16 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2 rounded-full bg-black/45 px-3 py-1 text-xs font-medium text-white/90 backdrop-blur-sm">
                  <span>{activeReelIndex + 1}</span>
                  <span>/</span>
                  <span>{activeHighlight.reels.length}</span>
                </div>
                <button
                  type="button"
                  className="absolute bottom-5 left-1/2 z-20 -translate-x-1/2 rounded-full border border-white/15 bg-black/45 px-5 py-2 text-sm font-medium text-white transition hover:bg-black/60"
                  onClick={closeOverlay}
                >
                  Back
                </button>
              </div>
            ) : null}
          </div>
        </button>
      ) : null}

      {allReels.map((reel, index) => (
        activeHighlight?.reels?.[activeReelIndex] === reel ? null : (
          <video
            key={`preload-${reel}`}
            ref={(element) => {
              preloadRefs.current[index] = element;
            }}
            src={reel}
            preload="auto"
            muted
            className="hidden"
          />
        )
      ))}
    </>
  );
}

export default HighlightsRow;

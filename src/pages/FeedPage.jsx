import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import PageTransition from "../components/common/PageTransition";
import { homeImages } from "../data/homeImages";

function FeedPage() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % homeImages.length);
    }, 3200);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <PageTransition>
      <section className="flex flex-col items-center pt-4">
        <div className="home-hero-circle relative h-56 w-56 overflow-hidden rounded-full border border-white/10 md:h-64 md:w-64">
          <AnimatePresence mode="sync">
            <motion.img
              key={homeImages[activeIndex]}
              src={homeImages[activeIndex]}
              alt={`Home slide ${activeIndex + 1}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.6, ease: "easeInOut" }}
              className="absolute inset-0 h-full w-full object-cover"
            />
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-t from-app/26 via-transparent to-white/8" />
        </div>
        <motion.p
          className="mt-5 font-display text-2xl font-bold tracking-[0.08em] text-white md:text-3xl"
          animate={{
            opacity: [0.85, 1, 0.88, 1],
            scale: [1, 1.03, 1, 1.02, 1],
            textShadow: [
              "0 0 0 rgba(107, 231, 255, 0)",
              "0 0 14px rgba(107, 231, 255, 0.28)",
              "0 0 6px rgba(139, 92, 246, 0.18)",
              "0 0 16px rgba(107, 231, 255, 0.24)",
              "0 0 0 rgba(107, 231, 255, 0)",
            ],
          }}
          transition={{
            duration: 4.6,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        >
          race.x299
        </motion.p>
      </section>
    </PageTransition>
  );
}

export default FeedPage;

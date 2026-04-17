import { motion } from "framer-motion";
import PageTransition from "../components/common/PageTransition";
import { homeImages } from "../data/homeImages";
import { staggerItem, staggerParent } from "../lib/motion";

function FeedPage() {
  return (
    <PageTransition>
      <motion.section
        className="flex flex-col items-center pt-4"
        variants={staggerParent}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          className="home-hero-circle relative h-56 w-56 overflow-hidden rounded-full border border-white/10 md:h-64 md:w-64"
          variants={staggerItem}
          whileHover={{ scale: 1.01 }}
          transition={{ type: "spring", stiffness: 160, damping: 20 }}
        >
          <motion.img
            src={homeImages[0]}
            alt="Home hero"
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-app/26 via-transparent to-white/8" />
        </motion.div>
        <motion.p
          className="mt-5 font-display text-2xl font-bold tracking-[0.08em] text-white md:text-3xl"
          variants={staggerItem}
        >
          race.x299
        </motion.p>
      </motion.section>
    </PageTransition>
  );
}

export default FeedPage;

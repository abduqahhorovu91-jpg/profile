import { motion } from "framer-motion";
import { profile } from "../../data/projects";
import { revealSoft, staggerItem, staggerParent } from "../../lib/motion";
import LazyMedia from "../common/LazyMedia";

function ProfileHeader() {
  return (
    <motion.section
      className="glass-panel mb-6 rounded-[32px] p-4 md:p-6"
      variants={staggerParent}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.25 }}
    >
      <div className="mb-5 flex items-start gap-4">
        <motion.div className="relative" variants={staggerItem}>
          <motion.div
            className="absolute -inset-1 rounded-full bg-gradient-to-br from-cyan-400 via-violet-500 to-emerald-400 blur-md"
            animate={{
              scale: [0.98, 1.06, 1],
              opacity: [0.55, 0.95, 0.7],
            }}
            transition={{
              duration: 6,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
          <LazyMedia
            src={profile.avatar}
            alt={profile.name}
            className="relative h-20 w-20 rounded-full border border-white/10 md:h-24 md:w-24"
          />
        </motion.div>

        <motion.div className="flex-1" variants={staggerItem}>
          <motion.h2 className="font-display text-2xl font-bold" {...revealSoft}>
            {profile.name}
          </motion.h2>
          <p className="mt-2 text-sm font-medium text-cyan-200">{profile.tagline}</p>
          {profile.handle ? (
            <p className="mt-2 text-sm font-medium text-cyan-200">{profile.handle}</p>
          ) : null}
          <p className="mt-2 text-sm text-white/85">{profile.role}</p>
          <p className="mt-2 text-sm text-muted">{profile.bio}</p>
        </motion.div>
      </div>
    </motion.section>
  );
}

export default ProfileHeader;

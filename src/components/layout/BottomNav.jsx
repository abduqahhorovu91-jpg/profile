import { motion } from "framer-motion";
import { Home, Lightbulb, MessageCircleMore, UserRound } from "lucide-react";
import { NavLink } from "react-router-dom";
import { cn } from "../../lib/utils";
import { usePortfolioStore } from "../../store/usePortfolioStore";

const navItems = [
  { to: "/", label: "Feed", icon: Home },
  { to: "/saved", label: "Creativity", icon: Lightbulb },
  { to: "/contact", label: "Chat", icon: MessageCircleMore },
  { to: "/profile", label: "Profile", icon: UserRound },
];

function BottomNav() {
  const isOverlayOpen = usePortfolioStore((state) => state.isOverlayOpen);

  if (isOverlayOpen) {
    return null;
  }

  return (
    <motion.nav
      className="safe-bottom fixed inset-x-0 z-20 mx-auto max-w-md px-4 md:max-w-6xl md:px-6"
      initial={{ opacity: 0, y: 26 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
    >
      <motion.div
        className="glass-panel mx-auto flex max-w-sm items-center justify-around rounded-[28px] px-3 py-3 md:max-w-md"
        animate={{
          boxShadow: [
            "0 22px 50px rgba(0, 0, 0, 0.28)",
            "0 28px 70px rgba(22, 36, 64, 0.45)",
            "0 22px 50px rgba(0, 0, 0, 0.28)",
          ],
        }}
        transition={{
          duration: 7,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      >
        {navItems.map(({ to, label, icon: Icon }) => (
          <NavLink key={to} to={to} className="relative flex flex-1 justify-center">
            {({ isActive }) => (
              <motion.div
                whileTap={{ scale: 0.96 }}
                className={cn(
                  "relative flex w-full flex-col items-center gap-1 rounded-2xl px-3 py-2 text-[11px] font-medium transition",
                  isActive ? "text-white" : "text-muted",
                )}
                whileHover={{ y: -2 }}
              >
                {isActive && (
                  <motion.div
                    layoutId="bottom-nav-pill"
                    className="absolute inset-0 rounded-2xl bg-white/8"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <Icon size={18} className={isActive ? "text-accent" : ""} />
                <span className="relative">{label}</span>
              </motion.div>
            )}
          </NavLink>
        ))}
      </motion.div>
    </motion.nav>
  );
}

export default BottomNav;

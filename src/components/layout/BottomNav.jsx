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
    <nav className="safe-bottom fixed inset-x-0 z-20 mx-auto max-w-md px-4 md:max-w-6xl md:px-6">
      <div className="glass-panel mx-auto flex max-w-sm items-center justify-around rounded-[28px] px-3 py-3 md:max-w-md">
        {navItems.map(({ to, label, icon: Icon }) => (
          <NavLink key={to} to={to} className="relative flex flex-1 justify-center">
            {({ isActive }) => (
              <motion.div
                whileTap={{ scale: 0.96 }}
                className={cn(
                  "relative flex w-full flex-col items-center gap-1 rounded-2xl px-3 py-2 text-[11px] font-medium transition",
                  isActive ? "text-white" : "text-muted",
                )}
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
      </div>
    </nav>
  );
}

export default BottomNav;

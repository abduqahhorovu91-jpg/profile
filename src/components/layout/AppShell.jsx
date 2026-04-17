import { motion } from "framer-motion";
import BottomNav from "./BottomNav";

function AppShell({ children }) {
  return (
    <div className="mx-auto min-h-screen max-w-md px-4 pb-28 pt-5 text-copy md:max-w-6xl md:px-6 md:pb-10">
      <motion.div
        className="pointer-events-none fixed inset-x-0 top-0 z-0 mx-auto h-40 max-w-6xl bg-gradient-to-b from-cyan-400/10 via-violet-500/5 to-transparent blur-3xl"
        animate={{
          opacity: [0.45, 0.8, 0.55, 0.75],
          y: [0, -8, 2, 0],
          scale: [1, 1.04, 0.98, 1],
        }}
        transition={{
          duration: 14,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="pointer-events-none fixed inset-0 z-0 opacity-60"
        animate={{ backgroundPosition: ["0% 0%", "100% 20%", "40% 100%", "0% 0%"] }}
        transition={{ duration: 22, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, rgba(107, 231, 255, 0.08), transparent 22%), radial-gradient(circle at 80% 18%, rgba(139, 92, 246, 0.1), transparent 20%), radial-gradient(circle at 50% 80%, rgba(55, 240, 181, 0.08), transparent 24%)",
          backgroundSize: "140% 140%",
        }}
      />

      <main className="relative z-10 safe-pb">{children}</main>
      <BottomNav />
    </div>
  );
}

export default AppShell;

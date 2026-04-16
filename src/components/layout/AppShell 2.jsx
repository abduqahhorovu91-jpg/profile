import { Sparkles } from "lucide-react";
import BottomNav from "./BottomNav";

function AppShell({ children }) {
  return (
    <div className="mx-auto min-h-screen max-w-md px-4 pb-28 pt-5 text-copy md:max-w-6xl md:px-6 md:pb-10">
      <div className="pointer-events-none fixed inset-x-0 top-0 z-0 mx-auto h-40 max-w-6xl bg-gradient-to-b from-cyan-400/10 via-violet-500/5 to-transparent blur-3xl" />

      <header className="relative z-10 mb-5 flex items-center justify-between md:mb-8">
        <div>
          <p className="mb-1 text-xs uppercase tracking-[0.35em] text-muted">Portfolio OS</p>
          <h1 className="font-display text-2xl font-bold text-gradient md:text-4xl">
            Ari Solis
          </h1>
        </div>

        <div className="glass-panel inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs text-muted">
          <Sparkles size={14} className="text-accent" />
          Available for select builds
        </div>
      </header>

      <main className="relative z-10 safe-pb">{children}</main>
      <BottomNav />
    </div>
  );
}

export default AppShell;

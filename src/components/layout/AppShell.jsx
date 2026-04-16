import BottomNav from "./BottomNav";

function AppShell({ children }) {
  return (
    <div className="mx-auto min-h-screen max-w-md px-4 pb-28 pt-5 text-copy md:max-w-6xl md:px-6 md:pb-10">
      <div className="pointer-events-none fixed inset-x-0 top-0 z-0 mx-auto h-40 max-w-6xl bg-gradient-to-b from-cyan-400/10 via-violet-500/5 to-transparent blur-3xl" />

      <main className="relative z-10 safe-pb">{children}</main>
      <BottomNav />
    </div>
  );
}

export default AppShell;

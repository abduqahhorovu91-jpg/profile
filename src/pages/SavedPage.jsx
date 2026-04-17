import { motion } from "framer-motion";
import PageTransition from "../components/common/PageTransition";
import { creativityImages } from "../data/creativityImages";

const ctas = [
  {
    id: "saved-cta-1",
    label: "Instagram",
    description: "See Reels",
    href: "https://www.instagram.com/race.x299?igsh=MXNkOGo2eTJtZGViMw==",
    style: "primary",
  },
  {
    id: "saved-cta-2",
    label: "Telegram",
    description: "Open Bot",
    href: "https://t.me/Hidop_bot",
    style: "secondary",
  },
  {
    id: "saved-cta-3",
    label: "+998 90 034 98 99",
    description: "Call Now",
    href: "tel:+998900349899",
    style: "tertiary",
  },
  {
    id: "saved-cta-4",
    label: "Habar qoldiring",
    description: "Start Here",
    href: "/contact",
    style: "tertiary",
  },
];

function SavedPage() {
  return (
    <PageTransition>
      <section className="flex justify-center pt-4">
        <div className="w-[96%] space-y-4">
          <div className="glass-panel relative overflow-hidden rounded-[28px] border border-white/12 p-3">
            <div className="relative aspect-[1.45] overflow-hidden rounded-[24px]">
              <motion.img
                src={creativityImages[0]}
                alt="Creativity preview"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="absolute inset-0 h-full w-full object-contain"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-app/24 via-transparent to-white/6" />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3">
            {ctas.map((cta) => {
              const isInternal = cta.href.startsWith("/");
              const baseClass =
                "group relative overflow-hidden rounded-[22px] px-4 py-4 text-left transition duration-300";
              const toneClass =
                cta.style === "primary"
                  ? "glass-panel border border-cyan-300/20 bg-[linear-gradient(135deg,rgba(34,211,238,0.18),rgba(99,102,241,0.18))] hover:border-cyan-300/40"
                  : cta.style === "secondary"
                    ? "glass-panel border border-fuchsia-300/20 bg-[linear-gradient(135deg,rgba(168,85,247,0.16),rgba(236,72,153,0.14))] hover:border-fuchsia-300/40"
                    : "glass-panel border border-amber-300/20 bg-[linear-gradient(135deg,rgba(251,191,36,0.16),rgba(249,115,22,0.14))] hover:border-amber-300/40";

              const content = (
                <>
                  <div className="absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.16),transparent_45%)]" />
                  <div className="relative">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/55">
                      {cta.description}
                    </p>
                    <div className="mt-3 flex items-center justify-between">
                      <p className="text-lg font-semibold text-white">{cta.label}</p>
                      <span className="rounded-full border border-white/10 bg-white/8 px-3 py-1 text-xs font-medium text-white/85">
                        Open
                      </span>
                    </div>
                  </div>
                </>
              );

              if (isInternal) {
                return (
                  <a key={cta.id} href={cta.href} className={`${baseClass} ${toneClass}`}>
                    {content}
                  </a>
                );
              }

              return (
                <a
                  key={cta.id}
                  href={cta.href}
                  target="_blank"
                  rel="noreferrer"
                  className={`${baseClass} ${toneClass}`}
                >
                  {content}
                </a>
              );
            })}
          </div>
        </div>
      </section>
    </PageTransition>
  );
}

export default SavedPage;

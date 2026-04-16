import profileAvatar from "../../png/profile-avatar.png";
import motoVideo1 from "../../png/1.1.mp4";
import motoVideo2 from "../../png/1.2.mp4";
import motoVideo3 from "../../png/1.3.mp4";
import motoVideo4 from "../../png/1.4.mp4";
import motoVideo5 from "../../png/1.5.mp4";
import motoVideo6 from "../../png/1.6.mp4";
import motoVideo7 from "../../png/1.7.mp4";
import pubgVideo1 from "../../png/2.1.mp4";
import pubgVideo2 from "../../png/2.2.mp4";
import pubgVideo3 from "../../png/2.3.mp4";
import pubgVideo4 from "../../png/2.4.mp4";
import thirdVideo1 from "../../png/3.1.mp4";
import thirdVideo2 from "../../png/3.2.mp4";
import thirdVideo3 from "../../png/3.3.mp4";
import motoHighlight from "../../png/png.1.png";
import pubgHighlight from "../../png/png.2.png";
import minorHighlight from "../../png/png.3.png";

export const profile = {
  name: "race.x299",
  tagline: "¹N²³⁴⁵⁶ ",
  handle: "",
  role: "my name is gabriel el macho",
  bio: "Motocycle ⚡",
  avatar: profileAvatar,
  stats: {
    projects: 18,
    views: 284000,
    likes: 32600,
  },
  highlights: [
    {
      id: "h1",
      label: "moto❤️",
      color: "from-cyan-400 to-sky-500",
      image: motoHighlight,
      reels: [motoVideo1, motoVideo2, motoVideo3, motoVideo4, motoVideo5, motoVideo6, motoVideo7],
    },
    {
      id: "h3",
      label: "minor",
      color: "from-emerald-400 to-teal-500",
      image: minorHighlight,
      reels: [pubgVideo1, pubgVideo2, pubgVideo3, pubgVideo4],
    },
    {
      id: "h2",
      label: "pubg",
      color: "from-fuchsia-500 to-violet-500",
      image: pubgHighlight,
      reels: [thirdVideo1, thirdVideo2, thirdVideo3],
    },
  ],
};

export const projects = [
  {
    id: "nova-os",
    title: "Nova OS",
    shortDescription: "A spatial dashboard for AI workflows with fluid data storytelling.",
    description:
      "Nova OS is a premium command center for autonomous product teams. It combines streaming analytics, AI copilots, and cinematic motion design into a mobile-first management surface.",
    thumbnail:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80",
    accent: "from-cyan-400/80 via-sky-500/60 to-violet-500/70",
    tech: ["React", "Tailwind", "Framer Motion", "Node.js"],
    likes: 2480,
    views: 18200,
    comments: 48,
    saved: true,
    demoUrl: "https://example.com/demo/nova",
    githubUrl: "https://github.com/example/nova-os",
  },
  {
    id: "pulse-commerce",
    title: "Pulse Commerce",
    shortDescription: "Luxury retail analytics reimagined as a real-time mobile companion.",
    description:
      "Pulse Commerce delivers executive insights through tactile charts, predictive demand signals, and editorial-grade visual hierarchy designed for modern commerce teams.",
    thumbnail:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
    accent: "from-fuchsia-500/80 via-purple-500/60 to-sky-500/70",
    tech: ["Next.js", "TypeScript", "Supabase", "Chart.js"],
    likes: 1980,
    views: 14500,
    comments: 31,
    saved: false,
    demoUrl: "https://example.com/demo/pulse",
    githubUrl: "https://github.com/example/pulse-commerce",
  },
  {
    id: "echo-stream",
    title: "Echo Stream",
    shortDescription: "A creator platform that turns livestream clips into premium micro-content.",
    description:
      "Echo Stream automates clip generation, caption design, and distribution workflows while keeping the creator experience crisp, expressive, and deeply mobile-native.",
    thumbnail:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80",
    accent: "from-emerald-400/80 via-cyan-500/60 to-blue-500/70",
    tech: ["Vite", "React", "Zustand", "Firebase"],
    likes: 3160,
    views: 22400,
    comments: 63,
    saved: true,
    demoUrl: "https://example.com/demo/echo",
    githubUrl: "https://github.com/example/echo-stream",
  },
  {
    id: "atlas-pay",
    title: "Atlas Pay",
    shortDescription: "A fintech wallet with biometric trust flows and elevated onboarding.",
    description:
      "Atlas Pay pairs security-focused interaction design with subtle neon surfaces, creating a trustworthy financial app feel without sacrificing personality or delight.",
    thumbnail:
      "https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&w=1200&q=80",
    accent: "from-sky-400/80 via-indigo-500/60 to-fuchsia-500/70",
    tech: ["React Native", "Expo", "Stripe", "Zustand"],
    likes: 1540,
    views: 9600,
    comments: 27,
    saved: false,
    demoUrl: "https://example.com/demo/atlas",
    githubUrl: "https://github.com/example/atlas-pay",
  },
  {
    id: "veil-ai",
    title: "Veil AI",
    shortDescription: "An AI research archive with immersive article previews and team notes.",
    description:
      "Veil AI helps product and research teams collect experiments, annotate discoveries, and share design-ready insights in a dramatically clean interface system.",
    thumbnail:
      "https://images.unsplash.com/photo-1484417894907-623942c8ee29?auto=format&fit=crop&w=1200&q=80",
    accent: "from-violet-500/80 via-slate-500/60 to-cyan-500/70",
    tech: ["React", "Tailwind", "OpenAI", "Postgres"],
    likes: 2890,
    views: 20100,
    comments: 55,
    saved: true,
    demoUrl: "https://example.com/demo/veil",
    githubUrl: "https://github.com/example/veil-ai",
  },
  {
    id: "halo-fit",
    title: "Halo Fit",
    shortDescription: "A coaching experience blending biometric feedback with community rituals.",
    description:
      "Halo Fit translates body metrics into confidence-boosting daily guidance, delivering an emotionally aware wellness product wrapped in a premium visual identity.",
    thumbnail:
      "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1200&q=80",
    accent: "from-orange-400/80 via-pink-500/60 to-rose-500/70",
    tech: ["React", "Tailwind", "Framer Motion", "Express"],
    likes: 1720,
    views: 11100,
    comments: 22,
    saved: false,
    demoUrl: "https://example.com/demo/halo",
    githubUrl: "https://github.com/example/halo-fit",
  },
];

export const initialMessages = [
  {
    id: "m1",
    from: "system",
    text: "Hi, I build polished digital products for ambitious teams. Tell me what you're planning.",
    time: "09:14",
  },
  {
    id: "m2",
    from: "user",
    text: "We need a fast, premium web app with strong motion and conversion.",
    time: "09:15",
  },
  {
    id: "m3",
    from: "system",
    text: "That’s the sweet spot. I can help with product strategy, UI engineering, and launch-ready frontend systems.",
    time: "09:15",
  },
];

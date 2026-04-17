export const pageTransition = {
  initial: { opacity: 0, y: 22, filter: "blur(14px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  exit: { opacity: 0, y: -16, filter: "blur(10px)" },
  transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
};

export const revealUp = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
};

export const revealSoft = {
  initial: { opacity: 0, scale: 0.97, y: 16 },
  whileInView: { opacity: 1, scale: 1, y: 0 },
  viewport: { once: true, amount: 0.16 },
  transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
};

export const staggerParent = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.04,
    },
  },
};

export const staggerItem = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

import { motion } from "framer-motion";
import { pageTransition } from "../../lib/motion";

function PageTransition({ children }) {
  return (
    <motion.section {...pageTransition}>
      {children}
    </motion.section>
  );
}

export default PageTransition;

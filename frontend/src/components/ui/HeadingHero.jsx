import { motion } from "framer-motion";

export default function HeadingHero({ children }) {
  return (
    <motion.h2
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="text-center text-3xl md:text-4xl font-semibold text-slate-800"
    >
      {children}
    </motion.h2>
  );
}


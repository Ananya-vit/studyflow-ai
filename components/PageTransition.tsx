"use client";

import { motion } from "framer-motion";

interface PageTransitionProps {
  children: React.ReactNode;
}

export default function PageTransition({ children }: PageTransitionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 30,
      }}
      className="w-full min-h-screen will-change-[transform,opacity]"
    >
      {children}
    </motion.div>
  );
}
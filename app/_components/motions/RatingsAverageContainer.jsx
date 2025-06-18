"use client";

import { motion } from "framer-motion";

export default function RatingsAverageContainer({ children }) {
  return (
    <motion.div
      initial={{
        y: -30,
        opacity: 0,
      }}
      animate={{
        y: 0,
        opacity: 1,
      }}
      transition={{
        delay: 0.4,
      }}
    >
      {children}
    </motion.div>
  );
}

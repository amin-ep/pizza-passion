"use client";

import { motion } from "framer-motion";

export default function FormControlLabel({ children, delay }) {
  return (
    <motion.label
      initial={{
        opacity: 0,
        y: 15,
        filter: "blur(10px)",
      }}
      animate={{
        opacity: 1,
        y: 0,
        filter: "blur(0)",
      }}
      transition={{
        delay,
      }}
    >
      {children}
    </motion.label>
  );
}

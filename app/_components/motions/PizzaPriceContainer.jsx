"use client";

import { motion } from "framer-motion";
export default function PizzaPriceContainer({ children }) {
  return (
    <motion.div
      initial={{
        y: -20,
        opacity: 0,
      }}
      animate={{
        y: 0,
        opacity: 1,
      }}
      transition={{
        delay: 0.8,
      }}
      className="flex flex-row items-center justify-center gap-2"
    >
      {children}
    </motion.div>
  );
}

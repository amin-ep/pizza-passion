"use client";
import { motion } from "framer-motion";

export default function ItemQuantity({ children, index }) {
  return (
    <motion.span
      animate={{
        scale: [1, 1.35, 1],
      }}
      transition={{
        delay: `0.${index + 4}`,
      }}
      className="aspect-square h-full border-r border-primary-800 p-2 italic"
    >
      #{children}
    </motion.span>
  );
}

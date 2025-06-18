"use client";

import { motion } from "framer-motion";

export default function CartItemIngredientsText({ children, index }) {
  return (
    <motion.p
      initial={{
        y: -20,
        opacity: 0,
      }}
      animate={{
        y: 0,
        opacity: 1,
      }}
      transition={{
        delay: `0.${index + 8}`,
      }}
      className="text-xs italic leading-5 text-primary-300 sm:text-sm md:text-base"
    >
      {children}
    </motion.p>
  );
}

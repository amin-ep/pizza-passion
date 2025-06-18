"use client";

import { motion } from "framer-motion";

export default function CartItemName({ children, index }) {
  return (
    <motion.p
      initial={{ y: -20, opacity: 0 }}
      animate={{
        y: 0,
        opacity: 1,
      }}
      transition={{
        delay: `0.${index + 4}`,
      }}
      className="text-base font-semibold text-primary-50 sm:text-lg md:text-xl"
    >
      {children}
    </motion.p>
  );
}

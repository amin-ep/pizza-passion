"use client";

import { motion } from "framer-motion";

export default function OrderListItem({ children, index }) {
  return (
    <motion.li
      initial={{
        y: -50,
        opacity: 0,
      }}
      whileInView={{
        y: 0,
        opacity: 1,
      }}
      transition={{
        duration: 0.5,
      }}
      viewport={{
        once: true,
      }}
      className="flex flex-col border border-primary-900"
    >
      {children}
    </motion.li>
  );
}

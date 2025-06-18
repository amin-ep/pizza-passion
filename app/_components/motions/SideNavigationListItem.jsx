"use client";

import { motion } from "framer-motion";

export default function SideNavigationListItem({ children, index }) {
  return (
    <motion.li
      initial={{
        x: -20,
        opacity: 0,
      }}
      animate={{
        x: 0,
        opacity: 1,
      }}
      transition={{
        delay: `0.${index + 2}`,
      }}
    >
      {children}
    </motion.li>
  );
}

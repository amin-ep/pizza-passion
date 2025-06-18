"use client";

import React from "react";
import { motion } from "framer-motion";

export default function PizzaListItem({ children, index }) {
  return (
    <motion.li
      initial={{
        transform: "translateY(-30px)",
        opacity: 0,
      }}
      animate={{
        transform: "translateY(0)",
        opacity: 1,
      }}
      transition={{
        delay: `0.${index + 1}`,
      }}
    >
      {children}
    </motion.li>
  );
}

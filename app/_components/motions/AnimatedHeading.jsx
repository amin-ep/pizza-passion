"use client";

import { motion } from "framer-motion";

export default function AnimatedHeading({ children }) {
  return (
    <motion.h1
      className="mb-6 text-3xl font-medium text-accent-500 lg:mb-10 lg:text-4xl xl:text-5xl"
      initial={{
        y: -20,
        opacity: 0,
      }}
      whileInView={{
        y: 0,
        opacity: 1,
      }}
      viewport={{
        once: true,
      }}
    >
      {children}
    </motion.h1>
  );
}

"use client";

import { motion } from "framer-motion";

export default function AccessParagraph({ children, delay = 0 }) {
  return (
    <motion.p
      className="mt-4 text-base lg:text-lg xl:text-xl"
      initial={{
        filter: "blur(10px)",
        opacity: 0,
        y: 12,
      }}
      animate={{
        filter: "blur(0)",
        y: 0,
        opacity: 1,
      }}
      transition={{
        duration: 0.4,
        delay: delay,
      }}
    >
      {children}
    </motion.p>
  );
}

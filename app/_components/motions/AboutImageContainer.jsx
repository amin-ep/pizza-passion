"use client";

import { motion } from "framer-motion";
import { useMediaQuery } from "react-responsive";

export default function AboutImageContainer({ children, index }) {
  const isLgWindow = useMediaQuery({ query: "(min-width:1024px)" });

  return (
    <motion.div
      initial={
        !isLgWindow
          ? { opacity: 0, y: -50 }
          : { opacity: 0, x: index === 0 || index % 2 === 0 ? 50 : -50 }
      }
      whileInView={!isLgWindow ? { opacity: 1, y: 0 } : { x: 0, opacity: 1 }}
      viewport={{
        once: true,
      }}
      transition={{
        delay: 0.2,
        duration: 0.4,
      }}
      className="relative lg:col-span-2"
    >
      {children}
    </motion.div>
  );
}

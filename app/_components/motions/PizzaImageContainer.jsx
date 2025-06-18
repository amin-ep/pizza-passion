"use client";

import { motion } from "framer-motion";
import { useMediaQuery } from "react-responsive";

export default function PizzaImageContainer({ children }) {
  const isTargetBreakPoint = useMediaQuery({
    query: "(min-width: 425px)",
  });
  return (
    <motion.div
      className="relative"
      initial={{
        y: !isTargetBreakPoint && -30,
        opacity: 0,
        x: isTargetBreakPoint && -30,
      }}
      animate={{
        y: 0,
        opacity: 1,
        x: 0,
      }}
    >
      {children}
    </motion.div>
  );
}

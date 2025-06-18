"use client";
import { motion } from "framer-motion";
export default function PizzaIngredientsContainer({ children }) {
  return (
    <motion.div
      initial={{
        y: -20,
        opacity: 0,
      }}
      animate={{
        y: 0,
        opacity: 1,
      }}
      transition={{
        delay: 1.1,
      }}
    >
      {children}
    </motion.div>
  );
}

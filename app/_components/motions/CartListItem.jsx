"use client";

import { motion } from "framer-motion";

export default function CartListItem({ children, index }) {
  return (
    <motion.li
      initial={{
        opacity: 0,
        x: -50,
      }}
      animate={{
        opacity: 1,
        x: 0,
      }}
      transition={{
        delay: `0.${index + 1}`,
      }}
      className="grid h-fit grid-rows-[6rem_2rem] rounded-sm border border-primary-800 sm:grid-rows-[8rem_2.5rem]"
    >
      {children}
    </motion.li>
  );
}

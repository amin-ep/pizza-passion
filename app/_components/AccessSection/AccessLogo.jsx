"use client";

import { motion } from "framer-motion";
import FormHeaderLogo from "../FormHeaderLogo";

export default function AccessLogo() {
  return (
    <motion.div
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
    >
      <FormHeaderLogo />
    </motion.div>
  );
}

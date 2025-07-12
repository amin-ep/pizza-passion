"use client";
import { motion } from "framer-motion";
export default function AccessLayoutContainer({ children }) {
  return (
    <motion.div
      initial={{
        y: 50,
        opacity: 0,
      }}
      animate={{
        y: 0,
        opacity: 1,
      }}
      className="mx-auto my-10 grid w-[95%] max-w-96 grid-cols-1 bg-primary-900 shadow-lg md:max-w-[700px] md:grid-cols-[1fr_350px] lg:max-w-[53rem] lg:grid-cols-[1fr_400px] xl:max-w-[56rem]"
    >
      {children}
    </motion.div>
  );
}

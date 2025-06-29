"use client";

import { motion } from "framer-motion";
import { useFormStatus } from "react-dom";
import { useMediaQuery } from "react-responsive";
import LinkButton from "./LinkButton";

export default function DeleteCartButton() {
  const { pending } = useFormStatus();
  const isXsmWindow = useMediaQuery({ query: "(min-width:425px)" });

  return (
    <motion.div
      initial={!isXsmWindow ? { opacity: 0, y: -40 } : { opacity: 0, x: 40 }}
      animate={!isXsmWindow ? { opacity: 1, y: 0 } : { opacity: 1, x: 0 }}
      transition={{
        delay: 0.4,
      }}
    >
      <LinkButton extraClasses="w-full" type="submit" isPending={pending}>
        Delete Cart
      </LinkButton>
    </motion.div>
  );
}

"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import React from "react";

const MotionLink = motion(Link);

export default function BackLink() {
  return (
    <MotionLink
      className="btn w-48"
      href="/"
      initial={{
        opacity: 0,
        y: 12,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        delay: 1.2,
        duration: 0.4,
      }}
    >
      Back Home
    </MotionLink>
  );
}

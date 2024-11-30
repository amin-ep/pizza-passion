"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
function HomepageSection() {
  const text = "Welcome to Pizza Passion".split(" ");

  return (
    <div className="text-center relative">
      <div className="flex flex-wrap gap-4 justify-center">
        {text.map((word, i) => (
          <motion.h1
            key={i}
            initial={{ opacity: 0, translateY: 200 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{
              duration: 1,
              delay: i / 12,
            }}
            className="text-4xl sm:text-6xl md:text-8xl text-primary-50 mb-10 tracking-tighter font-normal"
          >
            {word}
          </motion.h1>
        ))}
      </div>
      <Link
        href="/menu"
        className="bg-accent-500 px-8 py-6 text-primary-800 text-lg font-semibold hover:bg-accent-600 transition-all"
      >
        Start Ordering
      </Link>
    </div>
  );
}

export default HomepageSection;

"use client";

import React from "react";
import { motion } from "framer-motion";

function AnimatedParagraph({ text }) {
  return (
    <div className="flex flex-wrap gap-x-1 gap-y-0 justify-start w-full">
      {text.split(" ").map((word, i) => (
        <motion.p
          key={i}
          className="text-primary-200 text-base sm:text-lg overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.1,
            delay: i / 10,
          }}
        >
          {word}
        </motion.p>
      ))}
    </div>
  );
}

export default AnimatedParagraph;

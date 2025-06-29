"use client";

import { motion } from "framer-motion";

function AnimatedParagraph({ text }) {
  return (
    <div className="flex w-full flex-wrap justify-start gap-x-1 gap-y-0">
      {text.split(" ").map((word, i) => (
        <motion.p
          key={i}
          className="overflow-hidden text-base text-primary-200 sm:text-lg"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{
            duration: 0.1,
            delay: i / 10,
          }}
          viewport={{
            once: true,
          }}
        >
          {word}
        </motion.p>
      ))}
    </div>
  );
}

export default AnimatedParagraph;

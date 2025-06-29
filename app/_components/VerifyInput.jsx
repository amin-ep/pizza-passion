"use client";

import clsx from "clsx";
import { motion } from "framer-motion";
import { useRef } from "react";

export default function VerifyInput({ setValue, theme = "light" }) {
  const inputRef = useRef([]);
  const justFocused = useRef(false);

  const onChange = (e, index) => {
    const value = e.target.value;

    if (!/^\d$/.test(value)) {
      e.target.value = "";
      return;
    } else {
      const code = inputRef.current.map((input) => input.value).join("");
      setValue("verificationCode", code);
      if (value.length === 1 && index < inputRef.current.length - 1) {
        inputRef.current[index + 1].focus();
      }
    }
  };

  const onKeyDown = (e, index) => {
    const clickedKey = e.key;

    if (clickedKey === "Backspace" && !e.target.value && index > 0) {
      justFocused.current = true;
      inputRef.current[index - 1].focus();
    }
  };

  const onFocus = (e) => {
    if (justFocused.current) {
      justFocused.current = false;
      return;
    }
    for (let i = 0; i < inputRef.current.length; i++) {
      if (inputRef.current[i].value.length === 0) {
        inputRef.current[i].focus();
        break;
      }
    }
  };
  return (
    <div className="flex justify-start gap-1 sm:gap-2 md:gap-3">
      {[0, 1, 2, 3, 4, 5].map((idx) => (
        <motion.input
          className={clsx(
            "aspect-square w-10 rounded-sm border text-center text-sm outline-none sm:w-11 sm:text-base md:w-12 md:text-lg",
            theme === "light"
              ? "border-gray-300 bg-primary-50 text-primary-900 focus:border-primary-600 focus:bg-primary-100"
              : "border-gray-700 bg-primary-800 text-primary-100 focus:border-primary-400 focus:bg-primary-700",
          )}
          key={idx}
          ref={(el) => (inputRef.current[idx] = el)}
          onChange={(e) => onChange(e, idx)}
          onKeyDown={(e) => onKeyDown(e, idx)}
          onFocus={(e) => onFocus(e)}
          maxLength={1}
          type="text"
          inputMode="numeric"
          pattern="\d*"
          animate={{
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 0.4,
            delay: `0.${idx + 1}`,
          }}
        />
      ))}
    </div>
  );
}

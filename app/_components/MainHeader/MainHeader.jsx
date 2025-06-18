"use client";

import clsx from "clsx";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import styles from "./MainHeader.module.css";

export default function MainHeader({ children }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const ref = useRef();

  useEffect(() => {
    function handleScroll() {
      if (ref.current) {
        const scrollAmount = window.scrollY;
        const headerHeight = ref.current.clientHeight;
        setIsScrolled(scrollAmount > headerHeight * 3);
      }
    }

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <motion.header
      ref={ref}
      className={clsx(
        "hidden px-2 py-2 sm:block sm:px-4 md:px-6 lg:px-10 xl:px-12",
        isScrolled
          ? // ? "fixed left-0 right-0 top-0 z-10 backdrop-blur-lg"
            styles.fixHeader
          : "static",
      )}
      initial={{
        y: -20,
        opacity: 0,
      }}
      animate={{
        y: 0,
        opacity: 1,
      }}
      transition={{
        duration: 0.4,
      }}
    >
      <div
        className={clsx(
          "mx-auto flex w-full max-w-[1280px] items-center justify-between rounded-sm border p-3 px-6",
          isScrolled
            ? "border-transparent bg-transparent"
            : "border-primary-900 bg-primary-900/20",
        )}
      >
        {children}
      </div>
    </motion.header>
  );
}

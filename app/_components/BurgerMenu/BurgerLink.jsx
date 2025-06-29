"use client";

import clsx from "clsx";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

const MotionLink = motion.create(Link);

export default function BurgerLink({ href, children, idx, isOpen }) {
  const path = usePathname();
  return (
    <MotionLink
      transition={{
        delay: `0.${1 + idx}`,
      }}
      initial={{
        y: -100,
        opacity: 0,
      }}
      animate={isOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: -100 }}
      className={clsx(
        "flex aspect-square w-12 cursor-pointer items-center justify-center rounded-full p-1 text-2xl text-primary-900 hover:bg-accent-600",
        "after:absolute after:-left-5 after:aspect-square after:w-3 after:rounded-full after:bg-accent-500",
        path === href ? "bg-accent-600" : "bg-accent-500",
      )}
      href={href}
    >
      {children}
    </MotionLink>
  );
}

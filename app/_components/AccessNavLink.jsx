"use client";

import clsx from "clsx";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

const MotionLink = motion(Link);

export default function AccessNavLink({ children, href, delay = 0 }) {
  const pathname = usePathname();

  return (
    <MotionLink
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      transition={{
        delay,
      }}
      href={href}
      className={clsx(
        "btn",
        "flex-1 border hover:border-accent-600 hover:text-primary-800",
        pathname == href
          ? "border-accent-600 bg-accent-600 text-primary-800"
          : "border-primary-700 bg-transparent text-primary-50",
      )}
    >
      {children}
    </MotionLink>
  );
}

"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLink({ children, href }) {
  const path = usePathname();
  return (
    <Link
      className={clsx(
        "rounded-sm p-2 px-4 text-sm md:text-base",
        path === href
          ? "text-accent-500"
          : "text-primary-50 hover:bg-primary-900",
      )}
      href={href}
    >
      {children}
    </Link>
  );
}

"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AccessNavLink({ children, href }) {
  const pathname = usePathname();

  return (
    <Link
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
    </Link>
  );
}

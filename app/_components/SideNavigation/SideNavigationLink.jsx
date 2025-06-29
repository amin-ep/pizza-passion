"use client";
import { usePathname } from "next/navigation";

import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";

export default function SideNavigationLink({ href, children, iconPath, alt }) {
  const pathname = usePathname();
  return (
    <Link
      href={href}
      className={clsx(
        "flex items-center gap-4 rounded-l-sm px-5 py-3 text-sm font-semibold text-primary-200 transition-colors hover:bg-primary-900 hover:text-primary-100 lg:text-base",
        pathname === href ? "bg-primary-900" : "",
      )}
    >
      <Image
        className="w-6 lg:w-7"
        src={iconPath}
        alt={alt}
        width={25}
        height={25}
      />
      {children}
    </Link>
  );
}

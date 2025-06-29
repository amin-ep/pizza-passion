"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  HiCalendarDays,
  HiHome,
  HiMiniUser,
  HiOutlineArrowRightOnRectangle,
} from "react-icons/hi2";

const navLinks = [
  {
    name: "Home",
    href: "/account",
    icon: <HiHome className="h-5 w-5 text-primary-600" />,
    activeIcon: <HiHome className="h-5 w-5 text-accent-500" />,
  },
  {
    name: "Orders",
    href: "/account/orders",
    icon: <HiCalendarDays className="h-5 w-5 text-primary-600" />,
    activeIcon: <HiCalendarDays className="h-5 w-5 text-accent-500" />,
  },
  {
    name: "Profile",
    href: "/account/profile",
    icon: <HiMiniUser className="h-5 w-5 text-primary-600" />,
    activeIcon: <HiMiniUser className="h-5 w-5 text-accent-500" />,
  },
];

function BottomNavigation() {
  const pathname = usePathname();

  return (
    <nav className="animate-bottom-nav fixed bottom-0 left-0 right-0 border-t border-primary-900 bg-primary-950 md:hidden">
      <ul className="flex flex-row items-center justify-between px-3 sm:justify-evenly">
        {navLinks.map((link) => (
          <li key={link.name}>
            <Link
              className={`flex flex-col items-center gap-2 px-1 py-3 font-semibold transition-colors ${
                pathname === link.href ? "text-accent-500" : "text-primary-200"
              }`}
              href={link.href}
            >
              {pathname === link.href ? link.activeIcon : link.icon}
              <span>{link.name}</span>
            </Link>
          </li>
        ))}

        <li>
          <button
            className="flex flex-col items-center gap-2 px-1 py-3 font-semibold text-primary-200 transition-colors"
            // onClick={() => logout()}
          >
            <HiOutlineArrowRightOnRectangle className="h-5 w-5 text-primary-600" />
            <span>Sign out</span>
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default BottomNavigation;

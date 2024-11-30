"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  HiHome,
  HiCalendarDays,
  HiMiniUser,
  HiOutlineArrowRightOnRectangle,
} from "react-icons/hi2";
import { useAuth } from "../_contexts/AuthContext";

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
  const { logout } = useAuth();

  return (
    <nav className="bg-primary-950 border-t border-primary-900 md:hidden fixed bottom-0 right-0 left-0 animate-bottom-nav">
      <ul className="flex flex-row justify-between sm:justify-evenly items-center px-3">
        {navLinks.map((link) => (
          <li key={link.name}>
            <Link
              className={`py-3 px-1 transition-colors flex flex-col items-center gap-2 font-semibold ${
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
            className="py-3 px-1 transition-colors flex flex-col items-center gap-2 font-semibold text-primary-200"
            onClick={() => logout()}
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

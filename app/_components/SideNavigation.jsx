"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import SignOutButton from "./SignOutButton";
import { HiHome, HiCalendarDays, HiMiniUser } from "react-icons/hi2";

const navLinks = [
  {
    name: "Home",
    href: "/account",
    icon: <HiHome className="h-5 w-5 text-primary-600" />,
  },
  {
    name: "Orders",
    href: "/account/orders",
    icon: <HiCalendarDays className="h-5 w-5 text-primary-600" />,
  },
  {
    name: "Profile",
    href: "/account/profile",
    icon: <HiMiniUser className="h-5 w-5 text-primary-600" />,
  },
];

function SideNavigation() {
  const pathname = usePathname();

  return (
    <nav className="border-r hidden md:block border-primary-900 h-[35rem] left-0">
      <ul className="flex flex-col gap-2 h-full text-lg">
        {navLinks.map((link) => (
          <li key={link.name}>
            <Link
              className={`py-3 px-5 hover:bg-primary-900 hover:text-primary-100 transition-colors flex items-center gap-4 font-semibold text-primary-200 ${
                pathname === link.href ? "bg-primary-900" : ""
              }`}
              href={link.href}
            >
              {link.icon}
              <span>{link.name}</span>
            </Link>
          </li>
        ))}

        <li className="mt-auto">
          <SignOutButton />
        </li>
      </ul>
    </nav>
  );
}

export default SideNavigation;

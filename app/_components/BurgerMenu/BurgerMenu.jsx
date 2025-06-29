"use client";

import clsx from "clsx";
import { motion } from "framer-motion";
import { useState } from "react";
import { BsCart4 } from "react-icons/bs";
import { IoRestaurantOutline } from "react-icons/io5";
import { RiAccountPinBoxLine, RiInfoCardLine } from "react-icons/ri";
import BurgerButton from "./BurgerButton";
import BurgerLink from "./BurgerLink";

const navItems = [
  { href: "/menu", icon: <IoRestaurantOutline /> },
  { href: "/about", icon: <RiInfoCardLine /> },
  { href: "/cart", icon: <BsCart4 /> },
  { href: "/account", icon: <RiAccountPinBoxLine /> },
];

export default function BurgerMenu() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <motion.header
      initial={{
        x: 30,
        opacity: 0,
      }}
      animate={{
        x: 0,
        opacity: 1,
      }}
      className="fixed right-4 top-4 z-[5000] overflow-hidden sm:hidden"
    >
      <BurgerButton onClick={() => setIsOpen((state) => !state)} />
      <motion.nav
        className={clsx("z-0 mt-3.5 flex-col gap-2 transition")}
        initial={{
          display: "none",
        }}
        animate={isOpen ? { display: "flex" } : { display: "none" }}
        transition={{
          delay: isOpen ? 0 : 0.4,
        }}
      >
        {navItems.map((item, idx) => (
          <BurgerLink
            isOpen={isOpen}
            idx={idx}
            href={item.href}
            key={item.href}
          >
            {item.icon}
          </BurgerLink>
        ))}
      </motion.nav>
    </motion.header>
  );
}

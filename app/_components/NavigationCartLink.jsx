"use client";

import Link from "next/link";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { useCart } from "../_contexts/CartContext";

function NavigationCartLink() {
  const { cartTotalQuantity } = useCart();

  return (
    <li>
      <Link href="/cart" className="relative">
        <HiOutlineShoppingBag className="text-3xl lg:text-4xl" />
        <span className="absolute -bottom-2 -right-[8px] text-sm bg-accent-500 w-5 aspect-square rounded-full text-primary-900 font-bold flex items-center justify-center">
          {cartTotalQuantity || 0}
        </span>
      </Link>
    </li>
  );
}

export default NavigationCartLink;

import { getCart } from "@/app/_services/cart-api";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default async function NavCartLink() {
  const cart = await getCart();

  let totalQuantity;
  if (!cart) {
    totalQuantity = 0;
  } else {
    totalQuantity = cart.totalQuantity;
  }

  return (
    <Link href="/cart" className="relative ml-2 sm:ml-4 md:ml-6">
      <div className="absolute bottom-0 right-0 flex aspect-square w-5 items-center justify-center rounded-full bg-primary-50 p-0 text-xs text-primary-900">
        {totalQuantity}
      </div>
      <Image
        src="/icons/cart-accent.svg"
        alt="cart"
        className="w-7 sm:w-8 md:w-10"
        width={35}
        height={35}
      />
    </Link>
  );
}

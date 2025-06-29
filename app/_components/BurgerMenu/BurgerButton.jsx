"use client";

import Image from "next/image";

export default function BurgerButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="z-[1] flex aspect-square w-12 items-center justify-center rounded-full bg-accent-500 p-1 hover:bg-accent-600"
    >
      <Image
        src="/icons/bars-icon-primary.svg"
        alt="bars"
        width={35}
        height={35}
      />
    </button>
  );
}

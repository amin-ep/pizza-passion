import Image from "next/image";
import React from "react";
import clsx from "clsx";

export default function FormHeaderLogo({
  textColor = "light",
  align = "left",
}) {
  // text color can be '"light" or "dark"'
  //   align can be '"center" or "left"'
  return (
    <header>
      <h1
        className={clsx(
          "flex items-center gap-2 text-3xl font-semibold lg:text-4xl",
          align === "left" ? "justify-start" : "justify-center",
          textColor === "light" ? "text-primary-50" : "text-primary-950",
        )}
      >
        <Image
          width={45}
          height={45}
          alt="pizza"
          src={`/icons/pizza-${textColor == "light" ? "white" : "primary"}.svg`}
          className="w-12 lg:w-14 xl:w-16"
        />
        <span>Pizza Passion</span>
      </h1>
    </header>
  );
}

import Link from "next/link";
import React from "react";
import SpinnerMini from "./SpinnerMini";
import clsx from "clsx";

function LinkButton({
  href,
  onClick,
  type = "button",
  children,
  disabled,
  isPending,
  extraClasses,
}) {
  if (href) {
    return (
      <Link className={clsx("btn", extraClasses)} href={href}>
        {children}
      </Link>
    );
  } else if (onClick || type) {
    return (
      <button
        disabled={disabled}
        className={clsx("btn", extraClasses)}
        type={type}
        onClick={onClick}
      >
        {isPending && <SpinnerMini theme="dark" />} {children}
      </button>
    );
  }
}

export default LinkButton;

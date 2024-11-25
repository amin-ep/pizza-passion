import Link from "next/link";
import React from "react";

function LinkButton({ href, onClick, type = "button", children, disabled }) {
  if (href) {
    return (
      <Link className="btn" href={href}>
        {children}
      </Link>
    );
  } else if (onClick || type) {
    return (
      <button disabled={disabled} className="btn" type={type} onClick={onClick}>
        {children}
      </button>
    );
  }
}

export default LinkButton;

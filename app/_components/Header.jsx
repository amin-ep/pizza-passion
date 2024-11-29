"use client";

import { usePathname } from "next/navigation";
import Logo from "./Logo";
import { useEffect, useRef } from "react";

function Header({ children }) {
  const ref = useRef(null);
  const spacerRef = useRef(null);
  const pathname = usePathname();

  useEffect(() => {
    function handleScroll() {
      if (window.scrollY / 2.5 > ref.current.getBoundingClientRect().height) {
        ref.current.classList.add("fixed-header");
        spacerRef.current.style.height = `${
          ref.current.getBoundingClientRect().height
        }px`;
      } else {
        ref.current.classList.remove("fixed-header");
        spacerRef.current.style.height = 0;
      }
    }

    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <div ref={spacerRef} />
      <header
        className={`${
          pathname === "/access" || pathname === "/success" ? "hidden" : "block"
        } border-b border-primary-900 px-0 sm:px-8 py-5`}
        ref={ref}
      >
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <Logo />
          {children}
        </div>
      </header>
    </>
  );
}

export default Header;

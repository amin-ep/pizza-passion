"use client";

import { useState } from "react";
import { HiBars3, HiXMark } from "react-icons/hi2";
import MainSideNav from "./MainSideNav";

function NavigationBarsButton({ token }) {
  const [openNav, setOpenNav] = useState(false);

  return (
    <>
      <button
        className="flex md:hidden"
        onClick={() => {
          setOpenNav((open) => !open);
        }}
      >
        {openNav ? (
          <HiXMark className="text-3xl lg:text-4xl" />
        ) : (
          <HiBars3 className="text-3xl lg:text-4xl" />
        )}
      </button>
      <div>
        <MainSideNav
          onClose={() => setOpenNav(false)}
          token={token}
          isOpen={openNav}
        />
      </div>
    </>
  );
}

export default NavigationBarsButton;

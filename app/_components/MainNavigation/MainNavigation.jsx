import React from "react";
import NavLink from "../NavLink";
import { cookies } from "next/headers";
import Link from "next/link";
import NavCartLink from "./NavCartLink";
import AccountLink from "./AccountLink";
import clsx from "clsx";

export default async function MainNavigation() {
  const authToken = await cookies().get(process.env.JWT_SECRET)?.value;

  const authLinksBaseStyles =
    "rounded-sm p-1.5 px-4 text-sm transition-all ease-out hover:scale-[1.1] duration-[200] md:p-2 md:px-5 md:text-base";

  return (
    <nav>
      <ul className="flex items-center justify-end gap-6">
        <li>
          <NavLink href="/menu">Menu</NavLink>
        </li>
        <li>
          <NavLink href="/about">About Us</NavLink>
        </li>
        {!authToken ? (
          <>
            <Link
              href="/access/login"
              className={clsx(
                "bg-primary-900 hover:scale-[1.1] hover:bg-accent-500 hover:text-primary-900",
                authLinksBaseStyles,
              )}
            >
              Login
            </Link>
            <Link
              className={clsx(
                authLinksBaseStyles,
                "hover:text-accent-600 hover:outline hover:outline-primary-900",
              )}
              href="/access"
            >
              Sign Up
            </Link>
          </>
        ) : (
          <>
            <NavCartLink />
            <AccountLink />
          </>
        )}
      </ul>
    </nav>
  );
}

import { cookies } from "next/headers";
import Link from "next/link";
import NavigationCartLink from "./NavigationCartLink";
import NavigationBarsButton from "./NavigationBarsButton";

export default async function Navigation() {
  const token = cookies().get(process.env.JWT_SECRET)?.value;

  return (
    <nav className="z-10 md:text-md lg:text-lg xl:text-xl">
      <ul className="flex gap-6 md:gap-16 items-center">
        <div className="hidden md:flex items-center md:gap-10 lg:gap-16">
          <li>
            <Link className="hover:text-accent-500" href="/menu">
              Menu
            </Link>
          </li>
          <li>
            <Link className="hover:text-accent-500" href="/about">
              About
            </Link>
          </li>
          <li>
            {token ? (
              <Link className="hover:text-accent-500" href="/account">
                Account
              </Link>
            ) : (
              <Link className="hover:text-accent-500" href="/access">
                Sign in / log in
              </Link>
            )}
          </li>
        </div>
        <NavigationCartLink />
        <NavigationBarsButton token={token} />
      </ul>
    </nav>
  );
}

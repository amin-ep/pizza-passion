import { cookies } from "next/headers";
import Link from "next/link";
import NavigationCartLink from "./NavigationCartLink";

export default async function Navigation() {
  const token = cookies().get(process.env.JWT_SECRET)?.value;

  return (
    <nav className="z-10 text-xl">
      <ul className="flex gap-16 items-center">
        <li>
          <Link href="/menu">Menu</Link>
        </li>
        <li>
          <Link href="/about">About</Link>
        </li>
        <li>
          {token ? (
            <Link href="/account">Account</Link>
          ) : (
            <Link href="/access">Sign in / log in</Link>
          )}
        </li>

        <NavigationCartLink />
      </ul>
    </nav>
  );
}

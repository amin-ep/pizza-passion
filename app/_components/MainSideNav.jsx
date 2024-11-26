import Link from "next/link";
import Logo from "./Logo";

function MainSideNav({ isOpen, token, onClose }) {
  return (
    <div
      className={`md:hidden fixed h-dvh w-96 bg-primary-900/90 backdrop-blur-md z-60 left-0 top-0 transition-all ${
        !isOpen ? "-translate-x-96" : "translate-x-0"
      } overflow-auto py-10 max-w-[80%]`}
    >
      <ul className="flex flex-col px-8">
        <div className="flex justify-center p-6 mb-10">
          <Link href="/" className="text-[22px] text-accent-500">
            Pizza Passion
          </Link>
        </div>
        <NavItem onClose={onClose} href="/menu">
          Menu
        </NavItem>
        <NavItem onClose={onClose} href="/about">
          About
        </NavItem>
        <NavItem onClose={onClose} href={token ? "/account" : "/access"}>
          {token ? "Account" : "Sign in / log in"}
        </NavItem>
      </ul>
    </div>
  );
}

function NavItem({ children, href, onClose }) {
  return (
    <li className="border-b border-primary-200/75 py-4 text-center">
      <Link
        className="hover:text-accent-500 text-lg"
        href={href}
        onClick={onClose}
      >
        {children}
      </Link>
    </li>
  );
}

export default MainSideNav;

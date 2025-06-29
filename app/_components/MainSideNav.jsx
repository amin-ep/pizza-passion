import Link from "next/link";

function MainSideNav({ isOpen, token, onClose }) {
  return (
    <div
      className={`z-60 fixed left-0 top-0 h-dvh w-96 bg-primary-900/90 backdrop-blur-md transition-all md:hidden ${
        !isOpen ? "-translate-x-96" : "translate-x-0"
      } max-w-[80%] overflow-auto py-10`}
    >
      <ul className="flex flex-col px-8">
        <div className="mb-10 flex justify-center p-6">
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
        className="text-lg hover:text-accent-500"
        href={href}
        onClick={onClose}
      >
        {children}
      </Link>
    </li>
  );
}

export default MainSideNav;

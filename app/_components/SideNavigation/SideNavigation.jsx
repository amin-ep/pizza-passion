import SideNavigationListItem from "../motions/SideNavigationListItem";
import SideNavigationLink from "./SideNavigationLink";
import SignOut from "./SignOut";

const navItems = [
  {
    title: "Home",
    alt: "home",
    iconPath: "/icons/home-icon-primary-light.svg",
    href: "/account",
  },
  {
    title: "Orders",
    alt: "orders",
    iconPath: "/icons/calender-icon-primary-light.svg",
    href: "/account/orders",
  },
  {
    title: "Profile",
    alt: "profile",
    iconPath: "/icons/profile-icon-primary-light.svg",
    href: "/account/profile",
  },
];
function SideNavigation() {
  return (
    <nav className="left-0 hidden h-[35rem] flex-col border-r border-primary-900 md:flex">
      <ul className="flex h-full flex-col gap-2 text-lg">
        {navItems.map((item, index) => (
          <SideNavigationListItem key={index} index={index}>
            <SideNavigationLink
              alt={item.alt}
              iconPath={item.iconPath}
              href={item.href}
            >
              {item.title}
            </SideNavigationLink>
          </SideNavigationListItem>
        ))}
      </ul>
      <SignOut />
    </nav>
  );
}

export default SideNavigation;

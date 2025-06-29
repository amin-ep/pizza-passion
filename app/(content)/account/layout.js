import BottomNavigation from "@/app/_components/BottomNavigation";
import SideNavigation from "@/app/_components/SideNavigation/SideNavigation";

export default function Layout({ children }) {
  return (
    <div className="relative grid h-96 gap-12 md:grid-cols-[16rem_1fr]">
      <SideNavigation />
      <div className="h-[35rem] overflow-auto scroll-smooth p-1">
        {children}
      </div>
      <BottomNavigation />
    </div>
  );
}

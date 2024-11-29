import SideNavigation from "@/app/_components/SideNavigation";
import BottomNavigation from "../_components/BottomNavigation";

export default function Layout({ children }) {
  return (
    <div className="grid md:grid-cols-[16rem_1fr] h-96 gap-12 relative">
      <SideNavigation />
      <div className="p-1 h-[35rem] overflow-auto scroll-smooth">
        {children}
      </div>
      <BottomNavigation />
    </div>
  );
}

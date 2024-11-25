import SideNavigation from "@/app/_components/SideNavigation";

export default function Layout({ children }) {
  return (
    <div className="grid grid-cols-[16rem_1fr] h-96 gap-12">
      <SideNavigation />
      <div className="p-1 h-[35rem] overflow-auto scroll-smooth">
        {children}
      </div>
    </div>
  );
}

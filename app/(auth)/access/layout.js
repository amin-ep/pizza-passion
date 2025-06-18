import AccessNavLink from "@/app/_components/AccessNavLink";
import AccessSection from "@/app/_components/AccessSection/AccessSection";

export default function AccessLayout({ children }) {
  return (
    <div className="flex items-center justify-center">
      <div className="mx-auto my-10 grid w-[95%] max-w-96 grid-cols-1 bg-primary-900 shadow-lg md:max-w-[700px] md:grid-cols-[1fr_350px] lg:max-w-[53rem] lg:grid-cols-[1fr_400px] xl:max-w-[56rem]">
        <AccessSection />
        <div className="p-6 lg:p-8">
          <header className="mb-6">
            <nav className="flex items-center">
              <AccessNavLink href="/access">Signup</AccessNavLink>
              <AccessNavLink href="/access/login">Login</AccessNavLink>
            </nav>
          </header>
          {children}
        </div>
      </div>
    </div>
  );
}

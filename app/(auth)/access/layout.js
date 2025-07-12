import AccessLayoutContainer from "@/app/_components/AccessLayoutContainer";
import AccessNavLink from "@/app/_components/AccessNavLink";
import AccessSection from "@/app/_components/AccessSection/AccessSection";

export default function AccessLayout({ children }) {
  return (
    <div className="flex items-center justify-center">
      <AccessLayoutContainer>
        <AccessSection />
        <div className="p-6 lg:p-8">
          <header className="mb-6">
            <nav className="flex items-center">
              <AccessNavLink delay={0.2} href="/access">
                Signup
              </AccessNavLink>
              <AccessNavLink delay={0.4} href="/access/login">
                Login
              </AccessNavLink>
            </nav>
          </header>
          {children}
        </div>
      </AccessLayoutContainer>
    </div>
  );
}

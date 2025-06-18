import Logo from "../_components/Logo";
import MainHeader from "../_components/MainHeader/MainHeader";
import MainNavigation from "../_components/MainNavigation/MainNavigation";

export const metadata = {
  title: {
    template: "%s | Pizza Passion",
    default: "Welcome | Pizza Passion",
  },
  description: "Order At Home, Eat at Home.Website for ordering italian pizzas",
};

export default function RootLayout({ children }) {
  return (
    <>
      <MainHeader>
        <Logo />
        <MainNavigation />
      </MainHeader>
      <main className={`bg-primary-950 text-primary-100`}>
        <div className="mx-auto grid w-full max-w-7xl flex-1 px-8 py-12">
          {children}
        </div>
      </main>
    </>
  );
}

import { AuthProvider } from "@/app/_contexts/AuthContext";
import "@/app/_styles/globals.css";
import { Josefin_Sans } from "next/font/google";
import Header from "@/app/_components/Header";
import { CartProvider } from "./_contexts/CartContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navigation from "@/app/_components/Navigation";

const josefin = Josefin_Sans({
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: {
    template: "%s | Pizza Passion",
    default: "Welcome | Pizza Passion",
  },
  description: "Order At Home, Eat at Home.Website for ordering italian pizzas",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${josefin.className} bg-primary-950 text-primary-100`}>
        <AuthProvider>
          <CartProvider>
            <ToastContainer
              autoClose={5000}
              limit={3}
              position="top-center"
              draggable="touch"
              theme="dark"
            />
            <Header>
              <Navigation />
            </Header>
            <div className="flex-1 px-8 py-12 grid">
              <main className="max-w-7xl mx-auto w-full overflow-hidden">
                {children}
              </main>
            </div>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

import { AuthProvider } from "@/app/_contexts/AuthContext";
import "@/app/_styles/globals.css";
import { Josefin_Sans } from "next/font/google";
import Header from "./_components/Header";
import { CartProvider } from "./_contexts/CartContext";

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
            <Header />
            <div className="flex-1 px-8 py-12 grid">
              <main className="max-w-7xl mx-auto w-full">{children}</main>
            </div>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

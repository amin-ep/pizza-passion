import "@/app/_styles/globals.css";
import { Josefin_Sans } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
        <ToastContainer
          autoClose={5000}
          limit={3}
          position="top-right"
          draggable="touch"
          theme="dark"
        />

        <div>{children}</div>
      </body>
    </html>
  );
}

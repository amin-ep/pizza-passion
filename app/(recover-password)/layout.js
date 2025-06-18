import "@/app/_styles/globals.css";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./layout.module.css";
import clsx from "clsx";

export const metadata = {
  title: {
    template: "%s | Pizza Passion",
    default: "Welcome | Pizza Passion",
  },
  description: "Order At Home, Eat at Home.Website for ordering italian pizzas",
};

export default function RootLayout({ children }) {
  return (
    <div
      className={clsx(
        styles.layout,
        "flex h-screen items-center justify-center overflow-auto",
      )}
    >
      {children}
    </div>
  );
}

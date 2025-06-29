import "@/app/_styles/globals.css";

import clsx from "clsx";
import "react-toastify/dist/ReactToastify.css";
import styles from "./layout.module.css";

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

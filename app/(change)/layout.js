import clsx from "clsx";
import styles from "./layout.module.css";
export const metadata = {
  title: {
    template: "%s | Pizza Passion",
    default: "Welcome | Pizza Passion",
  },
  description: "Order At Home, Eat at Home.Website for ordering italian pizzas",
};

export default function ChangeRootLayout({ children }) {
  return <div className={clsx(styles.layout)}>{children}</div>;
}

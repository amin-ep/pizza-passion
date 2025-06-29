import clsx from "clsx";
import { cookies } from "next/headers";
import Link from "next/link";
import styles from "./WelcomeSection.module.css";

export default async function WelcomeSection() {
  const authToken = await cookies().get(process.env.JWT_SECRET);

  return (
    <section
      className={clsx(
        styles.section,
        "relative flex h-screen items-center justify-center bg-primary-950/70 px-2 text-center",
      )}
    >
      <div className="max-w-96 text-center lg:max-w-[480px]">
        <header className={styles.header}>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
            Welcome to <br /> <span className="font-bold">PIZZA PASSION</span>
          </h1>
        </header>
        <div className="text-sm sm:text-base md:text-lg">
          <p className={styles.description}>
            Made with fresh dough, premium toppings, and fired up fast — our
            pizzas are handcrafted to satisfy every craving.
          </p>
          <div
            className={clsx(
              styles.links,
              "mt-6 flex items-center justify-center gap-2 sm:mt-7 md:mt-8 md:gap-4",
            )}
          >
            {!authToken && (
              <Link className="btn flex-1" href="/access">
                Signup
              </Link>
            )}
            <Link className="btn flex-1" href="/menu">
              View Menu
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

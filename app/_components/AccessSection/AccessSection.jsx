import clsx from "clsx";
import Link from "next/link";

import styles from "./AccessSection.module.css";
import Image from "next/image";
import FormHeaderLogo from "../FormHeaderLogo";

function AccessSection() {
  return (
    <section
      className={clsx("hidden p-6 text-left md:block lg:p-10", styles.section)}
    >
      <FormHeaderLogo />
      <div className="block text-left">
        <p className="mt-4 text-base lg:text-lg xl:text-xl">
          Stay at Home, Order At home, Pay at Door!
          <strong>Easy! Just Click and order!</strong>
        </p>
        <p className="mt-4 text-base lg:text-lg xl:text-xl">
          Fast convenient, and contactless delivery to your door.
        </p>
        <div className="mt-5">
          <Link className="btn w-48" href="/">
            Back Home
          </Link>
        </div>
      </div>
    </section>
  );
}

export default AccessSection;

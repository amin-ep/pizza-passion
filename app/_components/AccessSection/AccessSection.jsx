import clsx from "clsx";
import AccessParagraph from "./AccessParagraph";
import styles from "./AccessSection.module.css";
import BackLink from "./BackLink";
import AccessLogo from "./AccessLogo";

function AccessSection() {
  return (
    <section
      className={clsx("hidden p-6 text-left md:block lg:p-10", styles.section)}
    >
      <AccessLogo />
      <div className="block text-left">
        <AccessParagraph delay={0.4}>
          Stay at Home, Order At home, Pay at Door!
          <strong>Easy! Just Click and order!</strong>
        </AccessParagraph>
        <AccessParagraph delay={0.8}>
          Fast convenient, and contactless delivery to your door.
        </AccessParagraph>
        <div className="mt-5">
          <BackLink />
        </div>
      </div>
    </section>
  );
}

export default AccessSection;

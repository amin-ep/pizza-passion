import FormHeaderLogo from "@/app/_components/FormHeaderLogo";
import VerifyForm from "@/app/_components/VerifyForm";
import VerifyTimer from "@/app/_components/VerifyTimer";
import clsx from "clsx";
import { cookies } from "next/headers";
import styles from "./styles.module.css";

export const metadata = {
  title: "Verify Email",
  description:
    "Verify your email to activate your Pizza Passion account. Enter the code we sent to start ordering your favorite pizzas.",
};

export default async function VerifyPage() {
  const email = await cookies().get(process.env.SIGN_UP_EMAIL)?.value;
  return (
    <div
      className={clsx(styles.page, "flex h-screen items-center justify-center")}
    >
      <div className="rounded-sm bg-white p-6 shadow-sm lg:p-8">
        <div className="font-semibold text-primary-950">
          <FormHeaderLogo textColor="dark" />
          <div className="mt-3 sm:mt-5">
            <h2 className="text-lg sm:text-xl md:text-2xl">
              Verify Your Email
            </h2>
            <p className="text-sm sm:text-base md:text-lg">
              Please enter the verification code we sent to: <br />{" "}
              {email ?? "test@email.io"}
            </p>
          </div>
        </div>
        <VerifyForm email={email} />
        <VerifyTimer email={email} />
      </div>
    </div>
  );
}

import clsx from "clsx";
import styles from "./styles.module.css";
import Image from "next/image";
import { cookies } from "next/headers";
import VerifyForm from "@/app/_components/VerifyForm";
import VerifyTimer from "@/app/_components/VerifyTimer";
import FormHeaderLogo from "@/app/_components/FormHeaderLogo";

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

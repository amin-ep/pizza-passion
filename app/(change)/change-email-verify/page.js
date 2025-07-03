import ChangeEmailTimer from "@/app/_components/ChangeEmailTimer";
import ChangeEmailVerifyForm from "@/app/_components/ChangeEmailVerifyForm";
import FormHeaderLogo from "@/app/_components/FormHeaderLogo";
import { cookies } from "next/headers";

export const metadata = {
  title: "Verify New Email",
  description:
    "Confirm your new email address by entering the verification code we sent. Secure your Pizza Passion account with an up-to-date email.",
};

export default async function ChangeEmailVerify() {
  const candidateEmail = await cookies().get(process.env.CHANGE_EMAIL)?.value;
  return (
    <div className="rounded-sm bg-primary-900 p-6 shadow-md lg:p-8">
      <div className="font-semibold text-primary-50">
        <FormHeaderLogo textColor="light" />
        <div className="mt-3 sm:mt-5">
          <h2 className="text-lg sm:text-xl md:text-2xl">
            Verify Your New Email
          </h2>
          <p className="text-sm sm:text-base md:text-lg">
            Please enter the verification code we sent to: <br />{" "}
            {candidateEmail ?? "test@email.io"}
          </p>
        </div>
      </div>
      <ChangeEmailVerifyForm candidateEmail={candidateEmail} />
      <ChangeEmailTimer email={candidateEmail} />
    </div>
  );
}

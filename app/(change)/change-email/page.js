import ChangeEmailForm from "@/app/_components/ChangeEmailForm";
import FormHeaderLogo from "@/app/_components/FormHeaderLogo";
import { getMe } from "@/app/_services/user-api";

export const metadata = {
  title: "Change Email",
  description:
    "Change your registered email address for your Pizza Passion account. Enter your new email to receive a verification code.",
};

export default async function ChangeEmailPage() {
  const currentUser = await getMe();

  return (
    <div className="rounded-sm bg-primary-900 p-6 shadow-md lg:p-8">
      <FormHeaderLogo />
      <h2 className="mt-3 text-center text-lg sm:mt-5 sm:text-xl md:text-2xl">
        Change Email
      </h2>
      {currentUser && <ChangeEmailForm email={currentUser?.email} />}
    </div>
  );
}

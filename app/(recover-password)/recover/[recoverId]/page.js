import FormHeaderLogo from "@/app/_components/FormHeaderLogo";
import RecoverPasswordForm from "@/app/_components/RecoverPasswordForm";

export const metadata = {
  title: "Recover Password",
  description:
    "Set a new password for your Pizza Passion account. Enter and confirm your new password to regain access.",
};

export default function RecoverPage({ params }) {
  const { recoverId } = params;
  return (
    <div className="rounded-sm bg-primary-950 p-6 shadow-md lg:p-8">
      <FormHeaderLogo />
      <h2 className="mt-3 text-center text-lg sm:mt-5 sm:text-xl md:text-2xl">
        Reset your password
      </h2>
      <RecoverPasswordForm recoverId={recoverId} />
    </div>
  );
}

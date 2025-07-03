import ForgetPasswordForm from "@/app/_components/ForgetPasswordForm";
import FormHeaderLogo from "@/app/_components/FormHeaderLogo";

export const metadata = {
  title: "Forget Password",
  description:
    "Forgot your password? Enter your email and we’ll send you a link to reset it securely.",
};

export default function ForgetPage() {
  return (
    <div className="rounded-sm bg-primary-950 p-6 shadow-md lg:p-8">
      <FormHeaderLogo align="center" textColor="light" />
      <h2 className="mt-3 text-center text-lg sm:mt-5 sm:text-xl md:text-2xl">
        Forget your password?
      </h2>
      <ForgetPasswordForm />
    </div>
  );
}

import Image from "next/image";
import Link from "next/link";
import FormHeaderLogo from "./FormHeaderLogo";

export default function EmailSent({ email }) {
  return (
    <div className="rounded-sm bg-primary-950 p-6 shadow-md lg:p-8">
      <FormHeaderLogo align="center" />
      <div className="flex items-center justify-center">
        <Image
          src="/icons/email-icon-primary.svg"
          alt="email"
          width={50}
          height={50}
          className="w-28 sm:w-32 md:w-36"
        />
      </div>
      <h1 className="mt-3 text-center text-lg sm:text-xl">
        An email has been sent to {email}!
      </h1>
      <div className="mt-5 flex items-center justify-center">
        <Link
          className="rounded-sm bg-primary-800 p-2 px-4 text-sm transition-all hover:-translate-y-1 hover:bg-primary-700 active:translate-x-0 sm:text-base"
          href="https://mail.google.com/mail/"
          target="_blank"
        >
          Checkout Emails
        </Link>
      </div>
    </div>
  );
}

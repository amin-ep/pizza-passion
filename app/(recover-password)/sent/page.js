import EmailSent from "@/app/_components/EmailSent";
import FormHeaderLogo from "@/app/_components/FormHeaderLogo";
import { cookies } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function SentPage() {
  const email = await cookies().get(process.env.FORGET_EMAIL)?.value;

  if (!email) {
    redirect("/forget");
  }

  return <EmailSent email={email} />;
}

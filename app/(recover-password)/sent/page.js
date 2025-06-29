import EmailSent from "@/app/_components/EmailSent";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function SentPage() {
  const email = await cookies().get(process.env.FORGET_EMAIL)?.value;

  if (!email) {
    redirect("/forget");
  }

  return <EmailSent email={email} />;
}

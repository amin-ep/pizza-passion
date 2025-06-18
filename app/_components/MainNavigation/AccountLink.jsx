import { getMe } from "@/app/_services/user-api";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default async function AccountLink() {
  const currentUser = await getMe();
  return (
    <Link href="/account">
      <Image
        src="/icons/user-icon-accent.svg"
        alt="user"
        width={35}
        height={35}
        className="w-7 sm:w-8 md:w-10"
      />
    </Link>
  );
}

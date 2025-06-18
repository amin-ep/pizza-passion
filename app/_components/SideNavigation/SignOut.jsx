import { logout } from "@/actions/auth-actions";
import Image from "next/image";
import React from "react";

export default function SignOut() {
  return (
    <form action={logout}>
      <button
        type="submit"
        className="flex w-full items-center gap-4 rounded-l-sm px-5 py-3 text-sm font-semibold text-primary-200 transition-colors hover:bg-primary-900 hover:text-primary-100 lg:text-base"
      >
        <Image
          className="w-6 lg:w-7"
          src="/icons/logout-icon-primary-light.svg"
          alt="logout"
          width={25}
          height={25}
        />
        Sign Out
      </button>
    </form>
  );
}

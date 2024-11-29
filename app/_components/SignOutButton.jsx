"use client";

import { HiOutlineArrowRightOnRectangle } from "react-icons/hi2";

import { useAuth } from "../_contexts/AuthContext";

function SignOutButton() {
  const { logout } = useAuth();
  return (
    <form action={logout}>
      <button className="py-3 px-5 hover:bg-primary-900 hover:text-primary-100 transition-colors flex items-center gap-4 font-semibold text-primary-200 w-full">
        <HiOutlineArrowRightOnRectangle className="h-5 w-5 text-primary-600" />
        <span>Sign out</span>
      </button>
    </form>
  );
}

export default SignOutButton;

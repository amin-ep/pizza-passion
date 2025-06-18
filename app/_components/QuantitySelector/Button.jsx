"use client";

import { useFormStatus } from "react-dom";
import SpinnerMini from "../SpinnerMini";

export default function Button({ children }) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="flex aspect-square w-7 items-center justify-center rounded-sm bg-accent-500 p-1 hover:bg-accent-600 disabled:cursor-not-allowed md:w-10"
    >
      {pending ? <SpinnerMini /> : children}
    </button>
  );
}

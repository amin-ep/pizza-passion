"use client";

import { useFormStatus } from "react-dom";
import SpinnerMini from "../SpinnerMini";

export default function CartItemButton({ children }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      className="flex h-full w-full items-center justify-center bg-accent-500"
    >
      {pending ? <SpinnerMini /> : children}
    </button>
  );
}

"use client";

import { motion } from "framer-motion";
import { memo } from "react";
import { BsCartPlus } from "react-icons/bs";

import { useFormStatus } from "react-dom";
import SpinnerMini from "./SpinnerMini";

export default memo(function AddToCartButton() {
  const { pending } = useFormStatus();

  return (
    <motion.div
      initial={{
        y: 30,
        opacity: 0,
      }}
      animate={{
        y: 0,
        opacity: 1,
      }}
      className="mt-10 flex items-center justify-center"
    >
      <button
        disabled={pending}
        type="submit"
        className="relative z-[3] flex w-fit items-center justify-center gap-2 rounded-sm border border-accent-600 p-2 text-sm font-semibold text-accent-600 transition-all duration-[200] after:absolute after:inset-0 after:z-[-1] after:scale-0 after:bg-accent-600 after:transition-transform after:duration-300 hover:text-primary-900 hover:after:scale-100 active:translate-y-1 sm:p-3 sm:text-base"
      >
        <span>
          {pending ? (
            <SpinnerMini />
          ) : (
            <BsCartPlus className="text-lg sm:text-xl" />
          )}
        </span>
        <p className="align-middle">Add to Cart</p>
      </button>
    </motion.div>
  );
});

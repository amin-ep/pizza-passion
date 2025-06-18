"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRef, useTransition } from "react";
import { useForm } from "react-hook-form";
import { verifyEmailSchema } from "../_validators/auth-validators";
import FormErrorList from "./FormErrorList";
import LinkButton from "./LinkButton";
import { motion } from "framer-motion";
import { verifyEmail } from "@/actions/auth-actions";
import { toast } from "react-toastify";
import { redirect } from "next/navigation";

export default function VerifyForm({ email }) {
  const [isPending, startTransition] = useTransition();
  const {
    formState: { errors },
    setValue,
    handleSubmit,
  } = useForm({
    resolver: zodResolver(verifyEmailSchema),
  });

  const inputRef = useRef([]);
  const justFocused = useRef(false);

  const onChange = (e, index) => {
    const value = e.target.value;

    if (!/^\d$/.test(value)) {
      e.target.value = "";
      return;
    } else {
      const code = inputRef.current.map((input) => input.value).join("");
      setValue("verificationCode", code);
      if (value.length === 1 && index < inputRef.current.length - 1) {
        inputRef.current[index + 1].focus();
      }
    }
  };

  const onKeyDown = (e, index) => {
    const clickedKey = e.key;

    if (clickedKey === "Backspace" && !e.target.value && index > 0) {
      justFocused.current = true;
      inputRef.current[index - 1].focus();
    }
  };

  const onFocus = (e, index) => {
    if (justFocused.current) {
      justFocused.current = false;
      return;
    }
    for (let i = 0; i < inputRef.current.length; i++) {
      if (inputRef.current[i].value.length === 0) {
        inputRef.current[i].focus();
        break;
      }
    }
  };

  function onSubmit(data) {
    startTransition(async () => {
      console.log(data);
      const response = await verifyEmail({
        email: email,
        verificationCode: data.verificationCode,
      });
      if (response.status === "success") {
        toast.success(response.message);
        redirect("/");
      } else {
        toast.error(response.message);
      }
    });
  }

  return (
    <form className="my-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex justify-start gap-1 sm:gap-2 md:gap-3">
        {[0, 1, 2, 3, 4, 5].map((idx) => (
          <motion.input
            className="aspect-square w-10 rounded-sm border border-gray-300 text-center text-sm text-primary-900 outline-none focus:border-primary-600 focus:bg-primary-50 sm:w-11 sm:text-base md:w-12 md:text-lg"
            key={idx}
            ref={(el) => (inputRef.current[idx] = el)}
            onChange={(e) => onChange(e, idx)}
            onKeyDown={(e) => onKeyDown(e, idx)}
            onFocus={(e) => onFocus(e, idx)}
            maxLength={1}
            type="text"
            inputMode="numeric"
            pattern="\d*"
            animate={{
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: 0.4,
              delay: `0.${idx + 1}`,
            }}
          />
        ))}
      </div>
      {errors.verificationCode && (
        <FormErrorList errors={[errors.verificationCode.message]} />
      )}
      <div className="mt-4">
        <LinkButton disabled={isPending} isPending={isPending} type="submit">
          Submit
        </LinkButton>
      </div>
    </form>
  );
}

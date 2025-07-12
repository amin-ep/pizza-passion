"use client";

import React, { useTransition } from "react";
import FormControl from "./FormControl";
import { useForm } from "react-hook-form";
import LinkButton from "./LinkButton";
import { zodResolver } from "@hookform/resolvers/zod";
import { forgetPasswordSchema } from "../_validators/auth-validators";
import FormErrorList from "./FormErrorList";
import { forgetPassword } from "@/actions/auth-actions";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function ForgetPasswordForm() {
  const [isPending, startTransition] = useTransition();

  const router = useRouter();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: zodResolver(forgetPasswordSchema),
  });

  function onSubmit(data) {
    startTransition(async () => {
      const res = await forgetPassword(data);
      if (res.status === "success") {
        toast.success(res.message);
        router.push("/sent");
      } else {
        toast.error(res.message);
      }
    });
  }

  return (
    <form className="mt-4 md:mt-6" onSubmit={handleSubmit(onSubmit)}>
      <FormControl id="email" label="Email">
        <motion.input
          initial={{
            y: 15,
            opacity: 0,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          placeholder="input your email..."
          className="input"
          type="email"
          {...register("email")}
          id="email"
        />
      </FormControl>
      {errors.email && <FormErrorList errors={Object.values(errors)} />}
      <LinkButton isPending={isPending} extraClasses="mt-4" type="submit">
        Send recover code
      </LinkButton>
    </form>
  );
}

"use client";

import { recoverPassword } from "@/actions/auth-actions";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useEffect, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { recoverPasswordSchema } from "../_validators/auth-validators";
import FormControl from "./FormControl";
import FormErrorList from "./FormErrorList";
import LinkButton from "./LinkButton";

export default function RecoverPasswordForm({ recoverId }) {
  const [isPending, startTransition] = useTransition();
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    resolver: zodResolver(recoverPasswordSchema),
  });

  const router = useRouter();

  useEffect(() => {
    reset({
      recoverId: recoverId,
    });
  }, [recoverId, reset]);

  const errorsArr = Object.values(errors).map((err) => err.message);

  function onSubmit(data) {
    startTransition(() => {
      recoverPassword({ recoverId, password: data.password }).then((res) => {
        if (res.status === "success") {
          toast.success(res.message);
          router.push("/access/login");
        } else {
          toast.error(res.message);
        }
      });
    });
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-4 sm:mt-6">
      <input type="hidden" {...register("recoverId")} />
      <FormControl id="password" label="Password">
        <input
          type="password"
          id="password"
          className="input"
          {...register("password")}
        />
      </FormControl>
      <FormControl id="password-confirm" label="Password">
        <input
          type="password"
          id="password-confirm"
          {...register("confirmPassword")}
          className="input"
        />
      </FormControl>
      {errorsArr && <FormErrorList errors={Object.values(errorsArr)} />}
      <LinkButton extraClasses="mt-5" type="submit" isPending={isPending}>
        Reset Password
      </LinkButton>
    </form>
  );
}

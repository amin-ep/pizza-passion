"use client";

import { verifyEmail } from "@/actions/auth-actions";
import { zodResolver } from "@hookform/resolvers/zod";
import { redirect } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { verifyEmailSchema } from "../_validators/auth-validators";
import FormErrorList from "./FormErrorList";
import LinkButton from "./LinkButton";
import VerifyInput from "./VerifyInput";

export default function VerifyForm({ email }) {
  const [isPending, startTransition] = useTransition();
  const {
    formState: { errors },
    setValue,
    handleSubmit,
  } = useForm({
    resolver: zodResolver(verifyEmailSchema),
  });

  function onSubmit(data) {
    startTransition(async () => {
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
      <VerifyInput setValue={setValue} />
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

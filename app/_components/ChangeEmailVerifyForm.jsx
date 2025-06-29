"use client";

import { verifyChangeEmail } from "@/actions/profile-actions";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { changeEmailVerifySchema } from "../_validators/profile-validators";
import FormErrorList from "./FormErrorList";
import LinkButton from "./LinkButton";
import VerifyInput from "./VerifyInput";

function ChangeEmailVerifyForm() {
  const [isPending, startTransition] = useTransition();
  const {
    setValue,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: zodResolver(changeEmailVerifySchema),
  });

  const router = useRouter();

  function onSubmit(data) {
    startTransition(() => {
      verifyChangeEmail(data).then((res) => {
        if (res.status === "success") {
          toast.success(res.message);
          router.push("/account/profile");
        } else {
          toast.error(res.message);
        }
      });
    });
  }
  return (
    <form className="my-10" onSubmit={handleSubmit(onSubmit)}>
      <VerifyInput setValue={setValue} theme="dark" />
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

export default ChangeEmailVerifyForm;

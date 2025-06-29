"use client";

import { requestChangeEmail } from "@/actions/profile-actions";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { convertErrors } from "../_utils/helpers";
import { changeEmailSchema } from "../_validators/profile-validators";
import FormControl from "./FormControl";
import FormErrorList from "./FormErrorList";
import LinkButton from "./LinkButton";

export default function ChangeEmailForm({ email }) {
  const [isPending, startTransition] = useTransition();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(changeEmailSchema),
    defaultValues: {
      email: email,
    },
  });

  const router = useRouter();

  function onSubmit(data) {
    startTransition(() => {
      requestChangeEmail(data).then((res) => {
        if (res.status === "success") {
          toast.info(res.message);
          router.push("/change-email-verify");
        } else {
          toast.error(res.message);
        }
      });
    });
  }

  const errorArr = convertErrors(errors);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="hidden" {...register("email")} />
      <FormControl id="email" label="New Email">
        <input
          type="email"
          id="email"
          className="input"
          {...register("candidateEmail")}
        />
      </FormControl>
      {errorArr.length > 0 && <FormErrorList errors={errorArr} />}
      <LinkButton
        isPending={isPending}
        extraClasses="mt-4 w-full"
        type="submit"
      >
        Send Email
      </LinkButton>
    </form>
  );
}

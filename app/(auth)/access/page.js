"use client";

import { signup } from "@/actions/auth-actions";
import FormControl from "@/app/_components/FormControl";
import FormErrorList from "@/app/_components/FormErrorList";
import LinkButton from "@/app/_components/LinkButton";
import { signupSchema } from "@/app/_validators/auth-validators";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function SignupPage() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: zodResolver(signupSchema),
  });

  function onSubmit(data) {
    startTransition(async () => {
      const result = await signup(data);

      if (result.status === "success") {
        toast.success(result.message);
        router.push("/verify");
      } else {
        toast.error(result.message);
      }
    });
  }

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="grid grid-cols-2 gap-4 sm:gap-5 md:gap-6">
        <FormControl id="first-name" label="First Name">
          <input
            placeholder="your name"
            type="text"
            id="first-name"
            className="input"
            autoComplete="off"
            {...register("firstName")}
          />
        </FormControl>
        <FormControl id="last-name" label="Last Name">
          <input
            placeholder="your last name"
            type="text"
            id="last-name"
            className="input"
            autoComplete="off"
            {...register("lastName")}
          />
        </FormControl>
      </div>
      <FormControl id="email" label="Email">
        <input
          placeholder="enter a valid email"
          type="email"
          id="email"
          className="input"
          autoComplete="off"
          {...register("email")}
        />
      </FormControl>
      <FormControl id="phone" label="Phone Number (optional)">
        <input
          placeholder="Your phone number"
          type="phone"
          id="phone"
          className="input"
          autoComplete="off"
          {...register("phone")}
        />
      </FormControl>
      <FormControl id="password" label="Password">
        <input
          placeholder="input a password"
          type="password"
          id="password"
          className="input"
          autoComplete="off"
          {...register("password")}
        />
      </FormControl>
      <FormControl id="password-confirm" label="Password Confirm">
        <input
          placeholder="confirm your password"
          type="password"
          id="password-confirm"
          className="input"
          autoComplete="off"
          {...register("confirmPassword")}
        />
      </FormControl>
      {errors && Object.values(errors).map((err) => err.message).length > 0 && (
        <FormErrorList
          errors={Object.values(errors).map((err) => err.message)}
        />
      )}
      <LinkButton type="submit" isPending={isPending}>
        Create Account
      </LinkButton>
    </form>
  );
}

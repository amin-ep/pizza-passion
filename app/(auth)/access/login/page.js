"use client";

import { login } from "@/actions/auth-actions";
import FormControl from "@/app/_components/FormControl";
import FormErrorList from "@/app/_components/FormErrorList";
import LinkButton from "@/app/_components/LinkButton";
import { loginSchema } from "@/app/_validators/auth-validators";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function LoginPage() {
  const [isPending, startTransition] = useTransition();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const router = useRouter();

  function onSubmit(data) {
    startTransition(async () => {
      const response = await login(data);
      if (response.status === "success") {
        router.push("/menu");
      } else if (response.status === "error") {
        toast.error(response.message);
      }
    });
  }

  const errorsArr = Object.values(errors).map((err) => err.message);
  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <FormControl id="email" label="Email">
        <input
          placeholder="enter your email"
          type="email"
          id="email"
          className="input"
          autoComplete="off"
          {...register("email")}
        />
      </FormControl>
      <FormControl id="password" label="Password">
        <input
          placeholder="input a your password"
          type="password"
          id="password"
          className="input"
          autoComplete="off"
          {...register("password")}
        />
      </FormControl>
      {errorsArr && errorsArr.length > 0 && (
        <FormErrorList errors={Object.values(errorsArr)} />
      )}
      <LinkButton isPending={isPending} type="submit">
        Log In
      </LinkButton>
      <div className="text-center">
        <Link href="/forget" className="hover:text-accent-500">
          Forget Password?
        </Link>
      </div>
    </form>
  );
}

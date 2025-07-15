"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { loginSchema } from "../_validators/auth-validators";
import { useRouter } from "next/navigation";
import { login } from "@/actions/auth-actions";
import { toast } from "react-toastify";
import FormControl from "./FormControl";
import FormErrorList from "./FormErrorList";
import LinkButton from "./LinkButton";
import Link from "next/link";
import { motion } from "framer-motion";

function LoginForm() {
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
        <motion.input
          initial={{
            y: 15,
            opacity: 0,
          }}
          animate={{
            y: 0,
            opacity: 1,
          }}
          placeholder="enter your email"
          type="email"
          id="email"
          className="input"
          autoComplete="off"
          {...register("email")}
        />
      </FormControl>
      <FormControl delay={0.4} id="password" label="Password">
        <motion.input
          initial={{
            y: 15,
            opacity: 0,
          }}
          animate={{
            y: 0,
            opacity: 1,
          }}
          transition={{
            delay: 0.4,
          }}
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
      <motion.div
        initial={{
          y: 15,
          opacity: 0,
        }}
        animate={{
          y: 0,
          opacity: 1,
        }}
        transition={{
          delay: 0.8,
        }}
        className="w-full"
      >
        <LinkButton
          extraClasses="w-full"
          isPending={isPending}
          disabled={isPending}
          type="submit"
        >
          Log In
        </LinkButton>
      </motion.div>
      <div className="text-center">
        <Link href="/forget" className="hover:text-accent-500">
          Forget Password?
        </Link>
      </div>
    </form>
  );
}

export default LoginForm;

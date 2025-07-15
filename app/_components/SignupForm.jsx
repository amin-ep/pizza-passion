"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { signupSchema } from "../_validators/auth-validators";
import { signup } from "@/actions/auth-actions";
import { toast } from "react-toastify";
import FormControl from "./FormControl";
import FormErrorList from "./FormErrorList";
import LinkButton from "./LinkButton";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";

export default function SignupForm() {
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
          <motion.input
            initial={{
              opacity: 0,
              y: 15,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            placeholder="your name"
            type="text"
            id="first-name"
            className="input"
            autoComplete="off"
            {...register("firstName")}
          />
        </FormControl>
        <FormControl id="last-name" label="Last Name">
          <motion.input
            initial={{
              opacity: 0,
              y: 15,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
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
        <motion.input
          initial={{
            opacity: 0,
            y: 15,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.4,
          }}
          placeholder="enter a valid email"
          type="email"
          id="email"
          className="input"
          autoComplete="off"
          {...register("email")}
        />
      </FormControl>
      <FormControl id="phone" label="Phone Number (optional)">
        <motion.input
          initial={{
            opacity: 0,
            y: 15,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.8,
          }}
          placeholder="Your phone number"
          type="phone"
          id="phone"
          className="input"
          autoComplete="off"
          {...register("phone")}
        />
      </FormControl>
      <FormControl id="password" label="Password">
        <motion.input
          initial={{
            opacity: 0,
            y: 15,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 1.2,
          }}
          placeholder="input a password"
          type="password"
          id="password"
          className="input"
          autoComplete="off"
          {...register("password")}
        />
      </FormControl>
      <FormControl id="password-confirm" label="Password Confirm">
        <motion.input
          initial={{
            opacity: 0,
            y: 15,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 1.6,
          }}
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
      <motion.div
        className="w-full"
        initial={{
          opacity: 0,
          y: 15,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          delay: 0.4,
        }}
      >
        <LinkButton
          extraClasses="w-full"
          type="submit"
          isPending={isPending}
          disabled={isPending}
        >
          Create Account
        </LinkButton>
      </motion.div>
    </form>
  );
}

"use client";

import { useAuth } from "@/app/_contexts/AuthContext";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import FormControl from "./FormControl";
import LinkButton from "./LinkButton";
import SpinnerMini from "./SpinnerMini";

function Login() {
  const [isPending, startTransition] = useTransition();
  const [passwordIsHide, setPasswordIsHide] = useState(true);
  const { login } = useAuth();

  const {
    formState: { errors },
    handleSubmit,
    register,
    getValues,
  } = useForm();

  const onSubmit = (data) => {
    startTransition(() => {
      login({
        email: data.email,
        password: data.password,
      });
    });
  };

  return (
    <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
      <FormControl
        id="email"
        label="*Email"
        className="flex flex-col"
        error={errors?.email?.message}
      >
        <input
          type="text"
          autoComplete="off"
          className="input"
          id="email"
          {...register("email", {
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: "Please write a valid email!",
            },
            required: {
              value: true,
              message: "email is required!",
            },
          })}
        />
      </FormControl>

      <FormControl
        id="password"
        label="*Password"
        className="flex flex-col"
        error={errors?.password?.message}
      >
        <input
          type={passwordIsHide ? "password" : "text"}
          className="input"
          autoComplete="off"
          id="password"
          {...register("password", {
            required: {
              value: true,
              message: "Password is required!",
            },
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters",
            },
            maxLength: {
              value: 12,
              message: "Password must be 12 characters or less",
            },
          })}
        />
      </FormControl>
      <FormControl
        id="confirmPassword"
        label="*Confirm Password"
        className="flex flex-col"
        error={errors?.confirmPassword?.message}
      >
        <input
          type={passwordIsHide ? "password" : "text"}
          className="input"
          autoComplete="off"
          id="confirmPassword"
          {...register("confirmPassword", {
            required: {
              value: true,
              message: "Please confirm your password",
            },
            validate: (val) =>
              val === getValues().password || "Passwords are not same",
          })}
        />
      </FormControl>
      <FormControl variation="row" classNames="gap-3">
        <input
          type="checkbox"
          id="show-password"
          className="outline-none border-none w-5 cursor-pointer"
          onChange={() => {
            setPasswordIsHide((hide) => !hide);
          }}
        />
        <label htmlFor="show-password" className="cursor-pointer select-none">
          Show Password
        </label>
      </FormControl>

      <LinkButton type="submit">
        {isPending ? <SpinnerMini /> : "Login"}
      </LinkButton>
    </form>
  );
}

export default Login;

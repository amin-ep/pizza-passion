"use client";

import { useAuth } from "@/app/_contexts/AuthContext";
import { useForm } from "react-hook-form";
import LinkButton from "./LinkButton";
import { useState } from "react";
import FormControl from "./FormControl";

function Login() {
  const [passwordIsHide, setPasswordIsHide] = useState(true);
  const { login } = useAuth();

  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm();

  const onSubmit = async (data) => {
    await login({
      email: data.email,
      password: data.password,
    });
  };

  return (
    <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
      <FormControl id="email" label="*Email" className="flex flex-col">
        <input
          type="text"
          className="input"
          id="email"
          {...register("email")}
        />
      </FormControl>

      <FormControl id="password" label="*Password" className="flex flex-col">
        <input
          type={passwordIsHide ? "password" : "text"}
          className="input"
          id="password"
          {...register("password")}
        />
      </FormControl>
      <FormControl
        id="confirmPassword"
        label="*Confirm Password"
        className="flex flex-col"
      >
        <input
          type={passwordIsHide ? "password" : "text"}
          className="input"
          id="confirmPassword"
          {...register("confirmPassword")}
        />
      </FormControl>
      <FormControl variation="row" classNames="gap-3">
        <input
          type="checkbox"
          name=""
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

      <LinkButton type="submit">Signup</LinkButton>
    </form>
  );
}

export default Login;

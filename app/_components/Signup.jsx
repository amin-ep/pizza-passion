import { useForm } from "react-hook-form";
import { useAuth } from "../_contexts/AuthContext";
import LinkButton from "./LinkButton";
import { useState, useTransition } from "react";
import SpinnerMini from "./SpinnerMini";
import FormControl from "./FormControl";

function Signup() {
  const [passwordIsHide, setPasswordIsHide] = useState(true);

  const [isPending, startTransition] = useTransition();
  const { signup } = useAuth();
  const {
    formState: { errors },
    handleSubmit,
    register,
    setError,
    getValues,
  } = useForm();

  const onSubmit = async (data) => {
    startTransition(async () => {
      const res = await signup({
        email: data.email,
        fullName: data.fullName,
        password: data.password,
        phone: data.phone,
      });

      if (res) {
        setError("email", { type: "value", message: res });
      }
    });
  };

  return (
    <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
      <FormControl
        id="fullName"
        label="Full Name*"
        error={errors?.fullName?.message}
      >
        <input
          type="text"
          autoComplete="off"
          className="input"
          {...register("fullName", {
            required: {
              value: true,
              message: "Full name is required",
            },
            minLength: {
              value: 5,
              message: "FullName must be at least 5 characters",
            },
            maxLength: {
              value: 40,
              message: "Full Name must be 40 or less than 40 characters",
            },
          })}
        />
      </FormControl>
      <div className="flex flex-col lg:flex-row justify-between gap-3">
        <FormControl
          id="email"
          label="*Email"
          variation="col"
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
          id="phone"
          label="*Phone number"
          error={errors?.phone?.message}
        >
          <input
            type="tel"
            autoComplete="off"
            className="input"
            id="phone"
            {...register("phone", {
              required: {
                value: true,
                message: "Phone number is required!",
              },
              minLength: {
                value: 11,
                message: "Phone number must be 11 characters",
              },
              maxLength: {
                value: 11,
                message: "Phone number must be 11 characters",
              },
            })}
          />
        </FormControl>
      </div>
      <div className="flex flex-col lg:flex-row justify-between gap-3">
        <FormControl
          id="password"
          label="*Password"
          error={errors?.password?.message}
        >
          <input
            type={passwordIsHide ? "password" : "text"}
            autoComplete="off"
            className="input"
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
          error={errors?.confirmPassword?.message}
        >
          <input
            type={passwordIsHide ? "password" : "text"}
            autoComplete="off"
            className="input"
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
      </div>
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
      <LinkButton type="submit">
        {isPending ? <SpinnerMini /> : "Signup"}
      </LinkButton>
    </form>
  );
}

export default Signup;

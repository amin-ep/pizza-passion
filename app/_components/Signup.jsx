import LinkButton from "./LinkButton";
import { useForm } from "react-hook-form";
function Signup() {
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col">
        <label className="w-fit" htmlFor="fullName">
          *Full Name
        </label>
        <input
          type="text"
          className="input"
          id="fullName"
          {...register("fullName")}
        />
      </div>
      <div className="flex flex-row justify-between gap-3">
        <div className="flex flex-col">
          <label className="w-fit" htmlFor="email">
            *Email
          </label>
          <input
            type="text"
            className="input"
            id="email"
            {...register("email")}
          />
        </div>
        <div className="flex flex-col">
          <label className="w-fit" htmlFor="phone">
            Phone number
          </label>
          <input
            type="text"
            className="input"
            id="phone"
            {...register("phone")}
          />
        </div>
      </div>
      <div className="flex flex-row justify-between gap-3">
        <div className="flex flex-col">
          <label className="w-fit" htmlFor="password">
            *Password
          </label>
          <input
            type="password"
            className="input"
            id="password"
            {...register("password")}
          />
        </div>
        <div className="flex flex-col">
          <label className="w-fit" htmlFor="confirmPassword">
            *Confirm Password
          </label>
          <input
            type="password"
            className="input"
            id="confirmPassword"
            {...register("confirmPassword")}
          />
        </div>
      </div>
      <LinkButton type="submit">Signup</LinkButton>
    </form>
  );
}

export default Signup;

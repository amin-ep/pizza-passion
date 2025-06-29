"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { profileSchema } from "../_validators/profile-validators";
import FormControl from "./FormControl";
import FormErrorList from "./FormErrorList";
import LinkButton from "./LinkButton";
import { updateProfile } from "@/actions/profile-actions";
import { toast } from "react-toastify";

function UpdateProfileForm({ data }) {
  const [isPending, startTransition] = useTransition();

  const {
    register,
    formState: { errors },
    handleSubmit,
    clearErrors,
  } = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: data.firstName,
      lastName: data.lastName,
      phone: data.phone,
      postalCode: data.address?.postalCode,
      street: data.address?.street,
      text: data.address?.text,
    },
  });

  const errorArr = Object.values(errors).map((err) => err.message);

  function onSubmit(payload) {
    startTransition(() => {
      const inputData = {
        ...payload,
        address: {
          street: payload.street,
          postalCode: payload.postalCode,
          text: payload.text,
        },
      };
      console.log(inputData);
      updateProfile(inputData).then((res) => {
        if (res.status === "success") {
          toast.success("Updated successfully");
        } else {
          toast.error(res.message);
        }
      });
    });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-6 sm:mb-8 md:mb-10">
        <h2 className="mb-2 text-lg font-bold uppercase italic">
          Personal Info
        </h2>
        <div className="flex flex-col gap-4">
          <FormControl id="email" label="Email">
            <div className="flex items-center justify-between">
              <motion.p>{data.email}</motion.p>
              <LinkButton href="/change-email">Change Email</LinkButton>
            </div>
          </FormControl>
          <FormControl id="firstName" label="First Name">
            <motion.input
              initial={{
                y: -20,
                opacity: 0,
              }}
              animate={{
                y: 0,
                opacity: 1,
              }}
              type="text"
              className="input"
              autoComplete="off"
              id="firstName"
              {...register("firstName")}
              placeholder="First Name"
            />
          </FormControl>
          <FormControl id="lastName" label="Last Name">
            <motion.input
              initial={{
                y: -20,
                opacity: 0,
              }}
              animate={{
                y: 0,
                opacity: 1,
              }}
              transition={{
                delay: 0.4,
              }}
              type="text"
              className="input"
              autoComplete="off"
              id="lastName"
              {...register("lastName")}
              placeholder="Last Name"
            />
          </FormControl>
          <FormControl id="phone" label="Phone number">
            <motion.input
              initial={{
                y: -20,
                opacity: 0,
              }}
              animate={{
                y: 0,
                opacity: 1,
              }}
              transition={{
                delay: 0.6,
              }}
              type="tel"
              className="input"
              autoComplete="off"
              id="phone"
              {...register("phone")}
              placeholder="Phone number"
            />
          </FormControl>
        </div>
      </div>
      <div>
        <h2 className="mb-2 text-lg font-bold uppercase italic">Address</h2>
        <div className="flex flex-col gap-4">
          <FormControl id="street" label="Street">
            <motion.input
              initial={{
                y: -20,
                opacity: 0,
              }}
              animate={{
                y: 0,
                opacity: 1,
              }}
              transition={{
                delay: 0.8,
              }}
              type="text"
              className="input"
              id="street"
              placeholder="Street"
              {...register("street")}
            />
          </FormControl>
          <FormControl id="postal-code" label="Postal Code">
            <motion.input
              initial={{
                y: -20,
                opacity: 0,
              }}
              transition={{
                delay: 1,
              }}
              animate={{
                y: 0,
                opacity: 1,
              }}
              type="number"
              className="input"
              name=""
              id="postal-code"
              placeholder="Postal Code"
              {...register("postalCode")}
            />
          </FormControl>
          <FormControl id="text" label="Address Text">
            <motion.textarea
              initial={{
                y: -20,
                opacity: 0,
              }}
              transition={{
                delay: 1.2,
              }}
              animate={{
                y: 0,
                opacity: 1,
              }}
              className="input resize-none overflow-y-auto"
              name=""
              id="text"
              placeholder="Tell us about your neighbor"
              {...register("text")}
            />
          </FormControl>
        </div>
      </div>
      {errorArr && errorArr.length > 0 && <FormErrorList errors={errorArr} />}
      <div className="mt-6 flex justify-end">
        <LinkButton type="submit" isPending={isPending}>
          Update Profile
        </LinkButton>
      </div>
    </form>
  );
}

export default UpdateProfileForm;

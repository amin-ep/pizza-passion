"use client";

import { orderPizza } from "@/actions/order-actions";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { orderSchema } from "../_validators/order-validators";
import FormControl from "./FormControl";
import FormErrorList from "./FormErrorList";
import LinkButton from "./LinkButton";

export default function CartOrderForm({ user }) {
  const [isPending, startTransition] = useTransition();
  const {
    register,
    formState: { errors },
    handleSubmit,
    getValues,
    unregister,
  } = useForm({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      phone: user?.phone,
      postalCode: user?.address?.postalCode,
      text: user?.address?.text,
      street: user?.address?.street,
    },
  });

  const router = useRouter();

  const errorArr = Object.values(errors).map((err) => err.message);

  function onError(data) {
    if (data.description && getValues().description.trim().length === 0) {
      unregister("description");
      console.log("error");
    }
  }

  function onSubmit(data) {
    const payload = {
      address: {
        text: data.text,
        street: data.street,
        postalCode: data.postalCode,
      },
      phone: data.phone,
    };

    if (data.description) {
      payload.description = data.description;
    }

    startTransition(() => {
      orderPizza(payload).then((res) => {
        if (res.status === "success") {
          toast.success(res.message);
          router.push("/account/orders");
        } else {
          toast.error(res.message);
        }
      });
    });
  }

  return (
    <motion.div
      initial={{
        y: -50,
        opacity: 0,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.4,
      }}
      className="h-fit rounded-sm bg-primary-900 p-2 md:p-4"
    >
      <form onSubmit={handleSubmit(onSubmit, onError)}>
        <span className="text-lg">Address</span>
        <div className="mb-2 flex flex-col gap-1 pl-2 md:mb-4 md:gap-2 md:pl-4 lg:mb-6 lg:gap-4 lg:pl-6">
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
                delay: 0.4,
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
                delay: 0.8,
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
              className="input"
              name=""
              id="text"
              placeholder="Tell us about your neighbor"
              {...register("text")}
            />
          </FormControl>
        </div>
        <div className="flex flex-col gap-1 md:gap-2 lg:gap-4">
          <FormControl id="phone" label="Phone number">
            <motion.input
              initial={{
                y: -20,
                opacity: 0,
              }}
              transition={{
                delay: 1.6,
              }}
              animate={{
                y: 0,
                opacity: 1,
              }}
              type="tel"
              className="input"
              id="phone"
              placeholder="Your phone number"
              {...register("phone")}
            />
          </FormControl>
          <FormControl id="description" label="Description (optional)">
            <motion.textarea
              initial={{
                y: -20,
                opacity: 0,
              }}
              transition={{
                delay: 2,
              }}
              animate={{
                y: 0,
                opacity: 1,
              }}
              className="input"
              name=""
              id="description"
              placeholder="Description..."
              {...register("description")}
            />
          </FormControl>
        </div>
        {errorArr && errorArr.length > 0 && <FormErrorList errors={errorArr} />}
        <LinkButton
          isPending={isPending}
          type="submit"
          extraClasses="mt-2 md:mt-4"
        >
          Order Now!
        </LinkButton>
      </form>
    </motion.div>
  );
}

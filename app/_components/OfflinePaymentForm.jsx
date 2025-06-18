"use client";

import { useEffect, useTransition } from "react";
import { useForm } from "react-hook-form";
import { createOrder } from "../_lib/actions";
import LinkButton from "./LinkButton";
import PaymentOrderFields from "./PaymentOrderFields";
import SpinnerMini from "./SpinnerMini";

function OfflinePaymentForm() {
  const [isPending, startTransition] = useTransition();
  // const { userData } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // useEffect(() => {
  //   if (cartId && userData._id)
  //     reset({
  //       cart: cartId || "",
  //       customer: userData._id,
  //       isPaid: false,
  //     });
  // }, [cartId, userData._id, reset]);

  const onSubmit = async (data) => {
    data.address = {
      text: data.address,
      postalCode: data.postalCode,
    };
    delete data.postalCode;

    if (data.text.length < 1) {
      delete data.text;
    }

    startTransition(() => {
      createOrder(data).then((res) => {
        orderCart();
      });
    });
  };
  // !fix me
  return (
    <form
      className="flex w-full flex-col gap-3"
      onSubmit={handleSubmit(onSubmit)}
    >
      <PaymentOrderFields register={register} errors={errors} />
      <div>
        <LinkButton type="submit">
          {isPending ? <SpinnerMini /> : "Order cart"}
        </LinkButton>
      </div>
    </form>
  );
}

export default OfflinePaymentForm;

"use client";

import { useForm } from "react-hook-form";
import { useAuth } from "../_contexts/AuthContext";
import { useCart } from "../_contexts/CartContext";
import { createOrder } from "../_lib/actions";
import FormControl from "./FormControl";
import SpinnerMini from "./SpinnerMini";
import SubmitButton from "./SubmitButton";
import { useEffect, useTransition } from "react";
import PaymentOrderFields from "./PaymentOrderFields";
import LinkButton from "./LinkButton";

function OfflinePaymentForm() {
  const [isPending, startTransition] = useTransition();
  const { userData } = useAuth();
  const { orderCart, cartId } = useCart();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  useEffect(() => {
    if (cartId && userData._id)
      reset({
        cart: cartId || "",
        customer: userData._id,
        isPaid: false,
      });
  }, [cartId, userData._id, reset]);

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

  return (
    <form
      className="flex flex-col gap-3 w-full"
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

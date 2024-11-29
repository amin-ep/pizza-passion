"use client";

import { useEffect, useRef, useTransition } from "react";
import { useForm } from "react-hook-form";
import { HiOutlineShoppingCart } from "react-icons/hi2";
import { useAuth } from "../_contexts/AuthContext";
import { useCart } from "../_contexts/CartContext";
import { createOrder } from "../_lib/actions";
import FormControl from "./FormControl";
import LinkButton from "./LinkButton";
import PaymentOrderFields from "./PaymentOrderFields";
import SpinnerMini from "./SpinnerMini";

function OnlinePaymentForm() {
  // this is a demo functionality just for ordering products and this will not work just like a payment stripe
  const [isPending, startTransition] = useTransition();

  const cardNumberInputRefs = useRef([]);

  const handleCardNumberInputChange = (e, index) => {
    const { value } = e.target;
    if (value.length === 4 && index < cardNumberInputRefs.current.length - 1) {
      cardNumberInputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !e.target.value && index > 0) {
      cardNumberInputRefs.current[index - 1].focus();
    }
  };

  const { cartId, cartTotalPrice, cartTotalQuantity, orderCart } = useCart();
  const { userData } = useAuth();

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
        isPaid: true,
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
    <div className="w-full flex flex-col gap-5">
      <div className="grid grid-cols-1 gap-3">
        <h1 className="text-3xl md:text-4xl text-accent-500">Online Paying</h1>
        <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto] border border-primary-900 p-3 rounded-sm">
          <div className="flex items-center justify-start gap-3">
            <span className="bg-accent-500 text-primary-800 text-4xl sm:text-5xl rounded-sm">
              <HiOutlineShoppingCart />
            </span>
            <p className="text-sm sm:text-xl font-bold text-primary-200">
              Order Your cart with {cartTotalQuantity} Pizzas
            </p>
          </div>
          <div className="flex items-center justify-end">
            <p className="text-3xl text-accent-500 relative before:content-['$'] before:text-lg before:absolute before:top-0 before:-translate-x-3">
              {cartTotalPrice}
            </p>
          </div>
        </div>
      </div>
      <form
        className="grid grid-cols-1 gap-3"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="grid grid-cols-1 gap-3">
          <FormControl id="card-number" label="Card Number*">
            <div className="flex flex-row gap-1 md:gap-3">
              {[0, 1, 2, 3].map((_, index) => (
                <input
                  key={index}
                  type="number"
                  className="input px-0 text-center"
                  maxLength="4"
                  id="card-number"
                  ref={(el) => (cardNumberInputRefs.current[index] = el)}
                  onChange={(e) => handleCardNumberInputChange(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                />
              ))}
            </div>
          </FormControl>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-1 md:gap-3">
            <div className="grid grid-cols-2 items-center">
              <label htmlFor="cvv2">CVV2*</label>
              <input type="number" className="input text-center" id="cvv2" />
            </div>
            <div className="grid grid-cols-[auto_1fr] gap-2 items-center">
              <label>Expiry Date*</label>
              <div className="grid grid-cols-2 gap-1">
                <FormControl variation="row" classNames="items-center">
                  <input
                    type="number"
                    className="input text-center"
                    placeholder="Year"
                  />
                </FormControl>
                <FormControl variation="row" classNames="items-center">
                  <input
                    type="number"
                    className="input text-center"
                    placeholder="Month"
                  />
                </FormControl>
              </div>
            </div>
          </div>
        </div>
        <PaymentOrderFields errors={errors} register={register} />
        <div>
          <LinkButton type="submit">
            {isPending ? <SpinnerMini /> : "Order cart"}
          </LinkButton>
        </div>
      </form>
    </div>
  );
}

export default OnlinePaymentForm;

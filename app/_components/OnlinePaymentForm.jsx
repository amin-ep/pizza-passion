"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { HiOutlineShoppingCart } from "react-icons/hi2";
import { useAuth } from "../_contexts/AuthContext";
import { useCart } from "../_contexts/CartContext";
import { createOrder } from "../_lib/actions";
import FormControl from "./FormControl";
import SpinnerMini from "./SpinnerMini";
import SubmitButton from "./SubmitButton";

function OnlinePaymentForm() {
  // this is a demo functionality just for ordering products and this will not work just like a payment stripe

  const { cartId, cartTotalPrice, cartTotalQuantity, orderCart } = useCart();
  const { userData } = useAuth();

  const { register } = useForm();

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
      <form className="grid grid-cols-1 gap-3" action={createOrder}>
        <div className="grid grid-cols-1 gap-3">
          <FormControl id="card-number" label="Card Number*">
            <div className="flex flex-row gap-1 md:gap-3">
              <input
                type="number"
                className="input px-0 text-center"
                {...register("card-number-1")}
                id="card-number"
              />
              <input
                type="number"
                className="input px-0 text-center"
                {...register("card-number-2")}
              />
              <input
                type="number"
                className="input px-0 text-center"
                {...register("card-number-3")}
              />
              <input
                type="number"
                className="input px-0 text-center"
                {...register("card-number-4")}
              />
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
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <input type="hidden" name="cart" value={cartId || ""} />
          <input type="hidden" name="customer" value={userData._id || ""} />
          <input type="hidden" name="payment-method" value="online" />
          <FormControl id="phone" label="Phone number*">
            <input
              type="tel"
              id="phone"
              {...register("phone", {
                required: {
                  value: true,
                },
              })}
              className="input"
            />
          </FormControl>
          <FormControl id="postal-code" label="Postal Code*">
            <input
              type="tel"
              id="postal-code"
              {...register("postal-code", {
                required: {
                  value: true,
                },
              })}
              className="input"
            />
          </FormControl>
        </div>
        <FormControl id="address" label="Address*">
          <textarea
            className="input resize-none h-36"
            {...register("address")}
          />
        </FormControl>
        <FormControl id="text" label="Any Description for your order">
          <textarea className="input resize-none h-36" {...register("text")} />
        </FormControl>
        <div>
          <SubmitButton pendingLabel={<SpinnerMini />} onClick={orderCart}>
            Pay ${cartTotalPrice} and order
          </SubmitButton>
        </div>
      </form>
    </div>
  );
}

export default OnlinePaymentForm;

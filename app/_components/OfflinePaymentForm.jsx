"use client";

import { useForm } from "react-hook-form";
import { useAuth } from "../_contexts/AuthContext";
import { useCart } from "../_contexts/CartContext";
import { createOrder } from "../_lib/actions";
import FormControl from "./FormControl";
import SpinnerMini from "./SpinnerMini";
import SubmitButton from "./SubmitButton";

function OfflinePaymentForm() {
  const { userData } = useAuth();
  const { orderCart, cartId } = useCart();

  const { register } = useForm({
    defaultValues: {
      phone: userData.phone ?? "",
    },
  });

  return (
    <form className="flex flex-col gap-3 w-full" action={createOrder}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <input type="hidden" name="cart" value={cartId || ""} />
        <input type="hidden" name="customer" value={userData._id || ""} />
        <input type="hidden" name="payment-method" value="offline" />
        <FormControl id="phone" label="Phone number*">
          <input
            type="tel"
            id="phone"
            {...register("phone", {
              required: {
                value: true,
                message: "Please tell us your phone number",
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
        <textarea className="input resize-none h-36" {...register("address")} />
      </FormControl>
      <FormControl id="text" label="Any Description for your order">
        <textarea className="input resize-none h-36" {...register("text")} />
      </FormControl>
      <div>
        <SubmitButton pendingLabel={<SpinnerMini />} onClick={orderCart}>
          Order Now
        </SubmitButton>
      </div>
    </form>
  );
}

export default OfflinePaymentForm;

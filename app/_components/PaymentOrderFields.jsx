"use client";

import FormControl from "./FormControl";

function OrderFields({ register, errors }) {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <input type="hidden" {...register("cart")} />
        <input type="hidden" {...register("customer")} />
        <input type="hidden" {...register("isPaid")} />
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
        <FormControl
          id="postal-code"
          label="Postal Code*"
          error={errors?.postalCode?.message}
        >
          <input
            type="number"
            id="postal-code"
            autoComplete="off"
            {...register("postalCode", {
              required: {
                value: true,
                message: "Postal Code is required",
              },
              minLength: {
                value: 5,
                message: "Postal code must be 5 characters at least",
              },
              maxLength: {
                value: 10,
                message: "Postal code must be 10 characters or less",
              },
            })}
            className="input"
          />
        </FormControl>
      </div>
      <FormControl
        id="address"
        label="Address*"
        error={errors?.address?.message}
      >
        <textarea
          id="address"
          className="input resize-none h-36"
          {...register("address", {
            required: {
              value: true,
              message: "Please write your address",
            },
            minLength: {
              value: 15,
              message: "Address should be 15 characters at least",
            },
            maxLength: {
              value: 150,
              message: "Address should be 150 characters of less",
            },
          })}
          autoComplete="off"
        />
      </FormControl>
      <FormControl
        id="text"
        label="Any Description for your order"
        error={errors?.text?.message}
      >
        <textarea
          className="input resize-none h-36"
          autoComplete="off"
          {...register("text", {
            required: false,
            minLength: {
              value: 5,
              message: "This field should be at least 5 characters",
            },
            maxLength: {
              value: 100,
              message: "This field should be 100 characters or less",
            },
          })}
        />
      </FormControl>
    </>
  );
}

export default OrderFields;

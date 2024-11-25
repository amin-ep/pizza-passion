"use client";

import { useCart } from "../_contexts/CartContext";
import LinkButton from "./LinkButton";
import SpinnerMini from "./SpinnerMini";

function QuantitySelector({ pizzaId }) {
  const { cartItems, status, addToCart, removeFromCart } = useCart();

  let quantity = 0;
  const itemQuantity = cartItems?.find(
    (item) => item?.pizza?._id === pizzaId
  )?.quantity;

  if (itemQuantity) {
    quantity = itemQuantity;
  } else {
    quantity = 0;
  }

  return (
    <>
      {quantity > 0 ? (
        <div className="flex items-center justify-center gap-3">
          <button
            className="btn w-10 h-10 text-6xl"
            onClick={() => {
              removeFromCart(pizzaId);
            }}
          >
            -
          </button>
          <span className="w-10 h-10 flex items-center justify-center border border-primary-800">
            {status === "updating" ? <SpinnerMini /> : quantity}
          </span>
          <button
            onClick={() => addToCart(pizzaId)}
            className="btn w-10 h-10 text-6xl"
          >
            +
          </button>
        </div>
      ) : (
        <LinkButton onClick={() => addToCart(pizzaId)}>
          {status === "updating" ? <SpinnerMini /> : "Add to cart"}
        </LinkButton>
      )}
    </>
  );
}

export default QuantitySelector;

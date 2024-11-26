"use client";

import { useTransition } from "react";
import { useCart } from "../_contexts/CartContext";
import LinkButton from "./LinkButton";
import SpinnerMini from "./SpinnerMini";

function QuantitySelector({ pizzaId }) {
  const { cartItems, addToCart, removeFromCart } = useCart();
  const [isPending, startTransition] = useTransition();

  let quantity = 0;
  const itemQuantity = cartItems?.find(
    (item) => item?.pizza?._id === pizzaId
  )?.quantity;

  if (itemQuantity) {
    quantity = itemQuantity;
  } else {
    quantity = 0;
  }

  const handleRemoveFromCart = () => {
    startTransition(() => {
      removeFromCart(pizzaId);
    });
  };

  const handleAddToCart = () => {
    startTransition(() => {
      addToCart(pizzaId);
    });
  };

  return (
    <>
      {quantity > 0 ? (
        <div className="flex items-center justify-center gap-3">
          <button
            className="btn w-10 h-10 text-6xl"
            onClick={handleRemoveFromCart}
          >
            -
          </button>
          <span className="w-10 h-10 flex items-center justify-center border border-primary-800">
            {isPending ? <SpinnerMini /> : quantity}
          </span>
          <button onClick={handleAddToCart} className="btn w-10 h-10 text-6xl">
            +
          </button>
        </div>
      ) : (
        <LinkButton onClick={handleAddToCart}>
          {isPending ? <SpinnerMini /> : "Add to cart"}
        </LinkButton>
      )}
    </>
  );
}

export default QuantitySelector;

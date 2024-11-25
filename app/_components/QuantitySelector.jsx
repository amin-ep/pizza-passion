"use client";

import { HiMiniMinus, HiMiniPlus } from "react-icons/hi2";
import { useCart } from "../_contexts/CartContext";
import LinkButton from "./LinkButton";

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
    <div className="flex items-center justify-end p-5">
      {quantity > 0 ? (
        <div className="flex items-center justify-center gap-3">
          <button
            className="btn w-10 h-10"
            onClick={() => {
              removeFromCart(pizzaId);
            }}
          >
            <HiMiniMinus size={25} />
          </button>
          <span className="w-10 h-10 flex items-center justify-center border border-primary-800">
            {quantity}
          </span>
          <button onClick={() => addToCart(pizzaId)} className="btn w-10 h-10">
            <HiMiniPlus size={25} />
          </button>
        </div>
      ) : (
        <LinkButton onClick={() => addToCart(pizzaId)}>Add to cart</LinkButton>
      )}
    </div>
  );
}

export default QuantitySelector;

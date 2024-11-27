"use client";

import { useCart } from "../_contexts/CartContext";

function OfflinePaymentHeading() {
  const { cartTotalPrice } = useCart();
  return (
    <div className="mb-10">
      <h1 className="text-3xl md:text-4xl text-accent-600">
        Order Your pizzas
      </h1>
      <p>Fill the inputs below and pay ${cartTotalPrice} at door!</p>
    </div>
  );
}

export default OfflinePaymentHeading;

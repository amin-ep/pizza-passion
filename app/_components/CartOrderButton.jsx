"use client";
import { useCallback, useState } from "react";
import { FaHandHoldingDollar } from "react-icons/fa6";
import { HiMiniComputerDesktop } from "react-icons/hi2";
import { useCart } from "../_contexts/CartContext";
import LinkButton from "./LinkButton";

function CartOrderingButton() {
  const [payingMethod, setPayingMethod] = useState("online");
  const { cartTotalPrice } = useCart();

  const handlePaymentMethod = useCallback(() => {
    switch (payingMethod) {
      case "online": {
        return setPayingMethod("offline");
      }

      case "offline": {
        return setPayingMethod("online");
      }
    }
  }, [payingMethod]);

  return (
    <div className="grid grid-cols-1 gap-3 items-center">
      <div className="flex items-center justify-between">
        <p>Paying {payingMethod}</p>
        <button
          className={`flex items-center justify-between w-24 border border-primary-800 p-2 relative after:absolute after:top-2 after:bottom-2 after:w-8 after:bg-accent-500 after:right-2 ${
            payingMethod === "offline" && "after:-translate-x-[2.85rem]"
          } after:z-[1] after:transition-all after:duration-300`}
          onClick={handlePaymentMethod}
        >
          <span
            className={`transition-colors duration-300 w-8 flex justify-center z-[2] items-center aspect-square ${
              payingMethod === "offline"
                ? "text-primary-800"
                : "text-primary-50"
            }`}
          >
            <FaHandHoldingDollar size={27} />
          </span>
          <span
            className={`transition-colors duration-300 w-8 flex justify-center z-[2] items-center aspect-square ${
              payingMethod === "online" ? "text-primary-800" : "text-primary-50"
            }`}
          >
            <HiMiniComputerDesktop size={27} />
          </span>
        </button>
      </div>
      <LinkButton href={`/payment/${payingMethod}`}>
        {payingMethod == "online" ? `Pay $${cartTotalPrice}` : "Order Now"}
      </LinkButton>
    </div>
  );
}

export default CartOrderingButton;

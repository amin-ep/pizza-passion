"use client";

import { useCart } from "../_contexts/CartContext";
import LinkButton from "./LinkButton";
import SpinnerMini from "./SpinnerMini";

function DeleteCartButton({ id }) {
  const { deleteCartById, status } = useCart();
  return (
    <LinkButton
      onClick={() => {
        deleteCartById(id);
      }}
    >
      {status === "deleting" ? <SpinnerMini /> : "Delete All"}
    </LinkButton>
  );
}

export default DeleteCartButton;

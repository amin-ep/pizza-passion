"use client";

import LinkButton from "./LinkButton";
import SpinnerMini from "./SpinnerMini";

function DeleteCartButton({ id }) {
  // !fix me
  return (
    <LinkButton type="button">
      {"deleting" === "deleting" ? <SpinnerMini /> : "Delete All"}
    </LinkButton>
  );
}

export default DeleteCartButton;

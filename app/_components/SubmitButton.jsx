"use client";

import LinkButton from "./LinkButton";
import { useFormStatus } from "react-dom";

function SubmitButton({ children, pendingLabel }) {
  const { pending } = useFormStatus();

  return (
    <LinkButton type="submit">{pending ? pendingLabel : children}</LinkButton>
  );
}

export default SubmitButton;

"use client";

import LinkButton from "./LinkButton";
import { useFormStatus } from "react-dom";

function SubmitButton({ children, pendingLabel, onClick }) {
  const { pending } = useFormStatus();

  return (
    <LinkButton type="submit" onClick={onClick}>
      {pending ? pendingLabel : children}
    </LinkButton>
  );
}

export default SubmitButton;

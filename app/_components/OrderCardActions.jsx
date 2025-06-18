"use client";

import { HiOutlinePencilSquare, HiOutlineTrash } from "react-icons/hi2";
// import { cancelOrder } from "../_lib/actions";
import { useTransition } from "react";
import SpinnerMini from "./SpinnerMini";
import Link from "next/link";

function OrderCardActions({ id, onCancel }) {
  const [isPending, startTransition] = useTransition();

  function handleCancel() {
    if (confirm("Are you sure you want to cancel your order?"))
      startTransition(() => onCancel(id));
  }

  return (
    <div className={`grid grid-cols-2 border-l border-primary-900`}>
      <button
        className="flex items-center justify-center gap-1 border-r border-primary-900 transition-all hover:bg-accent-500 hover:text-primary-800"
        onClick={handleCancel}
      >
        {!isPending ? (
          <>
            <HiOutlineTrash size={20} />
            <span>Cancel</span>
          </>
        ) : (
          <span className="mx-auto">
            <SpinnerMini />
          </span>
        )}
      </button>

      <Link
        href={`orders/edit/${id}`}
        className="flex items-center justify-center gap-1 border-r border-primary-900 transition-all hover:bg-accent-500 hover:text-primary-800"
      >
        <HiOutlinePencilSquare size={20} />
        <span>Update</span>
      </Link>
    </div>
  );
}

export default OrderCardActions;

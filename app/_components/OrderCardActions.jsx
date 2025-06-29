"use client";

import { HiOutlinePencilSquare, HiOutlineTrash } from "react-icons/hi2";
import { useTransition } from "react";
import SpinnerMini from "./SpinnerMini";
import Link from "next/link";
import { cancelOrder, setOrderReceived } from "@/actions/order-actions";
import clsx from "clsx";
import { toast } from "react-toastify";

function OrderCardActions({ id, status }) {
  const [isPending, startTransition] = useTransition();

  function handleCancel() {
    if (confirm("Are you sure you want to cancel your order?")) {
      startTransition(() =>
        cancelOrder(id).then((res) => {
          console.log(res);
          if (res.status === "success") {
            toast.info("Order cancelled");
          }
        }),
      );
    }
  }

  function handleReceive() {
    startTransition(() => setOrderReceived(id));
  }

  const btnClasses =
    "flex items-center justify-center gap-1 border-r border-primary-900 transition-all hover:bg-accent-500 hover:text-primary-800";

  return (
    <div
      className={clsx(
        "grid border-l border-primary-900",
        status === "posted" ? "grid-cols-1" : "grid-cols-2",
      )}
    >
      {status !== "posted" ? (
        <>
          <button className={btnClasses} onClick={handleCancel}>
            {isPending ? <SpinnerMini /> : <HiOutlineTrash size={20} />}
            <span>{isPending ? "Canceling" : "Cancel"}</span>
          </button>

          <Link href={`orders/edit/${id}`} className={btnClasses}>
            <HiOutlinePencilSquare size={20} />
            <span>Update</span>
          </Link>
        </>
      ) : (
        <button className={btnClasses} onClick={handleReceive}>
          {isPending ? "Updating..." : "Received"}
        </button>
      )}
    </div>
  );
}

export default OrderCardActions;

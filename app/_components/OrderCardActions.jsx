"use client";

import { cancelOrder, setOrderReceived } from "@/actions/order-actions";
import clsx from "clsx";
import { useTransition } from "react";
import { HiOutlineTrash } from "react-icons/hi2";
import { toast } from "react-toastify";
import SpinnerMini from "./SpinnerMini";

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
    <div className={clsx("grid grid-cols-1 border-l border-primary-900")}>
      {status !== "posted" ? (
        <>
          <button className={btnClasses} onClick={handleCancel}>
            {isPending ? <SpinnerMini /> : <HiOutlineTrash size={20} />}
            <span>{isPending ? "Canceling" : "Cancel"}</span>
          </button>
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

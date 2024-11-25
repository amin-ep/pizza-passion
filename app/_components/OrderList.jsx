"use client";
import OrderCard from "./OrderCard";
import { useOptimistic } from "react";
import { cancelOrder } from "../_lib/actions";

function OrderList({ orders }) {
  const [optimisticOrders, optimisticCancel] = useOptimistic(
    orders,
    (curOrders, orderId) => {
      const targetOrderIndex = curOrders.findIndex((el) => el._id === orderId);
      curOrders[targetOrderIndex].canceled = true;
      return curOrders;
    }
  );

  async function handleCancel(orderId) {
    optimisticCancel(orderId);
    await cancelOrder(orderId);
  }

  return (
    <ul>
      {optimisticOrders?.map((order) => (
        <OrderCard order={order} key={order._id} onCancel={handleCancel} />
      ))}
    </ul>
  );
}

export default OrderList;

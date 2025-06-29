import OrderCard from "./OrderCard";

function OrderList({ orders }) {
  return (
    <ul className="flex flex-col gap-2 md:gap-4">
      {orders?.map((order, index) => (
        <OrderCard index={index} order={order} key={order._id} />
      ))}
    </ul>
  );
}

export default OrderList;

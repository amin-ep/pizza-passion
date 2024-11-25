import OrderList from "@/app/_components/OrderList";
import { getAllOrders } from "@/app/_services/order-api";

export const metadata = {
  title: "Orders",
};

async function Page() {
  const orders = await getAllOrders();

  return (
    <div className="flex flex-col gap-3">
      <p className="text-xl text-accent-500">Your orders</p>
      <OrderList orders={orders.data} />
    </div>
  );
}

export default Page;

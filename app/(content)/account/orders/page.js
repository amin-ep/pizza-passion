import OrderList from "@/app/_components/OrderList";
import { getAllOrders } from "@/app/_services/order-api";
import Link from "next/link";

export const metadata = {
  title: "Orders",
};

async function Page() {
  const orders = await getAllOrders();

  return (
    <div className="flex flex-col gap-3">
      <p className="text-xl text-accent-500">Your orders</p>
      {orders.data.length > 0 ? (
        <OrderList orders={orders.data} />
      ) : (
        <div className="">
          <p>
            You do not have any orders.{" "}
            <Link
              href="/menu"
              className="text-accent-500 hover:underline hover:text-accent-700"
            >
              Click
            </Link>{" "}
            to order
          </p>
        </div>
      )}
    </div>
  );
}

export default Page;

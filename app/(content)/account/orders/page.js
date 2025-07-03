import OrderList from "@/app/_components/OrderList";
import { getAllOrders } from "@/app/_services/order-api";
import Link from "next/link";

export const metadata = {
  title: "Orders",
  description:
    "View your past and current pizza orders in one convenient list. Reorder your favorites anytime with Pizza Passion.",
};

async function Page() {
  const orders = await getAllOrders();

  return (
    <div className="flex flex-col gap-3">
      <p className="text-xl text-accent-500">Your orders</p>
      {orders.length > 0 ? (
        <OrderList orders={orders} />
      ) : (
        <div className="">
          <p>
            You do not have any orders.{" "}
            <Link
              href="/menu"
              className="text-accent-500 hover:text-accent-700 hover:underline"
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

import Image from "next/image";

import { format } from "date-fns";
import { MdOutlineDone, MdOutlinePostAdd } from "react-icons/md";
import { AiOutlineClockCircle } from "react-icons/ai";
import { IoFastFoodOutline } from "react-icons/io5";
import Link from "next/link";
import { SlCalender } from "react-icons/sl";
import { FcCancel } from "react-icons/fc";
import OrderCardActions from "./OrderCardActions";
import OrderListItem from "./motions/OrderListItem";
import { HiXMark } from "react-icons/hi2";

function OrderCard({ order, onCancel, index }) {
  const { status, createdAt, cart, _id: id } = order;

  return (
    <OrderListItem index={index}>
      <div className="flex items-center gap-2 p-3">
        <StatusIcon status={status} />

        <h1 className="uppercase text-primary-100">{status}</h1>
      </div>
      <div className="flex gap-4 border-b border-primary-900 p-3 text-primary-400">
        <p className="flex items-center gap-3 text-sm font-semibold">
          <SlCalender size={14} />
          {format(createdAt, "y MMM d")} at {format(createdAt, "hh:mm")}
        </p>
        <p className="text-lg font-bold text-accent-500">${cart?.totalPrice}</p>
      </div>
      <div
        className={`grid ${
          status === "waiting" || status === "accepted" || status === "posted"
            ? "grid-cols-[1fr_200px]"
            : "grid-cols-1"
        }`}
      >
        <div className="flex gap-5 p-3">
          {cart?.cartItems.map((cart) => (
            <Link
              href={`/menu/${cart.pizza._id}`}
              key={cart._id}
              className="relative aspect-square w-16"
            >
              <Image
                src={`http://localhost:8000/static/${cart?.pizza?.imageUrl}`}
                fill
                alt={cart.pizza.name}
                quality={100}
                className="object-cover transition hover:scale-110"
              />
              <p className="absolute -bottom-2 -right-[8px] flex aspect-square w-6 items-center justify-center rounded-full bg-accent-500 text-sm font-bold text-primary-900">
                {cart?.quantity}
              </p>
            </Link>
          ))}
        </div>
        {status !== "cancelled" &&
          (status === "waiting" ||
            status === "accepted" ||
            status === "posted") && (
            <OrderCardActions status={status} id={id} onCancel={onCancel} />
          )}
      </div>
    </OrderListItem>
  );
}

function StatusIcon({ status }) {
  switch (status) {
    case "accepted":
      return <MdOutlineDone size={29} className="bg-orange-500 p-1" />;

    case "waiting":
      return <AiOutlineClockCircle size={29} className="bg-yellow-500 p-1" />;

    case "received":
      return <IoFastFoodOutline size={29} className="bg-green-700 p-1" />;

    case "posted":
      return <MdOutlinePostAdd size={29} className="bg-sky-500 p-1" />;

    case "cancelled":
      return <FcCancel size={29} className="bg-primary-900 p-1" />;

    case "rejected":
      return <HiXMark size={29} className="bg-rose-500 p-1" />;

    default:
      return null;
  }
}

export default OrderCard;

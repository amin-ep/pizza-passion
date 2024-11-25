import Image from "next/image";

import { format } from "date-fns";
import { MdOutlineDone, MdOutlinePostAdd } from "react-icons/md";
import { AiOutlineClockCircle } from "react-icons/ai";
import { IoFastFoodOutline } from "react-icons/io5";
import Link from "next/link";
import { SlCalender } from "react-icons/sl";
import { FcCancel } from "react-icons/fc";
import OrderCardActions from "./OrderCardActions";

function OrderCard({ order, onCancel }) {
  const { status, createdAt, cart, canceled, _id: id } = order;

  return (
    <li className="flex flex-col border border-primary-900">
      <div className="flex items-center gap-2 p-3">
        {canceled ? <FcCancel size={29} /> : <StatusIcon status={status} />}
        <h1 className="uppercase text-primary-100">
          {canceled ? "Canceled" : status}
        </h1>
      </div>
      <div className="flex gap-4 border-b border-primary-900 p-3 text-primary-400">
        <p className="font-semibold text-sm flex items-center gap-3">
          <SlCalender size={14} />
          {format(createdAt, "y MMM d")} at {format(createdAt, "hh:mm")}
        </p>
        <p className="text-accent-500 font-bold text-lg">${cart?.totalPrice}</p>
      </div>
      <div
        className={`grid ${
          status === "waiting" || status === "accepted"
            ? "grid-cols-[1fr_200px]"
            : "grid-cols-1"
        }`}
      >
        <div className="flex p-3 gap-5">
          {cart?.cartItems.map((cart) => (
            <Link
              href={`/menu/${cart.pizza._id}`}
              key={cart._id}
              className="relative w-16 aspect-square"
            >
              <Image
                src={`http://localhost:8080/static/${cart?.pizza?.imageUrl}`}
                fill
                alt={cart.pizza.name}
                quality={100}
                className="hover:scale-110 transition"
              />
              <p className="absolute -bottom-2 -right-[8px] text-sm bg-accent-500 w-6 aspect-square rounded-full text-primary-900 font-bold flex items-center justify-center">
                {cart?.quantity}
              </p>
            </Link>
          ))}
        </div>
        {!canceled && (status === "waiting" || status === "accepted") && (
          <OrderCardActions id={id} onCancel={onCancel} />
        )}
      </div>
    </li>
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

    default:
      return null;
  }
}

export default OrderCard;

import Image from "next/image";
import { MdOutlineDeliveryDining } from "react-icons/md";
import QuantitySelector from "./QuantitySelector";
import { RiDiscountPercentLine } from "react-icons/ri";
import { HiOutlineCurrencyDollar } from "react-icons/hi2";
import { IoFastFoodOutline } from "react-icons/io5";
import Link from "next/link";

function CartList({ items }) {
  return (
    <ul className="flex flex-col gap-4">
      {items.map((item) => (
        <li
          className="grid grid-cols-[150px_1fr] gap-3 border border-primary-900 py-6 px-4"
          key={item._id}
        >
          <div className="grid grid-cols-1 grid-rows-[130px_1fr] gap-8">
            <div className="relative">
              <Link href={`/menu/${item.pizza._id}`}>
                <Image
                  alt={item.pizza.name}
                  src={`${process.env.FILE_BASE_URL}/${item.pizza.imageUrl}`}
                  fill
                  quality={90}
                  loading="lazy"
                  className="object-cover"
                />
              </Link>
            </div>
            <div className="flex justify-center items-center">
              <QuantitySelector pizzaId={item.pizza._id} />
            </div>
          </div>
          <div className="grid grid-cols-1 grid-rows-[160px_1fr] gap-8">
            <div className="flex flex-col gap-1">
              <h2 className="text-xl text-accent-500">{item.pizza.name}</h2>
              {item.pizza.discount > 0 ? (
                <>
                  <p className="flex items-center gap-1">
                    <HiOutlineCurrencyDollar
                      size={27}
                      className="text-primary-700"
                    />
                    <span className="text-base">${item.pizza.finalPrice} </span>
                    <span className="line-through text-primary-700 text-sm">
                      ${item.pizza.unitPrice}
                    </span>
                  </p>
                  <p className="flex items-center gap-1 text-accent-500">
                    <RiDiscountPercentLine size={27} />

                    <span>
                      {(
                        (item.pizza.discount * 100) /
                        item.pizza.unitPrice
                      ).toFixed(0)}
                    </span>
                  </p>
                </>
              ) : (
                <p className="flex items-center gap-1">
                  <HiOutlineCurrencyDollar size={27} />
                  <span className="text-base">${item.pizza.finalPrice} </span>
                </p>
              )}
              <p className="flex items-center gap-1">
                <IoFastFoodOutline size={27} className="text-primary-700" />
                <span>{item.pizza.ingredients.join(", ")}</span>
              </p>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default CartList;

import Image from "next/image";
import LinkButton from "./LinkButton";
import Link from "next/link";

function PizzaCard({ pizza }) {
  return (
    <div className="grid grid-cols-[150px_1fr] min-h-40 w-full border border-primary-900">
      <div className="h-full relative">
        <Image
          src={`http://localhost:8080/static/${pizza.imageUrl}`}
          alt="pizza image"
          fill
          className="object-cover rounded-l-sm aspect-square"
        />
      </div>
      <div className="grid grid-cols-1 grid-rows-[120px_50px] items-between">
        <div className="p-3 border-b border-primary-900">
          <p className="text-accent-500 text-2xl font-semibold">{pizza.name}</p>
          <p>Ingredients: {pizza.ingredients.join(", ")}</p>
        </div>
        <div className="grid grid-cols-[1fr_auto] gap-0 justify-between">
          <div className="flex gap-1 items-center h-full px-3">
            {pizza.discount > 0 ? (
              <>
                <p className="font-semibold text-xl text-accent-500">
                  ${pizza.finalPrice}
                </p>
                <p className="line-through text-sm text-primary-100">
                  ${pizza.unitPrice}
                </p>
              </>
            ) : (
              <>
                <p className="font-semibold text-xl text-accent-500">
                  ${pizza.finalPrice}
                </p>
              </>
            )}
          </div>

          <Link
            className="h-full w-full border-l border-primary-900 flex items-center px-4 text-primary-100 hover:bg-accent-500 transition hover:text-primary-800"
            href={`/menu/${pizza._id}`}
          >
            More details
          </Link>
        </div>
      </div>
    </div>
  );
}

export default PizzaCard;

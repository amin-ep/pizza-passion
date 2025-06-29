import Image from "next/image";
import Link from "next/link";

function PizzaCard({ pizza }) {
  return (
    <div className="grid min-h-40 w-full grid-cols-1 border border-primary-800 sm:grid-cols-[150px_1fr]">
      <div className="relative h-56 sm:h-full">
        <Image
          src={`http://localhost:8000/static/${pizza.imageUrl}`}
          alt="pizza image"
          fill
          className="aspect-square rounded-l-sm object-cover"
        />
      </div>
      <div className="items-between grid grid-cols-1 grid-rows-[120px_50px]">
        <div className="overflow-hidden border-b border-primary-800 p-3">
          <p className="text-2xl font-semibold text-accent-500">{pizza.name}</p>
          <p>Ingredients: {pizza.ingredients.join(", ")}</p>
        </div>
        <div className="grid grid-cols-[1fr_auto] justify-between gap-0">
          <div className="flex h-full items-center gap-1 px-3">
            {pizza.discount > 0 ? (
              <>
                <p className="text-xl font-semibold text-accent-500">
                  ${pizza.finalPrice}
                </p>
                <p className="text-sm text-primary-100 line-through">
                  ${pizza.unitPrice}
                </p>
              </>
            ) : (
              <>
                <p className="text-xl font-semibold text-accent-500">
                  ${pizza.finalPrice}
                </p>
              </>
            )}
          </div>

          <Link
            className="flex h-full w-full items-center border-l border-primary-800 px-4 text-primary-100 transition hover:bg-accent-500 hover:text-primary-800"
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

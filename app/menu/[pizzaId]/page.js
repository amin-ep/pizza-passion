import QuantitySelector from "@/app/_components/QuantitySelector";
import StarRating from "@/app/_components/StarRating";
import TextExpander from "@/app/_components/TextExpander";
import { getAllPizzas, getPizza } from "@/app/_services/pizza-api";
import Image from "next/image";
import { GiHotMeal } from "react-icons/gi";
import { HiStar } from "react-icons/hi2";
import { LuPizza } from "react-icons/lu";
import { TbCashRegister } from "react-icons/tb";

export async function generateMetadata({ params }) {
  const { name } = await getPizza(params.pizzaId);
  return { title: name };
}

export async function generateStaticParams() {
  const pizzas = await getAllPizzas();

  const ids = pizzas.data.data.docs.map((pizza) => ({ pizzaId: pizza._id }));
  return ids;
}

async function Page({ params }) {
  const { pizzaId } = params;
  const pizza = await getPizza(pizzaId);

  const ingredients = pizza?.ingredients.join(", ");

  return (
    // <div className="w-full min-h-80 grid grid-cols-1 sm:grid-cols-[300px_1fr] gap-14 border-[1px] border-primary-900">
    //<div className="relative h-72 sm:h-auto">
    //     <Image
    //       src={`http://localhost:8080/static/${pizza.imageUrl}`}
    //       alt={pizza.name}
    //       fill
    //       className="object-cover"
    //     />
    //   </div>
    //   <div className="pt-10 flex flex-col justify-between">
    //     <div>
    //       <div className="flex gap-2 items-center">
    //         <LuPizza size={35} className="text-primary-600" />
    //         <h1 className="sm:text-3xl">{pizza.name}</h1>
    //       </div>
    //       <div className="flex gap-2 items-center">
    //         <GiHotMeal size={22} className="text-primary-600" />
    //         <p className="text-xl">
    //           Ingredients:
    //           <TextExpander>{ingredients}</TextExpander>
    //         </p>
    //       </div>
    //       <div className="flex gap-2 items-center">
    //         <TbCashRegister size={27} className="text-primary-600" />
    //         {pizza.discount > 0 ? (
    //           <>
    //             <p className="text-3xl font-semibold text-accent-500">
    //               ${pizza.finalPrice}
    //             </p>
    //             <p className="text-xl line-through">${pizza.unitPrice}</p>
    //           </>
    //         ) : (
    //           <>
    //             <p className="text-3xl font-semibold text-accent-500">
    //               ${pizza.finalPrice}
    //             </p>
    //           </>
    //         )}
    //       </div>
    //       <div className="flex gap-2 items-center">
    //         <HiStar size={22} className="text-primary-600" />

    //         <p className="text-xl text-primary-600">
    //           {pizza.ratingsAverage ?? "Not rated yet"}
    //         </p>
    //       </div>
    //     </div>
    //     <div className="flex items-center justify-between p-5">
    //       <StarRating
    //         maxRating={5}
    //         pizzaRatings={pizza.ratings}
    //         pizzaId={pizza._id}
    //       />
    //       <QuantitySelector pizzaId={pizzaId} />
    //     </div>
    //   </div>
    // </div>
    <div className="p-3">
      <div className="grid grid-cols-1 sm:grid-cols-[250px_1fr] md:grid-cols-[320px_1fr] border border-primary-800 gap-3">
        <div className="relative aspect-square">
          {pizza.discount > 0 && (
            <span className="absolute flex shadow-lg -rotate-45 flex-col justify-center items-center rounded-full aspect-square z-40 left-2 top-2 bg-primary-900 w-16">
              <p>%{((pizza.discount * 100) / pizza.unitPrice).toFixed(0)}</p>
              <p>Free</p>
            </span>
          )}
          <Image
            src={`http://localhost:8080/static/${pizza.imageUrl}`}
            alt={pizza.name}
            fill
            className="object-cover"
          />
        </div>
        <div className="px-3 text-left leading-6 flex flex-col justify-between gap-1">
          <div className="flex flex-col sm:py-3">
            <div className="flex gap-2 items-center text-accent-500 text-xl">
              <LuPizza />
              <h1>{pizza.name}</h1>
            </div>
            <div className="flex gap-2 items-start text-primary-50">
              <GiHotMeal className="text-xl" />

              <p>
                Ingredients:
                <TextExpander>{ingredients}</TextExpander>
              </p>
            </div>
            <div className="flex gap-2 items-center text-lg">
              <TbCashRegister className="text-primary-50 text-xl" />
              {pizza.discount > 0 ? (
                <>
                  <p className="text-xl font-semibold text-primary-50">
                    ${pizza.finalPrice}
                  </p>
                  <p className="text-sm line-through text-primary-700">
                    ${pizza.unitPrice}
                  </p>
                </>
              ) : (
                <>
                  <p className="text-3xl font-semibold text-accent-500">
                    ${pizza.finalPrice}
                  </p>
                </>
              )}
            </div>
            <div className="flex gap-2 items-center text-xl">
              <HiStar className="text-yellow-500" />

              <p className="text-primary-50">
                {pizza.ratingsAverage.toFixed(1) ?? "Not rated yet"}
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-3 py-4 justify-center items-center md:flex-row">
            <StarRating
              maxRating={5}
              pizzaRatings={pizza.ratings}
              pizzaId={pizza._id}
            />
            <div className="w-full grid md:justify-end">
              <QuantitySelector pizzaId={pizzaId} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;

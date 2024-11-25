import QuantitySelector from "@/app/_components/QuantitySelector";
import TextExpander from "@/app/_components/TextExpander";
import { getAllPizzas, getPizza } from "@/app/_services/pizza-api";
import Image from "next/image";
import { GiHotMeal } from "react-icons/gi";
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
    <div className="w-full min-h-80 grid grid-cols-[300px_1fr] gap-14 border-[1px] border-primary-900">
      <div className="relative">
        <Image
          src={`http://localhost:8080/static/${pizza.imageUrl}`}
          alt={pizza.name}
          fill
          className="object-cover"
        />
      </div>
      <div className="pt-10 flex flex-col justify-between">
        <div>
          <div className="flex gap-2 items-center">
            <LuPizza size={35} className="text-primary-600" />
            <h1 className="text-5xl">{pizza.name}</h1>
          </div>
          <div className="flex gap-2 items-center">
            <GiHotMeal size={22} className="text-primary-600" />
            <p className="text-xl">
              Ingredients:
              <TextExpander>{ingredients}</TextExpander>
            </p>
          </div>
          <div className="flex gap-2 items-center">
            <TbCashRegister size={27} className="text-primary-600" />
            {pizza.discount > 0 ? (
              <>
                <p className="text-3xl font-semibold text-accent-500">
                  ${pizza.finalPrice}
                </p>
                <p className="text-xl line-through">${pizza.unitPrice}</p>
              </>
            ) : (
              <>
                <p className="text-3xl font-semibold text-accent-500">
                  ${pizza.finalPrice}
                </p>
              </>
            )}
          </div>
        </div>
        <QuantitySelector pizzaId={pizzaId} />
      </div>
    </div>
  );
}

export default Page;

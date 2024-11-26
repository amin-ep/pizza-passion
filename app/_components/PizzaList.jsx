import { getAllPizzas } from "../_services/pizza-api";
import PaginationControls from "./PaginationControls";
import PizzaCard from "./PizzaCard";
// import { unstable_noStore as noStore } from "next/cache";

async function PizzaList({ filter, page }) {
  const pizzas = await getAllPizzas(page);

  if (!pizzas.data.data.docs.length) return null;

  let displayPizzas;

  if (filter === "all") {
    displayPizzas = pizzas.data.data.docs;
  }
  if (filter === "cheap") {
    displayPizzas = pizzas.data.data.docs.filter(
      (pizza) => pizza?.finalPrice <= 40
    );
  }
  if (filter === "moderate") {
    displayPizzas = pizzas?.data?.data?.docs?.filter(
      (pizza) => pizza?.finalPrice > 40 && pizza?.finalPrice <= 60
    );
  }
  if (filter === "expensive") {
    displayPizzas = pizzas?.data?.data?.docs?.filter(
      (pizza) => pizza?.finalPrice > 60
    );
  }

  return (
    <>
      <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14">
        {displayPizzas?.map((pizza) => (
          <PizzaCard pizza={pizza} key={pizza._id} />
        ))}
      </div>
      <PaginationControls totalPages={pizzas.data.totalPages} />
    </>
  );
}

export default PizzaList;

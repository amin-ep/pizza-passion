import { getAllPizzas } from "../_services/pizza-api";
import PaginationControls from "./PaginationControls";
import PizzaCard from "./PizzaCard";
import PizzaListItem from "./motions/PizzaListItem";

async function PizzaList({ filter, page }) {
  const pizzas = await getAllPizzas(page);

  if (pizzas.status === "success") {
    let displayPizzas;

    if (filter === "all") {
      displayPizzas = pizzas.data;
    }
    if (filter === "cheap") {
      displayPizzas = pizzas.data.filter((pizza) => pizza?.finalPrice <= 10);
    }
    if (filter === "moderate") {
      displayPizzas = pizzas?.data.filter(
        (pizza) => pizza?.finalPrice > 40 && pizza?.finalPrice <= 30,
      );
    }
    if (filter === "expensive") {
      displayPizzas = pizzas?.data.filter((pizza) => pizza?.finalPrice > 30);
    }

    if (displayPizzas.length === 0) {
      return (
        <h3 className="my-20 text-center text-xl text-accent-600 xsm:text-2xl sm:text-3xl md:text-4xl">
          No Result!
        </h3>
      );
    } else {
      return (
        <>
          <div>
            <menu className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:gap-12 xl:gap-14">
              {displayPizzas?.map((pizza, index) => (
                <PizzaListItem key={pizza._id} index={index}>
                  <PizzaCard pizza={pizza} />
                </PizzaListItem>
              ))}
            </menu>
          </div>
          <PaginationControls totalPages={pizzas.data.totalPages} />
        </>
      );
    }
  } else {
    return <p>Noting found!</p>;
  }
}

export default PizzaList;

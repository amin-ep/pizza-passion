import { Suspense } from "react";
import Filter from "../_components/Filter";
import Loader from "../_components/Loader";
import PizzaList from "../_components/PizzaList";

export const revalidate = 3600;

export const metadata = {
  title: "Menu",
};

export default function Page({ searchParams }) {
  const filter = searchParams?.finalPrice ?? "all";
  const page = searchParams?.page ?? 1;

  return (
    <div>
      <h1 className="text-3xl sm:text-4xl mb-5 text-accent-400 font-medium">
        Our Menu
      </h1>

      <p className="text-primary-200 text-base sm:text-lg mb-10">
        Pizza Passion&apos;s menu brings authentic Italian flavors to your
        table. Savor classics like Margherita with mozzarella and basil, or try
        our bold Pepperoni Passion. Our Veggie Delight and BBQ Chicken Supreme
        offer fresh and flavorful twists. Pair your pizza with garlic bread or a
        crisp salad, and finish with a dessert like chocolate lava cake. Every
        dish is crafted with quality ingredients for a memorable meal.
      </p>

      <div className="flex justify-end mb-8">
        <Filter />
      </div>
      <Suspense fallback={<Loader />} key={filter}>
        <PizzaList filter={filter} page={page} />
      </Suspense>
    </div>
  );
}

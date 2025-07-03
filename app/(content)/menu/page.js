import Filter from "@/app/_components/Filter";
import MenuDescription from "@/app/_components/MenuDescription";
import PizzaList from "@/app/_components/PizzaList";
import { Suspense } from "react";

export const revalidate = 3600;

export const metadata = {
  title: "Menu",
  description:
    "Explore our full menu of mouthwatering pizzas and sides. Choose your favorites and order with just a few clicks.",
};

export default function Page({ searchParams }) {
  const filter = searchParams?.finalPrice ?? "all";
  const page = searchParams?.page ?? 1;

  return (
    <div>
      <MenuDescription />
      <div className="mb-8 flex justify-end">
        <Filter />
      </div>
      <Suspense fallback={<p className="text-center">Loading...</p>}>
        <PizzaList filter={filter} page={page} />
      </Suspense>
    </div>
  );
}

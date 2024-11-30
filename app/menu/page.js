import { Suspense } from "react";
import Filter from "../_components/Filter";
import Loader from "../_components/Loader";
import PizzaList from "../_components/PizzaList";
import MenuDescription from "../_components/MenuDescription";

export const revalidate = 3600;

export const metadata = {
  title: "Menu",
};

export default function Page({ searchParams }) {
  const filter = searchParams?.finalPrice ?? "all";
  const page = searchParams?.page ?? 1;

  return (
    <div>
      <MenuDescription />
      <div className="flex justify-end mb-8">
        <Filter />
      </div>
      <Suspense fallback={<Loader />} key={filter}>
        <PizzaList filter={filter} page={page} />
      </Suspense>
    </div>
  );
}

"use client";

import { usePathname, useSearchParams, useRouter } from "next/navigation";

function Filter() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const activeFilter = searchParams.get("finalPrice") ?? "all";

  function handleFilter(filter) {
    const params = new URLSearchParams(searchParams);
    params.set("finalPrice", filter);
    router.replace(`${pathname}?${params.toString()}`, {
      scroll: false,
    });
  }

  return (
    <div className="border border-primary-800 flex">
      <Button
        filter="all"
        activeFilter={activeFilter}
        handleFilter={() => handleFilter("all")}
      >
        All Pizzas
      </Button>
      <Button
        filter="cheap"
        activeFilter={activeFilter}
        handleFilter={() => handleFilter("cheap")}
      >
        Cheap
      </Button>
      <Button
        filter="moderate"
        activeFilter={activeFilter}
        handleFilter={() => handleFilter("moderate")}
      >
        Moderate
      </Button>
      <Button
        filter="expensive"
        activeFilter={activeFilter}
        handleFilter={() => handleFilter("expensive")}
      >
        Expensive
      </Button>
    </div>
  );
}

function Button({ filter, handleFilter, activeFilter, children }) {
  return (
    <button
      className={`px-5 py-2 hover:bg-primary-700 ${
        filter === activeFilter ? "bg-primary-700 text-primary-50" : ""
      }`}
      onClick={handleFilter}
    >
      {children}
    </button>
  );
}

export default Filter;

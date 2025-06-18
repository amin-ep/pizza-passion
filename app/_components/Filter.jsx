"use client";

import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";

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
    <motion.div
      initial={{ translateX: 40, opacity: 0 }}
      animate={{ translateX: 0, opacity: 1 }}
      transition={{
        duration: 0.7,
        delay: 0,
      }}
      className="flex border border-primary-800"
    >
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
    </motion.div>
  );
}

function Button({ filter, handleFilter, activeFilter, children }) {
  return (
    <button
      className={`relative z-[2] px-1 py-2 sm:px-5 ${
        filter === activeFilter
          ? "bg-primary-700 text-primary-50"
          : "transition-all after:absolute after:inset-0 after:z-[1] after:scale-0 after:bg-primary-700/30 after:transition-all hover:after:scale-[1]"
      }`}
      onClick={handleFilter}
    >
      {children}
    </button>
  );
}

export default Filter;

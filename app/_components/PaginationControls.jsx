"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { HiChevronRight, HiChevronLeft } from "react-icons/hi2";

function PaginationControls({ totalPages }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const currentPage = searchParams.get("page") ?? 1;
  const params = new URLSearchParams(searchParams);

  const replaceRoute = () => {
    router.replace(`${pathname}?${params.toString()}`);
  };

  const handlePrevPage = () => {
    params.set("page", Number(currentPage) - 1);
    replaceRoute();
  };

  const handleNextPage = () => {
    params.set("page", Number(currentPage) + 1);
    replaceRoute();
  };

  const handleChangePage = (value) => {
    if (currentPage == value) {
      return;
    } else {
      params.set("page", value);
      replaceRoute();
    }
  };

  return (
    <div className="flex justify-center items-center gap-2 my-16">
      <Button onClick={handlePrevPage} disabled={currentPage == 1}>
        <HiChevronLeft size={25} />
      </Button>
      {Array(totalPages)
        .fill(null)
        .map((_, index) => (
          <Button
            activePage={currentPage == index + 1}
            onClick={() => {
              handleChangePage(index + 1);
            }}
            key={index + 1}
          >
            {index + 1}
          </Button>
        ))}
      <Button onClick={handleNextPage} disabled={totalPages == currentPage}>
        <HiChevronRight size={25} />
      </Button>
    </div>
  );
}

function Button({ onClick, activePage, disabled, children }) {
  return (
    <button
      className={`w-10 ${
        activePage && `bg-accent-600 border-accent-600 text-primary-800`
      } text-lg aspect-square flex items-center justify-center bg-transparent border border-primary-800 text-primary-50 disabled:hover:border-primary-800 disabled:hover:bg-transparent disabled:hover:text-primary-50 hover:bg-accent-600 hover:text-primary-800 hover:border-accent-600`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default PaginationControls;

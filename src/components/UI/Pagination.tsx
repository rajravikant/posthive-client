import React from "react";


interface PaginationProps {
  totalPages: number;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

const Pagination = ({totalPages,page,setPage}:PaginationProps) => {
 
  // const postPerPage = 6;

  return (
    <div className="flex flex-col items-center py-2">
      <span className="text-sm text-gray-700 dark:text-gray-400">
        Showing{" "}
        <span className="font-semibold text-gray-900 dark:text-white">
          {page}
        </span>{" "}
        of{" "}
        <span className="font-semibold text-gray-900 dark:text-white">
          {totalPages}
        </span>{" "}
      </span>

      <div className="inline-flex mt-2 xs:mt-0">
        <button
          onClick={() => setPage((prev) => prev - 1)}
          disabled={page === 1}
          className="flex items-center justify-center disabled:bg-primary/50 px-3 h-8 text-sm font-medium text-white  bg-primary rounded-s hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white "
        >
          Prev
        </button>
        <button
          onClick={() => setPage((prev) => prev + 1)}
          disabled={page === totalPages}
          className="flex items-center justify-center disabled:bg-primary/50 px-3 h-8 text-sm font-medium text-white bg-primary rounded-e hover:bg-gray-900 dark:bg-gray-800  dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;

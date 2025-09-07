import React from "react";

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  // Generate array of pages to display (adjust max displayed pages as needed)
  const maxPageButtons = 5;
  let startPage = Math.max(1, currentPage - Math.floor(maxPageButtons / 2));
  let endPage = startPage + maxPageButtons - 1;
  if (endPage > totalPages) {
    endPage = totalPages;
    startPage = Math.max(1, endPage - maxPageButtons + 1);
  }
  const pages = [];
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  const goToPage = (page) => {
    if (page !== currentPage && page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  return (
    <nav
      aria-label="Pagination Navigation"
      className="flex justify-center items-center gap-2 mt-8"
    >
      {/* First */}
      <button
        onClick={() => goToPage(1)}
        disabled={currentPage === 1}
        aria-label="Go to first page"
        className={`px-3 py-1 rounded-full font-semibold transition ${
          currentPage === 1
            ? "bg-gray-600 text-gray-400 cursor-not-allowed"
            : "bg-blue-700 text-white hover:bg-blue-600"
        }`}
      >
        First
      </button>

      {/* Previous */}
      <button
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Go to previous page"
        className={`px-3 py-1 rounded-full font-semibold transition ${
          currentPage === 1
            ? "bg-gray-600 text-gray-400 cursor-not-allowed"
            : "bg-blue-700 text-white hover:bg-blue-600"
        }`}
      >
        ‹ Prev
      </button>

      {/* Page Numbers */}
      {pages.map((page) => (
        <button
          key={page}
          onClick={() => goToPage(page)}
          aria-current={page === currentPage ? "page" : undefined}
          className={`w-10 h-10 flex items-center justify-center rounded-full font-semibold transition ${
            page === currentPage
              ? "bg-yellow-400 text-black shadow-lg font-bold"
              : "bg-blue-800 text-white hover:bg-blue-700"
          }`}
        >
          {page}
        </button>
      ))}

      {/* Next */}
      <button
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Go to next page"
        className={`px-3 py-1 rounded-full font-semibold transition ${
          currentPage === totalPages
            ? "bg-gray-600 text-gray-400 cursor-not-allowed"
            : "bg-blue-700 text-white hover:bg-blue-600"
        }`}
      >
        Next ›
      </button>

      {/* Last */}
      <button
        onClick={() => goToPage(totalPages)}
        disabled={currentPage === totalPages}
        aria-label="Go to last page"
        className={`px-3 py-1 rounded-full font-semibold transition ${
          currentPage === totalPages
            ? "bg-gray-600 text-gray-400 cursor-not-allowed"
            : "bg-blue-700 text-white hover:bg-blue-600"
        }`}
      >
        Last
      </button>
    </nav>
  );
};

export default Pagination;

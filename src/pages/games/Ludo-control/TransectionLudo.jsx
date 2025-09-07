import React, { useState, useMemo } from "react";

const initialTransactions = [
  { id: 1, user: "Alice", amount: 500, mode: "Deposit", status: "Success", date: "2025-09-01" },
  { id: 2, user: "Bob", amount: 300, mode: "Withdrawal", status: "Pending", date: "2025-09-02" },
  { id: 3, user: "Charlie", amount: 200, mode: "Deposit", status: "Failed", date: "2025-09-03" },
  { id: 4, user: "David", amount: 800, mode: "Withdrawal", status: "Success", date: "2025-09-04" },
  { id: 5, user: "Eve", amount: 1000, mode: "Deposit", status: "Pending", date: "2025-09-05" },
  { id: 6, user: "Alice", amount: 500, mode: "Deposit", status: "Success", date: "2025-09-01" },
  { id: 7, user: "Bob", amount: 300, mode: "Withdrawal", status: "Pending", date: "2025-09-02" },
  { id: 8, user: "Charlie", amount: 200, mode: "Deposit", status: "Failed", date: "2025-09-03" },
  { id: 9, user: "David", amount: 800, mode: "Withdrawal", status: "Success", date: "2025-09-04" },
  { id: 10, user: "Eve", amount: 1000, mode: "Deposit", status: "Pending", date: "2025-09-05" },
];

const ITEMS_PER_PAGE = 7;

const LudoTransactions = () => {
  const [transactions] = useState(initialTransactions);
  const [statusFilter, setStatusFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // 🔍 Filter + Search
  const filteredTransactions = useMemo(() => {
    return transactions.filter((tx) => {
      const matchesSearch = tx.user.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === "All" || tx.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [transactions, searchTerm, statusFilter]);

  // 📄 Pagination
  const totalPages = Math.ceil(filteredTransactions.length / ITEMS_PER_PAGE);
  const paginatedTransactions = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredTransactions.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredTransactions, currentPage]);

  const goToPage = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  return (
    <div className="p-6 min-h-screen bg-gray-50 dark:bg-gray-900 transition-all">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-blue-700 dark:text-blue-400">
          💳 Transactions
        </h1>

        {/* Filters */}
        <div className="flex gap-3 mt-4 md:mt-0">
          <input
            type="text"
            placeholder="Search by user..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="p-2 border rounded-lg bg-white dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="p-2 border rounded-lg bg-white dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
          >
            <option value="All">All</option>
            <option value="Success">Success</option>
            <option value="Pending">Pending</option>
            <option value="Failed">Failed</option>
          </select>
        </div>
      </div>

      {/* Table */}
    <div className="overflow-x-auto bg-transparent ">
  <table className="hidden md:table w-full text-left border-separate border-spacing-y-3 overflow-hidden">
    <thead
      style={{
        backgroundImage:
          "linear-gradient(-225deg, #A445B2 0%, #D41872 52%, #FF0066 100%)",
      }}
      className="text-white"
    >
      <tr>
        <th className="px-4 py-3 rounded-l-lg">ID</th>
        <th className="px-4 py-3">User</th>
        <th className="px-4 py-3">Amount</th>
        <th className="px-4 py-3">Mode</th>
        <th className="px-4 py-3">Status</th>
        <th className="px-4 py-3 rounded-r-lg">Date</th>
      </tr>
    </thead>
    <tbody>
      {paginatedTransactions.length === 0 ? (
        <tr>
          <td
            colSpan="6"
            className="text-center py-4 text-gray-500 dark:text-gray-400"
          >
            No transactions found.
          </td>
        </tr>
      ) : (
        paginatedTransactions.map((tx, index) => (
          <tr
            key={tx.id}
            className={`shadow-md rounded-lg transition 
              ${
                index % 2 === 0
                  ? "bg-purple-100 dark:bg-purple-900"
                  : "bg-pink-100 dark:bg-pink-900"
              } hover:scale-[1.01]`}
          >
            <td className="px-4 py-3 font-medium">#{tx.id}</td>
            <td className="px-4 py-3">{tx.user}</td>
            <td className="px-4 py-3 font-semibold">₹{tx.amount}</td>
            <td className="px-4 py-3">{tx.mode}</td>
            <td className="px-4 py-3">
              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  tx.status === "Success"
                    ? "bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-300"
                    : tx.status === "Pending"
                    ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-800 dark:text-yellow-300"
                    : "bg-red-100 text-red-700 dark:bg-red-800 dark:text-red-300"
                }`}
              >
                {tx.status}
              </span>
            </td>
            <td className="px-4 py-3">{tx.date}</td>
          </tr>
        ))
      )}
    </tbody>
  </table>

  {/* 📱 Mobile Card Layout */}
  <div className="md:hidden space-y-3">
    {paginatedTransactions.map((tx, index) => (
      <div
        key={tx.id}
        className={`p-4 rounded-lg shadow-md transition ${
          index % 2 === 0
            ? "bg-purple-100 dark:bg-purple-900"
            : "bg-pink-100 dark:bg-pink-900"
        }`}
      >
        <div className="flex justify-between text-sm">
          <span className="font-semibold">ID:</span>
          <span>#{tx.id}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="font-semibold">User:</span>
          <span>{tx.user}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="font-semibold">Amount:</span>
          <span>₹{tx.amount}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="font-semibold">Mode:</span>
          <span>{tx.mode}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="font-semibold">Status:</span>
          <span
            className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
              tx.status === "Success"
                ? "bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-300"
                : tx.status === "Pending"
                ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-800 dark:text-yellow-300"
                : "bg-red-100 text-red-700 dark:bg-red-800 dark:text-red-300"
            }`}
          >
            {tx.status}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="font-semibold">Date:</span>
          <span>{tx.date}</span>
        </div>
      </div>
    ))}
  </div>
</div>


      {/* Pagination */}
      <div className="flex justify-center mt-6 space-x-2">
        <button
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1 rounded border bg-white dark:bg-gray-800 disabled:text-gray-400"
        >
          Prev
        </button>
        {[...Array(totalPages)].map((_, idx) => {
          const pageNum = idx + 1;
          return (
            <button
              key={pageNum}
              onClick={() => goToPage(pageNum)}
              className={`px-3 py-1 rounded border ${
                currentPage === pageNum
                  ? "bg-blue-600 text-white"
                  : "bg-white dark:bg-gray-800 hover:bg-blue-100 dark:hover:bg-gray-700"
              }`}
            >
              {pageNum}
            </button>
          );
        })}
        <button
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-1 rounded border bg-white dark:bg-gray-800 disabled:text-gray-400"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default LudoTransactions;
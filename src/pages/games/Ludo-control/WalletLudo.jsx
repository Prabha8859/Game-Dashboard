import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";

const LudoWallet = () => {
  const [users, setUsers] = useState(() => {
    const saved = localStorage.getItem("walletUsers");
    return saved
      ? JSON.parse(saved)
      : [
          { id: 1, name: "John Doe", balance: 500 },
          { id: 2, name: "Jane Smith", balance: 1200 },
        ];
  });

  const [selectedUser, setSelectedUser] = useState(null);
  const [adjustAmount, setAdjustAmount] = useState("");
  const [adjustType, setAdjustType] = useState("add");

  useEffect(() => {
    localStorage.setItem("walletUsers", JSON.stringify(users));
  }, [users]);

  const totalDeposits = users.reduce((acc, u) => acc + u.balance, 0);
  const totalWithdrawals = 2000;
  const commissionEarned = 150;

  const formatINR = (n) => `₹${Number(n).toLocaleString("en-IN")}`;

  const handleAdjust = () => {
    if (!selectedUser || !adjustAmount) {
      Swal.fire("Error", "Please select a user and enter amount", "error");
      return;
    }

    const amount = parseFloat(adjustAmount);
    if (isNaN(amount) || amount <= 0) {
      Swal.fire("Error", "Enter a valid amount.", "error");
      return;
    }

    setUsers((prev) =>
      prev.map((u) => {
        if (u.id === selectedUser.id) {
          let newBalance =
            adjustType === "add" ? u.balance + amount : u.balance - amount;
          if (newBalance < 0) newBalance = 0;
          return { ...u, balance: newBalance };
        }
        return u;
      })
    );

    Swal.fire(
      "Success",
      `${adjustType === "add" ? "Added" : "Deducted"} ${formatINR(amount)} for ${selectedUser.name}`,
      "success"
    );

    setAdjustAmount("");
    setSelectedUser(null);
  };

  return (
    <div className="min-h-screen p-8 font-sans text-gray-800 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="mb-8 rounded-2xl p-6 bg-gradient-to-r from-blue-200 via-purple-200 to-cyan-200 shadow-md text-gray-800">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-extrabold">Ludo Wallet</h1>
              <p className="text-sm opacity-80 mt-1">Admin dashboard — manage user balances quickly</p>
            </div>

            <div className="flex items-center gap-6">
              <div className="text-right">
                <div className="text-xs opacity-70">Total deposits</div>
                <div className="text-lg font-bold">{formatINR(totalDeposits)}</div>
              </div>

              <div className="text-right">
                <div className="text-xs opacity-70">Withdrawals</div>
                <div className="text-lg font-bold">{formatINR(totalWithdrawals)}</div>
              </div>

              <div className="text-right">
                <div className="text-xs opacity-70">Commission</div>
                <div className="text-lg font-bold">{formatINR(commissionEarned)}</div>
              </div>
            </div>
          </div>
        </header>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="rounded-xl p-5 shadow bg-gradient-to-tr from-cyan-100 to-cyan-200 text-gray-800 transform hover:scale-[1.02] transition">
            <div className="text-sm font-medium">Total Deposits</div>
            <div className="text-2xl font-bold mt-2">{formatINR(totalDeposits)}</div>
            <div className="mt-3 text-xs opacity-70">Sum of all user balances</div>
          </div>

          <div className="rounded-xl p-5 shadow bg-gradient-to-tr from-rose-100 to-rose-200 text-gray-800 transform hover:scale-[1.02] transition">
            <div className="text-sm font-medium">Total Withdrawals</div>
            <div className="text-2xl font-bold mt-2">{formatINR(totalWithdrawals)}</div>
            <div className="mt-3 text-xs opacity-70">Amount withdrawn by users</div>
          </div>

          <div className="rounded-xl p-5 shadow bg-gradient-to-tr from-indigo-100 to-purple-200 text-gray-800 transform hover:scale-[1.02] transition">
            <div className="text-sm font-medium">Commission Earned</div>
            <div className="text-2xl font-bold mt-2">{formatINR(commissionEarned)}</div>
            <div className="mt-3 text-xs opacity-70">Platform earnings</div>
          </div>
        </div>

        {/* Manual Adjustment Panel */}
        <section className="bg-white rounded-2xl p-6 mb-8 shadow-md border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Manual Wallet Adjustment</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block mb-2 text-sm text-gray-700">Select User</label>
              <select
                className="w-full p-3 rounded-lg border border-gray-300 bg-white text-gray-800 focus:outline-none"
                value={selectedUser?.id || ""}
                onChange={(e) => setSelectedUser(users.find((u) => u.id === parseInt(e.target.value)))}
              >
                <option value="">-- Select User --</option>
                {users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {`${user.name} (${formatINR(user.balance)})`}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block mb-2 text-sm text-gray-700">Amount</label>
              <input
                type="number"
                placeholder="Enter amount"
                className="w-full p-3 rounded-lg border border-gray-300 bg-white text-gray-800 focus:outline-none"
                value={adjustAmount}
                onChange={(e) => setAdjustAmount(e.target.value)}
              />
            </div>

            <div>
              <label className="block mb-2 text-sm text-gray-700">Adjustment Type</label>
              <select
                className="w-full p-3 rounded-lg border border-gray-300 bg-white text-gray-800 focus:outline-none"
                value={adjustType}
                onChange={(e) => setAdjustType(e.target.value)}
              >
                <option value="add">Add Funds</option>
                <option value="deduct">Deduct Funds</option>
              </select>
            </div>
          </div>

          <div className="mt-6 md:mt-8">
            <button
              onClick={handleAdjust}
              className="w-full md:w-48 py-3 rounded-lg font-semibold shadow-md bg-gradient-to-r from-green-300 to-cyan-300 text-gray-800"
            >
              Submit Adjustment
            </button>
          </div>
        </section>

        {/* User Table */}
        <section className="bg-white rounded-2xl p-4 shadow-md border border-gray-200">
          <div className="overflow-x-auto">
            <table className="w-full table-auto text-left">
              <thead>
                <tr className="text-sm text-gray-700 border-b border-gray-200">
                  <th className="py-3 px-4">User</th>
                  <th className="py-3 px-4">Balance</th>
                </tr>
              </thead>

              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50 transition">
                    <td className="py-4 px-4 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-200 to-cyan-200 flex items-center justify-center text-gray-700 font-bold">
                        {user.name.split(" ").map(s => s[0]).slice(0,2).join("")}
                      </div>
                      <div>
                        <div className="font-medium text-gray-800">{user.name}</div>
                        <div className="text-xs text-gray-500">ID: {user.id}</div>
                      </div>
                    </td>

                    <td className="py-4 px-4 font-bold text-gray-800">{formatINR(user.balance)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <footer className="mt-6 text-sm text-gray-500">Tip: Use the adjustment panel to quickly fix user balances.</footer>
      </div>
    </div>
  );
};

export default LudoWallet;
// src/JackpotSummaryLogs.jsx
import React, { useState } from "react";
import { Search, Users, Gift, DollarSign } from "lucide-react";

export default function JackpotSummaryLogs() {
  const [logs] = useState([
    { id: "JP001", username: "PlayerOne", time: "2025-09-04 14:32", contribution: 200, amountWon: 5000, loss: 50 },
    { id: "JP002", username: "PlayerTwo", time: "2025-09-04 15:10", contribution: 150, amountWon: 2500, loss: 30 },
    { id: "JP003", username: "LuckyStar", time: "2025-09-04 16:45", contribution: 100, amountWon: 0, loss: 100 },
  ]);

  const [search, setSearch] = useState("");

  const filteredLogs = logs.filter(
    (log) =>
      log.id.toLowerCase().includes(search.toLowerCase()) ||
      log.username.toLowerCase().includes(search.toLowerCase())
  );

  const totalContribution = logs.reduce((sum, l) => sum + l.contribution, 0);
  const totalPayout = logs.reduce((sum, l) => sum + l.amountWon, 0);
  const netProfit = totalContribution - totalPayout;

  const cardData = [
    { title: "Total Contribution", value: `₹${totalContribution}`, icon: <Users className="w-6 h-6 text-white" />, gradient: "from-blue-300 via-blue-300 to-blue-400" },
    { title: "Total Payout", value: `₹${totalPayout}`, icon: <Gift className="w-6 h-6 text-white" />, gradient: "from-green-300 via-green-300 to-green-400" },
    { title: netProfit >= 0 ? "Net Profit" : "Net Loss", value: `₹${netProfit}`, icon: <DollarSign className="w-6 h-6 text-white" />, gradient: netProfit >= 0 ? "from-purple-300 via-pink-300 to-pink-400" : "from-red-300 via-orange-300 to-orange-400" },
  ];

  return (
    <div className="bg-gray-50 rounded-3xl shadow-xl p-6 mt-8 transition-all duration-300 hover:shadow-2xl">
      <h2 className="text-2xl font-extrabold mb-6 text-gray-800 flex items-center gap-2">
        📊 Jackpot Summary & Logs
      </h2>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {cardData.map((card, index) => (
          <div
            key={index}
            className={`relative overflow-hidden p-6 rounded-2xl shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl text-white bg-gradient-to-r ${card.gradient}`}
          >
            <div className="absolute -top-4 -right-4 opacity-20 scale-150">{card.icon}</div>
            <div className="flex items-center gap-3">
              <div className="p-3 bg-white/20 rounded-full">{card.icon}</div>
              <div>
                <p className="text-sm opacity-80">{card.title}</p>
                <h3 className="text-3xl font-bold mt-1">{card.value}</h3>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Search */}
      <div className="flex items-center gap-3 mb-5 bg-white p-3 rounded-2xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
        <Search className="text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search by ID or Winner Name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full outline-none text-gray-700 text-sm placeholder-gray-400"
        />
      </div>

      {/* Logs Table */}
      <div className="overflow-x-auto rounded-2xl border border-gray-200 shadow-sm">
        <table className="w-full border-collapse text-gray-700">
          <thead
            className="bg-gradient-to-r from-green-200 to-blue-200 text-gray-800"
          >
            <tr>
              <th className="p-3 text-left font-semibold">ID</th>
              <th className="p-3 text-left font-semibold">Winner</th>
              <th className="p-3 text-left font-semibold">Time & Date</th>
              <th className="p-3 text-left font-semibold">Contribution</th>
              <th className="p-3 text-left font-semibold">Amount Won</th>
              <th className="p-3 text-left font-semibold">Loss</th>
            </tr>
          </thead>
          <tbody>
            {filteredLogs.length > 0 ? (
              filteredLogs.map((log) => (
                <tr
                  key={log.id}
                  className="border-b border-gray-200 hover:bg-gradient-to-r hover:from-gray-100 hover:to-gray-200 transition-all cursor-pointer"
                >
                  <td className="p-3 font-medium">{log.id}</td>
                  <td className="p-3 font-semibold">{log.username}</td>
                  <td className="p-3 text-sm opacity-80">{log.time}</td>
                  <td className="p-3">₹{log.contribution}</td>
                  <td className="p-3 text-green-600 font-semibold">₹{log.amountWon}</td>
                  <td className="p-3 text-red-500 font-medium">₹{log.loss}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="p-6 text-center text-gray-500 text-sm">
                  ❌ No matching records found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
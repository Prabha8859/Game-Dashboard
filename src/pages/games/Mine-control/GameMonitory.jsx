// src/GameMonitor.jsx
import React, { useState } from "react";
import {
  Eye,
  Users,
  Coins,
  Trophy,
  TrendingUp,
  Award,
  BarChart2,
  Star,
  Gem,
} from "lucide-react";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

// Recharts
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const GameMonitor = () => {
  const [activeSessions] = useState([
    { id: 1, user: "Alice", bet: 100, players: 3, status: "Playing" },
    { id: 2, user: "Bob", bet: 250, players: 5, status: "Win" },
    { id: 3, user: "Charlie", bet: 150, players: 2, status: "Loss" },
    { id: 4, user: "Diana", bet: 200, players: 4, status: "Playing" },
  ]);

  const [gameHistory] = useState([
    {
      id: "G001",
      user: "Alice",
      bet: 100,
      tiles: ["success", "fail", "mine", "success"],
      result: "Loss",
      payout: 0,
    },
    {
      id: "G002",
      user: "Bob",
      bet: 250,
      tiles: ["success", "success", "success"],
      result: "Win",
      payout: 500,
    },
  ]);

  const chartData = [
    { name: "Mon", profit: 400, loss: 200 },
    { name: "Tue", profit: 300, loss: 180 },
    { name: "Wed", profit: 500, loss: 250 },
    { name: "Thu", profit: 450, loss: 210 },
    { name: "Fri", profit: 600, loss: 300 },
  ];

  const pieData = [
    { name: "Wins", value: 65 },
    { name: "Losses", value: 35 },
  ];

  const COLORS = ["#4ade80", "#f87171"];

  // Modern popup view
  const handleView = (session) => {
    let theme =
      session.status === "Win"
        ? { gradient: "linear-gradient(135deg,#34d399,#059669)", icon: "success" }
        : session.status === "Loss"
        ? { gradient: "linear-gradient(135deg,#f87171,#dc2626)", icon: "error" }
        : { gradient: "linear-gradient(135deg,#60a5fa,#2563eb)", icon: "info" };

    Swal.fire({
      title: `<div style="color:white;font-size:22px;font-weight:700;">
                🎮 Session Details
              </div>`,
      html: `
        <div style="background:#fff;padding:20px;border-radius:15px;text-align:left;box-shadow:0 2px 15px rgba(0,0,0,0.1);">
          <p><b>👤 User:</b> ${session.user}</p>
          <p><b>💰 Bet:</b> ₹${session.bet}</p>
          <p><b>🧑‍🤝‍🧑 Players:</b> ${session.players}</p>
          <p><b>📊 Status:</b> <span style="color:${
            session.status === "Win"
              ? "#16a34a"
              : session.status === "Loss"
              ? "#dc2626"
              : "#2563eb"
          };font-weight:600;">${session.status}</span></p>
        </div>
      `,
      background: theme.gradient,
      showConfirmButton: true,
      confirmButtonText: "Close",
      confirmButtonColor: "#fff",
      buttonsStyling: false,
      customClass: {
        popup: "rounded-2xl shadow-2xl",
        confirmButton:
          "px-6 py-2 bg-white text-gray-800 font-semibold rounded-xl hover:bg-gray-100 transition",
      },
      icon: theme.icon,
    });
  };

  return (
    <div className="p-6 space-y-8 bg-gray-50 min-h-screen">
      {/* 🔹 Header */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6 rounded-2xl shadow-lg flex items-center gap-3">
        <Gem className="w-7 h-7" />
        <h1 className="text-2xl font-bold">Mines Game Monitor</h1>
      </div>

      {/* 🔹 Top Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          {
            icon: <Users className="text-blue-500" />,
            label: "Active Players",
            value: "1,245",
          },
          {
            icon: <Coins className="text-green-500" />,
            label: "Total Bets",
            value: "₹2,34,000",
          },
          {
            icon: <Trophy className="text-yellow-500" />,
            label: "Total Winnings",
            value: "₹1,80,000",
          },
          {
            icon: <TrendingUp className="text-red-500" />,
            label: "Profit / Loss",
            value: "₹54,000",
          },
        ].map((card, i) => (
          <div
            key={i}
            className="p-5 bg-white/70 backdrop-blur-lg rounded-2xl shadow-lg border border-gray-100 hover:scale-105 transition transform"
          >
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-gray-100">{card.icon}</div>
              <div>
                <p className="text-sm text-gray-500">{card.label}</p>
                <h2 className="text-xl font-bold text-gray-800">
                  {card.value}
                </h2>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 🔹 Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Profit/Loss Line Chart */}
        <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-700 flex items-center gap-2 mb-4">
            <BarChart2 className="w-5 h-5 text-blue-500" /> Profit & Loss Trend
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="profit" stroke="#4ade80" strokeWidth={2} />
              <Line type="monotone" dataKey="loss" stroke="#f87171" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Wins/Loss Pie Chart */}
        <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-700 flex items-center gap-2 mb-4">
            <Award className="w-5 h-5 text-yellow-500" /> Win / Loss Ratio
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                cx="50%"
                cy="50%"
                outerRadius={90}
                label
              >
                {pieData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Legend />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 🔹 Active Sessions */}
      <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-700 flex items-center gap-2 mb-4">
          <Star className="w-5 h-5 text-purple-500" /> Active Sessions
        </h3>
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-gray-100 text-gray-700">
              <th className="p-3 text-left">User</th>
              <th className="p-3 text-left">Bet</th>
              <th className="p-3 text-left">Players</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {activeSessions.map((s) => (
              <tr key={s.id} className="border-b hover:bg-gray-50 transition">
                <td className="p-3">{s.user}</td>
                <td className="p-3">₹{s.bet}</td>
                <td className="p-3">{s.players}</td>
                <td
                  className={`p-3 font-semibold ${
                    s.status === "Win"
                      ? "text-green-500"
                      : s.status === "Loss"
                      ? "text-red-500"
                      : "text-blue-500"
                  }`}
                >
                  {s.status}
                </td>
                <td className="p-3 text-center">
                  <button
                    onClick={() => handleView(s)}
                    className="px-3 py-1 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg hover:opacity-90 transition flex items-center gap-1 mx-auto"
                  >
                    <Eye className="w-4 h-4" /> View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 🔹 Game History */}
      <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-700 flex items-center gap-2 mb-4">
          <Star className="w-5 h-5 text-indigo-500" /> Game History
        </h3>
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-gray-100 text-gray-700">
              <th className="p-3 text-left">Game ID</th>
              <th className="p-3 text-left">User</th>
              <th className="p-3 text-left">Bet</th>
              <th className="p-3 text-left">Tiles Picked</th>
              <th className="p-3 text-left">Result</th>
              <th className="p-3 text-left">Payout</th>
            </tr>
          </thead>
          <tbody>
            {gameHistory.map((g) => (
              <tr key={g.id} className="border-b hover:bg-gray-50 transition">
                <td className="p-3">{g.id}</td>
                <td className="p-3">{g.user}</td>
                <td className="p-3">₹{g.bet}</td>
                <td className="p-3 flex gap-2">
                  {g.tiles.map((tile, i) => (
                    <span
                      key={i}
                      className={`px-2 py-1 text-xs rounded-lg ${
                        tile === "success"
                          ? "bg-green-100 text-green-600"
                          : tile === "fail"
                          ? "bg-red-100 text-red-600"
                          : "bg-yellow-100 text-yellow-600"
                      }`}
                    >
                      {tile}
                    </span>
                  ))}
                </td>
                <td
                  className={`p-3 font-semibold ${
                    g.result === "Win" ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {g.result}
                </td>
                <td className="p-3">₹{g.payout}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GameMonitor;
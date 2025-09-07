// src/ControlMinesLight.jsx
import React, { useState } from "react";
import {
  Save,
  Coins,
  Trophy,
  UserCheck,
  TrendingUp,
  Activity,
  AlertCircle,
} from "lucide-react";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

const ControlMinesLight = () => {
  const [minBet, setMinBet] = useState(10);
  const [maxBet, setMaxBet] = useState(1000);
  const [defaultMines, setDefaultMines] = useState(5);
  const [houseEdge, setHouseEdge] = useState(5);

  const handleSave = () => {
    Swal.fire({
      title: "✅ Configuration Saved!",
      html: `
        <table style="width:100%; border-collapse:collapse; font-size:14px; text-align:left;">
          <tr><td><b>Min Bet</b></td><td>$${minBet}</td></tr>
          <tr><td><b>Max Bet</b></td><td>$${maxBet}</td></tr>
          <tr><td><b>Default Mines</b></td><td>${defaultMines}</td></tr>
          <tr><td><b>House Edge</b></td><td>${houseEdge}%</td></tr>
        </table>
      `,
      icon: "success",
      confirmButtonText: "Great!",
      background: "#ffffff",
      color: "#1a202c",
      confirmButtonColor: "#6366f1",
      customClass: {
        popup: "rounded-2xl shadow-lg p-6",
        title: "text-xl font-bold mb-4",
        htmlContainer: "text-sm text-gray-700",
      },
    });
  };

  // Chart data
  const barData = [
    { name: "Total Bets", value: 1245 },
    { name: "Winnings", value: 8560 },
    { name: "Losses", value: 5230 },
  ];

  const pieData = [
    { name: "Wins", value: 61 },
    { name: "Losses", value: 39 },
  ];

  const COLORS = ["#4ade80", "#f87171"];

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white p-6 rounded-2xl shadow-lg mb-12 text-center">
        <h1 className="text-3xl font-bold tracking-wide flex items-center justify-center gap-3">
          ⚙️ Control Mines Game
        </h1>
        <p className="text-sm opacity-80 mt-2">
          Manage configuration and view real-time insights
        </p>
      </div>

      {/* Config Panel */}
      <div className="bg-white rounded-3xl shadow-xl p-10 max-w-4xl mx-auto space-y-10 mb-16">
        {/* Min / Max Bet */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <label className="text-gray-700 font-semibold mb-2 block">
              Minimum Bet
            </label>
            <input
              type="number"
              min={0}
              value={minBet}
              onChange={(e) => setMinBet(e.target.value)}
              className="w-full p-4 rounded-2xl border border-gray-300 focus:ring-2 focus:ring-indigo-400 focus:outline-none text-lg"
            />
          </div>
          <div>
            <label className="text-gray-700 font-semibold mb-2 block">
              Maximum Bet
            </label>
            <input
              type="number"
              min={minBet}
              value={maxBet}
              onChange={(e) => setMaxBet(e.target.value)}
              className="w-full p-4 rounded-2xl border border-gray-300 focus:ring-2 focus:ring-green-400 focus:outline-none text-lg"
            />
          </div>
        </div>

        {/* Default Mines & House Edge */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <label className="text-gray-700 font-semibold mb-2 block">
              Default Mines
            </label>
            <select
              value={defaultMines}
              onChange={(e) => setDefaultMines(e.target.value)}
              className="w-full p-4 rounded-2xl border border-gray-300 focus:ring-2 focus:ring-yellow-400 focus:outline-none text-lg"
            >
              {Array.from({ length: 24 }, (_, i) => i + 1).map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-gray-700 font-semibold mb-2 block">
              House Edge: <span className="font-bold">{houseEdge}%</span>
            </label>
            <input
              type="range"
              min={0}
              max={20}
              value={houseEdge}
              onChange={(e) => setHouseEdge(e.target.value)}
              className="w-full h-3 bg-gray-200 rounded-full appearance-none cursor-pointer accent-purple-500"
            />
          </div>
        </div>

        {/* Save Button */}
        <div className="text-center mt-6">
          <button
            onClick={handleSave}
            className="inline-flex items-center gap-3 px-12 py-4 bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-bold rounded-3xl shadow-md hover:scale-105 transition"
          >
            <Save className="w-5 h-5" />
            Save Configuration
          </button>
        </div>
      </div>

      {/* Quick Summary */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">
          📊 Quick Summary
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6 max-w-6xl mx-auto mb-12">
          <div className="bg-white p-6 rounded-2xl shadow-md flex flex-col items-center hover:shadow-lg transition">
            <Coins className="w-8 h-8 text-yellow-500 mb-3" />
            <p className="text-sm text-gray-500">Total Bets</p>
            <h3 className="text-xl font-bold text-gray-800">1,245</h3>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-md flex flex-col items-center hover:shadow-lg transition">
            <Trophy className="w-8 h-8 text-green-500 mb-3" />
            <p className="text-sm text-gray-500">Total Winnings</p>
            <h3 className="text-xl font-bold text-gray-800">$8,560</h3>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-md flex flex-col items-center hover:shadow-lg transition">
            <AlertCircle className="w-8 h-8 text-red-500 mb-3" />
            <p className="text-sm text-gray-500">Total Losses</p>
            <h3 className="text-xl font-bold text-gray-800">$5,230</h3>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-md flex flex-col items-center hover:shadow-lg transition">
            <UserCheck className="w-8 h-8 text-blue-500 mb-3" />
            <p className="text-sm text-gray-500">Active Players</p>
            <h3 className="text-xl font-bold text-gray-800">327</h3>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-md flex flex-col items-center hover:shadow-lg transition">
            <TrendingUp className="w-8 h-8 text-indigo-500 mb-3" />
            <p className="text-sm text-gray-500">Win Rate</p>
            <h3 className="text-xl font-bold text-gray-800">61%</h3>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-md flex flex-col items-center hover:shadow-lg transition">
            <Activity className="w-8 h-8 text-purple-500 mb-3" />
            <p className="text-sm text-gray-500">Highest Bet</p>
            <h3 className="text-xl font-bold text-gray-800">$1,000</h3>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl mx-auto">
          {/* Bar Chart */}
          <div className="bg-white p-6 rounded-2xl shadow-md">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">
              📈 Performance Overview
            </h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="name" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#6366f1" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Pie Chart */}
          <div className="bg-white p-6 rounded-2xl shadow-md">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">
              🥧 Win vs Loss Rate
            </h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {pieData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ControlMinesLight;
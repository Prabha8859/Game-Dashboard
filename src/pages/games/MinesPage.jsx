// src/MinesDashboard.jsx
import React, { useState, useMemo } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Users, CreditCard, DollarSign, TrendingUp, Crown, Medal, Award } from "lucide-react";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

const MinesDashboard = () => {
  const [stats] = useState({
    totalUsers: 1520,
    totalBetsToday: 87200,
    totalPayouts: 43500,
  });

  const houseProfit = stats.totalBetsToday - stats.totalPayouts;

  const chartData = {
    labels: ["12AM", "4AM", "8AM", "12PM", "4PM", "8PM", "12AM"],
    datasets: [
      {
        label: "Bets",
        data: [5000, 7000, 10000, 15000, 12000, 18000, 87200],
        borderColor: "#10B981",
        backgroundColor: "rgba(16, 185, 129, 0.2)",
        tension: 0.4,
        fill: true,
      },
      {
        label: "Payouts",
        data: [2000, 3000, 5000, 7000, 6000, 8000, 43500],
        borderColor: "#3B82F6",
        backgroundColor: "rgba(59, 130, 246, 0.2)",
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const payoutData = {
    labels: chartData.labels,
    datasets: [
      {
        label: "Payouts",
        data: [2000, 3000, 5000, 7000, 6000, 8000, 43500],
        borderColor: "#EF4444",
        backgroundColor: "rgba(239,68,68,0.2)",
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const profitData = {
    labels: chartData.labels,
    datasets: [
      {
        label: "House Profit",
        data: [3000, 4000, 5000, 8000, 6000, 10000, houseProfit],
        borderColor: "#FBBF24",
        backgroundColor: "rgba(251,191,36,0.2)",
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const gameHistory = [
    { id: "G001", players: 5, bet: 100, payout: 50, winner: "Alice" },
    { id: "G002", players: 8, bet: 200, payout: 0, winner: "House" },
    { id: "G003", players: 3, bet: 150, payout: 150, winner: "Bob" },
    { id: "G004", players: 7, bet: 300, payout: 0, winner: "House" },
    { id: "G005", players: 6, bet: 120, payout: 60, winner: "Charlie" },
    { id: "G006", players: 4, bet: 80, payout: 40, winner: "Dave" },
    { id: "G007", players: 9, bet: 220, payout: 0, winner: "House" },
    { id: "G008", players: 5, bet: 130, payout: 130, winner: "Eve" },
    { id: "G009", players: 5, bet: 140, payout: 70, winner: "Alice" },
    { id: "G010", players: 6, bet: 200, payout: 100, winner: "Bob" },
  ];

  const topPlayers = useMemo(() => {
    const stats = {};
    gameHistory.forEach((game) => {
      if (game.winner && game.winner !== "House") {
        if (!stats[game.winner]) stats[game.winner] = { player: game.winner, games: 0, wins: 0, totalPayout: 0 };
        stats[game.winner].games += 1;
        stats[game.winner].wins += 1;
        stats[game.winner].totalPayout += game.payout;
      }
    });
    return Object.values(stats)
      .sort((a, b) => b.wins - a.wins || b.totalPayout - a.totalPayout)
      .slice(0, 5);
  }, [gameHistory]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-50 p-6">
      <h1 className="text-3xl font-bold mb-8 text-gray-800 text-center">Mines Game Admin Dashboard</h1>

      {/* Top Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          { title: "Total Users", value: stats.totalUsers, icon: <Users className="w-8 h-8 text-white" />, bg: "from-gray-700 to-gray-900" },
          { title: "Total Bets Today", value: `$${stats.totalBetsToday}`, icon: <CreditCard className="w-8 h-8 text-white" />, bg: "from-green-500 to-green-700" },
          { title: "Total Payouts", value: `$${stats.totalPayouts}`, icon: <DollarSign className="w-8 h-8 text-white" />, bg: "from-red-500 to-red-700" },
          { title: "House Profit", value: `$${houseProfit}`, icon: <TrendingUp className="w-8 h-8 text-white" />, bg: "from-yellow-500 to-yellow-700" },
        ].map((stat, idx) => (
          <div
            key={idx}
            className={`bg-gradient-to-r ${stat.bg} p-5 rounded-2xl shadow-xl flex items-center transform hover:scale-105 transition-all duration-300`}
          >
            <div className="w-14 h-14 flex items-center justify-center bg-white/20 backdrop-blur-md rounded-full mr-4">{stat.icon}</div>
            <div>
              <p className="text-sm font-semibold text-white">{stat.title}</p>
              <p className="text-2xl font-bold text-white">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Main Chart */}
      <div className="bg-white p-6 rounded-2xl shadow-xl mb-6">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Bets & Payouts Trend</h2>
        <div className="h-64">
          <Line
            data={chartData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: { legend: { position: "top" }, tooltip: { mode: "index", intersect: false } },
              scales: { y: { beginAtZero: true, grid: { color: "#E5E7EB" } }, x: { grid: { display: false } } },
            }}
          />
        </div>
      </div>

      {/* Side by Side Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {[
          { title: "Payouts Trend", data: payoutData },
          { title: "House Profit Trend", data: profitData },
        ].map((chart, idx) => (
          <div key={idx} className="bg-white p-6 rounded-2xl shadow-xl">
            <h2 className="text-xl font-semibold mb-4 text-gray-800">{chart.title}</h2>
            <div className="h-56">
              <Line
                data={chart.data}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: { legend: { position: "top" } },
                  scales: { y: { beginAtZero: true, grid: { color: "#E5E7EB" } }, x: { grid: { display: false } } },
                }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Top Performers Table */}
      <div className="bg-white p-6 rounded-2xl shadow-xl">
        <h2 className="text-2xl font-bold flex items-center gap-3 mb-6 text-gray-800">
          <Crown className="w-7 h-7 text-yellow-500 animate-bounce" />
          Top Performers
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse text-gray-700">
            <thead>
              <tr className="bg-gray-100 text-left text-gray-600 uppercase text-sm">
                <th className="py-3 px-4 rounded-l-lg">#</th>
                <th className="py-3 px-4">Player</th>
                <th className="py-3 px-4">Wins</th>
                <th className="py-3 px-4">Games</th>
                <th className="py-3 px-4">Payout</th>
                <th className="py-3 px-4 rounded-r-lg">Win Rate</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {topPlayers.map((player, idx) => {
                const winRate = ((player.wins / player.games) * 100).toFixed(1);
                return (
                  <tr key={player.player} className="hover:bg-gray-50 transition-all duration-300">
                    <td className="py-3 px-4">{idx + 1}</td>
                    <td className="py-3 px-4 flex items-center gap-2 font-medium">
                      {idx === 0 ? <Crown className="w-5 h-5 text-yellow-500" /> :
                       idx === 1 ? <Medal className="w-5 h-5 text-gray-400" /> :
                       idx === 2 ? <Medal className="w-5 h-5 text-yellow-600" /> :
                       <Award className="w-4 h-4 text-gray-400" />}
                      {player.player}
                    </td>
                    <td className="py-3 px-4">{player.wins}</td>
                    <td className="py-3 px-4">{player.games}</td>
                    <td className="py-3 px-4 font-semibold text-green-600">${player.totalPayout}</td>
                    <td className="py-3 px-4">
                      <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-green-500 transition-all duration-500" style={{ width: `${winRate}%` }} />
                      </div>
                      <span className="text-xs text-gray-500 mt-1 block">{winRate}%</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MinesDashboard;
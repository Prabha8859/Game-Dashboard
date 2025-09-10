// src/MonthlyReportPanel.jsx
import React, { useMemo, useState } from "react";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  Legend,
} from "recharts";
import { Users, TrendingUp, Coins, Wallet } from "lucide-react";

// ------------------ SAMPLE DATA ------------------ //
const GAMES = [
  "Ludo",
  "Jackpot",
  "Mines",
  "Teen Patti",
  "Lottery",
  "Bird Shooting",
];

const MOCK_SUMMARY = {
  totalUsers: 15432,
  totalBets: 562301,
  totalWinnings: 480120,
  netProfit: 82180,
  highestWinningUser: "Sonali",
  highestLosingUser: "Rahul",
};

const mockGameStats = GAMES.map((name, idx) => ({
  name,
  totalBets: 12000 + idx * 5000,
  totalWinnings: 9000 + idx * 4000,
  profit: 3000 + idx * 1000,
  activePlayers: 120 + idx * 20,
  avgRTP: (Math.random() * 90 + 5).toFixed(2),
  peakDay: `2025-09-${(idx + 5).toString().padStart(2, "0")}`,
}));

const mockUsers = Array.from({ length: 8 }).map((_, i) => ({
  id: `U${1000 + i}`,
  name: ["Sonali", "Kajal", "Shreya", "shrishti", "Roushan", "Palak", "Himanshu", "Jay"][
    i
  ],
  totalBets: Math.floor(Math.random() * 5000),
  totalWinnings: Math.floor(Math.random() * 4500),
}));

const mockTransactions = Array.from({ length: 12 }).map((_, i) => ({
  id: `T${5000 + i}`,
  user: mockUsers[i % mockUsers.length].name,
  type: i % 3 === 0 ? "Withdraw" : "Deposit",
  mode: i % 2 === 0 ? "UPI" : "Card",
  amount: (1000 + i * 250).toFixed(2),
  status: i % 4 === 0 ? "Pending" : "Success",
  date: `2025-09-${(i + 1).toString().padStart(2, "0")}`,
}));

const profitTrendMock = Array.from({ length: 30 }).map((_, i) => ({
  day: `2025-09-${(i + 1).toString().padStart(2, "0")}`,
  profit: Math.floor(2000 + Math.random() * 8000),
}));

// Heatmap Mock Data
const activityMock = Array.from({ length: 7 }).map((_, d) => ({
  day: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][d],
  activity: Array.from({ length: 5 }).map(() =>
    Math.floor(Math.random() * 100)
  ),
}));

const COLORS = [
  "#4F46E5",
  "#06B6D4",
  "#F97316",
  "#10B981",
  "#E11D48",
  "#FACC15",
];

// ------------------ MAIN COMPONENT ------------------ //
export default function MonthlyReport() {
  const [selectedGame, setSelectedGame] = useState("all");
  const [selectedMonth, setSelectedMonth] = useState("2025-09");

  const filteredGames = useMemo(() => {
    if (selectedGame === "all") return mockGameStats;
    return mockGameStats.filter((g) => g.name === selectedGame);
  }, [selectedGame]);

  function exportCSV(rows, filename = "monthly-report.csv") {
    const header = Object.keys(rows[0] || {}).join(",");
    const body = rows.map((r) => Object.values(r).join(",")).join("\n");
    const csv = header + "\n" + body;
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="p-6 bg-gradient-to-br from-indigo-50 to-gray-100 min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <h1 className="text-3xl font-extrabold text-indigo-700 flex items-center gap-2">
          📅 Monthly Report{" "}
          <span className="text-gray-500 text-lg">({selectedMonth})</span>
        </h1>
        <div className="flex items-center gap-3 flex-wrap">
          <input
            type="month"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="px-3 py-2 border rounded-md bg-white shadow-sm"
          />
          <select
            value={selectedGame}
            onChange={(e) => setSelectedGame(e.target.value)}
            className="px-3 py-2 border rounded-md bg-white shadow-sm"
          >
            <option value="all">All Games</option>
            {GAMES.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
          <button
            onClick={() => {
              setSelectedMonth("2025-09");
              setSelectedGame("all");
            }}
            className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 transition"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        <Card
          title="Total Users"
          value={MOCK_SUMMARY.totalUsers}
          icon={Users}
        />
        <Card title="Total Bets" value={MOCK_SUMMARY.totalBets} icon={Coins} />
        <Card
          title="Net Profit"
          value={`₹${MOCK_SUMMARY.netProfit.toLocaleString()}`}
          accent
          icon={Wallet}
        />
        <Card
          title="Highest Winner"
          value={MOCK_SUMMARY.highestWinningUser}
          icon={TrendingUp}
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
        <ChartCard title="📈 Daily Profit Trend">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={profitTrendMock}>
              <XAxis dataKey="day" hide />
              <YAxis />
              <Tooltip />
              <Line
                dataKey="profit"
                stroke="#4F46E5"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="📊 Game Profit Distribution">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={mockGameStats.map((g) => ({
                  name: g.name,
                  value: g.profit,
                }))}
                dataKey="value"
                outerRadius={90}
                label
              >
                {mockGameStats.map((_, idx) => (
                  <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
                ))}
              </Pie>
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Extra Bar Chart */}
      <ChartCard title="📊 Bets vs Winnings (Game-wise)">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={mockGameStats}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="totalBets" fill="#4F46E5" />
            <Bar dataKey="totalWinnings" fill="#10B981" />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      {/* Heatmap */}
      <SectionCard title="🔥 Peak Activity Heatmap">
        <div className="overflow-x-auto">
          <div className="grid grid-cols-6 gap-2 text-center mb-3">
            <div></div>
            {["Morning", "Noon", "Afternoon", "Evening", "Night"].map(
              (slot) => (
                <div key={slot} className="text-xs font-medium text-gray-600">
                  {slot}
                </div>
              )
            )}
          </div>

          <div className="grid grid-cols-6 gap-2 text-center">
            {activityMock.map((row, i) => (
              <React.Fragment key={i}>
                <div className="font-medium text-sm text-gray-700">
                  {row.day}
                </div>
                {row.activity.map((val, j) => (
                  <div
                    key={j}
                    className="w-8 h-8 rounded-md transition transform hover:scale-110 hover:shadow-md cursor-pointer"
                    style={{
                      background: `linear-gradient(135deg, rgba(79,70,229,${
                        val / 100
                      }) 0%, rgba(167,139,250,${val / 120}) 100%)`,
                    }}
                    title={`${row.day} - ${
                      ["Morning", "Noon", "Afternoon", "Evening", "Night"][j]
                    }: ${val} Active`}
                  />
                ))}
              </React.Fragment>
            ))}
          </div>

          {/* Legend */}
          <div className="flex items-center gap-2 mt-4 text-xs text-gray-600">
            <span>Low</span>
            <div className="flex-1 h-3 rounded bg-gradient-to-r from-indigo-100 via-indigo-400 to-indigo-800"></div>
            <span>High</span>
          </div>
        </div>
      </SectionCard>

     {/* Game Summary Table */}
<SectionCard
  title="🎲 Game-wise Summary"
  exportFn={() => exportCSV(filteredGames, "monthly-games.csv")}
>
  <div className="overflow-x-auto rounded-xl shadow-lg border border-gray-200">
    <table className="min-w-full text-sm border-separate border-spacing-0">
      <thead>
        <tr className="bg-gradient-to-r from-indigo-100 to-indigo-200 text-indigo-900 font-semibold text-sm">
          <th className="py-3 px-4 text-left rounded-tl-lg">Game</th>
          <th className="py-3 px-4 text-right">Total Bets</th>
          <th className="py-3 px-4 text-right">Total Winnings</th>
          <th className="py-3 px-4 text-right">Profit</th>
          <th className="py-3 px-4 text-center">Active Players</th>
          <th className="py-3 px-4 text-center">Avg RTP%</th>
          <th className="py-3 px-4 text-center rounded-tr-lg">Peak Day</th>
        </tr>
      </thead>
      <tbody>
        {filteredGames.map((g, idx) => (
          <tr
            key={g.name}
            className={`transition-transform transform hover:scale-[1.00] hover:bg-indigo-50 ${
              idx % 2 === 0
                ? "bg-white"
                : "bg-indigo-50/50"
            }`}
          >
            <td className="py-2 px-4 font-medium text-gray-800">{g.name}</td>
            <td className="py-2 px-4 text-right text-gray-700">{g.totalBets}</td>
            <td className="py-2 px-4 text-right text-gray-700">{g.totalWinnings}</td>
            <td
              className={`py-2 px-4 text-right font-semibold ${
                g.profit >= 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              {g.profit >= 0 ? `+${g.profit}` : g.profit}
            </td>
            <td className="py-2 px-4 text-center text-gray-700 flex justify-center items-center gap-1">
              🎮 {g.activePlayers}
            </td>
            <td className="py-2 px-4 text-center text-gray-700">{g.avgRTP}%</td>
            <td className="py-2 px-4 text-center text-indigo-800 font-medium">
              📈 {g.peakDay}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</SectionCard>


      {/* Top Users */}
      {/* Top Users */}
      <SectionCard title="🏆 Top Users">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {mockUsers.map((u, idx) => {
            const isTop3 = idx < 3;
            const badgeColors = [
              "from-yellow-400 to-yellow-600", // Gold
              "from-gray-300 to-gray-500", // Silver
              "from-orange-400 to-orange-600", // Bronze
            ];

            // Soft gradient palette for all users
            const cardColors = [
              "from-pink-100 to-pink-200",
              "from-indigo-100 to-indigo-200",
              "from-green-100 to-green-200",
              "from-blue-100 to-blue-200",
              "from-yellow-100 to-yellow-200",
              "from-purple-100 to-purple-200",
            ];

            const bgColor = isTop3
              ? "bg-gradient-to-br " + badgeColors[idx] + " text-white"
              : "bg-gradient-to-br " + cardColors[idx % cardColors.length];

            return (
              <div
                key={u.id}
                className={`relative p-5 rounded-2xl shadow-md border hover:shadow-2xl hover:-translate-y-2 hover:scale-105 transition-all duration-300 backdrop-blur-sm ${bgColor}`}
              >
                {/* Glow for top 3 */}
                {isTop3 && (
                  <div className="absolute inset-0 rounded-2xl animate-pulse bg-gradient-to-r from-yellow-400 to-orange-400 opacity-30"></div>
                )}

                {/* Header */}
                <div className="relative flex items-center gap-3 mb-4">
                  <div
                    className={`h-12 w-12 flex items-center justify-center rounded-full font-bold shadow-md
              ${
                isTop3 ? "bg-white/20 text-white" : "bg-white/60 text-gray-800"
              }`}
                  >
                    {u.name.charAt(0)}
                  </div>
                  <div>
                    <div
                      className={`font-semibold ${
                        isTop3 ? "text-white" : "text-gray-800"
                      }`}
                    >
                      {u.name}
                    </div>
                    <div
                      className={`text-xs ${
                        isTop3 ? "text-white/80" : "text-gray-600"
                      }`}
                    >
                      Rank #{idx + 1}
                    </div>
                  </div>
                  {isTop3 && (
                    <span className="ml-auto text-2xl">
                      {idx === 0 ? "👑" : idx === 1 ? "🥈" : "🥉"}
                    </span>
                  )}
                </div>

                {/* Stats with progress bars */}
                <div className="relative text-sm space-y-3">
                  {/* Bets */}
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span
                        className={isTop3 ? "text-white/90" : "text-gray-700"}
                      >
                        Bets
                      </span>
                      <span
                        className={`font-medium ${
                          isTop3 ? "text-white" : "text-indigo-700"
                        }`}
                      >
                        {u.totalBets}
                      </span>
                    </div>
                    <div className="h-2 w-full bg-white/20 rounded-full">
                      <div
                        className={`h-2 rounded-full ${
                          isTop3 ? "bg-white" : "bg-indigo-600"
                        }`}
                        style={{
                          width: `${Math.min(
                            (u.totalBets / 5000) * 100,
                            100
                          )}%`,
                        }}
                      ></div>
                    </div>
                  </div>

                  {/* Winnings */}
                  <div>
                    <div className="flex justify-between text-xs mb-1 mt-2">
                      <span
                        className={isTop3 ? "text-white/90" : "text-gray-700"}
                      >
                        Winnings
                      </span>
                      <span
                        className={`font-medium ${
                          isTop3 ? "text-white" : "text-green-700"
                        }`}
                      >
                        {u.totalWinnings}
                      </span>
                    </div>
                    <div className="h-2 w-full bg-white/20 rounded-full">
                      <div
                        className={`h-2 rounded-full ${
                          isTop3 ? "bg-white" : "bg-green-600"
                        }`}
                        style={{
                          width: `${Math.min(
                            (u.totalWinnings / 5000) * 100,
                            100
                          )}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </SectionCard>

      {/* Transactions */}
   <SectionCard
  title="💳 Transactions"
  exportFn={() => exportCSV(mockTransactions, "monthly-transactions.csv")}
>
  <div className="overflow-x-auto">
    <table className="min-w-full border-separate border-spacing-0">
      <thead className="bg-indigo-50 sticky top-0 z-10">
        <tr>
          {["ID", "User", "Type", "Mode", "Amount", "Status", "Date"].map((header) => (
            <th
              key={header}
              className="py-3 px-4 text-left text-indigo-700 font-semibold uppercase tracking-wider"
            >
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {mockTransactions.map((t, idx) => (
          <tr
            key={t.id}
            className={`transition-all duration-300 ${
              idx % 2 === 0 ? "bg-white" : "bg-gray-50"
            } hover:shadow-lg hover:scale-[1.00] rounded-lg`}
          >
            <td className="py-3 px-4 font-mono">{t.id}</td>
            <td className="py-3 px-4 font-medium">{t.user}</td>
            <td
              className={`py-3 px-4 font-semibold ${
                t.type === "Deposit" ? "text-green-700" : "text-red-600"
              }`}
            >
              {t.type}
            </td>
            <td className="py-3 px-4">{t.mode}</td>
            <td className="py-3 px-4">
              <div className="flex items-center gap-2">
                <span
                  className={`font-semibold ${
                    t.type === "Deposit" ? "text-green-700" : "text-red-600"
                  }`}
                >
                  ₹{t.amount}
                </span>
                <div className="flex-1 bg-gray-100 rounded-full h-2 overflow-hidden">
                  <div
                    className={`h-2 rounded-full transition-all duration-700 ${
                      t.type === "Deposit" ? "bg-green-500" : "bg-red-500"
                    }`}
                    style={{ width: `${Math.min((t.amount / 10000) * 100, 100)}%` }}
                  ></div>
                </div>
              </div>
            </td>
            <td className="py-3 px-4">
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  t.status === "Success"
                    ? "bg-gradient-to-r from-green-200 to-green-400 text-green-800"
                    : "bg-gradient-to-r from-yellow-200 to-yellow-400 text-yellow-800"
                }`}
              >
                {t.status}
              </span>
            </td>
            <td className="py-3 px-4">{t.date}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</SectionCard>




      {/* Insights */}
<SectionCard title="💡 Insights">
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4">
    <InsightCard icon="💰" text="Highest profit day: 2025-09-15" />
    <InsightCard icon="🎮" text="Most played game: Ludo" />
    <InsightCard icon="🏆" text="Top winning user: Sonali" />
    <InsightCard icon="😞" text="Top losing user: Rahul" />
    <InsightCard icon="📈" text="Deposits exceeded withdrawals by ₹83,000" />
  </div>
</SectionCard>
    </div>
  );
}
{/* InsightCard Component */}
const InsightCard = ({ icon, text }) => {
  return (
    <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-indigo-50 to-indigo-100 rounded-xl shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300">
      <div className="text-2xl">{icon}</div>
      <div className="text-gray-800 font-medium">{text}</div>
    </div>
  );
};
// ------------------ REUSABLE COMPONENTS ------------------ //
function Card({ title, value, accent, icon: Icon }) {
  return (
    <div
      className={`p-5 rounded-xl shadow-md transition-all hover:scale-[1.02] ${
        accent
          ? "bg-gradient-to-r from-indigo-600 to-violet-500 text-white"
          : "bg-white"
      }`}
    >
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm opacity-75">{title}</div>
          <div className="mt-1 text-2xl font-bold">{value}</div>
        </div>
        {Icon && <Icon className="w-8 h-8 opacity-80" />}
      </div>
    </div>
  );
}

function ChartCard({ title, children }) {
  return (
    <div className="bg-white p-5 rounded-xl shadow h-[320px] flex flex-col mb-10">
      <h3 className="text-lg font-semibold mb-3">{title}</h3>
      <div className="flex-1">{children}</div>
    </div>
  );
}

function SectionCard({ title, children, exportFn }) {
  return (
    <div className="bg-white p-5 rounded-xl shadow mb-10">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">{title}</h2>
        {exportFn && (
          <button
            onClick={exportFn}
            className="px-3 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
          >
            Export CSV
          </button>
        )}
      </div>
      {children}
    </div>
  );
}

function Insight({ text }) {
  return (
    <div className="p-3 bg-indigo-50 rounded-md text-gray-700 shadow-sm">
      {text}
    </div>
  );
}
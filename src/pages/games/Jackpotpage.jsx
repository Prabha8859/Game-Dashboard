import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend,
} from "recharts";
import { Users, Award, TrendingDown, Activity } from "lucide-react";

// --- Mock Data ---
const monthlyActive = [
  { month: "JAN", value: 520 },
  { month: "FEB", value: 610 },
  { month: "MAR", value: 580 },
  { month: "APR", value: 1040 },
  { month: "MAY", value: 1180 },
  { month: "JUN", value: 1120 },
  { month: "JUL", value: 1500 },
  { month: "AUG", value: 1700 },
  { month: "SEP", value: 1600 },
  { month: "OCT", value: 2000 },
  { month: "NOV", value: 1870 },
  { month: "DEC", value: 2350 },
];

const winLossMonthly = [
  { month: "JAN", win: 60, loss: 40 },
  { month: "FEB", win: 90, loss: 55 },
  { month: "MAR", win: 85, loss: 50 },
  { month: "APR", win: 95, loss: 45 },
  { month: "MAY", win: 130, loss: 60 },
  { month: "JUN", win: 120, loss: 70 },
  { month: "JUL", win: 155, loss: 65 },
  { month: "AUG", win: 110, loss: 75 },
  { month: "SEP", win: 135, loss: 60 },
  { month: "OCT", win: 120, loss: 70 },
  { month: "NOV", win: 125, loss: 65 },
  { month: "DEC", win: 140, loss: 75 },
];

const topPlayers = [
  { name: "James", score: 480 },
  { name: "Mary", score: 420 },
  { name: "William", score: 360 },
  { name: "Emma", score: 260 },
];

// --- Dashboard Component ---
const Jackpotpage = () => {
  return (
    <div className="min-h-screen w-full bg-gray-50 text-gray-900">
      <div className="mx-auto max-w-7xl px-3 sm:px-4 md:px-6 py-6 md:py-8">
        {/* Title */}
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-center md:text-left text-gray-800">
          Jackpot Game Dashboard
        </h1>

        {/* Top Stats */}
        <div className="mt-6 grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          <StatBox
            title="Total Games Played"
            value="1245"
            icon={<Users className="h-5 w-5" />}
            gradient="linear-gradient(to top, #a8edea 0%, #fed6e3 100%)"
          />

          <StatBox
            title="Total Wins"
            value="768"
            icon={<Award className="h-5 w-5" />}
            gradient="linear-gradient(to top, #fad0c4 0%, #ffd1ff 100%)"
          />

          <StatBox
            title="Total Losses"
            value="477"
            icon={<TrendingDown className="h-5 w-5" />}
            gradient="linear-gradient(to top, #d299c2 0%, #fef9d7 100%)"
          />

          <StatBox
            title="Active Players"
            value="342"
            icon={<Activity className="h-5 w-5" />}
            gradient="linear-gradient(to top, #a8edea 0%, #fed6e3 100%)"
          />
        </div>

        {/* Monthly Active Players */}
        <Card className="mt-6">
          <CardTitle>Monthly Active Players Growth</CardTitle>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyActive}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#6b7280" }} />
                <YAxis tick={{ fontSize: 12, fill: "#6b7280" }} />
                <Tooltip
                  cursor={{ strokeDasharray: "3 3" }}
                  contentStyle={{
                    borderRadius: "12px",
                    border: "1px solid #e5e7eb",
                    background: "#fff",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#3b82f6"
                  strokeWidth={3}
                  dot={{ r: 4, fill: "#3b82f6" }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Win/Loss & Top Players */}
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardTitle>Win / Loss Overview</CardTitle>
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={winLossMonthly}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#6b7280" }} />
                  <YAxis tick={{ fontSize: 12, fill: "#6b7280" }} />
                  <Tooltip
                    contentStyle={{
                      borderRadius: "12px",
                      border: "1px solid #e5e7eb",
                      background: "#fff",
                    }}
                  />
                  <Legend />
                  <Line type="monotone" dataKey="win" stroke="#16a34a" strokeWidth={3} />
                  <Line type="monotone" dataKey="loss" stroke="#dc2626" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card>
            <CardTitle>Top Players (Scores)</CardTitle>
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={topPlayers}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="name" tick={{ fontSize: 12, fill: "#6b7280" }} />
                  <YAxis tick={{ fontSize: 12, fill: "#6b7280" }} />
                  <Tooltip
                    contentStyle={{
                      borderRadius: "12px",
                      border: "1px solid #e5e7eb",
                      background: "#fff",
                    }}
                  />
                  <Bar dataKey="score" fill="#6366f1" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

// --- Sub Components ---
function StatBox({ title, value, icon, gradient }) {
  return (
    <div
      className="relative p-5 rounded-2xl text-white shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer overflow-hidden"
      style={{ backgroundImage: gradient }}
    >
      <div className="flex items-center justify-between">
        <div className="p-3 bg-white/20 rounded-full">{icon}</div>
        <span className="text-2xl font-bold">{value}</span>
      </div>
      <p className="mt-3 text-sm opacity-90">{title}</p>

      {/* Shine effect */}
      <div className="absolute inset-0 rounded-2xl pointer-events-none">
        <div className="absolute inset-0 bg-white opacity-10 transform -skew-y-12 -translate-x-full hover:translate-x-full transition duration-700 ease-in-out"></div>
      </div>
    </div>
  );
}

function Card({ children, className = "" }) {
  return (
    <div
      className={`rounded-2xl bg-white p-4 shadow-md ring-1 ring-gray-100 hover:shadow-lg transition ${className}`}
    >
      {children}
    </div>
  );
}

function CardTitle({ children }) {
  return (
    <div className="mb-3 text-sm sm:text-base font-semibold tracking-wide text-gray-600">
      {children}
    </div>
  );
}

export default Jackpotpage;

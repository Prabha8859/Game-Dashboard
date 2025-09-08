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
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { 
  Users, 
  Award, 
  TrendingDown, 
  Activity,
  DollarSign,
  Target,
  Clock,
  Wallet,
  TrendingUp,
  Star
} from "lucide-react";

// --- Enhanced Mock Data ---
const monthlyActive = [
  { month: "JAN", value: 520, revenue: 25000, bets: 2800 },
  { month: "FEB", value: 610, revenue: 31000, bets: 3400 },
  { month: "MAR", value: 580, revenue: 29500, bets: 3200 },
  { month: "APR", value: 1040, revenue: 52000, bets: 5600 },
  { month: "MAY", value: 1180, revenue: 61000, bets: 6400 },
  { month: "JUN", value: 1120, revenue: 58000, bets: 6200 },
  { month: "JUL", value: 1500, revenue: 78000, bets: 8200 },
  { month: "AUG", value: 1700, revenue: 89000, bets: 9400 },
  { month: "SEP", value: 1600, revenue: 84000, bets: 8800 },
  { month: "OCT", value: 2000, revenue: 105000, bets: 11000 },
  { month: "NOV", value: 1870, revenue: 98000, bets: 10300 },
  { month: "DEC", value: 2350, revenue: 125000, bets: 13200 },
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
  { name: "James", score: 480, totalBets: 245 },
  { name: "Mary", score: 420, totalBets: 198 },
  { name: "William", score: 360, totalBets: 156 },
  { name: "Emma", score: 260, totalBets: 134 },
  { name: "Oliver", score: 220, totalBets: 112 },
];

const jackpotStatus = [
  { name: "Completed", value: 156, color: "#22c55e" },
  { name: "Active", value: 8, color: "#3b82f6" },
  { name: "Pending", value: 3, color: "#f59e0b" },
];

const revenueData = [
  { month: "JAN", revenue: 25000, withdrawals: 18000, profit: 7000 },
  { month: "FEB", revenue: 31000, withdrawals: 22000, profit: 9000 },
  { month: "MAR", revenue: 29500, withdrawals: 21000, profit: 8500 },
  { month: "APR", revenue: 52000, withdrawals: 38000, profit: 14000 },
  { month: "MAY", revenue: 61000, withdrawals: 44000, profit: 17000 },
  { month: "JUN", revenue: 58000, withdrawals: 42000, profit: 16000 },
];

// --- Enhanced Dashboard Component ---
const Jackpotpage = () => {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatNumber = (num) => {
    return new Intl.NumberFormat('en-IN').format(num);
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
      <div className="mx-auto max-w-7xl px-3 sm:px-4 md:px-6 py-6 md:py-8">
        {/* Enhanced Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
            🎰 Jackpot Game Dashboard
          </h1>
          <p className="text-gray-600 text-sm md:text-base">
            Real-time analytics and performance metrics
          </p>
        </div>

        {/* Enhanced Top Stats - 6 Cards in 2 rows */}
        <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mb-8">
          <StatBox
            title="Total Players"
            value={formatNumber(2350)}
            icon={<Users className="h-6 w-6" />}
            gradient="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
            trend="+12.5%"
            trendUp={true}
          />

          <StatBox
            title="Total Bets Placed"
            value={formatNumber(89650)}
            icon={<Target className="h-6 w-6" />}
            gradient="linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
            trend="+8.3%"
            trendUp={true}
          />

          <StatBox
            title="Completed Jackpots"
            value={`${formatNumber(156)} / ${formatNumber(167)}`}
            icon={<Award className="h-6 w-6" />}
            gradient="linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)"
            trend="93.4%"
            trendUp={true}
          />

          <StatBox
            title="Total Revenue"
            value={formatCurrency(856000)}
            icon={<DollarSign className="h-6 w-6" />}
            gradient="linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)"
            trend="+15.2%"
            trendUp={true}
          />

          <StatBox
            title="Pending Withdrawals"
            value={formatCurrency(124500)}
            icon={<Clock className="h-6 w-6" />}
            gradient="linear-gradient(135deg, #fa709a 0%, #fee140 100%)"
            trend="-5.8%"
            trendUp={false}
          />

          <StatBox
            title="Current Pool Balance"
            value={formatCurrency(425000)}
            icon={<Wallet className="h-6 w-6" />}
            gradient="linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)"
            trend="+22.1%"
            trendUp={true}
          />
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
          {/* Monthly Growth */}
          <Card className="xl:col-span-2">
            <CardTitle>📈 Monthly Growth Trends</CardTitle>
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthlyActive}>
                  <defs>
                    <linearGradient id="colorPlayers" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis 
                    dataKey="month" 
                    tick={{ fontSize: 12, fill: "#6b7280" }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis 
                    tick={{ fontSize: 12, fill: "#6b7280" }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip
                    cursor={{ strokeDasharray: "3 3" }}
                    contentStyle={{
                      borderRadius: "16px",
                      border: "none",
                      background: "rgba(255, 255, 255, 0.95)",
                      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
                    }}
                  />
                  <Legend />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="#3b82f6"
                    strokeWidth={3}
                    fill="url(#colorPlayers)"
                    name="Active Players"
                  />
                  <Area
                    type="monotone"
                    dataKey="revenue"
                    stroke="#10b981"
                    strokeWidth={3}
                    fill="url(#colorRevenue)"
                    name="Revenue (₹)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Jackpot Status Pie Chart */}
          <Card>
            <CardTitle>🎯 Jackpot Status</CardTitle>
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={jackpotStatus}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {jackpotStatus.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      borderRadius: "12px",
                      border: "none",
                      background: "rgba(255, 255, 255, 0.95)",
                      boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
                    }}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>

        {/* Win/Loss & Top Players */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardTitle>⚡ Win / Loss Trends</CardTitle>
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={winLossMonthly}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis 
                    dataKey="month" 
                    tick={{ fontSize: 12, fill: "#6b7280" }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis 
                    tick={{ fontSize: 12, fill: "#6b7280" }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip
                    contentStyle={{
                      borderRadius: "12px",
                      border: "none",
                      background: "rgba(255, 255, 255, 0.95)",
                      boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
                    }}
                  />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="win" 
                    stroke="#16a34a" 
                    strokeWidth={3}
                    dot={{ r: 5, fill: "#16a34a" }}
                    activeDot={{ r: 7, stroke: "#16a34a", strokeWidth: 2 }}
                    name="Wins"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="loss" 
                    stroke="#dc2626" 
                    strokeWidth={3}
                    dot={{ r: 5, fill: "#dc2626" }}
                    activeDot={{ r: 7, stroke: "#dc2626", strokeWidth: 2 }}
                    name="Losses"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card>
            <CardTitle>🏆 Top Players Leaderboard</CardTitle>
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={topPlayers} layout="horizontal">
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis 
                    type="number"
                    tick={{ fontSize: 12, fill: "#6b7280" }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis 
                    dataKey="name" 
                    type="category"
                    tick={{ fontSize: 12, fill: "#6b7280" }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip
                    contentStyle={{
                      borderRadius: "12px",
                      border: "none",
                      background: "rgba(255, 255, 255, 0.95)",
                      boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
                    }}
                  />
                  <Bar 
                    dataKey="score" 
                    fill="url(#barGradient)"
                    radius={[0, 8, 8, 0]}
                    name="Score"
                  />
                  <defs>
                    <linearGradient id="barGradient" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#6366f1" />
                      <stop offset="100%" stopColor="#8b5cf6" />
                    </linearGradient>
                  </defs>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>

        {/* Revenue Analytics */}
        <Card>
          <CardTitle>💰 Revenue & Withdrawals Analysis</CardTitle>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="colorRevenueFull" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorWithdrawals" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis 
                  dataKey="month" 
                  tick={{ fontSize: 12, fill: "#6b7280" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis 
                  tick={{ fontSize: 12, fill: "#6b7280" }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  formatter={(value) => [formatCurrency(value), ""]}
                  contentStyle={{
                    borderRadius: "16px",
                    border: "none",
                    background: "rgba(255, 255, 255, 0.95)",
                    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
                  }}
                />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stackId="1"
                  stroke="#10b981"
                  fill="url(#colorRevenueFull)"
                  strokeWidth={2}
                  name="Revenue"
                />
                <Area
                  type="monotone"
                  dataKey="withdrawals"
                  stackId="2"
                  stroke="#f59e0b"
                  fill="url(#colorWithdrawals)"
                  strokeWidth={2}
                  name="Withdrawals"
                />
                <Area
                  type="monotone"
                  dataKey="profit"
                  stackId="3"
                  stroke="#3b82f6"
                  fill="url(#colorProfit)"
                  strokeWidth={2}
                  name="Net Profit"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  );
};

// --- Enhanced Sub Components ---
function StatBox({ title, value, icon, gradient, trend, trendUp }) {
  return (
    <div
      className="relative p-6 rounded-3xl text-white shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer overflow-hidden group"
      style={{ backgroundImage: gradient }}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="p-3 bg-white/20 rounded-2xl group-hover:bg-white/30 transition-colors duration-300">
          {icon}
        </div>
        <div className="flex items-center space-x-2">
          {trend && (
            <>
              {trendUp ? (
                <TrendingUp className="h-4 w-4 text-white/80" />
              ) : (
                <TrendingDown className="h-4 w-4 text-white/80" />
              )}
              <span className="text-sm font-semibold">{trend}</span>
            </>
          )}
        </div>
      </div>
      
      <div className="space-y-2">
        <span className="text-2xl md:text-3xl font-bold block">{value}</span>
        <p className="text-sm opacity-90 font-medium">{title}</p>
      </div>

      {/* Enhanced shine effect */}
      <div className="absolute inset-0 rounded-3xl pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 transform -skew-y-12 -translate-x-full group-hover:translate-x-full group-hover:opacity-20 transition duration-1000 ease-in-out"></div>
      </div>

      {/* Decorative elements */}
      <div className="absolute -top-4 -right-4 w-24 h-24 bg-white/10 rounded-full opacity-20"></div>
      <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-white/5 rounded-full opacity-30"></div>
    </div>
  );
}

function Card({ children, className = "" }) {
  return (
    <div
      className={`rounded-3xl bg-white/80 backdrop-blur-sm p-6 shadow-xl ring-1 ring-gray-100/50 hover:shadow-2xl transition-all duration-300 border border-white/20 ${className}`}
    >
      {children}
    </div>
  );
}

function CardTitle({ children }) {
  return (
    <div className="mb-6 text-lg font-bold tracking-wide bg-gradient-to-r from-gray-700 to-gray-600 bg-clip-text text-transparent flex items-center space-x-2">
      <span>{children}</span>
    </div>
  );
}

export default Jackpotpage;
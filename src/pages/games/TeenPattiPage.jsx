import React, { useState, useEffect } from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  BarChart,
  Bar,
  Tooltip,
  CartesianGrid,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import {
  Users,
  DollarSign,
  AlertTriangle,
  Play,
  TrendingUp,
  Trophy,
  Activity,
  Target,
  Clock,
  Star,
  Gamepad2,
  Crown,
} from "lucide-react";

// ---- CORE DATA ----
const statsCards = [
  {
    title: "Active Players",
    value: 342,
    icon: Users,
    gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    borderColor: "#667eea",
    trend: "+12%",
    trendUp: true,
  },
  {
    title: "Live Tables",
    value: 28,
    icon: Play,
    gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    borderColor: "#f093fb",
    trend: "+5",
    trendUp: true,
  },
  {
    title: "Today's Bets",
    value: "₹2,34,500",
    icon: Target,
    gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    borderColor: "#4facfe",
    trend: "+18.5%",
    trendUp: true,
  },
  {
    title: "Commission Earned",
    value: "₹23,450",
    icon: DollarSign,
    gradient: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
    borderColor: "#43e97b",
    trend: "+₹3,200",
    trendUp: true,
  },
  {
    title: "Biggest Win Today",
    value: "₹45,000",
    icon: Crown,
    gradient: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
    borderColor: "#fa709a",
    trend: "RajKing99",
    trendUp: true,
  },
  {
    title: "Total Revenue",
    value: "₹5,20,000",
    icon: TrendingUp,
    gradient: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
    borderColor: "#a8edea",
    trend: "+15.2%",
    trendUp: true,
  },
];

const activeTables = [
  { id: "T001", players: 4, maxPlayers: 6, minBet: 100, maxBet: 5000, status: "Active", pot: 2400 },
  { id: "T002", players: 6, maxPlayers: 6, minBet: 500, maxBet: 10000, status: "Full", pot: 8500 },
  { id: "T003", players: 3, maxPlayers: 6, minBet: 50, maxBet: 1000, status: "Waiting", pot: 450 },
  { id: "T004", players: 5, maxPlayers: 6, minBet: 1000, maxBet: 50000, status: "Active", pot: 25000 },
  { id: "T005", players: 2, maxPlayers: 6, minBet: 200, maxBet: 2000, status: "Waiting", pot: 800 },
];

const recentRounds = [
  {
    id: "R001",
    tableId: "T002",
    winner: "RajKing99",
    winAmount: 45000,
    handType: "Trail (AAA)",
    duration: "3:45",
    commission: 4500,
    timestamp: "2 mins ago"
  },
  {
    id: "R002",
    tableId: "T001",
    winner: "PokerPro",
    winAmount: 12500,
    handType: "Pure Sequence",
    duration: "2:30",
    commission: 1250,
    timestamp: "5 mins ago"
  },
  {
    id: "R003",
    tableId: "T004",
    winner: "TeenPattiGod",
    winAmount: 32000,
    handType: "Color",
    duration: "4:12",
    commission: 3200,
    timestamp: "8 mins ago"
  },
];

const monthlyData = [
  { month: "Jan", players: 150, revenue: 45000, commission: 4500 },
  { month: "Feb", players: 180, revenue: 52000, commission: 5200 },
  { month: "Mar", players: 220, revenue: 68000, commission: 6800 },
  { month: "Apr", players: 280, revenue: 84000, commission: 8400 },
  { month: "May", players: 300, revenue: 92000, commission: 9200 },
  { month: "Jun", players: 320, revenue: 98000, commission: 9800 },
];

const topPlayers = [
  { id: 1, name: "RajKing99", wins: 150, losses: 30, winnings: 245000 },
  { id: 2, name: "PokerPro", wins: 130, losses: 50, winnings: 198000 },
  { id: 3, name: "TeenPattiGod", wins: 120, losses: 40, winnings: 175000 },
  { id: 4, name: "LuckyAce", wins: 115, losses: 60, winnings: 162000 },
];

const handTypeStats = [
  { name: "High Card", value: 45, color: "#8884d8" },
  { name: "Pair", value: 25, color: "#82ca9d" },
  { name: "Color", value: 15, color: "#ffc658" },
  { name: "Sequence", value: 10, color: "#ff7c7c" },
  { name: "Pure Sequence", value: 4, color: "#8dd1e1" },
  { name: "Trail", value: 1, color: "#d084d0" },
];

const fraudAlerts = [
  { id: 1, user: "SuspiciousPlayer1", issue: "Multiple Accounts", level: "High", tableId: "T003" },
  { id: 2, user: "BigBettor99", issue: "Unusual Betting Pattern", level: "Medium", tableId: "T004" },
];

// ---- COMPONENTS ----
const StatCard = ({ title, value, icon: Icon, gradient, borderColor, trend, trendUp }) => (
  <div
    className="relative p-4 rounded-xl bg-white shadow-lg transform transition-all duration-300 hover:scale-105 cursor-pointer overflow-hidden group border-t-4"
    style={{ borderTopColor: borderColor }}
  >
    <div className="flex items-center justify-between mb-2">
      <div className="p-2 rounded-lg" style={{ backgroundColor: borderColor + '20' }}>
        <Icon className="w-5 h-5" style={{ color: borderColor }} />
      </div>
      {trend && (
        <div className="flex items-center space-x-1" style={{ color: borderColor }}>
          {trendUp && <TrendingUp className="h-3 w-3" />}
          <span className="text-xs font-semibold">{trend}</span>
        </div>
      )}
    </div>
    
    <div className="space-y-1">
      <span className="text-xl md:text-2xl font-bold block text-gray-800">{value}</span>
      <p className="text-xs text-gray-600">{title}</p>
    </div>

    <div className="absolute -top-2 -right-2 w-16 h-16 rounded-full opacity-10" style={{ backgroundColor: borderColor }}></div>
  </div>
);

const Card = ({ children, className = "", borderColor = "#3b82f6" }) => (
  <div className={`rounded-xl bg-white shadow-lg p-4 border-t-4 ${className}`} style={{ borderTopColor: borderColor }}>
    {children}
  </div>
);

const CardTitle = ({ children, icon: Icon, color = "#3b82f6" }) => (
  <div className="mb-4 text-lg font-bold text-gray-700 flex items-center space-x-2">
    {Icon && <Icon className="w-5 h-5" style={{ color }} />}
    <span>{children}</span>
  </div>
);

const TeenPattiDashboard = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 30000);
    return () => clearInterval(timer);
  }, []);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getTableStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'text-green-600 bg-green-100';
      case 'Full': return 'text-blue-600 bg-blue-100';
      case 'Waiting': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getHandTypeColor = (handType) => {
    const colors = {
      'Trail (AAA)': 'text-purple-600 bg-purple-100',
      'Pure Sequence': 'text-blue-600 bg-blue-100',
      'Color': 'text-green-600 bg-green-100',
      'Sequence': 'text-orange-600 bg-orange-100',
      'Pair': 'text-red-600 bg-red-100',
    };
    return colors[handType] || 'text-gray-600 bg-gray-100';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="mx-auto max-w-7xl p-4">
        
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
            🃏 Teen Patti Admin Dashboard
          </h1>
          <p className="text-gray-600 text-sm">
            Live Gaming Analytics • {currentTime.toLocaleString()}
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-6">
          {statsCards.map((stat, idx) => (
            <StatCard key={idx} {...stat} />
          ))}
        </div>

        {/* Live Tables */}
        <Card className="mb-6" borderColor="#10b981">
          <CardTitle icon={Gamepad2} color="#10b981">Live Tables Status</CardTitle>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="py-2 px-2 text-left font-semibold text-gray-700">Table</th>
                  <th className="py-2 px-2 text-left font-semibold text-gray-700">Players</th>
                  <th className="py-2 px-2 text-left font-semibold text-gray-700">Status</th>
                  <th className="py-2 px-2 text-left font-semibold text-gray-700">Pot</th>
                </tr>
              </thead>
              <tbody>
                {activeTables.map((table) => (
                  <tr key={table.id} className="border-b border-gray-50 hover:bg-gray-50">
                    <td className="py-2 px-2 font-mono text-blue-600">{table.id}</td>
                    <td className="py-2 px-2">{table.players}/{table.maxPlayers}</td>
                    <td className="py-2 px-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getTableStatusColor(table.status)}`}>
                        {table.status}
                      </span>
                    </td>
                    <td className="py-2 px-2 font-bold text-green-600">
                      {formatCurrency(table.pot)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Recent Rounds */}
        <Card className="mb-6" borderColor="#f59e0b">
          <CardTitle icon={Clock} color="#f59e0b">Recent Game Results</CardTitle>
          <div className="space-y-3 max-h-60 overflow-y-auto">
            {recentRounds.map((round, index) => (
              <div key={round.id} className="flex items-center justify-between p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                    {index + 1}
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-gray-800">{round.winner}</span>
                      <span className="font-bold text-green-600">{formatCurrency(round.winAmount)}</span>
                    </div>
                    <div className="flex items-center space-x-3 text-xs text-gray-600">
                      <span>{round.tableId}</span>
                      <span className={`px-2 py-1 rounded-full font-semibold ${getHandTypeColor(round.handType)}`}>
                        {round.handType}
                      </span>
                      <span>{round.timestamp}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          
          {/* Players Growth */}
          <Card borderColor="#8b5cf6">
            <CardTitle icon={Activity} color="#8b5cf6">Monthly Player Growth</CardTitle>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={monthlyData}>
                  <defs>
                    <linearGradient id="playerGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="players"
                    stroke="#8b5cf6"
                    strokeWidth={3}
                    fill="url(#playerGradient)"
                    dot={{ r: 4 }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Hand Types */}
          <Card borderColor="#f97316">
            <CardTitle icon={Star} color="#f97316">Hand Types Distribution</CardTitle>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={handTypeStats}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={100}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {handTypeStats.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value}%`, 'Frequency']} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>

        {/* Revenue & Top Players */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          
          {/* Revenue Chart */}
          <Card borderColor="#06b6d4">
            <CardTitle icon={DollarSign} color="#06b6d4">Revenue & Commission</CardTitle>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                  <Tooltip formatter={(value) => [formatCurrency(value)]} />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="#10b981" 
                    strokeWidth={3}
                    dot={{ r: 4 }}
                    name="Revenue"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="commission" 
                    stroke="#06b6d4" 
                    strokeWidth={3}
                    dot={{ r: 4 }}
                    name="Commission"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Top Players */}
          <Card borderColor="#ec4899">
            <CardTitle icon={Crown} color="#ec4899">Top Players Leaderboard</CardTitle>
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {topPlayers.map((player, index) => (
                <div key={player.id} className="flex items-center justify-between p-3 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold ${
                      index === 0 ? 'bg-gradient-to-br from-yellow-400 to-yellow-600' :
                      index === 1 ? 'bg-gradient-to-br from-gray-300 to-gray-500' :
                      index === 2 ? 'bg-gradient-to-br from-orange-400 to-orange-600' :
                      'bg-gradient-to-br from-blue-400 to-blue-600'
                    }`}>
                      {index + 1}
                    </div>
                    <div>
                      <div className="font-bold text-gray-800">{player.name}</div>
                      <div className="text-sm text-gray-600">
                        {player.wins}W - {player.losses}L
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-green-600 text-sm">{formatCurrency(player.winnings)}</div>
                    <div className="text-xs text-gray-500">
                      {((player.wins / (player.wins + player.losses)) * 100).toFixed(1)}% win
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Fraud Alerts */}
        <Card className="mb-6" borderColor="#ef4444">
          <CardTitle icon={AlertTriangle} color="#ef4444">Security Alerts</CardTitle>
          <div className="space-y-3">
            {fraudAlerts.map((alert) => (
              <div key={alert.id} className="flex items-center justify-between p-3 bg-gradient-to-r from-red-50 to-orange-50 rounded-lg border border-red-200">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${
                    alert.level === 'High' ? 'bg-red-500' : 'bg-yellow-500'
                  }`}></div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-gray-800">{alert.user}</span>
                      <span className="font-mono text-sm text-blue-600">{alert.tableId}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-600">{alert.issue}</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        alert.level === 'High' ? 'text-red-700 bg-red-200' : 'text-yellow-700 bg-yellow-200'
                      }`}>
                        {alert.level}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700 transition-colors">
                    Suspend
                  </button>
                  <button className="px-3 py-1 bg-yellow-600 text-white rounded text-sm hover:bg-yellow-700 transition-colors">
                    Monitor
                  </button>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Quick Actions Footer */}
        <div className="p-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl text-white">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-3 md:space-y-0">
            <div>
              <h3 className="text-lg font-bold">Quick Actions</h3>
              <p className="text-blue-100 text-sm">Manage your Teen Patti platform</p>
            </div>
            <div className="flex space-x-3">
              <button className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg text-sm font-semibold transition-colors">
                Export Reports
              </button>
              <button className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg text-sm font-semibold transition-colors">
                Manage Tables
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeenPattiDashboard;
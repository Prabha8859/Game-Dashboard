import { User, Gamepad2, Users, Cpu, DollarSign, Trophy, Clock, TrendingUp, Shield } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area
} from "recharts";

const EnhancedLudoDashboard = () => {
  // Revenue data with more detailed tracking
  const revenueData = [
    { day: "Mon", revenue: 15420, games: 240 },
    { day: "Tue", revenue: 18650, games: 310 },
    { day: "Wed", revenue: 22400, games: 380 },
    { day: "Thu", revenue: 19800, games: 290 },
    { day: "Fri", revenue: 28500, games: 450 },
    { day: "Sat", revenue: 32100, games: 520 },
    { day: "Sun", revenue: 35600, games: 580 },
  ];

  // Game mode popularity
  const gameModeData = [
    { mode: "Classic 4P", users: 45, color: "#3b82f6" },
    { mode: "Quick Play", users: 30, color: "#10b981" },
    { mode: "Tournament", users: 15, color: "#f59e0b" },
    { mode: "Private Room", users: 10, color: "#8b5cf6" },
  ];

  const mainCards = [
    { 
      title: "Live Games", 
      value: "847", 
      change: "+12%",
      icon: <Gamepad2 />, 
      color: "from-blue-500 to-indigo-600",
      subtitle: "32 tournaments active"
    },
    { 
      title: "Online Players", 
      value: "2,340", 
      change: "+8%",
      icon: <Users />, 
      color: "from-green-500 to-emerald-600",
      subtitle: "Peak: 2,890 today"
    },
    { 
      title: "Smart Bots", 
      value: "156", 
      change: "+5%",
      icon: <Cpu />, 
      color: "from-purple-500 to-pink-600",
      subtitle: "AI difficulty: Mixed"
    },
    { 
      title: "Today's Revenue", 
      value: "₹1,24,580", 
      change: "+18%",
      icon: <DollarSign />, 
      color: "from-yellow-400 to-orange-500",
      subtitle: "Target: 85% achieved"
    },
  ];

  const gameMetrics = [
    { title: "Avg Game Duration", value: "12.5 min", icon: <Clock />, color: "text-blue-600" },
    { title: "Win Rate vs Bots", value: "68%", icon: <Trophy />, color: "text-green-600" },
    { title: "Player Retention", value: "74%", icon: <TrendingUp />, color: "text-purple-600" },
    { title: "Fair Play Score", value: "9.2/10", icon: <Shield />, color: "text-indigo-600" },
  ];

  const recentMatches = [
    { id: "LUDO1245", players: ["Arjun", "Priya", "Bot_Easy", "Rahul"], winner: "Arjun", stake: "₹100", duration: "14:30", status: "Completed" },
    { id: "LUDO1246", players: ["Sneha", "Vikash", "Bot_Hard", "Meera"], winner: "Bot_Hard", stake: "₹50", duration: "18:45", status: "Completed" },
    { id: "LUDO1247", players: ["Rohit", "Anjali", "Karan", "Sonal"], winner: "-", stake: "₹200", duration: "8:12", status: "Live" },
    { id: "LUDO1248", players: ["Dev", "Ritu", "Bot_Medium", "Amit"], winner: "-", stake: "₹150", duration: "-", status: "Starting" },
  ];

  const tournaments = [
    { name: "Sunday Special", participants: 128, prize: "₹50,000", status: "Live", progress: 75 },
    { name: "Quick Fire Championship", participants: 64, prize: "₹25,000", status: "Registration", progress: 45 },
    { name: "Pro League", participants: 256, prize: "₹1,00,000", status: "Starting Soon", progress: 90 },
  ];

  const transactions = [
    { user: "Player_Arjun", type: "Win", amount: "+₹450", game: "LUDO1240", time: "2 min ago", status: "Credited" },
    { user: "Player_Priya", type: "Entry", amount: "-₹100", game: "LUDO1246", time: "5 min ago", status: "Debited" },
    { user: "Player_Rohit", type: "Deposit", amount: "+₹2000", game: "Wallet", time: "12 min ago", status: "Success" },
    { user: "Player_Sneha", type: "Withdrawal", amount: "-₹800", game: "Bank", time: "18 min ago", status: "Processing" },
  ];

  return (
    <div className="flex flex-col w-full min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Enhanced Navbar */}
      <div className="flex items-center justify-between bg-white px-6 py-4 shadow-lg border-b-2 border-blue-100">
        <div className="flex items-center gap-4">
          <h4 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
            🎲 Ludo Gaming Hub
          </h4>
          <div className="flex items-center gap-2 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            Live Dashboard
          </div>
        </div>
        <div className="flex items-center gap-4 text-gray-700">
          <div className="flex items-center gap-2 cursor-pointer bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-4 py-2 rounded-lg hover:shadow-lg transition">
            <User className="w-5 h-5" />
            <div className="text-left">
              <span className="font-medium block">Admin Panel</span>
              <span className="text-xs text-blue-100">Platform Controller</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Dashboard Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
        {mainCards.map((card, i) => (
          <div
            key={i}
            className="p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group"
          >
            <div className={`absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r ${card.color}`}></div>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${card.color} text-white shadow-lg group-hover:scale-110 transition-transform`}>
                    {card.icon}
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-500 text-sm font-medium">{card.title}</p>
                    <h4 className="text-2xl font-bold text-gray-800">{card.value}</h4>
                  </div>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-400">{card.subtitle}</span>
                  <span className="text-green-600 font-semibold bg-green-50 px-2 py-1 rounded-full">{card.change}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Game Metrics Row */}
      <div className="px-6 mb-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {gameMetrics.map((metric, i) => (
            <div key={i} className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3">
                <div className={`${metric.color}`}>
                  {metric.icon}
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide">{metric.title}</p>
                  <p className="text-lg font-bold text-gray-800">{metric.value}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 px-6 mb-6">
        {/* Revenue Trend */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-6">
          <h5 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
            📈 Revenue & Games Trend
          </h5>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="day" stroke="#666" />
              <YAxis stroke="#666" />
              <Tooltip 
                contentStyle={{ 
                  background: 'white', 
                  border: '1px solid #e5e7eb', 
                  borderRadius: '12px',
                  boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
                }}
                formatter={(value, name) => [
                  name === 'revenue' ? `₹${value}` : value,
                  name === 'revenue' ? 'Revenue' : 'Games Played'
                ]}
              />
              <Line type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4 }} />
              <Line type="monotone" dataKey="games" stroke="#10b981" strokeWidth={2} dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Game Mode Distribution */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h5 className="font-bold text-gray-800 mb-4">🎮 Game Mode Popularity</h5>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={gameModeData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="users"
                label={({ users }) => `${users}%`}
              >
                {gameModeData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`${value}%`, 'Share']} />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 space-y-2">
            {gameModeData.map((mode, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full" style={{backgroundColor: mode.color}}></div>
                <span className="text-sm text-gray-600 flex-1">{mode.mode}</span>
                <span className="text-sm font-semibold">{mode.users}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tables Section */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 px-6 mb-6">
        {/* Recent Matches */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h5 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
            ⚡ Recent Matches
          </h5>
          <div className="space-y-3">
            {recentMatches.map((match, i) => (
              <div key={i} className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-sm font-semibold text-blue-600">{match.id}</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    match.status === "Completed" ? "bg-green-100 text-green-700" :
                    match.status === "Live" ? "bg-red-100 text-red-700" :
                    "bg-yellow-100 text-yellow-700"
                  }`}>
                    {match.status}
                  </span>
                </div>
                <div className="text-xs text-gray-600 space-y-1">
                  <p><span className="font-medium">Players:</span> {match.players.join(", ")}</p>
                  <div className="flex justify-between">
                    <span><span className="font-medium">Stake:</span> {match.stake}</span>
                    <span><span className="font-medium">Duration:</span> {match.duration}</span>
                  </div>
                  {match.winner !== "-" && (
                    <p><span className="font-medium text-green-600">Winner:</span> {match.winner}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Active Tournaments */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h5 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
            🏆 Active Tournaments
          </h5>
          <div className="space-y-4">
            {tournaments.map((tournament, i) => (
              <div key={i} className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <h6 className="font-semibold text-gray-800">{tournament.name}</h6>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    tournament.status === "Live" ? "bg-red-100 text-red-700" :
                    tournament.status === "Registration" ? "bg-blue-100 text-blue-700" :
                    "bg-yellow-100 text-yellow-700"
                  }`}>
                    {tournament.status}
                  </span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Participants: {tournament.participants}</span>
                    <span className="font-semibold text-green-600">{tournament.prize}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full transition-all duration-300"
                      style={{width: `${tournament.progress}%`}}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-500">{tournament.progress}% filled</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Live Transactions */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h5 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
            💰 Live Transactions
          </h5>
          <div className="space-y-3">
            {transactions.map((txn, i) => (
              <div key={i} className="p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-semibold text-gray-700">{txn.user}</span>
                  <span className="text-xs text-gray-500">{txn.time}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      txn.type === "Win" ? "bg-green-100 text-green-700" :
                      txn.type === "Entry" ? "bg-blue-100 text-blue-700" :
                      txn.type === "Deposit" ? "bg-purple-100 text-purple-700" :
                      "bg-orange-100 text-orange-700"
                    }`}>
                      {txn.type}
                    </span>
                    <span className="text-xs text-gray-600">{txn.game}</span>
                  </div>
                  <div className="text-right">
                    <p className={`font-bold text-sm ${
                      txn.amount.includes('+') ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {txn.amount}
                    </p>
                    <p className="text-xs text-gray-500">{txn.status}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnhancedLudoDashboard;
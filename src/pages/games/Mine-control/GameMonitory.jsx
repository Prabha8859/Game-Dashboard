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
  FileText,
  Settings,
  Activity,
  AlertTriangle,
  DollarSign,
  Calendar,
  Shield,
  Zap
} from "lucide-react";

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
  AreaChart,
  Area,
  BarChart,
  Bar
} from "recharts";

const GameMonitor = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  // Dashboard Data
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

  // Analytics Data
  const [dailyBets] = useState([
    { day: "Mon", bets: 45, wins: 28, revenue: 850 },
    { day: "Tue", bets: 52, wins: 31, revenue: 1200 },
    { day: "Wed", bets: 38, wins: 19, revenue: 950 },
    { day: "Thu", bets: 67, wins: 42, revenue: 1500 },
    { day: "Fri", bets: 71, wins: 45, revenue: 1800 },
    { day: "Sat", bets: 89, wins: 54, revenue: 2100 },
    { day: "Sun", bets: 63, wins: 38, revenue: 1650 }
  ]);

  const [topWinners] = useState([
    { user: "RajKing", totalWins: 45000, games: 120, winRate: "68%" },
    { user: "LuckyBoy", totalWins: 38000, games: 95, winRate: "72%" },
    { user: "MinesPro", totalWins: 32000, games: 145, winRate: "59%" },
    { user: "BigWin", totalWins: 28000, games: 80, winRate: "75%" }
  ]);

  const [topLosers] = useState([
    { user: "BadLuck", totalLoss: -25000, games: 200, winRate: "15%" },
    { user: "RiskTaker", totalLoss: -18000, games: 150, winRate: "22%" },
    { user: "HighRoller", totalLoss: -15000, games: 95, winRate: "28%" },
    { user: "Gambler", totalLoss: -12000, games: 180, winRate: "19%" }
  ]);

  const [suspiciousActivity] = useState([
    { user: "FastWin", issue: "7 consecutive wins", amount: 15000, risk: "High" },
    { user: "QuickBet", issue: "Unusual betting pattern", amount: 8000, risk: "Medium" },
    { user: "LuckyStreak", issue: "High win rate (85%)", amount: 22000, risk: "High" }
  ]);

  // Game Settings State
  const [gameSettings, setGameSettings] = useState({
    minBet: 10,
    maxBet: 10000,
    commission: 5,
    minesOptions: [2, 3, 5, 10, 15],
    autoCashout: 2.0,
    fraudDetection: true
  });

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
    alert(`Session Details:\nUser: ${session.user}\nBet: ₹${session.bet}\nPlayers: ${session.players}\nStatus: ${session.status}`);
  };

  const handleSettingChange = (setting, value) => {
    setGameSettings(prev => ({
      ...prev,
      [setting]: value
    }));
  };

  // Dashboard Component
  const DashboardTab = () => (
    <div className="space-y-8">
      {/* Top Summary Cards */}
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

      {/* Charts */}
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

      {/* Active Sessions */}
      <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-700 flex items-center gap-2 mb-4">
          <Star className="w-5 h-5 text-purple-500" /> Active Sessions
        </h3>
        <div className="overflow-x-auto">
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
      </div>

      {/* Game History */}
      <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-700 flex items-center gap-2 mb-4">
          <Activity className="w-5 h-5 text-indigo-500" /> Game History
        </h3>
        <div className="overflow-x-auto">
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
                  <td className="p-3">
                    <div className="flex gap-2 flex-wrap">
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
                    </div>
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
    </div>
  );

  // Reports & Analytics Tab
  const ReportsTab = () => (
    <div className="space-y-8">
      {/* Daily/Weekly/Monthly Report */}
      <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-700 flex items-center gap-2 mb-4">
          <Calendar className="w-5 h-5 text-blue-500" /> Daily Bets Report
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={dailyBets}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Area type="monotone" dataKey="bets" stackId="1" stroke="#8884d8" fill="#8884d8" />
            <Area type="monotone" dataKey="wins" stackId="1" stroke="#82ca9d" fill="#82ca9d" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Revenue Chart */}
      <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-700 flex items-center gap-2 mb-4">
          <DollarSign className="w-5 h-5 text-green-500" /> Revenue Generated (Commission)
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={dailyBets}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="revenue" fill="#4ade80" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Top Winners vs Top Losers */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Winners */}
        <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-700 flex items-center gap-2 mb-4">
            <Trophy className="w-5 h-5 text-yellow-500" /> Top Winners
          </h3>
          <div className="space-y-4">
            {topWinners.map((winner, i) => (
              <div key={i} className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                <div>
                  <p className="font-semibold text-gray-800">{winner.user}</p>
                  <p className="text-sm text-gray-500">{winner.games} games • {winner.winRate} win rate</p>
                </div>
                <div className="text-green-600 font-bold">₹{winner.totalWins.toLocaleString()}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Losers */}
        <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-700 flex items-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-red-500" /> Top Losers
          </h3>
          <div className="space-y-4">
            {topLosers.map((loser, i) => (
              <div key={i} className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                <div>
                  <p className="font-semibold text-gray-800">{loser.user}</p>
                  <p className="text-sm text-gray-500">{loser.games} games • {loser.winRate} win rate</p>
                </div>
                <div className="text-red-600 font-bold">₹{loser.totalLoss.toLocaleString()}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Suspicious Activity */}
      <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-700 flex items-center gap-2 mb-4">
          <AlertTriangle className="w-5 h-5 text-orange-500" /> Suspicious Activity Report
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr className="bg-gray-100 text-gray-700">
                <th className="p-3 text-left">User</th>
                <th className="p-3 text-left">Issue</th>
                <th className="p-3 text-left">Amount</th>
                <th className="p-3 text-left">Risk Level</th>
                <th className="p-3 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {suspiciousActivity.map((activity, i) => (
                <tr key={i} className="border-b hover:bg-gray-50 transition">
                  <td className="p-3 font-semibold">{activity.user}</td>
                  <td className="p-3">{activity.issue}</td>
                  <td className="p-3">₹{activity.amount.toLocaleString()}</td>
                  <td className="p-3">
                    <span className={`px-2 py-1 text-xs rounded-lg font-semibold ${
                      activity.risk === "High" ? "bg-red-100 text-red-600" : "bg-yellow-100 text-yellow-600"
                    }`}>
                      {activity.risk}
                    </span>
                  </td>
                  <td className="p-3 text-center">
                    <button className="px-3 py-1 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition">
                      Investigate
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  // Game Settings Tab
  const SettingsTab = () => (
    <div className="space-y-8">
      {/* Betting Controls */}
      <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-700 flex items-center gap-2 mb-6">
          <Coins className="w-5 h-5 text-blue-500" /> Betting Controls
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Minimum Bet (₹)</label>
            <input
              type="number"
              value={gameSettings.minBet}
              onChange={(e) => handleSettingChange('minBet', Number(e.target.value))}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Maximum Bet (₹)</label>
            <input
              type="number"
              value={gameSettings.maxBet}
              onChange={(e) => handleSettingChange('maxBet', Number(e.target.value))}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Commission & Revenue */}
      <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-700 flex items-center gap-2 mb-6">
          <DollarSign className="w-5 h-5 text-green-500" /> Commission Control
        </h3>
        <div className="max-w-md">
          <label className="block text-sm font-medium text-gray-700 mb-2">Commission Percentage (%)</label>
          <div className="flex items-center gap-4">
            <input
              type="range"
              min="1"
              max="20"
              value={gameSettings.commission}
              onChange={(e) => handleSettingChange('commission', Number(e.target.value))}
              className="flex-1"
            />
            <span className="text-lg font-bold text-green-600">{gameSettings.commission}%</span>
          </div>
        </div>
      </div>

      {/* Mines Configuration */}
      <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-700 flex items-center gap-2 mb-6">
          <Gem className="w-5 h-5 text-purple-500" /> Mines Options Control
        </h3>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-4">Available Mines Options</label>
          <div className="flex gap-3 flex-wrap">
            {[1, 2, 3, 5, 8, 10, 15, 20, 24].map(count => (
              <button
                key={count}
                onClick={() => {
                  const newOptions = gameSettings.minesOptions.includes(count)
                    ? gameSettings.minesOptions.filter(n => n !== count)
                    : [...gameSettings.minesOptions, count].sort((a, b) => a - b);
                  handleSettingChange('minesOptions', newOptions);
                }}
                className={`px-4 py-2 rounded-lg font-semibold transition ${
                  gameSettings.minesOptions.includes(count)
                    ? 'bg-purple-500 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {count} mines
              </button>
            ))}
          </div>
          <p className="text-sm text-gray-500 mt-2">
            Selected: {gameSettings.minesOptions.join(', ')} mines
          </p>
        </div>
      </div>

      {/* Auto Payout Rules */}
      <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-700 flex items-center gap-2 mb-6">
          <Zap className="w-5 h-5 text-yellow-500" /> Auto Payout Rules
        </h3>
        <div className="max-w-md">
          <label className="block text-sm font-medium text-gray-700 mb-2">Auto Cashout Multiplier</label>
          <div className="flex items-center gap-4">
            <input
              type="range"
              min="1.1"
              max="10"
              step="0.1"
              value={gameSettings.autoCashout}
              onChange={(e) => handleSettingChange('autoCashout', Number(e.target.value))}
              className="flex-1"
            />
            <span className="text-lg font-bold text-yellow-600">{gameSettings.autoCashout}x</span>
          </div>
          <p className="text-sm text-gray-500 mt-2">
            Players will auto-cashout when multiplier reaches this value
          </p>
        </div>
      </div>

      {/* Fraud Detection */}
      <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-700 flex items-center gap-2 mb-6">
          <Shield className="w-5 h-5 text-red-500" /> Fraud Detection Settings
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-800">Enable Fraud Detection</p>
              <p className="text-sm text-gray-500">Monitor suspicious betting patterns</p>
            </div>
            <button
              onClick={() => handleSettingChange('fraudDetection', !gameSettings.fraudDetection)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                gameSettings.fraudDetection ? 'bg-blue-600' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  gameSettings.fraudDetection ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          <div className="bg-yellow-50 p-4 rounded-lg">
            <h4 className="font-semibold text-yellow-800 mb-2">Detection Rules:</h4>
            <ul className="text-sm text-yellow-700 space-y-1">
              <li>• Alert if user wins 5+ consecutive games</li>
              <li>• Monitor win rate above 80%</li>
              <li>• Flag unusual betting patterns</li>
              <li>• Track rapid large bet increases</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Save Settings */}
      <div className="flex justify-end">
        <button
          onClick={() => alert('Settings saved successfully!')}
          className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all flex items-center gap-2"
        >
          <Settings className="w-5 h-5" />
          Save All Settings
        </button>
      </div>
    </div>
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6 rounded-2xl shadow-lg flex items-center gap-3 mb-8">
        <Gem className="w-7 h-7" />
        <h1 className="text-2xl font-bold">Mines Game Monitor</h1>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-2 mb-8">
        <div className="flex flex-wrap gap-2">
          {[
            { id: "dashboard", label: "Dashboard", icon: <BarChart2 className="w-4 h-4" /> },
            { id: "reports", label: "Reports & Analytics", icon: <FileText className="w-4 h-4" /> },
            { id: "settings", label: "Game Settings", icon: <Settings className="w-4 h-4" /> }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === "dashboard" && <DashboardTab />}
      {activeTab === "reports" && <ReportsTab />}
      {activeTab === "settings" && <SettingsTab />}
    </div>
  );
};

export default GameMonitor;
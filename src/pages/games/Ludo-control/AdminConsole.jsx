import React, { useState, useEffect } from "react";
import { Download, FileText, Settings, AlertTriangle, TrendingUp, Users, Clock, Shield } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts";

// Chart Colors
const COLORS = ["#0088FE", "#FF8042", "#00C49F", "#FFBB28", "#8884D8", "#82CA9D"];

// UI Components
const Card = ({ children, className = "" }) => (
  <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 ${className}`}>
    {children}
  </div>
);

const CardContent = ({ children, className = "" }) => (
  <div className={`p-6 ${className}`}>{children}</div>
);

const Button = ({ children, onClick, className = "", style = {}, disabled = false }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`px-4 py-2 rounded-lg font-semibold transition-all duration-200 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
    style={style}
  >
    {children}
  </button>
);

const LudoReportsAnalytics = () => {
  const [activeTab, setActiveTab] = useState("reports");
  const [timeFrame, setTimeFrame] = useState("monthly");
  const [loading, setLoading] = useState(false);
  
  // Data states
  const [revenueData, setRevenueData] = useState([]);
  const [topPlayers, setTopPlayers] = useState([]);
  const [activeTimeSlots, setActiveTimeSlots] = useState([]);
  const [fraudAlerts, setFraudAlerts] = useState([]);
  const [winLossData, setWinLossData] = useState([]);
  const [gameTypeData, setGameTypeData] = useState([]);
  const [botVsHumanData, setBotVsHumanData] = useState([]);

  // Settings state
  const [settings, setSettings] = useState({
    entryFee: 100,
    commissionPercent: 10,
    bonusOffers: {
      firstDeposit: 20,
      referral: 50,
      dailyLogin: 10
    },
    gameRules: {
      maxPlayers: 4,
      timeLimit: 30,
      winCondition: "first_to_finish",
      autoEnd: 45
    },
    security: {
      winRateThreshold: 95,
      maxAccountsPerIP: 3,
      rapidGameThreshold: 20
    },
    withdrawalSettings: {
      minAmount: 200,
      maxPerDay: 50000,
      processingFee: 2
    }
  });

  // Generate sample data
  const generateReportsData = () => {
    setLoading(true);
    
    setTimeout(() => {
      // Revenue data based on timeframe
      let periods = [];
      if (timeFrame === "daily") {
        periods = Array.from({length: 30}, (_, i) => `Day ${i + 1}`);
      } else if (timeFrame === "weekly") {
        periods = Array.from({length: 12}, (_, i) => `Week ${i + 1}`);
      } else {
        periods = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      }

      setRevenueData(
        periods.map((period) => ({
          period,
          revenue: Math.floor(Math.random() * 15000) + 5000,
          users: Math.floor(Math.random() * 500) + 200,
          matches: Math.floor(Math.random() * 1000) + 300,
          commission: Math.floor(Math.random() * 2000) + 500,
        }))
      );

      // Top Players
      setTopPlayers([
        { id: 1, name: "RajKing99", wins: 145, earnings: 25000, matches: 200, winRate: 72 },
        { id: 2, name: "LudoMaster", wins: 132, earnings: 22500, matches: 185, winRate: 71 },
        { id: 3, name: "GameChamp", wins: 118, earnings: 19800, matches: 170, winRate: 69 },
        { id: 4, name: "ProPlayer", wins: 105, earnings: 18200, matches: 155, winRate: 68 },
        { id: 5, name: "WinnerBoy", wins: 98, earnings: 16500, matches: 148, winRate: 66 },
        { id: 6, name: "LuckyStar", wins: 89, earnings: 15200, matches: 140, winRate: 64 },
      ]);

      // Active time slots
      setActiveTimeSlots([
        { time: "6-9 AM", players: 450, matches: 125 },
        { time: "9-12 PM", players: 780, matches: 220 },
        { time: "12-3 PM", players: 890, matches: 280 },
        { time: "3-6 PM", players: 1200, matches: 350 },
        { time: "6-9 PM", players: 1850, matches: 520 },
        { time: "9-12 AM", players: 1650, matches: 480 },
        { time: "12-3 AM", players: 650, matches: 180 },
        { time: "3-6 AM", players: 280, matches: 80 },
      ]);

      // Fraud alerts
      setFraudAlerts([
        { 
          id: 1, 
          player: "SuspiciousUser1", 
          activity: "Multiple accounts from same IP", 
          severity: "High", 
          date: "2025-09-08", 
          status: "Under Review" 
        },
        { 
          id: 2, 
          player: "CheatPlayer", 
          activity: "Unusual win pattern detected", 
          severity: "Medium", 
          date: "2025-09-07", 
          status: "Investigating" 
        },
        { 
          id: 3, 
          player: "BotLikeUser", 
          activity: "Inhuman response times", 
          severity: "High", 
          date: "2025-09-06", 
          status: "Banned" 
        },
        { 
          id: 4, 
          player: "FakeAccount", 
          activity: "Fake payment methods", 
          severity: "Critical", 
          date: "2025-09-05", 
          status: "Permanent Ban" 
        },
      ]);

      // Win/Loss data
      setWinLossData([
        { name: "Player Wins", value: 2847 },
        { name: "Bot Wins", value: 1253 },
      ]);

      // Bot vs Human data
      setBotVsHumanData([
        { name: "Human vs Human", value: 3200 },
        { name: "Human vs Bot", value: 1800 },
        { name: "Practice Mode", value: 950 },
      ]);

      // Game type data
      setGameTypeData([
        { name: "2 Player", matches: 1850, revenue: 185000 },
        { name: "4 Player", matches: 1200, revenue: 240000 },
        { name: "Tournament", matches: 450, revenue: 135000 },
        { name: "Private Room", matches: 300, revenue: 90000 },
      ]);

      setLoading(false);
    }, 500);
  };

  useEffect(() => {
    generateReportsData();
  }, [timeFrame]);

  // Export functions
  const handleExportCSV = (dataType) => {
    let headers = "";
    let rows = [];
    
    try {
      switch(dataType) {
        case "revenue":
          headers = "Period,Revenue,Users,Matches,Commission";
          rows = revenueData.map(row => `${row.period},${row.revenue},${row.users},${row.matches},${row.commission}`);
          break;
        case "players":
          headers = "Name,Wins,Earnings,Matches,WinRate";
          rows = topPlayers.map(row => `${row.name},${row.wins},${row.earnings},${row.matches},${row.winRate}%`);
          break;
        case "fraud":
          headers = "Player,Activity,Severity,Date,Status";
          rows = fraudAlerts.map(row => `${row.player},"${row.activity}",${row.severity},${row.date},${row.status}`);
          break;
        default:
          headers = "Period,Revenue,Users";
          rows = revenueData.map(row => `${row.period},${row.revenue},${row.users}`);
      }

      const csvContent = [headers, ...rows].join("\n");
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `ludo_${dataType}_report_${new Date().toISOString().split('T')[0]}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      alert(`${dataType} Report exported successfully!`);
    } catch (error) {
      alert("Export failed. Please try again.");
      console.error("Export error:", error);
    }
  };

  // Settings update function
  const updateSettings = (category, key, value) => {
    try {
      setSettings(prev => {
        if (typeof prev[category] === 'object' && prev[category] !== null) {
          return {
            ...prev,
            [category]: {
              ...prev[category],
              [key]: value
            }
          };
        } else {
          return {
            ...prev,
            [key]: value
          };
        }
      });
      alert("Settings updated successfully!");
    } catch (error) {
      alert("Failed to update settings. Please try again.");
      console.error("Settings update error:", error);
    }
  };

  // Helper functions
  const getSeverityColor = (severity) => {
    switch(severity) {
      case "Critical": return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      case "High": return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300";
      case "Medium": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      default: return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
    }
  };

  const getStatusColor = (status) => {
    switch(status) {
      case "Banned": 
      case "Permanent Ban": 
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      case "Under Review": 
      case "Investigating": 
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      default: 
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
    }
  };

  const formatNumber = (num) => {
    return new Intl.NumberFormat('en-IN').format(num);
  };

  const calculateTotals = () => {
    const totalRevenue = revenueData.reduce((sum, item) => sum + item.revenue, 0);
    const totalUsers = revenueData.reduce((sum, item) => sum + item.users, 0);
    const totalMatches = revenueData.reduce((sum, item) => sum + item.matches, 0);
    const totalCommission = revenueData.reduce((sum, item) => sum + item.commission, 0);

    return { totalRevenue, totalUsers, totalMatches, totalCommission };
  };

  const totals = calculateTotals();

  return (
    <div className="p-6 min-h-screen bg-gray-50 dark:bg-gray-900 transition-all">
      {/* Navigation Tabs */}
      <div className="flex flex-wrap gap-2 mb-6 border-b border-gray-200 dark:border-gray-700">
        <button
          onClick={() => setActiveTab("reports")}
          className={`px-6 py-3 rounded-t-lg font-semibold transition-all duration-200 ${
            activeTab === "reports"
              ? "bg-blue-600 text-white shadow-lg"
              : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
          }`}
        >
          📊 Reports & Analytics
        </button>
        <button
          onClick={() => setActiveTab("settings")}
          className={`px-6 py-3 rounded-t-lg font-semibold transition-all duration-200 ${
            activeTab === "settings"
              ? "bg-blue-600 text-white shadow-lg"
              : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
          }`}
        >
          ⚙️ Settings & Controls
        </button>
      </div>

      {activeTab === "reports" && (
        <div className="space-y-6">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white flex items-center">
              🎮 Ludo Reports & Analytics
            </h1>
            <div className="flex flex-wrap gap-3 mt-4 md:mt-0">
              <select
                value={timeFrame}
                onChange={(e) => setTimeFrame(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg bg-white dark:bg-gray-800 dark:text-white dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="daily">Daily View</option>
                <option value="weekly">Weekly View</option>
                <option value="monthly">Monthly View</option>
              </select>
              <Button
                onClick={generateReportsData}
                disabled={loading}
                style={{ backgroundImage: "linear-gradient(-225deg, #FFE29F 0%, #FFA99F 48%, #FF719A 100%)" }}
                className="text-white"
              >
                {loading ? "🔄 Loading..." : "🔄 Refresh Data"}
              </Button>
            </div>
          </div>

          {/* Key Metrics Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Revenue</p>
                    <p className="text-2xl font-bold text-green-600">₹{formatNumber(totals.totalRevenue)}</p>
                    <p className="text-xs text-green-500 mt-1">+12.5% from last period</p>
                  </div>
                  <div className="p-3 bg-green-100 dark:bg-green-900 rounded-full">
                    <TrendingUp className="h-6 w-6 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Active Users</p>
                    <p className="text-2xl font-bold text-blue-600">{formatNumber(totals.totalUsers)}</p>
                    <p className="text-xs text-blue-500 mt-1">+8.3% from last period</p>
                  </div>
                  <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-full">
                    <Users className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Matches</p>
                    <p className="text-2xl font-bold text-purple-600">{formatNumber(totals.totalMatches)}</p>
                    <p className="text-xs text-purple-500 mt-1">+15.7% from last period</p>
                  </div>
                  <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-full">
                    <span className="text-2xl">🎯</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Commission Earned</p>
                    <p className="text-2xl font-bold text-orange-600">₹{formatNumber(totals.totalCommission)}</p>
                    <p className="text-xs text-orange-500 mt-1">+9.2% from last period</p>
                  </div>
                  <div className="p-3 bg-orange-100 dark:bg-orange-900 rounded-full">
                    <span className="text-2xl">💰</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Revenue Chart */}
          <Card>
            <CardContent>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2 sm:mb-0">
                  📈 Revenue & User Growth
                </h2>
                <Button
                  onClick={() => handleExportCSV("revenue")}
                  className="bg-blue-500 text-white hover:bg-blue-600"
                >
                  <Download size={16} className="mr-2" />
                  Export Data
                </Button>
              </div>
              <ResponsiveContainer width="100%" height={400}>
                <AreaChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
                  <XAxis dataKey="period" stroke="#6B7280" />
                  <YAxis stroke="#6B7280" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1F2937', 
                      border: 'none', 
                      borderRadius: '8px',
                      color: 'white'
                    }} 
                  />
                  <Legend />
                  <Area 
                    type="monotone" 
                    dataKey="revenue" 
                    stackId="1" 
                    stroke="#8884d8" 
                    fill="#8884d8" 
                    fillOpacity={0.6}
                    name="Revenue (₹)"
                  />
                  <Area 
                    type="monotone" 
                    dataKey="commission" 
                    stackId="1" 
                    stroke="#82ca9d" 
                    fill="#82ca9d" 
                    fillOpacity={0.6}
                    name="Commission (₹)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Top Players & Active Time Slots */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardContent>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
                  <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-2 sm:mb-0">
                    🏆 Top Players
                  </h2>
                  <Button
                    onClick={() => handleExportCSV("players")}
                    className="bg-green-500 text-white hover:bg-green-600"
                  >
                    <Download size={16} className="mr-2" />
                    Export
                  </Button>
                </div>
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {topPlayers.map((player, index) => (
                    <div 
                      key={player.id} 
                      className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                    >
                      <div className="flex items-center space-x-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-lg ${
                          index === 0 ? 'bg-yellow-500' : 
                          index === 1 ? 'bg-gray-400' : 
                          index === 2 ? 'bg-amber-600' : 'bg-blue-500'
                        }`}>
                          {index + 1}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-800 dark:text-white">{player.name}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Win Rate: {player.winRate}% • {player.matches} matches
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-green-600 text-lg">₹{formatNumber(player.earnings)}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{player.wins} wins</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent>
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-6">
                  ⏰ Most Active Time Slots
                </h2>
                <ResponsiveContainer width="100%" height={350}>
                  <BarChart data={activeTimeSlots}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
                    <XAxis dataKey="time" stroke="#6B7280" />
                    <YAxis stroke="#6B7280" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1F2937', 
                        border: 'none', 
                        borderRadius: '8px',
                        color: 'white'
                      }} 
                    />
                    <Legend />
                    <Bar dataKey="players" fill="#8884d8" name="Players" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="matches" fill="#82ca9d" name="Matches" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Game Statistics */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card>
              <CardContent>
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-6">
                  🎯 Win/Loss Distribution
                </h2>
                <ResponsiveContainer width="100%" height={280}>
                  <PieChart>
                    <Pie 
                      data={winLossData} 
                      dataKey="value" 
                      nameKey="name" 
                      cx="50%" 
                      cy="50%" 
                      outerRadius={80} 
                      label={({name, value, percent}) => `${name}: ${(percent * 100).toFixed(1)}%`}
                    >
                      {winLossData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardContent>
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-6">
                  🤖 Game Types
                </h2>
                <ResponsiveContainer width="100%" height={280}>
                  <PieChart>
                    <Pie 
                      data={botVsHumanData} 
                      dataKey="value" 
                      nameKey="name" 
                      cx="50%" 
                      cy="50%" 
                      outerRadius={80} 
                      label={({name, value, percent}) => `${name}: ${(percent * 100).toFixed(1)}%`}
                    >
                      {botVsHumanData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[(index + 2) % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardContent>
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-6">
                  💎 Revenue by Game Type
                </h2>
                <div className="space-y-4">
                  {gameTypeData.map((game, index) => (
                    <div 
                      key={index} 
                      className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                    >
                      <div>
                        <p className="font-semibold text-gray-800 dark:text-white">{game.name}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{formatNumber(game.matches)} matches</p>
                      </div>
                      <p className="font-bold text-green-600 text-lg">₹{formatNumber(game.revenue)}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Fraud Detection */}
          <Card>
            <CardContent>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white flex items-center mb-2 sm:mb-0">
                  <AlertTriangle className="mr-3 text-red-500" />
                  🛡️ Fraud Detection & Abnormal Activity
                </h2>
                <Button
                  onClick={() => handleExportCSV("fraud")}
                  className="bg-red-500 text-white hover:bg-red-600"
                >
                  <Download size={16} className="mr-2" />
                  Export Report
                </Button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th className="py-4 px-6 font-semibold text-gray-800 dark:text-white border-b border-gray-200 dark:border-gray-600">Player</th>
                      <th className="py-4 px-6 font-semibold text-gray-800 dark:text-white border-b border-gray-200 dark:border-gray-600">Suspicious Activity</th>
                      <th className="py-4 px-6 font-semibold text-gray-800 dark:text-white border-b border-gray-200 dark:border-gray-600">Severity</th>
                      <th className="py-4 px-6 font-semibold text-gray-800 dark:text-white border-b border-gray-200 dark:border-gray-600">Date</th>
                      <th className="py-4 px-6 font-semibold text-gray-800 dark:text-white border-b border-gray-200 dark:border-gray-600">Status</th>
                      <th className="py-4 px-6 font-semibold text-gray-800 dark:text-white border-b border-gray-200 dark:border-gray-600">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {fraudAlerts.map((alert) => (
                      <tr key={alert.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                        <td className="py-4 px-6 font-medium text-gray-800 dark:text-white border-b border-gray-100 dark:border-gray-800">
                          {alert.player}
                        </td>
                        <td className="py-4 px-6 text-gray-600 dark:text-gray-300 border-b border-gray-100 dark:border-gray-800">
                          {alert.activity}
                        </td>
                        <td className="py-4 px-6 border-b border-gray-100 dark:border-gray-800">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getSeverityColor(alert.severity)}`}>
                            {alert.severity}
                          </span>
                        </td>
                        <td className="py-4 px-6 text-gray-600 dark:text-gray-300 border-b border-gray-100 dark:border-gray-800">
                          {alert.date}
                        </td>
                        <td className="py-4 px-6 border-b border-gray-100 dark:border-gray-800">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(alert.status)}`}>
                            {alert.status}
                          </span>
                        </td>
                        <td className="py-4 px-6 border-b border-gray-100 dark:border-gray-800">
                          <Button 
                            onClick={() => alert(`Investigating ${alert.player}...`)}
                            className="bg-blue-500 text-white hover:bg-blue-600 text-xs px-3 py-1"
                          >
                            Investigate
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === "settings" && (
        <div className="space-y-6">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white flex items-center">
            <Settings className="mr-4" />
            ⚙️ Settings & Controls
          </h1>

          {/* Financial Settings */}
          <Card>
            <CardContent>
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-6">💰 Financial Settings</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Entry Fee per Match (₹)
                  </label>
                  <input
                    type="number"
                    value={settings.entryFee}
                    onChange={(e) => updateSettings("", "entryFee", parseInt(e.target.value) || 0)}
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    min="0"
                    placeholder="Enter entry fee"
                  />
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Current: ₹{settings.entryFee}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Commission Percentage (%)
                  </label>
                  <input
                    type="number"
                    value={settings.commissionPercent}
                    onChange={(e) => updateSettings("", "commissionPercent", parseInt(e.target.value) || 0)}
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    min="0"
                    max="50"
                    placeholder="Enter commission %"
                  />
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Current: {settings.commissionPercent}%</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Bonus & Offers */}
          <Card>
            <CardContent>
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-6">🎁 Bonus & Offers Control</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    First Deposit Bonus (%)
                  </label>
                  <input
                    type="number"
                    value={settings.bonusOffers.firstDeposit}
                    onChange={(e) => updateSettings("bonusOffers", "firstDeposit", parseInt(e.target.value) || 0)}
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    min="0"
                    placeholder="Enter bonus %"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Referral Bonus (₹)
                  </label>
                  <input
                    type="number"
                    value={settings.bonusOffers.referral}
                    onChange={(e) => updateSettings("bonusOffers", "referral", parseInt(e.target.value) || 0)}
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    min="0"
                    placeholder="Enter referral bonus"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Daily Login Bonus (₹)
                  </label>
                  <input
                    type="number"
                    value={settings.bonusOffers.dailyLogin}
                    onChange={(e) => updateSettings("bonusOffers", "dailyLogin", parseInt(e.target.value) || 0)}
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    min="0"
                    placeholder="Enter daily bonus"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Game Rules */}
          <Card>
            <CardContent>
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-6">🎮 Game Rules & Settings</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Maximum Players per Match
                  </label>
                  <select
                    value={settings.gameRules.maxPlayers}
                    onChange={(e) => updateSettings("gameRules", "maxPlayers", parseInt(e.target.value))}
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value={2}>2 Players</option>
                    <option value={4}>4 Players</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Time Limit per Turn (seconds)
                  </label>
                  <input
                    type="number"
                    value={settings.gameRules.timeLimit}
                    onChange={(e) => updateSettings("gameRules", "timeLimit", parseInt(e.target.value) || 30)}
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    min="15"
                    max="120"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Win Condition
                  </label>
                  <select
                    value={settings.gameRules.winCondition}
                    onChange={(e) => updateSettings("gameRules", "winCondition", e.target.value)}
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="first_to_finish">First to Finish</option>
                    <option value="highest_score">Highest Score</option>
                    <option value="time_based">Time Based</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Auto-End Match After (minutes)
                  </label>
                  <input
                    type="number"
                    value={settings.gameRules.autoEnd}
                    onChange={(e) => updateSettings("gameRules", "autoEnd", parseInt(e.target.value) || 45)}
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    min="30"
                    max="180"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Security & Ban Controls */}
          <Card>
            <CardContent>
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-6 flex items-center">
                <Shield className="mr-3 text-red-500" />
                🛡️ Security & Ban Controls
              </h2>
              <div className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
                    <h3 className="font-semibold text-red-800 dark:text-red-300 mb-4">Suspicious Activity Detection</h3>
                    <div className="space-y-3">
                      <label className="flex items-center space-x-3">
                        <input type="checkbox" defaultChecked className="w-4 h-4 text-red-600 rounded focus:ring-red-500" />
                        <span className="text-sm text-gray-700 dark:text-gray-300">Multiple accounts from same IP</span>
                      </label>
                      <label className="flex items-center space-x-3">
                        <input type="checkbox" defaultChecked className="w-4 h-4 text-red-600 rounded focus:ring-red-500" />
                        <span className="text-sm text-gray-700 dark:text-gray-300">Unusual win patterns</span>
                      </label>
                      <label className="flex items-center space-x-3">
                        <input type="checkbox" defaultChecked className="w-4 h-4 text-red-600 rounded focus:ring-red-500" />
                        <span className="text-sm text-gray-700 dark:text-gray-300">Bot-like behavior detection</span>
                      </label>
                      <label className="flex items-center space-x-3">
                        <input type="checkbox" defaultChecked className="w-4 h-4 text-red-600 rounded focus:ring-red-500" />
                        <span className="text-sm text-gray-700 dark:text-gray-300">Payment fraud detection</span>
                      </label>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                    <h3 className="font-semibold text-yellow-800 dark:text-yellow-300 mb-4">Auto-Ban Thresholds</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Win Rate Threshold (%)
                        </label>
                        <input
                          type="number"
                          value={settings.security.winRateThreshold}
                          onChange={(e) => updateSettings("security", "winRateThreshold", parseInt(e.target.value) || 95)}
                          className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-800 dark:text-white text-sm focus:ring-2 focus:ring-yellow-500"
                          min="80"
                          max="100"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Max Accounts per IP
                        </label>
                        <input
                          type="number"
                          value={settings.security.maxAccountsPerIP}
                          onChange={(e) => updateSettings("security", "maxAccountsPerIP", parseInt(e.target.value) || 3)}
                          className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-800 dark:text-white text-sm focus:ring-2 focus:ring-yellow-500"
                          min="1"
                          max="10"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Rapid Game Threshold (games/hour)
                        </label>
                        <input
                          type="number"
                          value={settings.security.rapidGameThreshold}
                          onChange={(e) => updateSettings("security", "rapidGameThreshold", parseInt(e.target.value) || 20)}
                          className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-800 dark:text-white text-sm focus:ring-2 focus:ring-yellow-500"
                          min="5"
                          max="50"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button
                    onClick={() => alert("Manual ban feature activated! Please provide player ID.")}
                    className="bg-red-500 text-white hover:bg-red-600 p-4 rounded-lg"
                  >
                    🚫 Manual Ban Player
                  </Button>
                  <Button
                    onClick={() => alert("Bulk action feature activated! Select multiple players for batch operations.")}
                    className="bg-orange-500 text-white hover:bg-orange-600 p-4 rounded-lg"
                  >
                    ⚡ Bulk Actions
                  </Button>
                  <Button
                    onClick={() => alert("Ban appeals review opened! Showing pending appeals.")}
                    className="bg-blue-500 text-white hover:bg-blue-600 p-4 rounded-lg"
                  >
                    📋 Review Ban Appeals
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Withdrawal Settings */}
          <Card>
            <CardContent>
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-6">💳 Withdrawal Settings</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Minimum Withdrawal Amount (₹)
                  </label>
                  <input
                    type="number"
                    value={settings.withdrawalSettings.minAmount}
                    onChange={(e) => updateSettings("withdrawalSettings", "minAmount", parseInt(e.target.value) || 200)}
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    min="50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Maximum Withdrawal per Day (₹)
                  </label>
                  <input
                    type="number"
                    value={settings.withdrawalSettings.maxPerDay}
                    onChange={(e) => updateSettings("withdrawalSettings", "maxPerDay", parseInt(e.target.value) || 50000)}
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    min="1000"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Withdrawal Processing Fee (%)
                  </label>
                  <input
                    type="number"
                    value={settings.withdrawalSettings.processingFee}
                    onChange={(e) => updateSettings("withdrawalSettings", "processingFee", parseFloat(e.target.value) || 2)}
                    step="0.1"
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    min="0"
                    max="10"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Export & Backup Settings */}
          <Card>
            <CardContent>
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-6">📤 Export & Backup Settings</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <Button
                  onClick={() => handleExportCSV("revenue")}
                  className="bg-green-500 text-white hover:bg-green-600 p-4 rounded-lg"
                >
                  <Download className="mr-2" size={20} />
                  Export Revenue Data
                </Button>
                <Button
                  onClick={() => handleExportCSV("players")}
                  className="bg-blue-500 text-white hover:bg-blue-600 p-4 rounded-lg"
                >
                  <Download className="mr-2" size={20} />
                  Export Player Data
                </Button>
                <Button
                  onClick={() => handleExportCSV("fraud")}
                  className="bg-red-500 text-white hover:bg-red-600 p-4 rounded-lg"
                >
                  <Download className="mr-2" size={20} />
                  Export Fraud Reports
                </Button>
              </div>
              
              <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
                <h3 className="font-semibold text-gray-800 dark:text-white mb-4">🔄 Auto-Backup Settings</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Backup Frequency
                    </label>
                    <select className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-600 text-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500">
                      <option value="daily">Daily</option>
                      <option value="weekly">Weekly</option>
                      <option value="monthly">Monthly</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Backup Time
                    </label>
                    <input
                      type="time"
                      defaultValue="02:00"
                      className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-600 text-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Save Settings Button */}
          <div className="flex justify-center">
            <Button
              onClick={() => alert("All settings saved successfully! Changes will take effect immediately.")}
              style={{ backgroundImage: "linear-gradient(-225deg, #22C55E 0%, #16A34A 52%, #15803D 100%)" }}
              className="text-white px-12 py-4 text-lg font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all"
            >
              💾 Save All Settings
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LudoReportsAnalytics;
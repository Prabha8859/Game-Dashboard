import React, { useState, useMemo } from "react";
import {
  Users,
  CreditCard,
  DollarSign,
  TrendingUp,
  Crown,
  Medal,
  Award,
  Activity,
  Target,
  Coins,
  Trophy,
  Clock,
  Eye,
  Zap,
  BarChart3,
  TrendingDown,
  Star,
  AlertCircle
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
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  Legend,
  BarChart,
  Bar
} from "recharts";

const MinesDashboard = () => {
  // Enhanced state with more detailed stats
  const [stats] = useState({
    totalUsers: 1520,
    activePlayersNow: 85,
    totalBetsToday: 87200,
    totalPayouts: 43500,
    totalWins: 156,
    totalLosses: 89,
    commissionRate: 5, // 5%
    totalGamesPlayed: 245
  });

  // Calculate derived stats
  const houseProfit = stats.totalBetsToday - stats.totalPayouts;
  const adminCommission = (stats.totalBetsToday * stats.commissionRate) / 100;
  const winRate = ((stats.totalWins / stats.totalGamesPlayed) * 100).toFixed(1);
  const lossRate = ((stats.totalLosses / stats.totalGamesPlayed) * 100).toFixed(1);

  // Enhanced chart data
  const chartData = [
    { time: "6AM", bets: 5000, payouts: 2000, profit: 3000, players: 45 },
    { time: "9AM", bets: 8500, payouts: 4200, profit: 4300, players: 62 },
    { time: "12PM", bets: 12000, payouts: 6500, profit: 5500, players: 78 },
    { time: "3PM", bets: 15500, payouts: 8200, profit: 7300, players: 89 },
    { time: "6PM", bets: 18200, payouts: 9800, profit: 8400, players: 95 },
    { time: "9PM", bets: 22000, payouts: 11500, profit: 10500, players: 102 },
    { time: "Now", bets: 87200, payouts: 43500, profit: houseProfit, players: 85 }
  ];

  // Enhanced game history with more details
  const [recentRounds] = useState([
    { 
      id: "R2024001", 
      user: "CryptoKing", 
      bet: 2500, 
      mines: 5, 
      tilesRevealed: 8, 
      result: "Win", 
      payout: 4200, 
      multiplier: "1.68x",
      time: "2 mins ago",
      profit: -1700
    },
    { 
      id: "R2024002", 
      user: "LuckyPlayer", 
      bet: 1200, 
      mines: 3, 
      tilesRevealed: 4, 
      result: "Loss", 
      payout: 0, 
      multiplier: "0x",
      time: "3 mins ago",
      profit: 1200
    },
    { 
      id: "R2024003", 
      user: "MineHunter", 
      bet: 800, 
      mines: 8, 
      tilesRevealed: 12, 
      result: "Win", 
      payout: 3200, 
      multiplier: "4.0x",
      time: "5 mins ago",
      profit: -2400
    },
  ]);

  // Win/Loss pie chart data
  const winLossData = [
    { name: "Wins", value: stats.totalWins, color: "#10B981" },
    { name: "Losses", value: stats.totalLosses, color: "#EF4444" }
  ];

  // Top players calculation
  const topPlayers = useMemo(() => {
    const playerStats = {};
    recentRounds.forEach((round) => {
      if (!playerStats[round.user]) {
        playerStats[round.user] = { 
          player: round.user, 
          games: 0, 
          wins: 0, 
          totalBet: 0, 
          totalPayout: 0 
        };
      }
      playerStats[round.user].games += 1;
      playerStats[round.user].totalBet += round.bet;
      playerStats[round.user].totalPayout += round.payout;
      if (round.result === "Win") {
        playerStats[round.user].wins += 1;
      }
    });
    
    return Object.values(playerStats)
      .sort((a, b) => b.totalPayout - a.totalPayout)
      .slice(0, 5);
  }, [recentRounds]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
            💣 Mines Game Dashboard
          </h1>
          <p className="text-gray-600 text-sm md:text-base">
            Real-time monitoring & analytics
          </p>
        </div>

        {/* Enhanced Top Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Active Players Now"
            value={stats.activePlayersNow}
            icon={<Users className="w-5 h-5" />}
            borderColor="border-emerald-500"
            iconBg="bg-emerald-100"
            iconColor="text-emerald-600"
            trend="+12%"
            trendUp={true}
          />
          
          <StatCard
            title="Total Bets Today"
            value={`₹${stats.totalBetsToday.toLocaleString()}`}
            icon={<CreditCard className="w-5 h-5" />}
            borderColor="border-blue-500"
            iconBg="bg-blue-100"
            iconColor="text-blue-600"
            trend="+24%"
            trendUp={true}
          />
          
          <StatCard
            title="Admin Commission"
            value={`₹${adminCommission.toLocaleString()}`}
            icon={<DollarSign className="w-5 h-5" />}
            borderColor="border-purple-500"
            iconBg="bg-purple-100"
            iconColor="text-purple-600"
            trend="+18%"
            trendUp={true}
          />
          
          <StatCard
            title="House Profit"
            value={`₹${houseProfit.toLocaleString()}`}
            icon={<TrendingUp className="w-5 h-5" />}
            borderColor="border-orange-500"
            iconBg="bg-orange-100"
            iconColor="text-orange-600"
            trend="+32%"
            trendUp={true}
          />
        </div>

        {/* Win/Loss Summary Cards - Fixed Layout */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <CompactStatCard
            title="Total Wins"
            value={stats.totalWins}
            icon={<Trophy className="w-5 h-5" />}
            borderColor="border-green-500"
            iconBg="bg-green-100"
            iconColor="text-green-600"
            subtitle={`Win Rate: ${winRate}%`}
          />

          <CompactStatCard
            title="Total Losses"
            value={stats.totalLosses}
            icon={<TrendingDown className="w-5 h-5" />}
            borderColor="border-red-500"
            iconBg="bg-red-100"
            iconColor="text-red-600"
            subtitle={`Loss Rate: ${lossRate}%`}
          />

          <CompactStatCard
            title="Total Games"
            value={stats.totalGamesPlayed}
            icon={<Target className="w-5 h-5" />}
            borderColor="border-indigo-500"
            iconBg="bg-indigo-100"
            iconColor="text-indigo-600"
            subtitle={`Commission: ${stats.commissionRate}%`}
          />
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Main Trend Chart */}
          <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
            <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2 mb-6">
              <BarChart3 className="w-6 h-6 text-blue-600" />
              Bets & Payouts Trend (Today)
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="time" stroke="#666" />
                <YAxis stroke="#666" />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: '#fff',
                    border: '1px solid #e5e7eb',
                    borderRadius: '12px',
                    boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="bets" 
                  stackId="1" 
                  stroke="#3B82F6" 
                  fill="#3B82F6" 
                  fillOpacity={0.6}
                />
                <Area 
                  type="monotone" 
                  dataKey="payouts" 
                  stackId="2" 
                  stroke="#EF4444" 
                  fill="#EF4444" 
                  fillOpacity={0.6}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Win/Loss Pie Chart */}
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
            <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2 mb-6">
              <Target className="w-6 h-6 text-purple-600" />
              Win vs Loss Ratio
            </h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={winLossData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {winLossData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Active Players Chart */}
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 mb-8">
          <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2 mb-6">
            <Activity className="w-6 h-6 text-green-600" />
            Active Players Throughout the Day
          </h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="time" stroke="#666" />
              <YAxis stroke="#666" />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="players" 
                stroke="#10B981" 
                strokeWidth={3}
                dot={{ fill: '#10B981', strokeWidth: 2, r: 6 }}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Recent Rounds Table - Fixed Layout */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 mb-8">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
              <Clock className="w-6 h-6 text-orange-600" />
              Recent Rounds (Live Updates)
            </h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr className="text-left text-gray-600 text-sm font-semibold">
                  <th className="py-4 px-4 whitespace-nowrap">Round ID</th>
                  <th className="py-4 px-4 whitespace-nowrap">Player</th>
                  <th className="py-4 px-4 whitespace-nowrap">Bet Amount</th>
                  <th className="py-4 px-4 whitespace-nowrap">Mines</th>
                  <th className="py-4 px-4 whitespace-nowrap">Tiles Revealed</th>
                  <th className="py-4 px-4 whitespace-nowrap">Result</th>
                  <th className="py-4 px-4 whitespace-nowrap">Payout</th>
                  <th className="py-4 px-4 whitespace-nowrap">Multiplier</th>
                  <th className="py-4 px-4 whitespace-nowrap">House P/L</th>
                  <th className="py-4 px-4 whitespace-nowrap">Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {recentRounds.map((round, idx) => (
                  <tr key={round.id} className="hover:bg-gray-50 transition-all duration-200">
                    <td className="py-4 px-4 whitespace-nowrap">
                      <span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">
                        {round.id}
                      </span>
                    </td>
                    <td className="py-4 px-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                          {round.user.charAt(0)}
                        </div>
                        <span className="font-medium text-gray-800">{round.user}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 whitespace-nowrap">
                      <span className="font-semibold text-gray-800">₹{round.bet.toLocaleString()}</span>
                    </td>
                    <td className="py-4 px-4 whitespace-nowrap">
                      <span className="bg-red-100 text-red-700 px-2 py-1 rounded-full text-sm font-medium">
                        {round.mines}
                      </span>
                    </td>
                    <td className="py-4 px-4 whitespace-nowrap">
                      <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-sm font-medium">
                        {round.tilesRevealed}
                      </span>
                    </td>
                    <td className="py-4 px-4 whitespace-nowrap">
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        round.result === "Win" 
                          ? "bg-green-100 text-green-700" 
                          : "bg-red-100 text-red-700"
                      }`}>
                        {round.result === "Win" ? "Win" : "Loss"}
                      </span>
                    </td>
                    <td className="py-4 px-4 whitespace-nowrap">
                      <span className={`font-bold ${
                        round.payout > 0 ? "text-green-600" : "text-gray-500"
                      }`}>
                        ₹{round.payout.toLocaleString()}
                      </span>
                    </td>
                    <td className="py-4 px-4 whitespace-nowrap">
                      <span className={`font-bold px-2 py-1 rounded ${
                        round.result === "Win" 
                          ? "bg-green-50 text-green-700" 
                          : "bg-gray-100 text-gray-600"
                      }`}>
                        {round.multiplier}
                      </span>
                    </td>
                    <td className="py-4 px-4 whitespace-nowrap">
                      <span className={`font-bold ${
                        round.profit > 0 ? "text-green-600" : "text-red-600"
                      }`}>
                        {round.profit > 0 ? "+" : ""}₹{round.profit.toLocaleString()}
                      </span>
                    </td>
                    <td className="py-4 px-4 whitespace-nowrap">
                      <span className="text-sm text-gray-500">{round.time}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top Players */}
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
          <h3 className="text-2xl font-bold flex items-center gap-3 mb-6 text-gray-800">
            <Crown className="w-7 h-7 text-yellow-500" />
            Top Performers (Today)
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {topPlayers.map((player, idx) => {
              const winRate = player.games > 0 ? ((player.wins / player.games) * 100).toFixed(1) : "0";
              const netProfit = player.totalPayout - player.totalBet;
              
              return (
                <div key={player.player} className={`bg-white p-4 rounded-xl border-2 transition-all duration-300 hover:scale-105 shadow-sm ${
                  idx === 0 ? "border-yellow-200" :
                  idx === 1 ? "border-gray-200" :
                  idx === 2 ? "border-orange-200" :
                  "border-blue-200"
                }`}>
                  <div className="flex items-center gap-2 mb-3">
                    {idx === 0 ? <Crown className="w-5 h-5 text-yellow-500" /> :
                     idx === 1 ? <Medal className="w-5 h-5 text-gray-500" /> :
                     idx === 2 ? <Medal className="w-5 h-5 text-orange-500" /> :
                     <Star className="w-4 h-4 text-blue-500" />}
                    <span className="font-bold text-gray-800">#{idx + 1}</span>
                  </div>
                  
                  <div className="mb-3">
                    <p className="font-semibold text-gray-800 text-sm mb-1">{player.player}</p>
                    <p className="text-xs text-gray-600">{player.games} games played</p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-600">Total Bet:</span>
                      <span className="font-semibold">₹{player.totalBet.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-600">Payout:</span>
                      <span className="font-semibold text-green-600">₹{player.totalPayout.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-600">Net P/L:</span>
                      <span className={`font-bold ${netProfit >= 0 ? "text-green-600" : "text-red-600"}`}>
                        {netProfit >= 0 ? "+" : ""}₹{netProfit.toLocaleString()}
                      </span>
                    </div>
                    <div className="mt-2">
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-gray-600">Win Rate:</span>
                        <span className="font-semibold">{winRate}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-green-500 h-2 rounded-full transition-all duration-500" 
                          style={{ width: `${winRate}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

// Reusable StatCard component (unchanged)
function StatCard({ title, value, icon, borderColor, iconBg, iconColor, trend, trendUp, subtitle }) {
  return (
    <div className={`relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer border-t-4 ${borderColor} overflow-hidden`}>
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className={`p-2 rounded-xl ${iconBg}`}>
            <div className={iconColor}>
              {icon}
            </div>
          </div>
          
          {trend && (
            <div className={`flex items-center space-x-1 px-2 py-1 rounded-lg text-xs font-semibold ${
              trendUp 
                ? 'bg-green-100 text-green-700' 
                : 'bg-red-100 text-red-700'
            }`}>
              {trendUp ? (
                <TrendingUp className="h-3 w-3" />
              ) : (
                <TrendingDown className="h-3 w-3" />
              )}
              <span>{trend}</span>
            </div>
          )}
        </div>
        
        <div className="space-y-1">
          <div className="text-2xl md:text-3xl font-bold text-gray-900">{value}</div>
          <p className="text-sm text-gray-600 font-medium">{title}</p>
          {subtitle && (
            <p className="text-xs text-gray-500">{subtitle}</p>
          )}
        </div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 transform -translate-x-full hover:translate-x-full transition-transform duration-700 ease-in-out pointer-events-none"></div>
    </div>
  );
}

// New Compact StatCard component for Win/Loss section
function CompactStatCard({ title, value, icon, borderColor, iconBg, iconColor, subtitle }) {
  return (
    <div className={`relative bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer border-t-4 ${borderColor} overflow-hidden`}>
      <div className="p-4">
        <div className="flex items-center gap-3 mb-2">
          <div className={`p-2 rounded-lg ${iconBg} flex-shrink-0`}>
            <div className={iconColor}>
              {icon}
            </div>
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-xl md:text-2xl font-bold text-gray-900">{value}</div>
            <p className="text-sm text-gray-600 font-medium truncate">{title}</p>
          </div>
        </div>
        {subtitle && (
          <p className="text-xs text-gray-500 mt-1">{subtitle}</p>
        )}
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 transform -translate-x-full hover:translate-x-full transition-transform duration-700 ease-in-out pointer-events-none"></div>
    </div>
  );
}

export default MinesDashboard;
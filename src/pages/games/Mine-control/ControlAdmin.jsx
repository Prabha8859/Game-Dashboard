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
  Users,
  CreditCard,
  Crown,
  Award,
  DollarSign,
  Filter,
  Search,
  CheckCircle,
  XCircle,
  Clock,
  Edit,
  Plus,
  Minus,
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
  const [activeTab, setActiveTab] = useState("dashboard");
  
  // Sample data for winners/leaderboard
  const [winners, setWinners] = useState([
    { id: 1, name: "JohnDoe", bets: 142, wins: 87, biggestCashout: 2450, profit: 1870, rank: 1 },
    { id: 2, name: "CryptoQueen", bets: 98, wins: 63, biggestCashout: 3200, profit: 2540, rank: 2 },
    { id: 3, name: "LuckyLarry", bets: 215, wins: 112, biggestCashout: 1850, profit: 1230, rank: 3 },
    { id: 4, name: "MineMaster", bets: 76, wins: 48, biggestCashout: 4200, profit: 3560, rank: 4 },
    { id: 5, name: "DiamondHands", bets: 167, wins: 94, biggestCashout: 2750, profit: 1980, rank: 5 },
  ]);
  
  // Sample data for withdrawals
  const [withdrawals, setWithdrawals] = useState({
    pending: [
      { id: 101, userId: 1, userName: "JohnDoe", amount: 500, date: "2023-05-15", currency: "USDT" },
      { id: 102, userId: 3, userName: "LuckyLarry", amount: 1200, date: "2023-05-16", currency: "BTC" },
    ],
    completed: [
      { id: 201, userId: 2, userName: "CryptoQueen", amount: 800, date: "2023-05-10", processedDate: "2023-05-11", currency: "ETH" },
      { id: 202, userId: 4, userName: "MineMaster", amount: 1500, date: "2023-05-12", processedDate: "2023-05-13", currency: "USDT" },
    ],
    rejected: [
      { id: 301, userId: 5, userName: "DiamondHands", amount: 2000, date: "2023-05-08", rejectedDate: "2023-05-09", reason: "Insufficient verification", currency: "USDT" },
    ]
  });
  
  // Sample user balances
  const [userBalances, setUserBalances] = useState([
    { id: 1, name: "JohnDoe", balance: 1250, currency: "USDT" },
    { id: 2, name: "CryptoQueen", balance: 3200, currency: "ETH" },
    { id: 3, name: "LuckyLarry", balance: 850, currency: "BTC" },
    { id: 4, name: "MineMaster", balance: 4200, currency: "USDT" },
    { id: 5, name: "DiamondHands", balance: 1800, currency: "USDT" },
  ]);

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

  const handleApproveWithdrawal = (id) => {
    const withdrawal = withdrawals.pending.find(w => w.id === id);
    if (withdrawal) {
      setWithdrawals(prev => ({
        pending: prev.pending.filter(w => w.id !== id),
        completed: [...prev.completed, {...withdrawal, processedDate: new Date().toISOString().split('T')[0]}],
        rejected: prev.rejected
      }));
      
      Swal.fire("Approved!", "Withdrawal request has been approved.", "success");
    }
  };

  const handleRejectWithdrawal = (id) => {
    const withdrawal = withdrawals.pending.find(w => w.id === id);
    if (withdrawal) {
      Swal.fire({
        title: "Reason for rejection",
        input: "text",
        inputLabel: "Please provide a reason",
        inputPlaceholder: "Enter rejection reason",
        showCancelButton: true,
        confirmButtonText: "Reject",
        confirmButtonColor: "#ef4444",
        preConfirm: (reason) => {
          if (!reason) {
            Swal.showValidationMessage("Please enter a reason");
          }
          return reason;
        }
      }).then((result) => {
        if (result.isConfirmed) {
          setWithdrawals(prev => ({
            pending: prev.pending.filter(w => w.id !== id),
            completed: prev.completed,
            rejected: [...prev.rejected, {
              ...withdrawal, 
              rejectedDate: new Date().toISOString().split('T')[0],
              reason: result.value
            }]
          }));
          
          Swal.fire("Rejected!", "Withdrawal request has been rejected.", "success");
        }
      });
    }
  };

  const handleBalanceAdjustment = (userId, type) => {
    Swal.fire({
      title: `${type === 'add' ? 'Add' : 'Deduct'} Funds`,
      html: `
        <input type="number" id="amount" class="swal2-input" placeholder="Amount">
        <input type="text" id="reason" class="swal2-input" placeholder="Reason for adjustment">
      `,
      confirmButtonText: type === 'add' ? 'Add Funds' : 'Deduct Funds',
      confirmButtonColor: type === 'add' ? '#10b981' : '#ef4444',
      focusConfirm: false,
      preConfirm: () => {
        const amount = Swal.getPopup().querySelector('#amount').value;
        const reason = Swal.getPopup().querySelector('#reason').value;
        
        if (!amount || isNaN(amount) || amount <= 0) {
          Swal.showValidationMessage("Please enter a valid amount");
        }
        if (!reason) {
          Swal.showValidationMessage("Please provide a reason");
        }
        
        return { amount: parseFloat(amount), reason };
      }
    }).then((result) => {
      if (result.isConfirmed) {
        setUserBalances(prev => prev.map(user => 
          user.id === userId 
            ? { ...user, balance: type === 'add' ? user.balance + result.value.amount : user.balance - result.value.amount }
            : user
        ));
        
        Swal.fire(
          "Success!", 
          `Funds ${type === 'add' ? 'added to' : 'deducted from'} user balance.`, 
          "success"
        );
      }
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
      <div className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white p-6 rounded-2xl shadow-lg mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-wide flex items-center justify-center gap-3">
          ⚙️ Control Mines Game
        </h1>
        <p className="text-sm opacity-80 mt-2">
          Manage configuration and view real-time insights
        </p>
      </div>

      {/* Tabs Navigation */}
      <div className="flex justify-center mb-8">
        <div className="bg-white rounded-2xl shadow-md p-1 flex">
          <button
            onClick={() => setActiveTab("dashboard")}
            className={`px-6 py-3 rounded-2xl font-medium flex items-center gap-2 transition ${activeTab === "dashboard" ? "bg-indigo-500 text-white" : "text-gray-600 hover:text-indigo-500"}`}
          >
            <Activity className="w-4 h-4" />
            Dashboard
          </button>
          <button
            onClick={() => setActiveTab("winners")}
            className={`px-6 py-3 rounded-2xl font-medium flex items-center gap-2 transition ${activeTab === "winners" ? "bg-indigo-500 text-white" : "text-gray-600 hover:text-indigo-500"}`}
          >
            <Crown className="w-4 h-4" />
            Winners & Leaderboard
          </button>
          <button
            onClick={() => setActiveTab("withdrawals")}
            className={`px-6 py-3 rounded-2xl font-medium flex items-center gap-2 transition ${activeTab === "withdrawals" ? "bg-indigo-500 text-white" : "text-gray-600 hover:text-indigo-500"}`}
          >
            <CreditCard className="w-4 h-4" />
            Withdrawals & Wallet
          </button>
        </div>
      </div>

      {/* Dashboard Tab */}
      {activeTab === "dashboard" && (
        <>
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
        </>
      )}

      {/* Winners & Leaderboard Tab */}
      {activeTab === "winners" && (
        <div className="bg-white rounded-3xl shadow-xl p-8 max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              <Crown className="w-6 h-6 text-yellow-500" />
              Top Winners & Leaderboard
            </h2>
            <div className="flex gap-4">
              <div className="relative">
                <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search user..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-2xl focus:ring-2 focus:ring-indigo-400 focus:outline-none"
                />
              </div>
              <button className="px-4 py-2 border border-gray-300 rounded-2xl flex items-center gap-2 hover:bg-gray-50">
                <Filter className="w-4 h-4" />
                Filter
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-700">
              <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                <tr>
                  <th className="px-6 py-3 rounded-l-2xl">Rank</th>
                  <th className="px-6 py-3">User Name / ID</th>
                  <th className="px-6 py-3">Total Bets</th>
                  <th className="px-6 py-3">Total Wins</th>
                  <th className="px-6 py-3">Biggest Cashout</th>
                  <th className="px-6 py-3 rounded-r-2xl">Total Profit</th>
                </tr>
              </thead>
              <tbody>
                {winners.map((winner) => (
                  <tr key={winner.id} className="bg-white border-b hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {winner.rank <= 3 ? (
                          <Award className={`w-5 h-5 ${winner.rank === 1 ? 'text-yellow-500' : winner.rank === 2 ? 'text-gray-400' : 'text-amber-700'}`} />
                        ) : null}
                        <span className={`font-bold ${winner.rank === 1 ? 'text-yellow-500' : winner.rank === 2 ? 'text-gray-400' : winner.rank === 3 ? 'text-amber-700' : ''}`}>
                          #{winner.rank}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900">
                      {winner.name}
                      <div className="text-xs text-gray-500">ID: {winner.id}</div>
                    </td>
                    <td className="px-6 py-4">{winner.bets}</td>
                    <td className="px-6 py-4">{winner.wins}</td>
                    <td className="px-6 py-4 font-medium">${winner.biggestCashout.toLocaleString()}</td>
                    <td className="px-6 py-4 font-bold text-green-600">${winner.profit.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-8 flex justify-between items-center">
            <div className="text-sm text-gray-500">
              Showing 5 of 327 players
            </div>
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-gray-200 rounded-2xl hover:bg-gray-300">
                Previous
              </button>
              <button className="px-4 py-2 bg-indigo-500 text-white rounded-2xl hover:bg-indigo-600">
                Next
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Withdrawals & Wallet Tab */}
      {activeTab === "withdrawals" && (
        <div className="max-w-6xl mx-auto">
          {/* Pending Withdrawals */}
          <div className="bg-white rounded-3xl shadow-xl p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <Clock className="w-6 h-6 text-amber-500" />
              Pending Withdrawal Requests
            </h2>
            
            {withdrawals.pending.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-700">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                    <tr>
                      <th className="px-6 py-3 rounded-l-2xl">User</th>
                      <th className="px-6 py-3">Amount</th>
                      <th className="px-6 py-3">Date</th>
                      <th className="px-6 py-3 rounded-r-2xl">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {withdrawals.pending.map((request) => (
                      <tr key={request.id} className="bg-white border-b hover:bg-gray-50">
                        <td className="px-6 py-4 font-medium">
                          {request.userName}
                          <div className="text-xs text-gray-500">ID: {request.userId}</div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="font-medium">{request.amount} {request.currency}</span>
                        </td>
                        <td className="px-6 py-4">{request.date}</td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2">
                            <button 
                              onClick={() => handleApproveWithdrawal(request.id)}
                              className="px-3 py-1 bg-green-500 text-white rounded-2xl flex items-center gap-1 hover:bg-green-600"
                            >
                              <CheckCircle className="w-4 h-4" />
                              Approve
                            </button>
                            <button 
                              onClick={() => handleRejectWithdrawal(request.id)}
                              className="px-3 py-1 bg-red-500 text-white rounded-2xl flex items-center gap-1 hover:bg-red-600"
                            >
                              <XCircle className="w-4 h-4" />
                              Reject
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                No pending withdrawal requests
              </div>
            )}
          </div>

          {/* Completed and Rejected Withdrawals */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {/* Completed Withdrawals */}
            <div className="bg-white rounded-3xl shadow-xl p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                Completed Withdrawals
              </h3>
              
              {withdrawals.completed.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left text-gray-700">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                      <tr>
                        <th className="px-4 py-2 rounded-l-2xl">User</th>
                        <th className="px-4 py-2">Amount</th>
                        <th className="px-4 py-2 rounded-r-2xl">Processed</th>
                      </tr>
                    </thead>
                    <tbody>
                      {withdrawals.completed.slice(0, 3).map((withdrawal) => (
                        <tr key={withdrawal.id} className="bg-white border-b hover:bg-gray-50">
                          <td className="px-4 py-3 font-medium">
                            {withdrawal.userName}
                            <div className="text-xs text-gray-500">ID: {withdrawal.userId}</div>
                          </td>
                          <td className="px-4 py-3">
                            <span className="font-medium">{withdrawal.amount} {withdrawal.currency}</span>
                          </td>
                          <td className="px-4 py-3">{withdrawal.processedDate}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-4 text-gray-500">
                  No completed withdrawals
                </div>
              )}
            </div>

            {/* Rejected Withdrawals */}
            <div className="bg-white rounded-3xl shadow-xl p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <XCircle className="w-5 h-5 text-red-500" />
                Rejected Withdrawals
              </h3>
              
              {withdrawals.rejected.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left text-gray-700">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                      <tr>
                        <th className="px-4 py-2 rounded-l-2xl">User</th>
                        <th className="px-4 py-2">Amount</th>
                        <th className="px-4 py-2 rounded-r-2xl">Reason</th>
                      </tr>
                    </thead>
                    <tbody>
                      {withdrawals.rejected.map((withdrawal) => (
                        <tr key={withdrawal.id} className="bg-white border-b hover:bg-gray-50">
                          <td className="px-4 py-3 font-medium">
                            {withdrawal.userName}
                            <div className="text-xs text-gray-500">ID: {withdrawal.userId}</div>
                          </td>
                          <td className="px-4 py-3">
                            <span className="font-medium">{withdrawal.amount} {withdrawal.currency}</span>
                          </td>
                          <td className="px-4 py-3 text-red-500">{withdrawal.reason}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="text-center py-4 text-gray-500">
                  No rejected withdrawals
                </div>
              )}
            </div>
          </div>

          {/* User Balances */}
          <div className="bg-white rounded-3xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <DollarSign className="w-6 h-6 text-green-500" />
              User Balances
            </h2>
            
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-700">
                <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                  <tr>
                    <th className="px-6 py-3 rounded-l-2xl">User</th>
                    <th className="px-6 py-3">Balance</th>
                    <th className="px-6 py-3">Currency</th>
                    <th className="px-6 py-3 rounded-r-2xl">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {userBalances.map((user) => (
                    <tr key={user.id} className="bg-white border-b hover:bg-gray-50">
                      <td className="px-6 py-4 font-medium">
                        {user.name}
                        <div className="text-xs text-gray-500">ID: {user.id}</div>
                      </td>
                      <td className="px-6 py-4 font-bold">
                        {user.balance.toLocaleString()} {user.currency}
                      </td>
                      <td className="px-6 py-4">{user.currency}</td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <button 
                            onClick={() => handleBalanceAdjustment(user.id, 'add')}
                            className="p-2 bg-green-500 text-white rounded-2xl hover:bg-green-600"
                            title="Add Funds"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => handleBalanceAdjustment(user.id, 'deduct')}
                            className="p-2 bg-red-500 text-white rounded-2xl hover:bg-red-600"
                            title="Deduct Funds"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <button 
                            className="p-2 bg-blue-500 text-white rounded-2xl hover:bg-blue-600"
                            title="Edit Balance"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ControlMinesLight;
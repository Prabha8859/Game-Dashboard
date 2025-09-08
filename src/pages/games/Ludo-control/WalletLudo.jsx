import React, { useState } from "react";
import { Search, Filter, Eye, Trash2, Download, Settings, CheckCircle, XCircle, ArrowLeft, Plus, Edit, Trophy } from "lucide-react";

const ComprehensiveWalletSystem = () => {
  // Initial Data
  const [users, setUsers] = useState([
    { id: 1, name: "Arjun Kumar", balance: 2500, email: "arjun@gmail.com", phone: "9876543210", joinDate: "2024-01-15" },
    { id: 2, name: "Priya Sharma", balance: 1800, email: "priya@gmail.com", phone: "8765432109", joinDate: "2024-02-20" },
    { id: 3, name: "Rohit Singh", balance: 3200, email: "rohit@gmail.com", phone: "7654321098", joinDate: "2024-01-10" },
    { id: 4, name: "Sneha Patel", balance: 950, email: "sneha@gmail.com", phone: "6543210987", joinDate: "2024-03-05" },
    { id: 5, name: "Vikash Yadav", balance: 4100, email: "vikash@gmail.com", phone: "5432109876", joinDate: "2024-02-12" },
  ]);

  const [withdrawalRequests, setWithdrawalRequests] = useState([
    { id: 1, userId: 2, userName: "Priya Sharma", amount: 500, status: "Pending", requestDate: "2024-09-05", method: "UPI" },
    { id: 2, userId: 4, userName: "Sneha Patel", amount: 200, status: "Pending", requestDate: "2024-09-06", method: "Bank Transfer" },
    { id: 3, userId: 1, userName: "Arjun Kumar", amount: 1000, status: "Approved", requestDate: "2024-09-04", method: "UPI" },
    { id: 4, userId: 3, userName: "Rohit Singh", amount: 750, status: "Rejected", requestDate: "2024-09-03", method: "PayTM" },
  ]);

  const [transactions, setTransactions] = useState([
    { id: 1, userId: 1, type: "Deposit", amount: 1000, status: "Completed", date: "2024-09-01", description: "UPI Deposit" },
    { id: 2, userId: 1, type: "Game Win", amount: 500, status: "Completed", date: "2024-09-02", description: "Ludo Classic Win" },
    { id: 3, userId: 1, type: "Game Entry", amount: -100, status: "Completed", date: "2024-09-03", description: "Tournament Entry" },
    { id: 4, userId: 2, type: "Deposit", amount: 800, status: "Completed", date: "2024-09-01", description: "Card Payment" },
    { id: 5, userId: 2, type: "Game Win", amount: 300, status: "Completed", date: "2024-09-04", description: "Quick Play Win" },
    { id: 6, userId: 3, type: "Deposit", amount: 1500, status: "Completed", date: "2024-08-30", description: "Net Banking" },
    { id: 7, userId: 4, type: "Game Loss", amount: -50, status: "Completed", date: "2024-09-05", description: "Bot Match Loss" },
    { id: 8, userId: 5, type: "Deposit", amount: 2000, status: "Completed", date: "2024-08-28", description: "UPI Deposit" },
  ]);

  const [gameMatches, setGameMatches] = useState([
    { id: "M101", winnerId: 1, winnerName: "Arjun Kumar", prizePool: 1000, entryFee: 100, commission: 20, payout: 980, date: "2024-09-02", status: "Completed" },
    { id: "M102", winnerId: 2, winnerName: "Priya Sharma", prizePool: 600, entryFee: 150, commission: 12, payout: 588, date: "2024-09-04", status: "Completed" },
    { id: "M103", winnerId: 3, winnerName: "Rohit Singh", prizePool: 800, entryFee: 200, commission: 16, payout: 784, date: "2024-09-05", status: "Completed" },
    { id: "M104", winnerId: 5, winnerName: "Vikash Yadav", prizePool: 200, entryFee: 50, commission: 4, payout: 196, date: "2024-09-06", status: "Pending Payout" },
  ]);

  // State Management
  const [currentView, setCurrentView] = useState("dashboard");
  const [selectedUser, setSelectedUser] = useState(null);
  const [adjustAmount, setAdjustAmount] = useState("");
  const [adjustType, setAdjustType] = useState("add");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterBalance, setFilterBalance] = useState("all");
  const [commissionRate, setCommissionRate] = useState(5);
  const [showCommissionSettings, setShowCommissionSettings] = useState(false);
  const [adminCommissionRate, setAdminCommissionRate] = useState(2); // New state for admin's game commission
  const [winnerSearchTerm, setWinnerSearchTerm] = useState("");

  // Calculations
  const totalDeposits = transactions.filter(t => t.type.includes("Deposit")).reduce((acc, t) => acc + t.amount, 0);
  const totalWithdrawals = withdrawalRequests.filter(r => r.status === "Approved").reduce((acc, r) => acc + r.amount, 0);
  const totalGameWinnings = transactions.filter(t => t.type.includes("Game Win")).reduce((acc, t) => acc + t.amount, 0);
  const totalEntryFees = transactions.filter(t => t.type.includes("Game Entry")).reduce((acc, t) => acc + Math.abs(t.amount), 0);
  const totalAdminCommission = gameMatches.reduce((acc, match) => acc + match.commission, 0);
  
  const formatINR = (n) => `₹${Number(n).toLocaleString("en-IN")}`;

  // Filtered Users
  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterBalance === "all" ||
                          (filterBalance === "high" && user.balance >= 2000) ||
                          (filterBalance === "medium" && user.balance >= 500 && user.balance < 2000) ||
                          (filterBalance === "low" && user.balance < 500);
    return matchesSearch && matchesFilter;
  });

  // Filtered Winners
  const filteredMatches = gameMatches.filter(match => 
    match.winnerName.toLowerCase().includes(winnerSearchTerm.toLowerCase()) ||
    match.id.toLowerCase().includes(winnerSearchTerm.toLowerCase())
  );

  // Handle Manual Adjustment
  const handleAdjust = () => {
    if (!selectedUser || !adjustAmount) {
      alert("Please select a user and enter amount");
      return;
    }

    const amount = parseFloat(adjustAmount);
    if (isNaN(amount) || amount <= 0) {
      alert("Enter a valid amount.");
      return;
    }

    setUsers(prev => prev.map(u => {
      if (u.id === selectedUser.id) {
        let newBalance = adjustType === "add" ? u.balance + amount : u.balance - amount;
        if (newBalance < 0) newBalance = 0;
        return { ...u, balance: newBalance };
      }
      return u;
    }));

    // Add transaction record
    const newTransaction = {
      id: transactions.length + 1,
      userId: selectedUser.id,
      type: adjustType === "add" ? "Manual Credit" : "Manual Debit",
      amount: adjustType === "add" ? amount : -amount,
      status: "Completed",
      date: new Date().toISOString().split('T')[0],
      description: `Admin ${adjustType === "add" ? "credit" : "debit"}`
    };
    setTransactions(prev => [newTransaction, ...prev]);

    alert(`${adjustType === "add" ? "Added" : "Deducted"} ${formatINR(amount)} for ${selectedUser.name}`);
    setAdjustAmount("");
    setSelectedUser(null);
  };

  // Handle Withdrawal Request
  const handleWithdrawalAction = (requestId, action) => {
    setWithdrawalRequests(prev => prev.map(req => {
      if (req.id === requestId) {
        if (action === "approve") {
          setUsers(userPrev => userPrev.map(u => {
            if (u.id === req.userId) {
              return { ...u, balance: Math.max(0, u.balance - req.amount) };
            }
            return u;
          }));
        }
        return { ...req, status: action === "approve" ? "Approved" : "Rejected" };
      }
      return req;
    }));

    alert(`Withdrawal request ${action === "approve" ? "approved" : "rejected"} successfully!`);
  };

  // Delete User
  const handleDeleteUser = (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      setUsers(prev => prev.filter(u => u.id !== userId));
      setTransactions(prev => prev.filter(t => t.userId !== userId));
      setWithdrawalRequests(prev => prev.filter(r => r.userId !== userId));
      alert("User deleted successfully!");
    }
  };

  // Export Data
  const handleExport = (type) => {
    if (type === "csv") {
      const csvData = users.map(u => ({
        Name: u.name,
        Email: u.email,
        Phone: u.phone,
        Balance: u.balance,
        JoinDate: u.joinDate
      }));
      
      const csvContent = "data:text/csv;charset=utf-8," + 
        Object.keys(csvData[0]).join(",") + "\n" +
        csvData.map(row => Object.values(row).join(",")).join("\n");
      
      const encodedUri = encodeURI(csvContent);
      const link = document.createElement("a");
      link.setAttribute("href", encodedUri);
      link.setAttribute("download", "user_balances.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      alert("PDF export functionality can be implemented with libraries like jsPDF");
    }
  };

  const renderDashboard = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="rounded-xl p-6 shadow-lg bg-gradient-to-tr from-cyan-100 to-cyan-200 text-gray-800 transform hover:scale-105 transition">
          <div className="text-sm font-medium">Total Deposits</div>
          <div className="text-3xl font-bold mt-2">{formatINR(totalDeposits)}</div>
          <div className="mt-3 text-xs opacity-70">from all payment methods</div>
        </div>
        <div className="rounded-xl p-6 shadow-lg bg-gradient-to-tr from-rose-100 to-rose-200 text-gray-800 transform hover:scale-105 transition">
          <div className="text-sm font-medium">Total Withdrawals</div>
          <div className="text-3xl font-bold mt-2">{formatINR(totalWithdrawals)}</div>
          <div className="mt-3 text-xs opacity-70">approved requests only</div>
        </div>
        <div className="rounded-xl p-6 shadow-lg bg-gradient-to-tr from-lime-100 to-green-200 text-gray-800 transform hover:scale-105 transition">
          <div className="text-sm font-medium">Game Entry Fees</div>
          <div className="text-3xl font-bold mt-2">{formatINR(totalEntryFees)}</div>
          <div className="mt-3 text-xs opacity-70">total collected from matches</div>
        </div>
        <div className="rounded-xl p-6 shadow-lg bg-gradient-to-tr from-indigo-100 to-purple-200 text-gray-800 transform hover:scale-105 transition">
          <div className="text-sm font-medium">Admin Commission</div>
          <div className="text-3xl font-bold mt-2">{formatINR(totalAdminCommission)}</div>
          <div className="mt-3 text-xs opacity-70">from all game wins</div>
        </div>
      </div>
      <section className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
        <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <Edit className="w-5 h-5" />
          Manual Wallet Adjustment
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">Select User</label>
            <select
              className="w-full p-3 rounded-lg border border-gray-300 bg-white text-gray-800 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              value={selectedUser?.id || ""}
              onChange={(e) => setSelectedUser(users.find((u) => u.id === parseInt(e.target.value)))}
            >
              <option value="">-- Select User --</option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {`${user.name} (${formatINR(user.balance)})`}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">Amount</label>
            <input
              type="number"
              placeholder="Enter amount"
              className="w-full p-3 rounded-lg border border-gray-300 bg-white text-gray-800 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              value={adjustAmount}
              onChange={(e) => setAdjustAmount(e.target.value)}
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">Adjustment Type</label>
            <select
              className="w-full p-3 rounded-lg border border-gray-300 bg-white text-gray-800 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              value={adjustType}
              onChange={(e) => setAdjustType(e.target.value)}
            >
              <option value="add">Add Funds</option>
              <option value="deduct">Deduct Funds</option>
            </select>
          </div>
        </div>
        <div className="mt-6">
          <button
            onClick={handleAdjust}
            className="px-6 py-3 rounded-lg font-semibold shadow-md bg-gradient-to-r from-green-400 to-cyan-400 text-white hover:shadow-lg transition"
          >
            Submit Adjustment
          </button>
        </div>
      </section>
      <section className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
          <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <Eye className="w-5 h-5" />
            User Management ({filteredUsers.length})
          </h2>
          <div className="flex flex-col md:flex-row gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search users..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              value={filterBalance}
              onChange={(e) => setFilterBalance(e.target.value)}
            >
              <option value="all">All Balances</option>
              <option value="high">High (≥₹2000)</option>
              <option value="medium">Medium (₹500-1999)</option>
              <option value="low">Low (&lt;₹500)</option>
            </select>
            <button
              onClick={() => handleExport("csv")}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              Export CSV
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full table-auto text-left">
            <thead>
              <tr className="text-sm text-gray-700 border-b-2 border-gray-200 bg-gray-50">
                <th className="py-4 px-4 font-semibold">User</th>
                <th className="py-4 px-4 font-semibold">Contact</th>
                <th className="py-4 px-4 font-semibold">Balance</th>
                <th className="py-4 px-4 font-semibold">Join Date</th>
                <th className="py-4 px-4 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50 transition">
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-purple-200 to-cyan-200 flex items-center justify-center text-gray-700 font-bold">
                        {user.name.split(" ").map(s => s[0]).slice(0, 2).join("")}
                      </div>
                      <div>
                        <div className="font-semibold text-gray-800">{user.name}</div>
                        <div className="text-xs text-gray-500">ID: {user.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="text-sm text-gray-600">
                      <div>{user.email}</div>
                      <div>{user.phone}</div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`font-bold text-lg ${
                      user.balance >= 2000 ? 'text-green-600' :
                      user.balance >= 500 ? 'text-blue-600' :
                      'text-orange-600'
                    }`}>
                      {formatINR(user.balance)}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-600">
                    {user.joinDate}
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => { setCurrentView("userHistory"); setSelectedUser(user); }}
                        className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition"
                        title="View History"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteUser(user.id)}
                        className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition"
                        title="Delete User"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      <section className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
        <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <Download className="w-5 h-5" />
          Withdrawal Requests
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full table-auto text-left">
            <thead>
              <tr className="text-sm text-gray-700 border-b-2 border-gray-200 bg-gray-50">
                <th className="py-4 px-4 font-semibold">User</th>
                <th className="py-4 px-4 font-semibold">Amount</th>
                <th className="py-4 px-4 font-semibold">Method</th>
                <th className="py-4 px-4 font-semibold">Date</th>
                <th className="py-4 px-4 font-semibold">Status</th>
                <th className="py-4 px-4 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {withdrawalRequests.map((request) => (
                <tr key={request.id} className="border-b border-gray-100 hover:bg-gray-50 transition">
                  <td className="py-4 px-4 font-semibold text-gray-800">{request.userName}</td>
                  <td className="py-4 px-4 font-bold text-lg text-red-600">{formatINR(request.amount)}</td>
                  <td className="py-4 px-4 text-sm text-gray-600">{request.method}</td>
                  <td className="py-4 px-4 text-sm text-gray-600">{request.requestDate}</td>
                  <td className="py-4 px-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      request.status === "Pending" ? "bg-yellow-100 text-yellow-800" :
                      request.status === "Approved" ? "bg-green-100 text-green-800" :
                      "bg-red-100 text-red-800"
                    }`}>
                      {request.status}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    {request.status === "Pending" && (
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleWithdrawalAction(request.id, "approve")}
                          className="p-2 text-green-600 hover:bg-green-100 rounded-lg transition"
                          title="Approve"
                        >
                          <CheckCircle className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleWithdrawalAction(request.id, "reject")}
                          className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition"
                          title="Reject"
                        >
                          <XCircle className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      <section className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <Settings className="w-5 h-5" />
            Admin Settings
          </h2>
          <button
            onClick={() => setShowCommissionSettings(!showCommissionSettings)}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
          >
            {showCommissionSettings ? "Hide" : "Show"}
          </button>
        </div>
        {showCommissionSettings && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Withdrawal Commission Rate (%)</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  step="0.1"
                  className="w-full p-3 rounded-lg border border-gray-300 bg-white text-gray-800 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  value={commissionRate}
                  onChange={(e) => setCommissionRate(parseFloat(e.target.value) || 0)}
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Game Commission Rate (%)</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  step="0.1"
                  className="w-full p-3 rounded-lg border border-gray-300 bg-white text-gray-800 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  value={adminCommissionRate}
                  onChange={(e) => setAdminCommissionRate(parseFloat(e.target.value) || 0)}
                />
              </div>
              <div className="flex items-end">
                <button
                  onClick={() => alert("Settings updated successfully!")}
                  className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
                >
                  Update Settings
                </button>
              </div>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-800">
                Current total commission from games: <strong>{formatINR(totalAdminCommission)}</strong>
              </p>
            </div>
          </div>
        )}
      </section>
    </div>
  );

  const renderUserHistory = () => {
    if (!selectedUser) return null;
    const userTransactions = transactions.filter(t => t.userId === selectedUser.id).sort((a,b) => new Date(b.date) - new Date(a.date));
    
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => setCurrentView("dashboard")}
            className="p-2 hover:bg-gray-100 rounded-lg transition"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-2xl font-bold text-gray-800">
            Transaction History - {selectedUser.name}
          </h1>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-purple-200 to-cyan-200 flex items-center justify-center text-gray-700 font-bold text-xl">
              {selectedUser.name.split(" ").map(s => s[0]).slice(0, 2).join("")}
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-800">{selectedUser.name}</h3>
              <p className="text-gray-600">{selectedUser.email}</p>
              <p className="text-2xl font-bold text-green-600 mt-2">Balance: {formatINR(selectedUser.balance)}</p>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full table-auto text-left">
              <thead>
                <tr className="text-sm text-gray-700 border-b-2 border-gray-200 bg-gray-50">
                  <th className="py-4 px-4 font-semibold">Date</th>
                  <th className="py-4 px-4 font-semibold">Type</th>
                  <th className="py-4 px-4 font-semibold">Amount</th>
                  <th className="py-4 px-4 font-semibold">Status</th>
                  <th className="py-4 px-4 font-semibold">Description</th>
                </tr>
              </thead>
              <tbody>
                {userTransactions.map((txn) => (
                  <tr key={txn.id} className="border-b border-gray-100 hover:bg-gray-50 transition">
                    <td className="py-4 px-4 text-sm text-gray-600">{txn.date}</td>
                    <td className="py-4 px-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        txn.amount >= 0 ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                      }`}>
                        {txn.type}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`font-bold text-lg ${
                        txn.amount >= 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {txn.amount >= 0 ? '+' : ''}{formatINR(Math.abs(txn.amount))}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        {txn.status}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-sm text-gray-600">{txn.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };

  const renderWinnerManagement = () => (
    <div className="space-y-6">
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => setCurrentView("dashboard")}
          className="p-2 hover:bg-gray-100 rounded-lg transition"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <Trophy className="w-6 h-6" />
          Game Winner Management
        </h1>
      </div>

      <section className="bg-white rounded-2xl p-6 shadow-lg border border-gray-200">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
          <h2 className="text-xl font-bold text-gray-800">Game Payout History ({filteredMatches.length})</h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search by winner or match ID..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              value={winnerSearchTerm}
              onChange={(e) => setWinnerSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full table-auto text-left">
            <thead>
              <tr className="text-sm text-gray-700 border-b-2 border-gray-200 bg-gray-50">
                <th className="py-4 px-4 font-semibold">Match ID</th>
                <th className="py-4 px-4 font-semibold">Winner</th>
                <th className="py-4 px-4 font-semibold">Entry Fee</th>
                <th className="py-4 px-4 font-semibold">Prize Pool</th>
                <th className="py-4 px-4 font-semibold">Admin Commission</th>
                <th className="py-4 px-4 font-semibold">Final Payout</th>
                <th className="py-4 px-4 font-semibold">Date</th>
                <th className="py-4 px-4 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredMatches.sort((a,b) => new Date(b.date) - new Date(a.date)).map((match) => (
                <tr key={match.id} className="border-b border-gray-100 hover:bg-gray-50 transition">
                  <td className="py-4 px-4 font-medium text-gray-800">{match.id}</td>
                  <td className="py-4 px-4 text-sm text-gray-600">
                    <div className="font-semibold text-blue-600">{match.winnerName}</div>
                    <div className="text-xs text-gray-500">ID: {match.winnerId}</div>
                  </td>
                  <td className="py-4 px-4 font-medium text-red-600">{formatINR(match.entryFee)}</td>
                  <td className="py-4 px-4 font-semibold text-lg text-green-600">{formatINR(match.prizePool)}</td>
                  <td className="py-4 px-4 font-semibold text-sm text-purple-600">{formatINR(match.commission)}</td>
                  <td className="py-4 px-4 font-bold text-green-600 text-lg">{formatINR(match.payout)}</td>
                  <td className="py-4 px-4 text-sm text-gray-600">{match.date}</td>
                  <td className="py-4 px-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      match.status === "Completed" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                    }`}>
                      {match.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );

  return (
    <div className="min-h-screen p-8 font-sans text-gray-800 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8 rounded-2xl p-6 bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 shadow-lg text-white">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-extrabold">💰Wallet/Winner Management</h1>
              <p className="text-sm opacity-90 mt-2">Complete wallet administration dashboard</p>
            </div>
            <div className="flex items-center gap-8">
              <button
                onClick={() => setCurrentView("dashboard")}
                className={`px-4 py-2 rounded-lg font-semibold transition ${
                  currentView === "dashboard" ? "bg-white text-gray-800 shadow-lg" : "hover:bg-white hover:text-gray-800 hover:shadow-lg opacity-80"
                }`}
              >
                Wallet mange
              </button>
              <button
                onClick={() => setCurrentView("winnerManagement")}
                className={`px-4 py-2 rounded-lg font-semibold transition ${
                  currentView === "winnerManagement" ? "bg-white text-gray-800 shadow-lg" : "hover:bg-white hover:text-gray-800 hover:shadow-lg opacity-80"
                }`}
              >
                Winner Manage
              </button>
            </div>
          </div>
        </header>

        {currentView === "dashboard" && renderDashboard()}
        {currentView === "userHistory" && renderUserHistory()}
        {currentView === "winnerManagement" && renderWinnerManagement()}
      </div>
    </div>
  );
};

export default ComprehensiveWalletSystem;
import React, { useState, useMemo } from 'react';
import { Search, Filter, Download, Check, X, Eye, Edit, Bell, Calendar, DollarSign, Users, TrendingUp, AlertTriangle } from 'lucide-react';

const WithdrawalDashboard = () => {
  // Sample data for withdrawals
  const [withdrawals, setWithdrawals] = useState([
    {
      id: 'TXN001',
      playerId: 'USR001',
      playerName: 'Rahul Sharma',
      game: 'Ludo',
      amount: 5000,
      currency: 'INR',
      paymentMethod: 'UPI',
      requestDate: '2024-09-10T10:30:00',
      status: 'Pending',
      kycStatus: 'Verified',
      adminNotes: '',
      transactionId: '',
      gateway: 'Razorpay',
      gatewayFees: 50,
      fraudFlag: false
    },
    {
      id: 'TXN002',
      playerId: 'USR002',
      playerName: 'Priya Patel',
      game: 'Lottery',
      amount: 15000,
      currency: 'INR',
      paymentMethod: 'Bank Transfer',
      requestDate: '2024-09-10T09:15:00',
      status: 'Approved',
      kycStatus: 'Verified',
      adminNotes: 'Approved after verification',
      transactionId: 'RZP123456',
      gateway: 'Razorpay',
      gatewayFees: 150,
      fraudFlag: false
    },
    {
      id: 'TXN003',
      playerId: 'USR003',
      playerName: 'Amit Kumar',
      game: 'Teen Patti',
      amount: 2500,
      currency: 'INR',
      paymentMethod: 'Wallet',
      requestDate: '2024-09-09T16:45:00',
      status: 'Rejected',
      kycStatus: 'Pending',
      adminNotes: 'KYC verification required',
      transactionId: '',
      gateway: 'Paytm',
      gatewayFees: 0,
      fraudFlag: true
    },
    {
      id: 'TXN004',
      playerId: 'USR004',
      playerName: 'Sunita Devi',
      game: 'Jackpot',
      amount: 25000,
      currency: 'INR',
      paymentMethod: 'UPI',
      requestDate: '2024-09-09T14:20:00',
      status: 'Approved',
      kycStatus: 'Verified',
      adminNotes: 'High value withdrawal approved',
      transactionId: 'RZP789012',
      gateway: 'Razorpay',
      gatewayFees: 250,
      fraudFlag: false
    },
    {
      id: 'TXN005',
      playerId: 'USR005',
      playerName: 'Vikram Singh',
      game: 'Mines',
      amount: 3500,
      currency: 'INR',
      paymentMethod: 'Bank Transfer',
      requestDate: '2024-09-08T11:30:00',
      status: 'Pending',
      kycStatus: 'Verified',
      adminNotes: '',
      transactionId: '',
      gateway: 'ICICI Bank',
      gatewayFees: 100,
      fraudFlag: false
    },
    {
      id: 'TXN006',
      playerId: 'USR006',
      playerName: 'Neha Gupta',
      game: 'Bird Shooting',
      amount: 1200,
      currency: 'INR',
      paymentMethod: 'UPI',
      requestDate: '2024-09-08T08:45:00',
      status: 'Approved',
      kycStatus: 'Verified',
      adminNotes: 'Quick approval',
      transactionId: 'RZP345678',
      gateway: 'Razorpay',
      gatewayFees: 24,
      fraudFlag: false
    }
  ]);

  // State management
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedGame, setSelectedGame] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedWithdrawals, setSelectedWithdrawals] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [amountRange, setAmountRange] = useState({ min: '', max: '' });
  const [paymentMethodFilter, setPaymentMethodFilter] = useState('all');

  // Games list
  const games = ['Ludo', 'Lottery', 'Jackpot', 'Teen Patti', 'Mines', 'Bird Shooting'];
  const statuses = ['Pending', 'Approved', 'Rejected'];
  const paymentMethods = ['UPI', 'Bank Transfer', 'Wallet'];

  // Filtered data
  const filteredWithdrawals = useMemo(() => {
    return withdrawals.filter(withdrawal => {
      const matchesSearch = withdrawal.playerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          withdrawal.playerId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          withdrawal.id.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesGame = selectedGame === 'all' || withdrawal.game === selectedGame;
      const matchesStatus = statusFilter === 'all' || withdrawal.status === statusFilter;
      const matchesPayment = paymentMethodFilter === 'all' || withdrawal.paymentMethod === paymentMethodFilter;
      
      const matchesAmount = (!amountRange.min || withdrawal.amount >= parseInt(amountRange.min)) &&
                          (!amountRange.max || withdrawal.amount <= parseInt(amountRange.max));
      
      return matchesSearch && matchesGame && matchesStatus && matchesPayment && matchesAmount;
    });
  }, [withdrawals, searchTerm, selectedGame, statusFilter, paymentMethodFilter, amountRange]);

  // Summary calculations
  const summary = useMemo(() => {
    const total = withdrawals.reduce((sum, w) => sum + w.amount, 0);
    const pending = withdrawals.filter(w => w.status === 'Pending').reduce((sum, w) => sum + w.amount, 0);
    const approved = withdrawals.filter(w => w.status === 'Approved').reduce((sum, w) => sum + w.amount, 0);
    const rejected = withdrawals.filter(w => w.status === 'Rejected').reduce((sum, w) => sum + w.amount, 0);
    
    const gameWise = games.map(game => ({
      game,
      total: withdrawals.filter(w => w.game === game).reduce((sum, w) => sum + w.amount, 0),
      count: withdrawals.filter(w => w.game === game).length
    }));

    const topUsers = Object.values(
      withdrawals.reduce((acc, w) => {
        if (!acc[w.playerId]) {
          acc[w.playerId] = { playerId: w.playerId, playerName: w.playerName, total: 0, count: 0 };
        }
        acc[w.playerId].total += w.amount;
        acc[w.playerId].count += 1;
        return acc;
      }, {})
    ).sort((a, b) => b.total - a.total).slice(0, 5);

    return { total, pending, approved, rejected, gameWise, topUsers };
  }, [withdrawals]);

  // Handle withdrawal actions
  const handleApprove = (id) => {
    setWithdrawals(prev => prev.map(w => 
      w.id === id 
        ? { ...w, status: 'Approved', transactionId: `TXN${Date.now()}`, adminNotes: 'Approved by admin' }
        : w
    ));
  };

  const handleReject = (id, reason = 'Rejected by admin') => {
    setWithdrawals(prev => prev.map(w => 
      w.id === id 
        ? { ...w, status: 'Rejected', adminNotes: reason }
        : w
    ));
  };

  const handleBulkApprove = () => {
    setWithdrawals(prev => prev.map(w => 
      selectedWithdrawals.includes(w.id) 
        ? { ...w, status: 'Approved', transactionId: `TXN${Date.now()}`, adminNotes: 'Bulk approved by admin' }
        : w
    ));
    setSelectedWithdrawals([]);
  };

  const handleBulkReject = () => {
    setWithdrawals(prev => prev.map(w => 
      selectedWithdrawals.includes(w.id) 
        ? { ...w, status: 'Rejected', adminNotes: 'Bulk rejected by admin' }
        : w
    ));
    setSelectedWithdrawals([]);
  };

  const exportData = () => {
    const csvContent = [
      ['ID', 'Player Name', 'Game', 'Amount', 'Status', 'Request Date', 'Payment Method'],
      ...filteredWithdrawals.map(w => [w.id, w.playerName, w.game, w.amount, w.status, w.requestDate, w.paymentMethod])
    ].map(row => row.join(',')).join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'withdrawals.csv';
    a.click();
  };

  // Overview Dashboard Component
  const OverviewDashboard = () => (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Withdrawals</p>
              <p className="text-3xl font-bold text-gray-900">₹{summary.total.toLocaleString()}</p>
            </div>
            <DollarSign className="h-12 w-12 text-blue-500" />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-yellow-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pending</p>
              <p className="text-3xl font-bold text-gray-900">₹{summary.pending.toLocaleString()}</p>
            </div>
            <Calendar className="h-12 w-12 text-yellow-500" />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Approved</p>
              <p className="text-3xl font-bold text-gray-900">₹{summary.approved.toLocaleString()}</p>
            </div>
            <Check className="h-12 w-12 text-green-500" />
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-red-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Rejected</p>
              <p className="text-3xl font-bold text-gray-900">₹{summary.rejected.toLocaleString()}</p>
            </div>
            <X className="h-12 w-12 text-red-500" />
          </div>
        </div>
      </div>

      {/* Game-wise Summary */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Game-wise Withdrawal Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {summary.gameWise.map(game => (
            <div key={game.game} className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium text-gray-900">{game.game}</h4>
              <p className="text-2xl font-bold text-blue-600">₹{game.total.toLocaleString()}</p>
              <p className="text-sm text-gray-600">{game.count} transactions</p>
            </div>
          ))}
        </div>
      </div>

      {/* Top Withdrawal Users */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Withdrawal Users</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Player</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Transactions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {summary.topUsers.map((user, index) => (
                <tr key={user.playerId}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="text-sm font-medium text-gray-900">{user.playerName}</div>
                      <div className="text-sm text-gray-500 ml-2">({user.playerId})</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">₹{user.total.toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  // Withdrawals Table Component
  const WithdrawalsTable = ({ data, showActions = true }) => (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {showActions && (
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <input
                    type="checkbox"
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedWithdrawals(data.map(w => w.id));
                      } else {
                        setSelectedWithdrawals([]);
                      }
                    }}
                    className="rounded border-gray-300 text-blue-600 shadow-sm"
                  />
                </th>
              )}
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Player</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Game</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment Method</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Request Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">KYC</th>
              {showActions && <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((withdrawal) => (
              <tr key={withdrawal.id} className="hover:bg-gray-50">
                {showActions && (
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="checkbox"
                      checked={selectedWithdrawals.includes(withdrawal.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedWithdrawals(prev => [...prev, withdrawal.id]);
                        } else {
                          setSelectedWithdrawals(prev => prev.filter(id => id !== withdrawal.id));
                        }
                      }}
                      className="rounded border-gray-300 text-blue-600 shadow-sm"
                    />
                  </td>
                )}
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{withdrawal.id}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{withdrawal.playerName}</div>
                  <div className="text-sm text-gray-500">{withdrawal.playerId}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{withdrawal.game}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  ₹{withdrawal.amount.toLocaleString()}
                  {withdrawal.fraudFlag && <AlertTriangle className="inline h-4 w-4 text-red-500 ml-1" />}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{withdrawal.paymentMethod}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    withdrawal.status === 'Approved' ? 'bg-green-100 text-green-800' :
                    withdrawal.status === 'Rejected' ? 'bg-red-100 text-red-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {withdrawal.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(withdrawal.requestDate).toLocaleDateString('en-IN')}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                    withdrawal.kycStatus === 'Verified' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {withdrawal.kycStatus}
                  </span>
                </td>
                {showActions && (
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      {withdrawal.status === 'Pending' && (
                        <>
                          <button
                            onClick={() => handleApprove(withdrawal.id)}
                            className="text-green-600 hover:text-green-900"
                            title="Approve"
                          >
                            <Check className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleReject(withdrawal.id)}
                            className="text-red-600 hover:text-red-900"
                            title="Reject"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </>
                      )}
                      <button className="text-blue-600 hover:text-blue-900" title="View Details">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="text-gray-600 hover:text-gray-900" title="Edit">
                        <Edit className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Withdrawal Management Dashboard</h1>
                <p className="text-gray-600 mt-1">Manage all game withdrawals from one place</p>
              </div>
              <div className="flex items-center space-x-4">
                <Bell className="h-6 w-6 text-gray-400" />
                <span className="text-sm text-gray-600">Admin Panel</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white shadow-sm">
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {[
                { key: 'overview', label: 'Overview', icon: TrendingUp },
                { key: 'all', label: 'All Transactions', icon: Users },
                { key: 'pending', label: 'Pending', icon: Calendar },
                { key: 'approved', label: 'Approved', icon: Check },
                { key: 'rejected', label: 'Rejected', icon: X }
              ].map(({ key, label, icon: Icon }) => (
                <button
                  key={key}
                  onClick={() => setActiveTab(key)}
                  className={`${
                    activeTab === key
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto px-2 sm:px-6 lg:px-4 py-4 max-w-[900px]" >
        {activeTab === 'overview' ? (
          <OverviewDashboard />
        ) : (
          <div className="space-y-6">
            {/* Filters and Search */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <input
                      type="text"
                      placeholder="Search by name, ID, or transaction..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  
                  <select
                    value={selectedGame}
                    onChange={(e) => setSelectedGame(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="all">All Games</option>
                    {games.map(game => (
                      <option key={game} value={game}>{game}</option>
                    ))}
                  </select>
                  
                  <select
                    value={paymentMethodFilter}
                    onChange={(e) => setPaymentMethodFilter(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="all">All Payment Methods</option>
                    {paymentMethods.map(method => (
                      <option key={method} value={method}>{method}</option>
                    ))}
                  </select>
                  
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    <Filter className="h-4 w-4" />
                    <span>More Filters</span>
                  </button>
                </div>
                
                <div className="flex items-center space-x-2">
                  {selectedWithdrawals.length > 0 && (
                    <>
                      <button
                        onClick={handleBulkApprove}
                        className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                      >
                        <Check className="h-4 w-4" />
                        <span>Bulk Approve ({selectedWithdrawals.length})</span>
                      </button>
                      <button
                        onClick={handleBulkReject}
                        className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                      >
                        <X className="h-4 w-4" />
                        <span>Bulk Reject ({selectedWithdrawals.length})</span>
                      </button>
                    </>
                  )}
                  <button
                    onClick={exportData}
                    className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    <Download className="h-4 w-4" />
                    <span>Export</span>
                  </button>
                </div>
              </div>
              
              {/* Advanced Filters */}
              {showFilters && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Date Range</label>
                      <div className="flex space-x-2">
                        <input
                          type="date"
                          value={dateRange.start}
                          onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
                          className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">KYC Status</label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500">
                        <option value="all">All KYC Status</option>
                        <option value="verified">Verified</option>
                        <option value="pending">Pending</option>
                        <option value="rejected">Rejected</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Fraud Flag</label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500">
                        <option value="all">All Records</option>
                        <option value="flagged">Flagged Only</option>
                        <option value="clean">Clean Only</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Results Summary */}
            <div className="bg-white p-4 rounded-lg shadow-md">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-6">
                  <div className="text-sm text-gray-600">
                    <span className="font-medium">{filteredWithdrawals.length}</span> withdrawals found
                  </div>
                  <div className="text-sm text-gray-600">
                    Total Amount: <span className="font-medium">₹{filteredWithdrawals.reduce((sum, w) => sum + w.amount, 0).toLocaleString()}</span>
                  </div>
                  {activeTab !== 'all' && (
                    <div className="text-sm text-gray-600">
                      Status: <span className="font-medium capitalize">{activeTab}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Withdrawals Table */}
            <WithdrawalsTable 
              data={filteredWithdrawals.filter(w => {
                if (activeTab === 'all') return true;
                if (activeTab === 'pending') return w.status === 'Pending';
                if (activeTab === 'approved') return w.status === 'Approved';
                if (activeTab === 'rejected') return w.status === 'Rejected';
                return true;
              })} 
            />

            {/* Game-wise Tabs */}
            <div className="bg-white rounded-lg shadow-md">
              <div className="border-b border-gray-200">
                <nav className="flex space-x-8 px-6">
                  {['All Games', ...games].map((game) => (
                    <button
                      key={game}
                      onClick={() => setSelectedGame(game === 'All Games' ? 'all' : game)}
                      className={`${
                        (game === 'All Games' && selectedGame === 'all') || selectedGame === game
                          ? 'border-blue-500 text-blue-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                    >
                      {game}
                      <span className="ml-2 bg-gray-100 text-gray-600 py-1 px-2 rounded-full text-xs">
                        {game === 'All Games' 
                          ? withdrawals.length 
                          : withdrawals.filter(w => w.game === game).length
                        }
                      </span>
                    </button>
                  ))}
                </nav>
              </div>
              
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                  {statuses.map(status => {
                    const count = withdrawals.filter(w => 
                      (selectedGame === 'all' || w.game === selectedGame) && w.status === status
                    ).length;
                    const amount = withdrawals
                      .filter(w => (selectedGame === 'all' || w.game === selectedGame) && w.status === status)
                      .reduce((sum, w) => sum + w.amount, 0);
                    
                    return (
                      <div key={status} className={`p-4 rounded-lg border-l-4 ${
                        status === 'Pending' ? 'border-yellow-500 bg-yellow-50' :
                        status === 'Approved' ? 'border-green-500 bg-green-50' :
                        'border-red-500 bg-red-50'
                      }`}>
                        <h4 className="font-medium text-gray-900">{status}</h4>
                        <p className="text-2xl font-bold text-gray-900">{count}</p>
                        <p className="text-sm text-gray-600">₹{amount.toLocaleString()}</p>
                      </div>
                    );
                  })}
                  
                  <div className="p-4 rounded-lg border-l-4 border-blue-500 bg-blue-50">
                    <h4 className="font-medium text-gray-900">Total</h4>
                    <p className="text-2xl font-bold text-gray-900">
                      {withdrawals.filter(w => selectedGame === 'all' || w.game === selectedGame).length}
                    </p>
                    <p className="text-sm text-gray-600">
                      ₹{withdrawals
                        .filter(w => selectedGame === 'all' || w.game === selectedGame)
                        .reduce((sum, w) => sum + w.amount, 0)
                        .toLocaleString()
                      }
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Method Analysis */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Method Analysis</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {paymentMethods.map(method => {
                  const methodWithdrawals = withdrawals.filter(w => w.paymentMethod === method);
                  const totalAmount = methodWithdrawals.reduce((sum, w) => sum + w.amount, 0);
                  const totalFees = methodWithdrawals.reduce((sum, w) => sum + w.gatewayFees, 0);
                  
                  return (
                    <div key={method} className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-medium text-gray-900 mb-2">{method}</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Transactions:</span>
                          <span className="text-sm font-medium">{methodWithdrawals.length}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Total Amount:</span>
                          <span className="text-sm font-medium">₹{totalAmount.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Gateway Fees:</span>
                          <span className="text-sm font-medium">₹{totalFees.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Success Rate:</span>
                          <span className="text-sm font-medium">
                            {methodWithdrawals.length > 0 
                              ? Math.round((methodWithdrawals.filter(w => w.status === 'Approved').length / methodWithdrawals.length) * 100)
                              : 0
                            }%
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Recent Activity & Alerts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
                <div className="space-y-4">
                  {withdrawals.slice(0, 5).map(withdrawal => (
                    <div key={withdrawal.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{withdrawal.playerName}</p>
                        <p className="text-xs text-gray-500">{withdrawal.game} - ₹{withdrawal.amount.toLocaleString()}</p>
                      </div>
                      <div className="text-right">
                        <p className={`text-xs font-medium ${
                          withdrawal.status === 'Approved' ? 'text-green-600' :
                          withdrawal.status === 'Rejected' ? 'text-red-600' :
                          'text-yellow-600'
                        }`}>
                          {withdrawal.status}
                        </p>
                        <p className="text-xs text-gray-500">
                          {new Date(withdrawal.requestDate).toLocaleDateString('en-IN')}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Alerts & Notifications</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3 p-3 bg-yellow-50 border-l-4 border-yellow-400 rounded">
                    <AlertTriangle className="h-5 w-5 text-yellow-400 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">High Value Withdrawal</p>
                      <p className="text-xs text-gray-600">Sunita Devi requested ₹25,000 withdrawal</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3 p-3 bg-red-50 border-l-4 border-red-400 rounded">
                    <AlertTriangle className="h-5 w-5 text-red-400 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Fraud Alert</p>
                      <p className="text-xs text-gray-600">Amit Kumar's withdrawal flagged for review</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3 p-3 bg-blue-50 border-l-4 border-blue-400 rounded">
                    <Bell className="h-5 w-5 text-blue-400 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Daily Summary</p>
                      <p className="text-xs text-gray-600">15 pending withdrawals need attention</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3 p-3 bg-green-50 border-l-4 border-green-400 rounded">
                    <Check className="h-5 w-5 text-green-400 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">System Update</p>
                      <p className="text-xs text-gray-600">Payment gateway integration successful</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Audit Log */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Audit Log</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Timestamp</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Admin</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Withdrawal ID</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Notes</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">2024-09-10 15:30</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Admin_001</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                          Approved
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">TXN002</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">KYC verified, approved</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">2024-09-10 14:15</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Admin_002</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">
                          Rejected
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">TXN003</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">KYC pending, requires verification</td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">2024-09-10 12:45</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Admin_001</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                          Approved
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">TXN004</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">High value withdrawal approved after review</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Reporting Section */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Reports & Analytics</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left">
                  <h4 className="font-medium text-gray-900">Daily Report</h4>
                  <p className="text-sm text-gray-600 mt-1">Today's withdrawal summary</p>
                </button>
                
                <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left">
                  <h4 className="font-medium text-gray-900">Weekly Report</h4>
                  <p className="text-sm text-gray-600 mt-1">Last 7 days analysis</p>
                </button>
                
                <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left">
                  <h4 className="font-medium text-gray-900">Monthly Report</h4>
                  <p className="text-sm text-gray-600 mt-1">Current month overview</p>
                </button>
                
                <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left">
                  <h4 className="font-medium text-gray-900">Custom Report</h4>
                  <p className="text-sm text-gray-600 mt-1">Generate custom reports</p>
                </button>
              </div>
            </div>

            {/* Footer Statistics */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div>
                  <p className="text-3xl font-bold text-blue-600">{withdrawals.length}</p>
                  <p className="text-sm text-gray-600">Total Requests</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-green-600">
                    {Math.round((withdrawals.filter(w => w.status === 'Approved').length / withdrawals.length) * 100)}%
                  </p>
                  <p className="text-sm text-gray-600">Success Rate</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-yellow-600">
                    ₹{(withdrawals.reduce((sum, w) => sum + w.amount, 0) / withdrawals.length).toFixed(0)}
                  </p>
                  <p className="text-sm text-gray-600">Avg. Amount</p>
                </div>
                <div>
                  <p className="text-3xl font-bold text-purple-600">
                    {Math.round(withdrawals.reduce((sum, w) => sum + w.gatewayFees, 0))}
                  </p>
                  <p className="text-sm text-gray-600">Total Fees</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WithdrawalDashboard;
                    //     />
                    //     <input
                    //       type="date"
                    //       value={dateRange.end}
                    //       onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
                    //       className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    //     />
                    //   </div>
                    // </div>
                    
                    // <div>
                    //   <label className="block text-sm font-medium text-gray-700 mb-1">Amount Range</label>
                    //   <div className="flex space-x-2">
                    //     <input
                    //       type="number"
                    //       placeholder="Min"
                    //       value={amountRange.min}
                    //       onChange={(e) => setAmountRange(prev => ({ ...prev, min: e.target.value }))}
                    //       className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    //     />
                    //     <input
                    //       type="number"
                    //       placeholder="Max"
                    //       value={amountRange.max}
                    //       onChange={(e) => setAmountRange(prev => ({ ...prev, max: e.target.value }))}
                    //       className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
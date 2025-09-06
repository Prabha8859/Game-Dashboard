import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  Wallet, TrendingUp, Trophy, DollarSign, RefreshCw, CheckCircle, XCircle, Plus, Eye, Download,
  Search, Users, CreditCard, AlertTriangle, Calendar
} from 'lucide-react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

// Sample system health data (replace with API call in production)
const initialSystemHealth = {
  autoCredit: { status: 'Operational', lastRun: '2025-09-06 14:30', count: 120, description: 'Winner wallet auto-credit', uptime: 99.8 },
  paymentGateway: { status: 'Operational', uptime: 99.9, lastCheck: '2025-09-06 14:45', description: 'UPI, Cards, Net Banking' },
  withdrawalProcessor: { status: 'Operational', processed: 50, pending: 2, description: 'Bank transfers & UPI', uptime: 99.7 },
  ticketGenerator: { status: 'Operational', generated: 2500, today: 300, description: 'Unique ticket creation', uptime: 100 },
  walletSync: { status: 'Operational', lastSync: '2025-09-06 14:40', synced: 1800, description: 'Balance updates', uptime: 99.9 },
  notifications: { status: 'Operational', sent: 500, failed: 0, description: 'SMS, Email, Push', uptime: 99.8 },
  backupSystem: { status: 'Operational', lastBackup: '2025-09-06 02:00', size: '1.2GB', description: 'Data protection', uptime: 100 },
  antifraud: { status: 'Operational', flagged: 10, blocked: 2, description: 'Security monitoring', uptime: 99.9 },
};

const systemIcons = {
  autoCredit: Trophy,
  paymentGateway: CreditCard,
  withdrawalProcessor: Wallet,
  ticketGenerator: RefreshCw,
  walletSync: RefreshCw,
  notifications: AlertTriangle,
  backupSystem: Download,
  antifraud: AlertTriangle,
};

// Reusable Modal Component
const Modal = ({ isOpen, onClose, title, icon: Icon, children, gradient, maxWidth = 'max-w-md' }) => {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" role="dialog" aria-modal="true">
      <div className={`bg-white rounded-xl shadow-2xl ${maxWidth} w-full max-h-[90vh] overflow-y-auto`}>
        <div className={`p-6 rounded-t-xl ${gradient}`}>
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <Icon className="h-6 w-6 text-white" />
              <h3 className="text-xl font-bold text-white">{title}</h3>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:bg-white/20 p-2 rounded-lg transition-colors duration-200"
              aria-label="Close modal"
            >
              <XCircle className="h-5 w-5" />
            </button>
          </div>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};

// Transaction Details Modal
const TransactionDetailsModal = ({ isOpen, onClose, transaction }) => {
  if (!transaction) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Transaction Details"
      icon={Eye}
      gradient="bg-gradient-to-r from-blue-600 to-purple-600"
    >
      <div className="space-y-4">
        <p><strong>Transaction ID:</strong> {transaction.id}</p>
        <p><strong>Type:</strong> {transaction.type}</p>
        <p><strong>User:</strong> {transaction.user}</p>
        <p><strong>Amount:</strong> ₹{transaction.amount.toLocaleString()}</p>
        <p><strong>Date:</strong> {transaction.date}</p>
        <p><strong>Status:</strong> {transaction.status}</p>
        <p><strong>Lottery ID:</strong> {transaction.lotteryId}</p>
        <p><strong>Notes:</strong> {transaction.notes || 'No additional notes'}</p>
      </div>
      <div className="flex justify-end mt-6">
        <button
          onClick={onClose}
          className="bg-gray-200 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors duration-200"
        >
          Close
        </button>
      </div>
    </Modal>
  );
};

// System Health Modal Component
const SystemHealthModal = ({ isOpen, onClose }) => {
  const [systemHealth, setSystemHealth] = useState(initialSystemHealth);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    // Simulate API call to refresh data
    setTimeout(() => {
      setSystemHealth(initialSystemHealth); // Replace with actual API call
      setIsRefreshing(false);
    }, 1000);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="System Health Monitor"
      icon={CheckCircle}
      gradient="bg-gradient-to-r from-green-600 to-blue-600"
      maxWidth="max-w-5xl"
    >
       <div className="mt-8 bg-white rounded-xl p-6 shadow-sm mb-5">
        <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center space-x-2">
          <TrendingUp className="h-5 w-5 text-green-600" />
          <span>System Performance Summary</span>
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">1,847</div>
            <div className="text-sm text-gray-600">Transactions Today</div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">₹2.5L</div>
            <div className="text-sm text-gray-600">Revenue Today</div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-2xl font-bold text-orange-600">8</div>
            <div className="text-sm text-gray-600">Active Services</div>
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center mb-6">
        <p className="text-gray-600">Real-time system status and performance</p>
        <button
          onClick={handleRefresh}
          disabled={isRefreshing}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2 disabled:opacity-50"
        >
          <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
          <span>Refresh Data</span>
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.entries(systemHealth).map(([key, data]) => {
          const Icon = systemIcons[key] || Trophy;
          return (
            <div
              key={key}
              className="bg-white rounded-xl p-6 border border-green-200 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-green-600 rounded-lg">
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">{key.replace(/([A-Z])/g, ' $1').trim()}</h4>
                    <p className="text-sm text-gray-600">{data.description}</p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${data.status === 'Operational' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {data.status}
                </span>
              </div>
              <div className="space-y-2 text-sm">
                {Object.entries(data).filter(([field]) => field !== 'status' && field !== 'description').map(([field, value]) => (
                  <div key={field} className="flex justify-between">
                    <span className="font-medium">{field.replace(/([A-Z])/g, ' $1').trim()}:</span>
                    <span>{value}</span>
                  </div>
                ))}
                {data.uptime && (
                  <div className="mt-4">
                    <p className="text-sm font-medium text-gray-600">Uptime: {data.uptime}%</p>
                    <div className="w-full bg-gray-200 rounded-full h-2.5 mt-1">
                      <div
                        className="bg-green-600 h-2.5 rounded-full"
                        style={{ width: `${data.uptime}%` }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
     
    </Modal>
  );
};

// Refund Modal Component
const RefundModal = ({ isOpen, onClose }) => {
  const [ticketNumber, setTicketNumber] = useState('');
  const [amount, setAmount] = useState('');
  const [reason, setReason] = useState('');
  const [error, setError] = useState('');
  const [showConfirm, setShowConfirm] = useState(false);

  const handleSubmit = () => {
    if (!ticketNumber || !amount || !reason) {
      setError('All fields are required.');
      return;
    }
    if (!/TKT-\d{4}-\d{6}/.test(ticketNumber)) {
      setError('Invalid ticket number format (e.g., TKT-2024-001234).');
      return;
    }
    if (parseFloat(amount) <= 0) {
      setError('Amount must be greater than 0.');
      return;
    }
    setShowConfirm(true);
  };

  const confirmRefund = () => {
    // Simulate API call (replace with actual fetch)
    console.log('Processing refund:', { ticketNumber, amount, reason });
    setError('');
    setShowConfirm(false);
    onClose();
  };

  return (
    <>
      <Modal
        isOpen={isOpen && !showConfirm}
        onClose={onClose}
        title="Process Ticket Refund"
        icon={RefreshCw}
        gradient="bg-gradient-to-r from-red-600 to-pink-600"
      >
        {error && <p className="text-red-600 mb-4">{error}</p>}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Ticket Number</label>
            <input
              type="text"
              value={ticketNumber}
              onChange={(e) => setTicketNumber(e.target.value)}
              placeholder="Enter Ticket Number (e.g., TKT-2024-001234)"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              aria-required="true"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Refund Amount</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount to refund"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              aria-required="true"
              min="0.01"
              step="0.01"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Reason for Refund</label>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Explain the reason for refund..."
              rows="4"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 resize-none"
              aria-required="true"
            />
          </div>
        </div>
        <div className="flex space-x-4 mt-8">
          <button
            onClick={onClose}
            className="flex-1 bg-gray-200 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-300 font-medium transition-colors duration-200"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="flex-1 bg-gradient-to-r from-red-600 to-pink-600 text-white py-3 px-4 rounded-lg hover:from-red-700 hover:to-pink-700 font-medium transition-all duration-200 transform hover:scale-105"
          >
            Process Refund
          </button>
        </div>
      </Modal>
      <Modal
        isOpen={showConfirm}
        onClose={() => setShowConfirm(false)}
        title="Confirm Refund"
        icon={AlertTriangle}
        gradient="bg-gradient-to-r from-yellow-600 to-orange-600"
      >
        <p className="text-gray-600 mb-4">Are you sure you want to process this refund?</p>
        <p><strong>Ticket Number:</strong> {ticketNumber}</p>
        <p><strong>Amount:</strong> ₹{amount}</p>
        <p><strong>Reason:</strong> {reason}</p>
        <div className="flex space-x-4 mt-6">
          <button
            onClick={() => setShowConfirm(false)}
            className="flex-1 bg-gray-200 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors duration-200"
          >
            Cancel
          </button>
          <button
            onClick={confirmRefund}
            className="flex-1 bg-gradient-to-r from-red-600 to-pink-600 text-white py-2 px-4 rounded-lg hover:from-red-700 hover:to-pink-700 transition-colors duration-200"
          >
            Confirm
          </button>
        </div>
      </Modal>
    </>
  );
};

// Manual Adjustment Modal Component
const ManualAdjustmentModal = ({ isOpen, onClose }) => {
  const [userId, setUserId] = useState('');
  const [action, setAction] = useState('');
  const [amount, setAmount] = useState('');
  const [reason, setReason] = useState('');
  const [error, setError] = useState('');
  const [showConfirm, setShowConfirm] = useState(false);

  const handleSubmit = () => {
    if (!userId || !action || !amount || !reason) {
      setError('All fields are required.');
      return;
    }
    if (parseFloat(amount) <= 0) {
      setError('Amount must be greater than 0.');
      return;
    }
    setShowConfirm(true);
  };

  const confirmAdjustment = () => {
    // Simulate API call (replace with actual fetch)
    console.log('Adjusting wallet:', { userId, action, amount, reason });
    setError('');
    setShowConfirm(false);
    onClose();
  };

  return (
    <>
      <Modal
        isOpen={isOpen && !showConfirm}
        onClose={onClose}
        title="Manual Wallet Adjustment"
        icon={Plus}
        gradient="bg-gradient-to-r from-yellow-600 to-orange-600"
      >
        {error && <p className="text-red-600 mb-4">{error}</p>}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">User ID / Phone Number</label>
            <input
              type="text"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              placeholder="Enter User ID or Phone Number"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              aria-required="true"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Action Type</label>
            <select
              value={action}
              onChange={(e) => setAction(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              aria-required="true"
            >
              <option value="">Select Action</option>
              <option value="add">Add Amount (Credit)</option>
              <option value="deduct">Deduct Amount (Debit)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Amount</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter Amount (₹)"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              aria-required="true"
              min="0.01"
              step="0.01"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Reason for Adjustment</label>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Explain the reason for wallet adjustment..."
              rows="3"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 resize-none"
              aria-required="true"
            />
          </div>
        </div>
        <div className="flex space-x-4 mt-8">
          <button
            onClick={onClose}
            className="flex-1 bg-gray-200 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-300 font-medium transition-colors duration-200"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="flex-1 bg-gradient-to-r from-yellow-600 to-orange-600 text-white py-3 px-4 rounded-lg hover:from-yellow-700 hover:to-orange-700 font-medium transition-all duration-200 transform hover:scale-105"
          >
            Adjust Wallet
          </button>
        </div>
      </Modal>
      <Modal
        isOpen={showConfirm}
        onClose={() => setShowConfirm(false)}
        title="Confirm Adjustment"
        icon={AlertTriangle}
        gradient="bg-gradient-to-r from-yellow-600 to-orange-600"
      >
        <p className="text-gray-600 mb-4">Are you sure you want to adjust this wallet?</p>
        <p><strong>User ID:</strong> {userId}</p>
        <p><strong>Action:</strong> {action === 'add' ? 'Credit' : 'Debit'}</p>
        <p><strong>Amount:</strong> ₹{amount}</p>
        <p><strong>Reason:</strong> {reason}</p>
        <div className="flex space-x-4 mt-6">
          <button
            onClick={() => setShowConfirm(false)}
            className="flex-1 bg-gray-200 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors duration-200"
          >
            Cancel
          </button>
          <button
            onClick={confirmAdjustment}
            className="flex-1 bg-gradient-to-r from-yellow-600 to-orange-600 text-white py-2 px-4 rounded-lg hover:from-yellow-700 hover:to-orange-700 transition-colors duration-200"
          >
            Confirm
          </button>
        </div>
      </Modal>
    </>
  );
};

// Main Component
const LotteryUserControlsPage = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [showRefundModal, setShowRefundModal] = useState(false);
  const [showAdjustModal, setShowAdjustModal] = useState(false);
  const [showSystemHealthModal, setShowSystemHealthModal] = useState(false);
  const [showTransactionDetails, setShowTransactionDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sortColumn, setSortColumn] = useState('date');
  const [sortDirection, setSortDirection] = useState('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Sample data (replace with API calls)
  const [dashboardStats, setDashboardStats] = useState({
    totalRevenue: 125000,
    totalPrize: 87500,
    adminProfit: 37500,
    activeLotteries: 3,
    totalTicketsSold: 2500,
    pendingWithdrawals: 5,
  });

  const [lotteryData, setLotteryData] = useState([
    {
      id: 'LOT001',
      name: 'Daily Jackpot',
      ticketPrice: 50,
      soldTickets: 800,
      totalCollection: 40000,
      prizePool: 28000,
      adminShare: 12000,
      status: 'Active',
      drawDate: '2025-09-07',
    },
    {
      id: 'LOT002',
      name: 'Weekly Mega',
      ticketPrice: 100,
      soldTickets: 500,
      totalCollection: 50000,
      prizePool: 35000,
      adminShare: 15000,
      status: 'Completed',
      drawDate: '2025-09-05',
    },
  ]);

  const [transactions, setTransactions] = useState([
    {
      id: 'TXN001',
      type: 'Ticket Sale',
      amount: 2500,
      date: '2025-09-06 14:30',
      status: 'Completed',
      user: 'Rahul Kumar',
      lotteryId: 'LOT001',
      notes: 'Purchased 50 tickets',
    },
    {
      id: 'TXN002',
      type: 'Winner Payout',
      amount: 15000,
      date: '2025-09-05 18:45',
      status: 'Completed',
      user: 'Priya Sharma',
      lotteryId: 'LOT002',
      notes: 'First prize winner',
    },
    {
      id: 'TXN003',
      type: 'Admin Profit Transfer',
      amount: 5000,
      date: '2025-09-05 19:00',
      status: 'Completed',
      user: 'Admin',
      lotteryId: 'LOT002',
      notes: 'Monthly profit transfer',
    },
    {
      id: 'TXN004',
      type: 'Withdraw Request',
      amount: 8000,
      date: '2025-09-06 16:20',
      status: 'Pending',
      user: 'Amit Singh',
      lotteryId: 'LOT001',
      notes: 'User requested withdrawal',
    },
  ]);

  const [winners, setWinners] = useState([
    {
      id: 'WIN001',
      name: 'Priya Sharma',
      ticketNo: 'TKT-2024-001205',
      prizeAmount: 15000,
      creditDate: '2025-09-05 18:45',
      lotteryId: 'LOT002',
      status: 'Credited',
    },
    {
      id: 'WIN002',
      name: 'Amit Singh',
      ticketNo: 'TKT-2024-001087',
      prizeAmount: 8000,
      creditDate: '2025-09-04 20:15',
      lotteryId: 'LOT001',
      status: 'Credited',
    },
  ]);

  const [withdrawRequests, setWithdrawRequests] = useState([
    {
      id: 'WDR001',
      userName: 'Amit Singh',
      amount: 8000,
      requestDate: '2025-09-06 16:20',
      status: 'Pending',
      bankDetails: 'HDFC Bank - ****4567',
    },
    {
      id: 'WDR002',
      userName: 'Rohit Gupta',
      amount: 5500,
      requestDate: '2025-09-06 10:30',
      status: 'Pending',
      bankDetails: 'SBI Bank - ****8901',
    },
  ]);

  useEffect(() => {
    // Simulate API fetch
    setTimeout(() => {
      // In real app, use fetch('/api/data').then(...)
      setLoading(false);
    }, 1000);
  }, []);

  const getStatusColor = useCallback((status) => {
    switch (status) {
      case 'Completed':
      case 'Credited':
      case 'Approved':
        return 'text-green-600 bg-green-100';
      case 'Pending':
        return 'text-yellow-600 bg-yellow-100';
      case 'Failed':
      case 'Rejected':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  }, []);

  const filteredTransactions = useMemo(() => {
    return transactions.filter((txn) => {
      const matchesSearch =
        txn.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
        txn.id.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'all' || txn.status === statusFilter;
      const matchesDate =
        (!dateRange.start || new Date(txn.date) >= new Date(dateRange.start)) &&
        (!dateRange.end || new Date(txn.date) <= new Date(dateRange.end));
      return matchesSearch && matchesStatus && matchesDate;
    });
  }, [transactions, searchTerm, statusFilter, dateRange]);

  const sortedTransactions = useMemo(() => {
    return [...filteredTransactions].sort((a, b) => {
      let aValue = a[sortColumn];
      let bValue = b[sortColumn];
      if (sortColumn === 'amount') {
        aValue = parseFloat(aValue);
        bValue = parseFloat(bValue);
      } else if (sortColumn === 'date') {
        aValue = new Date(aValue);
        bValue = new Date(bValue);
      }
      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }, [filteredTransactions, sortColumn, sortDirection]);

  const paginatedTransactions = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return sortedTransactions.slice(start, start + itemsPerPage);
  }, [sortedTransactions, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);

  const handleSort = (column) => {
    if (column === sortColumn) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const totalAmount = useMemo(() => {
    return filteredTransactions.reduce((sum, txn) => sum + txn.amount, 0);
  }, [filteredTransactions]);

  const handleApproveWithdraw = (id) => {
    setWithdrawRequests((prev) =>
      prev.map((req) => (req.id === id ? { ...req, status: 'Approved' } : req))
    );
  };

  const handleRejectWithdraw = (id) => {
    setWithdrawRequests((prev) =>
      prev.map((req) => (req.id === id ? { ...req, status: 'Rejected' } : req))
    );
  };

  const chartData = {
    labels: lotteryData.map((l) => l.name),
    datasets: [
      {
        label: 'Total Collection',
        data: lotteryData.map((l) => l.totalCollection),
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
        borderColor: 'rgb(59, 130, 246)',
        borderWidth: 1,
      },
      {
        label: 'Prize Pool',
        data: lotteryData.map((l) => l.prizePool),
        backgroundColor: 'rgba(34, 197, 94, 0.5)',
        borderColor: 'rgb(34, 197, 94)',
        borderWidth: 1,
      },
      {
        label: 'Admin Share',
        data: lotteryData.map((l) => l.adminShare),
        backgroundColor: 'rgba(139, 92, 246, 0.5)',
        borderColor: 'rgb(139, 92, 246)',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Amount (₹)',
        },
      },
    },
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="text-2xl font-bold text-blue-600 animate-pulse">Loading Dashboard...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-lg border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg">
                <Wallet className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Lottery Admin Dashboard</h1>
                <p className="text-gray-600">Complete Wallet & Revenue Management</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Last Updated</p>
              <p className="font-medium text-gray-900">{new Date().toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            { label: 'Total Revenue', value: `₹${dashboardStats.totalRevenue.toLocaleString()}`, icon: TrendingUp, color: 'blue-500' },
            { label: 'Total Prize Pool', value: `₹${dashboardStats.totalPrize.toLocaleString()}`, icon: Trophy, color: 'green-500' },
            { label: 'Admin Profit', value: `₹${dashboardStats.adminProfit.toLocaleString()}`, icon: DollarSign, color: 'purple-500' },
            { label: 'Pending Withdrawals', value: dashboardStats.pendingWithdrawals, icon: AlertTriangle, color: 'orange-500' },
          ].map((stat, index) => (
            <div
              key={index}
              className={`bg-white rounded-xl shadow-lg p-6 border-l-4 border-${stat.color} hover:shadow-xl transition-shadow duration-200 transform hover:-translate-y-1`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className={`text-3xl font-bold text-${stat.color}`}>{stat.value}</p>
                </div>
                <stat.icon className={`h-12 w-12 text-${stat.color}`} />
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-xl shadow-lg mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6" aria-label="Tabs">
              {[
                { id: 'overview', name: 'Revenue Overview', icon: TrendingUp },
                { id: 'transactions', name: 'Transactions', icon: CreditCard },
                { id: 'winners', name: 'Winners', icon: Trophy },
                { id: 'withdrawals', name: 'Withdrawals', icon: Wallet },
                { id: 'controls', name: 'Admin Controls', icon: RefreshCw },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 transition-colors duration-200`}
                  aria-current={activeTab === tab.id ? 'page' : undefined}
                >
                  <tab.icon className="h-5 w-5" />
                  <span>{tab.name}</span>
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {/* Revenue Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Revenue Split Per Lottery</h2>
                <div className="grid gap-6">
                  {lotteryData.map((lottery) => (
                    <div
                      key={lottery.id}
                      className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow duration-200"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-gray-900">{lottery.name}</h3>
                          <p className="text-gray-600">Lottery ID: {lottery.id}</p>
                          <p className="text-sm text-gray-500">Draw Date: {lottery.drawDate}</p>
                        </div>
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium ${
                            lottery.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {lottery.status}
                        </span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        {[
                          { label: 'Total Collection', value: `₹${lottery.totalCollection.toLocaleString()}`, subtext: `${lottery.soldTickets} tickets × ₹${lottery.ticketPrice}`, color: 'blue-600' },
                          { label: 'Prize Pool (70%)', value: `₹${lottery.prizePool.toLocaleString()}`, color: 'green-600' },
                          { label: 'Admin Share (30%)', value: `₹${lottery.adminShare.toLocaleString()}`, color: 'purple-600' },
                          { label: 'Tickets Sold', value: lottery.soldTickets, color: 'gray-900' },
                        ].map((item, index) => (
                          <div key={index} className="bg-white rounded-lg p-4 hover:bg-gray-50 transition-colors duration-200">
                            <p className="text-sm text-gray-600">{item.label}</p>
                            <p className={`text-2xl font-bold text-${item.color}`}>{item.value}</p>
                            {item.subtext && <p className="text-xs text-gray-500">{item.subtext}</p>}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Revenue Chart</h3>
                  <Bar data={chartData} options={chartOptions} />
                </div>
              </div>
            )}

            {/* Transactions Tab */}
            {activeTab === 'transactions' && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-gray-900">Wallet Transactions</h2>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2 transition-colors duration-200">
                    <Download className="h-4 w-4" />
                    <span>Export as CSV</span>
                  </button>
                </div>
                <div className="flex flex-wrap gap-4 bg-gray-50 p-4 rounded-lg ">
                  <div className="flex items-center space-x-2 flex-1">
                    <Search className="h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search by user or transaction ID..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      aria-label="Search transactions"
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-5 w-5 text-gray-400" />
                    <input
                      type="date"
                      value={dateRange.start}
                      onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      aria-label="Start date"
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-5 w-5 text-gray-400" />
                    <input
                      type="date"
                      value={dateRange.end}
                      onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      aria-label="End date"
                    />
                  </div>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    aria-label="Filter by status"
                  >
                    <option value="all">All Status</option>
                    <option value="Completed">Completed</option>
                    <option value="Pending">Pending</option>
                    <option value="Failed">Failed</option>
                  </select>
                  <select
                    value={itemsPerPage}
                    onChange={(e) => setItemsPerPage(Number(e.target.value))}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    aria-label="Items per page"
                  >
                    <option value={5}>5 per page</option>
                    <option value={10}>10 per page</option>
                    <option value={20}>20 per page</option>
                  </select>
                </div>
                <div className="bg-white rounded-lg overflow-hidden shadow-lg overflow-x-auto max-w-[140vh]">
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50 sticky top-0">
                        <tr>
                          {[
                            { key: 'id', label: 'Transaction ID' },
                            { key: 'type', label: 'Type' },
                            { key: 'user', label: 'User' },
                            { key: 'amount', label: 'Amount' },
                            { key: 'date', label: 'Date & Time' },
                            { key: 'status', label: 'Status' },
                            { key: 'notes', label: 'Notes' },
                            { key: 'actions', label: 'Actions' },
                          ].map((header) => (
                            <th
                              key={header.key}
                              className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${header.key !== 'actions' ? 'cursor-pointer' : ''}`}
                              onClick={() => header.key !== 'actions' && handleSort(header.key)}
                            >
                              {header.label} {sortColumn === header.key && (sortDirection === 'asc' ? '↑' : '↓')}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {paginatedTransactions.map((transaction, index) => (
                          <tr key={transaction.id} className={`hover:bg-gray-50 transition-colors ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{transaction.id}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{transaction.type}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{transaction.user}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-green-600">
                              ₹{transaction.amount.toLocaleString()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{transaction.date}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(transaction.status)}`}>
                                {transaction.status}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{transaction.notes}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              <button
                                onClick={() => setShowTransactionDetails(transaction)}
                                className="text-blue-600 hover:text-blue-900 mr-3"
                                aria-label="View transaction details"
                              >
                                <Eye className="h-4 w-4" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="flex justify-between items-center mt-4">
                  <button
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="bg-gray-200 text-gray-700 py-2 px-4 rounded-lg disabled:opacity-50 hover:bg-gray-300 transition-colors duration-200"
                  >
                    Previous
                  </button>
                  <span>Page {currentPage} of {totalPages}</span>
                  <button
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="bg-gray-200 text-gray-700 py-2 px-4 rounded-lg disabled:opacity-50 hover:bg-gray-300 transition-colors duration-200"
                  >
                    Next
                  </button>
                </div>
                <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm font-medium text-gray-700">
                    Total Amount in Filtered Transactions: <span className="font-bold text-green-600">₹{totalAmount.toLocaleString()}</span>
                  </p>
                </div>
              </div>
            )}

            {/* Winners Tab */}
            {activeTab === 'winners' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900">Prize Distribution & Winners</h2>
                <div className="grid gap-4">
                  {winners.map((winner) => (
                    <div
                      key={winner.id}
                      className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow duration-200"
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex items-center space-x-4">
                          <div className="p-3 bg-green-100 rounded-full">
                            <Trophy className="h-8 w-8 text-green-600" />
                          </div>
                          <div>
                            <h3 className="text-xl font-bold text-gray-900">{winner.name}</h3>
                            <p className="text-gray-600">Ticket: {winner.ticketNo}</p>
                            <p className="text-sm text-gray-500">Lottery: {winner.lotteryId}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-green-600">₹{winner.prizeAmount.toLocaleString()}</p>
                          <p className="text-sm text-gray-500">Credited: {winner.creditDate}</p>
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(winner.status)}`}>
                            {winner.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Withdrawals Tab */}
            {activeTab === 'withdrawals' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900">Withdrawal Requests</h2>
                <div className="grid gap-4">
                  {withdrawRequests.map((request) => (
                    <div
                      key={request.id}
                      className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-lg transition-shadow duration-200"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-lg font-bold text-gray-900">{request.userName}</h3>
                          <p className="text-gray-600">Request ID: {request.id}</p>
                          <p className="text-sm text-gray-500">Bank: {request.bankDetails}</p>
                          <p className="text-sm text-gray-500">Requested: {request.requestDate}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-blue-600">₹{request.amount.toLocaleString()}</p>
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(request.status)}`}>
                            {request.status}
                          </span>
                          {request.status === 'Pending' && (
                            <div className="flex space-x-2 mt-3">
                              <button
                                onClick={() => handleApproveWithdraw(request.id)}
                                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center space-x-1 text-sm transition-colors duration-200"
                                aria-label="Approve withdrawal"
                              >
                                <CheckCircle className="h-4 w-4" />
                                <span>Approve</span>
                              </button>
                              <button
                                onClick={() => handleRejectWithdraw(request.id)}
                                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 flex items-center space-x-1 text-sm transition-colors duration-200"
                                aria-label="Reject withdrawal"
                              >
                                <XCircle className="h-4 w-4" />
                                <span>Reject</span>
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Admin Controls Tab */}
            {activeTab === 'controls' && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900">Admin Controls</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    {
                      title: 'Refund Ticket',
                      icon: RefreshCw,
                      color: 'red-600',
                      description: 'Cancel and refund if ticket has any issues',
                      action: () => setShowRefundModal(true),
                    },
                    {
                      title: 'Manual Adjustment',
                      icon: Plus,
                      color: 'yellow-600',
                      description: 'Add or remove amount from user wallet',
                      action: () => setShowAdjustModal(true),
                    },
                    {
                      title: 'System Health',
                      icon: CheckCircle,
                      color: 'green-600',
                      description: 'Check status of all automated processes',
                      action: () => setShowSystemHealthModal(true),
                    },
                  ].map((control, index) => (
                    <div
                      key={index}
                      className="relative bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-lg transition-shadow duration-200 group"
                    >
                      <div className="text-center">
                        <div className={`p-4 bg-${control.color.replace('600', '100')} rounded-full w-16 h-16 mx-auto mb-4`}>
                          <control.icon className={`h-8 w-8 text-${control.color} mx-auto mt-1`} />
                        </div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2">{control.title}</h3>
                        <p className="text-gray-600 mb-4">{control.description}</p>
                        <button
                          onClick={control.action}
                          className={`w-full bg-${control.color} text-white py-2 px-4 rounded-lg hover:bg-${control.color.replace('600', '700')} transition-colors duration-200 transform hover:scale-105`}
                        >
                          {control.title}
                        </button>
                        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                          <span className="text-xs text-gray-500">Click to proceed</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 shadow-lg">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                      { icon: Users, label: 'View All Users', color: 'blue-600', disabled: true },
                      { icon: TrendingUp, label: 'Revenue Report', color: 'green-600', disabled: true },
                      { icon: Download, label: 'Export Data', color: 'purple-600', disabled: true },
                      { icon: RefreshCw, label: 'Sync Wallets', color: 'orange-600', disabled: true },
                    ].map((action, index) => (
                      <button
                        key={index}
                        className={`bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 text-center hover:bg-${action.color.replace('600', '50')} ${action.disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                        disabled={action.disabled}
                        title={action.disabled ? 'Coming soon' : ''}
                      >
                        <action.icon className={`h-6 w-6 text-${action.color} mx-auto mb-2`} />
                        <span className="text-sm font-medium">{action.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modals */}
      <SystemHealthModal isOpen={showSystemHealthModal} onClose={() => setShowSystemHealthModal(false)} />
      <RefundModal isOpen={showRefundModal} onClose={() => setShowRefundModal(false)} />
      <ManualAdjustmentModal isOpen={showAdjustModal} onClose={() => setShowAdjustModal(false)} />
      <TransactionDetailsModal isOpen={!!showTransactionDetails} onClose={() => setShowTransactionDetails(null)} transaction={showTransactionDetails} />
    </div>
  );
};

export default LotteryUserControlsPage;
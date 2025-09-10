import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Filter, 
  Download, 
  Eye, 
  Edit, 
  Check, 
  X, 
  Clock, 
  DollarSign, 
  Users, 
  CreditCard, 
  TrendingUp,
  Calendar,
  AlertCircle,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Shield,
  FileText,
  Settings,
  Gamepad2,
  RefreshCw,
  Mail,
  Phone,
  Copy,
  ExternalLink,
  History,
  Ban,
  UserCheck,
  Wallet,
  PieChart,
  BarChart3,
  Filter as FilterIcon,
  SortAsc,
  SortDesc
} from 'lucide-react';

const GameDepositDashboard = () => {
  const [activeGame, setActiveGame] = useState('Ludo');
  const [activeTab, setActiveTab] = useState('Pending Deposits');
  const [selectedDeposits, setSelectedDeposits] = useState([]);
  const [sortField, setSortField] = useState('dateTime');
  const [sortDirection, setSortDirection] = useState('desc');

  // Enhanced sample data with more realistic scenarios
  const [allDeposits, setAllDeposits] = useState([
    {
      id: 'LUDO001',
      game: 'Ludo',
      playerName: 'Rahul Sharma',
      playerId: 'P001',
      amount: 500,
      currency: 'INR',
      paymentMethod: 'UPI',
      transactionId: 'UPI123456789',
      dateTime: '2024-01-15 14:30:00',
      status: 'Pending',
      adminNotes: '',
      bonusApplied: 'WELCOME50',
      bonusAmount: 50,
      kycStatus: 'Verified',
      maxDepositLimit: 10000,
      fraudFlag: false,
      gatewayName: 'Razorpay',
      gatewayFees: 10,
      playerPhone: '9876543210',
      playerEmail: 'rahul@email.com',
      ipAddress: '192.168.1.100',
      deviceInfo: 'Android Mobile',
      riskScore: 'Low',
      previousDeposits: 5,
      accountAge: '6 months',
      lastActivity: '2024-01-15 14:25:00'
    },
    {
      id: 'LUDO002',
      game: 'Ludo',
      playerName: 'Priya Singh',
      playerId: 'P002',
      amount: 1000,
      currency: 'INR',
      paymentMethod: 'Bank Transfer',
      transactionId: 'BANK987654321',
      dateTime: '2024-01-15 13:15:00',
      status: 'Approved',
      adminNotes: 'Regular player, auto-approved',
      bonusApplied: '',
      bonusAmount: 0,
      kycStatus: 'Verified',
      maxDepositLimit: 10000,
      fraudFlag: false,
      gatewayName: 'HDFC Bank',
      gatewayFees: 15,
      playerPhone: '9876543211',
      playerEmail: 'priya@email.com',
      ipAddress: '192.168.1.101',
      deviceInfo: 'iOS Mobile',
      riskScore: 'Low',
      previousDeposits: 12,
      accountAge: '1 year',
      lastActivity: '2024-01-15 13:10:00'
    },
    {
      id: 'LUDO003',
      game: 'Ludo',
      playerName: 'Deepak Kumar',
      playerId: 'P009',
      amount: 2500,
      currency: 'INR',
      paymentMethod: 'UPI',
      transactionId: 'UPI789456123',
      dateTime: '2024-01-15 12:45:00',
      status: 'Pending',
      adminNotes: 'High amount - needs verification',
      bonusApplied: 'HIGHROLLER',
      bonusAmount: 250,
      kycStatus: 'Pending',
      maxDepositLimit: 10000,
      fraudFlag: true,
      gatewayName: 'PhonePe',
      gatewayFees: 25,
      playerPhone: '9876543218',
      playerEmail: 'deepak@email.com',
      ipAddress: '192.168.1.102',
      deviceInfo: 'Desktop Chrome',
      riskScore: 'High',
      previousDeposits: 1,
      accountAge: '2 days',
      lastActivity: '2024-01-15 12:40:00'
    },
    {
      id: 'TP001',
      game: 'Teen Patti',
      playerName: 'Amit Kumar',
      playerId: 'P003',
      amount: 2000,
      currency: 'INR',
      paymentMethod: 'Wallet',
      transactionId: 'WALLET456789',
      dateTime: '2024-01-15 12:00:00',
      status: 'Rejected',
      adminNotes: 'Suspicious activity - Multiple failed attempts',
      bonusApplied: '',
      bonusAmount: 0,
      kycStatus: 'Pending',
      maxDepositLimit: 15000,
      fraudFlag: true,
      gatewayName: 'Paytm',
      gatewayFees: 20,
      playerPhone: '9876543212',
      playerEmail: 'amit@email.com',
      ipAddress: '192.168.1.103',
      deviceInfo: 'Android Mobile',
      riskScore: 'High',
      previousDeposits: 0,
      accountAge: '1 day',
      lastActivity: '2024-01-15 11:55:00'
    },
    {
      id: 'TP002',
      game: 'Teen Patti',
      playerName: 'Sunita Devi',
      playerId: 'P004',
      amount: 750,
      currency: 'INR',
      paymentMethod: 'Card',
      transactionId: 'CARD789012',
      dateTime: '2024-01-15 11:30:00',
      status: 'Approved',
      adminNotes: 'Regular player, quick approval',
      bonusApplied: 'FIRST100',
      bonusAmount: 75,
      kycStatus: 'Verified',
      maxDepositLimit: 15000,
      fraudFlag: false,
      gatewayName: 'Razorpay',
      gatewayFees: 12,
      playerPhone: '9876543213',
      playerEmail: 'sunita@email.com',
      ipAddress: '192.168.1.104',
      deviceInfo: 'iOS Safari',
      riskScore: 'Low',
      previousDeposits: 8,
      accountAge: '4 months',
      lastActivity: '2024-01-15 11:25:00'
    },
    {
      id: 'LOT001',
      game: 'Lottery',
      playerName: 'Vikash Singh',
      playerId: 'P005',
      amount: 300,
      currency: 'INR',
      paymentMethod: 'UPI',
      transactionId: 'UPI345678',
      dateTime: '2024-01-15 10:45:00',
      status: 'Pending',
      adminNotes: 'Awaiting KYC document verification',
      bonusApplied: '',
      bonusAmount: 0,
      kycStatus: 'Submitted',
      maxDepositLimit: 5000,
      fraudFlag: false,
      gatewayName: 'GPay',
      gatewayFees: 6,
      playerPhone: '9876543214',
      playerEmail: 'vikash@email.com',
      ipAddress: '192.168.1.105',
      deviceInfo: 'Android Mobile',
      riskScore: 'Medium',
      previousDeposits: 3,
      accountAge: '1 month',
      lastActivity: '2024-01-15 10:40:00'
    }
  ]);

  const [filters, setFilters] = useState({
    search: '',
    amountMin: '',
    amountMax: '',
    paymentMethod: 'All',
    bonusApplied: 'All',
    kycStatus: 'All',
    dateRange: 'All',
    fraudFlag: 'All',
    riskScore: 'All',
    gatewayName: 'All'
  });

  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [selectedDeposit, setSelectedDeposit] = useState(null);
  const [bulkActionReason, setBulkActionReason] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const games = [
    { name: 'Ludo', icon: '🎲', color: 'bg-blue-500' },
    { name: 'Teen Patti', icon: '🃏', color: 'bg-purple-500' },
    { name: 'Lottery', icon: '🎫', color: 'bg-green-500' },
    { name: 'Mines', icon: '💎', color: 'bg-yellow-500' },
    { name: 'Bird Shooting', icon: '🎯', color: 'bg-red-500' },
    { name: 'Jackpot', icon: '🎰', color: 'bg-pink-500' }
  ];

  const tabs = ['Pending Deposits', 'Approved Deposits', 'Rejected Deposits', 'All Transactions'];
  const paymentMethods = ['All', 'UPI', 'Bank Transfer', 'Wallet', 'Card', 'Net Banking'];
  const kycStatuses = ['All', 'Verified', 'Pending', 'Submitted', 'Rejected', 'Not Required'];
  const riskScores = ['All', 'Low', 'Medium', 'High'];

  // Enhanced filtering and sorting
  const getFilteredDeposits = () => {
    let filtered = allDeposits.filter(deposit => deposit.game === activeGame);

    // Apply tab filter
    if (activeTab === 'Pending Deposits') {
      filtered = filtered.filter(d => d.status === 'Pending');
    } else if (activeTab === 'Approved Deposits') {
      filtered = filtered.filter(d => d.status === 'Approved');
    } else if (activeTab === 'Rejected Deposits') {
      filtered = filtered.filter(d => d.status === 'Rejected');
    }

    // Apply search filter
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      filtered = filtered.filter(deposit => 
        deposit.playerName.toLowerCase().includes(searchTerm) ||
        deposit.playerId.toLowerCase().includes(searchTerm) ||
        deposit.transactionId.toLowerCase().includes(searchTerm) ||
        deposit.playerEmail.toLowerCase().includes(searchTerm) ||
        deposit.playerPhone.includes(searchTerm)
      );
    }

    // Apply other filters
    if (filters.paymentMethod !== 'All') {
      filtered = filtered.filter(d => d.paymentMethod === filters.paymentMethod);
    }

    if (filters.kycStatus !== 'All') {
      filtered = filtered.filter(d => d.kycStatus === filters.kycStatus);
    }

    if (filters.riskScore !== 'All') {
      filtered = filtered.filter(d => d.riskScore === filters.riskScore);
    }

    if (filters.bonusApplied !== 'All') {
      if (filters.bonusApplied === 'Yes') {
        filtered = filtered.filter(d => d.bonusApplied && d.bonusApplied.length > 0);
      } else if (filters.bonusApplied === 'No') {
        filtered = filtered.filter(d => !d.bonusApplied || d.bonusApplied.length === 0);
      }
    }

    if (filters.fraudFlag !== 'All') {
      filtered = filtered.filter(d => d.fraudFlag.toString() === filters.fraudFlag);
    }

    if (filters.amountMin) {
      filtered = filtered.filter(d => d.amount >= parseFloat(filters.amountMin));
    }

    if (filters.amountMax) {
      filtered = filtered.filter(d => d.amount <= parseFloat(filters.amountMax));
    }

    // Apply sorting
    filtered.sort((a, b) => {
      let aValue = a[sortField];
      let bValue = b[sortField];

      if (sortField === 'amount') {
        aValue = parseFloat(aValue);
        bValue = parseFloat(bValue);
      } else if (sortField === 'dateTime') {
        aValue = new Date(aValue);
        bValue = new Date(bValue);
      }

      if (sortDirection === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return filtered;
  };

  const filteredDeposits = getFilteredDeposits();

  // Enhanced game stats calculation
  const getGameStats = (gameName) => {
    const gameDeposits = allDeposits.filter(d => d.game === gameName);
    const today = new Date().toISOString().split('T')[0];
    const todayDeposits = gameDeposits.filter(d => d.dateTime.startsWith(today));
    
    return {
      total: gameDeposits.reduce((sum, d) => sum + d.amount, 0),
      pending: gameDeposits.filter(d => d.status === 'Pending').reduce((sum, d) => sum + d.amount, 0),
      approved: gameDeposits.filter(d => d.status === 'Approved').reduce((sum, d) => sum + d.amount, 0),
      rejected: gameDeposits.filter(d => d.status === 'Rejected').reduce((sum, d) => sum + d.amount, 0),
      count: gameDeposits.length,
      pendingCount: gameDeposits.filter(d => d.status === 'Pending').length,
      approvedCount: gameDeposits.filter(d => d.status === 'Approved').length,
      rejectedCount: gameDeposits.filter(d => d.status === 'Rejected').length,
      fraudAlerts: gameDeposits.filter(d => d.fraudFlag).length,
      todayCount: todayDeposits.length,
      todayAmount: todayDeposits.reduce((sum, d) => sum + d.amount, 0),
      highRiskCount: gameDeposits.filter(d => d.riskScore === 'High').length,
      avgAmount: gameDeposits.length > 0 ? gameDeposits.reduce((sum, d) => sum + d.amount, 0) / gameDeposits.length : 0
    };
  };

  const currentGameStats = getGameStats(activeGame);

  const handleStatusChange = (depositId, newStatus, notes = '') => {
    setAllDeposits(prevDeposits =>
      prevDeposits.map(deposit =>
        deposit.id === depositId
          ? { ...deposit, status: newStatus, adminNotes: notes }
          : deposit
      )
    );
    setShowModal(false);
  };

  const handleBulkAction = (action) => {
    if (selectedDeposits.length === 0) return;
    
    const status = action === 'approve' ? 'Approved' : 'Rejected';
    const notes = bulkActionReason || `Bulk ${action}d by admin`;
    
    setAllDeposits(prevDeposits =>
      prevDeposits.map(deposit =>
        selectedDeposits.includes(deposit.id)
          ? { ...deposit, status: status, adminNotes: notes }
          : deposit
      )
    );
    
    setSelectedDeposits([]);
    setBulkActionReason('');
  };

  const toggleDepositSelection = (depositId) => {
    setSelectedDeposits(prev =>
      prev.includes(depositId)
        ? prev.filter(id => id !== depositId)
        : [...prev, depositId]
    );
  };

  const selectAllDeposits = () => {
    if (selectedDeposits.length === filteredDeposits.length) {
      setSelectedDeposits([]);
    } else {
      setSelectedDeposits(filteredDeposits.map(d => d.id));
    }
  };

  const openModal = (type, deposit = null) => {
    setModalType(type);
    setSelectedDeposit(deposit);
    setShowModal(true);
  };

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const StatusBadge = ({ status }) => {
    const statusConfig = {
      Pending: { color: 'bg-yellow-100 text-yellow-800 border-yellow-200', icon: Clock },
      Approved: { color: 'bg-green-100 text-green-800 border-green-200', icon: CheckCircle },
      Rejected: { color: 'bg-red-100 text-red-800 border-red-200', icon: XCircle }
    };
    
    const config = statusConfig[status];
    const IconComponent = config.icon;
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${config.color}`}>
        <IconComponent className="w-3 h-3 mr-1" />
        {status}
      </span>
    );
  };

  const RiskBadge = ({ risk }) => {
    const riskConfig = {
      Low: { color: 'bg-green-100 text-green-800', icon: Shield },
      Medium: { color: 'bg-yellow-100 text-yellow-800', icon: AlertCircle },
      High: { color: 'bg-red-100 text-red-800', icon: AlertTriangle }
    };
    
    const config = riskConfig[risk];
    const IconComponent = config.icon;
    
    return (
      <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${config.color}`}>
        <IconComponent className="w-3 h-3 mr-1" />
        {risk}
      </span>
    );
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    // You could add a toast notification here
  };

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center">
      <div className="w-full max-w-[900px] overflow-x-auto">
        {/* Enhanced Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Game Deposit Management</h1>
              <p className="text-gray-600 mt-2">Comprehensive deposit management across all gaming platforms</p>
            </div>
            <div className="flex space-x-3">
              <button className="flex items-center px-2 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </button>
              <button className="flex items-center px-4 py-2 text-sm text-white bg-blue-600 rounded-lg hover:bg-blue-700">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </button>
            </div>
          </div>
        </div>

        {/* Updated Game Selection with Icon Left and Name Right */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6 border border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Select Game Platform</h3>
            <div className="flex space-x-2 text-sm text-gray-600">
              <span>Total Platforms: {games.length}</span>
              <span>•</span>
              <span>Active Alerts: {games.reduce((sum, game) => sum + getGameStats(game.name).fraudAlerts, 0)}</span>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
            {games.map((game) => {
              const stats = getGameStats(game.name);
              return (
                <button
                  key={game.name}
                  onClick={() => {
                    setActiveGame(game.name);
                    setActiveTab('Pending Deposits');
                    setSelectedDeposits([]);
                  }}
                  className={`relative p-4 rounded-xl border-2 transition-all h-40 ${
                    activeGame === game.name
                      ? 'border-blue-500 bg-blue-50 shadow-lg transform scale-105'
                      : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md'
                  }`}
                >
                  <div className="flex flex-col h-full justify-between">
                    <div className="flex items-center">
                      <div className={`p-2 rounded-full ${game.color} text-white text-lg flex items-center justify-center w-6 h-6`}>
                        {game.icon}
                      </div>
                      <div className="ml-2 text-sm font-medium text-gray-900">{game.name}</div>
                    </div>
                    <div className="mt-1">
                      <div className="text-sm text-gray-600">₹{stats.total.toLocaleString()}</div>
                      <div className="flex flex-row items-center space-x-2 mt-1">
                      <span className="px-2 py-0.5 bg-blue-100 text-blue-800 rounded text-xs">
                        {stats.count} total
                      </span>
                      {stats.pendingCount > 0 && (
                        <span className="px-2 py-0.5 bg-yellow-100 text-yellow-800 rounded text-xs">
                          {stats.pendingCount} pending
                        </span>
                      )}
                    </div>

                    </div>
                    {(stats.fraudAlerts > 0 || stats.highRiskCount > 0) && (
                      <div className="flex items-center text-xs text-red-600 mt-2">
                        <AlertTriangle className="h-3 w-3 mr-1" />
                        <span>{stats.highRiskCount} high risk</span>
                      </div>
                    )}
                    {stats.fraudAlerts > 0 && (
                      <div className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full">
                        {stats.fraudAlerts}
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Enhanced Stats Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total {activeGame} Deposits</p>
                <p className="text-2xl font-semibold text-gray-900">₹{currentGameStats.total.toLocaleString()}</p>
                <div className="flex items-center mt-2 text-xs text-gray-600">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  Avg: ₹{Math.round(currentGameStats.avgAmount).toLocaleString()}
                </div>
              </div>
              <div className="p-3 rounded-full bg-blue-100">
                <DollarSign className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <div className="mt-3 pt-3 border-t border-gray-100">
              <div className="text-xs text-gray-600">
                Today: ₹{currentGameStats.todayAmount.toLocaleString()} ({currentGameStats.todayCount} deposits)
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Pending Review</p>
                <p className="text-2xl font-semibold text-yellow-600">₹{currentGameStats.pending.toLocaleString()}</p>
                <div className="flex items-center mt-2 text-xs text-gray-600">
                  <Clock className="h-3 w-3 mr-1" />
                  {currentGameStats.pendingCount} transactions
                </div>
              </div>
              <div className="p-3 rounded-full bg-yellow-100">
                <Clock className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
            {currentGameStats.pendingCount > 0 && (
              <div className="mt-3 pt-3 border-t border-gray-100">
                <button className="text-xs text-yellow-700 hover:text-yellow-900 font-medium">
                  Review Pending →
                </button>
              </div>
            )}
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Approved Today</p>
                <p className="text-2xl font-semibold text-green-600">₹{currentGameStats.approved.toLocaleString()}</p>
                <div className="flex items-center mt-2 text-xs text-gray-600">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Success rate: {currentGameStats.count > 0 ? Math.round((currentGameStats.approvedCount / currentGameStats.count) * 100) : 0}%
                </div>
              </div>
              <div className="p-3 rounded-full bg-green-100">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <div className="mt-3 pt-3 border-t border-gray-100">
              <div className="text-xs text-gray-600">
                {currentGameStats.approvedCount} approved transactions
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Security Alerts</p>
                <div className="flex items-center space-x-2">
                  <p className="text-2xl font-semibold text-red-600">{currentGameStats.fraudAlerts}</p>
                  <p className="text-2xl font-semibold text-yellow-600">+{currentGameStats.highRiskCount}</p>
                </div>
                <div className="flex items-center mt-2 text-xs text-gray-600">
                  <AlertTriangle className="h-3 w-3 mr-1" />
                  Fraud + High Risk
                </div>
              </div>
              <div className="p-3 rounded-full bg-red-100">
                <Shield className="h-6 w-6 text-red-600" />
              </div>
            </div>
            {(currentGameStats.fraudAlerts > 0 || currentGameStats.highRiskCount > 0) && (
              <div className="mt-3 pt-3 border-t border-gray-100">
                <button className="text-xs text-red-700 hover:text-red-900 font-medium">
                  Review Alerts →
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Enhanced Tab Navigation */}
        <div className="bg-white rounded-lg shadow-sm mb-6 border border-gray-200">
          <div className="border-b border-gray-200">
            <div className="flex justify-between items-center px-6 py-2">
              <nav className="-mb-px flex space-x-8">
                {tabs.map((tab) => {
                  const count = tab === 'All Transactions' ? currentGameStats.count :
                               tab === 'Pending Deposits' ? currentGameStats.pendingCount :
                               tab === 'Approved Deposits' ? currentGameStats.approvedCount :
                               currentGameStats.rejectedCount;
                  
                  return (
                    <button
                      key={tab}
                      onClick={() => {
                        setActiveTab(tab);
                        setSelectedDeposits([]);
                      }}
                      className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center ${
                        activeTab === tab
                          ? 'border-blue-500 text-blue-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      {tab}
                      <span className={`ml-2 py-1 px-2 rounded-full text-xs ${
                        activeTab === tab 
                          ? 'bg-blue-100 text-blue-600' 
                          : 'bg-gray-100 text-gray-600'
                      }`}>
                        {count}
                      </span>
                      {tab === 'Pending Deposits' && count > 0 && (
                        <span className="ml-1 w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></span>
                      )}
                    </button>
                  );
                })}
              </nav>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center px-3 py-2 text-sm border rounded-md transition-colors ${
                  showFilters 
                    ? 'bg-blue-50 border-blue-300 text-blue-700' 
                    : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                <FilterIcon className="h-4 w-4 mr-2" />
                Filters
              </button>
            </div>
          </div>

          {/* Enhanced Filters Section */}
          {showFilters && (
            <div className="p-6 bg-gray-50 border-t border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-6 gap-4 mb-6">
                {/* Enhanced Search */}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Search Player/Transaction
                  </label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Name, ID, Email, Phone, Transaction ID..."
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      value={filters.search}
                      onChange={(e) => setFilters({...filters, search: e.target.value})}
                    />
                  </div>
                </div>

                {/* Payment Method */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Payment Method</label>
                  <select
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={filters.paymentMethod}
                    onChange={(e) => setFilters({...filters, paymentMethod: e.target.value})}
                  >
                    {paymentMethods.map(method => (
                      <option key={method} value={method}>{method}</option>
                    ))}
                  </select>
                </div>

                {/* KYC Status */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">KYC Status</label>
                  <select
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={filters.kycStatus}
                    onChange={(e) => setFilters({...filters, kycStatus: e.target.value})}
                  >
                    {kycStatuses.map(status => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                </div>

                {/* Risk Score */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Risk Level</label>
                  <select
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={filters.riskScore}
                    onChange={(e) => setFilters({...filters, riskScore: e.target.value})}
                  >
                    {riskScores.map(risk => (
                      <option key={risk} value={risk}>{risk}</option>
                    ))}
                  </select>
                </div>

                {/* Amount Range */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Amount Range (₹)</label>
                  <div className="flex space-x-2">
                    <input
                      type="number"
                      placeholder="Min"
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={filters.amountMin}
                      onChange={(e) => setFilters({...filters, amountMin: e.target.value})}
                    />
                    <input
                      type="number"
                      placeholder="Max"
                      className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={filters.amountMax}
                      onChange={(e) => setFilters({...filters, amountMax: e.target.value})}
                    />
                  </div>
                </div>
              </div>

              {/* Additional Filters Row */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                {/* Bonus Applied */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Bonus Applied</label>
                  <select
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={filters.bonusApplied}
                    onChange={(e) => setFilters({...filters, bonusApplied: e.target.value})}
                  >
                    <option value="All">All</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>

                {/* Fraud Flag */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Fraud Alert</label>
                  <select
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={filters.fraudFlag}
                    onChange={(e) => setFilters({...filters, fraudFlag: e.target.value})}
                  >
                    <option value="All">All</option>
                    <option value="true">Flagged</option>
                    <option value="false">Clean</option>
                  </select>
                </div>

                {/* Date Range */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
                  <select
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={filters.dateRange}
                    onChange={(e) => setFilters({...filters, dateRange: e.target.value})}
                  >
                    <option value="All">All Time</option>
                    <option value="today">Today</option>
                    <option value="yesterday">Yesterday</option>
                    <option value="week">This Week</option>
                    <option value="month">This Month</option>
                  </select>
                </div>

                {/* Gateway */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Payment Gateway</label>
                  <select
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={filters.gatewayName}
                    onChange={(e) => setFilters({...filters, gatewayName: e.target.value})}
                  >
                    <option value="All">All Gateways</option>
                    <option value="Razorpay">Razorpay</option>
                    <option value="Paytm">Paytm</option>
                    <option value="PhonePe">PhonePe</option>
                    <option value="GPay">GPay</option>
                    <option value="HDFC Bank">HDFC Bank</option>
                  </select>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                <div className="flex space-x-3">
                  {selectedDeposits.length > 0 && (
                    <div className="flex items-center space-x-3">
                      <input
                        type="text"
                        placeholder="Reason for bulk action..."
                        className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        value={bulkActionReason}
                        onChange={(e) => setBulkActionReason(e.target.value)}
                      />
                      <button
                        onClick={() => handleBulkAction('approve')}
                        className="flex items-center px-4 py-2 text-sm text-white bg-green-600 rounded-md hover:bg-green-700 transition-colors"
                      >
                        <Check className="h-4 w-4 mr-2" />
                        Bulk Approve ({selectedDeposits.length})
                      </button>
                      <button
                        onClick={() => handleBulkAction('reject')}
                        className="flex items-center px-4 py-2 text-sm text-white bg-red-600 rounded-md hover:bg-red-700 transition-colors"
                      >
                        <X className="h-4 w-4 mr-2" />
                        Bulk Reject ({selectedDeposits.length})
                      </button>
                    </div>
                  )}
                </div>
                <div className="flex space-x-3">
                  <button
                    onClick={() => setFilters({
                      search: '', amountMin: '', amountMax: '', paymentMethod: 'All', 
                      bonusApplied: 'All', kycStatus: 'All', dateRange: 'All', fraudFlag: 'All',
                      riskScore: 'All', gatewayName: 'All'
                    })}
                    className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                  >
                    Clear Filters
                  </button>
                  <button className="flex items-center px-4 py-2 text-sm text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors">
                    <Download className="h-4 w-4 mr-2" />
                    Export Filtered Data
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Enhanced Deposits Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  {activeGame} - {activeTab} ({filteredDeposits.length})
                </h3>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <span>Total: ₹{filteredDeposits.reduce((sum, d) => sum + d.amount, 0).toLocaleString()}</span>
                  {selectedDeposits.length > 0 && (
                    <>
                      <span>•</span>
                      <span>Selected: {selectedDeposits.length}</span>
                    </>
                  )}
                </div>
              </div>
              <div className="flex items-center space-x-3">
                {filteredDeposits.length > 0 && (
                  <label className="flex items-center text-sm text-gray-600">
                    <input
                      type="checkbox"
                      checked={selectedDeposits.length === filteredDeposits.length && filteredDeposits.length > 0}
                      onChange={selectAllDeposits}
                      className="mr-2 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    Select All ({filteredDeposits.length})
                  </label>
                )}
                <button className="text-sm text-gray-500 hover:text-gray-700">
                  <RefreshCw className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {filteredDeposits.length === 0 ? (
            <div className="p-12 text-center">
              <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                <FileText className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No deposits found</h3>
              <p className="text-gray-500 mb-6">
                No deposits match your current filters for {activeGame} {activeTab.toLowerCase()}.
              </p>
              <button
                onClick={() => setFilters({
                  search: '', amountMin: '', amountMax: '', paymentMethod: 'All', 
                  bonusApplied: 'All', kycStatus: 'All', dateRange: 'All', fraudFlag: 'All',
                  riskScore: 'All', gatewayName: 'All'
                })}
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      <input
                        type="checkbox"
                        checked={selectedDeposits.length === filteredDeposits.length && filteredDeposits.length > 0}
                        onChange={selectAllDeposits}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                    </th>
                    <th 
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                      onClick={() => handleSort('playerName')}
                    >
                      <div className="flex items-center space-x-1">
                        <span>Player Details</span>
                        {sortField === 'playerName' && (
                          sortDirection === 'asc' ? <SortAsc className="h-3 w-3" /> : <SortDesc className="h-3 w-3" />
                        )}
                      </div>
                    </th>
                    <th 
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                      onClick={() => handleSort('amount')}
                    >
                      <div className="flex items-center space-x-1">
                        <span>Amount & Bonus</span>
                        {sortField === 'amount' && (
                          sortDirection === 'asc' ? <SortAsc className="h-3 w-3" /> : <SortDesc className="h-3 w-3" />
                        )}
                      </div>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Payment Info
                    </th>
                    <th 
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                      onClick={() => handleSort('dateTime')}
                    >
                      <div className="flex items-center space-x-1">
                        <span>Date & Status</span>
                        {sortField === 'dateTime' && (
                          sortDirection === 'asc' ? <SortAsc className="h-3 w-3" /> : <SortDesc className="h-3 w-3" />
                        )}
                      </div>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Security & Risk
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredDeposits.map((deposit) => (
                    <tr key={deposit.id} className={`hover:bg-gray-50 ${selectedDeposits.includes(deposit.id) ? 'bg-blue-50' : ''}`}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <input
                          type="checkbox"
                          checked={selectedDeposits.includes(deposit.id)}
                          onChange={() => toggleDepositSelection(deposit.id)}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                      </td>
                      
                      {/* Player Details */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                              <span className="text-white text-sm font-medium">
                                {deposit.playerName.charAt(0).toUpperCase()}
                              </span>
                            </div>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900 flex items-center">
                              {deposit.playerName}
                              {deposit.kycStatus === 'Verified' && (
                                <UserCheck className="h-4 w-4 ml-2 text-green-500" />
                              )}
                            </div>
                            <div className="text-sm text-gray-500 flex items-center space-x-2">
                              <span>ID: {deposit.playerId}</span>
                              <button 
                                onClick={() => copyToClipboard(deposit.playerId)}
                                className="text-gray-400 hover:text-gray-600"
                              >
                                <Copy className="h-3 w-3" />
                              </button>
                            </div>
                            <div className="text-xs text-gray-500 flex items-center space-x-3 mt-1">
                              <div className="flex items-center">
                                <Mail className="h-3 w-3 mr-1" />
                                <span>{deposit.playerEmail}</span>
                              </div>
                              <div className="flex items-center">
                                <Phone className="h-3 w-3 mr-1" />
                                <span>{deposit.playerPhone}</span>
                              </div>
                            </div>
                            <div className="text-xs text-gray-400 mt-1">
                              Account: {deposit.accountAge} • Deposits: {deposit.previousDeposits}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Amount & Bonus */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm">
                          <div className="font-medium text-gray-900">
                            ₹{deposit.amount.toLocaleString()}
                          </div>
                          <div className="text-gray-500">{deposit.currency}</div>
                          {deposit.bonusApplied && (
                            <div className="mt-1">
                              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                +₹{deposit.bonusAmount} ({deposit.bonusApplied})
                              </span>
                            </div>
                          )}
                          <div className="text-xs text-gray-400 mt-1">
                            Limit: ₹{deposit.maxDepositLimit.toLocaleString()}
                          </div>
                        </div>
                      </td>

                      {/* Payment Info */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm">
                          <div className="flex items-center font-medium text-gray-900">
                            {deposit.paymentMethod === 'UPI' && <Wallet className="h-4 w-4 mr-2 text-blue-500" />}
                            {deposit.paymentMethod === 'Card' && <CreditCard className="h-4 w-4 mr-2 text-purple-500" />}
                            {deposit.paymentMethod === 'Bank Transfer' && <Wallet className="h-4 w-4 mr-2 text-green-500" />}
                            {deposit.paymentMethod === 'Wallet' && <Wallet className="h-4 w-4 mr-2 text-orange-500" />}
                            {deposit.paymentMethod}
                          </div>
                          <div className="text-gray-500 text-xs">
                            {deposit.gatewayName}
                          </div>
                          <div className="text-gray-500 flex items-center space-x-1 mt-1">
                            <span className="text-xs">{deposit.transactionId}</span>
                            <button 
                              onClick={() => copyToClipboard(deposit.transactionId)}
                              className="text-gray-400 hover:text-gray-600"
                            >
                              <Copy className="h-3 w-3" />
                            </button>
                          </div>
                          <div className="text-xs text-gray-400">
                            Fee: ₹{deposit.gatewayFees}
                          </div>
                        </div>
                      </td>

                      {/* Date & Status */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm">
                          <div className="text-gray-900">
                            {new Date(deposit.dateTime).toLocaleDateString()}
                          </div>
                          <div className="text-gray-500 text-xs">
                            {new Date(deposit.dateTime).toLocaleTimeString()}
                          </div>
                          <div className="mt-2">
                            <StatusBadge status={deposit.status} />
                          </div>
                          <div className="mt-1 text-xs">
                            KYC: <span className={`font-medium ${
                              deposit.kycStatus === 'Verified' ? 'text-green-600' : 
                              deposit.kycStatus === 'Pending' ? 'text-yellow-600' : 'text-gray-600'
                            }`}>
                              {deposit.kycStatus}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Security & Risk */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="space-y-2">
                          <RiskBadge risk={deposit.riskScore} />
                          {deposit.fraudFlag && (
                            <div className="flex items-center text-red-600">
                              <AlertTriangle className="h-4 w-4 mr-1" />
                              <span className="text-xs font-medium">Fraud Alert</span>
                            </div>
                          )}
                          <div className="text-xs text-gray-500">
                            IP: {deposit.ipAddress}
                          </div>
                          <div className="text-xs text-gray-500">
                            {deposit.deviceInfo}
                          </div>
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => openModal('view', deposit)}
                            className="text-blue-600 hover:text-blue-900 p-1 rounded"
                            title="View Details"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                          {deposit.status === 'Pending' && (
                            <>
                              <button
                                onClick={() => openModal('approve', deposit)}
                                className="text-green-600 hover:text-green-900 p-1 rounded"
                                title="Approve"
                              >
                                <Check className="h-4 w-4" />
                              </button>
                              <button
                                onClick={() => openModal('reject', deposit)}
                                className="text-red-600 hover:text-red-900 p-1 rounded"
                                title="Reject"
                              >
                                <X className="h-4 w-4" />
                              </button>
                            </>
                          )}
                          <button
                            onClick={() => openModal('edit', deposit)}
                            className="text-gray-600 hover:text-gray-900 p-1 rounded"
                            title="Edit Notes"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => openModal('history', deposit)}
                            className="text-purple-600 hover:text-purple-900 p-1 rounded"
                            title="Transaction History"
                          >
                            <History className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Enhanced Modal */}
        {showModal && selectedDeposit && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center z-50">
            <div className="relative bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900">
                  {modalType === 'view' && 'Deposit Details'}
                  {modalType === 'approve' && 'Approve Deposit'}
                  {modalType === 'reject' && 'Reject Deposit'}
                  {modalType === 'edit' && 'Edit Deposit Notes'}
                  {modalType === 'history' && 'Transaction History'}
                </h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="p-6">
                {modalType === 'view' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Player Information */}
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="text-lg font-semibold mb-4 flex items-center">
                        <Users className="h-5 w-5 mr-2" />
                        Player Information
                      </h4>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Name:</span>
                          <span className="font-medium">{selectedDeposit.playerName}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Player ID:</span>
                          <div className="flex items-center space-x-2">
                            <span className="font-medium">{selectedDeposit.playerId}</span>
                            <button onClick={() => copyToClipboard(selectedDeposit.playerId)}>
                              <Copy className="h-4 w-4 text-gray-400" />
                            </button>
                          </div>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Email:</span>
                          <span className="font-medium">{selectedDeposit.playerEmail}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Phone:</span>
                          <span className="font-medium">{selectedDeposit.playerPhone}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">KYC Status:</span>
                          <span className={`font-medium ${
                            selectedDeposit.kycStatus === 'Verified' ? 'text-green-600' : 
                            selectedDeposit.kycStatus === 'Pending' ? 'text-yellow-600' : 'text-gray-600'
                          }`}>
                            {selectedDeposit.kycStatus}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Account Age:</span>
                          <span className="font-medium">{selectedDeposit.accountAge}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Previous Deposits:</span>
                          <span className="font-medium">{selectedDeposit.previousDeposits}</span>
                        </div>
                      </div>
                    </div>

                    {/* Transaction Information */}
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="text-lg font-semibold mb-4 flex items-center">
                        <CreditCard className="h-5 w-5 mr-2" />
                        Transaction Details
                      </h4>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Amount:</span>
                          <span className="font-medium text-lg">₹{selectedDeposit.amount.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Currency:</span>
                          <span className="font-medium">{selectedDeposit.currency}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Payment Method:</span>
                          <span className="font-medium">{selectedDeposit.paymentMethod}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Gateway:</span>
                          <span className="font-medium">{selectedDeposit.gatewayName}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Transaction ID:</span>
                          <div className="flex items-center space-x-2">
                            <span className="font-medium">{selectedDeposit.transactionId}</span>
                            <button onClick={() => copyToClipboard(selectedDeposit.transactionId)}>
                              <Copy className="h-4 w-4 text-gray-400" />
                            </button>
                          </div>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Gateway Fees:</span>
                          <span className="font-medium">₹{selectedDeposit.gatewayFees}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Date & Time:</span>
                          <span className="font-medium">
                            {new Date(selectedDeposit.dateTime).toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Status:</span>
                          <StatusBadge status={selectedDeposit.status} />
                        </div>
                      </div>
                    </div>

                    {/* Bonus Information */}
                    {selectedDeposit.bonusApplied && (
                      <div className="bg-green-50 p-4 rounded-lg">
                        <h4 className="text-lg font-semibold mb-4 flex items-center text-green-800">
                          <TrendingUp className="h-5 w-5 mr-2" />
                          Bonus Details
                        </h4>
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Bonus Code:</span>
                            <span className="font-medium">{selectedDeposit.bonusApplied}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Bonus Amount:</span>
                            <span className="font-medium text-green-600">₹{selectedDeposit.bonusAmount}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Total Credit:</span>
                            <span className="font-medium text-lg">₹{(selectedDeposit.amount + selectedDeposit.bonusAmount).toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Security Information */}
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="text-lg font-semibold mb-4 flex items-center">
                        <Shield className="h-5 w-5 mr-2" />
                        Security & Risk
                      </h4>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Risk Score:</span>
                          <RiskBadge risk={selectedDeposit.riskScore} />
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Fraud Flag:</span>
                          <span className={`font-medium ${selectedDeposit.fraudFlag ? 'text-red-600' : 'text-green-600'}`}>
                            {selectedDeposit.fraudFlag ? 'Flagged' : 'Clean'}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">IP Address:</span>
                          <span className="font-medium">{selectedDeposit.ipAddress}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Device:</span>
                          <span className="font-medium">{selectedDeposit.deviceInfo}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Deposit Limit:</span>
                          <span className="font-medium">₹{selectedDeposit.maxDepositLimit.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Last Activity:</span>
                          <span className="font-medium">
                            {new Date(selectedDeposit.lastActivity).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Admin Notes */}
                    <div className="md:col-span-2 bg-blue-50 p-4 rounded-lg">
                      <h4 className="text-lg font-semibold mb-4 flex items-center text-blue-800">
                        <FileText className="h-5 w-5 mr-2" />
                        Admin Notes
                      </h4>
                      <div className="text-gray-700">
                        {selectedDeposit.adminNotes || 'No admin notes available.'}
                      </div>
                    </div>
                  </div>
                )}

                {modalType === 'approve' && (
                  <div className="space-y-6">
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <div className="flex">
                        <CheckCircle className="h-5 w-5 text-green-400" />
                        <div className="ml-3">
                          <h3 className="text-sm font-medium text-green-800">
                            Approve Deposit - {selectedDeposit.playerName}
                          </h3>
                          <div className="mt-2 text-sm text-green-700">
                            <p>Amount: ₹{selectedDeposit.amount.toLocaleString()}</p>
                            <p>Transaction ID: {selectedDeposit.transactionId}</p>
                            {selectedDeposit.bonusApplied && (
                              <p>Bonus: +₹{selectedDeposit.bonusAmount} ({selectedDeposit.bonusApplied})</p>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Approval Notes (Optional)
                      </label>
                      <textarea
                        rows="3"
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="Enter approval notes..."
                      />
                    </div>
                    <div className="flex justify-end space-x-3">
                      <button
                        onClick={() => setShowModal(false)}
                        className="px-4 py-2 text-sm text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => handleStatusChange(selectedDeposit.id, 'Approved', 'Approved by admin')}
                        className="px-4 py-2 text-sm text-white bg-green-600 rounded-md hover:bg-green-700"
                      >
                        Confirm Approval
                      </button>
                    </div>
                  </div>
                )}

                {modalType === 'reject' && (
                  <div className="space-y-6">
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                      <div className="flex">
                        <XCircle className="h-5 w-5 text-red-400" />
                        <div className="ml-3">
                          <h3 className="text-sm font-medium text-red-800">
                            Reject Deposit - {selectedDeposit.playerName}
                          </h3>
                          <div className="mt-2 text-sm text-red-700">
                            <p>Amount: ₹{selectedDeposit.amount.toLocaleString()}</p>
                            <p>Transaction ID: {selectedDeposit.transactionId}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Rejection Reason *
                      </label>
                      <select className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 mb-3">
                        <option value="">Select rejection reason</option>
                        <option value="insufficient_funds">Insufficient Funds</option>
                        <option value="fraud_suspected">Fraud Suspected</option>
                        <option value="kyc_incomplete">KYC Incomplete</option>
                        <option value="duplicate_transaction">Duplicate Transaction</option>
                        <option value="payment_failed">Payment Failed</option>
                        <option value="policy_violation">Policy Violation</option>
                        <option value="other">Other</option>
                      </select>
                      <textarea
                        rows="3"
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                        placeholder="Additional details about rejection..."
                      />
                    </div>
                    <div className="flex justify-end space-x-3">
                      <button
                        onClick={() => setShowModal(false)}
                        className="px-4 py-2 text-sm text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => handleStatusChange(selectedDeposit.id, 'Rejected', 'Rejected by admin')}
                        className="px-4 py-2 text-sm text-white bg-red-600 rounded-md hover:bg-red-700"
                      >
                        Confirm Rejection
                      </button>
                    </div>
                  </div>
                )}

                {modalType === 'edit' && (
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Admin Notes
                      </label>
                      <textarea
                        rows="5"
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        defaultValue={selectedDeposit.adminNotes}
                        placeholder="Enter admin notes..."
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Update Status
                        </label>
                        <select
                          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          defaultValue={selectedDeposit.status}
                        >
                          <option value="Pending">Pending</option>
                          <option value="Approved">Approved</option>
                          <option value="Rejected">Rejected</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Risk Score
                        </label>
                        <select
                          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          defaultValue={selectedDeposit.riskScore}
                        >
                          <option value="Low">Low</option>
                          <option value="Medium">Medium</option>
                          <option value="High">High</option>
                        </select>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="fraudFlag"
                        defaultChecked={selectedDeposit.fraudFlag}
                        className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                      />
                      <label htmlFor="fraudFlag" className="text-sm text-gray-700">
                        Flag as potential fraud
                      </label>
                    </div>
                    <div className="flex justify-end space-x-3">
                      <button
                        onClick={() => setShowModal(false)}
                        className="px-4 py-2 text-sm text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => setShowModal(false)}
                        className="px-4 py-2 text-sm text-white bg-blue-600 rounded-md hover:bg-blue-700"
                      >
                        Save Changes
                      </button>
                    </div>
                  </div>
                )}

                {modalType === 'history' && (
                  <div className="space-y-6">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="text-lg font-semibold mb-4">Player Transaction History</h4>
                      <div className="text-sm text-gray-600 mb-4">
                        Showing transaction history for {selectedDeposit.playerName} ({selectedDeposit.playerId})
                      </div>
                      
                      {/* Mock transaction history */}
                      <div className="space-y-3">
                        <div className="bg-white p-3 rounded border-l-4 border-green-400">
                          <div className="flex justify-between items-start">
                            <div>
                              <div className="font-medium">Deposit Approved</div>
                              <div className="text-sm text-gray-600">₹750 via Card</div>
                              <div className="text-xs text-gray-500">Transaction: CARD789012</div>
                            </div>
                            <div className="text-right">
                              <div className="text-sm text-gray-600">2024-01-14</div>
                              <StatusBadge status="Approved" />
                            </div>
                          </div>
                        </div>
                        
                        <div className="bg-white p-3 rounded border-l-4 border-yellow-400">
                          <div className="flex justify-between items-start">
                            <div>
                              <div className="font-medium">Deposit Pending</div>
                              <div className="text-sm text-gray-600">₹1000 via UPI</div>
                              <div className="text-xs text-gray-500">Transaction: UPI456789123</div>
                            </div>
                            <div className="text-right">
                              <div className="text-sm text-gray-600">2024-01-13</div>
                              <StatusBadge status="Pending" />
                            </div>
                          </div>
                        </div>

                        <div className="bg-white p-3 rounded border-l-4 border-red-400">
                          <div className="flex justify-between items-start">
                            <div>
                              <div className="font-medium">Deposit Rejected</div>
                              <div className="text-sm text-gray-600">₹2000 via Wallet</div>
                              <div className="text-xs text-gray-500">Transaction: WALLET123456</div>
                              <div className="text-xs text-red-600 mt-1">Reason: KYC verification required</div>
                            </div>
                            <div className="text-right">
                              <div className="text-sm text-gray-600">2024-01-12</div>
                              <StatusBadge status="Rejected" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-end">
                      <button
                        onClick={() => setShowModal(false)}
                        className="px-4 py-2 text-sm text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Quick Stats Footer */}
        <div className="mt-8 bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-2xl font-bold text-blue-600">
                {games.reduce((sum, game) => sum + getGameStats(game.name).count, 0)}
              </div>
              <div className="text-sm text-gray-600">Total Deposits Today</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">
                ₹{games.reduce((sum, game) => sum + getGameStats(game.name).total, 0).toLocaleString()}
              </div>
              <div className="text-sm text-gray-600">Total Volume</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-yellow-600">
                {games.reduce((sum, game) => sum + getGameStats(game.name).pendingCount, 0)}
              </div>
              <div className="text-sm text-gray-600">Pending Review</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-red-600">
                {games.reduce((sum, game) => sum + getGameStats(game.name).fraudAlerts, 0)}
              </div>
              <div className="text-sm text-gray-600">Security Alerts</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameDepositDashboard;
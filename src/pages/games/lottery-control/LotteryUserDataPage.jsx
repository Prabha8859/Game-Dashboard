import React, { useState } from 'react';
import {
  Eye,
  Settings,
  Edit3,
  Trash2,
  Filter,
  Play,
  Pause,
  StopCircle,
  Users,
  Clock,
  Trophy,
  DollarSign,
  UserCheck,
  AlertTriangle,
  BarChart3,
  RefreshCw,
  Download,
  Search,
  Calendar,
  Star,
  Ticket,
  CreditCard
} from 'lucide-react';

const LotteryUserDataPage = () => {
  const [lotteryData, setLotteryData] = useState([
    {
      id: 'LOT001',
      lotteryId: 'LOTTERY_001',
      lotteryName: 'Weekly Mega Lottery',
      lotteryType: 'Weekly Draw',
      totalTickets: 50000,
      soldTickets: 32450,
      remainingTickets: 17550,
      ticketPrice: 50,
      totalRevenue: 1622500,
      prizePool: 1297000,
      platformFee: 325500,
      firstPrize: 500000,
      secondPrize: 200000,
      thirdPrize: 100000,
      consolationPrizes: 497000,
      drawDate: '2025-09-06T20:00',
      drawStatus: 'Active',
      drawNumbers: null,
      winningNumbers: [],
      createdAt: '2025-09-01 10:00:00',
      lastActivity: '2025-09-04 18:30:22',
      drawType: 'Public',
      category: 'Mega',
      winners: {
        firstPrize: null,
        secondPrize: null,
        thirdPrize: null,
        consolation: []
      },
      topAgents: [
        { name: 'Agent123', tickets: 2500, commission: 25000, region: 'North Delhi' },
        { name: 'SuperAgent', tickets: 2100, commission: 21000, region: 'South Delhi' },
        { name: 'ProSeller', tickets: 1850, commission: 18500, region: 'West Delhi' }
      ],
      salesStats: {
        online: 18450,
        offline: 14000,
        mobile: 12000,
        retail: 6000
      },
      customerCount: 28450,
      averageTicketsPerCustomer: 1.14,
      drawRating: 4.6,
      serverRegion: 'India-North',
      technicalIssues: 0,
      fraudAlerts: 1,
      paymentIssues: 2
    },
    {
      id: 'LOT002',
      lotteryId: 'LOTTERY_002',
      lotteryName: 'Daily Lucky Draw',
      lotteryType: 'Daily Draw',
      totalTickets: 10000,
      soldTickets: 8750,
      remainingTickets: 1250,
      ticketPrice: 20,
      totalRevenue: 175000,
      prizePool: 140000,
      platformFee: 35000,
      firstPrize: 50000,
      secondPrize: 25000,
      thirdPrize: 15000,
      consolationPrizes: 50000,
      drawDate: '2025-09-05T15:00',
      drawStatus: 'Completed',
      drawNumbers: [7, 14, 23, 31, 45],
      winningNumbers: [7, 14, 23, 31, 45],
      createdAt: '2025-09-04 08:00:00',
      lastActivity: '2025-09-05 15:30:00',
      drawType: 'Public',
      category: 'Daily',
      winners: {
        firstPrize: 'TICKET789456',
        secondPrize: 'TICKET654321',
        thirdPrize: 'TICKET987654',
        consolation: ['TICKET111111', 'TICKET222222', 'TICKET333333']
      },
      topAgents: [
        { name: 'DailyAgent1', tickets: 500, commission: 5000, region: 'Central Delhi' },
        { name: 'QuickSell', tickets: 450, commission: 4500, region: 'East Delhi' },
        { name: 'FastAgent', tickets: 400, commission: 4000, region: 'Gurgaon' }
      ],
      salesStats: {
        online: 4200,
        offline: 2000,
        mobile: 2000,
        retail: 550
      },
      customerCount: 7800,
      averageTicketsPerCustomer: 1.12,
      drawRating: 4.3,
      serverRegion: 'India-North',
      technicalIssues: 1,
      fraudAlerts: 0,
      paymentIssues: 0
    },
    {
      id: 'LOT003',
      lotteryId: 'LOTTERY_003',
      lotteryName: 'Instant Win Scratch',
      lotteryType: 'Instant Draw',
      totalTickets: 100000,
      soldTickets: 89000,
      remainingTickets: 11000,
      ticketPrice: 100,
      totalRevenue: 8900000,
      prizePool: 6230000,
      platformFee: 2670000,
      firstPrize: 1000000,
      secondPrize: 500000,
      thirdPrize: 250000,
      consolationPrizes: 4480000,
      drawDate: 'Instant',
      drawStatus: 'Active',
      drawNumbers: null,
      winningNumbers: [],
      createdAt: '2025-08-15 00:00:00',
      lastActivity: '2025-09-04 19:45:10',
      drawType: 'Public',
      category: 'Instant',
      winners: {
        firstPrize: 'SCRATCH001',
        secondPrize: 'SCRATCH002',
        thirdPrize: 'SCRATCH003',
        consolation: ['Multiple winners']
      },
      topAgents: [
        { name: 'ScratchKing', tickets: 5000, commission: 50000, region: 'Mumbai' },
        { name: 'InstantAgent', tickets: 4500, commission: 45000, region: 'Pune' },
        { name: 'QuickWinAgent', tickets: 4200, commission: 42000, region: 'Bangalore' }
      ],
      salesStats: {
        online: 45000,
        offline: 25000,
        mobile: 19000,
        retail: 0
      },
      customerCount: 67000,
      averageTicketsPerCustomer: 1.33,
      drawRating: 4.8,
      serverRegion: 'India-West',
      technicalIssues: 0,
      fraudAlerts: 3,
      paymentIssues: 5
    },
    {
      id: 'LOT004',
      lotteryId: 'LOTTERY_004',
      lotteryName: 'Monthly Bumper',
      lotteryType: 'Monthly Draw',
      totalTickets: 200000,
      soldTickets: 125000,
      remainingTickets: 75000,
      ticketPrice: 200,
      totalRevenue: 25000000,
      prizePool: 18750000,
      platformFee: 6250000,
      firstPrize: 10000000,
      secondPrize: 3000000,
      thirdPrize: 1500000,
      consolationPrizes: 4250000,
      drawDate: '2025-09-30T19:00',
      drawStatus: 'Active',
      drawNumbers: null,
      winningNumbers: [],
      createdAt: '2025-09-01 00:00:00',
      lastActivity: '2025-09-04 20:15:30',
      drawType: 'Public',
      category: 'Bumper',
      winners: {
        firstPrize: null,
        secondPrize: null,
        thirdPrize: null,
        consolation: []
      },
      topAgents: [
        { name: 'BumperAgent', tickets: 8000, commission: 80000, region: 'Chennai' },
        { name: 'MegaSeller', tickets: 7500, commission: 75000, region: 'Hyderabad' },
        { name: 'TopAgent99', tickets: 7000, commission: 70000, region: 'Kolkata' }
      ],
      salesStats: {
        online: 60000,
        offline: 35000,
        mobile: 30000,
        retail: 0
      },
      customerCount: 98000,
      averageTicketsPerCustomer: 1.28,
      drawRating: 4.9,
      serverRegion: 'India-South',
      technicalIssues: 0,
      fraudAlerts: 2,
      paymentIssues: 1
    }
  ]);

  const [statusFilter, setStatusFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState('All');
  const [editingRow, setEditingRow] = useState(null);
  const [editData, setEditData] = useState({});
  const [viewingLottery, setViewingLottery] = useState(null);
  const [managingLottery, setManagingLottery] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Helper functions
  const getStatusBadge = (status) => {
    const statusClasses = {
      Active: 'bg-green-50 text-green-700 border-green-200',
      Completed: 'bg-gray-50 text-gray-700 border-gray-200',
      Paused: 'bg-orange-50 text-orange-700 border-orange-200',
      Cancelled: 'bg-red-50 text-red-700 border-red-200'
    };
    return statusClasses[status] || 'bg-gray-50 text-gray-700 border-gray-200';
  };

  const getCategoryColor = (category) => {
    const colors = {
      Daily: 'text-blue-600',
      Weekly: 'text-purple-600',
      Monthly: 'text-orange-600',
      Mega: 'text-red-600',
      Bumper: 'text-pink-600',
      Instant: 'text-green-600'
    };
    return colors[category] || 'text-gray-600';
  };

  const filteredData = lotteryData.filter(lottery =>
    (statusFilter === 'All' || lottery.drawStatus === statusFilter) &&
    (typeFilter === 'All' || lottery.lotteryType === typeFilter) &&
    (searchTerm === '' ||
      lottery.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lottery.lotteryName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lottery.lotteryType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (lottery.winners.firstPrize && lottery.winners.firstPrize.toString().toLowerCase().includes(searchTerm.toLowerCase())) ||
      lottery.topAgents.some(a => a.name.toLowerCase().includes(searchTerm.toLowerCase()))
    )
  );

  // CRUD & Actions
  const handleEdit = (lottery) => {
    setEditingRow(lottery.id);
    setEditData({
      ticketPrice: lottery.ticketPrice,
      totalTickets: lottery.totalTickets,
      firstPrize: lottery.firstPrize,
      secondPrize: lottery.secondPrize,
      thirdPrize: lottery.thirdPrize,
      drawDate: lottery.drawDate,
      drawStatus: lottery.drawStatus,
      drawType: lottery.drawType,
      category: lottery.category
    });
  };

  const handleSave = () => {
    setLotteryData(prev => prev.map(lottery =>
      lottery.id === editingRow
        ? {
          ...lottery,
          ticketPrice: parseInt(editData.ticketPrice),
          totalTickets: parseInt(editData.totalTickets),
          firstPrize: parseInt(editData.firstPrize),
          secondPrize: parseInt(editData.secondPrize),
          thirdPrize: parseInt(editData.thirdPrize),
          drawDate: editData.drawDate,
          drawStatus: editData.drawStatus,
          drawType: editData.drawType,
          category: editData.category
        }
        : lottery
    ));
    setEditingRow(null);
    setEditData({});
  };

  const handleCancel = () => {
    setEditingRow(null);
    setEditData({});
  };

  const handleView = (lottery) => {
    setViewingLottery(lottery);
  };

  const handleManage = (lottery) => {
    setManagingLottery(lottery);
  };

  const handleLotteryAction = (lotteryId, action) => {
    let newStatus = '';
    switch (action) {
      case 'pause':
        newStatus = 'Paused';
        break;
      case 'resume':
        newStatus = 'Active';
        break;
      case 'complete':
        newStatus = 'Completed';
        break;
      case 'cancel':
        newStatus = 'Cancelled';
        break;
      case 'start':
        newStatus = 'Active';
        break;
      default:
        newStatus = 'Active';
    }
    setLotteryData(prev => prev.map(lottery =>
      lottery.id === lotteryId ? { ...lottery, drawStatus: newStatus } : lottery
    ));
    setManagingLottery(null);
  };

  const handleDelete = (lotteryId) => {
    if (window.confirm('Are you sure you want to delete this lottery? This action cannot be undone.')) {
      setLotteryData(prev => prev.filter(lottery => lottery.id !== lotteryId));
    }
  };

  const exportData = () => {
    const csvContent = filteredData.map(lottery =>
      `${lottery.id},${lottery.lotteryName},${lottery.ticketPrice},${lottery.totalRevenue},${lottery.soldTickets},${lottery.drawStatus},${lottery.winners.firstPrize || 'N/A'}`
    ).join('\n');
    const blob = new Blob([`ID,Lottery Name,Ticket Price,Revenue,Sold Tickets,Status,First Prize Winner\n${csvContent}`],
      { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'lottery_report.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Lottery Admin Dashboard</h1>
        <p className="text-gray-600 mt-1">Manage and monitor all lottery draws and ticket sales</p>
      </div>

      {/* Main Table */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200 overflow-x-auto">
        <div className="p-4 border-b border-gray-200 bg-white">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <h2 className="text-xl font-bold text-gray-900">Live Lottery Management</h2>
            <div className="flex items-center gap-4 flex-wrap">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search lotteries, winners..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm w-64"
                />
              </div>

              <div className="flex items-center gap-3">
                {/* Status Filter */}
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-gray-500" />
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                  >
                    <option value="All">All Status</option>
                    <option value="Active">Active</option>
                    <option value="Completed">Completed</option>
                    <option value="Paused">Paused</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>

                {/* Type Filter */}
                <select
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                >
                  <option value="All">All Types</option>
                  <option value="Daily Draw">Daily Draw</option>
                  <option value="Weekly Draw">Weekly Draw</option>
                  <option value="Monthly Draw">Monthly Draw</option>
                  <option value="Instant Draw">Instant Draw</option>
                </select>

                {/* Export Button */}
                <button
                  onClick={exportData}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-all duration-200"
                >
                  <Download className="w-4 h-4" />
                  Export
                </button>

                {/* Refresh Button */}
                <button
                  onClick={() => window.location.reload()}
                  className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-all duration-200"
                >
                  <RefreshCw className="w-4 h-4" />
                  Refresh
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">Lottery Info</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">Ticket Sales</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">Revenue & Prizes</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">Draw Details</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">Winners</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">Top Agents</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">Status & Issues</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredData.map((lottery) => (
                <tr key={lottery.id} className="hover:bg-gray-50 transition-colors duration-200">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-bold text-gray-900">{lottery.id}</div>
                    <div className="text-sm text-blue-600 font-medium">{lottery.lotteryName}</div>
                    <div className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                      <Calendar className="w-3 h-3" />
                      {lottery.createdAt}
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`text-xs font-semibold ${getCategoryColor(lottery.category)}`}>
                        {lottery.category}
                      </span>
                      <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded">{lottery.drawType}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2 mb-2">
                      <Ticket className="w-4 h-4 text-blue-500" />
                      <span className="text-sm font-bold text-gray-900">
                        {lottery.soldTickets.toLocaleString()}/{lottery.totalTickets.toLocaleString()}
                      </span>
                    </div>
                    <div className="text-xs text-gray-500">Rs.{lottery.ticketPrice} per ticket</div>
                    <div className="text-xs text-gray-500">Remaining: {lottery.remainingTickets.toLocaleString()}</div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${(lottery.soldTickets / lottery.totalTickets) * 100}%` }}
                      ></div>
                    </div>
                    <div className="text-xs text-gray-400 mt-1">
                      {Math.round((lottery.soldTickets / lottery.totalTickets) * 100)}% sold
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-bold text-green-600">Rs.{lottery.totalRevenue.toLocaleString()}</div>
                    <div className="text-xs text-gray-500">Revenue</div>
                    <div className="text-sm font-bold text-blue-600 mt-1">Rs.{lottery.prizePool.toLocaleString()}</div>
                    <div className="text-xs text-gray-500">Prize Pool</div>
                    <div className="text-sm font-bold text-orange-600 mt-1">Rs.{lottery.firstPrize.toLocaleString()}</div>
                    <div className="text-xs text-gray-500">First Prize</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{lottery.lotteryType}</div>
                    <div className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                      <Clock className="w-3 h-3 text-orange-500" />
                      {lottery.drawDate === 'Instant'
                        ? 'Instant'
                        : new Date(lottery.drawDate).toLocaleDateString()}
                    </div>
                    {lottery.winningNumbers && lottery.winningNumbers.length > 0 && (
                      <div className="flex gap-1 mt-2">
                        {lottery.winningNumbers.map((num, idx) => (
                          <span key={idx} className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full font-bold">
                            {num}
                          </span>
                        ))}
                      </div>
                    )}
                    <div className="text-xs text-gray-400 mt-2">
                      Customers: {lottery.customerCount.toLocaleString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="space-y-1">
                      {lottery.winners.firstPrize ? (
                        <div className="text-xs bg-yellow-50 p-2 rounded">
                          <Trophy className="w-3 h-3 text-yellow-600 inline mr-1" />
                          <span className="font-bold text-yellow-700">1st: {lottery.winners.firstPrize}</span>
                        </div>
                      ) : (
                        <div className="text-xs text-gray-400">No winner yet</div>
                      )}
                      {lottery.winners.secondPrize && (
                        <div className="text-xs bg-gray-50 p-2 rounded">
                          <span className="font-medium text-gray-700">2nd: {lottery.winners.secondPrize}</span>
                        </div>
                      )}
                      {lottery.winners.thirdPrize && (
                        <div className="text-xs bg-orange-50 p-2 rounded">
                          <span className="font-medium text-orange-700">3rd: {lottery.winners.thirdPrize}</span>
                        </div>
                      )}
                      {lottery.winners.consolation && lottery.winners.consolation.length > 0 && (
                        <div className="text-xs text-gray-500">
                          +{lottery.winners.consolation.length} consolation
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="space-y-2">
                      {lottery.topAgents.slice(0, 3).map((agent, index) => (
                        <div key={index} className="flex items-center justify-between text-xs">
                          <div className="min-w-0 flex-1">
                            <div className="font-medium text-gray-900 truncate">{agent.name}</div>
                            <div className="text-gray-500 truncate">{agent.region}</div>
                          </div>
                          <div className="text-right ml-2">
                            <div className="font-bold text-blue-600">{agent.tickets}</div>
                            <div className="text-gray-500">Rs.{agent.commission}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="space-y-2">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${getStatusBadge(lottery.drawStatus)}`}>
                        {lottery.drawStatus}
                      </span>
                      <div className="space-y-1">
                        {lottery.technicalIssues > 0 && (
                          <div className="flex items-center gap-1 text-xs text-orange-600">
                            <AlertTriangle className="w-3 h-3" />
                            {lottery.technicalIssues} tech issues
                          </div>
                        )}
                        {lottery.fraudAlerts > 0 && (
                          <div className="flex items-center gap-1 text-xs text-red-600">
                            <AlertTriangle className="w-3 h-3" />
                            {lottery.fraudAlerts} fraud alerts
                          </div>
                        )}
                        {lottery.paymentIssues > 0 && (
                          <div className="flex items-center gap-1 text-xs text-yellow-600">
                            <CreditCard className="w-3 h-3" />
                            {lottery.paymentIssues} payment issues
                          </div>
                        )}
                        <div className="flex items-center gap-2 text-xs">
                          <Star className="w-3 h-3 text-yellow-500" />
                          <span>{lottery.drawRating}/5</span>
                        </div>
                      </div>
                      <div className="flex gap-1 flex-wrap">
                        <button
                          onClick={() => handleView(lottery)}
                          className="bg-white hover:bg-blue-50 text-blue-700 border border-blue-300 px-2 py-1 rounded text-xs font-medium flex items-center gap-1 transition-colors duration-200"
                        >
                          <Eye className="w-3 h-3" />
                         
                        </button>
                        <button
                          onClick={() => handleManage(lottery)}
                          className="bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 px-2 py-1 rounded text-xs font-medium flex items-center gap-1 transition-colors duration-200"
                        >
                          <Settings className="w-3 h-3" />
                          
                        </button>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(lottery)}
                        className="bg-white hover:bg-blue-50 text-blue-700 border border-blue-300 p-2 rounded-lg transition-colors duration-200"
                        title="Edit Lottery Settings"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(lottery.id)}
                        className="bg-white hover:bg-red-50 text-red-600 border border-red-300 p-2 rounded-lg transition-colors duration-200"
                        title="Delete Lottery"
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
      </div>

      {/* Edit Lottery Modal */}
      {editingRow && (
        <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50 ">
          <div className="bg-white rounded-2xl p-6 w-full my-5 shadow-2xl h-150 overflow-x-auto max-w-[100vh]">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-900">Edit Lottery Settings</h3>
              <button
                onClick={handleCancel}
                className="text-gray-400 hover:text-gray-600 text-3xl font-bold cursor-pointer"
              >
                ×
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Ticket Price (₹)</label>
                <input
                  type="number"
                  value={editData.ticketPrice}
                  onChange={(e) => setEditData({ ...editData, ticketPrice: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-pointer"
                  placeholder="Ticket Price"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Total Tickets</label>
                <input
                  type="number"
                  value={editData.totalTickets}
                  onChange={(e) => setEditData({ ...editData, totalTickets: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-pointer"
                  placeholder="Total Tickets"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">First Prize</label>
                <input
                  type="number"
                  value={editData.firstPrize}
                  onChange={(e) => setEditData({ ...editData, firstPrize: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-pointer"
                  placeholder="First Prize"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Second Prize</label>
                <input
                  type="number"
                  value={editData.secondPrize}
                  onChange={(e) => setEditData({ ...editData, secondPrize: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-pointer"
                  placeholder="Second Prize"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Third Prize</label>
                <input
                  type="number"
                  value={editData.thirdPrize}
                  onChange={(e) => setEditData({ ...editData, thirdPrize: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-pointer"
                  placeholder="Third Prize"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Draw Date</label>
                <input
                  type="datetime-local"
                  value={editData.drawDate}
                  onChange={(e) => setEditData({ ...editData, drawDate: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-pointer"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Draw Status</label>
                <select
                  value={editData.drawStatus}
                  onChange={(e) => setEditData({ ...editData, drawStatus: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-pointer"
                >
                  <option value="Active">Active</option>
                  <option value="Paused">Paused</option>
                  <option value="Cancelled">Cancelled</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={handleSave}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium flex items-center justify-center gap-2 transition-all duration-200 hover:shadow-lg cursor-pointer"
              >
                <UserCheck className="w-4 h-4" />
                Save Changes
              </button>
              <button
                onClick={handleCancel}
                className="flex-1 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200 hover:shadow-lg cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View Lottery Modal */}
      {viewingLottery && (
        <div className="fixed inset-0 bg-black/40 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900">
                Lottery Details - {viewingLottery.id}
              </h3>
              <button
                onClick={() => setViewingLottery(null)}
                className="text-gray-400 hover:text-gray-600 text-3xl font-bold cursor-pointer"
              >
                ×
              </button>
            </div>
            <div className="space-y-2">
              <div><b>Name:</b> {viewingLottery.lotteryName}</div>
              <div><b>Type:</b> {viewingLottery.lotteryType}</div>
              <div><b>Draw Date:</b> {viewingLottery.drawDate === 'Instant' ? 'Instant' : new Date(viewingLottery.drawDate).toLocaleString()}</div>
              <div><b>Status:</b> {viewingLottery.drawStatus}</div>
              <div><b>Category:</b> {viewingLottery.category}</div>
              <div><b>Customers:</b> {viewingLottery.customerCount}</div>
              <div><b>Total Revenue:</b> ₹{viewingLottery.totalRevenue.toLocaleString()}</div>
              <div><b>Prize Pool:</b> ₹{viewingLottery.prizePool.toLocaleString()}</div>
              <div><b>First Prize:</b> ₹{viewingLottery.firstPrize.toLocaleString()}</div>
              <div><b>Second Prize:</b> ₹{viewingLottery.secondPrize.toLocaleString()}</div>
              <div><b>Third Prize:</b> ₹{viewingLottery.thirdPrize.toLocaleString()}</div>
              <div><b>Top Agents:</b>
                <ul className="list-disc pl-5">
                  {viewingLottery.topAgents.map((a, idx) =>
                    <li key={idx}>{a.name} - {a.region} ({a.tickets} tickets)</li>
                  )}
                </ul>
              </div>
              <div><b>Draw Rating:</b> {viewingLottery.drawRating}/5</div>
              <div className="mt-3">
                <b>Status & Issues:</b>
                <ul>
                  {viewingLottery.technicalIssues > 0 && <li>🟠 {viewingLottery.technicalIssues} Technical Issues</li>}
                  {viewingLottery.fraudAlerts > 0 && <li>🔴 {viewingLottery.fraudAlerts} Fraud Alerts</li>}
                  {viewingLottery.paymentIssues > 0 && <li>🟡 {viewingLottery.paymentIssues} Payment Issues</li>}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Manage Lottery Modal */}
      {managingLottery && (
        <div className="fixed inset-0 bg-black/40 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full mx-4 shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-900">Manage Lottery - {managingLottery.id}</h3>
              <button
                onClick={() => setManagingLottery(null)}
                className="text-gray-400 hover:text-gray-600 text-3xl font-bold cursor-pointer"
              >
                ×
              </button>
            </div>
            <div className="space-y-3">
              <div className="bg-gray-50 p-4 rounded-lg mb-4">
                <div className="text-sm text-gray-600 space-y-1">
                  <div className="flex justify-between">
                    <span className="font-semibold">Name:</span>
                    <span>{managingLottery.lotteryName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold">Current Status:</span>
                    <span className={`px-2 py-1 rounded text-xs ${getStatusBadge(managingLottery.drawStatus)}`}>
                      {managingLottery.drawStatus}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold">Type:</span>
                    <span>{managingLottery.lotteryType}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold">Category:</span>
                    <span>{managingLottery.category}</span>
                  </div>
                </div>
              </div>
              <p className="text-gray-600 mb-4 font-medium">Choose an action for this lottery:</p>
              <button
                onClick={() => handleLotteryAction(managingLottery.id, 'pause')}
                className="w-full bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-all duration-200 hover:shadow-lg cursor-pointer"
                disabled={managingLottery.drawStatus === 'Paused' || managingLottery.drawStatus === 'Completed' || managingLottery.drawStatus === 'Cancelled'}
              >
                <Pause className="w-5 h-5" />
                Pause Lottery
              </button>
              <button
                onClick={() => handleLotteryAction(managingLottery.id, 'resume')}
                className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-all duration-200 hover:shadow-lg cursor-pointer"
                disabled={managingLottery.drawStatus !== 'Paused'}
              >
                <Play className="w-5 h-5" />
                Resume Lottery
              </button>
              <button
                onClick={() => handleLotteryAction(managingLottery.id, 'complete')}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-all duration-200 hover:shadow-lg cursor-pointer"
                disabled={managingLottery.drawStatus === 'Completed' || managingLottery.drawStatus === 'Cancelled'}
              >
                <DollarSign className="w-5 h-5" />
                Mark as Completed
              </button>
              <button
                onClick={() => handleLotteryAction(managingLottery.id, 'cancel')}
                className="w-full bg-red-600 hover:bg-red-700 text-white px-4 py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-all duration-200 hover:shadow-lg cursor-pointer"
                disabled={managingLottery.drawStatus === 'Cancelled' || managingLottery.drawStatus === 'Completed'}
              >
                <StopCircle className="w-5 h-5" />
                Cancel Lottery
              </button>
              <button
                onClick={() => setManagingLottery(null)}
                className="w-full bg-gray-600 hover:bg-gray-700 text-white px-4 py-3 rounded-lg font-medium transition-all duration-200 hover:shadow-lg cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LotteryUserDataPage;

import React, { useState, useEffect } from 'react';
import { 
  Calendar, Clock, DollarSign, Hash, Save, Calculator, Ticket, 
  Search, Download, Copy, Users, TrendingUp, CheckCircle, 
  XCircle, Edit3, Filter, BarChart3, RefreshCw, Settings,
  Eye, EyeOff, Plus, Minus, Trophy, Crown, Gift, Bell,
  Award, Target, Timer, Zap, Star, AlertCircle, Trash2,
  Package, Archive
} from 'lucide-react';

const LotteryAdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('settings');
  
  // Settings State
  const [settings, setSettings] = useState({
    lotteryName: '',
    lotteryDate: '',
    salesStartTime: '',
    salesEndTime: '',
    resultTime: '',
    ticketPrice: '',
    ticketRangeStart: '1E200',
    ticketRangeEnd: '1F900',
    totalTickets: 0,
    prizeAmount: '',
    lotteryCode: ''
  });

  // Lottery Management State
  const [lotteries, setLotteries] = useState([]);
  const [selectedLotteryForWinner, setSelectedLotteryForWinner] = useState('');

  // Tickets Management State
  const [tickets, setTickets] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [editingTicket, setEditingTicket] = useState(null);
  const [showBuyerInput, setShowBuyerInput] = useState({});
  
  // Winner Management State
  const [selectedWinner, setSelectedWinner] = useState('');
  const [winnerDetails, setWinnerDetails] = useState({
    lotteryCode: '',
    lotteryName: '',
    ticketNumber: '',
    buyerName: '',
    buyerCity: '',
    buyerImage: '',
    prizeAmount: '',
    announcementDate: ''
  });
  const [isWinnerSelected, setIsWinnerSelected] = useState(false);
  const [showWinnerModal, setShowWinnerModal] = useState(false);
  const [winnersHistory, setWinnersHistory] = useState([]);
  
  // Manual Winner Selection State
  const [manualWinners, setManualWinners] = useState([]);
  const [manualWinnerForm, setManualWinnerForm] = useState({
    position: '1st',
    playerName: '',
    playerId: '',
    ticketId: '',
    ticketNumber: '',
    prizeAmount: '',
    lotteryCode: '',
    city: ''
  });
  const [showManualWinnerModal, setShowManualWinnerModal] = useState(false);
  
  // Countdown State
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Sample ticket data for demo
  useEffect(() => {
    if (tickets.length === 0) {
      generateSampleTickets();
    }
    
    // Load sample lotteries
    const sampleLotteries = [
      {
        id: 1,
        code: 'DW2025001',
        name: 'Diwali Special 2025',
        ticketPrice: 100,
        prizeAmount: 50000,
        status: 'active',
        createdDate: '2024-10-15',
        drawDate: '2024-11-01',
        totalTickets: 500,
        soldTickets: 350
      },
      {
        id: 2,
        code: 'NY2025002',
        name: 'New Year Bumper',
        ticketPrice: 200,
        prizeAmount: 100000,
        status: 'upcoming',
        createdDate: '2024-11-20',
        drawDate: '2024-12-31',
        totalTickets: 750,
        soldTickets: 120
      },
      {
        id: 3,
        code: 'HD2024003',
        name: 'Holi Dhamaka',
        ticketPrice: 150,
        prizeAmount: 75000,
        status: 'completed',
        createdDate: '2024-02-15',
        drawDate: '2024-03-15',
        totalTickets: 600,
        soldTickets: 600
      }
    ];
    setLotteries(sampleLotteries);
    
    // Load sample winners history
    const sampleWinners = [
      {
        id: 1,
        lotteryCode: 'HD2024003',
        lotteryName: 'Holi Dhamaka',
        ticketNumber: '1E225',
        buyerName: 'Raj Kumar',
        buyerCity: 'Mumbai',
        buyerImage: '👤',
        prizeAmount: 75000,
        announcementDate: '2024-03-15',
        status: 'paid'
      },
      {
        id: 2,
        lotteryCode: 'WD2024004',
        lotteryName: 'Winter Special',
        ticketNumber: '1F150',
        buyerName: 'Priya Sharma',
        buyerCity: 'Delhi',
        buyerImage: '👤',
        prizeAmount: 42000,
        announcementDate: '2024-01-31',
        status: 'paid'
      },
      {
        id: 3,
        lotteryCode: 'DW2025001',
        lotteryName: 'Diwali Special 2025',
        ticketNumber: '1E315',
        buyerName: 'Amit Singh',
        buyerCity: 'Jaipur',
        buyerImage: '👤',
        prizeAmount: 50000,
        announcementDate: '2024-11-01',
        status: 'announced'
      }
    ];
    setWinnersHistory(sampleWinners);

    // Load sample manual winners
    const sampleManualWinners = [
      {
        id: 1,
        position: '1st',
        playerName: 'Rohit Sharma',
        playerId: 'PL001',
        ticketId: 'T001',
        ticketNumber: '1E100',
        prizeAmount: 100000,
        lotteryCode: 'DW2025001',
        city: 'Mumbai',
        createdDate: '2024-11-01',
        status: 'announced'
      },
      {
        id: 2,
        position: '2nd',
        playerName: 'Virat Kohli',
        playerId: 'PL002',
        ticketId: 'T002',
        ticketNumber: '1E200',
        prizeAmount: 50000,
        lotteryCode: 'DW2025001',
        city: 'Delhi',
        createdDate: '2024-11-01',
        status: 'announced'
      },
      {
        id: 3,
        position: '3rd',
        playerName: 'MS Dhoni',
        playerId: 'PL003',
        ticketId: 'T003',
        ticketNumber: '1E300',
        prizeAmount: 25000,
        lotteryCode: 'DW2025001',
        city: 'Chennai',
        createdDate: '2024-11-01',
        status: 'announced'
      }
    ];
    setManualWinners(sampleManualWinners);
  }, []);

  // Countdown Timer Effect
  useEffect(() => {
    if (settings.lotteryDate && settings.resultTime) {
      const timer = setInterval(() => {
        const now = new Date().getTime();
        const drawDate = new Date(`${settings.lotteryDate} ${settings.resultTime}`).getTime();
        const distance = drawDate - now;

        if (distance > 0) {
          setCountdown({
            days: Math.floor(distance / (1000 * 60 * 60 * 24)),
            hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
            minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
            seconds: Math.floor((distance % (1000 * 60)) / 1000)
          });
        }
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [settings.lotteryDate, settings.resultTime]);

  const generateSampleTickets = () => {
    const sampleTickets = [];
    const statuses = ['available', 'sold'];
    const buyers = ['Raj Kumar', 'Priya Sharma', 'Amit Singh', '', 'Sunita Devi', '', 'Rohit Gupta'];
    
    for (let i = 200; i <= 250; i++) {
      const status = Math.random() > 0.6 ? 'sold' : 'available';
      sampleTickets.push({
        id: i,
        ticketNumber: `1E${i}`,
        status: status,
        buyer: status === 'sold' ? buyers[Math.floor(Math.random() * buyers.length)] : '',
        soldAt: status === 'sold' ? new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000) : null,
        price: status === 'sold' ? (parseFloat(settings.ticketPrice) || 100) : (parseFloat(settings.ticketPrice) || 100)
      });
    }
    setTickets(sampleTickets);
  };

  // Calculate total tickets based on range
  const calculateTotalTickets = () => {
    const { ticketRangeStart, ticketRangeEnd } = settings;
    
    if (!ticketRangeStart || !ticketRangeEnd) {
      setMessage('❌ Please enter valid ticket range');
      return;
    }

    try {
      const startNum = parseInt(ticketRangeStart.replace(/[A-Z]/g, ''));
      const endNum = parseInt(ticketRangeEnd.replace(/[A-Z]/g, ''));
      
      if (startNum && endNum && endNum > startNum) {
        const total = endNum - startNum + 1;
        setSettings(prev => ({ ...prev, totalTickets: total }));
        setMessage(`✅ Total ${total} tickets calculated!`);
      } else {
        setMessage('❌ Invalid range format');
      }
    } catch (error) {
      setMessage('❌ Error in calculation');
    }
  };

  // Generate all tickets
  const generateTickets = () => {
    setLoading(true);
    setMessage('🔄 Generating tickets...');

    const { ticketRangeStart, ticketRangeEnd } = settings;
    
    try {
      const startPrefix = ticketRangeStart.replace(/[0-9]/g, '');
      const startNum = parseInt(ticketRangeStart.replace(/[A-Z]/g, ''));
      const endNum = parseInt(ticketRangeEnd.replace(/[A-Z]/g, ''));

      if (startNum && endNum) {
        const newTickets = [];
        for (let i = startNum; i <= endNum; i++) {
          newTickets.push({
            id: i,
            ticketNumber: `${startPrefix}${i}`,
            status: 'available',
            buyer: '',
            soldAt: null,
            price: parseFloat(settings.ticketPrice) || 100
          });
        }
        setTickets(newTickets);
        setMessage(`✅ ${newTickets.length} tickets generated successfully!`);
      }
    } catch (error) {
      setMessage('❌ Error generating tickets');
    }
    
    setLoading(false);
  };

  // Save settings and create lottery
  const saveSettings = () => {
    setLoading(true);
    setMessage('💾 Creating lottery...');

    // Generate lottery code if not provided
    const lotteryCode = settings.lotteryCode || `LT${Date.now().toString().slice(-6)}`;
    
    const newLottery = {
      id: lotteries.length + 1,
      code: lotteryCode,
      name: settings.lotteryName,
      ticketPrice: parseFloat(settings.ticketPrice) || 0,
      prizeAmount: parseFloat(settings.prizeAmount) || 0,
      status: 'active',
      createdDate: new Date().toISOString().split('T')[0],
      drawDate: settings.lotteryDate,
      totalTickets: settings.totalTickets,
      soldTickets: tickets.filter(t => t.status === 'sold').length
    };

    setTimeout(() => {
      if (settings.lotteryName && settings.ticketPrice && settings.prizeAmount) {
        setLotteries(prev => [newLottery, ...prev]);
        setSettings(prev => ({ ...prev, lotteryCode }));
        setMessage(`✅ Lottery "${settings.lotteryName}" created successfully! Code: ${lotteryCode}`);
      } else {
        setMessage('✅ Settings saved successfully!');
      }
      setLoading(false);
    }, 1500);
  };

  // Winner Selection Functions
  const selectWinner = () => {
    if (!selectedWinner) {
      setMessage('❌ Please enter a ticket number');
      return;
    }

    if (!selectedLotteryForWinner) {
      setMessage('❌ Please select a lottery first');
      return;
    }

    const selectedLottery = lotteries.find(l => l.code === selectedLotteryForWinner);
    if (!selectedLottery) {
      setMessage('❌ Selected lottery not found');
      return;
    }

    const winnerTicket = tickets.find(ticket => 
      ticket.ticketNumber.toLowerCase() === selectedWinner.toLowerCase() && 
      ticket.status === 'sold'
    );

    if (!winnerTicket) {
      setMessage('❌ Ticket not found or not sold');
      return;
    }
    
    setWinnerDetails({
      lotteryCode: selectedLottery.code,
      lotteryName: selectedLottery.name,
      ticketNumber: winnerTicket.ticketNumber,
      buyerName: winnerTicket.buyer,
      buyerCity: 'Delhi', // You can add city field to tickets later
      buyerImage: '👤',
      prizeAmount: selectedLottery.prizeAmount,
      announcementDate: new Date().toLocaleDateString('en-IN')
    });

    setIsWinnerSelected(true);
    setShowWinnerModal(true);
    setMessage('🏆 Winner selected successfully!');
  };

  const announceWinner = () => {
    const newWinner = {
      id: winnersHistory.length + 1,
      lotteryCode: winnerDetails.lotteryCode,
      lotteryName: winnerDetails.lotteryName,
      ticketNumber: winnerDetails.ticketNumber,
      buyerName: winnerDetails.buyerName,
      buyerCity: winnerDetails.buyerCity,
      buyerImage: winnerDetails.buyerImage,
      prizeAmount: winnerDetails.prizeAmount,
      announcementDate: new Date().toISOString().split('T')[0],
      status: 'announced'
    };
    
    setWinnersHistory(prev => [newWinner, ...prev]);
    setMessage(`🎉 Winner Announced! ${winnerDetails.ticketNumber} - ${winnerDetails.buyerName} wins ₹${winnerDetails.prizeAmount.toLocaleString()}!`);
    setShowWinnerModal(false);
    setSelectedWinner('');
    setSelectedLotteryForWinner('');
  };

  // Manual Winner Functions
  const addManualWinner = () => {
    const { position, playerName, playerId, ticketId, ticketNumber, prizeAmount, lotteryCode, city } = manualWinnerForm;
    
    if (!playerName || !playerId || !ticketNumber || !prizeAmount || !lotteryCode) {
      setMessage('❌ Please fill all required fields');
      return;
    }

    const newManualWinner = {
      id: manualWinners.length + 1,
      position,
      playerName,
      playerId,
      ticketId: ticketId || `T${Date.now().toString().slice(-6)}`,
      ticketNumber,
      prizeAmount: parseFloat(prizeAmount),
      lotteryCode,
      city: city || 'Mumbai',
      createdDate: new Date().toISOString().split('T')[0],
      status: 'announced'
    };

    setManualWinners(prev => [newManualWinner, ...prev]);
    setMessage(`🎉 Manual winner added! ${position} place - ${playerName} wins ₹${parseFloat(prizeAmount).toLocaleString()}!`);
    setShowManualWinnerModal(false);
    
    // Reset form
    setManualWinnerForm({
      position: '1st',
      playerName: '',
      playerId: '',
      ticketId: '',
      ticketNumber: '',
      prizeAmount: '',
      lotteryCode: '',
      city: ''
    });
  };

  const deleteManualWinner = (winnerId) => {
    if (window.confirm('Are you sure you want to delete this winner?')) {
      setManualWinners(prev => prev.filter(winner => winner.id !== winnerId));
      setMessage('🗑️ Manual winner deleted successfully!');
    }
  };

  // Ticket Management Functions
  const updateTicketStatus = (ticketId, newStatus, buyer = '') => {
    setTickets(prev => prev.map(ticket => 
      ticket.id === ticketId 
        ? { 
            ...ticket, 
            status: newStatus, 
            buyer: newStatus === 'sold' ? buyer : '',
            soldAt: newStatus === 'sold' ? new Date() : null,
            price: parseFloat(settings.ticketPrice) || 100
          }
        : ticket
    ));
    setEditingTicket(null);
    setShowBuyerInput(prev => ({ ...prev, [ticketId]: false }));
  };

  const updateTicketPrice = (ticketId, newPrice) => {
    setTickets(prev => prev.map(ticket => 
      ticket.id === ticketId 
        ? { ...ticket, price: parseFloat(newPrice) || 0 }
        : ticket
    ));
  };

  const copyTicketNumber = (ticketNumber) => {
    navigator.clipboard.writeText(ticketNumber);
    setMessage(`📋 Ticket ${ticketNumber} copied to clipboard!`);
    setTimeout(() => setMessage(''), 2000);
  };

  // Export to CSV
  const exportToCSV = () => {
    const csvContent = [
      ['Ticket Number', 'Status', 'Buyer', 'Price', 'Sold Date'],
      ...filteredTickets.map(ticket => [
        ticket.ticketNumber,
        ticket.status,
        ticket.buyer || 'N/A',
        ticket.price,
        ticket.soldAt ? ticket.soldAt.toLocaleDateString() : 'N/A'
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `lottery-tickets-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
    setMessage('📥 CSV exported successfully!');
  };

  // Delete Lottery
  const deleteLottery = (lotteryId) => {
    if (window.confirm('Are you sure you want to delete this lottery?')) {
      setLotteries(prev => prev.filter(lottery => lottery.id !== lotteryId));
      setMessage('🗑️ Lottery deleted successfully!');
    }
  };

  // Update Lottery Status
  const updateLotteryStatus = (lotteryId, newStatus) => {
    setLotteries(prev => prev.map(lottery => 
      lottery.id === lotteryId 
        ? { ...lottery, status: newStatus }
        : lottery
    ));
    setMessage(`✅ Lottery status updated to ${newStatus}!`);
  };

  // Filter tickets
  const filteredTickets = tickets.filter(ticket => {
    const matchesSearch = ticket.ticketNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (ticket.buyer && ticket.buyer.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesFilter = filterStatus === 'all' || ticket.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  // Calculate stats
  const stats = {
    total: tickets.length,
    sold: tickets.filter(t => t.status === 'sold').length,
    available: tickets.filter(t => t.status === 'available').length,
    revenue: tickets.filter(t => t.status === 'sold').reduce((sum, ticket) => sum + (ticket.price || 0), 0)
  };

  const handleInputChange = (field, value) => {
    setSettings(prev => ({ ...prev, [field]: value }));
    setMessage('');
  };

  const handleManualWinnerFormChange = (field, value) => {
    setManualWinnerForm(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
         <div className="flex items-center  py-6" >
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                🎰 Lottery Admin Controller
              </h1>
              <p className="text-gray-600 text-sm">Complete Lottery Management System</p>
            </div>
          </div>
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8 gap-6">
         

          <div className="flex items-center gap-4 mx-20">
            <div className="bg-white rounded-2xl p-2 shadow-lg  flex items-center">
              <button
                onClick={() => setActiveTab('settings')}
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 flex items-center whitespace-nowrap ${
                  activeTab === 'settings'
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg'
                    : 'text-gray-600 hover:text-purple-600'
                }`}
              >
                <Settings className="w-5 h-5 mr-2" />
                Lottery Settings
              </button>
              <button
                onClick={() => setActiveTab('management')}
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 flex items-center whitespace-nowrap ${
                  activeTab === 'management'
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg'
                    : 'text-gray-600 hover:text-purple-600'
                }`}
              >
                <Package className="w-5 h-5 mr-2" />
                Lottery Management
              </button>
              <button
                onClick={() => setActiveTab('winner')}
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 flex items-center whitespace-nowrap ${
                  activeTab === 'winner'
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg'
                    : 'text-gray-600 hover:text-purple-600'
                }`}
              >
                <Trophy className="w-5 h-5 mr-2" />
                Winner Control
              </button>
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={() => setMessage('🔄 Refreshing data...')}
                className="p-3 bg-white rounded-xl shadow-lg border hover:shadow-xl transition-all duration-200 text-gray-600 hover:text-blue-600"
                title="Refresh Data"
              >
                <RefreshCw className="w-5 h-5" />
              </button>
              <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-blue-500 rounded-xl flex items-center justify-center shadow-lg">
                <Users className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Message Display */}
        {message && (
          <div className="mb-6 mx-auto max-w-4xl">
            <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-xl shadow-sm">
              <p className="text-blue-800 font-medium text-center">{message}</p>
            </div>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div className="max-w-7xl mx-auto">
            <div className="bg-white rounded-3xl shadow-2xl p-8 border">
              
              <div className="grid lg:grid-cols-2 gap-8">
                {/* Left Column - Basic Settings */}
                <div className="space-y-6">
                  <div className="flex items-center mb-6">
                    <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-blue-500 rounded-xl flex items-center justify-center mr-3">
                      <Calendar className="w-5 h-5 text-white" />
                    </div>
                    <h2 className="text-xl font-bold text-gray-800">Basic Settings</h2>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl border">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">🎯 Lottery Name</label>
                        <input
                          type="text"
                          placeholder="Enter lottery name"
                          value={settings.lotteryName}
                          onChange={(e) => handleInputChange('lotteryName', e.target.value)}
                          className="w-full p-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
                        />
                      </div>

                      <div className="p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl border">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">🔢 Lottery Code</label>
                        <input
                          type="text"
                          placeholder="Auto-generated if empty"
                          value={settings.lotteryCode}
                          onChange={(e) => handleInputChange('lotteryCode', e.target.value.toUpperCase())}
                          className="w-full p-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
                        />
                      </div>
                    </div>

                    <div className="p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl border">
                      <label className="block text-sm font-semibold text-gray-700 mb-2">📅 Lottery Date</label>
                      <input
                        type="date"
                        value={settings.lotteryDate}
                        onChange={(e) => handleInputChange('lotteryDate', e.target.value)}
                        className="w-full p-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
                      />
                    </div>

                    <div className="grid md:grid-cols-3 gap-3">
                      <div className="p-3 bg-gradient-to-r from-orange-50 to-red-50 rounded-xl border">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">⏰ Sales Start</label>
                        <input
                          type="time"
                          value={settings.salesStartTime}
                          onChange={(e) => handleInputChange('salesStartTime', e.target.value)}
                          className="w-full p-2 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                        />
                      </div>

                      <div className="p-3 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl border">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">⏳ Sales End</label>
                        <input
                          type="time"
                          value={settings.salesEndTime}
                          onChange={(e) => handleInputChange('salesEndTime', e.target.value)}
                          className="w-full p-2 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                        />
                      </div>

                      <div className="p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">🕒 Result Time</label>
                        <input
                          type="time"
                          value={settings.resultTime}
                          onChange={(e) => handleInputChange('resultTime', e.target.value)}
                          className="w-full p-2 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column - Ticket & Prize Settings */}
                <div className="space-y-6">
                  <div className="flex items-center mb-6">
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-500 rounded-xl flex items-center justify-center mr-3">
                      <Ticket className="w-5 h-5 text-white" />
                    </div>
                    <h2 className="text-xl font-bold text-gray-800">Ticket & Prize Settings</h2>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">💵 Ticket Price (₹)</label>
                        <input
                          type="number"
                          placeholder="Enter ticket price"
                          value={settings.ticketPrice}
                          onChange={(e) => handleInputChange('ticketPrice', e.target.value)}
                          className="w-full p-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                        />
                      </div>

                      <div className="p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl border">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">🏆 Prize Amount (₹)</label>
                        <input
                          type="number"
                          placeholder="Enter prize amount"
                          value={settings.prizeAmount}
                          onChange={(e) => handleInputChange('prizeAmount', e.target.value)}
                          className="w-full p-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">🔢 Range Start</label>
                        <input
                          type="text"
                          placeholder="e.g., 1E200"
                          value={settings.ticketRangeStart}
                          onChange={(e) => handleInputChange('ticketRangeStart', e.target.value.toUpperCase())}
                          className="w-full p-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                        />
                      </div>

                      <div className="p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl border">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">🔢 Range End</label>
                        <input
                          type="text"
                          placeholder="e.g., 1F900"
                          value={settings.ticketRangeEnd}
                          onChange={(e) => handleInputChange('ticketRangeEnd', e.target.value.toUpperCase())}
                          className="w-full p-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                        />
                      </div>
                    </div>

                    <div className="p-6 bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl border-2 border-dashed border-gray-300">
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-semibold text-gray-700">🔄 Total Tickets:</span>
                        <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                          {settings.totalTickets.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-10 flex flex-wrap gap-4 justify-center">
                <button
                  onClick={calculateTotalTickets}
                  disabled={loading}
                  className="flex items-center px-8 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl hover:from-green-600 hover:to-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  <Calculator className="w-5 h-5 mr-2" />
                  Calculate Tickets
                </button>

                <button
                  onClick={generateTickets}
                  disabled={loading || settings.totalTickets === 0}
                  className="flex items-center px-8 py-4 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-xl hover:from-purple-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-50 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  <Ticket className="w-5 h-5 mr-2" />
                  {loading ? 'Generating...' : 'Generate Tickets'}
                </button>

                <button
                  onClick={saveSettings}
                  disabled={loading}
                  className="flex items-center px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  <Save className="w-5 h-5 mr-2" />
                  {loading ? 'Creating...' : 'Create Lottery'}
                </button>
              </div>

              {/* Countdown Timer */}
              {settings.lotteryDate && settings.resultTime && (
                <div className="mt-10">
                  <div className="flex items-center mb-6">
                    <div className="w-10 h-10 bg-gradient-to-br from-red-400 to-pink-500 rounded-xl flex items-center justify-center mr-3">
                      <Timer className="w-5 h-5 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800">Next Draw Countdown</h2>
                  </div>

                  <div className="bg-gradient-to-br from-red-50 to-pink-50 rounded-2xl p-6 border-2 border-red-200">
                    <div className="grid grid-cols-4 gap-4 text-center">
                      <div className="bg-white rounded-xl p-4 shadow-lg">
                        <div className="text-3xl font-bold text-red-600">{countdown.days}</div>
                        <div className="text-sm text-gray-600 font-medium">Days</div>
                      </div>
                      <div className="bg-white rounded-xl p-4 shadow-lg">
                        <div className="text-3xl font-bold text-orange-600">{countdown.hours}</div>
                        <div className="text-sm text-gray-600 font-medium">Hours</div>
                      </div>
                      <div className="bg-white rounded-xl p-4 shadow-lg">
                        <div className="text-3xl font-bold text-blue-600">{countdown.minutes}</div>
                        <div className="text-sm text-gray-600 font-medium">Minutes</div>
                      </div>
                      <div className="bg-white rounded-xl p-4 shadow-lg">
                        <div className="text-3xl font-bold text-purple-600">{countdown.seconds}</div>
                        <div className="text-sm text-gray-600 font-medium">Seconds</div>
                      </div>
                    </div>
                    <div className="text-center mt-4">
                      <p className="text-gray-700 font-medium">
                        Next Draw: {new Date(`${settings.lotteryDate} ${settings.resultTime}`).toLocaleString('en-IN')}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Lottery Management Tab */}
        {activeTab === 'management' && (
          <div className="max-w-7xl mx-auto">
            <div className="bg-white rounded-3xl shadow-2xl p-8 border">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-xl flex items-center justify-center mr-3">
                    <Package className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800">Lottery Management</h2>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-lg">
                    {lotteries.length} Total Lotteries
                  </span>
                </div>
              </div>

              {/* Lottery Statistics */}
              <div className="grid md:grid-cols-4 gap-6 mb-8">
                <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white shadow-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-blue-100">Active Lotteries</p>
                      <p className="text-3xl font-bold">{lotteries.filter(l => l.status === 'active').length}</p>
                    </div>
                    <Trophy className="w-8 h-8 text-blue-200" />
                  </div>
                </div>

                <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-6 text-white shadow-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-green-100">Completed</p>
                      <p className="text-3xl font-bold">{lotteries.filter(l => l.status === 'completed').length}</p>
                    </div>
                    <CheckCircle className="w-8 h-8 text-green-200" />
                  </div>
                </div>

                <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl p-6 text-white shadow-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-orange-100">Upcoming</p>
                      <p className="text-3xl font-bold">{lotteries.filter(l => l.status === 'upcoming').length}</p>
                    </div>
                    <Clock className="w-8 h-8 text-orange-200" />
                  </div>
                </div>

                <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 text-white shadow-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-purple-100">Total Revenue</p>
                      <p className="text-2xl font-bold">₹{lotteries.reduce((sum, l) => sum + (l.soldTickets * l.ticketPrice), 0).toLocaleString()}</p>
                    </div>
                    <TrendingUp className="w-8 h-8 text-purple-200" />
                  </div>
                </div>
              </div>

              {/* Lotteries Table */}
              <div className="bg-white rounded-2xl shadow-lg border overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Lottery Details</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Pricing</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Tickets</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Dates</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Revenue</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {lotteries.map((lottery) => (
                        <tr key={lottery.id} className="hover:bg-gray-50 transition-colors">
                          <td className="px-6 py-4">
                            <div>
                              <div className="flex items-center mb-1">
                                <span className="font-mono text-sm font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded mr-2">
                                  {lottery.code}
                                </span>
                              </div>
                              <p className="font-semibold text-gray-800">{lottery.name}</p>
                              <p className="text-sm text-gray-500">ID: {lottery.id}</p>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <select
                              value={lottery.status}
                              onChange={(e) => updateLotteryStatus(lottery.id, e.target.value)}
                              className={`px-3 py-1 rounded-lg text-sm font-medium border-0 focus:ring-2 focus:ring-purple-500 ${
                                lottery.status === 'active' ? 'bg-green-100 text-green-800' :
                                lottery.status === 'upcoming' ? 'bg-blue-100 text-blue-800' :
                                lottery.status === 'completed' ? 'bg-gray-100 text-gray-800' :
                                'bg-red-100 text-red-800'
                              }`}
                            >
                              <option value="active">Active</option>
                              <option value="upcoming">Upcoming</option>
                              <option value="completed">Completed</option>
                              <option value="cancelled">Cancelled</option>
                            </select>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm">
                              <p className="font-medium text-gray-700">₹{lottery.ticketPrice}</p>
                              <p className="text-green-600 font-semibold">Prize: ₹{lottery.prizeAmount.toLocaleString()}</p>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm">
                              <p className="font-medium">{lottery.soldTickets}/{lottery.totalTickets}</p>
                              <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                                <div 
                                  className="bg-green-500 h-2 rounded-full" 
                                  style={{width: `${(lottery.soldTickets / lottery.totalTickets) * 100}%`}}
                                ></div>
                              </div>
                              <p className="text-xs text-gray-500 mt-1">
                                {((lottery.soldTickets / lottery.totalTickets) * 100).toFixed(1)}% sold
                              </p>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm">
                            <p className="text-gray-700">Created: {lottery.createdDate}</p>
                            <p className="text-gray-700">Draw: {lottery.drawDate}</p>
                          </td>
                          <td className="px-6 py-4">
                            <p className="font-bold text-green-600">₹{(lottery.soldTickets * lottery.ticketPrice).toLocaleString()}</p>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => {
                                  const newTickets = prompt('Update total tickets:', lottery.totalTickets);
                                  if (newTickets !== null) {
                                    setLotteries(prev => prev.map(l => 
                                      l.id === lottery.id 
                                        ? { ...l, totalTickets: parseInt(newTickets) || lottery.totalTickets }
                                        : l
                                    ));
                                    setMessage('✅ Lottery updated successfully!');
                                  }
                                }}
                                className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                                title="Edit Lottery"
                              >
                                <Edit3 className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => deleteLottery(lottery.id)}
                                className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
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

                {lotteries.length === 0 && (
                  <div className="text-center py-12">
                    <Package className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500 text-lg">No lotteries created yet</p>
                    <p className="text-gray-400 text-sm">Create your first lottery in Settings tab</p>
                  </div>
                )}
              </div>

              {/* Show Stats after ticket generation */}
              {tickets.length > 0 && (
                <div className="mt-10">
                  <div className="flex items-center mb-6">
                    <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center mr-3">
                      <BarChart3 className="w-5 h-5 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800">Live Ticket Statistics</h2>
                  </div>

                  <div className="grid md:grid-cols-4 gap-6 mb-8">
                    <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white shadow-xl">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-blue-100">Total Tickets</p>
                          <p className="text-3xl font-bold">{stats.total.toLocaleString()}</p>
                        </div>
                        <Ticket className="w-8 h-8 text-blue-200" />
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-6 text-white shadow-xl">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-green-100">Sold Tickets</p>
                          <p className="text-3xl font-bold">{stats.sold.toLocaleString()}</p>
                          <p className="text-sm text-green-200">
                            {stats.total > 0 ? ((stats.sold / stats.total) * 100).toFixed(1) : 0}% sold
                          </p>
                        </div>
                        <CheckCircle className="w-8 h-8 text-green-200" />
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl p-6 text-white shadow-xl">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-orange-100">Available</p>
                          <p className="text-3xl font-bold">{stats.available.toLocaleString()}</p>
                        </div>
                        <XCircle className="w-8 h-8 text-orange-200" />
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 text-white shadow-xl">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-purple-100">Revenue</p>
                          <p className="text-3xl font-bold">₹{stats.revenue.toLocaleString()}</p>
                        </div>
                        <TrendingUp className="w-8 h-8 text-purple-200" />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Tickets Table in Management */}
              {tickets.length > 0 && (
                <div className="mt-10">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-500 rounded-xl flex items-center justify-center mr-3">
                        <Ticket className="w-5 h-5 text-white" />
                      </div>
                      <h2 className="text-2xl font-bold text-gray-800">Tickets Management</h2>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          type="text"
                          placeholder="Search tickets..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="pl-10 pr-4 py-2 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 w-64"
                        />
                      </div>

                      <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        className="px-4 py-2 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                      >
                        <option value="all">All Status</option>
                        <option value="available">Available</option>
                        <option value="sold">Sold</option>
                      </select>

                      <button
                        onClick={exportToCSV}
                        className="flex items-center px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl hover:from-green-600 hover:to-green-700 shadow-lg hover:shadow-xl"
                      >
                        <Download className="w-4 h-4 mr-1" />
                        Export
                      </button>
                    </div>
                  </div>

                  <div className="bg-white rounded-2xl shadow-lg border overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Ticket Number</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Buyer</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Price</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Sold Date</th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          {filteredTickets.map((ticket) => (
                            <tr key={ticket.id} className="hover:bg-gray-50 transition-colors">
                              <td className="px-6 py-4">
                                <div className="flex items-center">
                                  <span className="font-mono font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-lg">
                                    {ticket.ticketNumber}
                                  </span>
                                  <button
                                    onClick={() => copyTicketNumber(ticket.ticketNumber)}
                                    className="ml-2 p-1 text-gray-400 hover:text-blue-600 transition-colors"
                                    title="Copy ticket number"
                                  >
                                    <Copy className="w-4 h-4" />
                                  </button>
                                </div>
                              </td>
                              <td className="px-6 py-4">
                                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                                  ticket.status === 'sold' 
                                    ? 'bg-green-100 text-green-800' 
                                    : 'bg-orange-100 text-orange-800'
                                }`}>
                                  {ticket.status === 'sold' ? 'Sold' : 'Available'}
                                </span>
                              </td>
                              <td className="px-6 py-4">
                                {editingTicket === ticket.id ? (
                                  <input
                                    type="text"
                                    placeholder="Enter buyer name"
                                    defaultValue={ticket.buyer}
                                    onBlur={(e) => updateTicketStatus(ticket.id, 'sold', e.target.value)}
                                    onKeyPress={(e) => {
                                      if (e.key === 'Enter') {
                                        updateTicketStatus(ticket.id, 'sold', e.target.value);
                                      }
                                    }}
                                    className="px-3 py-1 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                                    autoFocus
                                  />
                                ) : (
                                  <span className="text-gray-700">{ticket.buyer || '—'}</span>
                                )}
                              </td>
                              <td className="px-6 py-4">
                                <div className="flex items-center">
                                  <span className="text-gray-700">₹{ticket.price}</span>
                                  <button
                                    onClick={() => {
                                      const newPrice = prompt('Enter new price:', ticket.price);
                                      if (newPrice !== null) {
                                        updateTicketPrice(ticket.id, newPrice);
                                      }
                                    }}
                                    className="ml-2 p-1 text-gray-400 hover:text-blue-600 transition-colors"
                                    title="Edit price"
                                  >
                                    <Edit3 className="w-4 h-4" />
                                  </button>
                                </div>
                              </td>
                              <td className="px-6 py-4 text-gray-700">
                                {ticket.soldAt ? ticket.soldAt.toLocaleDateString('en-IN') : '—'}
                              </td>
                              <td className="px-6 py-4">
                                <div className="flex items-center gap-2">
                                  {ticket.status === 'available' ? (
                                    <button
                                      onClick={() => setEditingTicket(ticket.id)}
                                      className="px-3 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm"
                                    >
                                      Mark Sold
                                    </button>
                                  ) : (
                                    <button
                                      onClick={() => updateTicketStatus(ticket.id, 'available')}
                                      className="px-3 py-1 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors text-sm"
                                    >
                                      Mark Available
                                    </button>
                                  )}
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {filteredTickets.length === 0 && (
                      <div className="text-center py-12">
                        <Ticket className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-500 text-lg">No tickets found matching your criteria</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Winner Control Tab */}
        {activeTab === 'winner' && (
          <div className="max-w-7xl mx-auto space-y-8">
            
            {/* Top Row - Winner Selection and Winners History */}
            <div className="grid lg:grid-cols-2 gap-8">
              
              {/* Left Column - Winner Selection */}
              <div className="bg-white rounded-3xl shadow-2xl p-8 border">
                <div className="flex items-center mb-6">
                  <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center mr-3">
                    <Crown className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800">Winner Selection</h2>
                </div>

                <div className="space-y-6">
                  <div className="p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl border">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Select Lottery</label>
                    <select
                      value={selectedLotteryForWinner}
                      onChange={(e) => setSelectedLotteryForWinner(e.target.value)}
                      className="w-full p-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    >
                      <option value="">Choose lottery to announce winner</option>
                      {lotteries.filter(l => l.status === 'active').map((lottery) => (
                        <option key={lottery.id} value={lottery.code}>
                          {lottery.code} - {lottery.name} (Prize: ₹{lottery.prizeAmount.toLocaleString()})
                        </option>
                      ))}
                    </select>
                  </div>

                  {selectedLotteryForWinner && (
                    <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border">
                      <div className="mb-4">
                        <h3 className="font-semibold text-gray-800">Selected Lottery Details:</h3>
                        {(() => {
                          const selectedLottery = lotteries.find(l => l.code === selectedLotteryForWinner);
                          return selectedLottery ? (
                            <div className="mt-2 text-sm text-gray-600">
                              <p><span className="font-medium">Code:</span> {selectedLottery.code}</p>
                              <p><span className="font-medium">Name:</span> {selectedLottery.name}</p>
                              <p><span className="font-medium">Prize:</span> ₹{selectedLottery.prizeAmount.toLocaleString()}</p>
                              <p><span className="font-medium">Tickets:</span> {selectedLottery.soldTickets}/{selectedLottery.totalTickets} sold</p>
                            </div>
                          ) : null;
                        })()}
                      </div>
                    </div>
                  )}

                  <div className="p-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-xl border">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Enter Ticket Number</label>
                    <input
                      type="text"
                      placeholder="Enter winning ticket number (e.g., 1E225)"
                      value={selectedWinner}
                      onChange={(e) => setSelectedWinner(e.target.value.toUpperCase())}
                      className="w-full p-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    />
                  </div>

                  <button
                    onClick={selectWinner}
                    disabled={!selectedWinner || !selectedLotteryForWinner}
                    className="w-full flex items-center justify-center px-6 py-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-xl hover:from-yellow-600 hover:to-orange-600 focus:outline-none focus:ring-2 focus:ring-yellow-500 disabled:opacity-50 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    <Trophy className="w-5 h-5 mr-2" />
                    Select Winner
                  </button>
                </div>
              </div>

              {/* Right Column - Winners History */}
              <div className="bg-white rounded-3xl shadow-2xl p-8 border">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-blue-500 rounded-xl flex items-center justify-center mr-3">
                      <Award className="w-5 h-5 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800">Winners History</h2>
                  </div>
                  <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-lg">
                    {winnersHistory.length} Total Winners
                  </span>
                </div>

                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {winnersHistory.map((winner) => (
                    <div key={winner.id} className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl p-4 border-2 border-yellow-200 hover:shadow-lg transition-all duration-200">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center">
                          <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white text-lg mr-4">
                            {winner.buyerImage}
                          </div>
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-mono text-sm font-bold text-blue-600 bg-blue-100 px-2 py-1 rounded">
                                {winner.lotteryCode}
                              </span>
                              <span className={`px-2 py-1 rounded text-xs font-medium ${
                                winner.status === 'paid' ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'
                              }`}>
                                {winner.status}
                              </span>
                            </div>
                            <h3 className="font-bold text-gray-800">{winner.buyerName}</h3>
                            <p className="text-sm text-gray-600">{winner.buyerCity}</p>
                            <p className="text-sm text-gray-600">Ticket: {winner.ticketNumber}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-green-600">₹{winner.prizeAmount.toLocaleString()}</p>
                          <p className="text-xs text-gray-500">{winner.announcementDate}</p>
                        </div>
                      </div>
                      <div className="mt-3 pt-3 border-t border-yellow-300">
                        <p className="text-sm font-medium text-gray-700">{winner.lotteryName}</p>
                      </div>
                    </div>
                  ))}

                  {winnersHistory.length === 0 && (
                    <div className="text-center py-12">
                      <Award className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                      <p className="text-gray-500 text-lg">No winners announced yet</p>
                      <p className="text-gray-400 text-sm">Winners will appear here after announcement</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Manual Winner Selection Section */}
            <div className="bg-white rounded-3xl shadow-2xl p-8 border">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gradient-to-br from-red-400 to-pink-500 rounded-xl flex items-center justify-center mr-3">
                    <Star className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800">Manual Winner Selection</h2>
                </div>
                <button
                  onClick={() => setShowManualWinnerModal(true)}
                  className="flex items-center px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:from-purple-600 hover:to-pink-600 shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  Add Winner
                </button>
              </div>

              {/* Manual Winners Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {manualWinners.map((winner) => (
                  <div key={winner.id} className={`rounded-2xl p-6 border-2 shadow-lg hover:shadow-xl transition-all duration-200 ${
                    winner.position === '1st' ? 'bg-gradient-to-br from-yellow-50 to-amber-50 border-yellow-300' :
                    winner.position === '2nd' ? 'bg-gradient-to-br from-gray-50 to-slate-50 border-gray-300' :
                    'bg-gradient-to-br from-orange-50 to-red-50 border-orange-300'
                  }`}>
                    <div className="flex items-center justify-between mb-4">
                      <div className={`px-3 py-1 rounded-full text-sm font-bold ${
                        winner.position === '1st' ? 'bg-yellow-200 text-yellow-800' :
                        winner.position === '2nd' ? 'bg-gray-200 text-gray-800' :
                        'bg-orange-200 text-orange-800'
                      }`}>
                        {winner.position} Position
                      </div>
                      <button
                        onClick={() => deleteManualWinner(winner.id)}
                        className="p-1 text-red-500 hover:text-red-700 transition-colors"
                        title="Delete Winner"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    
                    <div className="text-center mb-4">
                      <div className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl text-white mx-auto mb-3 ${
                        winner.position === '1st' ? 'bg-gradient-to-br from-yellow-400 to-amber-500' :
                        winner.position === '2nd' ? 'bg-gradient-to-br from-gray-400 to-slate-500' :
                        'bg-gradient-to-br from-orange-400 to-red-500'
                      }`}>
                        {winner.position === '1st' ? '🥇' : winner.position === '2nd' ? '🥈' : '🥉'}
                      </div>
                      <h3 className="text-xl font-bold text-gray-800">{winner.playerName}</h3>
                      <p className="text-sm text-gray-600">{winner.city}</p>
                    </div>

                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Player ID:</span>
                        <span className="font-mono font-semibold text-blue-600">{winner.playerId}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Ticket ID:</span>
                        <span className="font-mono font-semibold text-purple-600">{winner.ticketId}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Ticket No:</span>
                        <span className="font-mono font-semibold text-indigo-600">{winner.ticketNumber}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Lottery:</span>
                        <span className="font-mono font-semibold text-green-600">{winner.lotteryCode}</span>
                      </div>
                    </div>

                    <div className="text-center py-3 bg-white rounded-xl shadow-inner mb-3">
                      <p className="text-sm text-gray-600 mb-1">Prize Amount</p>
                      <p className="text-2xl font-bold text-green-600">₹{winner.prizeAmount.toLocaleString()}</p>
                    </div>

                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>Added: {winner.createdDate}</span>
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        winner.status === 'paid' ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'
                      }`}>
                        {winner.status}
                      </span>
                    </div>
                  </div>
                ))}

                {manualWinners.length === 0 && (
                  <div className="col-span-full text-center py-12">
                    <Star className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500 text-lg">No manual winners added yet</p>
                    <p className="text-gray-400 text-sm">Click "Add Winner" to manually select winners</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Winner Announcement Modal */}
        {showWinnerModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-3xl p-8 max-w-lg w-full mx-4 shadow-2xl">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Trophy className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Winner Confirmation</h3>
                
                <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-6 mb-6 border-2 border-yellow-200">
                  <div className="mb-4">
                    <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-lg text-sm font-mono font-bold mb-2">
                      {winnerDetails.lotteryCode}
                    </span>
                    <h4 className="font-semibold text-gray-700">{winnerDetails.lotteryName}</h4>
                  </div>
                  
                  <div className="flex items-center justify-center mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white text-2xl mr-4">
                      {winnerDetails.buyerImage}
                    </div>
                    <div>
                      <p className="text-xl font-bold text-gray-800">{winnerDetails.buyerName}</p>
                      <p className="text-sm text-gray-600">{winnerDetails.buyerCity}</p>
                      <p className="text-sm text-blue-600 font-mono">Ticket: {winnerDetails.ticketNumber}</p>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-xl p-4 shadow-inner">
                    <p className="text-sm text-gray-600 mb-1">Prize Amount</p>
                    <p className="text-4xl font-bold text-green-600">₹{winnerDetails.prizeAmount.toLocaleString()}</p>
                  </div>
                  
                  <div className="mt-4 text-xs text-gray-500">
                    Announcement Date: {winnerDetails.announcementDate}
                  </div>
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={() => {
                      setShowWinnerModal(false);
                      setSelectedWinner('');
                      setSelectedLotteryForWinner('');
                    }}
                    className="flex-1 px-6 py-3 bg-gray-500 text-white rounded-xl hover:bg-gray-600 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={announceWinner}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl hover:from-green-600 hover:to-emerald-600 transition-all transform hover:scale-105 font-semibold"
                  >
                    Announce Winner
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Manual Winner Modal */}
        {showManualWinnerModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-3xl p-8 max-w-2xl w-full mx-4 shadow-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-500 rounded-xl flex items-center justify-center mr-3">
                    <Star className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800">Add Manual Winner</h3>
                </div>
                <button
                  onClick={() => setShowManualWinnerModal(false)}
                  className="p-2 text-gray-400 hover:text-gray-600"
                >
                  <XCircle className="w-6 h-6" />
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Position</label>
                    <select
                      value={manualWinnerForm.position}
                      onChange={(e) => handleManualWinnerFormChange('position', e.target.value)}
                      className="w-full p-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    >
                      <option value="1st">1st Place</option>
                      <option value="2nd">2nd Place</option>
                      <option value="3rd">3rd Place</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Player Name *</label>
                    <input
                      type="text"
                      placeholder="Enter player name"
                      value={manualWinnerForm.playerName}
                      onChange={(e) => handleManualWinnerFormChange('playerName', e.target.value)}
                      className="w-full p-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Player ID *</label>
                    <input
                      type="text"
                      placeholder="Enter player ID"
                      value={manualWinnerForm.playerId}
                      onChange={(e) => handleManualWinnerFormChange('playerId', e.target.value.toUpperCase())}
                      className="w-full p-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Ticket ID</label>
                    <input
                      type="text"
                      placeholder="Auto-generated if empty"
                      value={manualWinnerForm.ticketId}
                      onChange={(e) => handleManualWinnerFormChange('ticketId', e.target.value.toUpperCase())}
                      className="w-full p-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Ticket Number *</label>
                    <input
                      type="text"
                      placeholder="e.g., 1E100"
                      value={manualWinnerForm.ticketNumber}
                      onChange={(e) => handleManualWinnerFormChange('ticketNumber', e.target.value.toUpperCase())}
                      className="w-full p-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Prize Amount (₹) *</label>
                    <input
                      type="number"
                      placeholder="Enter prize amount"
                      value={manualWinnerForm.prizeAmount}
                      onChange={(e) => handleManualWinnerFormChange('prizeAmount', e.target.value)}
                      className="w-full p-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Lottery Code *</label>
                    <select
                      value={manualWinnerForm.lotteryCode}
                      onChange={(e) => handleManualWinnerFormChange('lotteryCode', e.target.value)}
                      className="w-full p-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    >
                      <option value="">Select lottery</option>
                      {lotteries.map((lottery) => (
                        <option key={lottery.id} value={lottery.code}>
                          {lottery.code} - {lottery.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">City</label>
                    <input
                      type="text"
                      placeholder="Enter city"
                      value={manualWinnerForm.city}
                      onChange={(e) => handleManualWinnerFormChange('city', e.target.value)}
                      className="w-full p-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-8 flex gap-4">
                <button
                  onClick={() => {
                    setShowManualWinnerModal(false);
                    setManualWinnerForm({
                      position: '1st',
                      playerName: '',
                      playerId: '',
                      ticketId: '',
                      ticketNumber: '',
                      prizeAmount: '',
                      lotteryCode: '',
                      city: ''
                    });
                  }}
                  className="flex-1 px-6 py-3 bg-gray-500 text-white rounded-xl hover:bg-gray-600 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={addManualWinner}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all transform hover:scale-105 font-semibold"
                >
                  Add Winner
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LotteryAdminDashboard;
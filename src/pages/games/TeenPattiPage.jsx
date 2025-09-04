import React, { useState } from 'react';
import { Eye, Settings, Edit3, Trash2, Filter, Play, Pause, StopCircle, Users, Clock, DollarSign, UserCheck, AlertTriangle, BarChart3, RefreshCw, Download, Search, Calendar, Target, Shield, Trophy, Crown, TrendingUp, Activity, Zap, AlertCircle } from 'lucide-react';

const TeenPattiGameTable = () => {
  // Sample game data with proper Teen Patti structure
  const [gameData, setGameData] = useState([
    {
      id: 'TP001',
      gameId: 'TEENPATTI001',
      gameType: 'Classic Teen Patti',
      tableId: 'TABLE_001',
      tableName: 'Mumbai High Rollers',
      maxPlayers: 6,
      currentPlayers: 4,
      players: [
        { 
          name: 'Player_123', 
          userId: 'USR001', 
          avatar: '👤', 
          position: 1, 
          cards: ['♠A', '♥K', '♦Q'], 
          handType: 'Sequence', 
          handRank: 'A-K-Q',
          bet: 200, 
          totalBet: 850,
          status: 'Playing', 
          chips: 2500,
          isSeen: true,
          isDealer: false,
          turnTime: 15,
          winProbability: 45.2,
          foldsCount: 2,
          showsCount: 1,
          sideShowsWon: 0
        },
        { 
          name: 'ProGamer99', 
          userId: 'USR002', 
          avatar: '🎯', 
          position: 2, 
          cards: ['♣K', '♣Q', '♣J'], 
          handType: 'Pure Sequence', 
          handRank: 'K-Q-J',
          bet: 400, 
          totalBet: 1650,
          status: 'Playing', 
          chips: 5000,
          isSeen: true,
          isDealer: true,
          turnTime: 12,
          winProbability: 72.5,
          foldsCount: 0,
          showsCount: 2,
          sideShowsWon: 1
        },
        { 
          name: 'LuckyPlayer', 
          userId: 'USR003', 
          avatar: '💎', 
          position: 3, 
          cards: ['♥7', '♦7', '♠7'], 
          handType: 'Trail', 
          handRank: '7-7-7',
          bet: 800, 
          totalBet: 2100,
          status: 'Playing', 
          chips: 1200,
          isSeen: false,
          isDealer: false,
          turnTime: 8,
          winProbability: 85.3,
          foldsCount: 1,
          showsCount: 0,
          sideShowsWon: 0
        },
        { 
          name: 'CardMaster', 
          userId: 'USR004', 
          avatar: '🃏', 
          position: 4, 
          cards: ['♠10', '♥5', '♦2'], 
          handType: 'High Card', 
          handRank: '10-5-2',
          bet: 0, 
          totalBet: 450,
          status: 'Folded', 
          chips: 800,
          isSeen: true,
          isDealer: false,
          turnTime: 0,
          winProbability: 0,
          foldsCount: 3,
          showsCount: 0,
          sideShowsWon: 0
        }
      ],
      dealer: {
        name: 'Dealer_01',
        id: 'DLR001',
        avatar: '🎰',
        commission: 5
      },
      betAmount: 50,
      blindBet: 25,
      chaalu: 100,
      currentBet: 800,
      potAmount: 5050,
      sidePot: 0,
      gameRound: 3,
      totalRounds: 15,
      gameState: 'Active',
      currentTurn: 2,
      currentPlayerTimer: 15,
      bootAmount: 100,
      potLimit: 10000,
      sideShowRequested: false,
      sideShowRequestBy: null,
      sideShowRequestTo: null,
      showRequested: true,
      showRequestBy: 'USR001',
      timeElapsed: '08:45:30',
      status: 'Playing',
      createdAt: '2025-09-01 14:30',
      lastAction: 'ProGamer99 raised to ₹800',
      lastActionTime: '2025-09-01 14:45:15',
      riskLevel: 'Medium',
      totalHands: 15,
      completedHands: 8,
      avgPotSize: 3500,
      biggestPot: 8500,
      sessionDuration: '2h 15m',
      playerActions: {
        folds: 5,
        calls: 12,
        raises: 8,
        allIns: 1,
        sideShows: 2,
        shows: 3
      },
      suspiciousPatterns: {
        rapidBetting: false,
        unusualWinRate: false,
        chipDumping: false,
        collusion: false,
        botBehavior: false
      },
      chatMessages: 25,
      spectators: 8,
      gameMode: 'Limit',
      variation: 'Classic',
      commission: 5,
      rake: 252.50,
      totalRakeCollected: 850,
      houseEdge: 2.5,
      playerIPs: {
        'USR001': '192.168.1.100',
        'USR002': '192.168.1.101',
        'USR003': '192.168.1.102',
        'USR004': '192.168.1.103'
      },
      deviceTypes: {
        'USR001': 'Mobile',
        'USR002': 'Desktop',
        'USR003': 'Mobile',
        'USR004': 'Tablet'
      }
    },
    {
      id: 'TP002',
      gameId: 'TEENPATTI002',
      gameType: 'No Limit Teen Patti',
      tableId: 'TABLE_VIP_01',
      tableName: 'Delhi VIP Room',
      maxPlayers: 8,
      currentPlayers: 6,
      players: [
        { 
          name: 'HighRoller', 
          userId: 'USR005', 
          avatar: '👑', 
          position: 1, 
          cards: ['♠A', '♠K', '♠Q'], 
          handType: 'Pure Sequence', 
          handRank: 'A-K-Q',
          bet: 5000, 
          totalBet: 15000,
          status: 'Playing', 
          chips: 50000,
          isSeen: true,
          isDealer: true,
          turnTime: 10,
          winProbability: 78.5,
          foldsCount: 0,
          showsCount: 3,
          sideShowsWon: 2
        },
        { 
          name: 'RiskTaker', 
          userId: 'USR006', 
          avatar: '🎲', 
          position: 2, 
          cards: ['♥10', '♥10', '♦10'], 
          handType: 'Trail', 
          handRank: '10-10-10',
          bet: 5000, 
          totalBet: 20000,
          status: 'Playing', 
          chips: 35000,
          isSeen: false,
          isDealer: false,
          turnTime: 20,
          winProbability: 92.3,
          foldsCount: 1,
          showsCount: 1,
          sideShowsWon: 0
        },
        { 
          name: 'BluffMaster', 
          userId: 'USR007', 
          avatar: '😎', 
          position: 3, 
          cards: ['♣3', '♦4', '♠5'], 
          handType: 'Sequence', 
          handRank: '5-4-3',
          bet: 2500, 
          totalBet: 8500,
          status: 'Playing', 
          chips: 15000,
          isSeen: true,
          isDealer: false,
          turnTime: 5,
          winProbability: 35.7,
          foldsCount: 2,
          showsCount: 0,
          sideShowsWon: 1
        },
        { 
          name: 'LuckyAce', 
          userId: 'USR008', 
          avatar: '🍀', 
          position: 4, 
          cards: ['♥A', '♦A', '♣K'], 
          handType: 'Pair', 
          handRank: 'A-A-K',
          bet: 0, 
          totalBet: 5000,
          status: 'Folded', 
          chips: 22000,
          isSeen: true,
          isDealer: false,
          turnTime: 0,
          winProbability: 0,
          foldsCount: 4,
          showsCount: 1,
          sideShowsWon: 0
        },
        { 
          name: 'ChipLeader', 
          userId: 'USR009', 
          avatar: '💰', 
          position: 5, 
          cards: ['♠J', '♥J', '♦J'], 
          handType: 'Trail', 
          handRank: 'J-J-J',
          bet: 10000, 
          totalBet: 25000,
          status: 'All-In', 
          chips: 0,
          isSeen: true,
          isDealer: false,
          turnTime: 0,
          winProbability: 94.1,
          foldsCount: 0,
          showsCount: 2,
          sideShowsWon: 3
        },
        { 
          name: 'NewPlayer', 
          userId: 'USR010', 
          avatar: '🆕', 
          position: 6, 
          cards: ['♣7', '♦8', '♠9'], 
          handType: 'Sequence', 
          handRank: '9-8-7',
          bet: 1000, 
          totalBet: 3000,
          status: 'Playing', 
          chips: 8000,
          isSeen: false,
          isDealer: false,
          turnTime: 25,
          winProbability: 42.8,
          foldsCount: 1,
          showsCount: 0,
          sideShowsWon: 0
        }
      ],
      dealer: {
        name: 'VIP_Dealer',
        id: 'DLR002',
        avatar: '🎩',
        commission: 3
      },
      betAmount: 1000,
      blindBet: 500,
      chaalu: 2000,
      currentBet: 10000,
      potAmount: 76500,
      sidePot: 15000,
      gameRound: 8,
      totalRounds: 25,
      gameState: 'High Stakes',
      currentTurn: 3,
      currentPlayerTimer: 20,
      bootAmount: 2000,
      potLimit: 500000,
      sideShowRequested: true,
      sideShowRequestBy: 'USR007',
      sideShowRequestTo: 'USR005',
      showRequested: false,
      showRequestBy: null,
      timeElapsed: '45:20:15',
      status: 'Playing',
      createdAt: '2025-09-01 12:00',
      lastAction: 'ChipLeader went All-In with ₹10,000',
      lastActionTime: '2025-09-01 14:45:35',
      riskLevel: 'Very High',
      totalHands: 25,
      completedHands: 15,
      avgPotSize: 45000,
      biggestPot: 125000,
      sessionDuration: '3h 45m',
      playerActions: {
        folds: 12,
        calls: 35,
        raises: 28,
        allIns: 3,
        sideShows: 8,
        shows: 5
      },
      suspiciousPatterns: {
        rapidBetting: false,
        unusualWinRate: true,
        chipDumping: false,
        collusion: false,
        botBehavior: false
      },
      chatMessages: 152,
      spectators: 45,
      gameMode: 'No Limit',
      variation: 'Classic',
      commission: 3,
      rake: 2295,
      totalRakeCollected: 8500,
      houseEdge: 3.0,
      playerIPs: {
        'USR005': '203.145.2.100',
        'USR006': '203.145.2.101',
        'USR007': '192.168.5.55',
        'USR008': '192.168.5.56',
        'USR009': '10.0.0.25',
        'USR010': '10.0.0.26'
      },
      deviceTypes: {
        'USR005': 'Desktop',
        'USR006': 'Desktop',
        'USR007': 'Mobile',
        'USR008': 'Tablet',
        'USR009': 'Desktop',
        'USR010': 'Mobile'
      }
    }
  ]);

  const [statusFilter, setStatusFilter] = useState('All');
  const [editingRow, setEditingRow] = useState(null);
  const [editData, setEditData] = useState({});
  const [viewingGame, setViewingGame] = useState(null);
  const [managingGame, setManagingGame] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Utility functions
  const getRiskLevelClass = (risk) => {
    const riskClasses = {
      Low: 'bg-green-50 text-green-700 border-green-200',
      Medium: 'bg-yellow-50 text-yellow-700 border-yellow-200',
      High: 'bg-red-50 text-red-700 border-red-200',
      'Very High': 'bg-purple-50 text-purple-700 border-purple-200'
    };
    return riskClasses[risk] || 'bg-gray-50 text-gray-700 border-gray-200';
  };

  const getStatusBadge = (status) => {
    const statusClasses = {
      Playing: 'bg-blue-50 text-blue-700 border-blue-200',
      'All-In': 'bg-purple-50 text-purple-700 border-purple-200',
      Completed: 'bg-green-50 text-green-700 border-green-200',
      Waiting: 'bg-gray-50 text-gray-700 border-gray-200',
      Paused: 'bg-orange-50 text-orange-700 border-orange-200',
      Folded: 'bg-red-50 text-red-700 border-red-200'
    };
    return statusClasses[status] || 'bg-gray-50 text-gray-700 border-gray-200';
  };

  const getGameStateIcon = (state) => {
    switch(state) {
      case 'Active': return <Play className="w-3 h-3 text-blue-500" />;
      case 'High Stakes': return <Crown className="w-3 h-3 text-yellow-500" />;
      case 'Tournament Final': return <Trophy className="w-3 h-3 text-purple-500" />;
      case 'Private Room': return <Users className="w-3 h-3 text-green-500" />;
      default: return <Clock className="w-3 h-3 text-gray-500" />;
    }
  };

  const getHandTypeIcon = (handType) => {
    switch(handType) {
      case 'Trail': return '🔥';
      case 'Pure Sequence': return '✨';
      case 'Sequence': return '📈';
      case 'Color': return '🌈';
      case 'Pair': return '👥';
      case 'High Card': return '🎯';
      default: return '🃏';
    }
  };

  const getHandStrength = (handType) => {
    const strength = {
      'Trail': 6,
      'Pure Sequence': 5,
      'Sequence': 4,
      'Color': 3,
      'Pair': 2,
      'High Card': 1
    };
    return strength[handType] || 0;
  };

  const filteredData = gameData.filter(game =>
    (statusFilter === 'All' || game.status === statusFilter) &&
    (searchTerm === '' || 
      game.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      game.gameId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      game.gameType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      game.tableId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      game.tableName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      game.players.some(player =>
        player.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        player.userId.toLowerCase().includes(searchTerm.toLowerCase())
      )
    )
  );

  const handleEdit = (game) => {
    setEditingRow(game.id);
    setEditData({
      betAmount: game.betAmount,
      blindBet: game.blindBet,
      bootAmount: game.bootAmount,
      maxPlayers: game.maxPlayers,
      status: game.status,
      riskLevel: game.riskLevel,
      gameType: game.gameType,
      potLimit: game.potLimit,
      commission: game.commission
    });
  };

  const handleSave = () => {
    setGameData(prev => prev.map(game =>
      game.id === editingRow
        ? {
            ...game,
            betAmount: parseInt(editData.betAmount),
            blindBet: parseInt(editData.blindBet),
            bootAmount: parseInt(editData.bootAmount),
            maxPlayers: parseInt(editData.maxPlayers),
            potLimit: parseInt(editData.potLimit),
            commission: parseFloat(editData.commission),
            status: editData.status,
            riskLevel: editData.riskLevel,
            gameType: editData.gameType
          }
        : game
    ));
    setEditingRow(null);
    setEditData({});
  };

  const handleCancel = () => {
    setEditingRow(null);
    setEditData({});
  };

  const handleView = (game) => {
    setViewingGame(game);
  };

  const handleManage = (game) => {
    setManagingGame(game);
  };

  const handleGameAction = (gameId, action) => {
    let newStatus = '';
    switch(action) {
      case 'pause':
        newStatus = 'Paused';
        break;
      case 'resume':
        newStatus = 'Playing';
        break;
      case 'force_show':
        newStatus = 'Completed';
        break;
      case 'end_game':
        newStatus = 'Completed';
        break;
      case 'kick_player':
        // Handle player kick logic
        break;
    }
    if (newStatus) {
      setGameData(prev => prev.map(game =>
        game.id === gameId ? { ...game, status: newStatus } : game
      ));
    }
    setManagingGame(null);
  };

  const handleDelete = (gameId) => {
    if (window.confirm('Are you sure you want to delete this game? This action cannot be undone.')) {
      setGameData(prev => prev.filter(game => game.id !== gameId));
    }
  };

  const exportData = () => {
    const csvContent = filteredData.map(game =>
      `${game.id},${game.gameType},${game.tableId},${game.tableName},${game.currentPlayers}/${game.maxPlayers},${game.potAmount},${game.status},${game.rake}`
    ).join('\n');
    const blob = new Blob([`ID,Game Type,Table ID,Table Name,Players,Pot Amount,Status,Rake\n${csvContent}`], 
      { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'teen_patti_games_report.csv';
    a.click();
  };

  const calculateSessionProfit = (game) => {
    return game.rake + (game.totalRakeCollected || 0);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-2">
        <h1 className="text-3xl font-bold text-gray-900 text-start">🃏 Teen Patti Admin Dashboard</h1>
      </div>
      
      {/* Statistics Cards */}
      {/* <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Active Tables</p>
              <p className="text-2xl font-bold text-gray-900">{filteredData.filter(g => g.status === 'Playing').length}</p>
            </div>
            <Users className="w-8 h-8 text-blue-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Total Pot Value</p>
              <p className="text-2xl font-bold text-green-600">₹{filteredData.reduce((sum, g) => sum + g.potAmount, 0).toLocaleString()}</p>
            </div>
            <DollarSign className="w-8 h-8 text-green-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Total Rake</p>
              <p className="text-2xl font-bold text-purple-600">₹{filteredData.reduce((sum, g) => sum + g.rake, 0).toLocaleString()}</p>
            </div>
            <TrendingUp className="w-8 h-8 text-purple-500" />
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Active Players</p>
              <p className="text-2xl font-bold text-orange-600">{filteredData.reduce((sum, g) => sum + g.currentPlayers, 0)}</p>
            </div>
            <Activity className="w-8 h-8 text-orange-500" />
          </div>
        </div>
      </div> */}

      {/* Main Table */}
      <div className="bg-white rounded-xl shadow-lg overflow-x-auto max-w-[900px] border border-gray-200">
        <div className="p-6 border-b border-gray-200 bg-white">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <h2 className="text-xl font-bold text-gray-900">Live Teen Patti Games Management</h2>
            <div className="flex items-center justify-between flex-wrap gap-6">
              {/* Search */}
              <div className="relative min-w-0 flex-shrink-0">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search games/tables/players..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 text-sm cursor-pointer w-64"
                />
              </div>
              <div className="flex items-center gap-4 flex-wrap">
                {/* Filter */}
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-gray-500" />
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500 text-sm cursor-pointer"
                  >
                    <option value="All">All Status</option>
                    <option value="Playing">Playing</option>
                    <option value="Completed">Completed</option>
                    <option value="Waiting">Waiting</option>
                    <option value="Paused">Paused</option>
                  </select>
                </div>
                {/* Export Button */}
                <button
                  onClick={exportData}
                  className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-all duration-200 cursor-pointer hover:shadow-md"
                >
                  <Download className="w-4 h-4" />
                  Export
                </button>
                {/* Refresh Button */}
                <button
                  onClick={() => window.location.reload()}
                  className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-all duration-200 cursor-pointer hover:shadow-md"
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
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Game Info
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Table Details
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Players & Hands
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Game Progress
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Financial Details
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Security & Analytics
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredData.map((game) => (
                <tr key={game.id} className="hover:bg-gray-50 transition-all duration-200">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-bold text-gray-900">{game.id}</div>
                    <div className="text-sm text-gray-500">{game.gameId}</div>
                    <div className="text-xs text-gray-400 flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {game.createdAt}
                    </div>
                    <div className="text-xs text-blue-500 mt-1">
                      ⏱ Duration: {game.sessionDuration}
                    </div>
                    <div className="text-xs text-purple-500 mt-1">
                      {game.variation} • {game.gameMode}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-bold text-gray-900">{game.tableName}</div>
                    <div className="text-xs text-gray-500 mb-1">{game.tableId}</div>
                    <div className="text-xs text-gray-500 mb-1">{game.gameType}</div>
                    <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
                      <Users className="w-3 h-3 text-blue-500" />
                      {game.currentPlayers}/{game.maxPlayers} Players
                    </div>
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      {game.dealer.avatar} {game.dealer.name}
                    </div>
                    <div className={`text-xs font-semibold px-2 py-1 rounded-full



                      ${getRiskLevelClass(game.riskLevel)} border inline-flex items-center gap-1 mt-1`}>
                      <Shield className="w-3 h-3" />
                      {game.riskLevel}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex -space-x-2 mb-2">
                      {game.players.slice(0, 4).map(player => (
                        <span key={player.userId} className="inline-block w-6 h-6 rounded-full bg-gray-200 border border-white text-xs flex items-center justify-center">
                          {player.avatar}
                        </span>
                      ))}
                      {game.players.length > 4 && (
                        <span className="inline-block w-6 h-6 rounded-full bg-gray-300 border border-white text-xs flex items-center justify-center">
                          +{game.players.length - 4}
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-gray-500 mb-1">
                      Best Hand: {getHandTypeIcon(game.players.reduce((best, player) => 
                        getHandStrength(player.handType) > getHandStrength(best.handType) ? player : best
                      ).handType)} {game.players.reduce((best, player) => 
                        getHandStrength(player.handType) > getHandStrength(best.handType) ? player : best
                      ).handType}
                    </div>
                    <div className="text-xs text-gray-500">
                      Current Turn: {game.players.find(p => p.position === game.currentTurn)?.name || 'None'}
                    </div>
                    <div className="text-xs text-red-500 mt-1">
                      {game.sideShowRequested && 'Side Show Requested'}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${(game.gameRound / game.totalRounds) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-xs text-gray-600">{game.gameRound}/{game.totalRounds}</span>
                    </div>
                    <div className="text-xs text-gray-500 mb-1">
                      Round: {game.gameRound} of {game.totalRounds}
                    </div>
                    <div className="text-xs text-gray-500 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      Timer: {game.currentPlayerTimer}s
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      Last Action: {game.lastAction}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-bold text-green-600">₹{game.potAmount.toLocaleString()}</div>
                    {game.sidePot > 0 && (
                      <div className="text-xs text-purple-600">Side: ₹{game.sidePot.toLocaleString()}</div>
                    )}
                    <div className="text-xs text-gray-500 mt-1">
                      Bet: ₹{game.betAmount} | Blind: ₹{game.blindBet}
                    </div>
                    <div className="text-xs text-gray-500">
                      Boot: ₹{game.bootAmount} | Chaalu: ₹{game.chaalu}
                    </div>
                    <div className="text-xs text-blue-500 mt-1">
                      Rake: ₹{game.rake}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-1 text-xs mb-1">
                      <BarChart3 className="w-3 h-3 text-blue-500" />
                      Hands: {game.completedHands}/{game.totalHands}
                    </div>
                    <div className="text-xs text-gray-500 mb-1">
                      Avg Pot: ₹{game.avgPotSize.toLocaleString()}
                    </div>
                    <div className="text-xs text-gray-500">
                      Biggest: ₹{game.biggestPot.toLocaleString()}
                    </div>
                    {Object.values(game.suspiciousPatterns).some(val => val) && (
                      <div className="text-xs text-red-500 flex items-center gap-1 mt-1">
                        <AlertTriangle className="w-3 h-3" />
                        Suspicious Activity
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusBadge(game.status)}`}>
                      {getGameStateIcon(game.gameState)}
                      <span className="ml-1">{game.status}</span>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {game.gameState}
                    </div>
                    <div className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                      <Eye className="w-3 h-3" />
                      {game.spectators} Spectators
                    </div>
                    <div className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                      <UserCheck className="w-3 h-3" />
                      {game.chatMessages} Chats
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleView(game)}
                        className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50 transition-all duration-200"
                        title="View Game Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleManage(game)}
                        className="text-purple-600 hover:text-purple-900 p-1 rounded hover:bg-purple-50 transition-all duration-200"
                        title="Manage Game"
                      >
                        <Settings className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleEdit(game)}
                        className="text-gray-600 hover:text-gray-900 p-1 rounded hover:bg-gray-50 transition-all duration-200"
                        title="Edit Game"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(game.id)}
                        className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50 transition-all duration-200"
                        title="Delete Game"
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
        
        {filteredData.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-2">No games found</div>
            <div className="text-sm text-gray-500">Try adjusting your search or filter criteria</div>
          </div>
        )}
      </div>

      {/* View Game Modal */}
      {viewingGame && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Game Details - {viewingGame.tableName}</h3>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="font-medium text-gray-700 mb-2">Game Information</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Game ID:</span>
                      <span className="font-medium">{viewingGame.id}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Table ID:</span>
                      <span className="font-medium">{viewingGame.tableId}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Game Type:</span>
                      <span className="font-medium">{viewingGame.gameType}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Variation:</span>
                      <span className="font-medium">{viewingGame.variation}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Created At:</span>
                      <span className="font-medium">{viewingGame.createdAt}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium text-gray-700 mb-2">Game Status</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Status:</span>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadge(viewingGame.status)}`}>
                        {viewingGame.status}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Risk Level:</span>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRiskLevelClass(viewingGame.riskLevel)}`}>
                        {viewingGame.riskLevel}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Current Round:</span>
                      <span className="font-medium">{viewingGame.gameRound}/{viewingGame.totalRounds}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Time Elapsed:</span>
                      <span className="font-medium">{viewingGame.timeElapsed}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <h4 className="font-medium text-gray-700 mb-4">Players Information</h4>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Player</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hand</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bet</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Chips</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Win %</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {viewingGame.players.map(player => (
                      <tr key={player.userId}>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="text-lg">{player.avatar}</div>
                            <div className="ml-2">
                              <div className="text-sm font-medium text-gray-900">{player.name}</div>
                              <div className="text-xs text-gray-500">{player.userId}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {player.cards.join(' ')}
                          </div>
                          <div className="text-xs text-gray-500">
                            {getHandTypeIcon(player.handType)} {player.handType} ({player.handRank})
                          </div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="text-sm text-gray-900">₹{player.bet}</div>
                          <div className="text-xs text-gray-500">Total: ₹{player.totalBet}</div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                          ₹{player.chips.toLocaleString()}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadge(player.status)}`}>
                            {player.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">
                          {player.winProbability}%
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              
              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setViewingGame(null)}
                  className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg text-sm font-medium"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Manage Game Modal */}
      {managingGame && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Manage Game - {managingGame.tableName}</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Game Actions</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => handleGameAction(managingGame.id, 'pause')}
                      className="flex items-center justify-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-2 rounded text-sm"
                    >
                      <Pause className="w-4 h-4" /> Pause
                    </button>
                    <button
                      onClick={() => handleGameAction(managingGame.id, 'resume')}
                      className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded text-sm"
                    >
                      <Play className="w-4 h-4" /> Resume
                    </button>
                    <button
                      onClick={() => handleGameAction(managingGame.id, 'force_show')}
                      className="flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded text-sm"
                    >
                      <Eye className="w-4 h-4" /> Force Show
                    </button>
                    <button
                      onClick={() => handleGameAction(managingGame.id, 'end_game')}
                      className="flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded text-sm"
                    >
                      <StopCircle className="w-4 h-4" /> End Game
                    </button>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Player Management</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 text-sm">
                    <option>Select a player to manage</option>
                    {managingGame.players.map(player => (
                      <option key={player.userId} value={player.userId}>
                        {player.name} ({player.status})
                      </option>
                    ))}
                  </select>
                  <div className="mt-2 grid grid-cols-2 gap-2">
                    <button
                      onClick={() => handleGameAction(managingGame.id, 'kick_player')}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded text-sm"
                    >
                      Kick Player
                    </button>
                    <button className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-2 rounded text-sm">
                      View Stats
                    </button>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Game Settings</label>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Boot Amount:</span>
                      <span className="font-medium">₹{managingGame.bootAmount}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Pot Limit:</span>
                      <span className="font-medium">₹{managingGame.potLimit.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Commission:</span>
                      <span className="font-medium">{managingGame.commission}%</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 flex justify-end gap-3">
                <button
                  onClick={() => setManagingGame(null)}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg text-sm font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleEdit(managingGame)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium"
                >
                  Edit Settings
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editingRow && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Edit Game Settings</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Game Type</label>
                  <select
                    value={editData.gameType || ''}
                    onChange={(e) => setEditData({...editData, gameType: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 text-sm"
                  >
                    <option value="Classic Teen Patti">Classic Teen Patti</option>
                    <option value="No Limit Teen Patti">No Limit Teen Patti</option>
                    <option value="Pot Limit Teen Patti">Pot Limit Teen Patti</option>
                    <option value="Tournament Teen Patti">Tournament Teen Patti</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select
                    value={editData.status || ''}
                    onChange={(e) => setEditData({...editData, status: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 text-sm"
                  >
                    <option value="Playing">Playing</option>
                    <option value="Completed">Completed</option>
                    <option value="Waiting">Waiting</option>
                    <option value="Paused">Paused</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Risk Level</label>
                  <select
                    value={editData.riskLevel || ''}
                    onChange={(e) => setEditData({...editData, riskLevel: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 text-sm"
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                    <option value="Very High">Very High</option>
                  </select>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Bet Amount (₹)</label>
                    <input
                      type="number"
                      value={editData.betAmount || ''}
                      onChange={(e) => setEditData({...editData, betAmount: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Blind Bet (₹)</label>
                    <input
                      type="number"
                      value={editData.blindBet || ''}
                      onChange={(e) => setEditData({...editData, blindBet: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 text-sm"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Boot Amount (₹)</label>
                    <input
                      type="number"
                      value={editData.bootAmount || ''}
                      onChange={(e) => setEditData({...editData, bootAmount: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Max Players</label>
                    <input
                      type="number"
                      value={editData.maxPlayers || ''}
                      onChange={(e) => setEditData({...editData, maxPlayers: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 text-sm"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Pot Limit (₹)</label>
                    <input
                      type="number"
                      value={editData.potLimit || ''}
                      onChange={(e) => setEditData({...editData, potLimit: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Commission (%)</label>
                    <input
                      type="number"
                      step="0.1"
                      value={editData.commission || ''}
                      onChange={(e) => setEditData({...editData, commission: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 text-sm"
                    />
                  </div>
                </div>
              </div>
              
              <div className="mt-6 flex justify-end gap-3">
                <button
                  onClick={handleCancel}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg text-sm font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeenPattiGameTable;

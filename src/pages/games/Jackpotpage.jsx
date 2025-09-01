import React, { useState } from 'react';
import { Eye, Settings, Edit3, Trash2, Filter, Play, Pause, StopCircle, Users, Clock, Trophy, DollarSign, UserCheck, AlertTriangle, BarChart3, RefreshCw, Download, Search, Calendar, Star, Zap, Timer, Gift, CreditCard, Activity } from 'lucide-react';

const JackpotGameTable = () => {
  const [gameData, setGameData] = useState([
    {
      id: 'JPT001',
      gameId: 'JACKPOT_001',
      gameType: 'Classic Jackpot',
      totalPlayers: 25,
      activePlayers: 22,
      minPlayers: 10,
      maxPlayers: 50,
      entryFee: 100,
      totalPot: 2450,
      platformFee: 245,
      winnerPot: 2205,
      currentRound: 3,
      totalRounds: 5,
      timePerRound: 60,
      timeLeft: '00:02:45',
      totalGameTime: '00:12:30',
      status: 'Active',
      createdAt: '2025-09-01 15:30:22',
      lastActivity: '2025-09-01 15:32:10',
      gameMode: 'Public',
      difficulty: 'Medium',
      winner: null,
      topPlayers: [
        { name: 'Player123', score: 1250, position: 1, avatar: '👑' },
        { name: 'ProGamer', score: 1180, position: 2, avatar: '⭐' },
        { name: 'LuckyPlayer', score: 1050, position: 3, avatar: '🎯' }
      ],
      chatMessages: 156,
      moderationFlags: 0,
      spectators: 8,
      gameRating: 4.2,
      serverRegion: 'Asia-South',
      connectionIssues: 1
    },
    {
      id: 'JPT002',
      gameId: 'JACKPOT_002',
      gameType: 'Speed Jackpot',
      totalPlayers: 15,
      activePlayers: 15,
      minPlayers: 5,
      maxPlayers: 20,
      entryFee: 50,
      totalPot: 750,
      platformFee: 75,
      winnerPot: 675,
      currentRound: 1,
      totalRounds: 3,
      timePerRound: 30,
      timeLeft: '00:00:25',
      totalGameTime: '00:03:45',
      status: 'Active',
      createdAt: '2025-09-01 15:35:10',
      lastActivity: '2025-09-01 15:35:40',
      gameMode: 'Private',
      difficulty: 'Easy',
      winner: null,
      topPlayers: [
        { name: 'FastPlayer', score: 450, position: 1, avatar: '⚡' },
        { name: 'QuickWin', score: 420, position: 2, avatar: '🔥' },
        { name: 'SpeedDemon', score: 380, position: 3, avatar: '💨' }
      ],
      chatMessages: 45,
      moderationFlags: 0,
      spectators: 3,
      gameRating: 4.8,
      serverRegion: 'Asia-South',
      connectionIssues: 0
    },
    {
      id: 'JPT003',
      gameId: 'JACKPOT_003',
      gameType: 'Mega Jackpot',
      totalPlayers: 100,
      activePlayers: 0,
      minPlayers: 50,
      maxPlayers: 100,
      entryFee: 500,
      totalPot: 47500,
      platformFee: 4750,
      winnerPot: 42750,
      currentRound: 5,
      totalRounds: 5,
      timePerRound: 120,
      timeLeft: '00:00:00',
      totalGameTime: '00:25:40',
      status: 'Completed',
      createdAt: '2025-09-01 14:45:30',
      lastActivity: '2025-09-01 15:11:10',
      gameMode: 'Public',
      difficulty: 'Hard',
      winner: 'MegaWinner99',
      topPlayers: [
        { name: 'MegaWinner99', score: 4850, position: 1, avatar: '👑' },
        { name: 'AlmostThere', score: 4720, position: 2, avatar: '🥈' },
        { name: 'CloseFight', score: 4680, position: 3, avatar: '🥉' }
      ],
      chatMessages: 324,
      moderationFlags: 2,
      spectators: 0,
      gameRating: 4.9,
      serverRegion: 'Asia-South',
      connectionIssues: 3
    },
    {
      id: 'JPT004',
      gameId: 'JACKPOT_004',
      gameType: 'Mini Jackpot',
      totalPlayers: 8,
      activePlayers: 8,
      minPlayers: 5,
      maxPlayers: 10,
      entryFee: 25,
      totalPot: 200,
      platformFee: 20,
      winnerPot: 180,
      currentRound: 0,
      totalRounds: 3,
      timePerRound: 45,
      timeLeft: '00:01:20',
      totalGameTime: '00:00:00',
      status: 'Waiting',
      createdAt: '2025-09-01 15:40:15',
      lastActivity: '2025-09-01 15:40:45',
      gameMode: 'Public',
      difficulty: 'Easy',
      winner: null,
      topPlayers: [
        { name: 'NewPlayer1', score: 0, position: 1, avatar: '🎮' },
        { name: 'Beginner2', score: 0, position: 2, avatar: '🎯' },
        { name: 'Fresh3', score: 0, position: 3, avatar: '⭐' }
      ],
      chatMessages: 12,
      moderationFlags: 0,
      spectators: 2,
      gameRating: 0,
      serverRegion: 'Asia-South',
      connectionIssues: 0
    }
  ]);

  const [statusFilter, setStatusFilter] = useState('All');
  const [gameTypeFilter, setGameTypeFilter] = useState('All');
  const [editingRow, setEditingRow] = useState(null);
  const [editData, setEditData] = useState({});
  const [viewingGame, setViewingGame] = useState(null);
  const [managingGame, setManagingGame] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const getStatusBadge = (status) => {
    const statusClasses = {
      Active: 'bg-green-50 text-green-700 border-green-200',
      Waiting: 'bg-yellow-50 text-yellow-700 border-yellow-200',
      Completed: 'bg-gray-50 text-gray-700 border-gray-200',
      Paused: 'bg-orange-50 text-orange-700 border-orange-200'
    };
    return statusClasses[status] || 'bg-gray-50 text-gray-700 border-gray-200';
  };

  const getDifficultyColor = (difficulty) => {
    const colors = {
      Easy: 'text-green-600',
      Medium: 'text-yellow-600',
      Hard: 'text-red-600'
    };
    return colors[difficulty] || 'text-gray-600';
  };

  const filteredData = gameData.filter(game => 
    (statusFilter === 'All' || game.status === statusFilter) &&
    (gameTypeFilter === 'All' || game.gameType === gameTypeFilter) &&
    (searchTerm === '' || 
     game.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
     game.gameId.toLowerCase().includes(searchTerm.toLowerCase()) ||
     game.gameType.toLowerCase().includes(searchTerm.toLowerCase()) ||
     game.winner?.toLowerCase().includes(searchTerm.toLowerCase()) ||
     game.topPlayers.some(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()))
    )
  );

  const handleEdit = (game) => {
    setEditingRow(game.id);
    setEditData({
      entryFee: game.entryFee,
      totalPot: game.totalPot,
      platformFee: game.platformFee,
      timePerRound: game.timePerRound,
      totalRounds: game.totalRounds,
      maxPlayers: game.maxPlayers,
      status: game.status,
      gameMode: game.gameMode,
      difficulty: game.difficulty
    });
  };

  const handleSave = () => {
    setGameData(prev => prev.map(game => 
      game.id === editingRow 
        ? { 
            ...game, 
            entryFee: parseInt(editData.entryFee),
            totalPot: parseInt(editData.totalPot),
            platformFee: parseInt(editData.platformFee),
            timePerRound: parseInt(editData.timePerRound),
            totalRounds: parseInt(editData.totalRounds),
            maxPlayers: parseInt(editData.maxPlayers),
            status: editData.status,
            gameMode: editData.gameMode,
            difficulty: editData.difficulty
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
        newStatus = 'Active';
        break;
      case 'end':
        newStatus = 'Completed';
        break;
      case 'start':
        newStatus = 'Active';
        break;
    }
    
    setGameData(prev => prev.map(game => 
      game.id === gameId ? { ...game, status: newStatus } : game
    ));
    setManagingGame(null);
  };

  const handleDelete = (gameId) => {
    if (confirm('Are you sure you want to delete this jackpot game? This action cannot be undone.')) {
      setGameData(prev => prev.filter(game => game.id !== gameId));
    }
  };

  const exportData = () => {
    const csvContent = filteredData.map(game => 
      `${game.id},${game.gameType},${game.entryFee},${game.totalPot},${game.totalPlayers},${game.status},${game.winner || 'N/A'}`
    ).join('\n');
    const blob = new Blob([`ID,Game Type,Entry Fee,Total Pot,Players,Status,Winner\n${csvContent}`], 
      { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'jackpot_games_report.csv';
    a.click();
  };

  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-2">
        <h1 className="text-3xl font-bold text-gray-900 text-start">💰 Jackpot Admin Dashboard</h1>
        <p className="text-gray-600 mt-1">Manage and monitor all jackpot games in real-time</p>
      </div>



      {/* Main Table */}
      <div className="bg-white rounded-xl shadow-lg overflow-x-auto border border-gray-200 max-w-[161vh] overflow-w-auto">
        <div className="p-4 border-b border-gray-200 bg-white">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <h2 className="text-xl font-bold text-gray-900">Live Jackpot Games Management</h2>
            
            <div className="flex items-center justify-between flex-wrap gap-4">
              {/* Search */}
              <div className="relative min-w-0 flex-shrink-0">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search games, players..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm cursor-pointer w-64"
                />
              </div>

              <div className="flex items-center gap-3 flex-wrap">
                {/* Status Filter */}
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-gray-500" />
                  <select 
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm cursor-pointer"
                  >
                    <option value="All">All Status</option>
                    <option value="Active">Active</option>
                    <option value="Waiting">Waiting</option>
                    <option value="Completed">Completed</option>
                    <option value="Paused">Paused</option>
                  </select>
                </div>

                {/* Game Type Filter */}
                <select 
                  value={gameTypeFilter}
                  onChange={(e) => setGameTypeFilter(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-sm cursor-pointer"
                >
                  <option value="All">All Types</option>
                  <option value="Mini Jackpot">Mini Jackpot</option>
                  <option value="Classic Jackpot">Classic Jackpot</option>
                  <option value="Speed Jackpot">Speed Jackpot</option>
                  <option value="Mega Jackpot">Mega Jackpot</option>
                </select>

                {/* Export Button */}
                <button 
                  onClick={exportData}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-all duration-200 cursor-pointer hover:shadow-md"
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

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-900   uppercase tracking-wider">
                  Game Info
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-900 uppercase tracking-wider text-nowrap">
                  Players & Status
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-900 uppercase tracking-wider text-nowrap">
                  Financial Details
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-900 uppercase tracking-wider text-nowrap">
                  Game Progress
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">
                  Leaderboard
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-900 uppercase tracking-wider text-nowrap">
                  Activity & Stats
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-900 uppercase tracking-wider text-nowrap">
                  Status & Controls
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredData.map((game) => (
                <tr key={game.id} className="hover:bg-gray-50 transition-all duration-200">
                  <td className="px-6 py-2 whitespace-nowrap">
                    <div className="text-sm font-bold text-gray-900">{game.id}</div>
                    <div className="text-sm text-purple-600 font-medium">{game.gameType}</div>
                    <div className="text-xs text-gray-500 flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {game.createdAt}
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`text-xs font-semibold ${getDifficultyColor(game.difficulty)}`}>
                        {game.difficulty}
                      </span>
                      <span className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded">
                        {game.gameMode}
                      </span>
                    </div>
                  </td>
                  
                  <td className="px-6 py-2 whitespace-nowrap">
                    <div className="flex items-center gap-2 mb-2">
                      <Users className="w-4 h-4 text-blue-500" />
                      <span className="text-sm font-bold text-gray-900">
                        {game.activePlayers}/{game.totalPlayers}
                      </span>
                    </div>
                    <div className="text-xs text-gray-500">
                      Max: {game.maxPlayers} | Min: {game.minPlayers}
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <Eye className="w-3 h-3 text-green-500" />
                      <span className="text-xs text-gray-600">{game.spectators} watching</span>
                    </div>
                    {game.connectionIssues > 0 && (
                      <div className="flex items-center gap-1 mt-1">
                        <AlertTriangle className="w-3 h-3 text-red-500" />
                        <span className="text-xs text-red-600">{game.connectionIssues} issues</span>
                      </div>
                    )}
                  </td>

                  <td className="px-6 py-2 whitespace-nowrap">
                    <div className="text-sm font-bold text-gray-900">₹{game.entryFee} entry</div>
                    <div className="text-sm font-bold text-green-600">₹{game.totalPot} pot</div>
                    <div className="text-sm font-bold text-purple-600">₹{game.winnerPot} winner</div>
                    <div className="text-xs text-gray-500">Fee: ₹{game.platformFee}</div>
                  </td>

                  <td className="px-6 py-2 whitespace-nowrap">
                    <div className="flex items-center gap-2 mb-1">
                      <Timer className="w-4 h-4 text-orange-500" />
                      <span className="text-sm font-medium text-gray-900">{game.timeLeft}</span>
                    </div>
                    <div className="text-xs text-gray-500">
                      Round {game.currentRound}/{game.totalRounds}
                    </div>
                    <div className="text-xs text-gray-500">
                      {game.timePerRound}s per round
                    </div>
                    <div className="text-xs text-gray-400">
                      Total: {game.totalGameTime}
                    </div>
                  </td>

                  <td className="px-6 py-2 whitespace-nowrap">
                    <div className="space-y-1">
                      {game.topPlayers.slice(0, 3).map((player, index) => (
                        <div key={index} className="flex items-center justify-between text-xs">
                          <div className="flex items-center gap-2">
                            <span className="text-lg">{player.avatar}</span>
                            <span className="font-medium text-gray-900 truncate max-w-20">
                              {player.name}
                            </span>
                          </div>
                          <span className="font-bold text-purple-600">{player.score}</span>
                        </div>
                      ))}
                    </div>
                    {game.winner && (
                      <div className="mt-2 p-1 bg-yellow-50 rounded text-xs">
                        <Trophy className="w-3 h-3 text-yellow-600 inline mr-1" />
                        <span className="font-bold text-yellow-700">{game.winner}</span>
                      </div>
                    )}
                  </td>

                  <td className="px-6 py-2 whitespace-nowrap">
                    <div className="text-sm text-gray-900 mb-1">
                      <Activity className="w-3 h-3 text-blue-500 inline mr-1" />
                      {game.chatMessages} messages
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <Star className="w-3 h-3 text-yellow-500" />
                      <span>{game.gameRating}/5</span>
                    </div>
                    {game.moderationFlags > 0 && (
                      <div className="flex items-center gap-1 text-xs text-red-600 mt-1">
                        <AlertTriangle className="w-3 h-3" />
                        {game.moderationFlags} flags
                      </div>
                    )}
                    <div className="text-xs text-gray-500 mt-1">
                      {game.serverRegion}
                    </div>
                  </td>

                  <td className="px-6 py-2 whitespace-nowrap">
                    <div className="flex flex-col gap-2">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${getStatusBadge(game.status)}`}>
                        {game.status}
                      </span>
                      
                      <div className="flex gap-1">
                        <button 
                          onClick={() => handleView(game)}
                          className="bg-white hover:bg-purple-50 text-purple-700 border border-purple-300 px-3 py-1 rounded-lg text-xs font-medium flex items-center justify-center gap-1 transition-all duration-200 hover:shadow-md cursor-pointer"
                        >
                          <Eye className="w-3 h-3" />
                          View
                        </button>
                        
                        <button 
                          onClick={() => handleManage(game)}
                          className="bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 px-3 py-1 rounded-lg text-xs font-medium flex items-center justify-center gap-1 transition-all duration-200 hover:shadow-md cursor-pointer"
                        >
                          <Settings className="w-3 h-3" />
                          Manage
                        </button>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-2 whitespace-nowrap">
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => handleEdit(game)}
                        className="bg-white hover:bg-blue-50 text-blue-700 border border-blue-300 p-2 rounded-lg transition-all duration-200 hover:shadow-md cursor-pointer"
                        title="Edit Game Settings"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDelete(game.id)}
                        className="bg-white hover:bg-red-50 text-red-600 border border-red-300 p-2 rounded-lg transition-all duration-200 hover:shadow-md hover:border-red-400 cursor-pointer"
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
      </div>

      {/* Edit Game Modal */}
      {editingRow && (
        <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 max-w-2xl w-full mx-4 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-900">Edit Jackpot Game Settings</h3>
              <button 
                onClick={handleCancel}
                className="text-gray-400 hover:text-gray-600 text-3xl font-bold cursor-pointer"
              >
                ×
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Entry Fee (₹)</label>
                <input
                  type="number"
                  value={editData.entryFee}
                  onChange={(e) => setEditData({...editData, entryFee: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 cursor-pointer"
                  placeholder="Total Pot"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Platform Fee (₹)</label>
                <input
                  type="number"
                  value={editData.platformFee}
                  onChange={(e) => setEditData({...editData, platformFee: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 cursor-pointer"
                  placeholder="Platform Fee"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Time Per Round (seconds)</label>
                <input
                  type="number"
                  value={editData.timePerRound}
                  onChange={(e) => setEditData({...editData, timePerRound: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 cursor-pointer"
                  placeholder="Time Per Round"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Total Rounds</label>
                <input
                  type="number"
                  value={editData.totalRounds}
                  onChange={(e) => setEditData({...editData, totalRounds: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 cursor-pointer"
                  placeholder="Total Rounds"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Max Players</label>
                <input
                  type="number"
                  value={editData.maxPlayers}
                  onChange={(e) => setEditData({...editData, maxPlayers: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 cursor-pointer"
                  placeholder="Max Players"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Game Mode</label>
                <select
                  value={editData.gameMode}
                  onChange={(e) => setEditData({...editData, gameMode: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 cursor-pointer"
                >
                  <option value="Public">Public</option>
                  <option value="Private">Private</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Difficulty</label>
                <select
                  value={editData.difficulty}
                  onChange={(e) => setEditData({...editData, difficulty: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 cursor-pointer"
                >
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  value={editData.status}
                  onChange={(e) => setEditData({...editData, status: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 cursor-pointer"
                >
                  <option value="Active">Active</option>
                  <option value="Waiting">Waiting</option>
                  <option value="Completed">Completed</option>
                  <option value="Paused">Paused</option>
                </select>
              </div>
            </div>
            
            <div className="flex gap-3 mt-6">
              <button
                onClick={handleSave}
                className="flex-1 bg-purple-600 hover:bg-purple-700 text-white px-4 py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-all duration-200 hover:shadow-lg cursor-pointer"
              >
                <UserCheck className="w-5 h-5" />
                Save Changes
              </button>
              <button
                onClick={handleCancel}
                className="flex-1 bg-gray-600 hover:bg-gray-700 text-white px-4 py-3 rounded-lg font-medium transition-all duration-200 hover:shadow-lg cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View Game Modal */}
      {viewingGame && (
        <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 max-w-6xl w-full mx-4 max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900">Jackpot Game Details - {viewingGame.id}</h3>
              <button 
                onClick={() => setViewingGame(null)}
                className="text-gray-400 hover:text-gray-600 text-3xl font-bold cursor-pointer"
              >
                ×
              </button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Game Information */}
              <div className="space-y-4">
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h4 className="font-bold text-purple-900 mb-3 flex items-center gap-2">
                    <Zap className="w-5 h-5" />
                    Game Information
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div><span className="font-semibold">Game Type:</span> {viewingGame.gameType}</div>
                    <div><span className="font-semibold">Game Mode:</span> {viewingGame.gameMode}</div>
                    <div><span className="font-semibold">Difficulty:</span> <span className={getDifficultyColor(viewingGame.difficulty)}>{viewingGame.difficulty}</span></div>
                    <div><span className="font-semibold">Server:</span> {viewingGame.serverRegion}</div>
                    <div><span className="font-semibold">Created:</span> {viewingGame.createdAt}</div>
                    <div><span className="font-semibold">Last Activity:</span> {viewingGame.lastActivity}</div>
                    <div><span className="font-semibold">Rating:</span> {viewingGame.gameRating}/5 ⭐</div>
                  </div>
                </div>

                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-bold text-green-900 mb-3 flex items-center gap-2">
                    <DollarSign className="w-5 h-5" />
                    Financial Details
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div><span className="font-semibold">Entry Fee:</span> ₹{viewingGame.entryFee}</div>
                    <div><span className="font-semibold">Total Pot:</span> ₹{viewingGame.totalPot}</div>
                    <div><span className="font-semibold">Winner Pot:</span> ₹{viewingGame.winnerPot}</div>
                    <div><span className="font-semibold">Platform Fee:</span> ₹{viewingGame.platformFee}</div>
                    <div className="pt-2 border-t">
                      <span className="font-semibold">Revenue %:</span> {((viewingGame.platformFee / viewingGame.totalPot) * 100).toFixed(1)}%
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Players & Progress */}
              <div className="space-y-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-bold text-blue-900 mb-3 flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    Players & Activity
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div><span className="font-semibold">Active Players:</span> {viewingGame.activePlayers}</div>
                    <div><span className="font-semibold">Total Players:</span> {viewingGame.totalPlayers}</div>
                    <div><span className="font-semibold">Min Players:</span> {viewingGame.minPlayers}</div>
                    <div><span className="font-semibold">Max Players:</span> {viewingGame.maxPlayers}</div>
                    <div><span className="font-semibold">Spectators:</span> {viewingGame.spectators}</div>
                    <div><span className="font-semibold">Chat Messages:</span> {viewingGame.chatMessages}</div>
                    <div><span className="font-semibold">Connection Issues:</span> {viewingGame.connectionIssues}</div>
                    {viewingGame.moderationFlags > 0 && (
                      <div className="text-red-600"><span className="font-semibold">Moderation Flags:</span> {viewingGame.moderationFlags}</div>
                    )}
                  </div>
                </div>

                <div className="bg-orange-50 p-4 rounded-lg">
                  <h4 className="font-bold text-orange-900 mb-3 flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    Game Progress
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div><span className="font-semibold">Current Round:</span> {viewingGame.currentRound}/{viewingGame.totalRounds}</div>
                    <div><span className="font-semibold">Time Left:</span> {viewingGame.timeLeft}</div>
                    <div><span className="font-semibold">Time Per Round:</span> {viewingGame.timePerRound}s</div>
                    <div><span className="font-semibold">Total Game Time:</span> {viewingGame.totalGameTime}</div>
                    <div className="pt-2">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-orange-600 h-2 rounded-full" 
                          style={{ width: `${(viewingGame.currentRound / viewingGame.totalRounds) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-xs text-gray-600 mt-1 block">
                        {Math.round((viewingGame.currentRound / viewingGame.totalRounds) * 100)}% Complete
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Leaderboard */}
              <div className="space-y-4">
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <h4 className="font-bold text-yellow-900 mb-3 flex items-center gap-2">
                    <Trophy className="w-5 h-5" />
                    Leaderboard
                  </h4>
                  <div className="space-y-3">
                    {viewingGame.topPlayers.map((player, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-white rounded-lg border shadow-sm">
                        <div className="flex items-center gap-3">
                          <div className="text-2xl">{player.avatar}</div>
                          <div>
                            <div className="font-bold text-gray-900">{player.name}</div>
                            <div className="text-xs text-gray-500">Position #{player.position}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-purple-600">{player.score}</div>
                          <div className="text-xs text-gray-500">points</div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {viewingGame.winner && (
                    <div className="mt-4 p-3 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-lg text-white">
                      <div className="flex items-center justify-center gap-2">
                        <Trophy className="w-6 h-6" />
                        <div className="text-center">
                          <div className="font-bold text-lg">🎉 WINNER 🎉</div>
                          <div className="font-medium">{viewingGame.winner}</div>
                          <div className="text-sm opacity-90">Prize: ₹{viewingGame.winnerPot}</div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            <div className="mt-6 flex justify-center">
              <button
                onClick={() => setViewingGame(null)}
                className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 hover:shadow-lg cursor-pointer"
              >
                Close Details
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Manage Game Modal */}
      {managingGame && (
        <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full mx-4 shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-900">Manage Game - {managingGame.id}</h3>
              <button 
                onClick={() => setManagingGame(null)}
                className="text-gray-400 hover:text-gray-600 text-3xl font-bold cursor-pointer"
              >
                ×
              </button>
            </div>
            
            <div className="space-y-3">
              <div className="bg-gray-50 p-4 rounded-lg mb-4">
                <div className="text-sm text-gray-600">
                  <div><span className="font-semibold">Current Status:</span> {managingGame.status}</div>
                  <div><span className="font-semibold">Active Players:</span> {managingGame.activePlayers}/{managingGame.totalPlayers}</div>
                  <div><span className="font-semibold">Current Round:</span> {managingGame.currentRound}/{managingGame.totalRounds}</div>
                  <div><span className="font-semibold">Time Left:</span> {managingGame.timeLeft}</div>
                  <div><span className="font-semibold">Total Pot:</span> ₹{managingGame.totalPot}</div>
                </div>
              </div>
              
              <p className="text-gray-600 mb-4 font-medium">Choose an action for this jackpot game:</p>
              
              {managingGame.status === 'Waiting' && (
                <button
                  onClick={() => handleGameAction(managingGame.id, 'start')}
                  className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-all duration-200 hover:shadow-lg cursor-pointer"
                >
                  <Play className="w-5 h-5" />
                  Start Game
                </button>
              )}
              
              {(managingGame.status === 'Active' || managingGame.status === 'Waiting') && (
                <button
                  onClick={() => handleGameAction(managingGame.id, 'pause')}
                  className="w-full bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-all duration-200 hover:shadow-lg cursor-pointer"
                >
                  <Pause className="w-5 h-5" />
                  Pause Game
                </button>
              )}
              
              {managingGame.status === 'Paused' && (
                <button
                  onClick={() => handleGameAction(managingGame.id, 'resume')}
                  className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-all duration-200 hover:shadow-lg cursor-pointer"
                >
                  <Play className="w-5 h-5" />
                  Resume Game
                </button>
              )}
              
              {managingGame.status !== 'Completed' && (
                <button
                  onClick={() => handleGameAction(managingGame.id, 'end')}
                  className="w-full bg-red-600 hover:bg-red-700 text-white px-4 py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-all duration-200 hover:shadow-lg cursor-pointer"
                >
                  <StopCircle className="w-5 h-5" />
                  End Game
                </button>
              )}
              
              <div className="border-t pt-4">
                <button
                  onClick={() => setManagingGame(null)}
                  className="w-full bg-gray-600 hover:bg-gray-700 text-white px-4 py-3 rounded-lg font-medium transition-all duration-200 hover:shadow-lg cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JackpotGameTable;

// purple-500 cursor-pointer"
//                   placeholder="Entry Fee"
//                 />
//               </div>
              
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Total Pot (₹)</label>
//                 <input
//                   type="number"
//                   value={editData.totalPot}
//                   onChange={(e) => setEditData({...editData, totalPot: e.target.value})}
//                   className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-
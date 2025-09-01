import React, { useState } from 'react';
import { Eye, Settings, Edit3, Trash2, Filter, Play, Pause, StopCircle, Users, Clock, Trophy, DollarSign, UserCheck, AlertTriangle, BarChart3, RefreshCw, Download, Search, Calendar, Star, Zap, Target, Shield, Bomb } from 'lucide-react';

const MinesGameTable = () => {
  const [gameData, setGameData] = useState([
    {
      id: 'MIN001',
      gameId: 'MINES001',
      gameType: 'Classic Mines',
      player: {
        name: 'Player_123',
        userId: 'USR001',
        avatar: '👤',
        level: 15
      },
      betAmount: 100,
      minesCount: 3,
      gridSize: '5x5',
      revealedCells: 8,
      safeClicks: 8,
      bombsHit: 0,
      currentMultiplier: 2.45,
      potentialWin: 245,
      cashOutAmount: 0,
      gameState: 'Active',
      autoPlay: false,
      timeElapsed: '02:15:30',
      status: 'Playing',
      createdAt: '2025-09-01 14:30',
      lastAction: '2025-09-01 14:32',
      riskLevel: 'Medium',
      winStreak: 3,
      sessionProfit: 450,
      flaggedCells: 2,
      playerIP: '192.168.1.100',
      deviceType: 'Mobile',
      suspiciousActivity: false,
      chatMessages: 12,
      spectators: 5
    },
    {
      id: 'MIN002',
      gameId: 'MINES002',
      gameType: 'High Stakes Mines',
      player: {
        name: 'ProGamer99',
        userId: 'USR002',
        avatar: '🎯',
        level: 28
      },
      betAmount: 500,
      minesCount: 5,
      gridSize: '5x5',
      revealedCells: 12,
      safeClicks: 12,
      bombsHit: 0,
      currentMultiplier: 5.67,
      potentialWin: 2835,
      cashOutAmount: 1200,
      gameState: 'Cashed Out',
      autoPlay: true,
      timeElapsed: '01:45:20',
      status: 'Completed',
      createdAt: '2025-09-01 13:15',
      lastAction: '2025-09-01 15:00',
      riskLevel: 'High',
      winStreak: 7,
      sessionProfit: 1250,
      flaggedCells: 5,
      playerIP: '203.45.67.89',
      deviceType: 'Desktop',
      suspiciousActivity: false,
      chatMessages: 0,
      spectators: 12
    },
    {
      id: 'MIN003',
      gameId: 'MINES003',
      gameType: 'Quick Mines',
      player: {
        name: 'LuckyMiner',
        userId: 'USR003',
        avatar: '💎',
        level: 8
      },
      betAmount: 50,
      minesCount: 4,
      gridSize: '4x4',
      revealedCells: 5,
      safeClicks: 4,
      bombsHit: 1,
      currentMultiplier: 0,
      potentialWin: 0,
      cashOutAmount: 0,
      gameState: 'Game Over',
      autoPlay: false,
      timeElapsed: '00:45:15',
      status: 'Lost',
      createdAt: '2025-09-01 15:10',
      lastAction: '2025-09-01 15:55',
      riskLevel: 'Medium',
      winStreak: 0,
      sessionProfit: -200,
      flaggedCells: 1,
      playerIP: '172.16.0.45',
      deviceType: 'Tablet',
      suspiciousActivity: true,
      chatMessages: 8,
      spectators: 2
    },
    {
      id: 'MIN004',
      gameId: 'MINES004',
      gameType: 'Beginner Mines',
      player: {
        name: 'NewPlayer01',
        userId: 'USR004',
        avatar: '🆕',
        level: 2
      },
      betAmount: 25,
      minesCount: 2,
      gridSize: '4x4',
      revealedCells: 0,
      safeClicks: 0,
      bombsHit: 0,
      currentMultiplier: 1.00,
      potentialWin: 25,
      cashOutAmount: 0,
      gameState: 'Waiting',
      autoPlay: false,
      timeElapsed: '00:00:00',
      status: 'Waiting',
      createdAt: '2025-09-01 15:45',
      lastAction: '2025-09-01 15:45',
      riskLevel: 'Low',
      winStreak: 0,
      sessionProfit: 0,
      flaggedCells: 0,
      playerIP: '10.0.0.1',
      deviceType: 'Mobile',
      suspiciousActivity: false,
      chatMessages: 0,
      spectators: 1
    }
  ]);

  const [statusFilter, setStatusFilter] = useState('All');
  const [editingRow, setEditingRow] = useState(null);
  const [editData, setEditData] = useState({});
  const [viewingGame, setViewingGame] = useState(null);
  const [managingGame, setManagingGame] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const getRiskLevelClass = (risk) => {
    const riskClasses = {
      Low: 'bg-green-50 text-green-700 border-green-200',
      Medium: 'bg-yellow-50 text-yellow-700 border-yellow-200',
      High: 'bg-red-50 text-red-700 border-red-200'
    };
    return riskClasses[risk] || 'bg-gray-50 text-gray-700 border-gray-200';
  };

  const getStatusBadge = (status) => {
    const statusClasses = {
      Playing: 'bg-blue-50 text-blue-700 border-blue-200',
      Completed: 'bg-green-50 text-green-700 border-green-200',
      Lost: 'bg-red-50 text-red-700 border-red-200',
      Waiting: 'bg-gray-50 text-gray-700 border-gray-200',
      Paused: 'bg-orange-50 text-orange-700 border-orange-200'
    };
    return statusClasses[status] || 'bg-gray-50 text-gray-700 border-gray-200';
  };

  const getGameStateIcon = (state) => {
    switch(state) {
      case 'Active': return <Play className="w-3 h-3 text-blue-500" />;
      case 'Cashed Out': return <DollarSign className="w-3 h-3 text-green-500" />;
      case 'Game Over': return <Bomb className="w-3 h-3 text-red-500" />;
      case 'Waiting': return <Clock className="w-3 h-3 text-gray-500" />;
      default: return <Clock className="w-3 h-3 text-gray-500" />;
    }
  };

  const filteredData = gameData.filter(game => 
    (statusFilter === 'All' || game.status === statusFilter) &&
    (searchTerm === '' || 
     game.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
     game.gameId.toLowerCase().includes(searchTerm.toLowerCase()) ||
     game.gameType.toLowerCase().includes(searchTerm.toLowerCase()) ||
     game.player.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
     game.player.userId.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const handleEdit = (game) => {
    setEditingRow(game.id);
    setEditData({
      betAmount: game.betAmount,
      minesCount: game.minesCount,
      gridSize: game.gridSize,
      status: game.status,
      riskLevel: game.riskLevel
    });
  };

  const handleSave = () => {
    setGameData(prev => prev.map(game => 
      game.id === editingRow 
        ? { 
            ...game, 
            betAmount: parseInt(editData.betAmount),
            minesCount: parseInt(editData.minesCount),
            gridSize: editData.gridSize,
            status: editData.status,
            riskLevel: editData.riskLevel
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
      case 'force_cashout':
        newStatus = 'Completed';
        break;
      case 'end_game':
        newStatus = 'Lost';
        break;
    }
    
    setGameData(prev => prev.map(game => 
      game.id === gameId ? { ...game, status: newStatus } : game
    ));
    setManagingGame(null);
  };

  const handleDelete = (gameId) => {
    if (confirm('Are you sure you want to delete this game? This action cannot be undone.')) {
      setGameData(prev => prev.filter(game => game.id !== gameId));
    }
  };

  const exportData = () => {
    const csvContent = filteredData.map(game => 
      `${game.id},${game.gameType},${game.player.name},${game.betAmount},${game.currentMultiplier},${game.status}`
    ).join('\n');
    const blob = new Blob([`ID,Game Type,Player,Bet Amount,Multiplier,Status\n${csvContent}`], 
      { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'mines_games_report.csv';
    a.click();
  };

  const calculateDuration = (createdAt, status) => {
    const now = new Date();
    const created = new Date(createdAt);
    const diff = Math.floor((now - created) / 60000); // minutes
    if (status === 'Completed' || status === 'Lost') return `${diff}min`;
    return 'Ongoing';
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-2">
        <h1 className="text-3xl font-bold text-gray-900 text-start">💣 Mines Admin Dashboard</h1>
      </div>

      {/* Main Table */}
      <div className="bg-white rounded-xl shadow-lg overflow-x-auto max-w-[160vh] border border-gray-200">
        <div className="p-4 border-b border-gray-200 bg-white">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <h2 className="text-xl font-bold text-gray-900">Live Mines Games Management</h2>
            
            <div className="flex items-center justify-between flex-wrap gap-6">
              {/* Search */}
              <div className="relative min-w-0 flex-shrink-0">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search games/players..."
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
                    <option value="Lost">Lost</option>
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

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">
                  Game Info
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-900 uppercase tracking-wider text-nowrap">
                  Player Details
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">
                  Game Setup
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-900 uppercase tracking-wider text-nowrap">
                  Game Progress
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">
                  Financial
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">
                  Game State
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-900 uppercase tracking-wider text-nowrap">
                  Security & Stats
                </th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-900 uppercase tracking-wider">
                  Status
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
                    <div className="text-sm text-gray-500">{game.gameId}</div>
                    <div className="text-xs text-gray-400 flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {game.createdAt}
                    </div>
                    <div className="text-xs text-blue-500 mt-1">
                      ⏱ Duration: {calculateDuration(game.createdAt, game.status)}
                    </div>
                  </td>
                  
                  <td className="px-6 py-2 whitespace-nowrap">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="text-lg">{game.player.avatar}</div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">{game.player.name}</div>
                        <div className="text-xs text-gray-500">ID: {game.player.userId}</div>
                      </div>
                    </div>
                    <div className="text-xs text-gray-500">
                      Level {game.player.level} | {game.deviceType}
                    </div>
                    <div className="text-xs text-gray-400">
                      IP: {game.playerIP}
                    </div>
                  </td>

                  <td className="px-6 py-2 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{game.gameType}</div>
                    <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
                      <Bomb className="w-3 h-3 text-red-500" />
                      {game.minesCount} Mines
                    </div>
                    <div className="text-xs text-gray-500">Grid: {game.gridSize}</div>
                    <div className={`text-xs font-semibold px-2 py-1 rounded-full border mt-1 ${getRiskLevelClass(game.riskLevel)}`}>
                      {game.riskLevel} Risk
                    </div>
                  </td>

                  <td className="px-6 py-2 whitespace-nowrap">
                    <div className="text-sm font-bold text-gray-900">
                      {game.revealedCells}/{(game.gridSize === '5x5' ? 25 : 16) - game.minesCount} Safe
                    </div>
                    <div className="text-xs text-gray-500">
                      Clicks: {game.safeClicks} | Flags: {game.flaggedCells}
                    </div>
                    {game.bombsHit > 0 && (
                      <div className="text-xs text-red-500">💥 Hit {game.bombsHit} bomb(s)</div>
                    )}
                    <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                      <Clock className="w-3 h-3" />
                      {game.timeElapsed}
                    </div>
                  </td>

                  <td className="px-6 py-2 whitespace-nowrap">
                    <div className="text-sm font-bold text-gray-900">₹{game.betAmount}</div>
                    <div className="text-sm font-bold text-green-600">
                      {game.currentMultiplier.toFixed(2)}x
                    </div>
                    <div className="text-xs text-blue-600">
                      Win: ₹{game.potentialWin}
                    </div>
                    {game.cashOutAmount > 0 && (
                      <div className="text-xs text-green-500">
                        Cashed: ₹{game.cashOutAmount}
                      </div>
                    )}
                    <div className={`text-xs ${game.sessionProfit >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                      Session: {game.sessionProfit >= 0 ? '+' : ''}₹{game.sessionProfit}
                    </div>
                  </td>

                  <td className="px-6 py-2 whitespace-nowrap">
                    <div className="flex items-center gap-2 mb-1">
                      {getGameStateIcon(game.gameState)}
                      <span className="text-sm font-medium text-gray-900">{game.gameState}</span>
                    </div>
                    {game.autoPlay && (
                      <div className="text-xs text-purple-500 flex items-center gap-1">
                        <Zap className="w-3 h-3" />
                        Auto Play
                      </div>
                    )}
                    <div className="text-xs text-gray-500">
                      Streak: {game.winStreak}
                    </div>
                  </td>

                  <td className="px-6 py-2 whitespace-nowrap">
                    <div className="flex items-center gap-2 mb-2">
                      <Users className="w-3 h-3 text-blue-500" />
                      <span className="text-xs text-gray-500">{game.spectators} watching</span>
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <BarChart3 className="w-3 h-3 text-green-500" />
                      <span className="text-xs text-gray-500">{game.chatMessages} messages</span>
                    </div>
                    {game.suspiciousActivity && (
                      <div className="flex items-center gap-1 text-xs text-red-500">
                        <AlertTriangle className="w-3 h-3" />
                        Suspicious
                      </div>
                    )}
                  </td>

                  <td className="px-6 py-2 whitespace-nowrap">
                    <div className="flex flex-col gap-2">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${getStatusBadge(game.status)}`}>
                        {game.status}
                      </span>
                      
                      <div className="flex gap-1">
                        <button 
                          onClick={() => handleView(game)}
                          className="bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 px-3 py-1 rounded-lg text-xs font-medium flex items-center justify-center gap-1 transition-all duration-200 hover:shadow-md cursor-pointer"
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
                        className="bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 p-2 rounded-lg transition-all duration-200 hover:shadow-md cursor-pointer"
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
          <div className="bg-white rounded-2xl p-6 max-w-md w-full mx-4 shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-900">Edit Mines Game Settings</h3>
              <button 
                onClick={handleCancel}
                className="text-gray-400 hover:text-gray-600 text-3xl font-bold cursor-pointer"
              >
                ×
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Bet Amount (₹)</label>
                <input
                  type="number"
                  value={editData.betAmount}
                  onChange={(e) => setEditData({...editData, betAmount: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-pointer"
                  placeholder="Bet Amount"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Mines Count</label>
                <select
                  value={editData.minesCount}
                  onChange={(e) => setEditData({...editData, minesCount: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-pointer"
                >
                  <option value={1}>1 Mine</option>
                  <option value={2}>2 Mines</option>
                  <option value={3}>3 Mines</option>
                  <option value={4}>4 Mines</option>
                  <option value={5}>5 Mines</option>
                  <option value={6}>6 Mines</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Grid Size</label>
                <select
                  value={editData.gridSize}
                  onChange={(e) => setEditData({...editData, gridSize: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-pointer"
                >
                  <option value="4x4">4x4 Grid</option>
                  <option value="5x5">5x5 Grid</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Risk Level</label>
                <select
                  value={editData.riskLevel}
                  onChange={(e) => setEditData({...editData, riskLevel: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-pointer"
                >
                  <option value="Low">Low Risk</option>
                  <option value="Medium">Medium Risk</option>
                  <option value="High">High Risk</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  value={editData.status}
                  onChange={(e) => setEditData({...editData, status: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-pointer"
                >
                  <option value="Playing">Playing</option>
                  <option value="Completed">Completed</option>
                  <option value="Lost">Lost</option>
                  <option value="Waiting">Waiting</option>
                  <option value="Paused">Paused</option>
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

      {/* View Game Modal */}
      {viewingGame && (
        <div className="fixed inset-0 bg-black/40 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 max-w-5xl w-full mx-4 max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900">Mines Game Details - {viewingGame.id}</h3>
              <button 
                onClick={() => setViewingGame(null)}
                className="text-gray-400 hover:text-gray-600 text-3xl font-bold cursor-pointer"
              >
                ×
              </button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Player Information */}
              <div className="space-y-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    Player Information
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{viewingGame.player.avatar}</span>
                      <div>
                        <div className="font-semibold text-gray-900">{viewingGame.player.name}</div>
                        <div className="text-gray-500">ID: {viewingGame.player.userId}</div>
                      </div>
                    </div>
                    <div><span className="font-semibold">Level:</span> {viewingGame.player.level}</div>
                    <div><span className="font-semibold">Device:</span> {viewingGame.deviceType}</div>
                    <div><span className="font-semibold">IP Address:</span> {viewingGame.playerIP}</div>
                    <div><span className="font-semibold">Win Streak:</span> {viewingGame.winStreak}</div>
                    <div className={`font-semibold ${viewingGame.sessionProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      Session P&L: {viewingGame.sessionProfit >= 0 ? '+' : ''}₹{viewingGame.sessionProfit}
                    </div>
                  </div>
                </div>

                <div className="bg-red-50 p-4 rounded-lg">
                  <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <Shield className="w-4 h-4" />
                    Security Check
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className={`font-semibold ${viewingGame.suspiciousActivity ? 'text-red-600' : 'text-green-600'}`}>
                      Status: {viewingGame.suspiciousActivity ? '⚠️ Suspicious' : '✅ Clean'}
                    </div>
                    <div><span className="font-semibold">Chat Messages:</span> {viewingGame.chatMessages}</div>
                    <div><span className="font-semibold">Spectators:</span> {viewingGame.spectators}</div>
                    <div><span className="font-semibold">Last Action:</span> {viewingGame.lastAction}</div>
                  </div>
                </div>
              </div>
              
              {/* Game Setup & Progress */}
              <div className="space-y-4">
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <Target className="w-4 h-4" />
                    Game Configuration
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div><span className="font-semibold">Game Type:</span> {viewingGame.gameType}</div>
                    <div><span className="font-semibold">Grid Size:</span> {viewingGame.gridSize}</div>
                    <div className="flex items-center gap-2">
                      <Bomb className="w-4 h-4 text-red-500" />
                      <span className="font-semibold">Mines Count:</span> {viewingGame.minesCount}
                    </div>
                    <div><span className="font-semibold">Risk Level:</span> 
                      <span className={`ml-2 px-2 py-1 rounded text-xs font-bold ${getRiskLevelClass(viewingGame.riskLevel)}`}>
                        {viewingGame.riskLevel}
                      </span>
                    </div>
                    <div><span className="font-semibold">Auto Play:</span> {viewingGame.autoPlay ? '✅ Enabled' : '❌ Disabled'}</div>
                  </div>
                </div>

                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <BarChart3 className="w-4 h-4" />
                    Game Progress
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div><span className="font-semibold">Revealed Cells:</span> {viewingGame.revealedCells}</div>
                    <div><span className="font-semibold">Safe Clicks:</span> {viewingGame.safeClicks}</div>
                    <div><span className="font-semibold">Flagged Cells:</span> {viewingGame.flaggedCells}</div>
                    <div><span className="font-semibold">Bombs Hit:</span> {viewingGame.bombsHit}</div>
                    <div><span className="font-semibold">Time Elapsed:</span> {viewingGame.timeElapsed}</div>
                    <div className="flex items-center gap-2">
                      {getGameStateIcon(viewingGame.gameState)}
                      <span className="font-semibold">Game State:</span> {viewingGame.gameState}
                    </div>
                  </div>
                </div>
              </div>

              {/* Financial Information */}
              <div className="space-y-4">
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <DollarSign className="w-4 h-4" />
                    Financial Details
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div><span className="font-semibold">Bet Amount:</span> ₹{viewingGame.betAmount}</div>
                    <div><span className="font-semibold">Current Multiplier:</span> {viewingGame.currentMultiplier.toFixed(2)}x</div>
                    <div><span className="font-semibold">Potential Win:</span> ₹{viewingGame.potentialWin}</div>
                    {viewingGame.cashOutAmount > 0 && (
                      <div className="text-green-600"><span className="font-semibold">Cashed Out:</span> ₹{viewingGame.cashOutAmount}</div>
                    )}
                    <div className="pt-2 border-t">
                      <div className={`font-bold text-lg ${viewingGame.sessionProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        Session Total: {viewingGame.sessionProfit >= 0 ? '+' : ''}₹{viewingGame.sessionProfit}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Visual Grid Representation */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-bold text-gray-900 mb-3">Game Grid Visualization</h4>
                  <div className="grid grid-cols-5 gap-1 max-w-[200px] mx-auto">
                    {Array.from({length: viewingGame.gridSize === '5x5' ? 25 : 16}).map((_, i) => {
                      const isRevealed = i < viewingGame.revealedCells;
                      const isMine = i >= 20; // Simulated mine positions
                      return (
                        <div 
                          key={i} 
                          className={`w-8 h-8 border-2 rounded flex items-center justify-center text-xs font-bold
                            ${isRevealed ? 
                              (isMine ? 'bg-red-500 text-white' : 'bg-green-500 text-white') : 
                              'bg-gray-300'
                            }`}
                        >
                          {isRevealed ? (isMine ? '💣' : '💎') : '?'}
                        </div>
                      );
                    })}
                  </div>
                  <div className="text-xs text-center text-gray-500 mt-2">
                    💎 = Safe Cell | 💣 = Mine | ? = Hidden
                  </div>
                </div>
              </div>
            </div>

            {/* Statistics Bar */}
            <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-blue-50 p-3 rounded-lg text-center">
                <div className="text-lg font-bold text-blue-600">{viewingGame.revealedCells}</div>
                <div className="text-sm text-blue-600">Cells Revealed</div>
              </div>
              <div className="bg-green-50 p-3 rounded-lg text-center">
                <div className="text-lg font-bold text-green-600">{viewingGame.currentMultiplier.toFixed(2)}x</div>
                <div className="text-sm text-green-600">Current Multiplier</div>
              </div>
              <div className="bg-purple-50 p-3 rounded-lg text-center">
                <div className="text-lg font-bold text-purple-600">{viewingGame.spectators}</div>
                <div className="text-sm text-purple-600">Spectators</div>
              </div>
              <div className="bg-orange-50 p-3 rounded-lg text-center">
                <div className="text-lg font-bold text-orange-600">{viewingGame.winStreak}</div>
                <div className="text-sm text-orange-600">Win Streak</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Manage Game Modal */}
      {managingGame && (
        <div className="fixed inset-0 bg-black/40 bg-opacity-50 flex items-center justify-center z-50">
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
                <div className="text-sm text-gray-600 space-y-1">
                  <div className="flex justify-between">
                    <span className="font-semibold">Player:</span> 
                    <span>{managingGame.player.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold">Current Status:</span> 
                    <span className={`px-2 py-1 rounded text-xs ${getStatusBadge(managingGame.status)}`}>
                      {managingGame.status}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold">Game State:</span> 
                    <span>{managingGame.gameState}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold">Bet Amount:</span> 
                    <span>₹{managingGame.betAmount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold">Current Multiplier:</span> 
                    <span className="text-green-600 font-bold">{managingGame.currentMultiplier.toFixed(2)}x</span>
                  </div>
                </div>
              </div>
              
              <p className="text-gray-600 mb-4 font-medium">Choose an action for this game:</p>
              
              <button
                onClick={() => handleGameAction(managingGame.id, 'pause')}
                className="w-full bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-all duration-200 hover:shadow-lg cursor-pointer"
                disabled={managingGame.status === 'Paused' || managingGame.status === 'Completed' || managingGame.status === 'Lost'}
              >
                <Pause className="w-5 h-5" />
                Pause Game
              </button>
              
              <button
                onClick={() => handleGameAction(managingGame.id, 'resume')}
                className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-all duration-200 hover:shadow-lg cursor-pointer"
                disabled={managingGame.status !== 'Paused'}
              >
                <Play className="w-5 h-5" />
                Resume Game
              </button>
              
              <button
                onClick={() => handleGameAction(managingGame.id, 'force_cashout')}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-all duration-200 hover:shadow-lg cursor-pointer"
                disabled={managingGame.status === 'Completed' || managingGame.status === 'Lost' || managingGame.currentMultiplier <= 1}
              >
                <DollarSign className="w-5 h-5" />
                Force Cash Out (₹{managingGame.potentialWin})
              </button>
              
              <button
                onClick={() => handleGameAction(managingGame.id, 'end_game')}
                className="w-full bg-red-600 hover:bg-red-700 text-white px-4 py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-all duration-200 hover:shadow-lg cursor-pointer"
                disabled={managingGame.status === 'Completed' || managingGame.status === 'Lost'}
              >
                <StopCircle className="w-5 h-5" />
                End Game (Force Loss)
              </button>
              
              <button
                onClick={() => setManagingGame(null)}
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

export default MinesGameTable;
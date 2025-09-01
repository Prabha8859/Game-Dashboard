import React, { useState } from 'react';
import { Eye, Settings, Edit3, Trash2, Filter, Play, Pause, StopCircle, Users, Clock, Trophy, DollarSign, UserCheck, AlertTriangle, BarChart3, RefreshCw, Download, Search, Calendar, Star } from 'lucide-react';

const LudoGameTable = () => {
  const [gameData, setGameData] = useState([
    {
      id: 'TBL001',
      gameId: 'LUD001',
      gameType: 'Classic Ludo',
      players: [
        { color: 'red', name: 'Player 1', position: 'Home', moves: 12, coins: 2 },
        { color: 'blue', name: 'Player 2', position: 'Playing', moves: 18, coins: 1 },
        { color: 'green', name: 'Player 3', position: 'Safe Zone', moves: 25, coins: 3 },
        { color: 'yellow', name: 'Player 4', position: 'Home', moves: 8, coins: 0 }
      ],
      entryFee: 50,
      prizePool: 180,
      commission: 20,
      currentTurn: 'Player 2',
      timeLeft: '11:00:00',
      status: 'Active',
      createdAt: '2025-08-31 14:30',
      totalMoves: 63,
      gameRating: 4.5,
      moderationFlags: 0,
      chatMessages: 24,
      spectators: 12
    },
    {
      id: 'TBL002',
      gameId: 'LUD002',
      gameType: 'Quick Ludo',
      players: [
        { color: 'red', name: 'Player A', position: 'Home', moves: 0, coins: 0 },
        { color: 'blue', name: 'Player B', position: 'Home', moves: 0, coins: 0 },
        { color: 'green', name: 'Player C', position: 'Home', moves: 0, coins: 0 },
        { color: 'yellow', name: 'Player D', position: 'Home', moves: 0, coins: 0 }
      ],
      entryFee: 25,
      prizePool: 90,
      commission: 10,
      currentTurn: 'Player A',
      timeLeft: '05:30:00',
      status: 'Waiting',
      createdAt: '2025-08-31 15:15',
      totalMoves: 0,
      gameRating: 0,
      moderationFlags: 0,
      chatMessages: 3,
      spectators: 5
    },
    {
      id: 'TBL003',
      gameId: 'LUD003',
      gameType: 'Premium Ludo',
      players: [
        { color: 'red', name: 'Player X', position: 'Winner', moves: 45, coins: 4 },
        { color: 'blue', name: 'Player Y', position: 'Second', moves: 42, coins: 3 },
        { color: 'green', name: 'Player Z', position: 'Third', moves: 38, coins: 2 },
        { color: 'yellow', name: 'Player W', position: 'Fourth', moves: 35, coins: 1 }
      ],
      entryFee: 100,
      prizePool: 360,
      commission: 40,
      currentTurn: 'Game Over',
      timeLeft: '00:00:00',
      status: 'Completed',
      createdAt: '2025-08-31 13:00',
      totalMoves: 160,
      gameRating: 4.8,
      moderationFlags: 1,
      chatMessages: 89,
      spectators: 0
    }
  ]);

  const [statusFilter, setStatusFilter] = useState('All');
  const [editingRow, setEditingRow] = useState(null);
  const [editData, setEditData] = useState({});
  const [viewingGame, setViewingGame] = useState(null);
  const [managingGame, setManagingGame] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const getPlayerColorClass = (color) => {
    const colorMap = {
      red: 'bg-red-500 hover:bg-red-600',
      blue: 'bg-blue-500 hover:bg-blue-600',
      green: 'bg-green-500 hover:bg-green-600',
      yellow: 'bg-yellow-500 hover:bg-yellow-600'
    };
    return colorMap[color] || 'bg-gray-500 hover:bg-gray-600';
  };

  const getStatusBadge = (status) => {
    const statusClasses = {
      Active: 'bg-green-50 text-green-700 border-green-200',
      Waiting: 'bg-yellow-50 text-yellow-700 border-yellow-200',
      Completed: 'bg-gray-50 text-gray-700 border-gray-200',
      Paused: 'bg-orange-50 text-orange-700 border-orange-200'
    };
    return statusClasses[status] || 'bg-gray-50 text-gray-700 border-gray-200';
  };

  const filteredData = gameData.filter(game => 
    (statusFilter === 'All' || game.status === statusFilter) &&
    (searchTerm === '' || 
     game.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
     game.gameId.toLowerCase().includes(searchTerm.toLowerCase()) ||
     game.gameType.toLowerCase().includes(searchTerm.toLowerCase()) ||
     game.players.some(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()))
    )
  );

  const handleEdit = (game) => {
    setEditingRow(game.id);
    setEditData({
      entryFee: game.entryFee,
      prizePool: game.prizePool,
      commission: game.commission,
      timeLeft: game.timeLeft,
      status: game.status
    });
  };

  const handleSave = () => {
    setGameData(prev => prev.map(game => 
      game.id === editingRow 
        ? { 
            ...game, 
            entryFee: parseInt(editData.entryFee),
            prizePool: parseInt(editData.prizePool),
            commission: parseInt(editData.commission),
            timeLeft: editData.timeLeft,
            status: editData.status
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
      `${game.id},${game.gameType},${game.entryFee},${game.prizePool},${game.status}`
    ).join('\n');
    const blob = new Blob([`ID,Game Type,Entry Fee,Prize Pool,Status\n${csvContent}`], 
      { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'ludo_games_report.csv';
    a.click();
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-2">
        <h1 className="text-3xl font-bold text-gray-900 text-start">🎲 Ludo Admin Dashboard</h1>
      </div>

      {/* Main Table */}
      <div className="bg-white rounded-xl shadow-lg overflow-x-auto max-w-[900px] border border-gray-200">
        <div className="p-6 border-b border-gray-200 bg-white">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <h2 className="text-xl font-bold text-gray-900">Live Game Tables Management</h2>
            
            <div className="flex items-center justify-between flex-wrap gap-6">
              {/* Search */}
              <div className="relative min-w-0 flex-shrink-0">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search tables..."
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
                    <option value="Active">Active</option>
                    <option value="Waiting">Waiting</option>
                    <option value="Completed">Completed</option>
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
          <table className="">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Table Info
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Game Details
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Players & Progress
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Financial
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Game Stats
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                  Current State
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
                    <div className="text-xs text-gray-400">
                      <Calendar className="inline w-3 h-3 mr-1" />
                      {game.createdAt}
                    </div>
                  </td>
                  
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{game.gameType}</div>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <Star className="w-3 h-3 text-yellow-500" />
                      {game.gameRating}/5
                      {game.moderationFlags > 0 && (
                        <span className="flex items-center gap-1 text-red-500">
                          <AlertTriangle className="w-3 h-3" />
                          {game.moderationFlags}
                        </span>
                      )}
                    </div>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex space-x-1 mb-2">
                      {game.players.map((player, index) => (
                        <div 
                          key={index}
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold transition-all duration-300 transform hover:scale-110 cursor-pointer shadow-md ${getPlayerColorClass(player.color)}`}
                          title={`${player.name} - ${player.position} (${player.moves} moves, ${player.coins} coins)`}
                        >
                          {player.color.charAt(0).toUpperCase()}
                        </div>
                      ))}
                    </div>
                    <div className="text-xs text-gray-500">
                      Spectators: {game.spectators} | Chat: {game.chatMessages}
                    </div>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-bold text-gray-900">₹{game.entryFee}</div>
                      <div className="text-sm font-bold text-green-600">₹{game.prizePool}</div>
                      <div className="text-xs text-gray-500">Com: ₹{game.commission}</div>
                    </div>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      Total Moves: {game.totalMoves}
                    </div>
                    <div className="text-xs text-gray-500">
                      Avg: {Math.round(game.totalMoves / 4)} per player
                    </div>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{game.currentTurn}</div>
                    <div className="text-sm text-gray-600">{game.timeLeft}</div>
                    <div className="text-xs text-orange-500">Turn: 25s left</div>
                  </td>

                  <td className="px-6 py-4 whitespace-nowrap">
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

                  <td className="px-6 py-4 whitespace-nowrap">
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
                  <td className="px-6 py-4 whitespace-nowrap">
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

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Game Modal */}
      {editingRow && (
        <div className="fixed inset-0 bg-white/50 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full mx-4 shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-900">Edit Game Settings</h3>
              <button 
                onClick={handleCancel}
                className="text-gray-400 hover:text-gray-600 text-3xl font-bold cursor-pointer"
              >
                ×
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Entry Fee (₹)</label>
                <input
                  type="number"
                  value={editData.entryFee}
                  onChange={(e) => setEditData({...editData, entryFee: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-pointer"
                  placeholder="Entry Fee"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Prize Pool (₹)</label>
                <input
                  type="number"
                  value={editData.prizePool}
                  onChange={(e) => setEditData({...editData, prizePool: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-pointer"
                  placeholder="Prize Pool"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Commission (₹)</label>
                <input
                  type="number"
                  value={editData.commission}
                  onChange={(e) => setEditData({...editData, commission: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-pointer"
                  placeholder="Commission"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Time Left</label>
                <input
                  type="text"
                  value={editData.timeLeft}
                  onChange={(e) => setEditData({...editData, timeLeft: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-pointer"
                  placeholder="HH:MM:SS"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  value={editData.status}
                  onChange={(e) => setEditData({...editData, status: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 cursor-pointer"
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
        <div className="fixed inset-0 bg-white/40 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 max-w-4xl w-full mx-4 max-h-130 overflow-y-auto shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900">Game Details - {viewingGame.id}</h3>
              <button 
                onClick={() => setViewingGame(null)}
                className="text-gray-400 hover:text-gray-600 text-3xl font-bold cursor-pointer"
              >
                ×
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-bold text-gray-900 mb-3">Game Information</h4>
                  <div className="space-y-2 text-sm">
                    <div><span className="font-semibold">Game Type:</span> {viewingGame.gameType}</div>
                    <div><span className="font-semibold">Entry Fee:</span> ₹{viewingGame.entryFee}</div>
                    <div><span className="font-semibold">Prize Pool:</span> ₹{viewingGame.prizePool}</div>
                    <div><span className="font-semibold">Commission:</span> ₹{viewingGame.commission}</div>
                    <div><span className="font-semibold">Total Moves:</span> {viewingGame.totalMoves}</div>
                    <div><span className="font-semibold">Rating:</span> {viewingGame.gameRating}/5 ⭐</div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-bold text-gray-900 mb-3">Players & Positions</h4>
                  <div className="space-y-3">
                    {viewingGame.players.map((player, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-white rounded-lg border">
                        <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-full ${getPlayerColorClass(player.color)} flex items-center justify-center text-white font-bold cursor-pointer`}>
                            {player.color.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <div className="font-medium text-gray-900">{player.name}</div>
                            <div className="text-xs text-gray-500">{player.position}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-bold text-gray-900">{player.moves} moves</div>
                          <div className="text-xs text-gray-500">{player.coins} coins home</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-blue-50 p-3 rounded-lg text-center">
                <div className="text-lg font-bold text-blue-600">{viewingGame.spectators}</div>
                <div className="text-sm text-blue-600">Spectators</div>
              </div>
              <div className="bg-green-50 p-3 rounded-lg text-center">
                <div className="text-lg font-bold text-green-600">{viewingGame.chatMessages}</div>
                <div className="text-sm text-green-600">Chat Messages</div>
              </div>
              <div className="bg-purple-50 p-3 rounded-lg text-center">
                <div className="text-lg font-bold text-purple-600">{viewingGame.moderationFlags}</div>
                <div className="text-sm text-purple-600">Moderation Flags</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Manage Game Modal */}
      {managingGame && (
        <div className="fixed inset-0 bg-white/40 bg-opacity-50 flex items-center justify-center z-50">
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
                  <div><span className="font-semibold">Current Turn:</span> {managingGame.currentTurn}</div>
                  <div><span className="font-semibold">Time Left:</span> {managingGame.timeLeft}</div>
                </div>
              </div>
              
              <p className="text-gray-600 mb-4 font-medium">Choose an action for this game:</p>
              
              <button
                onClick={() => handleGameAction(managingGame.id, 'pause')}
                className="w-full bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-all duration-200 hover:shadow-lg cursor-pointer"
              >
                <Pause className="w-5 h-5" />
                Pause Game
              </button>
              
              <button
                onClick={() => handleGameAction(managingGame.id, 'resume')}
                className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-all duration-200 hover:shadow-lg cursor-pointer"
              >
                <Play className="w-5 h-5" />
                Resume Game
              </button>
              
              <button
                onClick={() => handleGameAction(managingGame.id, 'end')}
                className="w-full bg-red-600 hover:bg-red-700 text-white px-4 py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-all duration-200 hover:shadow-lg cursor-pointer"
              >
                <StopCircle className="w-5 h-5" />
                End Game
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

export default LudoGameTable;
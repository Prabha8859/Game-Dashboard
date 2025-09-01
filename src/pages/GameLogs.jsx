import React, { useState } from 'react';
import { SquarePen, Trash2, Plus, Search, ChevronLeft, ChevronRight, BadgeAlert, Gamepad2, Coins } from 'lucide-react';

const Modal = ({ show, onClose, title, children }) => {
  if (!show) return null;

  return (
    <div 
      className="fixed inset-0 flex items-center justify-center bg-gray/90 bg-opacity-70 z-50 p-4 transition-all duration-300"
    >
      <div 
        className="bg-white rounded-3xl p-8 w-full max-w-lg shadow-2xl transform scale-100 transition-transform duration-300"
        onClick={(e) => e.stopPropagation()} 
      >
        <div className="flex justify-between items-center pb-4 border-b border-gray-200 mb-6">
          <h3 className="text-2xl font-bold text-gray-800">{title}</h3>
          <button 
            onClick={onClose} 
            className="text-gray-400 hover:text-gray-600 transition-colors text-3xl"
          >
            &times;
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

// Main component for displaying and managing game logs
const GameLogs = () => {
  const [games, setGames] = useState([
    { id: 1, name: "Ludo Khelo", minInvest: "₹100.00", maxInvest: "₹10,000.00", status: "Enabled" },
    { id: 2, name: "Teen Patti", minInvest: "₹50.00", maxInvest: "₹5,000.00", status: "Enabled" },
    { id: 3, name: "Jackpot", minInvest: "₹200.00", maxInvest: "₹20,000.00", status: "Enabled" },
    { id: 4, name: "Poker", minInvest: "₹500.00", maxInvest: "₹50,000.00", status: "Enabled" },
    { id: 5, name: "Blackjack", minInvest: "₹300.00", maxInvest: "₹30,000.00", status: "Enabled" },
    { id: 6, name: "Dragon Tiger", minInvest: "₹150.00", maxInvest: "₹15,000.00", status: "Enabled" },
    { id: 7, name: "Baccarat", minInvest: "₹250.00", maxInvest: "₹25,000.00", status: "Enabled" },
    { id: 8, name: "Sic Bo", minInvest: "₹400.00", maxInvest: "₹40,000.00", status: "Enabled" },
    { id: 9, name: "Slot Machines", minInvest: "₹50.00", maxInvest: "₹5,000.00", status: "Enabled" },
    { id: 10, name: "Keno", minInvest: "₹75.00", maxInvest: "₹7,500.00", status: "Enabled" },
  ]);

  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletingGameId, setDeletingGameId] = useState(null);
  const [editingGame, setEditingGame] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedGames, setSelectedGames] = useState([]); 

  const [formData, setFormData] = useState({
    name: "",
    minInvest: "",
    maxInvest: "",
    status: "Enabled"
  });

  const filteredGames = games.filter(game =>
    game.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    game.id.toString().includes(searchQuery)
  );

  const totalPages = Math.ceil(filteredGames.length / entriesPerPage);
  const startIndex = (currentPage - 1) * entriesPerPage;
  const currentGames = filteredGames.slice(startIndex, startIndex + entriesPerPage);

  const handleEdit = (game) => {
    setEditingGame(game);
    setFormData({
      name: game.name,
      minInvest: game.minInvest.replace('₹', '').replace(/,/g, ''),
      maxInvest: game.maxInvest.replace('₹', '').replace(/,/g, ''),
      status: game.status
    });
    setShowEditModal(true);
  };

  const handleDelete = (gameId) => {
    setDeletingGameId(gameId);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    setGames(games.filter(game => game.id !== deletingGameId));
    setShowDeleteModal(false);
    setDeletingGameId(null);
  };

  const handleAddGame = () => {
    setFormData({ name: "", minInvest: "", maxInvest: "", status: "Enabled" });
    setShowAddModal(true);
  };

  const saveGame = () => {
    // Add validation to ensure inputs are not empty
    if (!formData.name || !formData.minInvest || !formData.maxInvest) {
      // You could display an error message here
      return;
    }

    const newGame = {
      id: editingGame ? editingGame.id : Math.max(...games.map(g => g.id), 0) + 1,
      name: formData.name,
      minInvest: `₹${parseFloat(formData.minInvest).toFixed(2)}`,
      maxInvest: `₹${parseFloat(formData.maxInvest).toLocaleString('en-IN')}.00`,
      status: formData.status
    };

    if (editingGame) {
      setGames(games.map(game => game.id === editingGame.id ? newGame : game));
      setShowEditModal(false);
      setEditingGame(null);
    } else {
      setGames([...games, newGame]);
      setShowAddModal(false);
    }
    
    setFormData({ name: "", minInvest: "", maxInvest: "", status: "Enabled" });
  };
  
  // सभी गेम्स को सेलेक्ट/डीसेलेक्ट करने के लिए फंक्शन
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      const allGameIds = filteredGames.map(game => game.id);
      setSelectedGames(allGameIds);
    } else {
      setSelectedGames([]);
    }
  };

  // एक व्यक्तिगत गेम को सेलेक्ट/डीसेलेक्ट करने के लिए फंक्शन
  const handleSelectGame = (gameId) => {
    setSelectedGames(prevSelected =>
      prevSelected.includes(gameId)
        ? prevSelected.filter(id => id !== gameId)
        : [...prevSelected, gameId]
    );
  };

  return (
    <div className="bg-gray-50 min-h-screen p-3 sm:p-6 font-sans antialiased text-gray-800">
      
      {/* Page Header */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <h1 className="text-2xl font-bold text-gray-800">All Games</h1>
          <div className="flex items-center gap-2 text-sm text-gray-500 mt-1 sm:mt-0">
            <span>Dashboard</span>
            <ChevronRight className="w-4 h-4" />
            <span>Manage Games</span>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-700 font-medium">All Games</span>
          </div>
        </div>
      </div>

      {/* Main Content Card */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        
        {/* Table Header/Controls */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            
            {/* Entries per page dropdown */}
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span>Showing</span>
              <select 
                value={entriesPerPage}
                onChange={(e) => setEntriesPerPage(Number(e.target.value))}
                className="border border-gray-300 rounded-lg px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
              </select>
              <span>entries</span>
            </div>
            
            {/* Search and Add Game buttons */}
            <div className="flex items-center gap-4 flex-wrap">
              <div className="relative w-full sm:w-auto">
                <input
                  type="text"
                  placeholder="Search here..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 pr-10 text-sm w-full"
                />
                <Search className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2" />
              </div>
              
              <button 
                onClick={handleAddGame}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium transition-colors w-full sm:w-auto justify-center"
              >
                <Plus className="w-4 h-4" />
                Add Games
              </button>
            </div>
          </div>
        </div>

        {/* Game Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-100 border-b border-gray-200">
              <tr>
                <th className="text-left p-3 w-12">
                  {/* सभी को सेलेक्ट/डीसेलेक्ट करने वाला चेकबॉक्स */}
                  <input
                    type="checkbox"
                    checked={filteredGames.length > 0 && selectedGames.length === filteredGames.length}
                    onChange={handleSelectAll}
                    className="w-4 h-4 rounded-sm border-gray-300"
                  />
                </th>
                <th className="text-left p-3 text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  GAME ID
                </th>
                <th className="text-left p-3 text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  GAME NAME
                </th>
                <th className="text-left p-3 text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  MINIMUM INVEST
                </th>
                <th className="text-left p-3 text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  MAXIMUM INVEST
                </th>
                <th className="text-left p-3 text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Status
                </th>
                <th className="text-left p-3 text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {currentGames.map((game, index) => (
                <tr 
                  key={game.id} 
                  className={`${index % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-gray-100 transition-colors`}
                >
                  <td className="p-3">
                    <input
                      type="checkbox"
                      checked={selectedGames.includes(game.id)}
                      onChange={() => handleSelectGame(game.id)}
                      className="w-4 h-4 rounded-sm border-gray-300"
                    />
                  </td>
                  <td className="p-3 text-sm text-gray-600 font-mono">#{game.id.toString().padStart(2, '0')}</td>
                  <td className="p-3 text-sm text-gray-800 font-medium">{game.name}</td>
                  <td className="p-3 text-sm text-gray-600">{game.minInvest}</td>
                  <td className="p-3 text-sm text-gray-600">{game.maxInvest}</td>
                  <td className="p-3">
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium">
                      {game.status}
                    </span>
                  </td>
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleEdit(game)}
                        className="text-blue-500 hover:text-blue-700 p-2 rounded-full hover:bg-blue-100 transition-colors"
                        title="Edit"
                      >
                        <SquarePen className="w-4 h-4" />
                      </button>
                      
                      <button
                        onClick={() => handleDelete(game.id)}
                        className="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-100 transition-colors"
                        title="Delete"
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

        {/* Pagination Controls */}
        <div className="flex flex-col sm:flex-row justify-between items-center p-4 border-t border-gray-200 gap-4">
          <div className="text-sm text-gray-600">
            Showing {filteredGames.length} entries
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="p-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i + 1}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-4 py-2 text-sm rounded-lg transition-colors ${
                  currentPage === i + 1
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {i + 1}
              </button>
            ))}
            
            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="p-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Edit Game Modal */}
      <Modal
        show={showEditModal}
        onClose={() => {
          setShowEditModal(false);
          setEditingGame(null);
        }}
        title="Edit Game"
      >
        <div className="space-y-5">
          {/* Game Name Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Game Name
            </label>
            <div className="relative">
              <Gamepad2 className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full pl-10 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                required
              />
            </div>
          </div>
          
          {/* Minimum Investment Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Minimum Investment
            </label>
            <div className="relative">
              <Coins className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="number"
                value={formData.minInvest}
                onChange={(e) => setFormData({ ...formData, minInvest: e.target.value })}
                className="w-full pl-10 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                required
              />
            </div>
          </div>
          
          {/* Maximum Investment Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Maximum Investment
            </label>
            <div className="relative">
              <Coins className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="number"
                value={formData.maxInvest}
                onChange={(e) => setFormData({ ...formData, maxInvest: e.target.value })}
                className="w-full pl-10 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                required
              />
            </div>
          </div>
          
          {/* Status Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
            >
              <option value="Enabled">Enabled</option>
              <option value="Disabled">Disabled</option>
            </select>
          </div>
        </div>
        
        {/* Buttons */}
        <div className="flex justify-end gap-3 mt-8">
          <button
            type="button"
            onClick={() => {
              setShowEditModal(false);
              setEditingGame(null);
            }}
            className="px-6 py-2 border border-gray-300 rounded-full text-gray-700 hover:bg-gray-100 transition-colors font-medium shadow-sm"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={saveGame}
            className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors font-medium shadow-md"
          >
            Update Game
          </button>
        </div>
      </Modal>

      {/* Add New Game Modal */}
      <Modal
        show={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Add New Game"
      >
        {/* यहां भी फॉर्म का डिज़ाइन बेहतर किया गया है */}
        <div className="space-y-5">
          {/* Game Name Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Game Name
            </label>
            <div className="relative">
              <Gamepad2 className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full pl-10 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                required
              />
            </div>
          </div>
          
          {/* Minimum Investment Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Minimum Investment
            </label>
            <div className="relative">
              <Coins className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="number"
                value={formData.minInvest}
                onChange={(e) => setFormData({ ...formData, minInvest: e.target.value })}
                className="w-full pl-10 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                required
              />
            </div>
          </div>
          
          {/* Maximum Investment Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Maximum Investment
            </label>
            <div className="relative">
              <Coins className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="number"
                value={formData.maxInvest}
                onChange={(e) => setFormData({ ...formData, maxInvest: e.target.value })}
                className="w-full pl-10 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                required
              />
            </div>
          </div>
          
          {/* Status Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
            >
              <option value="Enabled">Enabled</option>
              <option value="Disabled">Disabled</option>
            </select>
          </div>
        </div>
        
        {/* Buttons */}
        <div className="flex justify-end gap-3 mt-8">
          <button
            type="button"
            onClick={() => setShowAddModal(false)}
            className="px-6 py-2 border border-gray-300 rounded-full text-gray-700 hover:bg-gray-100 transition-colors font-medium shadow-sm"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={saveGame}
            className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors font-medium shadow-md"
          >
            Add Game
          </button>
        </div>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        show={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Confirm Deletion"
      >
        <div className="text-center">
          <BadgeAlert className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <p className="text-gray-700 mb-4">Are you sure you want to delete this game?</p>
          <div className="flex justify-center gap-3 mt-6">
            <button
              type="button"
              onClick={() => setShowDeleteModal(false)}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={confirmDelete}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors font-medium"
            >
              Delete
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default GameLogs;

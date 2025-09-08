import React, { useState, useMemo } from "react";

// Sample data for matches
const initialMatches = [
  { id: 1, roomId: "ROOM001", players: ["Alice", "Bob", "Charlie", "David"], winner: "Alice", stake: 100, duration: "15:30", status: "Completed", date: "2025-09-01", moves: 45 },
  { id: 2, roomId: "ROOM002", players: ["Eve", "Frank"], winner: null, stake: 200, duration: "08:45", status: "Live", date: "2025-09-08", moves: 23 },
  { id: 3, roomId: "ROOM003", players: ["Grace", "Henry", "Ivy"], winner: "Grace", stake: 150, duration: "12:20", status: "Completed", date: "2025-09-07", moves: 38 },
  { id: 4, roomId: "ROOM004", players: ["Jack", "Kate"], winner: null, stake: 300, duration: "02:15", status: "Starting", date: "2025-09-08", moves: 5 },
  { id: 5, roomId: "ROOM005", players: ["Liam", "Mia", "Noah", "Olivia"], winner: "Noah", stake: 500, duration: "18:45", status: "Completed", date: "2025-09-06", moves: 62 },
  { id: 6, roomId: "ROOM006", players: ["Paul", "Quinn"], winner: null, stake: 100, duration: "05:30", status: "Live", date: "2025-09-08", moves: 18 },
  { id: 7, roomId: "ROOM007", players: ["Rita", "Sam", "Tom"], winner: "Sam", stake: 250, duration: "20:15", status: "Completed", date: "2025-09-05", moves: 51 },
  { id: 8, roomId: "ROOM008", players: ["Uma", "Victor"], winner: null, stake: 400, duration: "01:00", status: "Starting", date: "2025-09-08", moves: 2 },
];

// Sample data for players
const initialPlayers = [
  { id: 1, userId: "U001", name: "Alice Johnson", email: "alice@example.com", gamesPlayed: 45, wins: 28, losses: 17, balance: 2500, status: "Active" },
  { id: 2, userId: "U002", name: "Bob Smith", email: "bob@example.com", gamesPlayed: 32, wins: 15, losses: 17, balance: 1200, status: "Active" },
  { id: 3, userId: "U003", name: "Charlie Brown", email: "charlie@example.com", gamesPlayed: 28, wins: 12, losses: 16, balance: 800, status: "Banned" },
  { id: 4, userId: "U004", name: "David Wilson", email: "david@example.com", gamesPlayed: 55, wins: 35, losses: 20, balance: 3200, status: "Active" },
  { id: 5, userId: "U005", name: "Eve Davis", email: "eve@example.com", gamesPlayed: 38, wins: 22, losses: 16, balance: 1800, status: "Active" },
  { id: 6, userId: "U006", name: "Frank Miller", email: "frank@example.com", gamesPlayed: 41, wins: 18, losses: 23, balance: 950, status: "Active" },
  { id: 7, userId: "U007", name: "Grace Taylor", email: "grace@example.com", gamesPlayed: 29, wins: 19, losses: 10, balance: 2100, status: "Active" },
  { id: 8, userId: "U008", name: "Henry Anderson", email: "henry@example.com", gamesPlayed: 22, wins: 8, losses: 14, balance: 600, status: "Banned" },
];

// Sample transactions for transaction history
const playerTransactions = {
  "U001": [
    { id: 1, type: "Win", amount: 200, date: "2025-09-07", matchId: "ROOM003" },
    { id: 2, type: "Deposit", amount: 1000, date: "2025-09-05", matchId: null },
    { id: 3, type: "Loss", amount: -100, date: "2025-09-04", matchId: "ROOM012" },
  ],
  "U002": [
    { id: 1, type: "Loss", amount: -150, date: "2025-09-06", matchId: "ROOM008" },
    { id: 2, type: "Deposit", amount: 500, date: "2025-09-03", matchId: null },
  ]
};

const ITEMS_PER_PAGE = 7;

const LudoAdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("transactions");
  const [matches, setMatches] = useState(initialMatches);
  const [players, setPlayers] = useState(initialPlayers);
  
  // Modals
  const [matchDetailsModal, setMatchDetailsModal] = useState(null);
  const [playerHistoryModal, setPlayerHistoryModal] = useState(null);
  const [adjustStatsModal, setAdjustStatsModal] = useState(null);

  // Transactions state (existing)
  const initialTransactions = [
    { id: 1, user: "Alice", amount: 500, mode: "Deposit", status: "Success", date: "2025-09-01" },
    { id: 2, user: "Bob", amount: 300, mode: "Withdrawal", status: "Pending", date: "2025-09-02" },
    { id: 3, user: "Charlie", amount: 200, mode: "Deposit", status: "Failed", date: "2025-09-03" },
    { id: 4, user: "David", amount: 800, mode: "Withdrawal", status: "Success", date: "2025-09-04" },
    { id: 5, user: "Eve", amount: 1000, mode: "Deposit", status: "Pending", date: "2025-09-05" },
    { id: 6, user: "Alice", amount: 500, mode: "Deposit", status: "Success", date: "2025-09-01" },
    { id: 7, user: "Bob", amount: 300, mode: "Withdrawal", status: "Pending", date: "2025-09-02" },
    { id: 8, user: "Charlie", amount: 200, mode: "Deposit", status: "Failed", date: "2025-09-03" },
    { id: 9, user: "David", amount: 800, mode: "Withdrawal", status: "Success", date: "2025-09-04" },
    { id: 10, user: "Eve", amount: 1000, mode: "Deposit", status: "Pending", date: "2025-09-05" },
  ];

  const [transactions] = useState(initialTransactions);
  const [statusFilter, setStatusFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Match filters
  const [matchStatusFilter, setMatchStatusFilter] = useState("All");
  const [matchSearchTerm, setMatchSearchTerm] = useState("");
  const [matchCurrentPage, setMatchCurrentPage] = useState(1);

  // Player filters
  const [playerStatusFilter, setPlayerStatusFilter] = useState("All");
  const [playerSearchTerm, setPlayerSearchTerm] = useState("");
  const [playerCurrentPage, setPlayerCurrentPage] = useState(1);

  // Transaction filtering (existing logic)
  const filteredTransactions = useMemo(() => {
    return transactions.filter((tx) => {
      const matchesSearch = tx.user.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === "All" || tx.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [transactions, searchTerm, statusFilter]);

  const totalPages = Math.ceil(filteredTransactions.length / ITEMS_PER_PAGE);
  const paginatedTransactions = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredTransactions.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredTransactions, currentPage]);

  // Match filtering
  const filteredMatches = useMemo(() => {
    return matches.filter((match) => {
      const matchesSearch = match.roomId.toLowerCase().includes(matchSearchTerm.toLowerCase()) ||
                           (match.winner && match.winner.toLowerCase().includes(matchSearchTerm.toLowerCase()));
      const matchesStatus = matchStatusFilter === "All" || match.status === matchStatusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [matches, matchSearchTerm, matchStatusFilter]);

  const matchTotalPages = Math.ceil(filteredMatches.length / ITEMS_PER_PAGE);
  const paginatedMatches = useMemo(() => {
    const start = (matchCurrentPage - 1) * ITEMS_PER_PAGE;
    return filteredMatches.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredMatches, matchCurrentPage]);

  // Player filtering
  const filteredPlayers = useMemo(() => {
    return players.filter((player) => {
      const matchesSearch = player.name.toLowerCase().includes(playerSearchTerm.toLowerCase()) ||
                           player.userId.toLowerCase().includes(playerSearchTerm.toLowerCase());
      const matchesStatus = playerStatusFilter === "All" || player.status === playerStatusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [players, playerSearchTerm, playerStatusFilter]);

  const playerTotalPages = Math.ceil(filteredPlayers.length / ITEMS_PER_PAGE);
  const paginatedPlayers = useMemo(() => {
    const start = (playerCurrentPage - 1) * ITEMS_PER_PAGE;
    return filteredPlayers.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredPlayers, playerCurrentPage]);

  const goToPage = (page, type) => {
    if (type === "transactions") {
      if (page < 1 || page > totalPages) return;
      setCurrentPage(page);
    } else if (type === "matches") {
      if (page < 1 || page > matchTotalPages) return;
      setMatchCurrentPage(page);
    } else if (type === "players") {
      if (page < 1 || page > playerTotalPages) return;
      setPlayerCurrentPage(page);
    }
  };

  // Match actions
  const forceEndMatch = (matchId) => {
    setMatches(prev => prev.map(match => 
      match.id === matchId 
        ? { ...match, status: "Completed", winner: match.players[0] }
        : match
    ));
    alert(`Match ${matchId} has been force ended.`);
  };

  // Player actions
  const togglePlayerStatus = (playerId) => {
    setPlayers(prev => prev.map(player => 
      player.id === playerId 
        ? { ...player, status: player.status === "Active" ? "Banned" : "Active" }
        : player
    ));
  };

  const adjustPlayerStats = (playerId, newStats) => {
    setPlayers(prev => prev.map(player => 
      player.id === playerId 
        ? { ...player, ...newStats, gamesPlayed: newStats.wins + newStats.losses }
        : player
    ));
    setAdjustStatsModal(null);
    alert("Player stats updated successfully!");
  };

  // Pagination component
  const Pagination = ({ currentPage, totalPages, onPageChange, type }) => (
    <div className="flex justify-center mt-6 space-x-2">
      <button
        onClick={() => onPageChange(currentPage - 1, type)}
        disabled={currentPage === 1}
        className="px-3 py-1 rounded border bg-white dark:bg-gray-800 disabled:text-gray-400"
      >
        Prev
      </button>
      {[...Array(totalPages)].map((_, idx) => {
        const pageNum = idx + 1;
        return (
          <button
            key={pageNum}
            onClick={() => onPageChange(pageNum, type)}
            className={`px-3 py-1 rounded border ${
              currentPage === pageNum
                ? "bg-blue-600 text-white"
                : "bg-white dark:bg-gray-800 hover:bg-blue-100 dark:hover:bg-gray-700"
            }`}
          >
            {pageNum}
          </button>
        );
      })}
      <button
        onClick={() => onPageChange(currentPage + 1, type)}
        disabled={currentPage === totalPages}
        className="px-3 py-1 rounded border bg-white dark:bg-gray-800 disabled:text-gray-400"
      >
        Next
      </button>
    </div>
  );

  return (
    <div className="p-6 min-h-screen bg-gray-50 dark:bg-gray-900 transition-all">
      {/* Navigation Tabs */}
      <div className="flex flex-wrap gap-2 mb-6 border-b border-gray-200 dark:border-gray-700">
        <button
          onClick={() => setActiveTab("transactions")}
          className={`px-4 py-2 rounded-t-lg font-semibold transition ${
            activeTab === "transactions"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
          }`}
        >
          💳 Transactions
        </button>
        <button
          onClick={() => setActiveTab("matches")}
          className={`px-4 py-2 rounded-t-lg font-semibold transition ${
            activeTab === "matches"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
          }`}
        >
          🎮 Ludo Matches
        </button>
        <button
          onClick={() => setActiveTab("players")}
          className={`px-4 py-2 rounded-t-lg font-semibold transition ${
            activeTab === "players"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
          }`}
        >
          👥 Ludo Players
        </button>
      </div>

      {/* Transactions Tab */}
      {activeTab === "transactions" && (
        <>
          <div className="flex flex-col md:flex-row justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-blue-700 dark:text-blue-400">
              💳 Transactions
            </h1>
            <div className="flex gap-3 mt-4 md:mt-0">
              <input
                type="text"
                placeholder="Search by user..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className="p-2 border rounded-lg bg-white dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <select
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(e.target.value);
                  setCurrentPage(1);
                }}
                className="p-2 border rounded-lg bg-white dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option value="All">All Status</option>
                <option value="Success">Success</option>
                <option value="Pending">Pending</option>
                <option value="Failed">Failed</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto bg-transparent">
            <table className="hidden md:table w-full text-left border-separate border-spacing-y-3 overflow-hidden">
              <thead
                style={{
                  backgroundImage: "linear-gradient(-225deg, #A445B2 0%, #D41872 52%, #FF0066 100%)",
                }}
                className="text-white"
              >
                <tr>
                  <th className="px-4 py-3 rounded-l-lg">ID</th>
                  <th className="px-4 py-3">User</th>
                  <th className="px-4 py-3">Amount</th>
                  <th className="px-4 py-3">Mode</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3 rounded-r-lg">Date</th>
                </tr>
              </thead>
              <tbody>
                {paginatedTransactions.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center py-4 text-gray-500 dark:text-gray-400">
                      No transactions found.
                    </td>
                  </tr>
                ) : (
                  paginatedTransactions.map((tx, index) => (
                    <tr
                      key={tx.id}
                      className={`shadow-md rounded-lg transition ${
                        index % 2 === 0
                          ? "bg-purple-100 dark:bg-purple-900"
                          : "bg-pink-100 dark:bg-pink-900"
                      } hover:scale-[1.01]`}
                    >
                      <td className="px-4 py-3 font-medium">#{tx.id}</td>
                      <td className="px-4 py-3">{tx.user}</td>
                      <td className="px-4 py-3 font-semibold">₹{tx.amount}</td>
                      <td className="px-4 py-3">{tx.mode}</td>
                      <td className="px-4 py-3">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            tx.status === "Success"
                              ? "bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-300"
                              : tx.status === "Pending"
                              ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-800 dark:text-yellow-300"
                              : "bg-red-100 text-red-700 dark:bg-red-800 dark:text-red-300"
                          }`}
                        >
                          {tx.status}
                        </span>
                      </td>
                      <td className="px-4 py-3">{tx.date}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>

            {/* Mobile Card Layout */}
            <div className="md:hidden space-y-3">
              {paginatedTransactions.map((tx, index) => (
                <div
                  key={tx.id}
                  className={`p-4 rounded-lg shadow-md transition ${
                    index % 2 === 0
                      ? "bg-purple-100 dark:bg-purple-900"
                      : "bg-pink-100 dark:bg-pink-900"
                  }`}
                >
                  <div className="flex justify-between text-sm">
                    <span className="font-semibold">ID:</span>
                    <span>#{tx.id}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="font-semibold">User:</span>
                    <span>{tx.user}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="font-semibold">Amount:</span>
                    <span>₹{tx.amount}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="font-semibold">Mode:</span>
                    <span>{tx.mode}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="font-semibold">Status:</span>
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                        tx.status === "Success"
                          ? "bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-300"
                          : tx.status === "Pending"
                          ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-800 dark:text-yellow-300"
                          : "bg-red-100 text-red-700 dark:bg-red-800 dark:text-red-300"
                      }`}
                    >
                      {tx.status}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="font-semibold">Date:</span>
                    <span>{tx.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={goToPage} type="transactions" />
        </>
      )}

      {/* Ludo Matches Tab */}
      {activeTab === "matches" && (
        <>
          <div className="flex flex-col md:flex-row justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-green-700 dark:text-green-400">
              🎮 Ludo Matches
            </h1>
            <div className="flex gap-3 mt-4 md:mt-0">
              <input
                type="text"
                placeholder="Search by Room ID or Winner..."
                value={matchSearchTerm}
                onChange={(e) => {
                  setMatchSearchTerm(e.target.value);
                  setMatchCurrentPage(1);
                }}
                className="p-2 border rounded-lg bg-white dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-green-500 outline-none"
              />
              <select
                value={matchStatusFilter}
                onChange={(e) => {
                  setMatchStatusFilter(e.target.value);
                  setMatchCurrentPage(1);
                }}
                className="p-2 border rounded-lg bg-white dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-green-500 outline-none"
              >
                <option value="All">All Status</option>
                <option value="Live">Live</option>
                <option value="Completed">Completed</option>
                <option value="Starting">Starting</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto bg-transparent">
            <table className="hidden md:table w-full text-left border-separate border-spacing-y-3 overflow-hidden">
              <thead
                style={{
                  backgroundImage: "linear-gradient(-225deg, #22C55E 0%, #16A34A 52%, #15803D 100%)",
                }}
                className="text-white"
              >
                <tr>
                  <th className="px-4 py-3 rounded-l-lg">Room ID</th>
                  <th className="px-4 py-3">Players</th>
                  <th className="px-4 py-3">Winner</th>
                  <th className="px-4 py-3">Stake</th>
                  <th className="px-4 py-3">Duration</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3 rounded-r-lg">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedMatches.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="text-center py-4 text-gray-500 dark:text-gray-400">
                      No matches found.
                    </td>
                  </tr>
                ) : (
                  paginatedMatches.map((match, index) => (
                    <tr
                      key={match.id}
                      className={`shadow-md rounded-lg transition ${
                        index % 2 === 0
                          ? "bg-green-100 dark:bg-green-900"
                          : "bg-emerald-100 dark:bg-emerald-900"
                      } hover:scale-[1.01]`}
                    >
                      <td className="px-4 py-3 font-medium">{match.roomId}</td>
                      <td className="px-4 py-3">
                        <div className="text-sm">
                          {match.players.slice(0, 2).join(", ")}
                          {match.players.length > 2 && ` +${match.players.length - 2}`}
                        </div>
                      </td>
                      <td className="px-4 py-3">{match.winner || "-"}</td>
                      <td className="px-4 py-3 font-semibold">₹{match.stake}</td>
                      <td className="px-4 py-3">{match.duration}</td>
                      <td className="px-4 py-3">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            match.status === "Live"
                              ? "bg-red-100 text-red-700 dark:bg-red-800 dark:text-red-300"
                              : match.status === "Completed"
                              ? "bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-300"
                              : "bg-yellow-100 text-yellow-700 dark:bg-yellow-800 dark:text-yellow-300"
                          }`}
                        >
                          {match.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 space-x-2">
                        <button
                          onClick={() => setMatchDetailsModal(match)}
                          className="px-2 py-1 bg-blue-500 text-white rounded text-xs hover:bg-blue-600"
                        >
                          Details
                        </button>
                        {match.status === "Live" && (
                          <button
                            onClick={() => forceEndMatch(match.id)}
                            className="px-2 py-1 bg-red-500 text-white rounded text-xs hover:bg-red-600"
                          >
                            Force End
                          </button>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>

            {/* Mobile Card Layout for Matches */}
            <div className="md:hidden space-y-3">
              {paginatedMatches.map((match, index) => (
                <div
                  key={match.id}
                  className={`p-4 rounded-lg shadow-md transition ${
                    index % 2 === 0
                      ? "bg-green-100 dark:bg-green-900"
                      : "bg-emerald-100 dark:bg-emerald-900"
                  }`}
                >
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-semibold">Room ID:</span>
                    <span>{match.roomId}</span>
                  </div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-semibold">Players:</span>
                    <span>{match.players.slice(0, 2).join(", ")}{match.players.length > 2 && ` +${match.players.length - 2}`}</span>
                  </div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-semibold">Winner:</span>
                    <span>{match.winner || "-"}</span>
                  </div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-semibold">Stake:</span>
                    <span>₹{match.stake}</span>
                  </div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-semibold">Status:</span>
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                        match.status === "Live"
                          ? "bg-red-100 text-red-700"
                          : match.status === "Completed"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {match.status}
                    </span>
                  </div>
                  <div className="flex gap-2 mt-3">
                    <button
                      onClick={() => setMatchDetailsModal(match)}
                      className="px-2 py-1 bg-blue-500 text-white rounded text-xs hover:bg-blue-600"
                    >
                      Details
                    </button>
                    {match.status === "Live" && (
                      <button
                        onClick={() => forceEndMatch(match.id)}
                        className="px-2 py-1 bg-red-500 text-white rounded text-xs hover:bg-red-600"
                      >
                        Force End
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <Pagination currentPage={matchCurrentPage} totalPages={matchTotalPages} onPageChange={goToPage} type="matches" />
        </>
      )}

      {/* Ludo Players Tab */}
      {activeTab === "players" && (
        <>
          <div className="flex flex-col md:flex-row justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-purple-700 dark:text-purple-400">
              👥 Ludo Players
            </h1>
            <div className="flex gap-3 mt-4 md:mt-0">
              <input
                type="text"
                placeholder="Search by Name or ID..."
                value={playerSearchTerm}
                onChange={(e) => {
                  setPlayerSearchTerm(e.target.value);
                  setPlayerCurrentPage(1);
                }}
                className="p-2 border rounded-lg bg-white dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-purple-500 outline-none"
              />
              <select
                value={playerStatusFilter}
                onChange={(e) => {
                  setPlayerStatusFilter(e.target.value);
                  setPlayerCurrentPage(1);
                }}
                className="p-2 border rounded-lg bg-white dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-purple-500 outline-none"
              >
                <option value="All">All Status</option>
                <option value="Active">Active</option>
                <option value="Banned">Banned</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto bg-transparent">
            <table className="hidden md:table w-full text-left border-separate border-spacing-y-3 overflow-hidden">
              <thead
                style={{
                  backgroundImage: "linear-gradient(-225deg, #8B5CF6 0%, #A855F7 52%, #9333EA 100%)",
                }}
                className="text-white"
              >
                <tr>
                  <th className="px-4 py-3 rounded-l-lg">User ID</th>
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3">Games Played</th>
                  <th className="px-4 py-3">Wins</th>
                  <th className="px-4 py-3">Losses</th>
                  <th className="px-4 py-3">Balance</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3 rounded-r-lg">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedPlayers.length === 0 ? (
                  <tr>
                    <td colSpan="9" className="text-center py-4 text-gray-500 dark:text-gray-400">
                      No players found.
                    </td>
                  </tr>
                ) : (
                  paginatedPlayers.map((player, index) => (
                    <tr
                      key={player.id}
                      className={`shadow-md rounded-lg transition ${
                        index % 2 === 0
                          ? "bg-purple-100 dark:bg-purple-900"
                          : "bg-violet-100 dark:bg-violet-900"
                      } hover:scale-[1.01]`}
                    >
                      <td className="px-4 py-3 font-medium">{player.userId}</td>
                      <td className="px-4 py-3">{player.name}</td>
                      <td className="px-4 py-3 text-sm">{player.email}</td>
                      <td className="px-4 py-3 text-center">{player.gamesPlayed}</td>
                      <td className="px-4 py-3 text-center text-green-600 font-semibold">{player.wins}</td>
                      <td className="px-4 py-3 text-center text-red-600 font-semibold">{player.losses}</td>
                      <td className="px-4 py-3 font-semibold">₹{player.balance}</td>
                      <td className="px-4 py-3">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            player.status === "Active"
                              ? "bg-green-100 text-green-700 dark:bg-green-800 dark:text-green-300"
                              : "bg-red-100 text-red-700 dark:bg-red-800 dark:text-red-300"
                          }`}
                        >
                          {player.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 space-x-1">
                        <button
                          onClick={() => togglePlayerStatus(player.id)}
                          className={`px-2 py-1 rounded text-xs font-semibold ${
                            player.status === "Active"
                              ? "bg-red-500 text-white hover:bg-red-600"
                              : "bg-green-500 text-white hover:bg-green-600"
                          }`}
                        >
                          {player.status === "Active" ? "Ban" : "Unban"}
                        </button>
                        <button
                          onClick={() => setAdjustStatsModal(player)}
                          className="px-2 py-1 bg-blue-500 text-white rounded text-xs hover:bg-blue-600"
                        >
                          Adjust
                        </button>
                        <button
                          onClick={() => setPlayerHistoryModal(player)}
                          className="px-2 py-1 bg-purple-500 text-white rounded text-xs hover:bg-purple-600"
                        >
                          History
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>

            {/* Mobile Card Layout for Players */}
            <div className="md:hidden space-y-3">
              {paginatedPlayers.map((player, index) => (
                <div
                  key={player.id}
                  className={`p-4 rounded-lg shadow-md transition ${
                    index % 2 === 0
                      ? "bg-purple-100 dark:bg-purple-900"
                      : "bg-violet-100 dark:bg-violet-900"
                  }`}
                >
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-semibold">User ID:</span>
                    <span>{player.userId}</span>
                  </div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-semibold">Name:</span>
                    <span>{player.name}</span>
                  </div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-semibold">Email:</span>
                    <span>{player.email}</span>
                  </div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-semibold">Games:</span>
                    <span>{player.gamesPlayed}</span>
                  </div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-semibold">W/L:</span>
                    <span>
                      <span className="text-green-600 font-semibold">{player.wins}</span>
                      /
                      <span className="text-red-600 font-semibold">{player.losses}</span>
                    </span>
                  </div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-semibold">Balance:</span>
                    <span>₹{player.balance}</span>
                  </div>
                  <div className="flex justify-between text-sm mb-3">
                    <span className="font-semibold">Status:</span>
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                        player.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {player.status}
                    </span>
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    <button
                      onClick={() => togglePlayerStatus(player.id)}
                      className={`px-2 py-1 rounded text-xs font-semibold ${
                        player.status === "Active"
                          ? "bg-red-500 text-white hover:bg-red-600"
                          : "bg-green-500 text-white hover:bg-green-600"
                      }`}
                    >
                      {player.status === "Active" ? "Ban" : "Unban"}
                    </button>
                    <button
                      onClick={() => setAdjustStatsModal(player)}
                      className="px-2 py-1 bg-blue-500 text-white rounded text-xs hover:bg-blue-600"
                    >
                      Adjust Stats
                    </button>
                    <button
                      onClick={() => setPlayerHistoryModal(player)}
                      className="px-2 py-1 bg-purple-500 text-white rounded text-xs hover:bg-purple-600"
                    >
                      View History
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <Pagination currentPage={playerCurrentPage} totalPages={playerTotalPages} onPageChange={goToPage} type="players" />
        </>
      )}

      {/* Match Details Modal */}
      {matchDetailsModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full max-h-96 overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800 dark:text-white">Match Details</h2>
              <button
                onClick={() => setMatchDetailsModal(null)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-100"
              >
                ✕
              </button>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="font-semibold">Room ID:</span>
                <span>{matchDetailsModal.roomId}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Players:</span>
                <span>{matchDetailsModal.players.join(", ")}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Winner:</span>
                <span>{matchDetailsModal.winner || "In Progress"}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Stake:</span>
                <span>₹{matchDetailsModal.stake}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Duration:</span>
                <span>{matchDetailsModal.duration}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Status:</span>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  matchDetailsModal.status === "Live" ? "bg-red-100 text-red-700" :
                  matchDetailsModal.status === "Completed" ? "bg-green-100 text-green-700" :
                  "bg-yellow-100 text-yellow-700"
                }`}>
                  {matchDetailsModal.status}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Total Moves:</span>
                <span>{matchDetailsModal.moves}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Date:</span>
                <span>{matchDetailsModal.date}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Player History Modal */}
      {playerHistoryModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-lg w-full max-h-96 overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800 dark:text-white">Player History</h2>
              <button
                onClick={() => setPlayerHistoryModal(null)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-100"
              >
                ✕
              </button>
            </div>
            <div className="mb-4 p-3 bg-gray-100 dark:bg-gray-700 rounded">
              <h3 className="font-semibold text-lg">{playerHistoryModal.name}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">{playerHistoryModal.email}</p>
              <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
                <div>Games: <span className="font-semibold">{playerHistoryModal.gamesPlayed}</span></div>
                <div>Balance: <span className="font-semibold">₹{playerHistoryModal.balance}</span></div>
                <div>Wins: <span className="font-semibold text-green-600">{playerHistoryModal.wins}</span></div>
                <div>Losses: <span className="font-semibold text-red-600">{playerHistoryModal.losses}</span></div>
              </div>
            </div>
            <h4 className="font-semibold mb-2">Recent Transactions:</h4>
            <div className="space-y-2">
              {(playerTransactions[playerHistoryModal.userId] || []).map((transaction) => (
                <div key={transaction.id} className="p-2 bg-gray-50 dark:bg-gray-700 rounded text-sm">
                  <div className="flex justify-between">
                    <span className={`font-semibold ${
                      transaction.type === "Win" ? "text-green-600" :
                      transaction.type === "Loss" ? "text-red-600" : "text-blue-600"
                    }`}>
                      {transaction.type}
                    </span>
                    <span className={`font-semibold ${transaction.amount > 0 ? "text-green-600" : "text-red-600"}`}>
                      {transaction.amount > 0 ? "+" : ""}₹{transaction.amount}
                    </span>
                  </div>
                  <div className="flex justify-between text-gray-600 dark:text-gray-300">
                    <span>{transaction.date}</span>
                    {transaction.matchId && <span>Match: {transaction.matchId}</span>}
                  </div>
                </div>
              ))}
              {(!playerTransactions[playerHistoryModal.userId] || playerTransactions[playerHistoryModal.userId].length === 0) && (
                <p className="text-gray-500 dark:text-gray-400 text-center py-2">No transaction history available.</p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Adjust Stats Modal */}
      {adjustStatsModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-800 dark:text-white">Adjust Player Stats</h2>
              <button
                onClick={() => setAdjustStatsModal(null)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-100"
              >
                ✕
              </button>
            </div>
            <div className="mb-4">
              <h3 className="font-semibold text-lg">{adjustStatsModal.name}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">{adjustStatsModal.userId}</p>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                const newStats = {
                  wins: parseInt(formData.get('wins')),
                  losses: parseInt(formData.get('losses')),
                  balance: parseInt(formData.get('balance'))
                };
                adjustPlayerStats(adjustStatsModal.id, newStats);
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-sm font-medium mb-1">Wins:</label>
                <input
                  type="number"
                  name="wins"
                  defaultValue={adjustStatsModal.wins}
                  min="0"
                  className="w-full p-2 border rounded-lg bg-white dark:bg-gray-700 dark:text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Losses:</label>
                <input
                  type="number"
                  name="losses"
                  defaultValue={adjustStatsModal.losses}
                  min="0"
                  className="w-full p-2 border rounded-lg bg-white dark:bg-gray-700 dark:text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Balance:</label>
                <input
                  type="number"
                  name="balance"
                  defaultValue={adjustStatsModal.balance}
                  min="0"
                  className="w-full p-2 border rounded-lg bg-white dark:bg-gray-700 dark:text-white"
                  required
                />
              </div>
              <div className="flex gap-2 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
                >
                  Update Stats
                </button>
                <button
                  type="button"
                  onClick={() => setAdjustStatsModal(null)}
                  className="flex-1 bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default LudoAdminDashboard;
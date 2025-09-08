import React, { useMemo, useState } from "react";
import {
  Plus,
  Trash2,
  Eye,
  Search,
  Filter,
  Download,
  X,
  Check,
  DollarSign,
  History,
  Wallet,
  Ban,
  ShieldCheck,
  Trophy,
  Users,
  Clock,
  CircleCheck,
  RefreshCcw,
  Hand,
  Award,
} from "lucide-react";

/**
 * JackpotDashboard.jsx
 *
 * This version uses a tabbed interface for a cleaner UI.
 * - Tabbed navigation for User Management and Jackpot Game Management.
 * - Modals for all detail views and actions (Add, Delete, View Details).
 * - Improved UI and layout.
 *
 * TailwindCSS required. Icons via lucide-react.
 */

// --- Constants & Mock Data ---
const STATUS_COLORS = {
  Active:
    "bg-emerald-100 text-emerald-700 ring-1 ring-inset ring-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:ring-emerald-900",
  Banned:
    "bg-red-100 text-red-700 ring-1 ring-inset ring-red-200 dark:bg-red-950/50 dark:text-red-300 dark:ring-red-900",
  Block:
    "bg-amber-100 text-amber-800 ring-1 ring-inset ring-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:ring-amber-900",
};

const initialUsers = [
  {
    id: 1001,
    username: "player_neo",
    mobile: "9876543210",
    balance: 1250.5,
    status: "Active",
    lastBetAt: "2025-09-01 14:12",
    totalWins: 2,
    history: [
      { id: "b-1", time: "2025-09-01 14:12", bet: 50, result: "+150", game: "Jackpot Wheel" },
      { id: "b-2", time: "2025-08-31 21:40", bet: 20, result: "-20", game: "Rapid Jackpot" },
    ],
  },
  {
    id: 1002,
    username: "lucky777",
    mobile: "9123456789",
    balance: 320.0,
    status: "Block",
    lastBetAt: "2025-08-29 10:05",
    totalWins: 0,
    history: [
      { id: "b-3", time: "2025-08-29 10:05", bet: 10, result: "+0", game: "Jackpot Wheel" },
    ],
  },
  {
    id: 1003,
    username: "queenbee",
    mobile: "8529631470",
    balance: 5400.25,
    status: "Active",
    lastBetAt: "2025-08-28 18:20",
    totalWins: 5,
    history: [
      { id: "b-4", time: "2025-08-28 18:20", bet: 100, result: "+500", game: "Mega Jackpot" },
      { id: "b-5", time: "2025-08-25 15:00", bet: 75, result: "-75", game: "Rapid Jackpot" },
    ],
  },
  {
    id: 1004,
    username: "noobmaster",
    mobile: "7418529630",
    balance: 0,
    status: "Banned",
    lastBetAt: "2025-08-15 09:55",
    totalWins: 0,
    history: [
      { id: "b-6", time: "2025-08-15 09:55", bet: 30, result: "-30", game: "Jackpot Wheel" },
    ],
  },
];

const completedRounds = [
  { id: "r-1", winnerId: 1003, winnerName: "queenbee", pool: 2500, time: "2025-09-01 18:00" },
  { id: "r-2", winnerId: 1001, winnerName: "player_neo", pool: 1500, time: "2025-08-31 22:00" },
  { id: "r-3", winnerId: 1003, winnerName: "queenbee", pool: 4500, time: "2025-08-30 11:30" },
];

const ongoingRoundData = {
  poolValue: 1850.75,
  timer: "02:15",
  contributions: [
    { id: 1001, username: "player_neo", bet: 250 },
    { id: 1003, username: "queenbee", bet: 150 },
    { id: 1005, username: "new_player", bet: 75 },
    { id: 1006, username: "winner_pro", bet: 300 },
  ],
};

// --- Main Component ---
export default function JackpotDashboard() {
  const [users, setUsers] = useState(initialUsers);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [activeTab, setActiveTab] = useState("users"); // 'users' or 'jackpot'

  // Modal State
  const [showAdd, setShowAdd] = useState(false);
  const [newUser, setNewUser] = useState({ username: "", mobile: "", balance: "", status: "Active" });
  const [toDelete, setToDelete] = useState(null);
  const [activeUser, setActiveUser] = useState(null);
  const [activeRound, setActiveRound] = useState(null);
  const [ongoingRound, setOngoingRound] = useState(ongoingRoundData);

  const filteredUsers = useMemo(() => {
    return users.filter((u) => {
      const matchesQuery =
        !query ||
        u.username.toLowerCase().includes(query.toLowerCase()) ||
        String(u.id).includes(query) ||
        String(u.mobile).includes(query);
      const matchesStatus = statusFilter === "All" || u.status === statusFilter;
      return matchesQuery && matchesStatus;
    });
  }, [users, query, statusFilter]);

  const totalBalance = useMemo(() => users.reduce((sum, u) => sum + Number(u.balance || 0), 0), [users]);
  const totalWins = useMemo(() => users.reduce((sum, u) => sum + u.totalWins, 0), [users]);

  // Actions
  const openUserView = (user) => {
    setActiveUser(user);
  };
  const openRoundView = (round) => {
    setActiveRound(round);
  };

  const closeModal = () => {
    setActiveUser(null);
    setActiveRound(null);
    setShowAdd(false);
    setToDelete(null);
  };

  const addUser = (e) => {
    e?.preventDefault?.();
    if (!newUser.username || !newUser.mobile) return;
    const nextId = users.length ? Math.max(...users.map((u) => u.id)) + 1 : 1001;
    const u = {
      id: nextId,
      username: newUser.username.trim(),
      mobile: newUser.mobile.trim(),
      balance: Number(newUser.balance || 0),
      status: newUser.status,
      lastBetAt: "—",
      totalWins: 0,
      history: [],
    };
    setUsers((prev) => [u, ...prev]);
    closeModal();
    setNewUser({ username: "", mobile: "", balance: "", status: "Active" });
  };

  const deleteUser = () => {
    if (!toDelete) return;
    setUsers((prev) => prev.filter((u) => u.id !== toDelete.id));
    if (activeUser?.id === toDelete.id) closeModal();
    setToDelete(null);
  };

  const toggleUserStatus = (userId, currentStatus) => {
    const newStatus = currentStatus === "Active" ? "Banned" : "Active";
    setUsers((prev) =>
      prev.map((u) => (u.id === userId ? { ...u, status: newStatus } : u))
    );
  };

  const adjustBalance = (userId, amount) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === userId
          ? {
              ...u,
              balance: Math.max(0, Number(u.balance) + Number(amount)),
            }
          : u
      )
    );
  };

  const checkFraud = (userId) => {
    const user = users.find(u => u.id === userId);
    if (!user) return "User not found";
    const totalBetValue = user.history.reduce((sum, h) => sum + h.bet, 0);
    const winRatio = (user.totalWins / user.history.length) * 100;

    if (user.balance > 5000 && winRatio > 50) {
      return "High win ratio, consider manual review.";
    }
    if (user.history.length > 5 && totalBetValue === 0) {
      return "Zero total bets with history. Suspicious.";
    }
    return "No suspicious activity detected.";
  };

  const manuallyEndRound = (winnerId, winnerName) => {
    const newRound = {
      id: `r-${completedRounds.length + 1}`,
      winnerId,
      winnerName,
      pool: ongoingRound.poolValue,
      time: new Date().toLocaleString(),
    };
    setUsers((prev) =>
      prev.map((u) => (u.id === winnerId ? { ...u, totalWins: u.totalWins + 1 } : u))
    );
    setOngoingRound({ ...ongoingRound, winner: { id: winnerId, name: winnerName } });
    // You would typically add the new round to the completed rounds list here
  };

  const exportCSV = () => {
    const header = ["ID", "Username", "Mobile", "Balance", "Status", "Total Bets", "Total Wins", "Last Bet At"];
    const rows = users.map((u) => [u.id, u.username, u.mobile, u.balance, u.status, u.history.length, u.totalWins, u.lastBetAt]);
    const csv = [header, ...rows].map((r) => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `jackpot_users_${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto">
      {/* --- Header --- */}
      <div className="flex items-start md:items-center justify-between gap-4 flex-col md:flex-row">
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold tracking-tight flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-yellow-500" /> Jackpot Admin Dashboard
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Comprehensive management of users and jackpot rounds.
          </p>
        </div>
        <div className="flex items-center gap-2">
          {activeTab === 'users' && (
            <button
              onClick={() => setShowAdd(true)}
              className="inline-flex items-center gap-2 rounded-xl px-4 py-2 bg-yellow-500 text-black font-medium hover:bg-yellow-400 shadow-sm"
            >
              <Plus className="w-4 h-4" /> Add User
            </button>
          )}
          <button
            onClick={exportCSV}
            className="inline-flex items-center gap-2 rounded-xl px-4 py-2 bg-gray-900 text-white dark:bg-white dark:text-gray-900 font-medium hover:opacity-90 shadow-sm"
          >
            <Download className="w-4 h-4" /> Export CSV
          </button>
        </div>
      </div>

      {/* --- Tab Navigation --- */}
      <div className="flex items-center gap-2 mt-6 border-b border-gray-200 dark:border-gray-800">
        <TabButton active={activeTab === 'users'} onClick={() => setActiveTab('users')}>
          <Users className="w-4 h-4 mr-1" /> User Management
        </TabButton>
        <TabButton active={activeTab === 'jackpot'} onClick={() => setActiveTab('jackpot')}>
          <Trophy className="w-4 h-4 mr-1" /> Jackpot Game
        </TabButton>
      </div>

      {/* --- Tab Content --- */}
      <div className="mt-4">
        {activeTab === 'users' && (
          <UserManagementTab
            users={users}
            filteredUsers={filteredUsers}
            query={query}
            setQuery={setQuery}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            totalBalance={totalBalance}
            totalWins={totalWins}
            openUserView={openUserView}
            toggleUserStatus={toggleUserStatus}
            setToDelete={setToDelete}
          />
        )}
        {activeTab === 'jackpot' && (
          <JackpotGameTab
            ongoingRound={ongoingRound}
            completedRounds={completedRounds}
            openRoundView={openRoundView}
            manuallyEndRound={manuallyEndRound}
          />
        )}
      </div>

      {/* --- Modals --- */}
      {showAdd && (
        <Modal onClose={closeModal}>
          <AddUserModalContent
            newUser={newUser}
            setNewUser={setNewUser}
            addUser={addUser}
            onClose={closeModal}
          />
        </Modal>
      )}

      {toDelete && (
        <Modal onClose={closeModal}>
          <DeleteConfirmModalContent
            toDelete={toDelete}
            deleteUser={deleteUser}
            onClose={closeModal}
          />
        </Modal>
      )}

      {activeUser && (
        <WideModal onClose={closeModal}>
          <UserDetails
            user={activeUser}
            onAdjust={adjustBalance}
            onBan={toggleUserStatus}
            onDelete={() => { setToDelete(activeUser); closeModal(); }}
            checkFraud={checkFraud}
            onClose={closeModal}
          />
        </WideModal>
      )}

      {activeRound && (
        <Modal onClose={closeModal}>
          <RoundDetails round={activeRound} onClose={closeModal} />
        </Modal>
      )}

    </div>
  );
}

// --- Tab Components ---
function UserManagementTab({
  filteredUsers,
  query,
  setQuery,
  statusFilter,
  setStatusFilter,
  totalBalance,
  totalWins,
  openUserView,
  toggleUserStatus,
  setToDelete,
}) {
  return (
    <>
      {/* User KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        <KPI title="Total Users" value={filteredUsers.length} />
        <KPI title="Total Balance" value={`₹ ${totalBalance.toFixed(2)}`} />
        <KPI title="Total Wins" value={totalWins} tone="emerald" />
      </div>

      {/* User Filters */}
      <div className="mt-4 flex flex-col md:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            placeholder="Search by ID, name, or mobile..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-gray-400" />
          <select
            className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option>All</option>
            <option>Active</option>
            <option>Block</option>
            <option>Banned</option>
          </select>
        </div>
      </div>

      {/* User Table */}
      <div className="mt-4 overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm bg-white dark:bg-gray-950">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="text-white dark:text-gray-300 bg-gradient-to-t from-[#9890e3] to-[#b1f4cf]">
              <tr>
                <Th>ID</Th>
                <Th>User Detail</Th>
                <Th className="text-right">Balance (₹)</Th>
                <Th>Status</Th>
                <Th className="text-center">Total Bets</Th>
                <Th className="text-center">Total Wins</Th>
                <Th className="text-right">Actions</Th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length === 0 && (
                <tr>
                  <td colSpan={7} className="text-center py-8 text-gray-500">
                    No users found.
                  </td>
                </tr>
              )}
              {filteredUsers.map((u) => (
                <tr
                  key={u.id}
                  className="border-t border-gray-100 dark:border-gray-800 hover:bg-gray-50/70 dark:hover:bg-gray-900/40"
                >
                  <Td>#{u.id}</Td>
                  <Td>
                    <div className="font-medium">{u.username}</div>
                    <div className="text-xs text-gray-500">{u.mobile}</div>
                  </Td>
                  <Td className="text-right font-semibold">{Number(u.balance).toFixed(2)}</Td>
                  <Td>
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${STATUS_COLORS[u.status]}`}>
                      {u.status}
                    </span>
                  </Td>
                  <Td className="text-center">{u.history.length}</Td>
                  <Td className="text-center">{u.totalWins}</Td>
                  <Td className="text-right">
                    <div className="flex justify-end gap-1">
                      <button
                        onClick={() => openUserView(u)}
                        className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-white hover:opacity-90"
                        style={{ backgroundImage: "linear-gradient(to top, #48c6ef 0%, #6f86d6 100%)" }}
                        title="View user details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => toggleUserStatus(u.id, u.status)}
                        className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-white hover:opacity-90"
                        style={{ backgroundImage: u.status === "Banned" ? "linear-gradient(to right, #434343 0%, black 100%)" : "linear-gradient(to right, #f78ca0 0%, #f9748f 19%, #fd868c 60%, #fe9a8b 100%)" }}
                        title={u.status === "Banned" ? "Unban User" : "Ban User"}
                      >
                        {u.status === "Banned" ? <CircleCheck className="w-4 h-4" /> : <Ban className="w-4 h-4" />}
                      </button>
                    </div>
                  </Td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

function JackpotGameTab({ ongoingRound, completedRounds, openRoundView, manuallyEndRound }) {
  const [winner, setWinner] = useState(null);

  const handleManualWin = (userId, userName) => {
    manuallyEndRound(userId, userName);
    setWinner({ id: userId, name: userName });
    // Simulate clearing the ongoing round data after a delay
    setTimeout(() => {
        setWinner(null);
    }, 5000);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Ongoing Jackpot Round */}
      <div className="p-4 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <RefreshCcw className="w-5 h-5 text-blue-500" /> Ongoing Round
          </h3>
        </div>
        <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
          <KPI title="Current Pool" value={`₹ ${ongoingRound.poolValue.toFixed(2)}`} />
          <KPI title="Time Remaining" value={ongoingRound.timer} tone="amber" />
        </div>
        
        {winner ? (
            <div className="mt-4 p-4 text-center rounded-xl bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                <div className="flex items-center justify-center gap-2 text-lg font-bold">
                    <Award className="w-6 h-6" /> Winner Selected!
                </div>
                <div className="mt-1">
                    <span className="font-semibold">{winner.name}</span> has won this round.
                </div>
            </div>
        ) : (
            <>
                <h4 className="font-semibold text-sm mt-4">Player Contributions & Manual Control</h4>
                <div className="mt-2 text-sm text-gray-600 dark:text-gray-300 space-y-2">
                    {ongoingRound.contributions.length > 0 ? (
                        ongoingRound.contributions.map((c, i) => (
                            <div key={i} className="flex justify-between items-center py-2 px-3 border border-gray-200 dark:border-gray-800 rounded-xl bg-gray-50 dark:bg-gray-900/40">
                                <div className="font-medium text-gray-900 dark:text-white">{c.username}</div>
                                <div className="flex items-center gap-2">
                                    <span className="font-medium">₹ {c.bet.toFixed(2)}</span>
                                    <button
                                        onClick={() => handleManualWin(c.id, c.username)}
                                        className="inline-flex items-center gap-1 px-2 py-1 rounded-lg text-white text-xs hover:opacity-90"
                                        style={{ backgroundImage: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" }}
                                        title="Manually select as winner"
                                    >
                                        <Hand className="w-4 h-4" /> Win
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-4 text-gray-500">No players have joined this round yet.</div>
                    )}
                </div>
            </>
        )}
      </div>

      {/* Completed Jackpot Rounds */}
      <div className="p-4 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <History className="w-5 h-5 text-gray-400" /> Completed Rounds
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50 dark:bg-gray-800 text-xs">
              <tr>
                <Th>Round ID</Th>
                <Th>Winner</Th>
                <Th className="text-right">Pool Value (₹)</Th>
                <Th className="text-right">Action</Th>
              </tr>
            </thead>
            <tbody>
              {completedRounds.map((round) => (
                <tr key={round.id} className="border-t border-gray-100 dark:border-gray-800">
                  <Td>{round.id}</Td>
                  <Td className="font-medium">{round.winnerName}</Td>
                  <Td className="text-right">{Number(round.pool).toFixed(2)}</Td>
                  <Td className="text-right">
                    <button
                      onClick={() => openRoundView(round)}
                      className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-white hover:opacity-90"
                      style={{ backgroundImage: "linear-gradient(to top, #48c6ef 0%, #6f86d6 100%)" }}
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </Td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// --- Reusable UI Components ---
function TabButton({ children, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-3 rounded-t-xl text-sm font-medium transition-colors flex items-center ${
        active
          ? "bg-white dark:bg-gray-950 text-gray-900 dark:text-white border-t border-x border-gray-200 dark:border-gray-800 -mb-[1px]"
          : "bg-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
      }`}
    >
      {children}
    </button>
  );
}

function KPI({ title, value, tone = "slate" }) {
  const tones = {
    slate: "bg-slate-50 dark:bg-slate-900/40 text-slate-700 dark:text-slate-200",
    emerald: "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-200",
    amber: "bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-200",
  };
  return (
    <div className={`rounded-2xl border border-gray-200 dark:border-gray-800 p-4 ${tones[tone]}`}>
      <div className="text-xs uppercase tracking-wider opacity-70">{title}</div>
      <div className="text-xl font-semibold mt-1">{value}</div>
    </div>
  );
}

function Th({ children, className = "" }) {
  return (
    <th className={`text-left px-4 py-3 font-medium ${className}`}>{children}</th>
  );
}

function Td({ children, className = "" }) {
  return <td className={`px-4 py-3 align-middle ${className}`}>{children}</td>;
}

function Modal({ children, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative rounded-2xl bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 shadow-xl max-w-lg w-full overflow-hidden p-6">
        {children}
      </div>
    </div>
  );
}

function WideModal({ children, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative rounded-2xl bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 shadow-xl max-w-3xl w-full overflow-hidden p-6">
        {children}
      </div>
    </div>
  );
}

function AddUserModalContent({ newUser, setNewUser, addUser, onClose }) {
  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Add New Jackpot User</h3>
        <button onClick={onClose} className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800">
          <X className="w-5 h-5" />
        </button>
      </div>
      <form onSubmit={addUser} className="space-y-3">
        <div>
          <label className="text-sm text-gray-600 dark:text-gray-300">Username</label>
          <input
            required
            className="mt-1 w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            value={newUser.username}
            onChange={(e) => setNewUser((s) => ({ ...s, username: e.target.value }))}
            placeholder="e.g. jackpot_hero"
          />
        </div>
        <div>
          <label className="text-sm text-gray-600 dark:text-gray-300">Mobile Number</label>
          <input
            required
            type="tel"
            className="mt-1 w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            value={newUser.mobile}
            onChange={(e) => setNewUser((s) => ({ ...s, mobile: e.target.value }))}
            placeholder="e.g. 9876543210"
          />
        </div>
        <div>
          <label className="text-sm text-gray-600 dark:text-gray-300">Initial Balance (₹)</label>
          <input
            type="number"
            min="0"
            step="0.01"
            className="mt-1 w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            value={newUser.balance}
            onChange={(e) => setNewUser((s) => ({ ...s, balance: e.target.value }))}
            placeholder="0.00"
          />
        </div>
        <div className="pt-2 flex items-center justify-end gap-2">
          <button type="button" onClick={onClose} className="px-4 py-2 rounded-xl bg-gray-100 dark:bg-gray-800">
            Cancel
          </button>
          <button type="submit" className="px-4 py-2 rounded-xl bg-yellow-500 hover:bg-yellow-400 text-black font-medium">
            <Check className="w-4 h-4 inline mr-1" /> Add
          </button>
        </div>
      </form>
    </>
  );
}

function DeleteConfirmModalContent({ toDelete, deleteUser, onClose }) {
  return (
    <>
      <div className="flex items-center gap-2 text-red-600 mb-3">
        <Ban className="w-5 h-5" />
        <h3 className="text-lg font-semibold">Delete User?</h3>
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-300">
        You are about to delete <strong>{toDelete.username}</strong> (#{toDelete.id}). This action cannot be undone.
      </p>
      <div className="pt-4 flex items-center justify-end gap-2">
        <button onClick={onClose} className="px-4 py-2 rounded-xl bg-gray-100 dark:bg-gray-800">
          Cancel
        </button>
        <button onClick={deleteUser} className="px-4 py-2 rounded-xl bg-red-600 text-white hover:bg-red-500">
          <Trash2 className="w-4 h-4 inline mr-1" /> Delete
        </button>
      </div>
    </>
  );
}

function UserDetails({ user, onAdjust, onBan, onDelete, checkFraud, onClose }) {
  const [balanceAmount, setBalanceAmount] = useState("");
  const fraudStatus = useMemo(() => checkFraud(user.id), [user, checkFraud]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-4">
        <div className="text-lg font-semibold flex items-center gap-2">
          <Users className="w-5 h-5 text-yellow-500" /> User Details
        </div>
        <button onClick={onClose} className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800">
          <X className="w-5 h-5" />
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Column: Profile & Wallet */}
        <div className="space-y-6">
          <div className="rounded-xl border border-gray-200 dark:border-gray-800 p-4 space-y-2">
            <h4 className="font-semibold text-sm flex items-center gap-2">
              <Users className="w-4 h-4" /> Profile
            </h4>
            <LineItem label="Username" value={user.username} />
            <LineItem label="User ID" value={`#${user.id}`} />
            <LineItem label="Mobile Number" value={user.mobile} />
            <LineItem label="Status" value={user.status} badgeClass={STATUS_COLORS[user.status]} />
            <LineItem label="Fraud Detection" value={fraudStatus} valueClass={fraudStatus.includes("suspicious") || fraudStatus.includes("review") ? "text-red-600" : "text-emerald-600"} />
          </div>
          <div className="rounded-xl border border-gray-200 dark:border-gray-800 p-4 space-y-4">
            <h4 className="font-semibold text-sm flex items-center gap-2">
              <Wallet className="w-4 h-4" /> Wallet & Control
            </h4>
            <div className="flex items-center justify-between rounded-xl bg-gray-50 dark:bg-gray-900 p-3">
              <div className="text-sm text-gray-500">Current Balance</div>
              <div className="text-xl font-semibold">₹ {Number(user.balance).toFixed(2)}</div>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                step="0.01"
                placeholder="Amount (e.g. 100)"
                value={balanceAmount}
                onChange={(e) => setBalanceAmount(e.target.value)}
                className="flex-1 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
              <button
                onClick={() => {
                  if (balanceAmount) {
                    onAdjust(user.id, Number(balanceAmount));
                    setBalanceAmount("");
                  }
                }}
                className="px-3 py-2 rounded-xl bg-emerald-600 text-white hover:bg-emerald-500 text-sm"
              >
                Credit
              </button>
              <button
                onClick={() => {
                  if (balanceAmount) {
                    onAdjust(user.id, -Number(balanceAmount));
                    setBalanceAmount("");
                  }
                }}
                className="px-3 py-2 rounded-xl bg-red-600 text-white hover:bg-red-500 text-sm"
              >
                Debit
              </button>
            </div>
            <div className="flex justify-end gap-2 pt-2 border-t border-gray-100 dark:border-gray-800">
              <button onClick={() => onBan(user.id, user.status)} className={`px-4 py-2 rounded-xl text-white font-medium ${user.status === 'Banned' ? 'bg-gray-600 hover:bg-gray-700' : 'bg-red-600 hover:bg-red-500'}`}>
                {user.status === 'Banned' ? 'Unban User' : 'Ban User'}
              </button>
              <button onClick={onDelete} className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white font-medium">
                <Trash2 className="w-4 h-4 inline mr-1" /> Delete
              </button>
            </div>
          </div>
        </div>
        {/* Right Column: Bet History */}
        <div className="space-y-6">
          <div className="rounded-xl border border-gray-200 dark:border-gray-800 p-4">
            <h4 className="font-semibold text-sm flex items-center gap-2 mb-2">
              <History className="w-4 h-4" /> Bet History
            </h4>
            <HistoryPanel history={user.history} />
          </div>
        </div>
      </div>
    </div>
  );
}

function RoundDetails({ round, onClose }) {
  const roundDetails = {
    "r-1": [
      { user: "player_neo", bet: 50, time: "2025-09-01 17:50" },
      { user: "lucky777", bet: 20, time: "2025-09-01 17:52" },
      { user: "queenbee", bet: 100, time: "2025-09-01 17:55" },
      { user: "jackpot_hero", bet: 50, time: "2025-09-01 17:58" },
    ],
  };
  const contributions = roundDetails[round.id] || [];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <div className="text-lg font-semibold flex items-center gap-2">
          <Trophy className="w-5 h-5 text-yellow-500" /> Round Details
        </div>
        <button onClick={onClose} className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800">
          <X className="w-5 h-5" />
        </button>
      </div>
      <div className="rounded-xl border border-gray-200 dark:border-gray-800 p-4">
        <h4 className="font-semibold text-sm flex items-center gap-2">
          <Trophy className="w-4 h-4" /> Round Summary
        </h4>
        <div className="mt-2 space-y-1">
          <LineItem label="Winner" value={round.winnerName} />
          <LineItem label="Pool Value" value={`₹ ${Number(round.pool).toFixed(2)}`} />
          <LineItem label="Completed At" value={round.time} />
        </div>
      </div>
      <div className="rounded-xl border border-gray-200 dark:border-gray-800 p-4">
        <h4 className="font-semibold text-sm flex items-center gap-2">
          <History className="w-4 h-4" /> Player Contributions
        </h4>
        <ul className="mt-2 text-sm text-gray-600 dark:text-gray-300">
          {contributions.length > 0 ? (
            contributions.map((c, i) => (
              <li key={i} className="flex justify-between py-1 border-b border-gray-100 dark:border-gray-800 last:border-b-0">
                <div>{c.user}</div>
                <div className="font-medium">₹ {c.bet.toFixed(2)}</div>
              </li>
            ))
          ) : (
            <div className="text-center text-gray-500 py-4">No contributions found for this round.</div>
          )}
        </ul>
      </div>
    </div>
  );
}

function LineItem({ label, value, valueClass = "", badgeClass }) {
  return (
    <div className="flex items-center justify-between gap-4 py-1.5">
      <div className="text-sm text-gray-500 dark:text-gray-400">{label}</div>
      {badgeClass ? (
        <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${badgeClass}`}>{value}</span>
      ) : (
        <div className={`text-sm ${valueClass}`}>{value}</div>
      )}
    </div>
  );
}

function HistoryPanel({ history }) {
  if (!history || history.length === 0) {
    return (
      <div className="text-sm text-gray-500">No jackpot bets found for this user.</div>
    );
  }
  return (
    <div className="space-y-3">
      {history.map((h) => (
        <div
          key={h.id}
          className="rounded-xl border border-gray-200 dark:border-gray-800 p-3 flex items-center justify-between"
        >
          <div>
            <div className="font-medium text-sm">{h.game}</div>
            <div className="text-xs text-gray-500">{h.time}</div>
          </div>
          <div className="text-right">
            <div className="text-sm">Bet: ₹ {Number(h.bet).toFixed(2)}</div>
            <div className={`text-sm font-semibold ${String(h.result).startsWith("+") ? "text-emerald-600" : String(h.result).startsWith("-") ? "text-red-600" : "text-gray-600"}`}>
              Result: {h.result}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
// MinesUserManagement.jsx
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
  Zap,
  Ticket,
  Users,
} from "lucide-react";

/**
 * MinesUserManagement.jsx
 * Fully responsive single-file admin UI (TailwindCSS required).
 *
 * Features:
 * - Mobile: card list view, drawer full-screen
 * - Desktop: table view
 * - Add user modal, delete confirm modal
 * - Drawer with tabs (Profile, Wallet, History)
 * - New: Game Rounds Management view
 * - New: Detailed User Bet History
 * - Export CSV
 */

const STATUS_COLORS = {
  Active: "bg-emerald-100 text-emerald-700 ring-1 ring-inset ring-emerald-200",
  Suspended: "bg-amber-100 text-amber-800 ring-1 ring-inset ring-amber-200",
  Banned: "bg-red-100 text-red-700 ring-1 ring-inset ring-red-200",
};

const ROUND_STATUS_COLORS = {
  Completed: "bg-emerald-100 text-emerald-700",
  "Bomb Hit": "bg-red-100 text-red-700",
  "Round Canceled": "bg-gray-100 text-gray-700",
  Ongoing: "bg-blue-100 text-blue-700",
};

const initialUsers = [
  {
    id: 2001,
    username: "miner_neo",
    balance: 500,
    status: "Active",
    lastBetAt: "2025-09-01 12:00",
    history: [
      {
        id: "m-1",
        time: "2025-09-01 12:00",
        bet: 50,
        game: "Mines 5x5",
        multiplier: 2.5,
        cashout: 125,
        netProfitLoss: 75,
      },
      {
        id: "m-2",
        time: "2025-08-30 14:15",
        bet: 30,
        game: "Mines 3x3",
        multiplier: 0,
        cashout: 0,
        netProfitLoss: -30,
      },
    ],
  },
  {
    id: 2002,
    username: "minehunter",
    balance: 250,
    status: "Suspended",
    lastBetAt: "2025-08-28 09:45",
    history: [
      {
        id: "m-3",
        time: "2025-08-28 09:45",
        bet: 20,
        game: "Mines 5x5",
        multiplier: 0,
        cashout: 0,
        netProfitLoss: -20,
      },
    ],
  },
  {
    id: 2003,
    username: "gold_digger",
    balance: 1200,
    status: "Active",
    lastBetAt: "2025-08-25 17:30",
    history: [
      {
        id: "m-4",
        time: "2025-08-25 17:30",
        bet: 100,
        game: "Mines 5x5",
        multiplier: 4.5,
        cashout: 450,
        netProfitLoss: 350,
      },
    ],
  },
  {
    id: 2004,
    username: "noob_miner",
    balance: 0,
    status: "Banned",
    lastBetAt: "2025-08-20 11:10",
    history: [
      {
        id: "m-5",
        time: "2025-08-20 11:10",
        bet: 50,
        game: "Mines 3x3",
        multiplier: 0,
        cashout: 0,
        netProfitLoss: -50,
      },
    ],
  },
];

const initialGameRounds = [
  {
    id: 1001,
    username: "miner_neo",
    betAmount: 50,
    minesCount: 5,
    status: "Completed",
    result: "₹ 125.00",
    time: "2025-09-01 12:00",
  },
  {
    id: 1002,
    username: "minehunter",
    betAmount: 20,
    minesCount: 5,
    status: "Bomb Hit",
    result: "Loss",
    time: "2025-08-28 09:45",
  },
  {
    id: 1003,
    username: "gold_digger",
    betAmount: 100,
    minesCount: 5,
    status: "Completed",
    result: "₹ 450.00",
    time: "2025-08-25 17:30",
  },
  {
    id: 1004,
    username: "noob_miner",
    betAmount: 50,
    minesCount: 3,
    status: "Bomb Hit",
    result: "Loss",
    time: "2025-08-20 11:10",
  },
];

export default function MinesUserManagement() {
  const [users, setUsers] = useState(initialUsers);
  const [gameRounds, setGameRounds] = useState(initialGameRounds);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const [dashboardTab, setDashboardTab] = useState("users"); // users | rounds

  const [showAdd, setShowAdd] = useState(false);
  const [newUser, setNewUser] = useState({
    username: "",
    balance: "",
    status: "Active",
  });

  const [toDelete, setToDelete] = useState(null);

  const [openDrawer, setOpenDrawer] = useState(false);
  const [activeUser, setActiveUser] = useState(null);
  const [drawerTab, setDrawerTab] = useState("profile"); // profile | wallet | history

  const filteredUsers = useMemo(() => {
    return users.filter((u) => {
      const matchesQuery =
        !query ||
        u.username.toLowerCase().includes(query.toLowerCase()) ||
        String(u.id).includes(query);
      const matchesStatus = statusFilter === "All" || u.status === statusFilter;
      return matchesQuery && matchesStatus;
    });
  }, [users, query, statusFilter]);

  const totalBalance = useMemo(
    () => users.reduce((sum, u) => sum + Number(u.balance || 0), 0),
    [users]
  );

  const openView = (user) => {
    setActiveUser(user);
    setDrawerTab("profile");
    setOpenDrawer(true);
  };

  const addUser = (e) => {
    e?.preventDefault?.();
    if (!newUser.username) return;
    const nextId = users.length
      ? Math.max(...users.map((u) => u.id)) + 1
      : 2001;
    const u = {
      id: nextId,
      username: newUser.username.trim(),
      balance: Number(newUser.balance || 0),
      status: newUser.status,
      lastBetAt: "—",
      history: [],
    };
    setUsers((prev) => [u, ...prev]);
    setShowAdd(false);
    setNewUser({ username: "", balance: "", status: "Active" });
  };

  const deleteUser = () => {
    if (!toDelete) return;
    setUsers((prev) => prev.filter((u) => u.id !== toDelete.id));
    if (activeUser?.id === toDelete.id) setOpenDrawer(false);
    setToDelete(null);
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

  const exportCSV = () => {
    const header = ["ID", "Username", "Balance", "Status", "Last Bet At"];
    const rows = users.map((u) => [
      u.id,
      u.username,
      u.balance,
      u.status,
      u.lastBetAt,
    ]);
    const csv = [header, ...rows].map((r) => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `mines_users_${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-start md:items-center justify-between gap-4 flex-col md:flex-row">
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold tracking-tight flex items-center gap-2">
            <Zap className="w-6 h-6 text-indigo-500" /> Mines Dashboard
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage Mines players, game rounds, balances, and history.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowAdd(true)}
            className="inline-flex items-center gap-2 rounded-xl px-4 py-2 bg-yellow-500 text-white font-medium hover:bg-yellow-600 shadow-sm"
          >
            <Plus className="w-4 h-4" /> Add User
          </button>
          <button
            onClick={exportCSV}
            className="inline-flex items-center gap-2 rounded-xl px-4 py-2 bg-gray-900 text-white font-medium hover:opacity-90 shadow-sm"
          >
            <Download className="w-4 h-4" /> Export CSV
          </button>
        </div>
      </div>

      {/* --- Dashboard Tabs --- */}
      <div className="mt-6 flex gap-3 border-b border-gray-200">
        <TabButton
          active={dashboardTab === "users"}
          onClick={() => setDashboardTab("users")}
          icon={<Users className="w-4 h-4" />}
        >
          User Management
        </TabButton>
        <TabButton
          active={dashboardTab === "rounds"}
          onClick={() => setDashboardTab("rounds")}
          icon={<Ticket className="w-4 h-4" />}
        >
          Game Rounds
        </TabButton>
      </div>

      {/* --- Main Content based on Tab --- */}
      {dashboardTab === "users" && (
        <>
          {/* KPIs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-4">
            <KPI title="Total Users" value={users.length} />
            <KPI
              title="Active"
              value={users.filter((u) => u.status === "Active").length}
              tone="emerald"
            />
            <KPI
              title="Suspended"
              value={users.filter((u) => u.status === "Suspended").length}
              tone="amber"
            />
            <KPI
              title="Total Balance"
              value={`₹ ${totalBalance.toFixed(2)}`}
            />
          </div>

          {/* Filters */}
          <div className="mt-4 flex flex-col md:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
                placeholder="Search by ID or username..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-400" />
              <select
                className="rounded-xl border border-gray-200 bg-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option>All</option>
                <option>Active</option>
                <option>Suspended</option>
                <option>Banned</option>
              </select>
            </div>
          </div>

          {/* User List (mobile) */}
          <div className="mt-4 space-y-3 md:hidden">
            {filteredUsers.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No users found.
              </div>
            )}
            {filteredUsers.map((u) => (
              <UserCard
                key={u.id}
                user={u}
                onView={() => openView(u)}
                onDelete={() => setToDelete(u)}
              />
            ))}
          </div>

          {/* User Table (desktop) */}
          <div className="mt-4 overflow-hidden rounded-2xl border border-gray-200 shadow-sm bg-white hidden md:block">
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead className="text-white bg-gradient-to-t from-[#9890e3] to-[#b1f4cf]">
                  <tr>
                    <Th>ID</Th>
                    <Th>Username</Th>
                    <Th className="text-right">Balance (₹)</Th>
                    <Th>Status</Th>
                    <Th>Last Bet</Th>
                    <Th className="text-right">Actions</Th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.length === 0 && (
                    <tr>
                      <td colSpan={6} className="text-center py-8 text-gray-500">
                        No users found.
                      </td>
                    </tr>
                  )}
                  {filteredUsers.map((u) => (
                    <tr
                      key={u.id}
                      className="border-t border-gray-100 hover:bg-gray-50"
                    >
                      <Td>#{u.id}</Td>
                      <Td>
                        <div className="font-medium">{u.username}</div>
                        <div className="text-xs text-gray-500">Mines Player</div>
                      </Td>
                      <Td className="text-right font-semibold">
                        {Number(u.balance).toFixed(2)}
                      </Td>
                      <Td>
                        <span
                          className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                            STATUS_COLORS[u.status]
                          }`}
                        >
                          {u.status}
                        </span>
                      </Td>
                      <Td className="text-gray-500">{u.lastBetAt}</Td>
                      <Td className="text-right">
                        <div className="flex justify-end gap-1">
                          <button
                            onClick={() => openView(u)}
                            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-white"
                            style={{
                              backgroundImage:
                                "linear-gradient(to top, #6a11cb 0%, #2575fc 100%)",
                            }}
                            title="View / Manage"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setToDelete(u)}
                            className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-white"
                            style={{
                              backgroundImage:
                                "linear-gradient(to right, #f85032 0%, #e73827 100%)",
                            }}
                            title="Delete user"
                          >
                            <Trash2 className="w-4 h-4" />
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
      )}

      {dashboardTab === "rounds" && (
        <GameRoundsTable gameRounds={gameRounds} />
      )}

      {/* Add User Modal */}
      {showAdd && (
        <Modal onClose={() => setShowAdd(false)}>
          <div className="w-[92vw] max-w-lg p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Add Mines User</h3>
              <button
                onClick={() => setShowAdd(false)}
                className="p-1 rounded hover:bg-gray-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={addUser} className="space-y-3">
              <div>
                <label className="text-sm text-gray-600">Username</label>
                <input
                  required
                  className="mt-1 w-full rounded-xl border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  value={newUser.username}
                  onChange={(e) =>
                    setNewUser((s) => ({ ...s, username: e.target.value }))
                  }
                  placeholder="e.g. miner_hero"
                />
              </div>
              <div>
                <label className="text-sm text-gray-600">
                  Initial Balance (₹)
                </label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  className="mt-1 w-full rounded-xl border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  value={newUser.balance}
                  onChange={(e) =>
                    setNewUser((s) => ({ ...s, balance: e.target.value }))
                  }
                  placeholder="0.00"
                />
              </div>
              <div>
                <label className="text-sm text-gray-600">Status</label>
                <select
                  className="mt-1 w-full rounded-xl border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  value={newUser.status}
                  onChange={(e) =>
                    setNewUser((s) => ({ ...s, status: e.target.value }))
                  }
                >
                  <option>Active</option>
                  <option>Suspended</option>
                  <option>Banned</option>
                </select>
              </div>
              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAdd(false)}
                  className="px-4 py-2 rounded-xl bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-indigo-500 hover:bg-indigo-400 text-white font-medium"
                >
                  <Check className="w-4 h-4 inline mr-1" /> Add
                </button>
              </div>
            </form>
          </div>
        </Modal>
      )}

      {/* Delete Confirm */}
      {toDelete && (
        <Modal onClose={() => setToDelete(null)}>
          <div className="w-[92vw] max-w-md p-5">
            <div className="flex items-center gap-2 text-red-600 mb-3">
              <Ban className="w-5 h-5" />
              <h3 className="text-lg font-semibold">Delete user?</h3>
            </div>
            <p className="text-sm text-gray-600">
              You are about to delete <strong>{toDelete.username}</strong> (#
              {toDelete.id}). This action cannot be undone.
            </p>
            <div className="pt-4 flex items-center justify-end gap-2">
              <button
                onClick={() => setToDelete(null)}
                className="px-4 py-2 rounded-xl bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={deleteUser}
                className="px-4 py-2 rounded-xl bg-red-600 text-white hover:bg-red-500"
              >
                <Trash2 className="w-4 h-4 inline mr-1" /> Delete
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* Drawer: View / Manage */}
      {openDrawer && activeUser && (
        <Drawer onClose={() => setOpenDrawer(false)}>
          <div className="w-full h-full flex flex-col bg-gradient-to-b from-gray-50 to-white">
            {/* Drawer header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white shadow-lg">
              <div>
                <div className="text-xl font-semibold flex items-center gap-2">
                  <Eye className="w-6 h-6 animate-pulse" /> User #
                  {activeUser.id}
                </div>
                <div className="text-sm opacity-90 italic">
                  {activeUser.username}
                </div>
              </div>
              <button
                onClick={() => setOpenDrawer(false)}
                className="p-2 rounded-lg hover:bg-white/20 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Tabs */}
            <div className="px-6 py-4 border-b border-gray-100 flex gap-3 bg-gray-50">
              <TabButton
                active={drawerTab === "profile"}
                onClick={() => setDrawerTab("profile")}
                icon={<ShieldCheck className="w-4 h-4" />}
              >
                Profile
              </TabButton>
              <TabButton
                active={drawerTab === "wallet"}
                onClick={() => setDrawerTab("wallet")}
                icon={<Wallet className="w-4 h-4" />}
              >
                Wallet
              </TabButton>
              <TabButton
                active={drawerTab === "history"}
                onClick={() => setDrawerTab("history")}
                icon={<History className="w-4 h-4" />}
              >
                Mines History
              </TabButton>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-auto p-6">
              {drawerTab === "profile" && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white/90 backdrop-blur-sm p-5 rounded-2xl border border-gray-200 shadow-md hover:shadow-xl transition-all duration-300">
                      <h3 className="font-semibold text-gray-800 mb-4 text-lg">
                        Basic Information
                      </h3>
                      <LineItem label="Username" value={activeUser.username} />
                      <LineItem
                        label="Status"
                        value={activeUser.status}
                        valueClass="font-medium"
                        badgeClass={STATUS_COLORS[activeUser.status]}
                      />
                      <LineItem
                        label="Join Date"
                        value={activeUser.joinDate || "—"}
                      />
                      <LineItem
                        label="Last Activity"
                        value={activeUser.lastBetAt || "—"}
                      />
                    </div>

                    <div className="bg-white/90 backdrop-blur-sm p-5 rounded-2xl border border-gray-200 shadow-md hover:shadow-xl transition-all duration-300">
                      <h3 className="font-semibold text-gray-800 mb-4 text-lg">
                        Mines Stats
                      </h3>
                      <LineItem
                        label="Total Bets"
                        value={activeUser.history.length || 0}
                      />
                      <LineItem
                        label="Net Profit"
                        value={`₹ ${
                          activeUser.history
                            .reduce((sum, h) => sum + Number(h.netProfitLoss || 0), 0)
                            .toFixed(2)
                        }`}
                        valueClass="font-semibold"
                      />
                      <LineItem
                        label="Current Balance"
                        value={`₹ ${Number(activeUser.balance).toFixed(2)}`}
                        valueClass="font-semibold text-blue-600"
                      />
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-blue-100 to-indigo-50 p-5 rounded-2xl border border-blue-200 flex items-start gap-3 shadow-sm">
                    <ShieldCheck className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div className="text-sm text-blue-900 leading-relaxed">
                      <span className="font-medium">
                        Mines Game Management:
                      </span>{" "}
                      Control bets, adjust balances, and review detailed game
                      history using the tabs above.
                    </div>
                  </div>
                </div>
              )}

              {drawerTab === "wallet" && (
                <WalletPanel
                  user={activeUser}
                  onAdjust={(amt) => adjustBalance(activeUser.id, amt)}
                />
              )}

              {drawerTab === "history" && (
                <HistoryPanel history={activeUser.history} />
              )}
            </div>
          </div>
        </Drawer>
      )}
    </div>
  );
}

/* ---------------- UI Subcomponents ---------------- */

function TabButton({ children, active, onClick, icon }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2 rounded-t-lg text-sm font-medium transition-colors ${
        active
          ? "bg-white text-indigo-700 border-b-2 border-indigo-500 -mb-[1px]"
          : "bg-transparent text-gray-600 hover:bg-gray-100"
      }`}
    >
      {icon} {children}
    </button>
  );
}

function GameRoundsTable({ gameRounds }) {
  if (!gameRounds || gameRounds.length === 0) {
    return (
      <div className="mt-4 text-center py-8 text-gray-500">
        No game rounds found.
      </div>
    );
  }

  return (
    <div className="mt-4 overflow-hidden rounded-2xl border border-gray-200 shadow-sm bg-white">
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="text-white bg-gradient-to-t from-[#9890e3] to-[#b1f4cf]">
            <tr>
              <Th>Round ID</Th>
              <Th>User</Th>
              <Th className="text-right">Bet Amount</Th>
              <Th>Mines</Th>
              <Th>Status</Th>
              <Th>Result</Th>
              <Th>Time</Th>
              <Th className="text-right">Actions</Th>
            </tr>
          </thead>
          <tbody>
            {gameRounds.map((round, index) => (
              <tr
                key={round.id}
                className={`border-t border-gray-100 ${
                  index % 2 === 0 ? "bg-white" : "bg-gray-50"
                }`}
              >
                <Td>#{round.id}</Td>
                <Td>
                  <div className="font-medium">{round.username}</div>
                </Td>
                <Td className="text-right">₹ {Number(round.betAmount).toFixed(2)}</Td>
                <Td>{round.minesCount}</Td>
                <Td>
                  <span
                    className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                      ROUND_STATUS_COLORS[round.status]
                    }`}
                  >
                    {round.status}
                  </span>
                </Td>
                <Td>
                  <span
                    className={`font-semibold ${
                      round.result.includes("₹") ? "text-emerald-600" : "text-red-600"
                    }`}
                  >
                    {round.result}
                  </span>
                </Td>
                <Td className="text-gray-500">{round.time}</Td>
                <Td className="text-right">
                  <div className="flex justify-end gap-1">
                    <button
                      className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-white bg-red-500 hover:bg-red-600"
                      title="Flag for Fraud"
                    >
                      <Ban className="w-4 h-4" />
                    </button>
                    <button
                      className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-white bg-gray-500 hover:bg-gray-600"
                      title="Cancel Round"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </Td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// All other subcomponents remain the same but are included here for completeness.

function KPI({ title, value, tone = "slate" }) {
  const tones = {
    slate: "bg-slate-50 text-slate-700",
    emerald: "bg-emerald-50 text-emerald-700",
    amber: "bg-amber-50 text-amber-700",
  };
  return (
    <div className={`rounded-2xl border border-gray-200 p-4 ${tones[tone]}`}>
      <div className="text-xs uppercase tracking-wider opacity-70">{title}</div>
      <div className="text-xl font-semibold mt-1">{value}</div>
    </div>
  );
}

function Th({ children, className = "" }) {
  return (
    <th className={`text-left px-4 py-3 font-medium ${className}`}>
      {children}
    </th>
  );
}
function Td({ children, className = "" }) {
  return <td className={`px-4 py-3 align-middle ${className}`}>{children}</td>;
}

function Modal({ children, onClose }) {
  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className="rounded-2xl bg-white border border-gray-200 shadow-xl">
          {children}
        </div>
      </div>
    </div>
  );
}

function Drawer({ children, onClose }) {
  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="absolute inset-y-0 right-0 w-full sm:w-[520px] max-w-[100vw] bg-white border-l border-gray-200 shadow-2xl">
        {children}
      </div>
    </div>
  );
}

function LineItem({ label, value, valueClass = "", badgeClass }) {
  return (
    <div className="flex items-center justify-between gap-4 py-1.5">
      <div className="text-sm text-gray-500">{label}</div>
      {badgeClass ? (
        <span className={`px-2.5 py-1 rounded-full text-xs ${badgeClass}`}>
          {value}
        </span>
      ) : (
        <div className={`text-sm ${valueClass}`}>{value}</div>
      )}
    </div>
  );
}

function WalletPanel({ user, onAdjust }) {
  const [amount, setAmount] = useState("");
  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-gray-200 p-4">
        <div className="text-sm text-gray-500">Current Balance</div>
        <div className="text-2xl font-semibold mt-1">
          ₹ {Number(user.balance).toFixed(2)}
        </div>
      </div>

      <div className="rounded-xl border border-gray-200 p-4">
        <div className="text-sm font-medium mb-2 flex items-center gap-2">
          <DollarSign className="w-4 h-4 text-indigo-500" /> Adjust Balance
        </div>
        <div className="flex items-center gap-2">
          <input
            type="number"
            step="0.01"
            placeholder="Amount (e.g. 100)"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="flex-1 rounded-xl border border-gray-200 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <button
            onClick={() => {
              if (!amount) return;
              onAdjust(Number(amount));
              setAmount("");
            }}
            className="px-4 py-2 rounded-xl bg-emerald-600 text-white hover:bg-emerald-500"
          >
            Credit
          </button>
          <button
            onClick={() => {
              if (!amount) return;
              onAdjust(-Number(amount));
              setAmount("");
            }}
            className="px-4 py-2 rounded-xl bg-red-600 text-white hover:bg-red-500"
          >
            Debit
          </button>
        </div>
      </div>

      <div className="rounded-xl border border-gray-200 p-4">
        <div className="text-sm font-medium mb-2 flex items-center gap-2">
          <History className="w-4 h-4 text-gray-500" /> Quick Stats
        </div>
        <ul className="text-sm text-gray-600 list-disc list-inside space-y-1">
          <li>Total Bets: {user.history.length}</li>
          <li>Last Bet: {user.lastBetAt || "—"}</li>
        </ul>
      </div>
    </div>
  );
}

function HistoryPanel({ history }) {
  const [page, setPage] = React.useState(1);
  const perPage = 5;
  const totalPages = Math.ceil((history?.length || 0) / perPage);

  if (!history || history.length === 0) {
    return (
      <div className="text-sm text-gray-500">
        No Mines bets found for this user.
      </div>
    );
  }

  const start = (page - 1) * perPage;
  const currentPageData = history.slice(start, start + perPage);

  return (
    <div className="space-y-4">
      {/* Bet History Cards */}
      {currentPageData.map((h) => (
        <div
          key={h.id}
          className="rounded-xl border border-gray-200 p-3 flex flex-col sm:flex-row sm:items-center sm:justify-between
                      hover:shadow-lg hover:border-indigo-300 transition-all duration-300"
        >
          <div className="flex-1">
            <div className="font-medium text-sm text-gray-800">{h.game}</div>
            <div className="text-xs text-gray-500 mt-1">{h.time}</div>
          </div>
          <div className="mt-2 sm:mt-0 text-left sm:text-right">
            <div className="text-sm text-gray-700">Bet: ₹ {Number(h.bet).toFixed(2)}</div>
            <div className="text-sm text-gray-700">
              Multiplier: {h.multiplier ? `${h.multiplier}x` : "N/A"}
            </div>
            <div className="text-sm font-semibold">
              Cashout:{" "}
              <span
                className={
                  Number(h.cashout) > 0 ? "text-emerald-600" : "text-red-600"
                }
              >
                ₹ {Number(h.cashout).toFixed(2)}
              </span>
            </div>
            <div className="text-sm font-semibold">
              Net P/L:{" "}
              <span
                className={
                  Number(h.netProfitLoss) >= 0 ? "text-emerald-600" : "text-red-600"
                }
              >
                ₹ {Number(h.netProfitLoss).toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      ))}

      {/* Stylish Numbered Pagination */}
      <div className="flex items-center justify-center gap-2 pt-4 flex-wrap">
        <button
          onClick={() => setPage(1)}
          disabled={page === 1}
          className="px-3 py-1.5 rounded-full text-sm font-medium bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow hover:shadow-lg active:scale-95 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
        >
          ⏮
        </button>
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
          className="px-3 py-1.5 rounded-full text-sm font-medium bg-gradient-to-r from-blue-400 to-indigo-400 text-white shadow hover:shadow-lg active:scale-95 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
        >
          ◀
        </button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
          <button
            key={num}
            onClick={() => setPage(num)}
            className={`px-3 py-1.5 rounded-full text-sm font-semibold transition-all ${
              page === num
                ? "bg-indigo-600 text-white shadow-lg scale-105"
                : "bg-gray-100 text-gray-700 hover:bg-indigo-100"
            }`}
          >
            {num}
          </button>
        ))}
        <button
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          disabled={page === totalPages}
          className="px-3 py-1.5 rounded-full text-sm font-medium bg-gradient-to-r from-indigo-400 to-blue-400 text-white shadow hover:shadow-lg active:scale-95 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
        >
          ▶
        </button>
        <button
          onClick={() => setPage(totalPages)}
          disabled={page === totalPages}
          className="px-3 py-1.5 rounded-full text-sm font-medium bg-gradient-to-r from-indigo-500 to-blue-500 text-white shadow hover:shadow-lg active:scale-95 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
        >
          ⏭
        </button>
      </div>
    </div>
  );
}

/* Mobile user card for small screens */
function UserCard({ user, onView, onDelete }) {
  return (
    <div className="p-3 bg-white rounded-xl border border-gray-200 shadow-sm flex items-center justify-between">
      <div>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-md bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white font-semibold">
            {String(user.username).charAt(0).toUpperCase()}
          </div>
          <div>
            <div className="font-medium">{user.username}</div>
            <div className="text-xs text-gray-500">
              #{user.id} — {user.lastBetAt || "—"}
            </div>
          </div>
        </div>
        <div className="mt-2 flex items-center gap-3">
          <div className="text-sm font-semibold">
            ₹ {Number(user.balance).toFixed(2)}
          </div>
          <div>
            <span
              className={`px-2 py-0.5 rounded-full text-xs ${
                STATUS_COLORS[user.status]
              }`}
            >
              {user.status}
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-col items-end gap-2">
        <button
          onClick={onView}
          className="inline-flex items-center gap-1 px-3 py-2 rounded-lg text-white"
          style={{
            backgroundImage:
              "linear-gradient(to top, #6a11cb 0%, #2575fc 100%)",
          }}
          title="View / Manage"
        >
          <Eye className="w-4 h-4" />
        </button>
        <button
          onClick={onDelete}
          className="inline-flex items-center gap-1 px-3 py-2 rounded-lg text-white"
          style={{
            backgroundImage:
              "linear-gradient(to right, #f85032 0%, #e73827 100%)",
          }}
          title="Delete user"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
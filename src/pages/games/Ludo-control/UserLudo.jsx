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
  // added for Ludo feel
  Gamepad2,
  Dices,
} from "lucide-react";
import Pagination from "./UI-Card-Button-Ludo/PaginationLudo";

/**
 * LudoPlayerManagement.jsx
 * Converted from JackpotUserManagement -> Ludo player management
 * - Player table with search & filter
 * - Row actions: View (drawer), Delete
 * - Top action: Add Player
 * - Drawer tabs: Profile, Coins (adjust), Match History
 *
 * TailwindCSS required. Icons via lucide-react.
 */

const STATUS_COLORS = {
  Active:
    "bg-emerald-100 text-emerald-700 ring-1 ring-inset ring-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:ring-emerald-900",
  Banned:
    "bg-red-100 text-red-700 ring-1 ring-inset ring-red-200 dark:bg-red-950/50 dark:text-red-300 dark:ring-red-900",
  Suspended:
    "bg-amber-100 text-amber-800 ring-1 ring-inset ring-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:ring-amber-900",
};

const initialPlayers = [
  {
    id: 2001,
    username: "ludo_master",
    coins: 4520,
    status: "Active",
    lastPlayedAt: "2025-09-03 20:35",
    rank: 12,
    matches: [
      { id: "m-1", time: "2025-09-03 20:35", result: "Win", points: "+40", mode: "Classic" },
      { id: "m-2", time: "2025-09-02 18:10", result: "Loss", points: "-15", mode: "Quick" },
    ],
  },
  {
    id: 2002,
    username: "red_runner",
    coins: 850,
    status: "Suspended",
    lastPlayedAt: "2025-08-30 09:12",
    rank: 84,
    matches: [
      { id: "m-3", time: "2025-08-30 09:12", result: "Draw", points: "+0", mode: "Classic" },
    ],
  },
  {
    id: 2003,
    username: "safe_harbor",
    coins: 10990.5,
    status: "Active",
    lastPlayedAt: "2025-09-01 22:45",
    rank: 3,
    matches: [
      { id: "m-4", time: "2025-09-01 22:45", result: "Win", points: "+300", mode: "Tournament" },
      { id: "m-5", time: "2025-08-29 15:10", result: "Loss", points: "-75", mode: "Classic" },
    ],
  },
  {
    id: 2004,
    username: "green_guard",
    coins: 0,
    status: "Banned",
    lastPlayedAt: "2025-08-12 11:05",
    rank: 999,
    matches: [
      { id: "m-6", time: "2025-08-12 11:05", result: "Loss", points: "-30", mode: "Quick" },
    ],
  },
];

export default function LudoPlayerManagement() {
  const [players, setPlayers] = useState(initialPlayers);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  // Add Player Modal
  const [showAdd, setShowAdd] = useState(false);
  const [newPlayer, setNewPlayer] = useState({ username: "", coins: "", status: "Active" });

  // Delete confirm
  const [toDelete, setToDelete] = useState(null);

  // Drawer (View)
  const [openDrawer, setOpenDrawer] = useState(false);
  const [activePlayer, setActivePlayer] = useState(null);
  const [drawerTab, setDrawerTab] = useState("profile"); // profile | coins | history
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Calculate paginated items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = players.slice(indexOfFirstItem, indexOfLastItem);
  

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const filtered = useMemo(() => {
    return players.filter((p) => {
      const matchesQuery =
        !query || p.username.toLowerCase().includes(query.toLowerCase()) || String(p.id).includes(query);
      const matchesStatus = statusFilter === "All" || p.status === statusFilter;
      return matchesQuery && matchesStatus;
    });
  }, [players, query, statusFilter]);

  const totalCoins = useMemo(() => players.reduce((sum, p) => sum + Number(p.coins || 0), 0), [players]);

  // quick win/loss counts for KPIs
  const totalWins = useMemo(
    () => players.reduce((sum, p) => sum + (p.matches?.filter((m) => String(m.result).toLowerCase() === "win").length || 0), 0),
    [players]
  );
  const totalLosses = useMemo(
    () => players.reduce((sum, p) => sum + (p.matches?.filter((m) => String(m.result).toLowerCase() === "loss").length || 0), 0),
    [players]
  );

  // Actions
  const openView = (player) => {
    setActivePlayer(player);
    setDrawerTab("profile");
    setOpenDrawer(true);
  };

  const addPlayer = (e) => {
    e?.preventDefault?.();
    if (!newPlayer.username) return;
    const nextId = players.length ? Math.max(...players.map((u) => u.id)) + 1 : 2001;
    const p = {
      id: nextId,
      username: newPlayer.username.trim(),
      coins: Number(newPlayer.coins || 0),
      status: newPlayer.status,
      lastPlayedAt: "—",
      rank: "—",
      matches: [],
    };
    setPlayers((prev) => [p, ...prev]);
    setShowAdd(false);
    setNewPlayer({ username: "", coins: "", status: "Active" });
  };

  const deletePlayer = () => {
    if (!toDelete) return;
    setPlayers((prev) => prev.filter((u) => u.id !== toDelete.id));
    if (activePlayer?.id === toDelete.id) setOpenDrawer(false);
    setToDelete(null);
  };

  const adjustCoins = (playerId, amount) => {
    setPlayers((prev) =>
      prev.map((u) =>
        u.id === playerId
          ? {
            ...u,
            coins: Math.max(0, Number(u.coins) + Number(amount)),
          }
          : u
      )
    );
  };

  const exportCSV = () => {
    const header = ["ID", "Username", "Coins", "Status", "Last Played At", "Rank"];
    const rows = players.map((u) => [u.id, u.username, u.coins, u.status, u.lastPlayedAt, u.rank]);
    const csv = [header, ...rows].map((r) => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `ludo_players_${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-start md:items-center justify-between gap-4 flex-col md:flex-row">
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold tracking-tight flex items-center gap-2">
            <Dices className="w-6 h-6 text-red-500" /> Ludo – Player Management
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Manage Ludo players, coins, ranks, and view match history.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowAdd(true)}
            className="inline-flex items-center gap-2 rounded-xl px-4 py-2 bg-red-500 text-white font-medium hover:bg-red-400 shadow-sm"
          >
            <Plus className="w-4 h-4" /> Add Player
          </button>
          <button
            onClick={exportCSV}
            className="inline-flex items-center gap-2 rounded-xl px-4 py-2 bg-gray-900 text-white dark:bg-white dark:text-gray-900 font-medium hover:opacity-90 shadow-sm"
          >
            <Download className="w-4 h-4" /> Export CSV
          </button>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mt-4">
        <KPI title="Total Players" value={players.length} />
        <KPI title="Total Wins" value={totalWins} tone="emerald" />
        <KPI title="Total Losses" value={totalLosses} tone="amber" />
        <KPI title="Total Coins" value={`₹ ${totalCoins.toFixed(2)}`} />
      </div>

      {/* Filters */}
      <div className="mt-4 flex flex-col md:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-red-400"
            placeholder="Search by ID or username..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-gray-400" />
          <select
            className="rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-400"
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

      {/* Table */}
      <div className="mt-4 overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm bg-white dark:bg-gray-950">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="text-white dark:text-gray-300 bg-gradient-to-t from-[#00CCCC] to-[#72A0C1]">
              <tr>
                <Th>ID</Th>
                <Th>Username</Th>
                <Th className="text-right">Coins (₹)</Th>
                <Th>Status</Th>
                <Th>Last Played</Th>
                <Th className="text-right">Actions</Th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center py-8 text-gray-500">
                    No players found.
                  </td>
                </tr>
              )}
              {filtered.map((p) => (
                <tr
                  key={p.id}
                  className="border-t border-gray-100 dark:border-gray-800 hover:bg-gray-50/70 dark:hover:bg-gray-900/40"
                >
                  <Td>#{p.id}</Td>
                  <Td>
                    <div className="font-medium">{p.username}</div>
                    <div className="text-xs text-gray-500">Ludo Player • Rank: {p.rank}</div>
                  </Td>
                  <Td className="text-right font-semibold">{Number(p.coins).toFixed(2)}</Td>
                  <Td>
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${STATUS_COLORS[p.status]}`}>
                      {p.status}
                    </span>
                  </Td>
                  <Td className="text-gray-500">{p.lastPlayedAt}</Td>
                  <Td className="text-right">
                    <div className="flex justify-end gap-1">
                      <button
                        onClick={() => openView(p)}
                        className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-white hover:opacity-90"
                        style={{
                          backgroundImage: "linear-gradient(to top, #f6d365 0%, #fda085 100%)",
                        }}
                        title="View / Manage"
                      >
                        <Eye className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => setToDelete(p)}
                        className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-white hover:opacity-90"
                        style={{
                          backgroundImage:
                            "linear-gradient(to right, #f78ca0 0%, #f9748f 19%, #fd868c 60%, #fe9a8b 100%)",
                        }}
                        title="Delete player"
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

      {/* Add Player Modal */}
      {showAdd && (
        <Modal onClose={() => setShowAdd(false)}>
          <div className="w-[92vw] max-w-lg bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-red-400 to-pink-500">
              <h3 className="text-lg font-semibold text-white">➕ Add Ludo Player</h3>
              <button
                onClick={() => setShowAdd(false)}
                className="p-1 rounded-full bg-white/20 hover:bg-white/30 transition"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={addPlayer} className="p-6 space-y-5">
              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Username</label>
                <input
                  required
                  className="mt-2 w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-2.5 shadow-sm focus:outline-none focus:ring-2 focus:ring-red-400 transition"
                  value={newPlayer.username}
                  onChange={(e) => setNewPlayer((s) => ({ ...s, username: e.target.value }))}
                  placeholder="e.g. ludo_hero"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Initial Coins (₹)</label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  className="mt-2 w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-2.5 shadow-sm focus:outline-none focus:ring-2 focus:ring-red-400 transition"
                  value={newPlayer.coins}
                  onChange={(e) => setNewPlayer((s) => ({ ...s, coins: e.target.value }))}
                  placeholder="0.00"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Status</label>
                <select
                  className="mt-2 w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-2.5 shadow-sm focus:outline-none focus:ring-2 focus:ring-red-400 transition"
                  value={newPlayer.status}
                  onChange={(e) => setNewPlayer((s) => ({ ...s, status: e.target.value }))}
                >
                  <option>Active</option>
                  <option>Suspended</option>
                  <option>Banned</option>
                </select>
              </div>

              {/* Actions */}
              <div className="pt-3 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowAdd(false)}
                  className="px-5 py-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-400 hover:to-pink-400 text-white font-medium shadow-md transition"
                >
                  <Check className="w-4 h-4 inline mr-1" /> Add Player
                </button>
              </div>
            </form>
          </div>
        </Modal>
      )}


      {/* Delete Confirm */}
      {toDelete && (
        <Modal onClose={() => setToDelete(null)}>
          <div className="w-[92vw] max-w-md bg-white dark:bg-gray-900 rounded-3xl shadow-2xl overflow-hidden" style={{borderRadius : "15px"}}>
            {/* Header */}
            <div className="flex items-center gap-2 px-6 py-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-red-500 to-pink-500">
              <Ban className="w-5 h-5 text-white" />
              <h3 className="text-lg font-semibold text-white">Delete Player</h3>
            </div>

            {/* Body */}
            <div className="p-6">
              <p className="text-sm text-gray-600 dark:text-gray-300">
                You are about to delete{" "}
                <strong className="text-gray-900 dark:text-gray-100">
                  {toDelete.username}
                </strong>{" "}
                (#{toDelete.id}). This action <span className="font-semibold text-red-500">cannot</span> be undone.
              </p>

              {/* Actions */}
              <div className="pt-6 flex items-center justify-end gap-3">
                <button
                  onClick={() => setToDelete(null)}
                  className="px-5 py-2.5 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={deletePlayer}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-500 hover:to-pink-500 text-white font-medium shadow-md transition"
                >
                  <Trash2 className="w-4 h-4 inline mr-1" /> Delete
                </button>
              </div>
            </div>
          </div>
        </Modal>
      )}


      
      {/* Drawer: View / Manage */}
   {/* Drawer: View / Manage */}
{openDrawer && activePlayer && (
  <Drawer onClose={() => setOpenDrawer(false)}>
    <div className="w-full max-w-2xl h-full flex flex-col">
      {/* Drawer header */}
      <div className="flex items-center justify-between p-6 border-t border-gray-200 bg-gradient-to-t from-[#00CCCC] to-[#72A0C1] text-white" style={{ borderRadius : "10px"}}>
        <div>
          <div className="text-xl font-semibold flex items-center gap-2">
            <Gamepad2 className="w-6 h-6" /> Player #{activePlayer.id}
          </div>
          <div className="text-sm opacity-80">{activePlayer.username}</div>
        </div>
        <button onClick={() => setOpenDrawer(false)} className="p-2 rounded-lg hover:bg-red-600 transition-colors">
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Tabs */}
      <div className="px-6 py-4 border-b border-gray-100 flex gap-2 bg-gray-50">
        <TabButton active={drawerTab === "profile"} onClick={() => setDrawerTab("profile")}>
          Profile
        </TabButton>
        <TabButton active={drawerTab === "wallet"} onClick={() => setDrawerTab("wallet")}>
          Wallet
        </TabButton>
        <TabButton active={drawerTab === "history"} onClick={() => setDrawerTab("history")}>
          Match History
        </TabButton>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-6">
        {drawerTab === "profile" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-4 rounded-xl border border-gray-300 shadow-sm">
                <h3 className="font-medium text-gray-700 mb-3">Basic Information</h3>
                <LineItem label="Username" value={activePlayer.username} />
                <LineItem label="Status" value={activePlayer.status} />
                <LineItem label="Last Played" value={activePlayer.lastPlayedAt || "—"} />
                <LineItem label="Rank" value={activePlayer.rank} />
              </div>

              <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                <h3 className="font-medium text-gray-700 mb-3">Game Stats</h3>
                <LineItem label="Matches Played" value={activePlayer.matches.length} />
                <LineItem label="Current Balance" value={`₹ ${Number(activePlayer.coins).toFixed(2)}`} />
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-xl border border-blue-200 flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-blue-800">
                <span className="font-medium">Player Management:</span> Adjust coins and view detailed match history using the tabs above.
              </div>
            </div>
          </div>
        )}

        {drawerTab === "wallet" && (
          <CoinsPanel player={activePlayer} onAdjust={(amt) => adjustCoins(activePlayer.id, amt)} />
        )}

        {drawerTab === "history" && (
          <MatchHistoryPanel
            history={activePlayer.matches}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </div>
  </Drawer>
)}

      
    </div>
  );
}

/* -------------------------- UI Subcomponents -------------------------- */
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
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className="rounded-2xl bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 shadow-xl">
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
      <div className="absolute inset-y-0 right-0 w-full sm:w-[520px] max-w-[90vw] bg-white dark:bg-gray-950 border-l border-gray-200 dark:border-gray-800 shadow-2xl">
        {children}
      </div>
    </div>
  );
}

function TabButton({ children, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-colors ${active
          ? "bg-gray-900 text-white dark:bg-white dark:text-gray-900 border-transparent"
          : "bg-transparent text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-900"
        }`}
    >
      {children}
    </button>
  );
}

function LineItem({ label, value, valueClass = "", badgeClass }) {
  return (
    <div className="flex items-center justify-between gap-4 py-1.5">
      <div className="text-sm text-gray-500">{label}</div>
      {badgeClass ? (
        <span className={`px-2.5 py-1 rounded-full text-xs ${badgeClass}`}>{value}</span>
      ) : (
        <div className={`text-sm ${valueClass}`}>{value}</div>
      )}
    </div>
  );
}

function CoinsPanel({ player, onAdjust }) {
  const [amount, setAmount] = useState("");
  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-gray-200 dark:border-gray-800 p-4">
        <div className="text-sm text-gray-500">Current Coins</div>
        <div className="text-2xl font-semibold mt-1">₹ {Number(player.coins).toFixed(2)}</div>
      </div>

      <div className="rounded-xl border border-gray-200 dark:border-gray-800 p-4">
        <div className="text-sm font-medium mb-2 flex items-center gap-2">
          <DollarSign className="w-4 h-4 text-red-500" /> Adjust Coins
        </div>
        <div className="flex items-center gap-2">
          <input
            type="number"
            step="0.01"
            placeholder="Amount (e.g. 100)"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="flex-1 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-400"
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

      <div className="rounded-xl border border-gray-200 dark:border-gray-800 p-4">
        <div className="text-sm font-medium mb-2 flex items-center gap-2">
          <History className="w-4 h-4 text-gray-500" /> Quick Stats
        </div>
        <ul className="text-sm text-gray-600 dark:text-gray-300 list-disc list-inside space-y-1">
          <li>Total Matches: {player.matches.length}</li>
          <li>Last Played: {player.lastPlayedAt || "—"}</li>
        </ul>
      </div>
    </div>
  );
}

function MatchHistoryPanel({ history, itemsPerPage = 5, currentPage, onPageChange }) {
  if (!history || history.length === 0) {
    return (
      <div className="text-sm text-gray-500">
        No Ludo matches found for this player.
      </div>
    );
  }
 // Pagination for history
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = history.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <>
      <div className="space-y-3">
        {currentItems.map((h) => (
          <div
            key={h.id}
            className="rounded-xl border border-gray-200 dark:border-gray-800 p-3 flex items-center justify-between"
          >
            <div>
              <div className="font-medium text-sm">
                {h.mode} • {h.time}
              </div>
              <div className="text-xs text-gray-500">{h.id}</div>
            </div>
            <div className="text-right">
              <div className="text-sm">
                Points: {String(h.points).startsWith("+") 
                  ? `₹ ${h.points.replace("+", "")}` 
                  : `₹ ${h.points.replace("-", "")}`}
              </div>
              <div
                className={`text-sm font-semibold ${
                  String(h.result).toLowerCase() === "win"
                    ? "text-emerald-600"
                    : String(h.result).toLowerCase() === "loss"
                    ? "text-red-600"
                    : "text-gray-600"
                }`}
              >
                {h.result}
              </div>
            </div>
          </div>
        ))}
      </div>

      <Pagination
        totalPages={Math.ceil(history.length / itemsPerPage)}
        currentPage={currentPage}
        onPageChange={onPageChange}
      />
    </>
  );
}
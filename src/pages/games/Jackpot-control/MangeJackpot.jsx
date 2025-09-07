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
} from "lucide-react";

/**
 * JackpotUserManagement.jsx
 * Single-page admin UI for managing Jackpot game users.
 * - User table with search & filter
 * - Row actions: View (drawer), Delete
 * - Top action: Add User
 * - Drawer shows mini "page within page": Profile, Wallet (adjust balance), Bet History
 *
 * TailwindCSS required. Icons via lucide-react.
 */

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
    balance: 1250.5,
    status: "Active",
    lastBetAt: "2025-09-01 14:12",
    history: [
      { id: "b-1", time: "2025-09-01 14:12", bet: 50, result: "+150", game: "Jackpot Wheel" },
      { id: "b-2", time: "2025-08-31 21:40", bet: 20, result: "-20", game: "Rapid Jackpot" },
    ],
  },
  {
    id: 1002,
    username: "lucky777",
    balance: 320.0,
    status: "Block",
    lastBetAt: "2025-08-29 10:05",
    history: [
      { id: "b-3", time: "2025-08-29 10:05", bet: 10, result: "+0", game: "Jackpot Wheel" },
    ],
  },
  {
    id: 1003,
    username: "queenbee",
    balance: 5400.25,
    status: "Active",
    lastBetAt: "2025-08-28 18:20",
    history: [
      { id: "b-4", time: "2025-08-28 18:20", bet: 100, result: "+500", game: "Mega Jackpot" },
      { id: "b-5", time: "2025-08-25 15:00", bet: 75, result: "-75", game: "Rapid Jackpot" },
    ],
  },
  {
    id: 1004,
    username: "noobmaster",
    balance: 0,
    status: "Block",
    lastBetAt: "2025-08-15 09:55",
    history: [
      { id: "b-6", time: "2025-08-15 09:55", bet: 30, result: "-30", game: "Jackpot Wheel" },
    ],
  },
];

export default function JackpotUserManagement() {
  const [users, setUsers] = useState(initialUsers);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  // Add User Modal
  const [showAdd, setShowAdd] = useState(false);
  const [newUser, setNewUser] = useState({ username: "", balance: "", status: "Active" });

  // Delete confirm
  const [toDelete, setToDelete] = useState(null);

  // Drawer (View)
  const [openDrawer, setOpenDrawer] = useState(false);
  const [activeUser, setActiveUser] = useState(null);
  const [drawerTab, setDrawerTab] = useState("profile"); // profile | wallet | history

  const filtered = useMemo(() => {
    return users.filter((u) => {
      const matchesQuery =
        !query || u.username.toLowerCase().includes(query.toLowerCase()) || String(u.id).includes(query);
      const matchesStatus = statusFilter === "All" || u.status === statusFilter;
      return matchesQuery && matchesStatus;
    });
  }, [users, query, statusFilter]);

  const totalBalance = useMemo(() => users.reduce((sum, u) => sum + Number(u.balance || 0), 0), [users]);

  // Actions
  const openView = (user) => {
    setActiveUser(user);
    setDrawerTab("profile");
    setOpenDrawer(true);
  };

  const addUser = (e) => {
    e?.preventDefault?.();
    if (!newUser.username) return;
    const nextId = users.length ? Math.max(...users.map((u) => u.id)) + 1 : 1001;
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
    const rows = users.map((u) => [u.id, u.username, u.balance, u.status, u.lastBetAt]);
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
      {/* Header */}
      <div className="flex items-start md:items-center justify-between gap-4 flex-col md:flex-row">
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold tracking-tight flex items-center gap-2">
            <Wallet className="w-6 h-6 text-yellow-500" /> Jackpot – User Management
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Manage jackpot players, balances, statuses, and view bet history.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowAdd(true)}
            className="inline-flex items-center gap-2 rounded-xl px-4 py-2 bg-yellow-500 text-black font-medium hover:bg-yellow-400 shadow-sm"
          >
            <Plus className="w-4 h-4" /> Add User
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
        <KPI title="Total Users" value={users.length} />
        <KPI title="Active" value={users.filter((u) => u.status === "Active").length} tone="emerald" />
        <KPI title="Block" value={users.filter((u) => u.status === "Block").length} tone="amber" />
        <KPI title="Total Balance" value={`₹ ${totalBalance.toFixed(2)}`} />
      </div>

      {/* Filters */}
      <div className="mt-4 flex flex-col md:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            placeholder="Search by ID or username..."
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
            {/* <option>Banned</option> */}
          </select>
        </div>
      </div>

      {/* Table */}
      {/* Table */}
<div className="mt-4 overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm bg-white dark:bg-gray-950">
  <div className="overflow-x-auto">
    <table className="min-w-full text-sm">
      <thead className="text-white dark:text-gray-300 bg-gradient-to-t from-[#9890e3] to-[#b1f4cf]">
        <tr>
          <Th>ID</Th>
          <Th>Username</Th>
          <Th className="text-right">Balance (₹)</Th>
          <Th>Status</Th>
          <Th>Total Bets</Th> {/* ✅ NEW COLUMN */}
          <Th>Last Bet</Th>
          <Th className="text-right">Actions</Th>
        </tr>
      </thead>
      <tbody>
        {filtered.length === 0 && (
          <tr>
            <td colSpan={7} className="text-center py-8 text-gray-500">
              No users found.
            </td>
          </tr>
        )}
        {filtered.map((u) => (
          <tr
            key={u.id}
            className="border-t border-gray-100 dark:border-gray-800 hover:bg-gray-50/70 dark:hover:bg-gray-900/40"
          >
            <Td>#{u.id}</Td>
            <Td>
              <div className="font-medium">{u.username}</div>
              <div className="text-xs text-gray-500">Jackpot Player</div>
            </Td>
            <Td className="text-right font-semibold">{Number(u.balance).toFixed(2)}</Td>
            <Td>
              <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${STATUS_COLORS[u.status]}`}>
                {u.status}
              </span>
            </Td>
            <Td className="text-center">{u.history.length}</Td> {/* ✅ Show total bets */}
            <Td className="text-gray-500">{u.lastBetAt}</Td>
            <Td className="text-right">
              <div className="flex justify-end gap-1">
                {/* ✅ Wallet button instead of Eye */}
                <button
                  onClick={() => openView(u)}
                  className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-white hover:opacity-90"
                  style={{
                    backgroundImage: "linear-gradient(to top, #48c6ef 0%, #6f86d6 100%)",
                  }}
                  title="Wallet"
                >
                  <Wallet className="w-4 h-4" />
                </button>

                {/* ✅ Delete */}
                <button
                  onClick={() => setToDelete(u)}
                  className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-white hover:opacity-90"
                  style={{
                    backgroundImage:
                      "linear-gradient(to right, #f78ca0 0%, #f9748f 19%, #fd868c 60%, #fe9a8b 100%)",
                  }}
                  title="Delete user"
                >
                  <Trash2 className="w-4 h-4" />
                </button>

                {/* ✅ Block */}
                <button
                  onClick={() =>
                    setUsers((prev) =>
                      prev.map((usr) =>
                        usr.id === u.id ? { ...usr, status: "Banned" } : usr
                      )
                    )
                  }
                  className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-white hover:opacity-90"
                  style={{
                    backgroundImage: "linear-gradient(to right, #434343 0%, black 100%)",
                  }}
                  title="Block user"
                >
                  <Ban className="w-4 h-4" />
                </button>
              </div>
            </Td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>


      {/* Add User Modal */}
      {showAdd && (
        <Modal onClose={() => setShowAdd(false)}>
          <div className="w-[92vw] max-w-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Add Jackpot User</h3>
              <button onClick={() => setShowAdd(false)} className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800">
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
              <div>
                <label className="text-sm text-gray-600 dark:text-gray-300">Status</label>
                <select
                  className="mt-1 w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  value={newUser.status}
                  onChange={(e) => setNewUser((s) => ({ ...s, status: e.target.value }))}
                >
                  <option>Active</option>
                  <option>Block</option>
                  <option>Block</option>
                </select>
              </div>
              <div className="pt-2 flex items-center justify-end gap-2">
                <button type="button" onClick={() => setShowAdd(false)} className="px-4 py-2 rounded-xl bg-gray-100 dark:bg-gray-800">
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 rounded-xl bg-yellow-500 hover:bg-yellow-400 text-black font-medium">
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
          <div className="w-[92vw] max-w-md">
            <div className="flex items-center gap-2 text-red-600 mb-3">
              <Ban className="w-5 h-5" />
              <h3 className="text-lg font-semibold">Delete user?</h3>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              You are about to delete <strong>{toDelete.username}</strong> (#{toDelete.id}). This action cannot be undone.
            </p>
            <div className="pt-4 flex items-center justify-end gap-2">
              <button onClick={() => setToDelete(null)} className="px-4 py-2 rounded-xl bg-gray-100 dark:bg-gray-800">
                Cancel
              </button>
              <button onClick={deleteUser} className="px-4 py-2 rounded-xl bg-red-600 text-white hover:bg-red-500">
                <Trash2 className="w-4 h-4 inline mr-1" /> Delete
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* Drawer: Wallet Only */}
{openDrawer && activeUser && (
  <Drawer onClose={() => setOpenDrawer(false)}>
    <div className="w-[45vw] max-w-lg h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800">
        <div>
          <div className="text-lg font-semibold flex items-center gap-2">
            <Wallet className="w-5 h-5 text-yellow-500" /> Wallet – User #{activeUser.id}
          </div>
          <div className="text-sm text-gray-500">{activeUser.username}</div>
        </div>
        <button onClick={() => setOpenDrawer(false)} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Only Wallet Panel */}
      <div className="flex-1 overflow-auto p-4">
        <WalletPanel user={activeUser} onAdjust={(amt) => adjustBalance(activeUser.id, amt)} />
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
      className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-colors ${
        active
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

function WalletPanel({ user, onAdjust }) {
  const [amount, setAmount] = useState("");
  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-gray-200 dark:border-gray-800 p-4">
        <div className="text-sm text-gray-500">Current Balance</div>
        <div className="text-2xl font-semibold mt-1">₹ {Number(user.balance).toFixed(2)}</div>
      </div>

      <div className="rounded-xl border border-gray-200 dark:border-gray-800 p-4">
        <div className="text-sm font-medium mb-2 flex items-center gap-2">
          <DollarSign className="w-4 h-4 text-yellow-500" /> Adjust Balance
        </div>
        <div className="flex items-center gap-2">
          <input
            type="number"
            step="0.01"
            placeholder="Amount (e.g. 100)"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="flex-1 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
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

      {/* <div className="rounded-xl border border-gray-200 dark:border-gray-800 p-4">
        <div className="text-sm font-medium mb-2 flex items-center gap-2">
          <History className="w-4 h-4 text-gray-500" /> Quick Stats
        </div>
        <ul className="text-sm text-gray-600 dark:text-gray-300 list-disc list-inside space-y-1">
          <li>Total Bets: {user.history.length}</li>
          <li>Last Bet: {user.lastBetAt || "—"}</li>
        </ul>
      </div> */}
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
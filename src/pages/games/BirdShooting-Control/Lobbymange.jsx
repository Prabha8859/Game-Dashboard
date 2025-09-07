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
  Target,
  Bird,
  Users,
  UserCheck,
  UserX,
  Coins,
  BarChart3,
  Calendar,
  Award,
  Zap,
  User,
  Edit
} from "lucide-react";

const STATUS_COLORS = {
  Active: "bg-emerald-100 text-emerald-700 ring-1 ring-inset ring-emerald-200",
  Banned: "bg-red-100 text-red-700 ring-1 ring-inset ring-red-200",
  Suspended: "bg-amber-100 text-amber-800 ring-1 ring-inset ring-amber-200",
};

const initialUsers = [
  {
    id: 1001,
    username: "sharpshooter_neo",
    balance: 1250.5,
    status: "Active",
    lastBetAt: "2025-09-01 14:12",
    joinDate: "2023-05-10",
    totalShots: 42,
    accuracy: "78%",
    history: [
      { id: "b-1", time: "2025-09-01 14:12", bet: 50, result: "+150", game: "Classic Bird Shooting" },
      { id: "b-2", time: "2025-08-31 21:40", bet: 20, result: "-20", game: "Rapid Fire" },
    ],
  },
  {
    id: 1002,
    username: "eagle_eye",
    balance: 320.0,
    status: "Suspended",
    lastBetAt: "2025-08-29 10:05",
    joinDate: "2023-06-15",
    totalShots: 18,
    accuracy: "65%",
    history: [
      { id: "b-3", time: "2025-08-29 10:05", bet: 10, result: "+0", game: "Classic Bird Shooting" },
    ],
  },
  {
    id: 1003,
    username: "hawk_marksman",
    balance: 5400.25,
    status: "Active",
    lastBetAt: "2025-08-28 18:20",
    joinDate: "2023-04-22",
    totalShots: 127,
    accuracy: "82%",
    history: [
      { id: "b-4", time: "2025-08-28 18:20", bet: 100, result: "+500", game: "Tournament Mode" },
      { id: "b-5", time: "2025-08-25 15:00", bet: 75, result: "-75", game: "Rapid Fire" },
    ],
  },
  {
    id: 1004,
    username: "feather_hunter",
    balance: 0,
    status: "Banned",
    lastBetAt: "2025-08-15 09:55",
    joinDate: "2023-07-05",
    totalShots: 31,
    accuracy: "45%",
    history: [
      { id: "b-6", time: "2025-08-15 09:55", bet: 30, result: "-30", game: "Classic Bird Shooting" },
    ],
  },
];

export default function BirdShootingBetLobby() {
  const [users, setUsers] = useState(initialUsers);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  // Add User Modal
  const [showAdd, setShowAdd] = useState(false);
  const [newUser, setNewUser] = useState({ username: "", balance: "", status: "Active" });

  // Edit User Modal
  const [showEdit, setShowEdit] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  // Delete confirm
  const [toDelete, setToDelete] = useState(null);

  // Drawer (View)
  const [openDrawer, setOpenDrawer] = useState(false);
  const [activeUser, setActiveUser] = useState(null);
  const [drawerTab, setDrawerTab] = useState("profile");

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

  const openEdit = (user) => {
    setEditingUser({...user});
    setShowEdit(true);
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
      joinDate: new Date().toISOString().split('T')[0],
      totalShots: 0,
      accuracy: "0%",
      history: [],
    };
    setUsers((prev) => [u, ...prev]);
    setShowAdd(false);
    setNewUser({ username: "", balance: "", status: "Active" });
  };

  const updateUser = (e) => {
    e?.preventDefault?.();
    if (!editingUser) return;
    
    setUsers((prev) =>
      prev.map((u) =>
        u.id === editingUser.id
          ? {
              ...u,
              username: editingUser.username,
              status: editingUser.status,
              balance: Number(editingUser.balance || 0),
            }
          : u
      )
    );
    setShowEdit(false);
    setEditingUser(null);
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
    const header = ["ID", "Username", "Balance", "Status", "Last Shot At"]; 
    const rows = users.map((u) => [u.id, u.username, u.balance, u.status, u.lastBetAt]);
    const csv = [header, ...rows].map((r) => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `bird_shooting_users_${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="p-4 md:p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex items-start md:items-center justify-between gap-4 flex-col md:flex-row">
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold tracking-tight flex items-center gap-2">
            <Target className="w-6 h-6 text-blue-500" /> Bird Shooting – User Management
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage bird shooting players, balances, statuses, and view shooting history.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowAdd(true)}
            className="inline-flex items-center gap-2 rounded-xl px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium hover:from-blue-700 hover:to-indigo-700 shadow-md transition-all duration-300"
          >
            <Plus className="w-4 h-4" /> Add User
          </button>
          <button
            onClick={exportCSV}
            className="inline-flex items-center gap-2 rounded-xl px-4 py-2 bg-gradient-to-r from-gray-800 to-gray-900 text-white font-medium hover:opacity-90 shadow-md transition-all duration-300"
          >
            <Download className="w-4 h-4" /> Export CSV
          </button>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        <KPI title="Total Users" value={users.length} icon={<Users className="w-5 h-5" />} color="from-blue-500 to-cyan-500" />
        <KPI title="Active Players" value={users.filter((u) => u.status === "Active").length} icon={<UserCheck className="w-5 h-5" />} color="from-emerald-500 to-green-500" />
        <KPI title="Suspended/Banned" value={users.filter((u) => u.status !== "Active").length} icon={<UserX className="w-5 h-5" />} color="from-amber-500 to-orange-500" />
        <KPI title="Total Balance" value={`₹ ${totalBalance.toFixed(2)}`} icon={<Coins className="w-5 h-5" />} color="from-purple-500 to-pink-500" />
      </div>

      {/* Filters */}
      <div className="mt-6 flex flex-col md:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
            placeholder="Search by ID or username..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-gray-400" />
          <select
            className="rounded-xl border border-gray-200 bg-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
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
      <div className="mt-6 overflow-hidden rounded-2xl border border-gray-200 shadow-sm bg-white">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="text-white
bg-gradient-to-t from-[#8a80e0] to-[#8ee9b7]">
              <tr>
                <Th>ID</Th>
                <Th>Username</Th>
                <Th className="text-right">Balance (₹)</Th>
                <Th>Status</Th>
                <Th>Last Shot</Th>
                <Th className="text-right">Actions</Th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center py-8 text-gray-500">
                    No users found.
                  </td>
                </tr>
              )}
              {filtered.map((u) => (
                <tr
                  key={u.id}
                  className="border-t border-gray-100 hover:bg-gray-50/70 transition-colors duration-200"
                >
                  <Td>#{u.id}</Td>
                  <Td>
                    <div className="font-medium">{u.username}</div>
                    <div className="text-xs text-gray-500">Bird Shooting Player</div>
                  </Td>
                  <Td className="text-right font-semibold">{Number(u.balance).toFixed(2)}</Td>
                  <Td>
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${STATUS_COLORS[u.status]}`}>
                      {u.status}
                    </span>
                  </Td>
                  <Td className="text-gray-500">{u.lastBetAt}</Td>
                  <Td className="text-right">
                    <div className="flex justify-end gap-1">
                      <button
                        onClick={() => openView(u)}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-white hover:opacity-90 transition-all duration-300"
                        style={{
                          backgroundImage: "linear-gradient(to top, #48c6ef 0%, #6f86d6 100%)",
                        }}
                        title="View / Manage"
                      >
                        <Eye className="w-4 h-4" /> 
                      </button>

                      <button
                        onClick={() => openEdit(u)}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-white hover:opacity-90 transition-all duration-300"
                        style={{
                          backgroundImage: "linear-gradient(to top, #5f72bd 0%, #9b59b6 100%)",
                        }}
                        title="Edit user"
                      >
                        <Edit className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => setToDelete(u)}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-white hover:opacity-90 transition-all duration-300"
                        style={{
                          backgroundImage:
                            "linear-gradient(to right, #f78ca0 0%, #f9748f 19%, #fd868c 60%, #fe9a8b 100%)",
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

      {/* Add User Modal */}
      {showAdd && (
        <Modal onClose={() => setShowAdd(false)}>
          <div className="w-[92vw] max-w-md">
            <div className="flex items-center justify-between mb-4 p-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Plus className="w-5 h-5 text-blue-500" /> Add Bird Shooting User
              </h3>
              <button onClick={() => setShowAdd(false)} className="p-1 rounded-lg hover:bg-gray-100 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={addUser} className="space-y-4 p-4">
              <div>
                <label className="text-sm text-gray-600 font-medium mb-1 block">Username</label>
                <input
                  required
                  className="mt-1 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
                  value={newUser.username}
                  onChange={(e) => setNewUser((s) => ({ ...s, username: e.target.value }))}
                  placeholder="e.g. sharp_shooter"
                />
              </div>
              <div>
                <label className="text-sm text-gray-600 font-medium mb-1 block">Initial Balance (₹)</label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  className="mt-1 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
                  value={newUser.balance}
                  onChange={(e) => setNewUser((s) => ({ ...s, balance: e.target.value }))}
                  placeholder="0.00"
                />
              </div>
              <div>
                <label className="text-sm text-gray-600 font-medium mb-1 block">Status</label>
                <select
                  className="mt-1 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
                  value={newUser.status}
                  onChange={(e) => setNewUser((s) => ({ ...s, status: e.target.value }))}
                >
                  <option>Active</option>
                  <option>Suspended</option>
                  <option>Banned</option>
                </select>
              </div>
              <div className="pt-2 flex items-center justify-end gap-2">
                <button type="button" onClick={() => setShowAdd(false)} className="px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors">
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 rounded-xl
bg-gradient-to-t from-[#9890e3] to-[#b1f4cf] hover:from-blue-700 hover:to-indigo-700 text-white font-medium transition-all duration-300">
                  <Check className="w-4 h-4 inline mr-1" /> Add User
                </button>
              </div>
            </form>
          </div>
        </Modal>
      )}

      {/* Edit User Modal */}
      {showEdit && editingUser && (
        <Modal onClose={() => setShowEdit(false)}>
          <div className="w-[92vw] max-w-md">
            <div className="flex items-center justify-between mb-4 p-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Edit className="w-5 h-5 text-blue-500" /> Edit Bird Shooting User
              </h3>
              <button onClick={() => setShowEdit(false)} className="p-1 rounded-lg hover:bg-gray-100 transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={updateUser} className="space-y-4 p-4">
              <div>
                <label className="text-sm text-gray-600 font-medium mb-1 block">Username</label>
                <input
                  required
                  className="mt-1 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
                  value={editingUser.username}
                  onChange={(e) => setEditingUser((s) => ({ ...s, username: e.target.value }))}
                  placeholder="e.g. sharp_shooter"
                />
              </div>
              <div>
                <label className="text-sm text-gray-600 font-medium mb-1 block">Balance (₹)</label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  className="mt-1 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
                  value={editingUser.balance}
                  onChange={(e) => setEditingUser((s) => ({ ...s, balance: e.target.value }))}
                  placeholder="0.00"
                />
              </div>
              <div>
                <label className="text-sm text-gray-600 font-medium mb-1 block">Status</label>
                <select
                  className="mt-1 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
                  value={editingUser.status}
                  onChange={(e) => setEditingUser((s) => ({ ...s, status: e.target.value }))}
                >
                  <option>Active</option>
                  <option>Suspended</option>
                  <option>Banned</option>
                </select>
              </div>
              <div className="pt-2 flex items-center justify-end gap-2">
                <button type="button" onClick={() => setShowEdit(false)} className="px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors">
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 rounded-xl
bg-gradient-to-t from-[#9890e3] to-[#b1f4cf] hover:from-blue-700 hover:to-indigo-700 text-white font-medium transition-all duration-300">
                  <Check className="w-4 h-4 inline mr-1" /> Update User
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
            <div className="flex items-center gap-2 text-red-600 mb-3 p-4 border-b border-red-100">
              <Ban className="w-5 h-5" />
              <h3 className="text-lg font-semibold">Delete user?</h3>
            </div>
            <div className="p-4">
              <p className="text-sm text-gray-600">
                You are about to delete <strong>{toDelete.username}</strong> (#{toDelete.id}). This action cannot be undone.
              </p>
              <div className="pt-4 flex items-center justify-end gap-2">
                <button onClick={() => setToDelete(null)} className="px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 transition-colors">
                  Cancel
                </button>
                <button onClick={deleteUser} className="px-4 py-2 rounded-xl bg-red-600 text-white hover:bg-red-500 transition-colors">
                  <Trash2 className="w-4 h-4 inline mr-1" /> Delete
                </button>
              </div>
            </div>
          </div>
        </Modal>
      )}

      {/* Drawer: View / Manage */}
      {openDrawer && activeUser && (
        <Drawer onClose={() => setOpenDrawer(false)}>
          <div className="w-full max-w-2xl h-full flex flex-col">
            {/* Drawer header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
              <div>
                <div className="text-xl font-semibold flex items-center gap-2">
                  <Bird className="w-6 h-6" /> User #{activeUser.id}
                </div>
                <div className="text-sm opacity-80">{activeUser.username}</div>
              </div>
              <button onClick={() => setOpenDrawer(false)} className="p-2 rounded-lg hover:bg-blue-700 transition-colors">
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
                Shooting History
              </TabButton>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-auto p-6">
              {drawerTab === "profile" && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                      <h3 className="font-medium text-gray-700 mb-3">Basic Information</h3>
                      <LineItem label="Username" value={activeUser.username} />
                      <LineItem label="Status" value={activeUser.status} valueClass="font-medium" badgeClass={STATUS_COLORS[activeUser.status]} />
                      <LineItem label="Join Date" value={activeUser.joinDate} />
                      <LineItem label="Last Activity" value={activeUser.lastBetAt || "—"} />
                    </div>
                    
                    <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
                      <h3 className="font-medium text-gray-700 mb-3">Shooting Stats</h3>
                      <LineItem label="Total Shots" value={activeUser.totalShots} />
                      <LineItem label="Accuracy" value={activeUser.accuracy} />
                      <LineItem label="Current Balance" value={`₹ ${Number(activeUser.balance).toFixed(2)}`} valueClass="font-semibold text-blue-600" />
                    </div>
                  </div>
                  
                  <div className="bg-blue-50 p-4 rounded-xl border border-blue-200 flex items-start gap-3">
                    <ShieldCheck className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <div className="text-sm text-blue-800">
                      <span className="font-medium">Bird Shooting Management:</span> Adjust balances and view detailed shooting history using the tabs above.
                    </div>
                  </div>
                </div>
              )}

              {drawerTab === "wallet" && (
                <WalletPanel user={activeUser} onAdjust={(amt) => adjustBalance(activeUser.id, amt)} />
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

/* -------------------------- UI Subcomponents -------------------------- */
function KPI({ title, value, icon, color }) {
  return (
    <div className={`rounded-2xl border border-gray-200 p-5 bg-gradient-to-r ${color} text-white transform transition-all duration-300 hover:scale-105`}>
      <div className="flex justify-between items-start">
        <div>
          <div className="text-xs uppercase tracking-wider opacity-80">{title}</div>
          <div className="text-xl font-semibold mt-1">{value}</div>
        </div>
        <div className="bg-white/20 p-2 rounded-xl">
          {icon}
        </div>
      </div>
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="rounded-2xl bg-white border border-gray-200 shadow-xl">
        {children}
      </div>
    </div>
  );
}

function Drawer({ children, onClose }) {
  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="absolute inset-y-0 right-0 w-full max-w-2xl bg-white border-l border-gray-200 shadow-2xl overflow-y-auto">
        {children}
      </div>
    </div>
  );
}

function TabButton({ children, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2.5 rounded-lg text-sm font-medium border transition-all duration-300 ${
        active
          ? "bg-blue-600 text-white border-transparent shadow-sm"
          : "bg-transparent text-gray-600 border-gray-200 hover:bg-gray-100"
      }`}
    >
      {children}
    </button>
  );
}

function LineItem({ label, value, valueClass = "", badgeClass }) {
  return (
    <div className="flex items-center justify-between gap-4 py-2.5 border-b border-gray-100 last:border-b-0">
      <div className="text-sm text-gray-600">{label}</div>
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
  const [transactionType, setTransactionType] = useState("credit");
  
  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl p-5 text-white">
        <div className="text-sm opacity-80">Current Balance</div>
        <div className="text-3xl font-semibold mt-1">₹ {Number(user.balance).toFixed(2)}</div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
        <div className="text-sm font-medium mb-3 flex items-center gap-2 text-gray-700">
          <DollarSign className="w-4 h-4 text-blue-500" /> Adjust Balance
        </div>
        
        <div className="flex gap-3 mb-4">
          <button
            onClick={() => setTransactionType("credit")}
            className={`flex-1 py-2 rounded-xl border transition-all duration-300 ${
              transactionType === "credit" 
                ? "bg-emerald-100 text-emerald-700 border-emerald-200" 
                : "bg-gray-100 text-gray-600 border-gray-200"
            }`}
          >
            Credit
          </button>
          <button
            onClick={() => setTransactionType("debit")}
            className={`flex-1 py-2 rounded-xl border transition-all duration-300 ${
              transactionType === "debit" 
                ? "bg-red-100 text-red-700 border-red-200" 
                : "bg-gray-100 text-gray-600 border-gray-200"
            }`}
          >
            Debit
          </button>
        </div>
        
        <div className="flex items-center gap-2">
          <input
            type="number"
            step="0.01"
            placeholder="Amount (e.g. 100)"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="flex-1 rounded-xl border border-gray-200 bg-white px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={() => {
              if (!amount) return;
              const adjustment = transactionType === "credit" ? Number(amount) : -Number(amount);
              onAdjust(adjustment);
              setAmount("");
            }}
            className={`px-4 py-2.5 rounded-xl text-white font-medium ${
              transactionType === "credit" 
                ? "bg-emerald-500 hover:bg-emerald-600" 
                : "bg-red-500 hover:bg-red-600"
            }`}
          >
            {transactionType === "credit" ? "Add Funds" : "Deduct Funds"}
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
        <div className="text-sm font-medium mb-3 flex items-center gap-2 text-gray-700">
          Quick Stats
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-gray-50 p-3 rounded-lg">
            <div className="text-xs text-gray-500">Total Shots</div>
            <div className="font-semibold">{user.history.length}</div>
          </div>
          <div className="bg-gray-50 p-3 rounded-lg">
            <div className="text-xs text-gray-500">Last Shot</div>
            <div className="font-semibold">{user.lastBetAt || "—"}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function HistoryPanel({ history }) {
  if (!history || history.length === 0) {
    return (
      <div className="text-center py-8">
        <Target className="w-12 h-12 text-gray-300 mx-auto mb-3" />
        <div className="text-sm text-gray-500">No bird shooting history found for this user.</div>
      </div>
    );
  }
  return (
    <div className="space-y-3">
      {history.map((h) => (
        <div
          key={h.id}
          className="bg-white rounded-xl border border-gray-200 p-4 flex items-center justify-between shadow-sm"
        >
          <div>
            <div className="font-medium text-sm">{h.game}</div>
            <div className="text-xs text-gray-500 mt-1">{h.time}</div>
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
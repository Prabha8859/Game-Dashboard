
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
  Edit,
  Phone,
  TrendingUp,
  TrendingDown,
  Flag,
  Shield,
  Play,
  Pause,
  Settings,
  Crown,
  Star,
  AlertTriangle
} from "lucide-react";

const STATUS_COLORS = {
  Active: "bg-emerald-100 text-emerald-700 ring-1 ring-inset ring-emerald-200",
  Banned: "bg-red-100 text-red-700 ring-1 ring-inset ring-red-200",
  Suspended: "bg-amber-100 text-amber-800 ring-1 ring-inset ring-amber-200",
  Flagged: "bg-orange-100 text-orange-700 ring-1 ring-inset ring-orange-200",
};

const SESSION_COLORS = {
  Ongoing: "bg-blue-100 text-blue-700 ring-1 ring-inset ring-blue-200",
  Completed: "bg-green-100 text-green-700 ring-1 ring-inset ring-green-200",
  Cancelled: "bg-gray-100 text-gray-700 ring-1 ring-inset ring-gray-200",
};

const BIRD_COLORS = {
  Active: "bg-green-100 text-green-700 ring-1 ring-inset ring-green-200",
  Inactive: "bg-red-100 text-red-700 ring-1 ring-inset ring-red-200",
};

// Sample Data
const initialUsers = [
  {
    id: 1001,
    username: "sharpshooter_neo",
    mobile: "+91 98765 43210",
    balance: 1250.5,
    status: "Active",
    lastBetAt: "2025-09-01 14:12",
    joinDate: "2023-05-10",
    totalShots: 42,
    accuracy: "78%",
    totalCoinsWon: 3200,
    totalCoinsLost: 1850,
    biggestPrize: 500,
    isFraudFlagged: false,
    history: [
      { id: "b-1", time: "2025-09-01 14:12", bet: 50, result: "+150", game: "Classic Bird Shooting" },
      { id: "b-2", time: "2025-08-31 21:40", bet: 20, result: "-20", game: "Rapid Fire" },
    ],
  },
  {
    id: 1002,
    username: "eagle_eye",
    mobile: "+91 87654 32109",
    balance: 320.0,
    status: "Suspended",
    lastBetAt: "2025-08-29 10:05",
    joinDate: "2023-06-15",
    totalShots: 18,
    accuracy: "65%",
    totalCoinsWon: 890,
    totalCoinsLost: 1200,
    biggestPrize: 200,
    isFraudFlagged: false,
    history: [
      { id: "b-3", time: "2025-08-29 10:05", bet: 10, result: "+0", game: "Classic Bird Shooting" },
    ],
  },
  {
    id: 1003,
    username: "hawk_marksman",
    mobile: "+91 76543 21098",
    balance: 5400.25,
    status: "Active",
    lastBetAt: "2025-08-28 18:20",
    joinDate: "2023-04-22",
    totalShots: 127,
    accuracy: "82%",
    totalCoinsWon: 8900,
    totalCoinsLost: 3200,
    biggestPrize: 1500,
    isFraudFlagged: false,
    history: [
      { id: "b-4", time: "2025-08-28 18:20", bet: 100, result: "+500", game: "Tournament Mode" },
      { id: "b-5", time: "2025-08-25 15:00", bet: 75, result: "-75", game: "Rapid Fire" },
    ],
  },
  {
    id: 1004,
    username: "feather_hunter",
    mobile: "+91 65432 10987",
    balance: 0,
    status: "Flagged",
    lastBetAt: "2025-08-15 09:55",
    joinDate: "2023-07-05",
    totalShots: 31,
    accuracy: "45%",
    totalCoinsWon: 450,
    totalCoinsLost: 1850,
    biggestPrize: 100,
    isFraudFlagged: true,
    history: [
      { id: "b-6", time: "2025-08-15 09:55", bet: 30, result: "-30", game: "Classic Bird Shooting" },
    ],
  },
];

const initialSessions = [
  {
    id: "S001",
    userId: 1001,
    username: "sharpshooter_neo",
    bulletsPurchased: 10,
    coinsSpent: 100,
    birdsShot: [
      { type: "Small Bird", count: 5, reward: 150 },
      { type: "Big Bird", count: 2, reward: 200 }
    ],
    totalReward: 350,
    netProfitLoss: 250,
    status: "Completed",
    startTime: "2025-09-01 14:00",
    endTime: "2025-09-01 14:12"
  },
  {
    id: "S002",
    userId: 1002,
    username: "eagle_eye",
    bulletsPurchased: 5,
    coinsSpent: 50,
    birdsShot: [
      { type: "Small Bird", count: 2, reward: 60 }
    ],
    totalReward: 60,
    netProfitLoss: 10,
    status: "Completed",
    startTime: "2025-08-29 10:00",
    endTime: "2025-08-29 10:05"
  },
  {
    id: "S003",
    userId: 1003,
    username: "hawk_marksman",
    bulletsPurchased: 15,
    coinsSpent: 150,
    birdsShot: [
      { type: "Golden Bird", count: 1, reward: 500 }
    ],
    totalReward: 500,
    netProfitLoss: 350,
    status: "Ongoing",
    startTime: "2025-09-02 10:30",
    endTime: null
  }
];

const initialBirdTypes = [
  {
    id: "BT001",
    name: "Small Bird",
    type: "Common",
    rewardCoins: 30,
    probability: 60,
    status: "Active",
    color: "#22c55e"
  },
  {
    id: "BT002", 
    name: "Big Bird",
    type: "Rare",
    rewardCoins: 100,
    probability: 25,
    status: "Active",
    color: "#3b82f6"
  },
  {
    id: "BT003",
    name: "Golden Bird",
    type: "Epic",
    rewardCoins: 500,
    probability: 10,
    status: "Active",
    color: "#f59e0b"
  },
  {
    id: "BT004",
    name: "Diamond Bird",
    type: "Legendary",
    rewardCoins: 1000,
    probability: 3,
    status: "Inactive",
    color: "#8b5cf6"
  },
  {
    id: "BT005",
    name: "Phoenix Bird",
    type: "Mythical",
    rewardCoins: 2500,
    probability: 1,
    status: "Active",
    color: "#ef4444"
  }
];

export default function BirdShootingAdmin() {
  const [activeTab, setActiveTab] = useState("users");
  const [users, setUsers] = useState(initialUsers);
  const [sessions, setSessions] = useState(initialSessions);
  const [birdTypes, setBirdTypes] = useState(initialBirdTypes);
  
  // Search and Filter States
  const [userQuery, setUserQuery] = useState("");
  const [userStatusFilter, setUserStatusFilter] = useState("All");
  const [sessionQuery, setSessionQuery] = useState("");
  const [sessionStatusFilter, setSessionStatusFilter] = useState("All");
  const [birdQuery, setBirdQuery] = useState("");
  const [birdStatusFilter, setBirdStatusFilter] = useState("All");

  // Modal States
  const [showAddUser, setShowAddUser] = useState(false);
  const [showAddSession, setShowAddSession] = useState(false);
  const [showAddBird, setShowAddBird] = useState(false);
  const [showEditUser, setShowEditUser] = useState(false);
  const [showEditSession, setShowEditSession] = useState(false);
  const [showEditBird, setShowEditBird] = useState(false);
  const [showViewUser, setShowViewUser] = useState(false);
  const [showViewSession, setShowViewSession] = useState(false);
  
  const [editingItem, setEditingItem] = useState(null);
  const [viewingItem, setViewingItem] = useState(null);
  const [toDelete, setToDelete] = useState(null);
  const [deleteType, setDeleteType] = useState("");

  // New item forms
  const [newUser, setNewUser] = useState({
    username: "", mobile: "", balance: "", status: "Active"
  });
  const [newSession, setNewSession] = useState({
    userId: "", bulletsPurchased: "", coinsSpent: "", status: "Ongoing"
  });
  const [newBird, setNewBird] = useState({
    name: "", type: "Common", rewardCoins: "", probability: "", status: "Active", color: "#22c55e"
  });

  // Filtered data
  const filteredUsers = useMemo(() => {
    return users.filter((u) => {
      const matchesQuery = !userQuery || 
        u.username.toLowerCase().includes(userQuery.toLowerCase()) || 
        String(u.id).includes(userQuery) ||
        u.mobile.includes(userQuery);
      const matchesStatus = userStatusFilter === "All" || u.status === userStatusFilter;
      return matchesQuery && matchesStatus;
    });
  }, [users, userQuery, userStatusFilter]);

  const filteredSessions = useMemo(() => {
    return sessions.filter((s) => {
      const matchesQuery = !sessionQuery || 
        s.id.toLowerCase().includes(sessionQuery.toLowerCase()) ||
        s.username.toLowerCase().includes(sessionQuery.toLowerCase());
      const matchesStatus = sessionStatusFilter === "All" || s.status === sessionStatusFilter;
      return matchesQuery && matchesStatus;
    });
  }, [sessions, sessionQuery, sessionStatusFilter]);

  const filteredBirds = useMemo(() => {
    return birdTypes.filter((b) => {
      const matchesQuery = !birdQuery || 
        b.name.toLowerCase().includes(birdQuery.toLowerCase()) ||
        b.type.toLowerCase().includes(birdQuery.toLowerCase());
      const matchesStatus = birdStatusFilter === "All" || b.status === birdStatusFilter;
      return matchesQuery && matchesStatus;
    });
  }, [birdTypes, birdQuery, birdStatusFilter]);

  // KPI calculations
  const totalUsers = users.length;
  const activeUsers = users.filter(u => u.status === "Active").length;
  const flaggedUsers = users.filter(u => u.isFraudFlagged).length;
  const totalBalance = users.reduce((sum, u) => sum + Number(u.balance || 0), 0);
  const totalSessions = sessions.length;
  const ongoingSessions = sessions.filter(s => s.status === "Ongoing").length;
  const totalCoinsWon = users.reduce((sum, u) => sum + Number(u.totalCoinsWon || 0), 0);
  const activeBirds = birdTypes.filter(b => b.status === "Active").length;

  // CRUD Operations
  const addUser = (e) => {
    e?.preventDefault();
    if (!newUser.username || !newUser.mobile) return;
    const nextId = Math.max(...users.map(u => u.id)) + 1;
    const user = {
      id: nextId,
      username: newUser.username.trim(),
      mobile: newUser.mobile.trim(),
      balance: Number(newUser.balance || 0),
      status: newUser.status,
      lastBetAt: "—",
      joinDate: new Date().toISOString().split('T')[0],
      totalShots: 0,
      accuracy: "0%",
      totalCoinsWon: 0,
      totalCoinsLost: 0,
      biggestPrize: 0,
      isFraudFlagged: false,
      history: []
    };
    setUsers(prev => [user, ...prev]);
    setShowAddUser(false);
    setNewUser({ username: "", mobile: "", balance: "", status: "Active" });
  };

  const updateUser = (e) => {
    e?.preventDefault();
    if (!editingItem) return;
    
    setUsers(prev => prev.map(u => 
      u.id === editingItem.id 
        ? {
            ...u,
            username: editingItem.username,
            mobile: editingItem.mobile,
            status: editingItem.status,
            balance: Number(editingItem.balance || 0)
          }
        : u
    ));
    setShowEditUser(false);
    setEditingItem(null);
  };

  const addSession = (e) => {
    e?.preventDefault();
    if (!newSession.userId || !newSession.bulletsPurchased) return;
    const nextId = `S${String(sessions.length + 1).padStart(3, '0')}`;
    const user = users.find(u => u.id === Number(newSession.userId));
    const session = {
      id: nextId,
      userId: Number(newSession.userId),
      username: user?.username || "Unknown",
      bulletsPurchased: Number(newSession.bulletsPurchased),
      coinsSpent: Number(newSession.coinsSpent || 0),
      birdsShot: [],
      totalReward: 0,
      netProfitLoss: -Number(newSession.coinsSpent || 0),
      status: newSession.status,
      startTime: new Date().toISOString().replace('T', ' ').split('.')[0],
      endTime: newSession.status === "Completed" ? new Date().toISOString().replace('T', ' ').split('.')[0] : null
    };
    setSessions(prev => [session, ...prev]);
    setShowAddSession(false);
    setNewSession({ userId: "", bulletsPurchased: "", coinsSpent: "", status: "Ongoing" });
  };

  const updateSession = (e) => {
    e?.preventDefault();
    if (!editingItem) return;
    
    setSessions(prev => prev.map(s => 
      s.id === editingItem.id 
        ? {
            ...s,
            bulletsPurchased: Number(editingItem.bulletsPurchased),
            coinsSpent: Number(editingItem.coinsSpent),
            status: editingItem.status,
            endTime: editingItem.status === "Completed" ? new Date().toISOString().replace('T', ' ').split('.')[0] : null
          }
        : s
    ));
    setShowEditSession(false);
    setEditingItem(null);
  };

  const addBird = (e) => {
    e?.preventDefault();
    if (!newBird.name || !newBird.rewardCoins) return;
    const nextId = `BT${String(birdTypes.length + 1).padStart(3, '0')}`;
    const bird = {
      id: nextId,
      name: newBird.name.trim(),
      type: newBird.type,
      rewardCoins: Number(newBird.rewardCoins),
      probability: Number(newBird.probability || 0),
      status: newBird.status,
      color: newBird.color
    };
    setBirdTypes(prev => [bird, ...prev]);
    setShowAddBird(false);
    setNewBird({ name: "", type: "Common", rewardCoins: "", probability: "", status: "Active", color: "#22c55e" });
  };

  const updateBird = (e) => {
    e?.preventDefault();
    if (!editingItem) return;
    
    setBirdTypes(prev => prev.map(b => 
      b.id === editingItem.id 
        ? {
            ...b,
            name: editingItem.name,
            type: editingItem.type,
            rewardCoins: Number(editingItem.rewardCoins),
            probability: Number(editingItem.probability),
            status: editingItem.status,
            color: editingItem.color
          }
        : b
    ));
    setShowEditBird(false);
    setEditingItem(null);
  };

  const deleteItem = () => {
    if (!toDelete || !deleteType) return;
    
    if (deleteType === "user") {
      setUsers(prev => prev.filter(u => u.id !== toDelete.id));
    } else if (deleteType === "session") {
      setSessions(prev => prev.filter(s => s.id !== toDelete.id));
    } else if (deleteType === "bird") {
      setBirdTypes(prev => prev.filter(b => b.id !== toDelete.id));
    }
    
    setToDelete(null);
    setDeleteType("");
  };

  const toggleUserBan = (userId) => {
    setUsers(prev => prev.map(u => 
      u.id === userId 
        ? { ...u, status: u.status === "Banned" ? "Active" : "Banned" }
        : u
    ));
  };

  const toggleUserFlag = (userId) => {
    setUsers(prev => prev.map(u => 
      u.id === userId 
        ? { ...u, isFraudFlagged: !u.isFraudFlagged, status: !u.isFraudFlagged ? "Flagged" : "Active" }
        : u
    ));
  };

  const toggleBirdStatus = (birdId) => {
    setBirdTypes(prev => prev.map(b => 
      b.id === birdId 
        ? { ...b, status: b.status === "Active" ? "Inactive" : "Active" }
        : b
    ));
  };

  const adjustBalance = (userId, amount) => {
    setUsers(prev => prev.map(u => 
      u.id === userId 
        ? { ...u, balance: Math.max(0, Number(u.balance) + Number(amount)) }
        : u
    ));
  };

  const exportCSV = () => {
    let data, filename, headers;
    
    if (activeTab === "users") {
      headers = ["ID", "Username", "Mobile", "Balance", "Status", "Total Shots", "Coins Won", "Coins Lost", "Biggest Prize"];
      data = users.map(u => [u.id, u.username, u.mobile, u.balance, u.status, u.totalShots, u.totalCoinsWon, u.totalCoinsLost, u.biggestPrize]);
      filename = `bird_shooting_users_${Date.now()}.csv`;
    } else if (activeTab === "sessions") {
      headers = ["Session ID", "User ID", "Username", "Bullets", "Coins Spent", "Total Reward", "Net P/L", "Status"];
      data = sessions.map(s => [s.id, s.userId, s.username, s.bulletsPurchased, s.coinsSpent, s.totalReward, s.netProfitLoss, s.status]);
      filename = `bird_shooting_sessions_${Date.now()}.csv`;
    } else {
      headers = ["ID", "Name", "Type", "Reward Coins", "Probability", "Status"];
      data = birdTypes.map(b => [b.id, b.name, b.type, b.rewardCoins, b.probability, b.status]);
      filename = `bird_shooting_birds_${Date.now()}.csv`;
    }
    
    const csv = [headers, ...data].map(r => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200  z-40">  
        <div className="px-4 md:px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900 flex items-center gap-2">
                <Target className="w-8 h-8 text-blue-600" />
                Bird Shooting Admin Panel
              </h1>
              <p className="text-sm text-gray-500 mt-1">
                Complete management system for bird shooting game
              </p>
            </div>
            <button
              onClick={exportCSV}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
            >
              <Download className="w-4 h-4" />
              Export CSV
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gray-200  z-30">
        <div className="px-4 md:px-6">
          <div className="flex gap-1 overflow-x-auto py-2">
            <TabButton 
              active={activeTab === "users"} 
              onClick={() => setActiveTab("users")}
              icon={<Users className="w-4 h-4" />}
            >
              User Management
            </TabButton>
            <TabButton 
              active={activeTab === "sessions"} 
              onClick={() => setActiveTab("sessions")}
              icon={<Play className="w-4 h-4" />}
            >
              Game Sessions
            </TabButton>
            <TabButton 
              active={activeTab === "birds"} 
              onClick={() => setActiveTab("birds")}
              icon={<Bird className="w-4 h-4" />}
            >
              Bird Types & Rewards
            </TabButton>
          </div>
        </div>
      </div>

      <div className="p-4 md:p-6 max-w-7xl mx-auto">
        {/* Users Management */}
        {activeTab === "users" && (
          <>
            {/* KPIs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <KPICard 
                title="Total Users" 
                value={totalUsers} 
                icon={<Users className="w-5 h-5" />} 
                color="border-t-blue-500" 
              />
              <KPICard 
                title="Active Players" 
                value={activeUsers} 
                icon={<UserCheck className="w-5 h-5" />} 
                color="border-t-green-500" 
              />
              <KPICard 
                title="Flagged Users" 
                value={flaggedUsers} 
                icon={<Flag className="w-5 h-5" />} 
                color="border-t-red-500" 
              />
              <KPICard 
                title="Total Balance" 
                value={`₹ ${totalBalance.toFixed(2)}`} 
                icon={<Wallet className="w-5 h-5" />} 
                color="border-t-purple-500" 
              />
            </div>

            {/* Controls */}
            <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6">
              <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
                <div className="flex flex-col md:flex-row gap-3 flex-1">
                  <div className="relative flex-1">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Search by ID, username, or mobile..."
                      value={userQuery}
                      onChange={(e) => setUserQuery(e.target.value)}
                    />
                  </div>
                  <select
                    className="rounded-lg border border-gray-300 px-3 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={userStatusFilter}
                    onChange={(e) => setUserStatusFilter(e.target.value)}
                  >
                    <option>All</option>
                    <option>Active</option>
                    <option>Suspended</option>
                    <option>Banned</option>
                    <option>Flagged</option>
                  </select>
                </div>
                <button
                  onClick={() => setShowAddUser(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg flex items-center gap-2 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Add User
                </button>
              </div>
            </div>

            {/* Users Table */}
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="text-left px-4 py-3 font-medium text-gray-900">User Details</th>
                      <th className="text-right px-4 py-3 font-medium text-gray-900">Balance</th>
                      <th className="text-center px-4 py-3 font-medium text-gray-900">Shots</th>
                      <th className="text-center px-4 py-3 font-medium text-gray-900">Coins Won/Lost</th>
                      <th className="text-center px-4 py-3 font-medium text-gray-900">Biggest Prize</th>
                      <th className="text-center px-4 py-3 font-medium text-gray-900">Status</th>
                      <th className="text-center px-4 py-3 font-medium text-gray-900">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.length === 0 && (
                      <tr>
                        <td colSpan={7} className="text-center py-8 text-gray-500">
                          No users found
                        </td>
                      </tr>
                    )}
                    {filteredUsers.map((user) => (
                      <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="px-4 py-3">
                          <div>
                            <div className="font-medium text-gray-900">#{user.id} - {user.username}</div>
                            <div className="text-sm text-gray-500 flex items-center gap-1">
                              <Phone className="w-3 h-3" />
                              {user.mobile}
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-right font-semibold text-blue-600">
                          ₹ {Number(user.balance).toFixed(2)}
                        </td>
                        <td className="px-4 py-3 text-center">
                          <div className="text-sm">
                            <div className="font-medium">{user.totalShots}</div>
                            <div className="text-gray-500">{user.accuracy}</div>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-center">
                          <div className="text-sm">
                            <div className="text-green-600 font-medium">+₹{user.totalCoinsWon}</div>
                            <div className="text-red-600">-₹{user.totalCoinsLost}</div>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-center">
                          <div className="font-semibold text-yellow-600 flex items-center justify-center gap-1">
                            <Crown className="w-4 h-4" />
                            ₹{user.biggestPrize}
                          </div>
                        </td>
                        <td className="px-4 py-3 text-center">
                          <div className="flex flex-col gap-1 items-center">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${STATUS_COLORS[user.status]}`}>
                              {user.status}
                            </span>
                            {user.isFraudFlagged && (
                              <span className="px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-700 flex items-center gap-1">
                                <Flag className="w-3 h-3" />
                                Fraud
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex justify-center gap-1">
                            <button
                              onClick={() => {setViewingItem(user); setShowViewUser(true);}}
                              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                              title="View Details"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => {setEditingItem({...user}); setShowEditUser(true);}}
                              className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg"
                              title="Edit User"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => toggleUserBan(user.id)}
                              className={`p-2 rounded-lg ${user.status === "Banned" ? "text-green-600 hover:bg-green-50" : "text-red-600 hover:bg-red-50"}`}
                              title={user.status === "Banned" ? "Unban User" : "Ban User"}
                            >
                              <Shield className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => toggleUserFlag(user.id)}
                              className={`p-2 rounded-lg ${user.isFraudFlagged ? "text-gray-600 hover:bg-gray-50" : "text-orange-600 hover:bg-orange-50"}`}
                              title={user.isFraudFlagged ? "Remove Fraud Flag" : "Flag as Fraud"}
                            >
                              <Flag className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => {setToDelete(user); setDeleteType("user");}}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                              title="Delete User"
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
          </>
        )}

        {/* Sessions Management */}
        {activeTab === "sessions" && (
          <>
            {/* KPIs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <KPICard 
                title="Total Sessions" 
                value={totalSessions} 
                icon={<Play className="w-5 h-5" />} 
                color="border-t-blue-500" 
              />
              <KPICard 
                title="Ongoing Sessions" 
                value={ongoingSessions} 
                icon={<Zap className="w-5 h-5" />} 
                color="border-t-green-500" 
              />
              <KPICard 
                title="Completed" 
                value={sessions.filter(s => s.status === "Completed").length} 
                icon={<Check className="w-5 h-5" />} 
                color="border-t-purple-500" 
              />
              <KPICard 
                title="Total Coins Won" 
                value={`₹ ${totalCoinsWon}`} 
                icon={<Coins className="w-5 h-5" />} 
                color="border-t-yellow-500" 
              />
            </div>

            {/* Controls */}
            <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6">
              <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
                <div className="flex flex-col md:flex-row gap-3 flex-1">
                  <div className="relative flex-1">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Search by session ID or username..."
                      value={sessionQuery}
                      onChange={(e) => setSessionQuery(e.target.value)}
                    />
                  </div>
                  <select
                    className="rounded-lg border border-gray-300 px-3 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={sessionStatusFilter}
                    onChange={(e) => setSessionStatusFilter(e.target.value)}
                  >
                    <option>All</option>
                    <option>Ongoing</option>
                    <option>Completed</option>
                    <option>Cancelled</option>
                  </select>
                </div>
                <button
                  onClick={() => setShowAddSession(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg flex items-center gap-2 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Add Session
                </button>
              </div>
            </div>

            {/* Sessions Table */}
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="text-left px-4 py-3 font-medium text-gray-900">Session ID</th>
                      <th className="text-left px-4 py-3 font-medium text-gray-900">User</th>
                      <th className="text-center px-4 py-3 font-medium text-gray-900">Bullets</th>
                      <th className="text-center px-4 py-3 font-medium text-gray-900">Birds Shot</th>
                      <th className="text-center px-4 py-3 font-medium text-gray-900">Reward</th>
                      <th className="text-center px-4 py-3 font-medium text-gray-900">Net P/L</th>
                      <th className="text-center px-4 py-3 font-medium text-gray-900">Status</th>
                      <th className="text-center px-4 py-3 font-medium text-gray-900">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredSessions.length === 0 && (
                      <tr>
                        <td colSpan={8} className="text-center py-8 text-gray-500">
                          No sessions found
                        </td>
                      </tr>
                    )}
                    {filteredSessions.map((session) => (
                      <tr key={session.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="px-4 py-3">
                          <div className="font-medium text-gray-900">{session.id}</div>
                          <div className="text-sm text-gray-500">{session.startTime}</div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="font-medium text-gray-900">#{session.userId}</div>
                          <div className="text-sm text-gray-500">{session.username}</div>
                        </td>
                        <td className="px-4 py-3 text-center">
                          <div className="text-sm">
                            <div className="font-medium">{session.bulletsPurchased}</div>
                            <div className="text-gray-500">₹{session.coinsSpent}</div>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-center">
                          <div className="text-sm">
                            {session.birdsShot.map((bird, idx) => (
                              <div key={idx} className="flex items-center justify-center gap-1">
                                <Bird className="w-3 h-3" />
                                {bird.count} {bird.type}
                              </div>
                            ))}
                            {session.birdsShot.length === 0 && <span className="text-gray-400">No birds shot</span>}
                          </div>
                        </td>
                        <td className="px-4 py-3 text-center">
                          <div className="font-semibold text-green-600">₹{session.totalReward}</div>
                        </td>
                        <td className="px-4 py-3 text-center">
                          <div className={`font-semibold ${session.netProfitLoss >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                            {session.netProfitLoss >= 0 ? '+' : ''}₹{session.netProfitLoss}
                          </div>
                        </td>
                        <td className="px-4 py-3 text-center">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${SESSION_COLORS[session.status]}`}>
                            {session.status}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex justify-center gap-1">
                            <button
                              onClick={() => {setViewingItem(session); setShowViewSession(true);}}
                              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                              title="View Details"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => {setEditingItem({...session}); setShowEditSession(true);}}
                              className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg"
                              title="Edit Session"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => {setToDelete(session); setDeleteType("session");}}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                              title="Delete Session"
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
          </>
        )}

        {/* Bird Types Management */}
        {activeTab === "birds" && (
          <>
            {/* KPIs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <KPICard 
                title="Total Bird Types" 
                value={birdTypes.length} 
                icon={<Bird className="w-5 h-5" />} 
                color="border-t-blue-500" 
              />
              <KPICard 
                title="Active Birds" 
                value={activeBirds} 
                icon={<Check className="w-5 h-5" />} 
                color="border-t-green-500" 
              />
              <KPICard 
                title="Inactive Birds" 
                value={birdTypes.filter(b => b.status === "Inactive").length} 
                icon={<X className="w-5 h-5" />} 
                color="border-t-red-500" 
              />
              <KPICard 
                title="Avg Reward" 
                value={`₹${(birdTypes.reduce((sum, b) => sum + b.rewardCoins, 0) / birdTypes.length || 0).toFixed(0)}`} 
                icon={<Award className="w-5 h-5" />} 
                color="border-t-yellow-500" 
              />
            </div>

            {/* Controls */}
            <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6">
              <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
                <div className="flex flex-col md:flex-row gap-3 flex-1">
                  <div className="relative flex-1">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="Search by bird name or type..."
                      value={birdQuery}
                      onChange={(e) => setBirdQuery(e.target.value)}
                    />
                  </div>
                  <select
                    className="rounded-lg border border-gray-300 px-3 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    value={birdStatusFilter}
                    onChange={(e) => setBirdStatusFilter(e.target.value)}
                  >
                    <option>All</option>
                    <option>Active</option>
                    <option>Inactive</option>
                  </select>
                </div>
                <button
                  onClick={() => setShowAddBird(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-lg flex items-center gap-2 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Add Bird Type
                </button>
              </div>
            </div>

            {/* Birds Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredBirds.length === 0 && (
                <div className="col-span-full text-center py-8 text-gray-500">
                  No bird types found
                </div>
              )}
              {filteredBirds.map((bird) => (
                <div key={bird.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
                  <div 
                    className="h-32 flex items-center justify-center"
                    style={{ backgroundColor: bird.color + '20' }}
                  >
                    <Bird 
                      className="w-16 h-16" 
                      style={{ color: bird.color }}
                    />
                  </div>
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-gray-900">{bird.name}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${BIRD_COLORS[bird.status]}`}>
                        {bird.status}
                      </span>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Type:</span>
                        <span className="font-medium">{bird.type}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Reward:</span>
                        <span className="font-medium text-green-600">₹{bird.rewardCoins}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Probability:</span>
                        <span className="font-medium">{bird.probability}%</span>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <button
                        onClick={() => {setEditingItem({...bird}); setShowEditBird(true);}}
                        className="flex-1 bg-blue-50 text-blue-600 px-3 py-2 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => toggleBirdStatus(bird.id)}
                        className={`flex-1 px-3 py-2 rounded-lg transition-colors text-sm font-medium ${
                          bird.status === "Active" 
                            ? "bg-red-50 text-red-600 hover:bg-red-100" 
                            : "bg-green-50 text-green-600 hover:bg-green-100"
                        }`}
                      >
                        {bird.status === "Active" ? "Disable" : "Enable"}
                      </button>
                      <button
                        onClick={() => {setToDelete(bird); setDeleteType("bird");}}
                        className="px-3 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors text-sm font-medium"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Modals */}
      
      {/* Add User Modal */}
      {showAddUser && (
        <Modal onClose={() => setShowAddUser(false)} title="Add New User">
          <form onSubmit={addUser} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
              <input
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={newUser.username}
                onChange={(e) => setNewUser(s => ({...s, username: e.target.value}))}
                placeholder="Enter username"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number</label>
              <input
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={newUser.mobile}
                onChange={(e) => setNewUser(s => ({...s, mobile: e.target.value}))}
                placeholder="+91 XXXXX XXXXX"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Initial Balance (₹)</label>
              <input
                type="number"
                min="0"
                step="0.01"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={editingItem.coinsSpent}
                onChange={(e) => setEditingItem(s => ({...s, coinsSpent: e.target.value}))}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={editingItem.status}
                onChange={(e) => setEditingItem(s => ({...s, status: e.target.value}))}
              >
                <option>Ongoing</option>
                <option>Completed</option>
                <option>Cancelled</option>
              </select>
            </div>
            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={() => setShowEditSession(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Update Session
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* Add Bird Modal */}
      {showAddBird && (
        <Modal onClose={() => setShowAddBird(false)} title="Add New Bird Type">
          <form onSubmit={addBird} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Bird Name</label>
              <input
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={newBird.name}
                onChange={(e) => setNewBird(s => ({...s, name: e.target.value}))}
                placeholder="Enter bird name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Bird Type</label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={newBird.type}
                onChange={(e) => setNewBird(s => ({...s, type: e.target.value}))}
              >
                <option>Common</option>
                <option>Rare</option>
                <option>Epic</option>
                <option>Legendary</option>
                <option>Mythical</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Reward Coins (₹)</label>
              <input
                required
                type="number"
                min="1"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={newBird.rewardCoins}
                onChange={(e) => setNewBird(s => ({...s, rewardCoins: e.target.value}))}
                placeholder="Reward amount"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Probability (%)</label>
              <input
                type="number"
                min="0"
                max="100"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={newBird.probability}
                onChange={(e) => setNewBird(s => ({...s, probability: e.target.value}))}
                placeholder="Appearance probability"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Bird Color</label>
              <input
                type="color"
                className="w-full h-10 border border-gray-300 rounded-lg"
                value={newBird.color}
                onChange={(e) => setNewBird(s => ({...s, color: e.target.value}))}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={newBird.status}
                onChange={(e) => setNewBird(s => ({...s, status: e.target.value}))}
              >
                <option>Active</option>
                <option>Inactive</option>
              </select>
            </div>
            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={() => setShowAddBird(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Add Bird
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* Edit Bird Modal */}
      {showEditBird && editingItem && (
        <Modal onClose={() => setShowEditBird(false)} title="Edit Bird Type">
          <form onSubmit={updateBird} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Bird Name</label>
              <input
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={editingItem.name}
                onChange={(e) => setEditingItem(s => ({...s, name: e.target.value}))}
                placeholder="Enter bird name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Bird Type</label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={editingItem.type}
                onChange={(e) => setEditingItem(s => ({...s, type: e.target.value}))}
              >
                <option>Common</option>
                <option>Rare</option>
                <option>Epic</option>
                <option>Legendary</option>
                <option>Mythical</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Reward Coins (₹)</label>
              <input
                required
                type="number"
                min="1"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={editingItem.rewardCoins}
                onChange={(e) => setEditingItem(s => ({...s, rewardCoins: e.target.value}))}
                placeholder="Reward amount"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Probability (%)</label>
              <input
                type="number"
                min="0"
                max="100"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={editingItem.probability}
                onChange={(e) => setEditingItem(s => ({...s, probability: e.target.value}))}
                placeholder="Appearance probability"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Bird Color</label>
              <input
                type="color"
                className="w-full h-10 border border-gray-300 rounded-lg"
                value={editingItem.color}
                onChange={(e) => setEditingItem(s => ({...s, color: e.target.value}))}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={editingItem.status}
                onChange={(e) => setEditingItem(s => ({...s, status: e.target.value}))}
              >
                <option>Active</option>
                <option>Inactive</option>
              </select>
            </div>
            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={() => setShowEditBird(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Update Bird
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* View User Modal */}
      {showViewUser && viewingItem && (
        <Modal onClose={() => setShowViewUser(false)} title={`User Details - ${viewingItem.username}`}>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">User ID</label>
                <div className="text-lg font-semibold">#{viewingItem.id}</div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Status</label>
                <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${STATUS_COLORS[viewingItem.status]}`}>
                  {viewingItem.status}
                </span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Mobile</label>
                <div className="flex items-center gap-1">
                  <Phone className="w-4 h-4 text-gray-400" />
                  {viewingItem.mobile}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Join Date</label>
                <div>{viewingItem.joinDate}</div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Current Balance</label>
                <div className="text-xl font-bold text-blue-600">₹ {Number(viewingItem.balance).toFixed(2)}</div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Biggest Prize</label>
                <div className="text-xl font-bold text-yellow-600 flex items-center gap-1">
                  <Crown className="w-5 h-5" />
                  ₹ {viewingItem.biggestPrize}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <Target className="w-8 h-8 mx-auto mb-2 text-blue-500" />
                <div className="text-lg font-bold">{viewingItem.totalShots}</div>
                <div className="text-sm text-gray-600">Total Shots</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <TrendingUp className="w-8 h-8 mx-auto mb-2 text-green-500" />
                <div className="text-lg font-bold text-green-600">₹ {viewingItem.totalCoinsWon}</div>
                <div className="text-sm text-gray-600">Coins Won</div>
              </div>
              <div className="text-center p-4 bg-red-50 rounded-lg">
                <TrendingDown className="w-8 h-8 mx-auto mb-2 text-red-500" />
                <div className="text-lg font-bold text-red-600">₹ {viewingItem.totalCoinsLost}</div>
                <div className="text-sm text-gray-600">Coins Lost</div>
              </div>
            </div>

            {viewingItem.isFraudFlagged && (
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                <div className="flex items-center gap-2 text-orange-700">
                  <Flag className="w-5 h-5" />
                  <span className="font-medium">Fraud Alert</span>
                </div>
                <div className="text-sm text-orange-600 mt-1">
                  This user has been flagged for suspicious activity and requires manual review.
                </div>
              </div>
            )}

            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-medium text-gray-700 mb-3">Balance Management</h4>
              <div className="flex gap-2">
                <button
                  onClick={() => adjustBalance(viewingItem.id, 100)}
                  className="flex-1 bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-700 text-sm"
                >
                  +₹100
                </button>
                <button
                  onClick={() => adjustBalance(viewingItem.id, -100)}
                  className="flex-1 bg-red-600 text-white px-3 py-2 rounded-lg hover:bg-red-700 text-sm"
                >
                  -₹100
                </button>
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <button
                onClick={() => setShowViewUser(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Close
              </button>
              <button
                onClick={() => toggleUserFlag(viewingItem.id)}
                className={`flex-1 px-4 py-2 rounded-lg font-medium ${
                  viewingItem.isFraudFlagged 
                    ? "bg-gray-600 text-white hover:bg-gray-700" 
                    : "bg-orange-600 text-white hover:bg-orange-700"
                }`}
              >
                {viewingItem.isFraudFlagged ? "Remove Flag" : "Flag as Fraud"}
              </button>
              <button
                onClick={() => toggleUserBan(viewingItem.id)}
                className={`flex-1 px-4 py-2 rounded-lg font-medium ${
                  viewingItem.status === "Banned" 
                    ? "bg-green-600 text-white hover:bg-green-700" 
                    : "bg-red-600 text-white hover:bg-red-700"
                }`}
              >
                {viewingItem.status === "Banned" ? "Unban User" : "Ban User"}
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* View Session Modal */}
      {showViewSession && viewingItem && (
        <Modal onClose={() => setShowViewSession(false)} title={`Session Details - ${viewingItem.id}`}>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Session ID</label>
                <div className="text-lg font-semibold">{viewingItem.id}</div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Status</label>
                <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${SESSION_COLORS[viewingItem.status]}`}>
                  {viewingItem.status}
                </span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Player</label>
                <div className="font-medium">#{viewingItem.userId} - {viewingItem.username}</div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Duration</label>
                <div>{viewingItem.startTime} - {viewingItem.endTime || "Ongoing"}</div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <Zap className="w-8 h-8 mx-auto mb-2 text-blue-500" />
                <div className="text-lg font-bold">{viewingItem.bulletsPurchased}</div>
                <div className="text-sm text-gray-600">Bullets</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <DollarSign className="w-8 h-8 mx-auto mb-2 text-purple-500" />
                <div className="text-lg font-bold">₹ {viewingItem.coinsSpent}</div>
                <div className="text-sm text-gray-600">Coins Spent</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <Coins className="w-8 h-8 mx-auto mb-2 text-green-500" />
                <div className="text-lg font-bold">₹ {viewingItem.totalReward}</div>
                <div className="text-sm text-gray-600">Total Reward</div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium text-gray-700">Birds Shot</h4>
                <div className={`text-lg font-bold ${viewingItem.netProfitLoss >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  Net P/L: {viewingItem.netProfitLoss >= 0 ? '+' : ''}₹{viewingItem.netProfitLoss}
                </div>
              </div>
              {viewingItem.birdsShot.length === 0 ? (
                <div className="text-center text-gray-500 py-4">No birds shot in this session</div>
              ) : (
                <div className="space-y-2">
                  {viewingItem.birdsShot.map((bird, idx) => (
                    <div key={idx} className="flex items-center justify-between bg-white p-3 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Bird className="w-5 h-5 text-blue-500" />
                        <span className="font-medium">{bird.type}</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-sm text-gray-600">Count: {bird.count}</span>
                        <span className="font-semibold text-green-600">₹{bird.reward}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex gap-3 pt-4">
              <button
                onClick={() => setShowViewSession(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Close
              </button>
              <button
                onClick={() => {setEditingItem(viewingItem); setShowViewSession(false); setShowEditSession(true);}}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Edit Session
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* Delete Confirmation Modal */}
      {toDelete && (
        <Modal onClose={() => {setToDelete(null); setDeleteType("");}} title="Confirm Delete">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-red-600">
              <AlertTriangle className="w-5 h-5" />
              <span className="font-medium">Are you sure you want to delete this {deleteType}?</span>
            </div>
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <div className="text-sm text-red-800">
                <strong>
                  {deleteType === "user" && `User: ${toDelete.username} (#${toDelete.id})`}
                  {deleteType === "session" && `Session: ${toDelete.id}`}
                  {deleteType === "bird" && `Bird Type: ${toDelete.name}`}
                </strong>
              </div>
              <div className="text-sm text-red-600 mt-1">
                This action cannot be undone. All associated data will be permanently removed.
              </div>
            </div>
            <div className="flex gap-3 pt-4">
              <button
                onClick={() => {setToDelete(null); setDeleteType("");}}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={deleteItem}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                <Trash2 className="w-4 h-4 inline mr-2" />
                Delete {deleteType}
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

// Helper Components
function KPICard({ title, value, icon, color }) {
  return (
    <div className={`bg-white rounded-xl border-t-4 ${color} p-4 shadow-sm hover:shadow-md transition-shadow`}>
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm font-medium text-gray-600">{title}</div>
          <div className="text-2xl font-bold text-gray-900 mt-1">{value}</div>
        </div>
        <div className="bg-gray-50 p-3 rounded-xl">
          {icon}
        </div>
      </div>
    </div>
  );
}

function TabButton({ children, active, onClick, icon }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium border transition-all duration-300 whitespace-nowrap ${
        active
          ? "bg-blue-600 text-white border-blue-600 shadow-sm"
          : "bg-transparent text-gray-600 border-gray-200 hover:bg-gray-50"
      }`}
    >
      {icon}
      {children}
    </button>
  );
}

function Modal({ children, onClose, title }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-white rounded-xl border border-gray-200 shadow-xl w-full max-w-md max-h-[90vh] overflow-auto">
        <div className="flex items-center justify-between p-4 border-b border-gray-200 sticky top-0 bg-white">
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          <button 
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-4">
          {children}
        </div>
      </div>
    </div>
  );
}

// :ring-blue-500 focus:border-blue-500"
//                 value={newUser.balance}
//                 onChange={(e) => setNewUser(s => ({...s, balance: e.target.value}))}
//                 placeholder="0.00"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
//               <select
//                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                 value={newUser.status}
//                 onChange={(e) => setNewUser(s => ({...s, status: e.target.value}))}
//               >
//                 <option>Active</option>
//                 <option>Suspended</option>
//                 <option>Banned</option>
//               </select>
//             </div>
//             <div className="flex gap-3 pt-4">
//               <button
//                 type="button"
//                 onClick={() => setShowAddUser(false)}
//                 className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
//               >
//                 Cancel
//               </button>
//               <button
//                 type="submit"
//                 className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
//               >
//                 Add User
//               </button>
//             </div>
//           </form>
//         </Modal>
//       )}

//       {/* Edit User Modal */}
//       {showEditUser && editingItem && (
//         <Modal onClose={() => setShowEditUser(false)} title="Edit User">
//           <form onSubmit={updateUser} className="space-y-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
//               <input
//                 required
//                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                 value={editingItem.username}
//                 onChange={(e) => setEditingItem(s => ({...s, username: e.target.value}))}
//                 placeholder="Enter username"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number</label>
//               <input
//                 required
//                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                 value={editingItem.mobile}
//                 onChange={(e) => setEditingItem(s => ({...s, mobile: e.target.value}))}
//                 placeholder="+91 XXXXX XXXXX"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Balance (₹)</label>
//               <input
//                 type="number"
//                 min="0"
//                 step="0.01"
//                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                 value={editingItem.balance}
//                 onChange={(e) => setEditingItem(s => ({...s, balance: e.target.value}))}
//                 placeholder="0.00"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
//               <select
//                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                 value={editingItem.status}
//                 onChange={(e) => setEditingItem(s => ({...s, status: e.target.value}))}
//               >
//                 <option>Active</option>
//                 <option>Suspended</option>
//                 <option>Banned</option>
//                 <option>Flagged</option>
//               </select>
//             </div>
//             <div className="flex gap-3 pt-4">
//               <button
//                 type="button"
//                 onClick={() => setShowEditUser(false)}
//                 className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
//               >
//                 Cancel
//               </button>
//               <button
//                 type="submit"
//                 className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
//               >
//                 Update User
//               </button>
//             </div>
//           </form>
//         </Modal>
//       )}

//       {/* Add Session Modal */}
//       {showAddSession && (
//         <Modal onClose={() => setShowAddSession(false)} title="Add New Session">
//           <form onSubmit={addSession} className="space-y-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">User</label>
//               <select
//                 required
//                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                 value={newSession.userId}
//                 onChange={(e) => setNewSession(s => ({...s, userId: e.target.value}))}
//               >
//                 <option value="">Select User</option>
//                 {users.map(user => (
//                   <option key={user.id} value={user.id}>#{user.id} - {user.username}</option>
//                 ))}
//               </select>
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Bullets Purchased</label>
//               <input
//                 required
//                 type="number"
//                 min="1"
//                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                 value={newSession.bulletsPurchased}
//                 onChange={(e) => setNewSession(s => ({...s, bulletsPurchased: e.target.value}))}
//                 placeholder="Number of bullets"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Coins Spent (₹)</label>
//               <input
//                 type="number"
//                 min="0"
//                 step="0.01"
//                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                 value={newSession.coinsSpent}
//                 onChange={(e) => setNewSession(s => ({...s, coinsSpent: e.target.value}))}
//                 placeholder="0.00"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
//               <select
//                 className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                 value={newSession.status}
//                 onChange={(e) => setNewSession(s => ({...s, status: e.target.value}))}
//               >
//                 <option>Ongoing</option>
//                 <option>Completed</option>
//                 <option>Cancelled</option>
//               </select>
//             </div>
//             <div className="flex gap-3 pt-4">
//               <button
//                 type="button"
//                 onClick={() => setShowAddSession(false)}
//                 className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
//               >
//                 Cancel
//               </button>
//               <button
//                 type="submit"
//                 className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
//               >
//                 Add Session
//               </button>
//             </div>
//           </form>
//         </Modal>
//       )}
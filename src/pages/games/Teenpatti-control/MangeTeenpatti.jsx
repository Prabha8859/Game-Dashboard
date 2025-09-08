import React, { useState } from "react";
import {
  Users,
  Table2,
  History,
  Check,
  Ban,
  Lock,
  Unlock,
  Eye,
  Trash2,
  Edit,
  XCircle,
  Save,
  Flag, // Added Flag icon for fraud flagging
} from "lucide-react";

// Teen Patti Admin Dashboard
const TeenPattiAdminDashboard = () => {
  // State to manage the active tab
  const [activeTab, setActiveTab] = useState("users");

  // State for popups and selected items
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedTable, setSelectedTable] = useState(null);
  const [confirmationMessage, setConfirmationMessage] = useState("");
  const [confirmationAction, setConfirmationAction] = useState(null);

  // Dummy data for User Management
  const [users, setUsers] = useState([
    {
      id: "U-87654",
      name: "Rohan Kapoor",
      mobile: "9876543210",
      wallet: 1550,
      totalBets: 120,
      totalWins: 50,
      totalLosses: 70,
      status: "Active",
      isSuspicious: false,
    },
    {
      id: "U-12345",
      name: "Priya Singh",
      mobile: "8765432109",
      wallet: 8000,
      totalBets: 250,
      totalWins: 180,
      totalLosses: 70,
      status: "Active",
      isSuspicious: false,
    },
    {
      id: "U-90876",
      name: "Amit Sharma",
      mobile: "7654321098",
      wallet: 250,
      totalBets: 50,
      totalWins: 10,
      totalLosses: 40,
      status: "Banned",
      isSuspicious: true,
    },
    {
      id: "U-34567",
      name: "Suresh Gupta",
      mobile: "6543210987",
      wallet: 500,
      totalBets: 300,
      totalWins: 150,
      totalLosses: 150,
      status: "Active",
      isSuspicious: false,
    },
  ]);

  // Dummy data for Table Management
  const [tables, setTables] = useState([
    {
      id: "T-001",
      name: "High Rollers",
      type: "VIP",
      bootAmount: 500,
      maxPlayers: 5,
      currentPlayers: 4,
      commission: 3,
      status: "Active",
    },
    {
      id: "T-002",
      name: "Public Table",
      type: "Public",
      bootAmount: 50,
      maxPlayers: 7,
      currentPlayers: 7,
      commission: 5,
      status: "Active",
    },
    {
      id: "T-003",
      name: "Private Room",
      type: "Private",
      bootAmount: 100,
      maxPlayers: 3,
      currentPlayers: 1,
      commission: 4,
      status: "Active",
    },
    {
      id: "T-004",
      name: "Beginner's Den",
      type: "Public",
      bootAmount: 20,
      maxPlayers: 5,
      currentPlayers: 0,
      commission: 5,
      status: "Closed",
    },
  ]);

  // Dummy data for Game Rounds History
  const [history, setHistory] = useState([
    {
      roundId: "R-101",
      tableId: "T-002",
      players: ["Rohan", "Priya", "Amit"],
      betAmount: 50,
      potSize: 350,
      winner: "Priya",
      payout: 332.5,
      status: "Completed",
    },
    {
      roundId: "R-102",
      tableId: "T-001",
      players: ["Suresh", "Rohan", "Sandeep"],
      betAmount: 500,
      potSize: 1500,
      winner: "Suresh",
      payout: 1425,
      status: "Completed",
    },
    {
      roundId: "R-103",
      tableId: "T-003",
      players: ["Amit", "Kiran"],
      betAmount: 100,
      potSize: 200,
      winner: "Amit",
      payout: 192,
      status: "Completed",
    },
  ]);

  // --- Confirmation & Modal Handlers
  const handleConfirmation = (message, action) => {
    setConfirmationMessage(message);
    setConfirmationAction(() => action); // Use a function to store the action
    setShowModal("confirm");
  };

  const handleModalClose = () => {
    setShowModal(false);
    setSelectedUser(null);
    setSelectedTable(null);
    setConfirmationMessage("");
    setConfirmationAction(null);
  };

  // --- User Management Handlers
  const toggleUserStatus = (userId) => {
    const user = users.find((u) => u.id === userId);
    const newStatus = user.status === "Active" ? "Banned" : "Active";
    const action = () => {
      setUsers(
        users.map((u) => (u.id === userId ? { ...u, status: newStatus } : u))
      );
      handleModalClose();
    };
    const message = `क्या आप सच में ${user.name} को ${
      newStatus === "Banned" ? "बैन" : "अनबैन"
    } करना चाहते हैं?`;
    handleConfirmation(message, action);
  };

  const flagUser = (userId) => {
    setUsers(
      users.map((u) =>
        u.id === userId ? { ...u, isSuspicious: !u.isSuspicious } : u
      )
    );
  };

  const handleUserModal = (userId, isEditing = false) => {
    const user = users.find((u) => u.id === userId);
    setSelectedUser({ ...user, isEditing });
    setShowModal("user");
  };

  const saveUserChanges = (updatedUser) => {
    setUsers(users.map((u) => (u.id === updatedUser.id ? updatedUser : u)));
    handleModalClose();
  };

  // --- Table Management Handlers
  const toggleTableStatus = (tableId) => {
    const table = tables.find((t) => t.id === tableId);
    const newStatus = table.status === "Active" ? "Closed" : "Active";
    const action = () => {
      setTables(
        tables.map((t) => (t.id === tableId ? { ...t, status: newStatus } : t))
      );
      handleModalClose();
    };
    const message = `क्या आप सच में ${table.name} को ${
      newStatus === "Closed" ? "बंद" : "चालू"
    } करना चाहते हैं?`;
    handleConfirmation(message, action);
  };

  const handleTableModal = (tableId, isEditing = false) => {
    const table = tables.find((t) => t.id === tableId);
    setSelectedTable({ ...table, isEditing });
    setShowModal("table");
  };
  
  const saveTableChanges = (updatedTable) => {
    setTables(tables.map((t) => (t.id === updatedTable.id ? updatedTable : t)));
    handleModalClose();
  };
  
  // --- Reusable Components
  const UserEditModal = ({ user, onClose, onSave }) => {
    const [editedUser, setEditedUser] = useState(user);
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setEditedUser({ ...editedUser, [name]: value });
    };

    return (
      <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center p-4 z-50">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl max-w-lg w-full p-6 relative">
          <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
            <XCircle size={24} />
          </button>
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
            {editedUser.isEditing ? "Edit User Details" : "View User Details"}
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">User ID</label>
              <p className="mt-1 text-gray-900 dark:text-gray-100">{editedUser.id}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
              <input type="text" name="name" value={editedUser.name} onChange={handleInputChange} disabled={!editedUser.isEditing} className="mt-1 w-full p-2 border rounded-md dark:bg-gray-700" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Wallet Balance</label>
              <input type="number" name="wallet" value={editedUser.wallet} onChange={handleInputChange} disabled={!editedUser.isEditing} className="mt-1 w-full p-2 border rounded-md dark:bg-gray-700" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Status</label>
              <p className="mt-1 text-gray-900 dark:text-gray-100">{editedUser.status}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Total Bets</label>
              <p className="mt-1 text-gray-900 dark:text-gray-100">{editedUser.totalBets}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Total Wins/Losses</label>
              <p className="mt-1 text-gray-900 dark:text-gray-100">{editedUser.totalWins}/{editedUser.totalLosses}</p>
            </div>
          </div>
          {editedUser.isEditing && (
            <div className="mt-6 flex justify-end gap-2">
              <button onClick={() => onSave(editedUser)} className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-xl flex items-center gap-2">
                <Save size={18} /> Save
              </button>
            </div>
          )}
        </div>
      </div>
    );
  };

  const TableEditModal = ({ table, onClose, onSave }) => {
    const [editedTable, setEditedTable] = useState(table);
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setEditedTable({ ...editedTable, [name]: value });
    };

    return (
      <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center p-4 z-50">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl max-w-lg w-full p-6 relative">
          <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
            <XCircle size={24} />
          </button>
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
            {editedTable.isEditing ? "Edit Table Details" : "View Table Details"}
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Table ID</label>
              <p className="mt-1 text-gray-900 dark:text-gray-100">{editedTable.id}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Table Name</label>
              <input type="text" name="name" value={editedTable.name} onChange={handleInputChange} disabled={!editedTable.isEditing} className="mt-1 w-full p-2 border rounded-md dark:bg-gray-700" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Boot Amount</label>
              <input type="number" name="bootAmount" value={editedTable.bootAmount} onChange={handleInputChange} disabled={!editedTable.isEditing} className="mt-1 w-full p-2 border rounded-md dark:bg-gray-700" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Max Players</label>
              <input type="number" name="maxPlayers" value={editedTable.maxPlayers} onChange={handleInputChange} disabled={!editedTable.isEditing} className="mt-1 w-full p-2 border rounded-md dark:bg-gray-700" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Commission %</label>
              <input type="number" name="commission" value={editedTable.commission} onChange={handleInputChange} disabled={!editedTable.isEditing} className="mt-1 w-full p-2 border rounded-md dark:bg-gray-700" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Current Status</label>
              <p className="mt-1 text-gray-900 dark:text-gray-100">{editedTable.status}</p>
            </div>
          </div>
          {editedTable.isEditing && (
            <div className="mt-6 flex justify-end gap-2">
              <button onClick={() => onSave(editedTable)} className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-xl flex items-center gap-2">
                <Save size={18} /> Save
              </button>
            </div>
          )}
        </div>
      </div>
    );
  };
  
  const ConfirmationModal = ({ message, onConfirm, onCancel }) => (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl max-w-sm w-full p-6 relative">
        <p className="text-center text-lg font-semibold mb-4 text-gray-900 dark:text-white">{message}</p>
        <div className="flex justify-center gap-4">
          <button onClick={onCancel} className="bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded-xl">
            Cancel
          </button>
          <button onClick={onConfirm} className="bg-red-600 text-white font-bold py-2 px-4 rounded-xl">
            Confirm
          </button>
        </div>
      </div>
    </div>
  );

  // --- Render Functions for each tab
  const renderUserManagement = () => (
    <div className="overflow-x-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
        User Management
      </h2>
      <table className="min-w-full table-auto text-left rounded-xl overflow-hidden">
        <thead className="bg-blue-600 text-white text-sm">
          <tr>
            <th className="py-3 px-4">User ID / Name / Mobile</th>
            <th className="py-3 px-4">Wallet Balance</th>
            <th className="py-3 px-4">Total Bets Placed</th>
            <th className="py-3 px-4">Total Wins / Losses</th>
            <th className="py-3 px-4">Status</th>
            <th className="py-3 px-4">Fraud Flagging</th>
            <th className="py-3 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr
              key={user.id}
              className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
            >
              <td className="py-4 px-4">
                <div className="font-semibold">{user.name}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">{user.id} | {user.mobile}</div>
              </td>
              <td className="py-4 px-4 font-semibold text-green-600 dark:text-green-400">
                ₹{user.wallet.toLocaleString()}
              </td>
              <td className="py-4 px-4">{user.totalBets}</td>
              <td className="py-4 px-4">
                <span className="text-green-500">{user.totalWins}</span> /{" "}
                <span className="text-red-500">{user.totalLosses}</span>
              </td>
              <td className="py-4 px-4">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    user.status === "Active"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {user.status}
                </span>
              </td>
              <td className="py-4 px-4">
                <div
                  className={`px-3 py-1 rounded-full text-xs font-medium inline-flex items-center gap-1 ${
                    user.isSuspicious
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-gray-100 text-gray-500"
                  }`}
                >
                  {/* Changed the icon from Eye to Flag */}
                  <Flag className="w-3 h-3" />
                  {user.isSuspicious ? "Flagged" : "Normal"}
                </div>
              </td>
              <td className="py-4 px-4">
                <div className="flex gap-2">
                  <button
                    onClick={() => handleUserModal(user.id)}
                    className="p-2 text-blue-600 rounded-lg transition transform hover:scale-110 active:scale-95 duration-200"
                    title="View Details"
                  >
                    <Eye className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleUserModal(user.id, true)}
                    className="p-2 text-purple-600 rounded-lg transition transform hover:scale-110 active:scale-95 duration-200"
                    title="Edit User"
                  >
                    <Edit className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => toggleUserStatus(user.id)}
                    className="p-2 text-white rounded-lg transition transform hover:scale-110 active:scale-95 duration-200"
                    style={{ backgroundColor: user.status === "Active" ? '#ef4444' : '#22c55e' }}
                    title={user.status === "Active" ? "Ban User" : "Unban User"}
                  >
                    {user.status === "Active" ? <Ban className="w-5 h-5" /> : <Check className="w-5 h-5" />}
                  </button>
                  <button
                    onClick={() => flagUser(user.id)}
                    className={`p-2 rounded-lg transition transform hover:scale-110 active:scale-95 duration-200 ${
                      user.isSuspicious ? "bg-yellow-500 text-white" : "bg-gray-200 text-gray-800"
                    }`}
                    title="Toggle Fraud Flag"
                  >
                    <Flag className="w-5 h-5" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderTableManagement = () => (
    <div className="overflow-x-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
        Table Management
      </h2>
      <table className="min-w-full table-auto text-left rounded-xl overflow-hidden">
        <thead className="bg-blue-600 text-white text-sm">
          <tr>
            <th className="py-3 px-4">Table ID / Name</th>
            <th className="py-3 px-4">Table Type</th>
            <th className="py-3 px-4">Boot Amount</th>
            <th className="py-3 px-4">Players</th>
            <th className="py-3 px-4">Commission %</th>
            <th className="py-3 px-4">Status</th>
            <th className="py-3 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {tables.map((table) => (
            <tr
              key={table.id}
              className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
            >
              <td className="py-4 px-4">
                <div className="font-semibold">{table.name}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">{table.id}</div>
              </td>
              <td className="py-4 px-4">{table.type}</td>
              <td className="py-4 px-4">₹{table.bootAmount}</td>
              <td className="py-4 px-4">
                {table.currentPlayers} / {table.maxPlayers}
              </td>
              <td className="py-4 px-4">{table.commission}%</td>
              <td className="py-4 px-4">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    table.status === "Active"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {table.status}
                </span>
              </td>
              <td className="py-4 px-4">
                <div className="flex gap-2">
                  <button
                    onClick={() => handleTableModal(table.id, true)}
                    className="p-2 text-purple-600 rounded-lg transition transform hover:scale-110 active:scale-95 duration-200"
                    title="Edit Table"
                  >
                    <Edit className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => toggleTableStatus(table.id)}
                    className="p-2 rounded-lg transition transform hover:scale-110 active:scale-95 duration-200 text-white"
                    style={{ backgroundColor: table.status === "Active" ? '#ef4444' : '#22c55e' }}
                    title={table.status === "Active" ? "Close Table" : "Activate Table"}
                  >
                    {table.status === "Active" ? <Lock className="w-5 h-5" /> : <Unlock className="w-5 h-5" />}
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderGameHistory = () => (
    <div className="overflow-x-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
        Game Rounds History
      </h2>
      <table className="min-w-full table-auto text-left rounded-xl overflow-hidden">
        <thead className="bg-blue-600 text-white text-sm">
          <tr>
            <th className="py-3 px-4">Round ID</th>
            <th className="py-3 px-4">Table ID</th>
            <th className="py-3 px-4">Players in Round</th>
            <th className="py-3 px-4">Bet Amount</th>
            <th className="py-3 px-4">Pot Size</th>
            <th className="py-3 px-4">Winner / Payout</th>
            <th className="py-3 px-4">Status</th>
          </tr>
        </thead>
        <tbody>
          {history.map((round) => (
            <tr
              key={round.roundId}
              className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
            >
              <td className="py-4 px-4 font-semibold">{round.roundId}</td>
              <td className="py-4 px-4 text-gray-500 dark:text-gray-400">{round.tableId}</td>
              <td className="py-4 px-4">{round.players.join(", ")}</td>
              <td className="py-4 px-4">₹{round.betAmount}</td>
              <td className="py-4 px-4">₹{round.potSize}</td>
              <td className="py-4 px-4">
                <div className="font-bold text-green-600 dark:text-green-400">
                  {round.winner}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  Payout: ₹{round.payout}
                </div>
              </td>
              <td className="py-4 px-4">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    round.status === "Completed"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {round.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 font-sans p-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white">
            Teen Patti Admin
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-2">
            Sab kuch yahan se control karein.
          </p>
        </header>

        {/* Tab Navigation */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-3 mb-8">
          <div className="flex justify-around items-center space-x-2">
            <button
              onClick={() => setActiveTab("users")}
              className={`flex-1 flex items-center justify-center py-3 px-4 rounded-xl font-semibold transition-all duration-300 ${
                activeTab === "users" ? "bg-blue-600 text-white shadow-lg" : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
            >
              <Users className="w-5 h-5 mr-2" />
              User Management
            </button>
            <button
              onClick={() => setActiveTab("tables")}
              className={`flex-1 flex items-center justify-center py-3 px-4 rounded-xl font-semibold transition-all duration-300 ${
                activeTab === "tables" ? "bg-blue-600 text-white shadow-lg" : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
            >
              <Table2 className="w-5 h-5 mr-2" />
              Table Management
            </button>
            <button
              onClick={() => setActiveTab("history")}
              className={`flex-1 flex items-center justify-center py-3 px-4 rounded-xl font-semibold transition-all duration-300 ${
                activeTab === "history" ? "bg-blue-600 text-white shadow-lg" : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
            >
              <History className="w-5 h-5 mr-2" />
              Game History
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 transition-all duration-300">
          {activeTab === "users" && renderUserManagement()}
          {activeTab === "tables" && renderTableManagement()}
          {activeTab === "history" && renderGameHistory()}
        </div>
      </div>

      {showModal === "user" && selectedUser && (
        <UserEditModal
          user={selectedUser}
          onClose={handleModalClose}
          onSave={saveUserChanges}
        />
      )}
      
      {showModal === "table" && selectedTable && (
        <TableEditModal
          table={selectedTable}
          onClose={handleModalClose}
          onSave={saveTableChanges}
        />
      )}

      {showModal === "confirm" && (
        <ConfirmationModal
          message={confirmationMessage}
          onConfirm={confirmationAction}
          onCancel={handleModalClose}
        />
      )}
    </div>
  );
};

export default TeenPattiAdminDashboard;

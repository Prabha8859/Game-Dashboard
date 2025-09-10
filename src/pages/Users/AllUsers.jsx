import React, { useState } from 'react';
import { SquarePen, Trash2, Plus, Search, ChevronLeft, ChevronRight, BadgeAlert, User, Mail, Phone, MapPin, Calendar, DollarSign } from 'lucide-react';

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

// Main component for displaying and managing users
const AllUsers = () => {
  const [users, setUsers] = useState([
    { 
      id: 1, 
      userId: "#1",
      email: "divyasinghbitmax@gmail.com", 
      mobile: "+91+91 87957 51407", 
      country: "India", 
      joinedAt: "29/08/2025, 14:07:23",
      balance: "₹0"
    },
    { 
      id: 2, 
      userId: "#2",
      email: "shrishtishrma03@gmail.com", 
      mobile: "+919569161364", 
      country: "India", 
      joinedAt: "30/08/2025, 10:02:56",
      balance: "₹0"
    },
    { 
      id: 3, 
      userId: "#3",
      email: "john.doe@gmail.com", 
      mobile: "+919876543210", 
      country: "India", 
      joinedAt: "28/08/2025, 16:30:15",
      balance: "₹500"
    },
    { 
      id: 4, 
      userId: "#4",
      email: "priya.sharma@gmail.com", 
      mobile: "+918765432109", 
      country: "India", 
      joinedAt: "27/08/2025, 09:45:30",
      balance: "₹1200"
    },
    { 
      id: 5, 
      userId: "#5",
      email: "rahul.kumar@gmail.com", 
      mobile: "+917654321098", 
      country: "India", 
      joinedAt: "26/08/2025, 11:20:45",
      balance: "₹750"
    },
  ]);

  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletingUserId, setDeletingUserId] = useState(null);
  const [editingUser, setEditingUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUsers, setSelectedUsers] = useState([]); 

  const [formData, setFormData] = useState({
    email: "",
    mobile: "",
    country: "India",
    balance: "0"
  });

  const filteredUsers = users.filter(user =>
    user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.mobile.includes(searchQuery) ||
    user.userId.includes(searchQuery) ||
    user.country.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredUsers.length / entriesPerPage);
  const startIndex = (currentPage - 1) * entriesPerPage;
  const currentUsers = filteredUsers.slice(startIndex, startIndex + entriesPerPage);

  const handleEdit = (user) => {
    setEditingUser(user);
    setFormData({
      email: user.email,
      mobile: user.mobile,
      country: user.country,
      balance: user.balance.replace('₹', '')
    });
    setShowEditModal(true);
  };

  const handleDelete = (userId) => {
    setDeletingUserId(userId);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    setUsers(users.filter(user => user.id !== deletingUserId));
    setShowDeleteModal(false);
    setDeletingUserId(null);
  };

  const handleAddUser = () => {
    setFormData({ email: "", mobile: "", country: "India", balance: "0" });
    setShowAddModal(true);
  };

  const saveUser = () => {
    if (!formData.email || !formData.mobile) {
      return;
    }

    const newUser = {
      id: editingUser ? editingUser.id : Math.max(...users.map(u => u.id), 0) + 1,
      userId: editingUser ? editingUser.userId : `#${Math.max(...users.map(u => u.id), 0) + 1}`,
      email: formData.email,
      mobile: formData.mobile,
      country: formData.country,
      joinedAt: editingUser ? editingUser.joinedAt : new Date().toLocaleString('en-GB'),
      balance: `₹${formData.balance}`
    };

    if (editingUser) {
      setUsers(users.map(user => user.id === editingUser.id ? newUser : user));
      setShowEditModal(false);
      setEditingUser(null);
    } else {
      setUsers([...users, newUser]);
      setShowAddModal(false);
    }
    
    setFormData({ email: "", mobile: "", country: "India", balance: "0" });
  };
  
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      const allUserIds = filteredUsers.map(user => user.id);
      setSelectedUsers(allUserIds);
    } else {
      setSelectedUsers([]);
    }
  };

  const handleSelectUser = (userId) => {
    setSelectedUsers(prevSelected =>
      prevSelected.includes(userId)
        ? prevSelected.filter(id => id !== userId)
        : [...prevSelected, userId]
    );
  };

  return (
    <div className="bg-gray-50 min-h-screen p-2 sm:p-6 font-sans antialiased text-gray-800">
      
      {/* Page Header */}
      <div className="bg-white rounded-lg shadow-sm p-2 mb-3">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <h1 className="text-2xl font-bold text-gray-800">Manager Users</h1>
          <div className="flex items-center gap-2 text-sm text-gray-500 mt-1 sm:mt-0">
            <span>Dashboard</span>
            <ChevronRight className="w-4 h-4" />
            <span>Manage Games</span>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-700 font-medium">All User</span>
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
              <span>Show</span>
              <select 
                value={entriesPerPage}
                onChange={(e) => setEntriesPerPage(Number(e.target.value))}
                className="border border-gray-300 rounded-lg px-2 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
              >
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>
              <span>entries</span>
            </div>
            
            {/* Search and Add User buttons */}
            <div className="flex items-center gap-4 flex-wrap">
              <div className="relative w-full sm:w-auto">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 pr-10 text-sm w-full cursor-text"
                />
                <Search className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2" />
              </div>
              
              <button 
                onClick={handleAddUser}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium transition-colors w-full sm:w-auto justify-center cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                Add User
              </button>
            </div>
          </div>
        </div>

        {/* Users Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-100 border-b border-gray-200">
              <tr>
                <th className="text-left p-3 w-12">
                  <input
                    type="checkbox"
                    checked={filteredUsers.length > 0 && selectedUsers.length === filteredUsers.length}
                    onChange={handleSelectAll}
                    className="w-4 h-4 rounded-sm border-gray-300"
                  />
                </th>
                <th className="text-left p-3 text-xs font-semibold text-blue-600 uppercase tracking-wider">
                  USER ID
                </th>
                <th className="text-left p-3 text-xs font-semibold text-blue-600 uppercase tracking-wider">
                  EMAIL ID
                </th>
                <th className="text-left p-3 text-xs font-semibold text-blue-600 uppercase tracking-wider">
                  MOBILE NUMBER
                </th>
                <th className="text-left p-3 text-xs font-semibold text-blue-600 uppercase tracking-wider">
                  COUNTRY
                </th>
                <th className="text-left p-3 text-xs font-semibold text-blue-600 uppercase tracking-wider">
                  JOINED AT
                </th>
                <th className="text-left p-3 text-xs font-semibold text-blue-600 uppercase tracking-wider">
                  BALANCE
                </th>
                <th className="text-left p-3 text-xs font-semibold text-blue-600 uppercase tracking-wider">
                  ACTION
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {currentUsers.map((user, index) => (
                <tr 
                  key={user.id} 
                  className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                >
                  <td className="p-3">
                    <input
                      type="checkbox"
                      checked={selectedUsers.includes(user.id)}
                      onChange={() => handleSelectUser(user.id)}
                      className="w-4 h-4 rounded-sm border-gray-300"
                    />
                  </td>
                  <td className="p-3 text-sm text-gray-800 font-medium">{user.userId}</td>
                  <td className="p-3 text-sm text-gray-600 break-all">{user.email}</td>
                  <td className="p-3 text-sm text-gray-600 whitespace-nowrap">{user.mobile}</td>
                  <td className="p-3 text-sm text-gray-600">{user.country}</td>
                  <td className="p-3 text-sm text-gray-600">{user.joinedAt}</td>
                  <td className="p-3 text-sm font-semibold" style={{ color: '#dc2626' }}>
                    {user.balance}
                  </td>
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleEdit(user)}
                        className="text-green-500 hover:text-green-700 p-2 rounded-md hover:bg-green-100 transition-colors cursor-pointer shadow-sm border border-gray-200 hover:shadow-md"
                        title="Edit"
                      >
                        <SquarePen className="w-4 h-4" />
                      </button>
                      
                      <button
                        className="text-green-500 hover:text-green-700 p-2 rounded-md hover:bg-green-100 transition-colors cursor-pointer shadow-sm border border-gray-200 hover:shadow-md"
                        title="Add Money"
                      >
                        <DollarSign className="w-4 h-4" />
                      </button>
                      
                      <button
                        onClick={() => handleDelete(user.id)}
                        className="text-red-500 hover:text-red-700 p-2 rounded-md hover:bg-red-100 transition-colors cursor-pointer shadow-sm border border-gray-200 hover:shadow-md"
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
            Showing {startIndex + 1} to {Math.min(startIndex + entriesPerPage, filteredUsers.length)} of {filteredUsers.length} entries
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 border border-gray-300 rounded text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm cursor-pointer"
            >
              Previous
            </button>
            
            {[...Array(Math.min(totalPages, 5))].map((_, i) => {
              const pageNum = i + 1;
              return (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`px-3 py-1 text-sm rounded transition-colors cursor-pointer ${
                    currentPage === pageNum
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}
            
            <button
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="px-3 py-1 border border-gray-300 rounded text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm cursor-pointer"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Edit User Modal */}
      <Modal
        show={showEditModal}
        onClose={() => {
          setShowEditModal(false);
          setEditingUser(null);
        }}
        title="Edit User"
      >
        <div className="space-y-5">
          {/* Email Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full pl-10 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                required
              />
            </div>
          </div>
          
          {/* Mobile Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Mobile Number
            </label>
            <div className="relative">
              <Phone className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                value={formData.mobile}
                onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                className="w-full pl-10 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                required
              />
            </div>
          </div>
          
          {/* Country Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Country
            </label>
            <div className="relative">
              <MapPin className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <select
                value={formData.country}
                onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                className="w-full pl-10 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              >
                <option value="India">India</option>
                <option value="USA">USA</option>
                <option value="UK">UK</option>
                <option value="Canada">Canada</option>
                <option value="Australia">Australia</option>
              </select>
            </div>
          </div>
          
          {/* Balance Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Balance
            </label>
            <div className="relative">
              <DollarSign className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="number"
                value={formData.balance}
                onChange={(e) => setFormData({ ...formData, balance: e.target.value })}
                className="w-full pl-10 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                required
              />
            </div>
          </div>
        </div>
        
        {/* Buttons */}
        <div className="flex justify-end gap-3 mt-8">
          <button
            type="button"
            onClick={() => {
              setShowEditModal(false);
              setEditingUser(null);
            }}
            className="px-6 py-2 border border-gray-300 rounded-full text-gray-700 hover:bg-gray-100 transition-colors font-medium shadow-sm"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={saveUser}
            className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors font-medium shadow-md"
          >
            Update User
          </button>
        </div>
      </Modal>

      {/* Add New User Modal */}
      <Modal
        show={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Add New User"
      >
        <div className="space-y-5">
          {/* Email Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full pl-10 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                required
              />
            </div>
          </div>
          
          {/* Mobile Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Mobile Number
            </label>
            <div className="relative">
              <Phone className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                value={formData.mobile}
                onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                className="w-full pl-10 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                required
              />
            </div>
          </div>
          
          {/* Country Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Country
            </label>
            <div className="relative">
              <MapPin className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <select
                value={formData.country}
                onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                className="w-full pl-10 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
              >
                <option value="India">India</option>
                <option value="USA">USA</option>
                <option value="UK">UK</option>
                <option value="Canada">Canada</option>
                <option value="Australia">Australia</option>
              </select>
            </div>
          </div>
          
          {/* Balance Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Initial Balance
            </label>
            <div className="relative">
              <DollarSign className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="number"
                value={formData.balance}
                onChange={(e) => setFormData({ ...formData, balance: e.target.value })}
                className="w-full pl-10 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                required
              />
            </div>
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
            onClick={saveUser}
            className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors font-medium shadow-md"
          >
            Add User
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
          <p className="text-gray-700 mb-4">Are you sure you want to delete this user?</p>
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

export default AllUsers;
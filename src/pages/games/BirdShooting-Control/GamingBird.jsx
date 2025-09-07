import React, { useState, useEffect } from "react";
import { 
  Plus, 
  Edit, 
  Trash2, 
  Save, 
  X, 
  Search,
  ChevronDown,
  Upload,
  Sun,
  Moon,
  Check,
  TrendingUp,
  Package
} from "lucide-react";

const GameSetting = () => {
  const [birds, setBirds] = useState([
    { 
      id: 1, 
      name: "Sparrow", 
      price: 10, 
      status: "Active", 
      image: "bird-0", 
      popularity: 85, 
      stock: 42,
      speed: 5,
      spawnTime: 0,
      weight: 0.5,
      scale: 1.0,
      flopChance: 15
    },
    { 
      id: 2, 
      name: "Eagle", 
      price: 50, 
      status: "Active", 
      image: "bird-1", 
      popularity: 92, 
      stock: 15,
      speed: 7,
      spawnTime: 2,
      weight: 4.0,
      scale: 1.8,
      flopChance: 5
    },
    { 
      id: 3, 
      name: "Parrot", 
      price: 25, 
      status: "Active", 
      image: "bird-2", 
      popularity: 78, 
      stock: 36,
      speed: 4,
      spawnTime: 4,
      weight: 0.8,
      scale: 1.2,
      flopChance: 20
    },
    { 
      id: 4, 
      name: "Owl", 
      price: 35, 
      status: "Inactive", 
      image: "bird-3", 
      popularity: 65, 
      stock: 0,
      speed: 3,
      spawnTime: 6,
      weight: 2.5,
      scale: 1.5,
      flopChance: 10
    },
    { 
      id: 5, 
      name: "Peacock", 
      price: 75, 
      status: "Active", 
      image: "bird-4", 
      popularity: 95, 
      stock: 8,
      speed: 6,
      spawnTime: 8,
      weight: 5.0,
      scale: 2.2,
      flopChance: 25
    }
  ]);

  const [newBird, setNewBird] = useState({ 
    name: "", 
    price: "", 
    status: "Active", 
    image: "bird-0", 
    stock: "",
    speed: 5,
    spawnTime: 0,
    weight: 1.0,
    scale: 1.0,
    flopChance: 15
  });
  const [editingBird, setEditingBird] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
  const [darkMode, setDarkMode] = useState(false);
  const [notification, setNotification] = useState({ show: false, message: "", type: "" });
  const [activeTab, setActiveTab] = useState("all");
  const [modalAnimation, setModalAnimation] = useState("enter");

  useEffect(() => {
    if (notification.show) {
      const timer = setTimeout(() => {
        setNotification({ ...notification, show: false });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const showNotification = (message, type) => {
    setNotification({ show: true, message, type });
  };

  const openEditModal = (bird) => {
    setEditingBird({...bird});
    setModalAnimation("enter");
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setModalAnimation("exit");
    setTimeout(() => {
      setIsModalOpen(false);
      setEditingBird(null);
      setModalAnimation("enter");
    }, 300);
  };

  const handleAddBird = () => {
    if (!newBird.name || !newBird.price) return;
    const newBirdItem = { 
      id: Date.now(), 
      name: newBird.name, 
      price: Number(newBird.price), 
      status: newBird.status,
      stock: Number(newBird.stock) || 0,
      popularity: Math.floor(Math.random() * 30) + 70,
      image: newBird.image || "bird-0",
      speed: Number(newBird.speed) || 5,
      spawnTime: Number(newBird.spawnTime) || 0,
      weight: Number(newBird.weight) || 1.0,
      scale: Number(newBird.scale) || 1.0,
      flopChance: Number(newBird.flopChance) || 15
    };
    
    setBirds([...birds, newBirdItem]);
    setNewBird({ 
      name: "", 
      price: "", 
      status: "Active", 
      image: "bird-0", 
      stock: "",
      speed: 5,
      spawnTime: 0,
      weight: 1.0,
      scale: 1.0,
      flopChance: 15
    });
    closeModal();
    showNotification(`${newBirdItem.name} has been added successfully!`, "success");
  };

  const handleDelete = (id) => {
    const birdToDelete = birds.find(bird => bird.id === id);
    setBirds(birds.filter((bird) => bird.id !== id));
    showNotification(`${birdToDelete.name} has been deleted.`, "warning");
  };

  const handleSaveEdit = () => {
    setBirds(
      birds.map((bird) => (bird.id === editingBird.id ? {...editingBird} : bird))
    );
    setEditingBird(null);
    closeModal();
    showNotification(`${editingBird.name} has been updated successfully!`, "success");
  };

  const handleStatusChange = (id, newStatus) => {
    setBirds(
      birds.map((bird) => 
        bird.id === id ? { ...bird, status: newStatus } : bird
      )
    );
    const bird = birds.find(b => b.id === id);
    showNotification(`${bird.name} status changed to ${newStatus}.`, "info");
  };

  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const sortedBirds = [...birds].sort((a, b) => {
    if (sortConfig.key) {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? 1 : -1;
      }
    }
    return 0;
  });

  const filteredBirds = sortedBirds.filter(bird => {
    const matchesSearch = bird.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "All" || bird.status === statusFilter;
    const matchesTab = activeTab === "all" || 
                      (activeTab === "active" && bird.status === "Active") ||
                      (activeTab === "inactive" && bird.status === "Inactive") ||
                      (activeTab === "lowstock" && bird.stock < 10);
    return matchesSearch && matchesStatus && matchesTab;
  });

  const handleImageSelect = (imageId) => {
    if (editingBird) {
      setEditingBird({...editingBird, image: imageId});
    } else {
      setNewBird({...newBird, image: imageId});
    }
  };

  const StatusBadge = ({ status }) => (
    <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold transition-all duration-300 ${
      status === "Active" 
        ? "bg-gradient-to-r from-green-400 to-emerald-500 text-white shadow-lg shadow-green-500/30" 
        : "bg-gradient-to-r from-red-400 to-red-500 text-white shadow-lg shadow-red-500/30"
    }`}>
      {status === "Active" ? (
        <>
          <div className="w-2 h-2 bg-white rounded-full mr-2"></div> Active
        </>
      ) : (
        <>
          <div className="w-2 h-2 bg-white rounded-full mr-2"></div> Inactive
        </>
      )}
    </div>
  );

  const StockIndicator = ({ stock }) => (
    <div className="flex items-center">
      <div className="w-16 bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 mr-2">
        <div 
          className={`h-2.5 rounded-full transition-all duration-500 ${
            stock > 20 ? 'bg-gradient-to-r from-green-400 to-emerald-500' : 
            stock > 5 ? 'bg-gradient-to-r from-yellow-400 to-yellow-500' : 'bg-gradient-to-r from-red-400 to-red-500'
          }`} 
          style={{ width: `${Math.min(stock, 100)}%` }}
        ></div>
      </div>
      <span className={`text-xs font-medium ${
        stock > 20 ? 'text-green-600 dark:text-green-400' : 
        stock > 5 ? 'text-yellow-600 dark:text-yellow-400' : 'text-red-600 dark:text-red-400'
      }`}>
        {stock}
      </span>
    </div>
  );

  const PopularityBadge = ({ popularity }) => (
    <div className="flex items-center">
      <div className="w-16 bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 mr-2">
        <div 
          className="h-2.5 rounded-full bg-gradient-to-r from-purple-400 to-indigo-500 transition-all duration-500" 
          style={{ width: `${popularity}%` }}
        ></div>
      </div>
      <span className="text-xs font-medium text-purple-600 dark:text-purple-400">
        {popularity}%
      </span>
    </div>
  );

  // Bird image gallery
  const birdImages = [
    { id: "bird-0", name: "Sparrow", src: "https://images.unsplash.com/photo-1597848212624-e9d2c15752a0?w=150&h=150&fit=crop" },
    { id: "bird-1", name: "Eagle", src: "https://images.unsplash.com/photo-1593958812614-2db6d9786663?w=150&h=150&fit=crop" },
    { id: "bird-2", name: "Parrot", src: "https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=150&h=150&fit=crop" },
    { id: "bird-3", name: "Owl", src: "https://images.unsplash.com/photo-1596466596120-2a8e4b5d1a51?w=150&h=150&fit=crop" },
    { id: "bird-4", name: "Peacock", src: "https://images.unsplash.com/photo-1593970668875-c5191a51287a?w=150&h=150&fit=crop" }
  ];

  const getBirdImageSrc = (imageId) => {
    const image = birdImages.find(img => img.id === imageId);
    return image ? image.src : birdImages[0].src;
  };

  return (
    <div className={`min-h-screen transition-colors duration-500 ${darkMode ? 'dark bg-gradient-to-br from-gray-900 to-gray-800' : 'bg-gradient-to-br from-gray-50 to-gray-100'}`}>
      {/* Notification */}
      {notification.show && (
        <div className={`fixed top-4 right-4 z-50 px-6 py-4 rounded-xl shadow-lg flex items-center transform transition-all duration-500 ${
          notification.type === 'success' ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-green-500/30' :
          notification.type === 'warning' ? 'bg-gradient-to-r from-yellow-500 to-yellow-600 text-black shadow-yellow-500/30' :
          notification.type === 'error' ? 'bg-gradient-to-r from-red-500 to-red-600 text-white shadow-red-500/30' : 
          'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-blue-500/30'
        }`}>
          <div className="mr-3">
            {notification.type === 'success' && <Save size={20} />}
            {notification.type === 'warning' && <Save size={20} />}
            {notification.type === 'error' && <X size={20} />}
            {notification.type === 'info' && <Save size={20} />}
          </div>
          <span className="font-medium">{notification.message}</span>
          <button onClick={() => setNotification({...notification, show: false})} className="ml-4 hover:scale-110 transition-transform">
            <X size={16} />
          </button>
        </div>
      )}

      <main className="p-4 sm:p-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8 gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white">Birds Configuration</h1>
            <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm sm:text-base">Manage your bird inventory with ease</p>
          </div>
          <button 
            onClick={() => setDarkMode(!darkMode)}
            className="p-3 rounded-xl bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 self-end sm:self-auto"
          >
            {darkMode ? <Sun className="text-yellow-400" size={20} /> : <Moon className="text-indigo-600" size={20} />}
          </button>
        </div>

        {/* Stats Cards - Only 2 as requested */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <div className="bg-gradient-to-r from-purple-500 to-indigo-500 rounded-2xl p-4 sm:p-6 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-sm font-medium opacity-80">Total Birds</h3>
                <p className="text-2xl sm:text-3xl font-bold mt-2">{birds.length}</p>
              </div>
              <div className="bg-white/20 p-2 sm:p-3 rounded-xl">
                <Package className="text-white" size={18} />
              </div>
            </div>
            <div className="w-full bg-white bg-opacity-20 rounded-full h-2 mt-4">
              <div className="bg-white h-2 rounded-full transition-all duration-1000" style={{ width: '100%' }}></div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 sm:p-6 shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Active Birds</h3>
                <p className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white mt-2">
                  {birds.filter(bird => bird.status === "Active").length}
                </p>
              </div>
              <div className="bg-green-100 dark:bg-green-900/30 p-2 sm:p-3 rounded-xl">
                <TrendingUp className="text-green-600 dark:text-green-400" size={18} />
              </div>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mt-4">
              <div className="bg-gradient-to-r from-green-400 to-emerald-500 h-2 rounded-full transition-all duration-1000" style={{ width: `${(birds.filter(bird => bird.status === "Active").length / birds.length) * 100}%` }}></div>
            </div>
          </div>
        </div>

        {/* Filters and Actions */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-4 sm:p-6 mb-6 sm:mb-8 hover:shadow-xl transition-all duration-300">
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <div className="flex flex-wrap gap-2 mb-4 md:mb-0">
              <button 
                onClick={() => setActiveTab("all")} 
                className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-300 hover:-translate-y-0.5 ${
                  activeTab === "all" 
                    ? "bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-lg shadow-purple-500/30" 
                    : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                All Birds
              </button>
              <button 
                onClick={() => setActiveTab("active")} 
                className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-300 hover:-translate-y-0.5 ${
                  activeTab === "active" 
                    ? "bg-gradient-to-r from-green-400 to-emerald-500 text-white shadow-lg shadow-green-500/30" 
                    : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                Active
              </button>
              <button 
                onClick={() => setActiveTab("inactive")} 
                className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-300 hover:-translate-y-0.5 ${
                  activeTab === "inactive" 
                    ? "bg-gradient-to-r from-red-400 to-red-500 text-white shadow-lg shadow-red-500/30" 
                    : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                Inactive
              </button>
              <button 
                onClick={() => setActiveTab("lowstock")} 
                className={`px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl text-xs sm:text-sm font-medium transition-all duration-300 hover:-translate-y-0.5 ${
                  activeTab === "lowstock" 
                    ? "bg-gradient-to-r from-amber-400 to-amber-500 text-white shadow-lg shadow-amber-500/30" 
                    : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
              >
                Low Stock
              </button>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="Search birds..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full sm:w-48 md:w-64 border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none bg-white dark:bg-gray-700 text-gray-800 dark:text-white transition-all duration-300 focus:shadow-lg text-sm sm:text-base"
                />
              </div>
              
              <div className="relative">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="appearance-none pl-4 pr-10 py-2 w-full border border-gray-300 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none bg-white dark:bg-gray-700 text-gray-800 dark:text-white transition-all duration-300 focus:shadow-lg text-sm sm:text-base"
                >
                  <option value="All">All Status</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
              </div>
              
              <button 
                onClick={() => setIsModalOpen(true)}
                className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-3 sm:px-4 py-2 rounded-xl flex items-center justify-center space-x-1 sm:space-x-2 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 text-sm sm:text-base"
              >
                <Plus size={18} />
                <span>Add Bird</span>
              </button>
            </div>
          </div>
        </div>

        {/* Birds Table */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 overflow-hidden hover:shadow-xl transition-all duration-300">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800">
                <tr>
                  <th className="p-3 sm:p-4 text-left font-semibold text-gray-600 dark:text-gray-300 text-xs sm:text-sm">Bird</th>
                  <th className="p-3 sm:p-4 text-left font-semibold text-gray-600 dark:text-gray-300 text-xs sm:text-sm cursor-pointer" onClick={() => handleSort('price')}>
                    <div className="flex items-center group">
                      <span>Price</span>
                      {sortConfig.key === 'price' && (
                        <ChevronDown size={14} className={`ml-1 transition-transform ${sortConfig.direction === 'descending' ? 'rotate-180' : ''}`} />
                      )}
                    </div>
                  </th>
                  <th className="p-3 sm:p-4 text-left font-semibold text-gray-600 dark:text-gray-300 text-xs sm:text-sm">Stock</th>
                  <th className="p-3 sm:p-4 text-left font-semibold text-gray-600 dark:text-gray-300 text-xs sm:text-sm">Speed</th>
                  <th className="p-3 sm:p-4 text-left font-semibold text-gray-600 dark:text-gray-300 text-xs sm:text-sm">Weight</th>
                  <th className="p-3 sm:p-4 text-left font-semibold text-gray-600 dark:text-gray-300 text-xs sm:text-sm">Scale</th>
                  <th className="p-3 sm:p-4 text-left font-semibold text-gray-600 dark:text-gray-300 text-xs sm:text-sm">Flop %</th>
                  <th className="p-3 sm:p-4 text-left font-semibold text-gray-600 dark:text-gray-300 text-xs sm:text-sm">Status</th>
                  <th className="p-3 sm:p-4 text-right font-semibold text-gray-600 dark:text-gray-300 text-xs sm:text-sm">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredBirds.map((bird) => (
                  <tr
                    key={bird.id}
                    className="border-t border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-150 group"
                  >
                    <td className="p-3 sm:p-4">
                      <div className="flex items-center">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl overflow-hidden border-2 border-white dark:border-gray-600 shadow-sm group-hover:scale-105 transition-transform duration-300">
                          <img
                            src={getBirdImageSrc(bird.image)}
                            alt={bird.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="ml-3">
                          <div className="font-medium text-gray-800 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors text-sm sm:text-base">{bird.name}</div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">ID: {bird.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-3 sm:p-4">
                      <span className="px-2 py-1 bg-gradient-to-r from-purple-100 to-indigo-100 dark:from-purple-900/30 dark:to-indigo-900/30 text-purple-700 dark:text-purple-300 rounded-full text-xs font-semibold transition-all duration-300 group-hover:shadow-lg">
                        ₹{bird.price}
                      </span>
                    </td>
                    <td className="p-3 sm:p-4">
                      <StockIndicator stock={bird.stock} />
                    </td>
                    <td className="p-3 sm:p-4">
                      <span className="px-2 py-1 bg-gradient-to-r from-blue-100 to-blue-200 dark:from-blue-900/30 dark:to-blue-800/30 text-blue-700 dark:text-blue-300 rounded-full text-xs font-semibold">
                        {bird.speed}x
                      </span>
                    </td>
                    <td className="p-3 sm:p-4">
                      <span className="px-2 py-1 bg-gradient-to-r from-amber-100 to-amber-200 dark:from-amber-900/30 dark:to-amber-800/30 text-amber-700 dark:text-amber-300 rounded-full text-xs font-semibold">
                        {bird.weight}kg
                      </span>
                    </td>
                    <td className="p-3 sm:p-4">
                      <span className="px-2 py-1 bg-gradient-to-r from-green-100 to-green-200 dark:from-green-900/30 dark:to-green-800/30 text-green-700 dark:text-green-300 rounded-full text-xs font-semibold">
                        {bird.scale}x
                      </span>
                    </td>
                    <td className="p-3 sm:p-4">
                      <span className="px-2 py-1 bg-gradient-to-r from-pink-100 to-pink-200 dark:from-pink-900/30 dark:to-pink-800/30 text-pink-700 dark:text-pink-300 rounded-full text-xs font-semibold">
                        {bird.flopChance}%
                      </span>
                    </td>
                    <td className="p-3 sm:p-4">
                      <div className="relative inline-block">
                        <select
                          value={bird.status}
                          onChange={(e) => handleStatusChange(bird.id, e.target.value)}
                          className={`appearance-none px-2 py-1 sm:px-3 sm:py-1.5 rounded-full text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all duration-300 ${
                            bird.status === "Active" 
                              ? "bg-gradient-to-r from-green-100 to-green-200 dark:from-green-900/30 dark:to-green-800/30 text-green-800 dark:text-green-300 focus:ring-green-500" 
                              : "bg-gradient-to-r from-red-100 to-red-200 dark:from-red-900/30 dark:to-red-800/30 text-red-800 dark:text-red-300 focus:ring-red-500"
                          }`}
                        >
                          <option value="Active">Active</option>
                          <option value="Inactive">Inactive</option>
                        </select>
                        <ChevronDown className="absolute right-1.5 top-1/2 transform -translate-y-1/2 pointer-events-none" size={10} />
                      </div>
                    </td>
                    <td className="p-3 sm:p-4">
                      <div className="flex justify-end space-x-1 sm:space-x-2">
                        <button
                          onClick={() => openEditModal(bird)}
                          className="p-1.5 sm:p-2 rounded-full bg-gradient-to-r from-blue-100 to-blue-200 dark:from-blue-900/30 dark:to-blue-800/30 text-blue-600 dark:text-blue-400 hover:from-blue-200 hover:to-blue-300 dark:hover:from-blue-800/50 dark:hover:to-blue-700/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
                          title="Edit"
                        >
                          <Edit size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(bird.id)}
                          className="p-1.5 sm:p-2 rounded-full bg-gradient-to-r from-red-100 to-red-200 dark:from-red-900/30 dark:to-red-800/30 text-red-600 dark:text-red-400 hover:from-red-200 hover:to-red-300 dark:hover:from-red-800/50 dark:hover:to-red-700/50 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
                          title="Delete"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredBirds.length === 0 && (
                  <tr>
                    <td colSpan="9" className="p-6 sm:p-8 text-center text-gray-500 dark:text-gray-400 text-sm sm:text-base">
                      No birds found. Try adjusting your search or filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className={`fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-2 sm:p-4 z-50 transition-opacity duration-300 ${modalAnimation === 'enter' ? 'opacity-100' : 'opacity-0'}`}>
          <div className={`bg-white dark:bg-gray-800 rounded-2xl sm:rounded-3xl shadow-2xl w-full max-w-4xl mx-2 sm:mx-4 transition-all duration-300 ${modalAnimation === 'enter' ? 'scale-100 opacity-100' : 'scale-95 opacity-0'} max-h-[95vh] overflow-y-auto`}>
            <div className="p-4 sm:p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800 rounded-t-2xl sm:rounded-t-3xl">
              <h2 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-white">
                {editingBird ? "Edit Bird" : "Add New Bird"}
              </h2>
              <button 
                onClick={closeModal}
                className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-300"
              >
                <X size={20} className="text-gray-500 dark:text-gray-400" />
              </button>
            </div>
            
            <div className="p-4 sm:p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                {/* Left side - Form */}
                <div className="space-y-3 sm:space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 sm:mb-2">Bird Name</label>
                    <input
                      type="text"
                      value={editingBird ? editingBird.name : newBird.name}
                      onChange={(e) => 
                        editingBird 
                          ? setEditingBird({...editingBird, name: e.target.value})
                          : setNewBird({...newBird, name: e.target.value})
                      }
                      className="w-full border border-gray-300 dark:border-gray-600 p-2 sm:p-3 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none bg-white dark:bg-gray-700 text-gray-800 dark:text-white transition-all duration-300 focus:shadow-lg text-sm sm:text-base"
                      placeholder="e.g., Sparrow"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 sm:mb-2">Price (₹)</label>
                    <input
                      type="number"
                      value={editingBird ? editingBird.price : newBird.price}
                      onChange={(e) => 
                        editingBird 
                          ? setEditingBird({...editingBird, price: Number(e.target.value)})
                          : setNewBird({...newBird, price: e.target.value})
                      }
                      className="w-full border border-gray-300 dark:border-gray-600 p-2 sm:p-3 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none bg-white dark:bg-gray-700 text-gray-800 dark:text-white transition-all duration-300 focus:shadow-lg text-sm sm:text-base"
                      placeholder="e.g., 25"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 sm:mb-2">Stock</label>
                    <input
                      type="number"
                      value={editingBird ? editingBird.stock : newBird.stock}
                      onChange={(e) => 
                        editingBird 
                          ? setEditingBird({...editingBird, stock: Number(e.target.value)})
                          : setNewBird({...newBird, stock: e.target.value})
                      }
                      className="w-full border border-gray-300 dark:border-gray-600 p-2 sm:p-3 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none bg-white dark:bg-gray-700 text-gray-800 dark:text-white transition-all duration-300 focus:shadow-lg text-sm sm:text-base"
                      placeholder="Enter stock quantity"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 sm:mb-2">Speed (1-10)</label>
                      <input
                        type="number"
                        min="1"
                        max="10"
                        value={editingBird ? editingBird.speed : newBird.speed}
                        onChange={(e) => 
                          editingBird 
                            ? setEditingBird({...editingBird, speed: Number(e.target.value)})
                            : setNewBird({...newBird, speed: e.target.value})
                        }
                        className="w-full border border-gray-300 dark:border-gray-600 p-2 sm:p-3 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none bg-white dark:bg-gray-700 text-gray-800 dark:text-white transition-all duration-300 focus:shadow-lg text-sm sm:text-base"
                        placeholder="1-10"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 sm:mb-2">Spawn Time (s)</label>
                      <input
                        type="number"
                        min="0"
                        max="60"
                        value={editingBird ? editingBird.spawnTime : newBird.spawnTime}
                        onChange={(e) => 
                          editingBird 
                            ? setEditingBird({...editingBird, spawnTime: Number(e.target.value)})
                            : setNewBird({...newBird, spawnTime: e.target.value})
                        }
                        className="w-full border border-gray-300 dark:border-gray-600 p-2 sm:p-3 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none bg-white dark:bg-gray-700 text-gray-800 dark:text-white transition-all duration-300 focus:shadow-lg text-sm sm:text-base"
                        placeholder="0-60"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 sm:mb-2">Weight (kg)</label>
                      <input
                        type="number"
                        step="0.1"
                        min="0.1"
                        max="10"
                        value={editingBird ? editingBird.weight : newBird.weight}
                        onChange={(e) => 
                          editingBird 
                            ? setEditingBird({...editingBird, weight: Number(e.target.value)})
                            : setNewBird({...newBird, weight: e.target.value})
                        }
                        className="w-full border border-gray-300 dark:border-gray-600 p-2 sm:p-3 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none bg-white dark:bg-gray-700 text-gray-800 dark:text-white transition-all duration-300 focus:shadow-lg text-sm sm:text-base"
                        placeholder="0.1-10"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 sm:mb-2">Scale (x)</label>
                      <input
                        type="number"
                        step="0.1"
                        min="0.5"
                        max="3"
                        value={editingBird ? editingBird.scale : newBird.scale}
                        onChange={(e) => 
                          editingBird 
                            ? setEditingBird({...editingBird, scale: Number(e.target.value)})
                            : setNewBird({...newBird, scale: e.target.value})
                        }
                        className="w-full border border-gray-300 dark:border-gray-600 p-2 sm:p-3 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none bg-white dark:bg-gray-700 text-gray-800 dark:text-white transition-all duration-300 focus:shadow-lg text-sm sm:text-base"
                        placeholder="0.5-3"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 sm:mb-2">Flop Chance (%)</label>
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={editingBird ? editingBird.flopChance : newBird.flopChance}
                        onChange={(e) => 
                          editingBird 
                            ? setEditingBird({...editingBird, flopChance: Number(e.target.value)})
                            : setNewBird({...newBird, flopChance: e.target.value})
                        }
                        className="w-full border border-gray-300 dark:border-gray-600 p-2 sm:p-3 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none bg-white dark:bg-gray-700 text-gray-800 dark:text-white transition-all duration-300 focus:shadow-lg text-sm sm:text-base"
                        placeholder="0-100"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 sm:mb-2">Status</label>
                      <div className="flex space-x-2 sm:space-x-4 pt-1.5">
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="status"
                            value="Active"
                            checked={(editingBird ? editingBird.status : newBird.status) === "Active"}
                            onChange={(e) => 
                              editingBird 
                                ? setEditingBird({...editingBird, status: e.target.value})
                                : setNewBird({...newBird, status: e.target.value})
                            }
                            className="mr-1.5 sm:mr-2 text-purple-600 focus:ring-purple-500"
                          />
                          <span className="text-xs sm:text-sm text-gray-700 dark:text-gray-300">Active</span>
                        </label>
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="status"
                            value="Inactive"
                            checked={(editingBird ? editingBird.status : newBird.status) === "Inactive"}
                            onChange={(e) => 
                              editingBird 
                                ? setEditingBird({...editingBird, status: e.target.value})
                                : setNewBird({...newBird, status: e.target.value})
                            }
                            className="mr-1.5 sm:mr-2 text-purple-600 focus:ring-purple-500"
                          />
                          <span className="text-xs sm:text-sm text-gray-700 dark:text-gray-300">Inactive</span>
                        </label>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 sm:mb-2">Custom Image Upload (optional)</label>
                    <label className="flex items-center gap-2 cursor-pointer bg-gradient-to-r from-purple-100 to-indigo-100 dark:from-purple-900/30 dark:to-indigo-900/30 text-purple-600 dark:text-purple-400 px-3 sm:px-4 py-2 sm:py-3 rounded-xl hover:shadow-lg transition-all duration-300 justify-center text-xs sm:text-sm">
                      <Upload size={16} />
                      <span>Upload image</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>
                
                {/* Right side - Preview and Gallery */}
                <div className="space-y-3 sm:space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 sm:mb-2">Choose from gallery</h3>
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                      {birdImages.map((img) => (
                        <div 
                          key={img.id}
                          className={`relative cursor-pointer rounded-lg overflow-hidden border-2 transition-all duration-300 hover:scale-105 ${
                            (editingBird ? editingBird.image : newBird.image) === img.id 
                              ? 'border-purple-500 shadow-lg shadow-purple-500/30' 
                              : 'border-gray-200 dark:border-gray-600 hover:border-purple-300 dark:hover:border-purple-500'
                          }`}
                          onClick={() => handleImageSelect(img.id)}
                        >
                          <img
                            src={img.src}
                            alt={img.name}
                            className="w-full h-14 sm:h-16 object-cover"
                          />
                          {(editingBird ? editingBird.image : newBird.image) === img.id && (
                            <div className="absolute inset-0 bg-purple-500 bg-opacity-70 flex items-center justify-center">
                              <Check size={14} className="text-white" />
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 p-3 sm:p-4 rounded-2xl">
                    <h3 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-white mb-2 sm:mb-3 text-center">Preview</h3>
                    
                    <div className="bg-white dark:bg-gray-700 rounded-xl p-3 sm:p-4 shadow-md">
                      <div className="w-full h-32 sm:h-40 rounded-lg overflow-hidden mb-2 sm:mb-3">
                        <img
                          src={getBirdImageSrc(editingBird ? editingBird.image : newBird.image)}
                          alt="Preview"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      
                      <div className="text-center">
                        <h4 className="text-base sm:text-lg font-bold text-gray-800 dark:text-white mb-1">
                          {editingBird ? editingBird.name : newBird.name || "Bird Name"}
                        </h4>
                        <p className="text-sm sm:text-md text-purple-600 dark:text-purple-400 font-semibold mb-1 sm:mb-2">
                          ₹{editingBird ? editingBird.price : newBird.price || "0"}
                        </p>
                        
                        <div className="flex flex-wrap justify-center gap-1 sm:gap-2 mb-1 sm:mb-2">
                          <span className="px-1.5 py-0.5 sm:px-2 sm:py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-xs">
                            Speed: {editingBird ? editingBird.speed : newBird.speed || "5"}x
                          </span>
                          <span className="px-1.5 py-0.5 sm:px-2 sm:py-1 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 rounded-full text-xs">
                            Spawn: {editingBird ? editingBird.spawnTime : newBird.spawnTime || "0"}s
                          </span>
                          <span className="px-1.5 py-0.5 sm:px-2 sm:py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full text-xs">
                            Weight: {editingBird ? editingBird.weight : newBird.weight || "1.0"}kg
                          </span>
                          <span className="px-1.5 py-0.5 sm:px-2 sm:py-1 bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300 rounded-full text-xs">
                            Flop: {editingBird ? editingBird.flopChance : newBird.flopChance || "15"}%
                          </span>
                        </div>
                        
                        <div className="flex items-center justify-center mb-1 sm:mb-2">
                          <div className={`inline-flex items-center px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-xs font-semibold transition-all duration-300 ${
                            (editingBird ? editingBird.status : newBird.status) === "Active" 
                              ? "bg-gradient-to-r from-green-400 to-emerald-500 text-white shadow-lg shadow-green-500/30" 
                              : "bg-gradient-to-r from-red-400 to-red-500 text-white shadow-lg shadow-red-500/30"
                          }`}>
                            {(editingBird ? editingBird.status : newBird.status) === "Active" ? (
                              <>
                                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rounded-full mr-1 sm:mr-2"></div> Active
                              </>
                            ) : (
                              <>
                                <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rounded-full mr-1 sm:mr-2"></div> Inactive
                              </>
                            )}
                          </div>
                        </div>
                        
                        <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                          Stock: {editingBird ? editingBird.stock : newBird.stock || "0"}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-4 sm:p-6 border-t border-gray-200 dark:border-gray-700 flex justify-end space-x-2 sm:space-x-3 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 rounded-b-2xl sm:rounded-b-3xl">
              <button
                onClick={closeModal}
                className="px-3 sm:px-4 py-1.5 sm:py-2 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-300 hover:-translate-y-0.5 text-sm sm:text-base"
              >
                Cancel
              </button>
              <button
                onClick={editingBird ? handleSaveEdit : handleAddBird}
                className="px-3 sm:px-4 py-1.5 sm:py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 flex items-center space-x-1 sm:space-x-2 text-sm sm:text-base"
                disabled={editingBird ? !editingBird.name : !newBird.name}
              >
                <Save size={16} />
                <span>{editingBird ? "Save Changes" : "Add Bird"}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GameSetting;
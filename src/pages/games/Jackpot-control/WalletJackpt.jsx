import React, { useState } from "react";
import {
  Settings,
  BarChart2,
  Gift,
  Save,
  Trash2,
  RotateCcw,
  Plus,
  ArrowRight,
  UserCheck,
  Ban,
  Search,
  Check,
} from "lucide-react";

const JackpotAdminDashboard = () => {
  // State for Jackpot Settings
  const [jackpotSettings, setJackpotSettings] = useState({
    minBet: 50,
    maxBet: 5000,
    roundDuration: 60,
    commission: 5,
    autoStart: true,
  });
  
  // Dummy Data for Analytics & User Management
  const [analytics, setAnalytics] = useState({
    dailyBets: [1200, 1500, 1800, 2500, 2200, 3100, 2800],
    poolSize: [5000, 6500, 7800, 9100, 8500, 10200, 9900],
    biggestWinners: [
      { name: "Vijay Sharma", amount: 15000, date: "2024-09-01" },
      { name: "Anjali Gupta", amount: 12500, date: "2024-08-28" },
      { name: "Ravi Kumar", amount: 10000, date: "2024-08-25" },
    ],
    mostActivePlayers: [
      { name: "Suresh", bets: 580, totalBet: 25000 },
      { name: "Priya", bets: 410, totalBet: 18000 },
      { name: "Manish", bets: 350, totalBet: 15500 },
    ],
  });

  const [promotions, setPromotions] = useState([
    { id: 1, code: "BONUS50", amount: 50, expiry: "2025-12-31" },
    { id: 2, code: "WELCOME100", amount: 100, expiry: "2025-10-15" },
  ]);

  const [newPromo, setNewPromo] = useState({
    code: "",
    amount: 0,
    expiry: "",
  });

  const [activeTab, setActiveTab] = useState("settings");

  // --- Functions
  const handleJackpotSettingsChange = (key, value) => {
    setJackpotSettings((prev) => ({ ...prev, [key]: value }));
  };

  const validateSettings = () => {
    if (jackpotSettings.minBet <= 0 || jackpotSettings.maxBet <= 0) {
      alert("⚠️ Error: Minimum aur Maximum bet 0 se zyada hona chahiye.");
      return false;
    }
    if (jackpotSettings.maxBet < jackpotSettings.minBet) {
      alert("⚠️ Error: Maximum bet Minimum bet se zyada hona chahiye.");
      return false;
    }
    if (jackpotSettings.roundDuration < 10) {
      alert("⚠️ Error: Round duration kam se kam 10 seconds hona chahiye.");
      return false;
    }
    if (jackpotSettings.commission < 0 || jackpotSettings.commission > 50) {
      alert("⚠️ Error: Commission 0% - 50% ke beech hona chahiye.");
      return false;
    }
    return true;
  };

  const handleSaveJackpotSettings = () => {
    if (!validateSettings()) return;
    console.log("✅ Jackpot Settings Saved:", jackpotSettings);
    alert("🎉 Saved: Jackpot settings successfully update ho gaye!");
  };

  const handleResetJackpotSettings = () => {
    if (window.confirm("Kya aap sach mein sabhi jackpot settings ko default pe reset karna chahte hain?")) {
      setJackpotSettings({
        minBet: 50,
        maxBet: 5000,
        roundDuration: 60,
        commission: 5,
        autoStart: true,
      });
      alert("♻️ Jackpot Reset: Sabhi settings default par wapas aa gaye.");
    }
  };

  const handleAddPromotion = () => {
    if (!newPromo.code || !newPromo.amount || !newPromo.expiry) {
      alert("Please saari fields bharein.");
      return;
    }
    const newPromotion = {
      id: promotions.length + 1,
      ...newPromo,
      amount: Number(newPromo.amount),
    };
    setPromotions([...promotions, newPromotion]);
    setNewPromo({ code: "", amount: 0, expiry: "" });
    alert("Naya promotional code add ho gaya!");
  };

  const handleDeletePromotion = (id) => {
    if (window.confirm("Kya aap sach mein is promotional code ko delete karna chahte hain?")) {
      setPromotions(promotions.filter(promo => promo.id !== id));
      alert("Promotional code delete ho gaya.");
    }
  };

  // --- Components for each tab
  const renderSettings = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div>
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Minimum Bet (₹)</label>
          <input
            type="number"
            value={jackpotSettings.minBet}
            onChange={(e) => handleJackpotSettingsChange("minBet", Number(e.target.value))}
            className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 mt-1 outline-none transition"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Maximum Bet (₹)</label>
          <input
            type="number"
            value={jackpotSettings.maxBet}
            onChange={(e) => handleJackpotSettingsChange("maxBet", Number(e.target.value))}
            className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 mt-1 outline-none transition"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Round Duration (seconds)</label>
          <input
            type="number"
            value={jackpotSettings.roundDuration}
            onChange={(e) => handleJackpotSettingsChange("roundDuration", Number(e.target.value))}
            className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 mt-1 outline-none transition"
          />
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">House Commission (%)</label>
          <input
            type="number"
            value={jackpotSettings.commission}
            onChange={(e) => handleJackpotSettingsChange("commission", Number(e.target.value))}
            className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 mt-1 outline-none transition"
          />
        </div>
        <div className="flex items-end">
          <label className="flex items-center gap-3 mt-1">
            <input
              type="checkbox"
              checked={jackpotSettings.autoStart}
              onChange={(e) => handleJackpotSettingsChange("autoStart", e.target.checked)}
              className="h-5 w-5 rounded-lg"
            />
            <span className="text-gray-700 dark:text-gray-300">Auto Start Rounds</span>
          </label>
        </div>
      </div>
      <div className="mt-6 flex gap-4">
        <button
          onClick={handleSaveJackpotSettings}
          className="relative px-6 py-3 rounded-xl font-medium text-white shadow-md bg-gradient-to-r from-green-400 to-emerald-600 hover:from-green-500 hover:to-emerald-700 active:scale-95 transition-all duration-300 flex items-center gap-2"
        >
          <Save className="w-5 h-5" />
          Settings Save Karein
        </button>
        <button
          onClick={handleResetJackpotSettings}
          className="relative px-6 py-3 rounded-xl font-medium text-white shadow-md bg-gradient-to-r from-red-400 to-pink-600 hover:from-red-500 hover:to-pink-700 active:scale-95 transition-all duration-300 flex items-center gap-2"
        >
          <RotateCcw className="w-5 h-5" />
          Defaults Reset Karein
        </button>
      </div>
    </div>
  );

  const renderReports = () => (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-100 dark:bg-gray-700 p-6 rounded-2xl shadow-inner">
          <h3 className="text-lg font-bold mb-4 text-gray-800 dark:text-white">Daily Bets & Pool Size</h3>
          <div className="h-48 bg-gray-200 dark:bg-gray-600 rounded-lg flex items-center justify-center text-gray-500">
            [Graphs ka Placeholder]
          </div>
        </div>
        <div className="bg-gray-100 dark:bg-gray-700 p-6 rounded-2xl shadow-inner">
          <h3 className="text-lg font-bold mb-4 text-gray-800 dark:text-white">Pool Size Trends</h3>
          <div className="h-48 bg-gray-200 dark:bg-gray-600 rounded-lg flex items-center justify-center text-gray-500">
            [Graph ka Placeholder]
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-200">
          <h3 className="text-lg font-bold mb-4 text-gray-800 dark:text-white">Sabse bade Jackpot Winners</h3>
          <ul className="space-y-3">
            {analytics.biggestWinners.map((winner, index) => (
              <li key={index} className="flex items-center justify-between p-3 bg-blue-50 dark:bg-gray-700 rounded-xl">
                <div>
                  <div className="font-semibold text-blue-700 dark:text-blue-300">{winner.name}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">₹{winner.amount} on {winner.date}</div>
                </div>
                <ArrowRight className="w-4 h-4 text-blue-500 dark:text-blue-400" />
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-200">
          <h3 className="text-lg font-bold mb-4 text-gray-800 dark:text-white">Sabse Active Players</h3>
          <ul className="space-y-3">
            {analytics.mostActivePlayers.map((player, index) => (
              <li key={index} className="flex items-center justify-between p-3 bg-green-50 dark:bg-gray-700 rounded-xl">
                <div>
                  <div className="font-semibold text-green-700 dark:text-green-300">{player.name}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Total Bets: {player.bets} | Total Amount: ₹{player.totalBet}</div>
                </div>
                <ArrowRight className="w-4 h-4 text-green-500 dark:text-green-400" />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );

  const renderPromotions = () => (
    <div className="space-y-6">
      <div className="bg-gray-100 dark:bg-gray-700 p-6 rounded-2xl shadow-inner">
        <h3 className="text-lg font-bold mb-4 text-gray-800 dark:text-white">Naya Bonus Code Add Karein</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Bonus Code (e.g. WELCOME)"
            value={newPromo.code}
            onChange={(e) => setNewPromo({...newPromo, code: e.target.value})}
            className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-blue-400 dark:bg-gray-800 outline-none transition"
          />
          <input
            type="number"
            placeholder="Amount (₹)"
            value={newPromo.amount}
            onChange={(e) => setNewPromo({...newPromo, amount: e.target.value})}
            className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-blue-400 dark:bg-gray-800 outline-none transition"
          />
          <input
            type="date"
            placeholder="Expiry Date"
            value={newPromo.expiry}
            onChange={(e) => setNewPromo({...newPromo, expiry: e.target.value})}
            className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-blue-400 dark:bg-gray-800 outline-none transition"
          />
        </div>
        <button
          onClick={handleAddPromotion}
          className="mt-4 px-6 py-3 rounded-xl font-medium text-white shadow-md bg-gradient-to-r from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700 active:scale-95 transition-all duration-300 flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Code Add Karein
        </button>
      </div>
      
      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-200">
        <h3 className="text-lg font-bold mb-4 text-gray-800 dark:text-white">Active Bonus Codes</h3>
        <ul className="space-y-3">
          {promotions.map((promo) => (
            <li key={promo.id} className="flex items-center justify-between p-3 bg-purple-50 dark:bg-gray-700 rounded-xl">
              <div>
                <div className="font-semibold text-purple-700 dark:text-purple-300">{promo.code}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">₹{promo.amount} | Valid till: {promo.expiry}</div>
              </div>
              <button
                onClick={() => handleDeletePromotion(promo.id)}
                className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition"
                title="Delete Code"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen p-8 font-sans text-gray-800 dark:text-gray-200 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-extrabold text-center mb-2 text-gray-900 dark:text-white">
            Jackpot Admin Dashboard
          </h1>
          <p className="text-center text-gray-500 dark:text-gray-400">
            Game settings, reports, aur promotions manage karein.
          </p>
        </header>
        
        {/* Tab Navigation */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-3 mb-8">
          <div className="flex justify-around items-center space-x-2">
            <button
              onClick={() => setActiveTab("settings")}
              className={`flex-1 flex items-center justify-center py-3 px-4 rounded-xl font-semibold transition-all duration-300 ${
                activeTab === "settings" ? "bg-blue-600 text-white shadow-lg" : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
            >
              <Settings className="w-5 h-5 mr-2" />
              Jackpot Settings
            </button>
            <button
              onClick={() => setActiveTab("reports")}
              className={`flex-1 flex items-center justify-center py-3 px-4 rounded-xl font-semibold transition-all duration-300 ${
                activeTab === "reports" ? "bg-blue-600 text-white shadow-lg" : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
            >
              <BarChart2 className="w-5 h-5 mr-2" />
              Reports & Analytics
            </button>
            <button
              onClick={() => setActiveTab("promotions")}
              className={`flex-1 flex items-center justify-center py-3 px-4 rounded-xl font-semibold transition-all duration-300 ${
                activeTab === "promotions" ? "bg-blue-600 text-white shadow-lg" : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              }`}
            >
              <Gift className="w-5 h-5 mr-2" />
              Promotions & Bonuses
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 transition-all duration-300">
          {activeTab === "settings" && renderSettings()}
          {activeTab === "reports" && renderReports()}
          {activeTab === "promotions" && renderPromotions()}
        </div>
      </div>
    </div>
  );
};

export default JackpotAdminDashboard;

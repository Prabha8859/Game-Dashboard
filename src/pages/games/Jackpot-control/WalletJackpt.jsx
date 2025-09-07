import React, { useState } from "react";
import Swal from "sweetalert2";
import { Trash2 } from "lucide-react";

export default function JackpotControl() {
  const [settings, setSettings] = useState({
    minBet: 50,
    maxBet: 5000,
    roundDuration: 60,
    commission: 5,
    autoStart: true,
    spinRules: [
      { bet: 50, spins: 3 },
      { bet: 100, spins: 5 },
      { bet: 200, spins: 10 },
    ],
  });

  // --- generic input update
  const handleChange = (key, value) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  // --- spin rules handling
  const updateSpinRule = (index, key, value) => {
    const updated = [...settings.spinRules];
    updated[index][key] = Number(value);
    setSettings({ ...settings, spinRules: updated });
  };

  const addSpinRule = () => {
    setSettings((prev) => ({
      ...prev,
      spinRules: [...prev.spinRules, { bet: 0, spins: 0 }],
    }));
  };

  const removeSpinRule = (index) => {
    const updated = settings.spinRules.filter((_, i) => i !== index);
    setSettings({ ...settings, spinRules: updated });
  };

  // --- validation before save
  const validateSettings = () => {
    if (settings.minBet <= 0 || settings.maxBet <= 0) {
      Swal.fire("⚠️ Error", "Minimum and Maximum bet must be greater than 0", "error");
      return false;
    }
    if (settings.maxBet < settings.minBet) {
      Swal.fire("⚠️ Error", "Maximum bet must be greater than Minimum bet", "error");
      return false;
    }
    if (settings.roundDuration < 10) {
      Swal.fire("⚠️ Error", "Round duration should be at least 10 seconds", "error");
      return false;
    }
    if (settings.commission < 0 || settings.commission > 50) {
      Swal.fire("⚠️ Error", "Commission should be between 0% - 50%", "error");
      return false;
    }
    return true;
  };

  // --- handle save
  const handleSave = () => {
    if (!validateSettings()) return;

    console.log("✅ Jackpot Settings Saved:", settings);
    Swal.fire("🎉 Saved", "Jackpot settings updated successfully!", "success");
  };

  // --- handle reset
  const handleReset = () => {
    Swal.fire({
      title: "Reset Jackpot?",
      text: "This will clear current jackpot progress.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, reset",
    }).then((res) => {
      if (res.isConfirmed) {
        setSettings({
          minBet: 50,
          maxBet: 5000,
          roundDuration: 60,
          commission: 5,
          autoStart: true,
          spinRules: [
            { bet: 50, spins: 3 },
            { bet: 100, spins: 5 },
            { bet: 200, spins: 10 },
          ],
        });
        Swal.fire("♻️ Jackpot Reset", "All settings reverted to default.", "success");
      }
    });
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
      <h2
        className="text-xl font-semibold mb-4 cursor-pointer"
        title="Manage all jackpot settings here"
      >
        🎛 Jackpot Control
      </h2>

      {/* General Settings */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="text-sm font-medium">Minimum Bet</label>
          <input
            type="number"
            value={settings.minBet}
            onChange={(e) => handleChange("minBet", Number(e.target.value))}
            className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 mt-1 outline-none transition"
          />
        </div>
        <div>
          <label className="text-sm font-medium">Maximum Bet</label>
          <input
            type="number"
            value={settings.maxBet}
            onChange={(e) => handleChange("maxBet", Number(e.target.value))}
            className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 mt-1 outline-none transition"
          />
        </div>
        <div>
          <label className="text-sm font-medium">Round Duration (seconds)</label>
          <input
            type="number"
            value={settings.roundDuration}
            onChange={(e) => handleChange("roundDuration", Number(e.target.value))}
            className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 mt-1 outline-none transition"
          />
        </div>
        <div>
          <label className="text-sm font-medium">House Commission (%)</label>
          <input
            type="number"
            value={settings.commission}
            onChange={(e) => handleChange("commission", Number(e.target.value))}
            className="w-full border p-3 rounded-xl focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 mt-1 outline-none transition"
          />
        </div>
        <label className="flex items-center gap-3 mt-2">
          <input
            type="checkbox"
            checked={settings.autoStart}
            onChange={(e) => handleChange("autoStart", e.target.checked)}
            className="h-5 w-5"
          />
          <span className="text-gray-700 dark:text-gray-300">Auto Start Rounds</span>
        </label>
      </div>

      {/* Spin Rules
      <div className="mt-6">
        <h3
          className="text-lg font-semibold mb-3 cursor-pointer"
          title="Define spins allowed for each bet amount"
        >
          🎲 Spin Rules
        </h3>
        {settings.spinRules.map((rule, index) => (
          <div
            key={index}
            className="flex items-center gap-3 mb-3 border-b pb-2"
          >
            <input
              type="number"
              value={rule.bet}
              onChange={(e) => updateSpinRule(index, "bet", e.target.value)}
              placeholder="Bet Amount"
              className="w-1/3 border p-2 rounded-xl focus:ring-2 focus:ring-purple-400 dark:bg-gray-700 outline-none transition"
            />
            <input
              type="number"
              value={rule.spins}
              onChange={(e) => updateSpinRule(index, "spins", e.target.value)}
              placeholder="Spins Allowed"
              className="w-1/3 border p-2 rounded-xl focus:ring-2 focus:ring-purple-400 dark:bg-gray-700 outline-none transition"
            />
            <button
              onClick={() => removeSpinRule(index)}
              className="p-2 bg-red-500 text-white rounded-xl shadow-md 
                         hover:bg-red-600 active:scale-95 transition flex items-center justify-center"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
        <button
          onClick={addSpinRule}
          className="mt-3 px-5 py-2 rounded-xl font-medium text-white shadow-md 
                     bg-gradient-to-r from-blue-400 to-blue-600
                     hover:from-blue-500 hover:to-blue-700
                     active:scale-95 transition-all duration-300"
        >
          ➕ Add Rule
        </button>
      </div> */}

      {/* Action Buttons */}
      <div className="mt-6 flex gap-4">
        <button
          onClick={handleSave}
          className="relative px-6 py-2 rounded-xl font-medium text-white shadow-md 
                     bg-gradient-to-r from-green-400 to-emerald-600
                     hover:from-green-500 hover:to-emerald-700
                     active:scale-95 transition-all duration-300
                     before:absolute before:inset-0 before:rounded-xl before:bg-white/10 before:opacity-0 hover:before:opacity-100"
        >
          💾 Save Settings
        </button>

        <button
          onClick={handleReset}
          className="relative px-6 py-2 rounded-xl font-medium text-white shadow-md 
                     bg-gradient-to-r from-red-400 to-pink-600
                     hover:from-red-500 hover:to-pink-700
                     active:scale-95 transition-all duration-300
                     before:absolute before:inset-0 before:rounded-xl before:bg-white/10 before:opacity-0 hover:before:opacity-100"
        >
          ♻️ Reset Jackpot
        </button>
      </div>
    </div>
  );
}
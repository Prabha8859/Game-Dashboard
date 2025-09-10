// import React, { useState, useEffect } from "react";
// import {
//   FaUsers,
//   FaDollarSign,
//   FaGamepad,
//   FaBell,
//   FaTrophy,
//   FaUpload,
//   FaDownload,
//   FaEdit,
// } from "react-icons/fa";
// import {
//   PieChart,
//   Pie,
//   Cell,
//   Tooltip,
//   ResponsiveContainer,
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
// } from "recharts";
// import { saveAs } from "file-saver";
// import Confetti from "react-confetti";
// import Swal from "sweetalert2";

// // Games and colors
// const games = ["Ludo", "Jackpot", "Mines", "Lottery", "Bird Shooting", "Teenpatti"];
// const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AA336A", "#7733FF"];

// export default function DailyRoutine() {
//   const [selectedGame, setSelectedGame] = useState("Ludo");
//   const [selectedFilter, setSelectedFilter] = useState("Today");
//   const [notifications, setNotifications] = useState(["Server running smoothly"]);
//   const [showConfetti, setShowConfetti] = useState(false);

//   // Sample game data
//   const [gameData, setGameData] = useState({
//     Ludo: [
//       { user: "Sonali", amount: 500, round: 1 },
//       { user: "Rahul", amount: -200, round: 2 },
//       { user: "Rita", amount: 1200, round: 3 },
//     ],
//     Jackpot: [
//       { user: "Karan", amount: 2500, round: 1 },
//       { user: "Rita", amount: 500, round: 2 },
//       { user: "Sonali", amount: 3000, round: 3 },
//     ],
//     Mines: [
//       { user: "Ankit", amount: 300, round: 1 },
//       { user: "Meera", amount: -150, round: 2 },
//     ],
//     Lottery: [
//       { user: "Priya", amount: 1000, round: 1 },
//       { user: "Rahul", amount: 0, round: 2 },
//     ],
//     "Bird Shooting": [
//       { user: "Sonali", amount: 700, round: 1 },
//       { user: "Karan", amount: 300, round: 2 },
//     ],
//     Teenpatti: [
//       { user: "Rita", amount: 1200, round: 1 },
//       { user: "Ankit", amount: -500, round: 2 },
//     ],
//   });

//   // Compute summary
//   const sampleStats = {
//     profit: Object.values(gameData).flat().reduce((a, b) => a + b.amount, 0),
//     users: new Set(Object.values(gameData).flat().map(d => d.user)).size,
//     gamesPlayed: Object.values(gameData).flat().length,
//     topWinner: Object.values(gameData).flat().reduce((a, b) => (b.amount > (a.amount || 0) ? b : a), {}).user || "",
//     topLoser: Object.values(gameData).flat().reduce((a, b) => (b.amount < (a.amount || 0) ? b : a), {}).user || "",
//   };

//   // --- Handlers ---
//   const handleUpload = async () => {
//     const { value: user } = await Swal.fire({
//       title: "Enter user name",
//       input: "text",
//       inputPlaceholder: "User name",
//       showCancelButton: true,
//     });
//     if (!user) return;

//     const { value: amount } = await Swal.fire({
//       title: "Enter amount",
//       input: "number",
//       inputPlaceholder: "Amount",
//       showCancelButton: true,
//     });
//     if (amount === undefined) return;

//     const { value: round } = await Swal.fire({
//       title: "Enter round number",
//       input: "number",
//       inputPlaceholder: "Round",
//       showCancelButton: true,
//     });
//     if (round === undefined) return;

//     const updated = [...gameData[selectedGame], { user, amount: parseInt(amount), round: parseInt(round) }];
//     setGameData({ ...gameData, [selectedGame]: updated });

//     if (amount >= 2000) {
//       setShowConfetti(true);
//       setTimeout(() => setShowConfetti(false), 3000);
//       Swal.fire("🎉 Big Win!", `${user} won $${amount}`, "success");
//       setNotifications(prev => [...prev, `🎉 ${user} won $${amount}`]);
//     }
//   };

//   const handleEdit = async (index) => {
//     const { value: newAmount } = await Swal.fire({
//       title: "Enter new amount",
//       input: "number",
//       inputValue: gameData[selectedGame][index].amount,
//       showCancelButton: true,
//     });
//     if (newAmount !== undefined) {
//       const updated = [...gameData[selectedGame]];
//       updated[index].amount = parseInt(newAmount);
//       setGameData({ ...gameData, [selectedGame]: updated });

//       if (newAmount >= 2000) {
//         setShowConfetti(true);
//         setTimeout(() => setShowConfetti(false), 3000);
//         Swal.fire("🎉 Big Win!", `Updated amount: $${newAmount}`, "success");
//         setNotifications(prev => [...prev, `🎉 Updated big win $${newAmount}`]);
//       }
//     }
//   };

//   const exportCSV = () => {
//     const headers = ["User", "Amount", "Round"];
//     const rows = gameData[selectedGame].map(d => [d.user, d.amount, d.round]);
//     let csvContent =
//       "data:text/csv;charset=utf-8," +
//       [headers, ...rows].map(e => e.join(",")).join("\n");
//     const encodedUri = encodeURI(csvContent);
//     saveAs(encodedUri, `${selectedGame}_data.csv`);
//   };

//   // Leaderboard top 5
//   const leaderboardData = Object.values(gameData[selectedGame])
//     .sort((a, b) => b.amount - a.amount)
//     .slice(0, 5);

//   return (
//     <div className="bg-gradient-to-r from-blue-50 to-purple-50 min-h-screen p-6 font-sans relative">
//       {showConfetti && <Confetti recycle={false} numberOfPieces={200} />}

//       {/* Header */}
//       <div className="mb-6">
//         <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">📊 Daily Report</h1>
//         <p className="text-gray-600">Overview of today's game activities and statistics</p>
//       </div>

//       {/* Dashboard Summary */}
//       <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
//         <StatCard title="Total Profit" value={`$${sampleStats.profit}`} icon={<FaDollarSign className="text-3xl text-green-500 mb-2" />} />
//         <StatCard title="Active Users" value={sampleStats.users} icon={<FaUsers className="text-3xl text-blue-500 mb-2" />} />
//         <StatCard title="Games Played" value={sampleStats.gamesPlayed} icon={<FaGamepad className="text-3xl text-purple-500 mb-2" />} />
//         <StatCard title="Top Winner" value={sampleStats.topWinner} icon={<FaTrophy className="text-3xl text-yellow-500 mb-2" />} />
//         <StatCard title="Top Loser" value={sampleStats.topLoser} icon={<FaBell className="text-3xl text-red-500 mb-2" />} />
//       </div>

//       {/* Filters & Game Buttons */}
//       <div className="mt-8 flex flex-wrap items-center gap-4">
//         <select
//           className="border p-3 rounded-xl shadow hover:shadow-md transition bg-white"
//           value={selectedFilter}
//           onChange={e => setSelectedFilter(e.target.value)}
//         >
//           <option>Today</option>
//           <option>Yesterday</option>
//           <option>Last 7 Days</option>
//         </select>

//         {games.map(game => (
//           <button
//             key={game}
//             onClick={() => setSelectedGame(game)}
//             className={`px-5 py-3 rounded-xl font-semibold shadow transition ${selectedGame === game ? "bg-blue-500 text-white hover:bg-blue-600" : "bg-white text-gray-700 hover:bg-gray-100"}`}
//           >
//             {game}
//           </button>
//         ))}

//         <button
//           onClick={handleUpload}
//           className="flex items-center gap-2 px-5 py-3 bg-green-500 text-white rounded-xl shadow hover:bg-green-600 transition"
//         >
//           <FaUpload /> Upload Result
//         </button>

//         <button
//           onClick={exportCSV}
//           className="flex items-center gap-2 px-5 py-3 bg-purple-500 text-white rounded-xl shadow hover:bg-purple-600 transition"
//         >
//           <FaDownload /> Export CSV
//         </button>
//       </div>

//       {/* Game Data Table */}
//       <div className="mt-8 bg-white shadow-xl rounded-2xl p-6 overflow-x-auto">
//         <h2 className="font-bold text-2xl mb-4">{selectedGame} - Details</h2>
//         <table className="w-full table-auto border-collapse">
//           <thead>
//             <tr className="bg-gray-100">
//               <th className="p-3 text-left rounded-tl-xl">User</th>
//               <th className="p-3 text-left">Amount</th>
//               <th className="p-3 text-left">Round</th>
//               <th className="p-3 text-left rounded-tr-xl">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {gameData[selectedGame].map((data, idx) => (
//               <tr key={idx} className="border-b hover:bg-gray-50 transition cursor-pointer">
//                 <td className="p-3">{data.user}</td>
//                 <td className={`p-3 font-semibold ${data.amount > 0 ? "text-green-500" : "text-red-500"}`}>${data.amount}</td>
//                 <td className="p-3">{data.round}</td>
//                 <td className="p-3">
//                   <button onClick={() => handleEdit(idx)} className="text-blue-500 hover:text-blue-700 flex items-center gap-2">
//                     <FaEdit /> Edit
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Leaderboard */}
//       <div className="mt-8 bg-white shadow-xl rounded-2xl p-6">
//         <h2 className="font-bold text-2xl mb-4">Leaderboard ({selectedGame})</h2>
//         <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
//           {leaderboardData.map((d, idx) => (
//             <div key={idx} className="bg-gradient-to-br from-blue-100 to-blue-200 text-center rounded-2xl p-4 shadow-lg hover:scale-105 transition transform">
//               <p className="font-semibold text-lg">{d.user}</p>
//               <p className={`font-bold text-xl ${d.amount > 0 ? "text-green-600" : "text-red-600"}`}>${d.amount}</p>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Notifications */}
//       <div className="mt-8 bg-white shadow-xl rounded-2xl p-6">
//         <h2 className="font-bold text-2xl mb-4">Notifications</h2>
//         <ul className="list-disc pl-5 text-gray-700 space-y-1">
//           {notifications.map((n, idx) => (
//             <li key={idx}>{n}</li>
//           ))}
//         </ul>
//       </div>

//       {/* Charts */}
//       <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
//         <ChartPie gameData={gameData} />
//         <ChartLine />
//       </div>
//     </div>
//   );
// }

// // --- Components ---
// const StatCard = ({ title, value, icon }) => (
//   <div className="bg-white shadow-lg rounded-2xl p-6 flex flex-col items-center hover:shadow-2xl transition transform hover:-translate-y-2">
//     {icon}
//     <span className="text-sm text-gray-500 mt-2">{title}</span>
//     <span className="font-bold text-xl mt-1">{value}</span>
//   </div>
// );

// const ChartPie = ({ gameData }) => {
//   const games = Object.keys(gameData);
//   return (
//     <div className="bg-white shadow-xl rounded-2xl p-6">
//       <h2 className="font-bold text-2xl mb-4">Game Revenue Distribution</h2>
//       <ResponsiveContainer width="100%" height={300}>
//         <PieChart>
//           <Pie
//             data={games.map(g => ({ name: g, value: gameData[g].reduce((a, b) => a + b.amount, 0) }))}
//             dataKey="value"
//             nameKey="name"
//             cx="50%"
//             cy="50%"
//             outerRadius={100}
//             fill="#8884d8"
//             label
//           >
//             {games.map((_, index) => (
//               <Cell key={index} fill={COLORS[index % COLORS.length]} />
//             ))}
//           </Pie>
//           <Tooltip />
//         </PieChart>
//       </ResponsiveContainer>
//     </div>
//   );
// };

// const ChartLine = () => {
//   const data = [...Array(7)].map((_, i) => ({
//     day: `Day ${i + 1}`,
//     profit: Math.floor(Math.random() * 5000 + 2000),
//   }));

//   return (
//     <div className="bg-white shadow-xl rounded-2xl p-6">
//       <h2 className="font-bold text-2xl mb-4">Daily Profit Trend</h2>
//       <ResponsiveContainer width="100%" height={300}>
//         <LineChart data={data}>
//           <CartesianGrid strokeDasharray="3 3" />
//           <XAxis dataKey="day" />
//           <YAxis />
//           <Tooltip />
//           <Line
//             type="monotone"
//             dataKey="profit"
//             stroke="#8884d8"
//             strokeWidth={3}
//             activeDot={{ r: 6 }}
//           />
//         </LineChart>
//       </ResponsiveContainer>
//     </div>
//   );
// };


import React, { useState, useEffect } from 'react';
import { 
  Users, 
  TrendingUp, 
  TrendingDown, 
  Clock, 
  UserPlus, 
  Shield, 
  Download,
  Mail,
  AlertTriangle,
  DollarSign,
  Trophy,
  Gamepad2,
  CreditCard,
  Target,
  Zap,
  Bird,
  Settings,
  CheckCircle,
  X,
  Send,
  Calendar,
  Loader,
  RefreshCw
} from 'lucide-react';
import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const Dashboard = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [emailModal, setEmailModal] = useState(false);
  const [emailSettings, setEmailSettings] = useState({
    recipients: ['admin@gaming.com', 'finance@gaming.com'],
    subject: 'Daily Gaming Report',
    schedule: 'daily',
    time: '09:00',
    autoSend: true
  });
  const [isLoading, setIsLoading] = useState(false);
  const [emailSuccess, setEmailSuccess] = useState(false);
  const [lastRefresh, setLastRefresh] = useState(new Date());
  const [newRecipient, setNewRecipient] = useState('');
  
  // Mock data - replace with real API data
  const overviewData = {
    totalActivePlayers: 12547,
    totalDeposits: 2847563,
    totalWithdrawals: 1923847,
    netRevenue: 923716,
    pendingTransactions: 45,
    newRegistrations: 234,
    kycPending: 67,
    kycApproved: 1823
  };

  const games = [
    {
      name: 'Ludo',
      icon: <Gamepad2 className="w-6 h-6" />,
      color: 'bg-blue-500',
      activePlayers: 3245,
      totalRounds: 15678,
      deposits: 456789,
      withdrawals: 234567,
      netRevenue: 222222,
      pendingDeposits: 12,
      pendingWithdrawals: 8,
      bonusesClaimed: 45,
      topPlayers: [
        { name: 'Player1', amount: 50000 },
        { name: 'Player2', amount: 35000 },
        { name: 'Player3', amount: 28000 }
      ]
    },
    {
      name: 'Lottery',
      icon: <Trophy className="w-6 h-6" />,
      color: 'bg-green-500',
      activePlayers: 2156,
      totalRounds: 8965,
      deposits: 789456,
      withdrawals: 456789,
      netRevenue: 332667,
      pendingDeposits: 5,
      pendingWithdrawals: 12,
      bonusesClaimed: 23,
      topPlayers: [
        { name: 'Player4', amount: 75000 },
        { name: 'Player5', amount: 62000 },
        { name: 'Player6', amount: 45000 }
      ]
    },
    {
      name: 'Jackpot',
      icon: <DollarSign className="w-6 h-6" />,
      color: 'bg-yellow-500',
      activePlayers: 1845,
      totalRounds: 12456,
      deposits: 654321,
      withdrawals: 345678,
      netRevenue: 308643,
      pendingDeposits: 8,
      pendingWithdrawals: 6,
      bonusesClaimed: 67,
      topPlayers: [
        { name: 'Player7', amount: 120000 },
        { name: 'Player8', amount: 89000 },
        { name: 'Player9', amount: 67000 }
      ]
    },
    {
      name: 'Teen Patti',
      icon: <CreditCard className="w-6 h-6" />,
      color: 'bg-red-500',
      activePlayers: 2987,
      totalRounds: 23567,
      deposits: 543210,
      withdrawals: 298765,
      netRevenue: 244445,
      pendingDeposits: 15,
      pendingWithdrawals: 9,
      bonusesClaimed: 89,
      topPlayers: [
        { name: 'Player10', amount: 95000 },
        { name: 'Player11', amount: 78000 },
        { name: 'Player12', amount: 56000 }
      ]
    },
    {
      name: 'Mines',
      icon: <Target className="w-6 h-6" />,
      color: 'bg-purple-500',
      activePlayers: 1567,
      totalRounds: 8934,
      deposits: 345678,
      withdrawals: 198765,
      netRevenue: 146913,
      pendingDeposits: 6,
      pendingWithdrawals: 4,
      bonusesClaimed: 34,
      topPlayers: [
        { name: 'Player13', amount: 45000 },
        { name: 'Player14', amount: 38000 },
        { name: 'Player15', amount: 29000 }
      ]
    },
    {
      name: 'Bird Shooting',
      icon: <Bird className="w-6 h-6" />,
      color: 'bg-indigo-500',
      activePlayers: 897,
      totalRounds: 5678,
      deposits: 234567,
      withdrawals: 145678,
      netRevenue: 88889,
      pendingDeposits: 3,
      pendingWithdrawals: 2,
      bonusesClaimed: 12,
      topPlayers: [
        { name: 'Player16', amount: 32000 },
        { name: 'Player17', amount: 27000 },
        { name: 'Player18', amount: 21000 }
      ]
    }
  ];

  const paymentMethods = [
    { name: 'UPI', value: 45, color: '#8884d8' },
    { name: 'Bank', value: 30, color: '#82ca9d' },
    { name: 'Wallet', value: 20, color: '#ffc658' },
    { name: 'Card', value: 5, color: '#ff7300' }
  ];

  const dailyTrend = [
    { time: '00:00', deposits: 45000, withdrawals: 32000 },
    { time: '04:00', deposits: 52000, withdrawals: 38000 },
    { time: '08:00', deposits: 68000, withdrawals: 45000 },
    { time: '12:00', deposits: 89000, withdrawals: 67000 },
    { time: '16:00', deposits: 95000, withdrawals: 72000 },
    { time: '20:00', deposits: 112000, withdrawals: 89000 },
    { time: '23:59', deposits: 125000, withdrawals: 95000 }
  ];

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(amount);
  };

  const exportData = (format) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      const fileName = `gaming_report_${selectedDate}.${format.toLowerCase()}`;
      alert(`✅ ${format} file "${fileName}" downloaded successfully!`);
    }, 2000);
  };

  const refreshData = () => {
    setIsLoading(true);
    setTimeout(() => {
      setLastRefresh(new Date());
      setIsLoading(false);
      alert('📊 Dashboard data refreshed successfully!');
    }, 1500);
  };

  const sendEmailReport = () => {
    setIsLoading(true);
    
    // Simulate email sending process
    setTimeout(() => {
      setIsLoading(false);
      setEmailSuccess(true);
      
      setTimeout(() => setEmailSuccess(false), 3000);
      
      // Show detailed success message
      const recipients = emailSettings.recipients.join(', ');
      alert(`📧 Email Report Sent Successfully!\n\n📧 Recipients: ${recipients}\n📋 Subject: ${emailSettings.subject}\n📅 Date: ${selectedDate}\n⏰ Time: ${new Date().toLocaleTimeString()}\n\n✅ Report includes:\n• Complete dashboard analytics\n• Game-wise performance\n• Financial insights\n• User activity data\n• Pending transactions\n• Security alerts`);
    }, 2000);
  };

  const addRecipient = () => {
    if (newRecipient && newRecipient.includes('@')) {
      setEmailSettings({
        ...emailSettings,
        recipients: [...emailSettings.recipients, newRecipient]
      });
      setNewRecipient('');
    }
  };

  const removeRecipient = (index) => {
    const newRecipients = emailSettings.recipients.filter((_, i) => i !== index);
    setEmailSettings({
      ...emailSettings,
      recipients: newRecipients
    });
  };

  const scheduleEmailReport = () => {
    alert(`📅 Email Report Scheduled!\n\n⏰ Schedule: ${emailSettings.schedule} at ${emailSettings.time}\n📧 Recipients: ${emailSettings.recipients.length} people\n📋 Subject: ${emailSettings.subject}\n\n✅ Auto-send is ${emailSettings.autoSend ? 'ENABLED' : 'DISABLED'}`);
    setEmailModal(false);
  };

  // Email Modal Component
  const EmailModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-bold text-gray-900">📧 Email Report Settings</h3>
          <button onClick={() => setEmailModal(false)} className="text-gray-500 hover:text-gray-700">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">📧 Recipients</label>
            <div className="space-y-2">
              {emailSettings.recipients.map((email, index) => (
                <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                  <span className="text-sm">{email}</span>
                  <button 
                    onClick={() => removeRecipient(index)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
            <div className="flex mt-2">
              <input
                type="email"
                value={newRecipient}
                onChange={(e) => setNewRecipient(e.target.value)}
                placeholder="Add new email..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={addRecipient}
                className="px-4 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700"
              >
                Add
              </button>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">📋 Subject</label>
            <input
              type="text"
              value={emailSettings.subject}
              onChange={(e) => setEmailSettings({...emailSettings, subject: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">📅 Schedule</label>
              <select
                value={emailSettings.schedule}
                onChange={(e) => setEmailSettings({...emailSettings, schedule: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">⏰ Time</label>
              <input
                type="time"
                value={emailSettings.time}
                onChange={(e) => setEmailSettings({...emailSettings, time: e.target.value})}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          
          <div className="flex items-center">
            <input
              type="checkbox"
              id="autoSend"
              checked={emailSettings.autoSend}
              onChange={(e) => setEmailSettings({...emailSettings, autoSend: e.target.checked})}
              className="mr-2"
            />
            <label htmlFor="autoSend" className="text-sm text-gray-700">🔄 Enable Auto-Send</label>
          </div>
        </div>
        
        <div className="flex space-x-4 mt-6">
          <button
            onClick={scheduleEmailReport}
            className="flex-1 flex items-center justify-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
          >
            <Calendar className="w-4 h-4 mr-2" />
            Schedule Report
          </button>
          <button
            onClick={() => {
              sendEmailReport();
              setEmailModal(false);
            }}
            className="flex-1 flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            <Send className="w-4 h-4 mr-2" />
            Send Now
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Gaming-Daily Report</h1>
            <p className="text-gray-600">Real-time analytics for all gaming platforms</p>
            <div className="flex items-center text-sm text-gray-500 mt-1">
              <Clock className="w-4 h-4 mr-1" />
              Last updated: {lastRefresh.toLocaleTimeString()}
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={refreshData}
              disabled={isLoading}
              className="flex items-center px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors disabled:opacity-50"
            >
              {isLoading ? (
                <Loader className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <RefreshCw className="w-4 h-4 mr-2" />
              )}
              Refresh
            </button>
            {/* <button
              onClick={() => setEmailModal(true)}
              className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
            >
              <Settings className="w-4 h-4 mr-2" />
              Email Settings
            </button> */}
            <button
              onClick={sendEmailReport}
              disabled={isLoading}
              className={`flex items-center px-4 py-2 rounded-md transition-colors ${
                emailSuccess 
                  ? 'bg-green-600 text-white' 
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              } disabled:opacity-50`}
            >
              {isLoading ? (
                <Loader className="w-4 h-4 mr-2 animate-spin" />
              ) : emailSuccess ? (
                <CheckCircle className="w-4 h-4 mr-2" />
              ) : (
                <Mail className="w-4 h-4 mr-2" />
              )}
              {emailSuccess ? 'Sent Successfully!' : 'Send Email Report'}
            </button>
          </div>
        </div>
      </div>

      {/* Overview Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <Users className="w-8 h-8 text-blue-600" />
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-500">Active Players</h3>
              <p className="text-2xl font-bold text-gray-900">{overviewData.totalActivePlayers.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <TrendingUp className="w-8 h-8 text-green-600" />
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-500">Total Deposits</h3>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(overviewData.totalDeposits)}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <TrendingDown className="w-8 h-8 text-red-600" />
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-500">Total Withdrawals</h3>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(overviewData.totalWithdrawals)}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <DollarSign className="w-8 h-8 text-yellow-600" />
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-500">Net Revenue</h3>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(overviewData.netRevenue)}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <Clock className="w-8 h-8 text-orange-600" />
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-500">Pending Transactions</h3>
              <p className="text-2xl font-bold text-gray-900">{overviewData.pendingTransactions}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <UserPlus className="w-8 h-8 text-purple-600" />
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-500">New Registrations</h3>
              <p className="text-2xl font-bold text-gray-900">{overviewData.newRegistrations}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <Shield className="w-8 h-8 text-red-600" />
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-500">KYC Pending</h3>
              <p className="text-2xl font-bold text-gray-900">{overviewData.kycPending}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center">
            <Shield className="w-8 h-8 text-green-600" />
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-500">KYC Approved</h3>
              <p className="text-2xl font-bold text-gray-900">{overviewData.kycApproved}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Game-wise Reports */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Game-wise Daily Reports</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {games.map((game, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className={`${game.color} p-4`}>
                <div className="flex items-center text-white">
                  {game.icon}
                  <h3 className="text-xl font-bold ml-3">{game.name}</h3>
                </div>
              </div>
              
              <div className="p-6">
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-gray-500">Active Players</p>
                    <p className="text-lg font-semibold">{game.activePlayers.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Total Rounds</p>
                    <p className="text-lg font-semibold">{game.totalRounds.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Deposits</p>
                    <p className="text-lg font-semibold text-green-600">{formatCurrency(game.deposits)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Withdrawals</p>
                    <p className="text-lg font-semibold text-red-600">{formatCurrency(game.withdrawals)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Net Revenue</p>
                    <p className="text-lg font-semibold text-blue-600">{formatCurrency(game.netRevenue)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Bonuses Claimed</p>
                    <p className="text-lg font-semibold">{game.bonusesClaimed}</p>
                  </div>
                </div>
                
                <div className="border-t pt-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">Pending: Deposits ({game.pendingDeposits}) | Withdrawals ({game.pendingWithdrawals})</p>
                  
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-2">Top 3 Players:</p>
                    <div className="space-y-1">
                      {game.topPlayers.map((player, playerIndex) => (
                        <div key={playerIndex} className="flex justify-between text-sm">
                          <span>{player.name}</span>
                          <span className="font-medium">{formatCurrency(player.amount)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Daily Trend Chart */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Daily Deposits vs Withdrawals</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={dailyTrend}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip formatter={(value) => formatCurrency(value)} />
              <Line type="monotone" dataKey="deposits" stroke="#10b981" strokeWidth={2} />
              <Line type="monotone" dataKey="withdrawals" stroke="#ef4444" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Payment Methods Pie Chart */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Payment Method Breakdown</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={paymentMethods}
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, value }) => `${name}: ${value}%`}
              >
                {paymentMethods.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Game Revenue Bar Chart */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Game-wise Revenue Contribution</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={games}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip formatter={(value) => formatCurrency(value)} />
            <Bar dataKey="netRevenue" fill="#3b82f6" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Transactions & User Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Transactions Report */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Transactions Report</h3>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-600">Total Deposits Today:</span>
              <span className="font-semibold text-green-600">{formatCurrency(2847563)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Total Withdrawals Today:</span>
              <span className="font-semibold text-red-600">{formatCurrency(1923847)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Failed Transactions:</span>
              <span className="font-semibold text-orange-600">12</span>
            </div>
            <div className="border-t pt-4">
              <h4 className="font-medium text-gray-700 mb-2">Payment Methods:</h4>
              {paymentMethods.map((method, index) => (
                <div key={index} className="flex justify-between text-sm">
                  <span>{method.name}:</span>
                  <span>{method.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* User Activity Report */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-bold text-gray-900 mb-4">User Activity Report</h3>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-600">New Users (Today):</span>
              <span className="font-semibold text-blue-600">234</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Returning Players:</span>
              <span className="font-semibold text-green-600">8,945</span>
            </div>
            <div className="border-t pt-4">
              <h4 className="font-medium text-gray-700 mb-2">Most Active Players:</h4>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span>ProGamer123</span>
                  <span>1,245 rounds</span>
                </div>
                <div className="flex justify-between">
                  <span>LuckyWinner</span>
                  <span>987 rounds</span>
                </div>
                <div className="flex justify-between">
                  <span>CardMaster</span>
                  <span>876 rounds</span>
                </div>
              </div>
            </div>
            <div className="border-t pt-4">
              <h4 className="font-medium text-gray-700 mb-2">High-value Users:</h4>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span>HighRoller1</span>
                  <span>{formatCurrency(150000)}</span>
                </div>
                <div className="flex justify-between">
                  <span>VIPPlayer</span>
                  <span>{formatCurrency(125000)}</span>
                </div>
                <div className="flex justify-between">
                  <span>BigBetter</span>
                  <span>{formatCurrency(98000)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Financial Insights & Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Financial Insights */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Financial Insights</h3>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-600">Gross Deposits:</span>
              <span className="font-semibold text-green-600">{formatCurrency(2847563)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Gross Withdrawals:</span>
              <span className="font-semibold text-red-600">{formatCurrency(1923847)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Bonus/Cashback Given:</span>
              <span className="font-semibold text-orange-600">{formatCurrency(45600)}</span>
            </div>
            <div className="flex justify-between border-t pt-4">
              <span className="text-gray-600 font-medium">Net Profit/Loss:</span>
              <span className="font-bold text-green-600 text-lg">{formatCurrency(878116)}</span>
            </div>
            <div className="mt-4">
              <h4 className="font-medium text-gray-700 mb-2">Top Performing Game:</h4>
              <div className="flex items-center justify-between bg-blue-50 p-3 rounded">
                <span className="font-semibold text-blue-800">Ludo</span>
                <span className="font-bold text-blue-600">{formatCurrency(222222)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Pending & Alerts */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
            <AlertTriangle className="w-5 h-5 text-yellow-600 mr-2" />
            Pending & Alerts
          </h3>
          <div className="space-y-4">
            <div className="bg-yellow-50 p-3 rounded border-l-4 border-yellow-400">
              <div className="flex justify-between">
                <span className="text-yellow-800">Pending Deposits:</span>
                <span className="font-semibold">49 ({formatCurrency(234567)})</span>
              </div>
            </div>
            <div className="bg-red-50 p-3 rounded border-l-4 border-red-400">
              <div className="flex justify-between">
                <span className="text-red-800">Pending Withdrawals:</span>
                <span className="font-semibold">41 ({formatCurrency(189432)})</span>
              </div>
            </div>
            <div className="bg-orange-50 p-3 rounded border-l-4 border-orange-400">
              <div className="flex justify-between">
                <span className="text-orange-800">KYC Pending:</span>
                <span className="font-semibold">67 Users</span>
              </div>
            </div>
            <div className="bg-purple-50 p-3 rounded border-l-4 border-purple-400">
              <div className="flex justify-between">
                <span className="text-purple-800">Large Transactions:</span>
                <span className="font-semibold">3 Pending Approval</span>
              </div>
            </div>
            <div className="bg-red-100 p-3 rounded border-l-4 border-red-500">
              <div className="flex items-center justify-between">
                <span className="text-red-800 font-medium">Suspicious Activity:</span>
                <span className="font-semibold text-red-600">2 Alerts</span>
              </div>
              <p className="text-sm text-red-600 mt-1">Fraud detection alerts require review</p>
            </div>
          </div>
        </div>
      </div>

      {/* Export Options */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Export & Actions</h3>
        <div className="flex flex-wrap gap-4">
          <button
            onClick={() => exportData('CSV')}
            className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
          >
            <Download className="w-4 h-4 mr-2" />
            Export CSV
          </button>
          <button
            onClick={() => exportData('Excel')}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            <Download className="w-4 h-4 mr-2" />
            Export Excel
          </button>
          <button
            onClick={() => exportData('PDF')}
            className="flex items-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
          >
            <Download className="w-4 h-4 mr-2" />
            Export PDF
          </button>
          <button
            onClick={sendEmailReport}
            className="flex items-center px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
          >
            <Mail className="w-4 h-4 mr-2" />
            Auto Email Report
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;


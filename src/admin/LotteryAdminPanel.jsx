// import React, { useState } from "react";
// import { Users, Coins, Power, Activity, MessageSquare } from "lucide-react";

// export default function LotteryAdminPanel({ isDarkMode }) {
//   const [isEnabled, setIsEnabled] = useState(true);

//   return (
//     <div
//       className={`p-6 rounded-xl shadow-lg transition-all ${
//         isDarkMode ? "bg-gray-800 text-gray-100" : "bg-white text-gray-900"
//       }`}
//     >
//       <h2 className="text-2xl font-bold mb-4">🎯 Lottery Control Panel</h2>

//       {/* Toggle Lottery */}
//       <div className="flex items-center gap-3 mb-6">
//         <button
//           onClick={() => setIsEnabled(!isEnabled)}
//           className={`px-4 py-2 rounded-lg font-semibold flex items-center gap-2 ${
//             isEnabled ? "bg-red-500 text-white" : "bg-green-500 text-white"
//           }`}
//         >
//           <Power size={18} />
//           {isEnabled ? "Disable Lottery" : "Enable Lottery"}
//         </button>
//       </div>

//       {/* Stats Grid */}
//       <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
//         <div className="p-4 rounded-lg shadow bg-blue-500 text-white">
//           <Users size={22} />
//           <p className="text-lg font-bold">1,245</p>
//           <p>Active Users</p>
//         </div>
//         <div className="p-4 rounded-lg shadow bg-green-500 text-white">
//           <Coins size={22} />
//           <p className="text-lg font-bold">₹54,300</p>
//           <p>Total Deposits</p>
//         </div>
//         <div className="p-4 rounded-lg shadow bg-yellow-500 text-white">
//           <Activity size={22} />
//           <p className="text-lg font-bold">4</p>
//           <p>Active Games</p>
//         </div>
//         <div className="p-4 rounded-lg shadow bg-purple-500 text-white">
//           <MessageSquare size={22} />
//           <p className="text-lg font-bold">87</p>
//           <p>Chats</p>
//         </div>
//       </div>
//     </div>
//   );
// }

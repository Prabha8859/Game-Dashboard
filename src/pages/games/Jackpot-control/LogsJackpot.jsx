// import React, { useMemo, useState } from "react";
// import {
//   Search,
//   Users,
//   Gift,
//   DollarSign,
//   History,
//   Trophy,
//   CreditCard,
//   ChevronsRight,
//   ShieldCheck,
//   RefreshCcw,
//   Plus,
//   Ban,
//   Wallet,
//   Check,
//   Trash2,
//   Eye,
//   Download,
//   X,
//   CircleCheck,
//   Hand,
//   Award,
// } from "lucide-react";

// // --- Constants & Mock Data ---
// const STATUS_COLORS = {
//   Active:
//     "bg-emerald-100 text-emerald-700 ring-1 ring-inset ring-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:ring-emerald-900",
//   Banned:
//     "bg-red-100 text-red-700 ring-1 ring-inset ring-red-200 dark:bg-red-950/50 dark:text-red-300 dark:ring-red-900",
//   Block:
//     "bg-amber-100 text-amber-800 ring-1 ring-inset ring-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:ring-amber-900",
//   Pending: "bg-gray-100 text-gray-700 ring-1 ring-inset ring-gray-200 dark:bg-gray-900/40 dark:text-gray-300 dark:ring-gray-800",
//   Completed: "bg-green-100 text-green-700 ring-1 ring-inset ring-green-200 dark:bg-green-950/40 dark:text-green-300 dark:ring-green-900",
// };

// const initialUsers = [
//   {
//     id: 1001,
//     username: "player_neo",
//     mobile: "9876543210",
//     balance: 1250.5,
//     status: "Active",
//     lastBetAt: "2025-09-01 14:12",
//     totalWins: 2,
//     history: [
//       { id: "b-1", time: "2025-09-01 14:12", bet: 50, result: "+150", game: "Jackpot Wheel" },
//       { id: "b-2", time: "2025-08-31 21:40", bet: 20, result: "-20", game: "Rapid Jackpot" },
//     ],
//   },
//   {
//     id: 1002,
//     username: "lucky777",
//     mobile: "9123456789",
//     balance: 320.0,
//     status: "Block",
//     lastBetAt: "2025-08-29 10:05",
//     totalWins: 0,
//     history: [
//       { id: "b-3", time: "2025-08-29 10:05", bet: 10, result: "+0", game: "Jackpot Wheel" },
//     ],
//   },
// ];

// const mockTransactions = [
//   { id: "T001", type: "Deposit", userId: 1001, username: "player_neo", amount: 500, status: "Completed", time: "2025-09-05 10:00" },
//   { id: "T002", type: "Bet Collection", userId: 1001, username: "player_neo", amount: -50, time: "2025-09-05 10:15" },
//   { id: "T003", type: "Withdrawal", userId: 1002, username: "lucky777", amount: 200, status: "Pending", time: "2025-09-05 10:20" },
// ];

// const mockWinners = [
//   { roundId: "R-001", winnerId: 1001, winnerName: "player_neo", totalPool: 2500, commission: 250, payout: 2250, status: "Paid", time: "2025-09-04 18:00" },
//   { roundId: "R-002", winnerId: 1002, winnerName: "lucky777", totalPool: 1500, commission: 150, payout: 1350, status: "Pending", time: "2025-09-04 20:30" },
// ];

// const mockOngoingRound = {
//   poolValue: 1850.75,
//   timer: "02:15",
//   contributions: [
//     { id: 1001, username: "player_neo", bet: 250 },
//     { id: 1002, username: "lucky777", bet: 150 },
//   ],
// };

// // --- Main Component ---
// export default function JackpotAdminDashboard() {
//   const [users, setUsers] = useState(initialUsers);
//   const [transactions, setTransactions] = useState(mockTransactions);
//   const [winners, setWinners] = useState(mockWinners);
//   const [ongoingRound, setOngoingRound] = useState(mockOngoingRound);

//   const [query, setQuery] = useState("");
//   const [statusFilter, setStatusFilter] = useState("All");
//   const [activeTab, setActiveTab] = useState("users");

//   // Filtered Data based on search and filters
//   const filteredUsers = useMemo(() => {
//     return users.filter((u) => u.username.toLowerCase().includes(query.toLowerCase()));
//   }, [users, query]);

//   const filteredTransactions = useMemo(() => {
//     return transactions.filter(t => t.username.toLowerCase().includes(query.toLowerCase()) || t.id.toLowerCase().includes(query.toLowerCase()));
//   }, [transactions, query]);

//   const filteredWinners = useMemo(() => {
//     return winners.filter(w => w.winnerName.toLowerCase().includes(query.toLowerCase()) || w.roundId.toLowerCase().includes(query.toLowerCase()));
//   }, [winners, query]);

//   // KPIs
//   const totalContributions = transactions.filter(t => t.type === "Bet Collection").reduce((sum, t) => sum + t.amount, 0);
//   const totalPayouts = winners.reduce((sum, w) => sum + w.payout, 0);
//   const adminCommission = winners.reduce((sum, w) => sum + w.commission, 0);

//   // Actions
//   const openDetails = (data, type) => {
//     // This is where you would open a modal with details.
//     console.log(`Opening details for ${type}:`, data);
//   };

//   const manuallyEndRound = (winnerId, winnerName) => {
//     const newWinner = {
//       roundId: `R-${winners.length + 1}`,
//       winnerId,
//       winnerName,
//       totalPool: ongoingRound.poolValue,
//       commission: ongoingRound.poolValue * 0.1,
//       payout: ongoingRound.poolValue * 0.9,
//       status: "Pending",
//       time: new Date().toLocaleString(),
//     };
//     setWinners(prev => [...prev, newWinner]);
//     setOngoingRound({ ...ongoingRound, winner: { id: winnerId, name: winnerName } });
//   };

//   return (
//     <div className="p-4 md:p-6 max-w-7xl mx-auto">
//       {/* --- Header --- */}
//       <div className="flex items-start md:items-center justify-between gap-4 flex-col md:flex-row">
//         <div>
//           <h1 className="text-2xl md:text-3xl font-semibold tracking-tight flex items-center gap-2">
//             <ShieldCheck className="w-6 h-6 text-yellow-500" /> Jackpot Admin Dashboard
//           </h1>
//           <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
//             Comprehensive management of users, transactions, and game logs.
//           </p>
//         </div>
//       </div>

//       {/* --- Tab Navigation --- */}
//       <div className="flex items-center gap-2 mt-6 border-b border-gray-200 dark:border-gray-800">
//         <TabButton active={activeTab === 'users'} onClick={() => setActiveTab('users')}>
//           <Users className="w-4 h-4 mr-1" /> User Management
//         </TabButton>
//         <TabButton active={activeTab === 'transactions'} onClick={() => setActiveTab('transactions')}>
//           <CreditCard className="w-4 h-4 mr-1" /> Transactions / Wallet
//         </TabButton>
//         <TabButton active={activeTab === 'winners'} onClick={() => setActiveTab('winners')}>
//           <Trophy className="w-4 h-4 mr-1" /> Winner Management
//         </TabButton>
//         <TabButton active={activeTab === 'jackpot-game'} onClick={() => setActiveTab('jackpot-game')}>
//           <RefreshCcw className="w-4 h-4 mr-1" /> Jackpot Game
//         </TabButton>
//       </div>

//       {/* --- Tab Content --- */}
//       <div className="mt-4">
//         {activeTab === 'users' && <UserManagementTab data={filteredUsers} query={query} setQuery={setQuery} />}
//         {activeTab === 'transactions' && (
//           <TransactionsTab
//             data={filteredTransactions}
//             query={query}
//             setQuery={setQuery}
//             totalDeposits={transactions.filter(t => t.type === "Deposit").reduce((sum, t) => sum + t.amount, 0)}
//             totalWithdrawals={transactions.filter(t => t.type === "Withdrawal").reduce((sum, t) => sum + t.amount, 0)}
//             totalBets={-totalContributions}
//             commission={adminCommission}
//           />
//         )}
//         {activeTab === 'winners' && (
//           <WinnerManagementTab
//             data={filteredWinners}
//             query={query}
//             setQuery={setQuery}
//             totalPayouts={totalPayouts}
//             commission={adminCommission}
//           />
//         )}
//         {activeTab === 'jackpot-game' && (
//           <JackpotGameTab
//             ongoingRound={ongoingRound}
//             manuallyEndRound={manuallyEndRound}
//           />
//         )}
//       </div>
//     </div>
//   );
// }

// // --- Tab Components ---

// function UserManagementTab({ data, query, setQuery }) {
//     return (
//       <>
//         <div className="flex items-center justify-between gap-3 mb-4">
//           <div className="relative flex-1">
//             <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
//             <input
//               className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-400"
//               placeholder="Search users by name or ID..."
//               value={query}
//               onChange={(e) => setQuery(e.target.value)}
//             />
//           </div>
//         </div>
//         <div className="overflow-x-auto rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm bg-white dark:bg-gray-950">
//           <table className="min-w-full text-sm">
//             <thead className="text-white dark:text-gray-300 bg-gradient-to-t from-[#9890e3] to-[#b1f4cf]">
//               <tr>
//                 <Th>ID</Th>
//                 <Th>User Detail</Th>
//                 <Th className="text-right">Balance (₹)</Th>
//                 <Th>Status</Th>
//                 <Th className="text-center">Total Wins</Th>
//               </tr>
//             </thead>
//             <tbody>
//               {data.length === 0 && (
//                 <tr>
//                   <td colSpan={5} className="text-center py-8 text-gray-500">
//                     No users found.
//                   </td>
//                 </tr>
//               )}
//               {data.map((u) => (
//                 <tr key={u.id} className="border-t border-gray-100 dark:border-gray-800 hover:bg-gray-50/70 dark:hover:bg-gray-900/40">
//                   <Td>#{u.id}</Td>
//                   <Td>
//                     <div className="font-medium">{u.username}</div>
//                     <div className="text-xs text-gray-500">{u.mobile}</div>
//                   </Td>
//                   <Td className="text-right font-semibold">{Number(u.balance).toFixed(2)}</Td>
//                   <Td>
//                     <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${STATUS_COLORS[u.status]}`}>
//                       {u.status}
//                     </span>
//                   </Td>
//                   <Td className="text-center">{u.totalWins}</Td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </>
//     );
//   }

// function TransactionsTab({ data, query, setQuery, totalDeposits, totalWithdrawals, totalBets, commission }) {
//   const cardData = [
//     { title: "Total Deposits", value: `₹${totalDeposits}`, icon: <Users className="w-6 h-6 text-white" />, gradient: "from-blue-300 via-blue-300 to-blue-400" },
//     { title: "Total Withdrawals", value: `₹${totalWithdrawals}`, icon: <Gift className="w-6 h-6 text-white" />, gradient: "from-green-300 via-green-300 to-green-400" },
//     { title: "Total Bets", value: `₹${totalBets}`, icon: <DollarSign className="w-6 h-6 text-white" />, gradient: "from-purple-300 via-pink-300 to-pink-400" },
//     { title: "Admin Commission", value: `₹${commission}`, icon: <ChevronsRight className="w-6 h-6 text-white" />, gradient: "from-yellow-300 via-orange-300 to-orange-400" },
//   ];
//   return (
//     <>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
//         {cardData.map((card, index) => (
//           <div key={index} className={`relative overflow-hidden p-6 rounded-2xl shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl text-white bg-gradient-to-r ${card.gradient}`}>
//             <div className="absolute -top-4 -right-4 opacity-20 scale-150">{card.icon}</div>
//             <div className="flex items-center gap-3">
//               <div className="p-3 bg-white/20 rounded-full">{card.icon}</div>
//               <div>
//                 <p className="text-sm opacity-80">{card.title}</p>
//                 <h3 className="text-3xl font-bold mt-1">{card.value}</h3>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//       <div className="flex items-center justify-between gap-3 mb-4">
//         <div className="relative flex-1">
//           <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
//           <input
//             className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-400"
//             placeholder="Search transactions by user or ID..."
//             value={query}
//             onChange={(e) => setQuery(e.target.value)}
//           />
//         </div>
//       </div>
//       <div className="overflow-x-auto rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm bg-white dark:bg-gray-950">
//         <table className="min-w-full text-sm">
//           <thead className="text-white dark:text-gray-300 bg-gradient-to-t from-[#9890e3] to-[#b1f4cf]">
//             <tr>
//               <Th>ID</Th>
//               <Th>Time</Th>
//               <Th>User</Th>
//               <Th>Type</Th>
//               <Th className="text-right">Amount (₹)</Th>
//               <Th>Status</Th>
//             </tr>
//           </thead>
//           <tbody>
//             {data.length === 0 && (
//               <tr>
//                 <td colSpan={6} className="text-center py-8 text-gray-500">
//                   No transactions found.
//                 </td>
//               </tr>
//             )}
//             {data.map((t) => (
//               <tr key={t.id} className="border-t border-gray-100 dark:border-gray-800 hover:bg-gray-50/70 dark:hover:bg-gray-900/40">
//                 <Td>{t.id}</Td>
//                 <Td className="text-xs">{t.time}</Td>
//                 <Td>{t.username}</Td>
//                 <Td>{t.type}</Td>
//                 <Td className={`text-right font-semibold ${t.amount >= 0 ? 'text-green-600' : 'text-red-600'}`}>
//                   {t.amount >= 0 ? `+₹${t.amount}` : `-₹${Math.abs(t.amount)}`}
//                 </Td>
//                 <Td>
//                   {t.status && (
//                     <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${STATUS_COLORS[t.status]}`}>
//                       {t.status}
//                     </span>
//                   )}
//                 </Td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </>
//   );
// }

// function WinnerManagementTab({ data, query, setQuery, totalPayouts, commission }) {
//   const kpis = [
//     { title: "Total Payouts", value: `₹${totalPayouts}`, tone: "emerald" },
//     { title: "Admin Commission", value: `₹${commission}`, tone: "amber" },
//   ];
//   return (
//     <>
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
//         {kpis.map((k, i) => <KPI key={i} title={k.title} value={k.value} tone={k.tone} />)}
//       </div>
//       <div className="flex items-center justify-between gap-3 mb-4">
//         <div className="relative flex-1">
//           <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
//           <input
//             className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-400"
//             placeholder="Search winners by name or round ID..."
//             value={query}
//             onChange={(e) => setQuery(e.target.value)}
//           />
//         </div>
//       </div>
//       <div className="overflow-x-auto rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm bg-white dark:bg-gray-950">
//         <table className="min-w-full text-sm">
//           <thead className="text-white dark:text-gray-300 bg-gradient-to-t from-[#9890e3] to-[#b1f4cf]">
//             <tr>
//               <Th>Round ID</Th>
//               <Th>Winner</Th>
//               <Th className="text-right">Total Pool (₹)</Th>
//               <Th className="text-right">Commission (₹)</Th>
//               <Th className="text-right">Payout (₹)</Th>
//               <Th>Status</Th>
//             </tr>
//           </thead>
//           <tbody>
//             {data.length === 0 && (
//               <tr>
//                 <td colSpan={6} className="text-center py-8 text-gray-500">
//                   No winner records found.
//                 </td>
//               </tr>
//             )}
//             {data.map((w) => (
//               <tr key={w.roundId} className="border-t border-gray-100 dark:border-gray-800 hover:bg-gray-50/70 dark:hover:bg-gray-900/40">
//                 <Td>{w.roundId}</Td>
//                 <Td className="font-medium">{w.winnerName}</Td>
//                 <Td className="text-right">{w.totalPool}</Td>
//                 <Td className="text-right text-red-600">{w.commission}</Td>
//                 <Td className="text-right text-green-600">{w.payout}</Td>
//                 <Td>
//                   <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${STATUS_COLORS[w.status]}`}>
//                     {w.status}
//                   </span>
//                 </Td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </>
//   );
// }

// function JackpotGameTab({ ongoingRound, manuallyEndRound }) {
//   const [winner, setWinner] = useState(null);

//   const handleManualWin = (userId, userName) => {
//     manuallyEndRound(userId, userName);
//     setWinner({ id: userId, name: userName });
//     // Simulate clearing the ongoing round data after a delay
//     setTimeout(() => {
//         setWinner(null);
//     }, 5000);
//   };
//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//       {/* Ongoing Jackpot Round */}
//       <div className="p-4 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950">
//         <div className="flex items-center justify-between">
//           <h3 className="text-lg font-semibold flex items-center gap-2">
//             <RefreshCcw className="w-5 h-5 text-blue-500" /> Ongoing Round
//           </h3>
//         </div>
//         <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
//           <KPI title="Current Pool" value={`₹ ${ongoingRound.poolValue.toFixed(2)}`} />
//           <KPI title="Time Remaining" value={ongoingRound.timer} tone="amber" />
//         </div>
//         {winner ? (
//             <div className="mt-4 p-4 text-center rounded-xl bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
//                 <div className="flex items-center justify-center gap-2 text-lg font-bold">
//                     <Award className="w-6 h-6" /> Winner Selected!
//                 </div>
//                 <div className="mt-1">
//                     <span className="font-semibold">{winner.name}</span> has won this round.
//                 </div>
//             </div>
//         ) : (
//             <>
//                 <h4 className="font-semibold text-sm mt-4">Player Contributions & Manual Control</h4>
//                 <div className="mt-2 text-sm text-gray-600 dark:text-gray-300 space-y-2">
//                     {ongoingRound.contributions.length > 0 ? (
//                         ongoingRound.contributions.map((c, i) => (
//                             <div key={i} className="flex justify-between items-center py-2 px-3 border border-gray-200 dark:border-gray-800 rounded-xl bg-gray-50 dark:bg-gray-900/40">
//                                 <div className="font-medium text-gray-900 dark:text-white">{c.username}</div>
//                                 <div className="flex items-center gap-2">
//                                     <span className="font-medium">₹ {c.bet.toFixed(2)}</span>
//                                     <button
//                                         onClick={() => handleManualWin(c.id, c.username)}
//                                         className="inline-flex items-center gap-1 px-2 py-1 rounded-lg text-white text-xs hover:opacity-90"
//                                         style={{ backgroundImage: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" }}
//                                         title="Manually select as winner"
//                                     >
//                                         <Hand className="w-4 h-4" /> Win
//                                     </button>
//                                 </div>
//                             </div>
//                         ))
//                     ) : (
//                         <div className="text-center py-4 text-gray-500">No players have joined this round yet.</div>
//                     )}
//                 </div>
//             </>
//         )}
//       </div>
//       <div className="p-4 rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950">
//         <h3 className="text-lg font-semibold flex items-center gap-2">
//           <History className="w-5 h-5 text-gray-400" /> Game Logs
//         </h3>
//         <div className="mt-2 text-sm text-gray-600 dark:text-gray-300 space-y-2">
//           <div className="flex justify-between py-1 border-b border-gray-100 dark:border-gray-800 last:border-b-0">
//             <div>Round R-001 started.</div>
//             <div className="text-xs text-gray-400">2025-09-04 17:55</div>
//           </div>
//           <div className="flex justify-between py-1 border-b border-gray-100 dark:border-gray-800 last:border-b-0">
//             <div>Player "lucky777" joined.</div>
//             <div className="text-xs text-gray-400">2025-09-04 17:56</div>
//           </div>
//           <div className="flex justify-between py-1 border-b border-gray-100 dark:border-gray-800 last:border-b-0">
//             <div>Round R-001 ended. Winner: "player_neo"</div>
//             <div className="text-xs text-gray-400">2025-09-04 18:00</div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// // --- Reusable UI Components ---
// function TabButton({ children, active, onClick }) {
//   return (
//     <button
//       onClick={onClick}
//       className={`px-4 py-3 rounded-t-xl text-sm font-medium transition-colors flex items-center ${
//         active
//           ? "bg-white dark:bg-gray-950 text-gray-900 dark:text-white border-t border-x border-gray-200 dark:border-gray-800 -mb-[1px]"
//           : "bg-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
//       }`}
//     >
//       {children}
//     </button>
//   );
// }

// function KPI({ title, value, tone = "slate" }) {
//   const tones = {
//     slate: "bg-slate-50 dark:bg-slate-900/40 text-slate-700 dark:text-slate-200",
//     emerald: "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-200",
//     amber: "bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-200",
//   };
//   return (
//     <div className={`rounded-2xl border border-gray-200 dark:border-gray-800 p-4 ${tones[tone]}`}>
//       <div className="text-xs uppercase tracking-wider opacity-70">{title}</div>
//       <div className="text-xl font-semibold mt-1">{value}</div>
//     </div>
//   );
// }

// function Th({ children, className = "" }) {
//   return (
//     <th className={`text-left px-4 py-3 font-medium ${className}`}>{children}</th>
//   );
// }

// function Td({ children, className = "" }) {
//   return <td className={`px-4 py-3 align-middle ${className}`}>{children}</td>;
// }

import React from 'react'

function LogsJackpot() {
  return (
    <div>coming Soon</div>
  )
}

export default LogsJackpot
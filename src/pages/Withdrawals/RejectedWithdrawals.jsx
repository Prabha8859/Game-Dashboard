// import React, { useState } from 'react';
// import { Search, ChevronLeft, ChevronRight, CreditCard, Smartphone, Globe, Eye, X } from 'lucide-react';

// const RejectedWithdrawals = () => {
//   const [withdrawals, setWithdrawals] = useState([
//     { 
//       id: 1, 
//       gateway: "Paytm #TXN12345",
//       initiated: "2025-08-05 10:30 AM",
//       user: "Ravi Kumar",
//       amount: "₹1,000",
//       conversion: "$12.00",
//       status: "Success"
//     },
//     { 
//       id: 2, 
//       gateway: "PhonePe #TXN67890",
//       initiated: "2025-08-06 11:45 AM",
//       user: "Amit Sharma",
//       amount: "₹2,500",
//       conversion: "$30.00",
//       status: "Failed"
//     },
//     { 
//       id: 3, 
//       gateway: "GooglePay #TXN99988",
//       initiated: "2025-08-05 02:00 PM",
//       user: "Ravi Kumar",
//       amount: "₹500",
//       conversion: "$6.00",
//       status: "Success"
//     },
//     { 
//       id: 4, 
//       gateway: "UPI #TXN44455",
//       initiated: "2025-08-07 09:15 AM",
//       user: "Priya Singh",
//       amount: "₹1,800",
//       conversion: "$21.60",
//       status: "Pending"
//     },
//     { 
//       id: 5, 
//       gateway: "Razorpay #TXN78901",
//       initiated: "2025-08-07 03:30 PM",
//       user: "Suresh Patel",
//       amount: "₹3,200",
//       conversion: "$38.40",
//       status: "Success"
//     },
//     { 
//       id: 6, 
//       gateway: "Paytm #TXN11223",
//       initiated: "2025-08-08 01:20 PM",
//       user: "Neha Gupta",
//       amount: "₹750",
//       conversion: "$9.00",
//       status: "Failed"
//     },
//     { 
//       id: 7, 
//       gateway: "PhonePe #TXN33445",
//       initiated: "2025-08-08 04:45 PM",
//       user: "Rohit Verma",
//       amount: "₹2,100",
//       conversion: "$25.20",
//       status: "Success"
//     },
//     { 
//       id: 8, 
//       gateway: "GooglePay #TXN55667",
//       initiated: "2025-08-09 10:10 AM",
//       user: "Kavya Joshi",
//       amount: "₹950",
//       conversion: "$11.40",
//       status: "Pending"
//     },
//     { 
//       id: 9, 
//       gateway: "UPI #TXN77889",
//       initiated: "2025-08-09 02:25 PM",
//       user: "Arjun Mehta",
//       amount: "₹1,650",
//       conversion: "$19.80",
//       status: "Success"
//     },
//     { 
//       id: 10, 
//       gateway: "Razorpay #TXN99001",
//       initiated: "2025-08-09 05:55 PM",
//       user: "Deepika Roy",
//       amount: "₹4,500",
//       conversion: "$54.00",
//       status: "Failed"
//     }
//   ]);

//   const [searchQuery, setSearchQuery] = useState("");
//   const [entriesPerPage, setEntriesPerPage] = useState(10);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [showDetailsModal, setShowDetailsModal] = useState(false);
//   const [selectedWithdrawal, setSelectedWithdrawal] = useState(null);

//   const filteredWithdrawals = withdrawals.filter(withdrawal =>
//     withdrawal.gateway.toLowerCase().includes(searchQuery.toLowerCase()) ||
//     withdrawal.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
//     withdrawal.amount.includes(searchQuery) ||
//     withdrawal.status.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   const totalPages = Math.ceil(filteredWithdrawals.length / entriesPerPage);
//   const startIndex = (currentPage - 1) * entriesPerPage;
//   const currentWithdrawals = filteredWithdrawals.slice(startIndex, startIndex + entriesPerPage);

//   const getGatewayIcon = (gateway) => {
//     if (gateway.toLowerCase().includes('paytm') || gateway.toLowerCase().includes('upi')) {
//       return <Smartphone className="w-4 h-4 text-blue-600" />;
//     } else if (gateway.toLowerCase().includes('phonepe')) {
//       return <Smartphone className="w-4 h-4 text-purple-600" />;
//     } else if (gateway.toLowerCase().includes('googlepay')) {
//       return <Globe className="w-4 h-4 text-green-600" />;
//     } else {
//       return <CreditCard className="w-4 h-4 text-orange-600" />;
//     }
//   };

//   const getStatusColor = (status) => {
//     switch (status.toLowerCase()) {
//       case 'success':
//         return 'text-green-600 bg-green-100';
//       case 'failed':
//         return 'text-red-600 bg-red-100';
//       case 'pending':
//         return 'text-orange-600 bg-orange-100';
//       default:
//         return 'text-gray-600 bg-gray-100';
//     }
//   };

//   return (
//     <div className="bg-gray-50 min-h-screen p-3 font-sans antialiased">
//       {/* Header */}
//       <div className="mb-2">
//         <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
//           <h1 className="text-3xl font-bold text-gray-800 mb-2">Rejected Withdrawals</h1>
//           <div className="flex items-center gap-2 text-sm text-gray-500">
//             <span>Dashboard</span>
//             <ChevronRight className="w-4 h-4" />
//             <span>Withdrawals</span>
//             <ChevronRight className="w-4 h-4" />
//             <span className="text-gray-700 font-medium">Rejected Withdrawals</span>
//           </div>
//         </div>
//       </div>

//       {/* Main Card */}
//       <div className="bg-white rounded-lg shadow-sm border border-gray-200">
//         {/* Controls */}
//         <div className="p-4 border-b border-gray-200">
//           <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
//             {/* Entries dropdown */}
//             <div className="flex items-center gap-2 text-sm text-gray-600">
//               <span>Showing</span>
//               <select 
//                 value={entriesPerPage}
//                 onChange={(e) => setEntriesPerPage(Number(e.target.value))}
//                 className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white cursor-pointer"
//               >
//                 <option value={5}>5</option>
//                 <option value={10}>10</option>
//                 <option value={25}>25</option>
//                 <option value={50}>50</option>
//               </select>
//               <span>entries</span>
//             </div>
            
//             {/* Search */}
//             <div className="relative">
//               <input
//                 type="text"
//                 placeholder="Search here..."
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 className="border border-gray-300 rounded-md px-4 py-2 pr-10 text-sm w-64 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-text"
//               />
//               <Search className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2" />
//             </div>
//           </div>
//         </div>

//         {/* Table Container with Scroll */}
//         <div className="overflow-x-auto max-w-225">
//           <table className="w-full">
//             <thead className="bg-blue-600 text-white sticky top-0">
//               <tr>
//                 <th className="text-left p-3 font-semibold text-sm uppercase tracking-wider text-nowrap cursor-pointer">
//                   Gateway
//                 </th>
//                 <th className="text-left p-3 font-semibold text-sm uppercase tracking-wider text-nowrap cursor-pointer">
//                   Initiated
//                 </th>
//                 <th className="text-left p-3 font-semibold text-sm uppercase tracking-wider text-nowrap cursor-pointer">
//                   User
//                 </th>
//                 <th className="text-left p-3 font-semibold text-sm uppercase tracking-wider text-nowrap cursor-pointer">
//                   Amount
//                 </th>
//                 <th className="text-left p-3 font-semibold text-sm uppercase tracking-wider text-nowrap cursor-pointer">
//                   Conversion
//                 </th>
//                 <th className="text-left p-3 font-semibold text-sm uppercase tracking-wider text-nowrap cursor-pointer">
//                   Status
//                 </th>
//                 <th className="text-left p-3 font-semibold text-sm uppercase tracking-wider text-nowrap cursor-pointer">
//                   Action
//                 </th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {currentWithdrawals.map((withdrawal, index) => (
//                 <tr 
//                   key={withdrawal.id} 
//                   className={`hover:bg-gray-50 transition-colors cursor-pointer ${
//                     index % 2 === 1 ? 'bg-gray-50' : 'bg-white'
//                   }`}
//                 >
//                   <td className="p-4 text-nowrap">
//                     <div className="flex items-center gap-3">
//                       {getGatewayIcon(withdrawal.gateway)}
//                       <span className="text-sm text-gray-800 font-medium">
//                         {withdrawal.gateway}
//                       </span>
//                     </div>
//                   </td>
//                   <td className="p-4 text-sm text-gray-600 text-nowrap">
//                     {withdrawal.initiated}
//                   </td>
//                   <td className="p-4 text-sm text-gray-800 font-medium text-nowrap">
//                     {withdrawal.user}
//                   </td>
//                   <td className="p-4 text-sm text-gray-800 font-semibold text-nowrap">
//                     {withdrawal.amount}
//                   </td>
//                   <td className="p-4 text-sm text-gray-600 text-nowrap">
//                     {withdrawal.conversion}
//                   </td>
//                   <td className="p-4 text-nowrap">
//                     <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full cursor-pointer ${getStatusColor(withdrawal.status)}`}>
//                       {withdrawal.status}
//                     </span>
//                   </td>
//                   <td className="p-4 text-nowrap">
//                     <button 
//                       onClick={() => {
//                         setSelectedWithdrawal(withdrawal);
//                         setShowDetailsModal(true);
//                       }}
//                       className="bg-blue-500 hover:bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center gap-2 cursor-pointer"
//                     >
//                       <Eye className="w-4 h-4" />
//                       Details
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         {/* Pagination */}
//         <div className="flex flex-col sm:flex-row justify-between items-center p-6 border-t border-gray-200 gap-4">
//           <div className="text-sm text-gray-600">
//             Showing {startIndex + 1} to {Math.min(startIndex + entriesPerPage, filteredWithdrawals.length)} entries
//           </div>
          
//           <div className="flex items-center gap-2">
//             <button
//               onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
//               disabled={currentPage === 1}
//               className="px-3 py-2 text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors rounded-md cursor-pointer"
//             >
//               <ChevronLeft className="w-4 h-4" />
//             </button>
            
//             <div className="flex items-center gap-1">
//               {currentPage > 1 && (
//                 <button
//                   onClick={() => setCurrentPage(1)}
//                   className="px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-md transition-colors cursor-pointer"
//                 >
//                   1
//                 </button>
//               )}
              
//               <button className="px-3 py-2 text-sm bg-blue-500 text-white rounded-md cursor-pointer">
//                 {currentPage}
//               </button>
              
//               {currentPage < totalPages && (
//                 <button
//                   onClick={() => setCurrentPage(currentPage + 1)}
//                   className="px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-md transition-colors cursor-pointer"
//                 >
//                   {currentPage + 1}
//                 </button>
//               )}
              
//               {currentPage < totalPages - 1 && (
//                 <button
//                   onClick={() => setCurrentPage(totalPages)}
//                   className="px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-md transition-colors cursor-pointer"
//                 >
//                   {totalPages}
//                 </button>
//               )}
//             </div>
            
//             <button
//               onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
//               disabled={currentPage === totalPages}
//               className="px-3 py-2 text-gray-600 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors rounded-md cursor-pointer"
//             >
//               <ChevronRight className="w-4 h-4" />
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Details Modal */}
//       {showDetailsModal && selectedWithdrawal && (
//         <div className="fixed inset-0 bg-white bg-opacity-80 flex items-center justify-center z-50 p-4">
//           <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden border border-gray-200">
//             {/* Modal Content */}
//             <div className="flex flex-col sm:flex-row">
//               {/* Left Side - Withdrawal Details */}
//               <div className="flex-1 p-4 bg-white">
//                 <div className="flex justify-between items-center mb-4">
//                   <h3 className="text-lg font-bold text-gray-800">Withdrawal Via Bank Transfer</h3>
//                   <button
//                     onClick={() => setShowDetailsModal(false)}
//                     className="text-gray-400 hover:text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-full p-1 cursor-pointer transition-colors"
//                   >
//                     <X className="w-5 h-5" />
//                   </button>
//                 </div>
                
//                 <div className="space-y-2 max-h-96 overflow-y-auto">
//                   <div className="flex justify-between items-center py-2 border-b border-gray-100">
//                     <span className="text-gray-600 text-sm">Date</span>
//                     <span className="text-gray-800 font-semibold text-sm">{selectedWithdrawal.initiated}</span>
//                   </div>
                  
//                   <div className="flex justify-between items-center py-2 border-b border-gray-100">
//                     <span className="text-gray-600 text-sm">Tx Number</span>
//                     <span className="text-blue-600 font-semibold text-sm">{selectedWithdrawal.gateway.split(' ')[1] || 'XT5C1WA77S4X'}</span>
//                   </div>
                  
//                   <div className="flex justify-between items-center py-2 border-b border-gray-100">
//                     <span className="text-gray-600 text-sm">Username</span>
//                     <span className="text-blue-600 font-semibold text-sm">@{selectedWithdrawal.user.toLowerCase().replace(' ', '')}</span>
//                   </div>
                  
//                   <div className="flex justify-between items-center py-2 border-b border-gray-100">
//                     <span className="text-gray-600 text-sm">Method</span>
//                     <div className="flex items-center gap-2">
//                       {getGatewayIcon(selectedWithdrawal.gateway)}
//                       <span className="text-gray-800 font-semibold text-sm">{selectedWithdrawal.gateway.split(' ')[0]}</span>
//                     </div>
//                   </div>
                  
//                   <div className="flex justify-between items-center py-2 border-b border-gray-100">
//                     <span className="text-gray-600 text-sm">Amount</span>
//                     <span className="text-gray-800 font-semibold">{selectedWithdrawal.conversion}</span>
//                   </div>
                  
//                   <div className="flex justify-between items-center py-2 border-b border-gray-100">
//                     <span className="text-gray-600 text-sm">Charge</span>
//                     <span className="text-gray-800 font-semibold text-sm">$0.00 USD</span>
//                   </div>
                  
//                   <div className="flex justify-between items-center py-2 border-b border-gray-100">
//                     <span className="text-gray-600 text-sm">After Charge</span>
//                     <span className="text-gray-800 font-semibold">{selectedWithdrawal.conversion}</span>
//                   </div>
                  
//                   <div className="flex justify-between items-center py-2 border-b border-gray-100">
//                     <span className="text-gray-600 text-sm">Rate</span>
//                     <span className="text-gray-800 font-semibold text-sm">1 USD = $1.00 USD</span>
//                   </div>
                  
//                   <div className="flex justify-between items-center py-2 border-b border-gray-100">
//                     <span className="text-gray-600 text-sm">Payable</span>
//                     <span className="text-gray-800 font-semibold">{selectedWithdrawal.conversion}</span>
//                   </div>
                  
//                   <div className="flex justify-between items-center py-2">
//                     <span className="text-gray-600 text-sm">Status</span>
//                     <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${
//                       selectedWithdrawal.status.toLowerCase() === 'success' ? 'bg-green-500 text-white' :
//                       selectedWithdrawal.status.toLowerCase() === 'failed' ? 'bg-red-500 text-white' :
//                       'bg-orange-500 text-white'
//                     }`}>
//                       {selectedWithdrawal.status}
//                     </span>
//                   </div>
//                 </div>
//               </div>
              
//               {/* Right Side - User Withdrawal Information */}
//               <div className="w-full sm:w-64 bg-gray-50 p-4 border-l border-gray-200">
//                 <h3 className="text-base font-bold text-gray-800 mb-4">User Withdrawal Information</h3>
                
//                 <div className="space-y-3">
//                   <div>
//                     <label className="block text-xs font-medium text-gray-600 mb-1">Mobile Number</label>
//                     <p className="text-gray-800 font-semibold text-sm">8801714522775</p>
//                   </div>
                  
//                   <div className="flex gap-2 mt-4">
//                     <button className="bg-green-500 hover:bg-green-600 text-white px-3 py-1.5 rounded text-sm font-medium transition-colors cursor-pointer">
//                       Approve
//                     </button>
//                     <button className="bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded text-sm font-medium transition-colors cursor-pointer">
//                       Reject
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </div>
            
//             {/* Bottom Buttons */}
//             <div className="flex justify-end gap-3 p-4 bg-gray-50 border-t border-gray-200">
//               <button
//                 onClick={() => setShowDetailsModal(false)}
//                 className="px-4 py-1.5 border border-gray-300 rounded text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer text-sm"
//               >
//                 Close
//               </button>
//               <button
//                 className="px-4 py-1.5 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors cursor-pointer text-sm"
//               >
//                 Print Receipt
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default RejectedWithdrawals;
import React from 'react'

export default function RejectedWithdrawals() {
  return (
    <div>Waiting</div>
  )
}

import React, { useState } from 'react';
import { Doughnut, Bar, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const LotteryDashboard = () => {
  // State for user data and charts
  const [userStats, setUserStats] = useState({
    totalUsers: 12845,
    availableTickets: 5000,
    pendingTickets: 358,
    totalIncome: 58200,
  });

  // Data for bar chart (User Activity)
  const barChartData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'User Activity',
        data: [1200, 1900, 1500, 2100, 1800, 2500, 2200],
        backgroundColor: 'rgba(79, 70, 229, 0.8)',
        borderColor: 'rgba(79, 70, 229, 1)',
        borderWidth: 1,
      },
    ],
  };

  // Data for doughnut chart (Lottery Distribution)
  const doughnutChartData = {
    labels: ['Available Tickets', 'Sold Tickets', 'Pending Tickets', 'Expired Tickets'],
    datasets: [
      {
        data: [35, 25, 15, 25],
        backgroundColor: [
          'rgba(79, 70, 229, 0.8)',
          'rgba(16, 185, 129, 0.8)',
          'rgba(245, 158, 11, 0.8)',
          'rgba(239, 68, 68, 0.8)',
        ],
        borderWidth: 1,
      },
    ],
  };

  // Ticket Overview data for line chart (Updated with dynamic increase/decrease trends)
  const ticketChartData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6', 'Week 7', 'Week 8', 'Week 9', 'Week 10', 'Week 11', 'Week 12'],
    datasets: [
      {
        label: 'Tickets Sold',
        data: [50, 80, 60, 100, 90, 120, 150, 130, 180, 160, 200, 220],
        borderColor: '#4F46E5',
        backgroundColor: 'rgba(79, 70, 229, 0.3)',
        fill: true,
        tension: 0.4,
        pointRadius: 4,
        pointHoverRadius: 6,
        pointBackgroundColor: '#4F46E5',
      },
      {
        label: 'Tickets Redeemed',
        data: [30, 50, 40, 70, 60, 90, 110, 100, 140, 120, 160, 180],
        borderColor: '#EF4444',
        backgroundColor: 'rgba(239, 68, 68, 0.3)',
        fill: true,
        tension: 0.4,
        pointRadius: 4,
        pointHoverRadius: 6,
        pointBackgroundColor: '#EF4444',
      },
    ],
  };

  // Income data (Aligned with weekly ticket sales)
  const incomeData = [
    { method: 'Credit Card', amount: 23584, change: 12, icon: 'https://img.icons8.com/color/48/000000/credit-card.png' },
    { method: 'PayPal', amount: 15245, change: 8, icon: 'https://img.icons8.com/color/48/000000/paypal.png' },
    { method: 'Bank Transfer', amount: 12891, change: 15, icon: 'https://img.icons8.com/color/48/000000/bank.png' },
    { method: 'Crypto', amount: 6742, change: 22, icon: 'https://img.icons8.com/color/48/000000/bitcoin.png' },
  ];

  // Active Users data (10 users, with statuses)
  const activeUsers = [
    { user: 'John Smith', status: 'Active', time: '2 min ago', avatar: 'https://i.pravatar.cc/40?img=12' },
    { user: 'Emma Johnson', status: 'Available', time: '5 min ago', avatar: 'https://i.pravatar.cc/40?img=8' },
    { user: 'Michael Brown', status: 'Sold', time: '10 min ago', avatar: 'https://i.pravatar.cc/40?img=11' },
    { user: 'Sarah Wilson', status: 'Active', time: '15 min ago', avatar: 'https://i.pravatar.cc/40?img=2' },
    { user: 'Robert Davis', status: 'Available', time: '20 min ago', avatar: 'https://i.pravatar.cc/40?img=3' },
    { user: 'Lisa Martinez', status: 'Sold', time: '25 min ago', avatar: 'https://i.pravatar.cc/40?img=4' },
    { user: 'David Garcia', status: 'Active', time: '30 min ago', avatar: 'https://i.pravatar.cc/40?img=5' },
    { user: 'Susan Rodriguez', status: 'Available', time: '35 min ago', avatar: 'https://i.pravatar.cc/40?img=6' },
    { user: 'James Lee', status: 'Sold', time: '40 min ago', avatar: 'https://i.pravatar.cc/40?img=7' },
    { user: 'Patricia Hernandez', status: 'Active', time: '45 min ago', avatar: 'https://i.pravatar.cc/40?img=9' },
  ];

  // Options for charts
  const barChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: 'User Activity',
        font: { size: 18, weight: 'bold' },
        padding: { bottom: 20 },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: { drawBorder: false, color: 'rgba(0, 0, 0, 0.1)' },
        ticks: { color: '#4B5563', font: { size: 12 } },
      },
      x: {
        grid: { display: false },
        ticks: { color: '#4B5563', font: { size: 12 } },
      },
    },
  };

  const doughnutChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: { color: '#4B5563', font: { size: 12 } },
      },
      title: {
        display: true,
        text: 'Lottery Distribution',
        font: { size: 18, weight: 'bold' },
        padding: { bottom: 20 },
      },
    },
  };

  const ticketChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#4B5563',
          font: { size: 14, weight: 'bold' },
          padding: 20,
        },
      },
      title: {
        display: true,
        text: 'Ticket Overview (Weekly)',
        font: { size: 20, weight: 'bold' },
        padding: { bottom: 20 },
        color: '#1F2937',
      },
      tooltip: {
        backgroundColor: '#1F2937',
        titleFont: { size: 14 },
        bodyFont: { size: 12 },
        padding: 10,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: { drawBorder: false, color: 'rgba(0, 0, 0, 0.1)' },
        ticks: { color: '#4B5563', font: { size: 12 }, stepSize: 50 },
      },
      x: {
        grid: { display: false },
        ticks: { color: '#4B5563', font: { size: 12 } },
      },
    },
    animation: {
      duration: 1000,
      easing: 'easeInOutQuad',
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 font-sans p-6">
      <div className="max-w-7xl mx-auto">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Users Card */}
          <div className="card p-6 bg-white rounded-xl shadow-lg transform transition duration-300 hover:scale-105 border border-gray-100">
            <div className="flex items-start justify-between">
              <div className="text-gray-800">
                <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Total Users</h2>
                <p className="text-3xl font-bold mt-1 text-gray-900">{userStats.totalUsers.toLocaleString()}</p>
              </div>
              <div className="text-indigo-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <span className="text-sm font-medium text-green-500 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
                18.2% increase
              </span>
            </div>
          </div>

          {/* Available Tickets Card */}
          <div className="card p-6 bg-white rounded-xl shadow-lg transform transition duration-300 hover:scale-105 border border-gray-100">
            <div className="flex items-start justify-between">
              <div className="text-gray-800">
                <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Available Tickets</h2>
                <p className="text-3xl font-bold mt-1 text-gray-900">{userStats.availableTickets.toLocaleString()}</p>
              </div>
              <div className="text-green-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                </svg>
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <span className="text-sm font-medium text-red-500 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
                3.1% decrease
              </span>
            </div>
          </div>

          {/* Pending Tickets Card */}
          <div className="card p-6 bg-white rounded-xl shadow-lg transform transition duration-300 hover:scale-105 border border-gray-100">
            <div className="flex items-start justify-between">
              <div className="text-gray-800">
                <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Pending Tickets</h2>
                <p className="text-3xl font-bold mt-1 text-gray-900">{userStats.pendingTickets.toLocaleString()}</p>
              </div>
              <div className="text-amber-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                </svg>
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <span className="text-sm font-medium text-green-500 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
                8.5% increase
              </span>
            </div>
          </div>

          {/* Total Income Card */}
          <div className="card p-6 bg-white rounded-xl shadow-lg transform transition duration-300 hover:scale-105 border border-gray-100">
            <div className="flex items-start justify-between">
              <div className="text-gray-800">
                <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Total Income</h2>
                <p className="text-3xl font-bold mt-1 text-gray-900">${userStats.totalIncome.toLocaleString()}</p>
              </div>
              <div className="text-emerald-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <span className="text-sm font-medium text-green-500 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
                12.6% increase
              </span>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* User Activity Chart */}
          <div className="bg-white card p-6 rounded-xl shadow-lg border border-gray-100">
            <h2 className="text-lg font-semibold mb-4 flex items-center text-gray-700">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              User Activity
            </h2>
            <div className="h-64">
              <Bar data={barChartData} options={barChartOptions} />
            </div>
          </div>

          {/* Lottery Distribution Chart */}
          <div className="bg-white card p-6 rounded-xl shadow-lg border border-gray-100">
            <h2 className="text-lg font-semibold mb-4 flex items-center text-gray-700">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
              </svg>
              Lottery Distribution
            </h2>
            <div className="h-80 flex items-center justify-center">
              <Doughnut data={doughnutChartData} options={doughnutChartOptions} />
            </div>
          </div>
        </div>

        {/* Ticket Overview Section */}
        <div className="grid grid-cols-1 mb-8">
          <div className="bg-white card p-6 rounded-xl shadow-lg border border-gray-100">
            <h2 className="text-xl font-bold mb-4 flex items-center text-gray-800">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Ticket Overview
            </h2>
            <div className="h-72 mb-6">
              <Line data={ticketChartData} options={ticketChartOptions} />
            </div>
            <h3 className="text-md font-semibold text-gray-600 mb-4">Weekly Income Breakdown</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {incomeData.map((income, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg shadow-sm border border-gray-100 hover:bg-gray-100 transition"
                >
                  <div className="flex items-center">
                    <img src={income.icon} alt={income.method} className="h-8 w-8 mr-3" />
                    <div>
                      <span className="font-medium text-gray-800">{income.method}</span>
                      <p className="text-sm text-gray-500">Weekly Contribution</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-gray-900">${income.amount.toLocaleString()}</div>
                    <div className="text-green-500 text-sm flex items-center justify-end">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3 w-3 mr-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 10l7-7m0 0l7 7m-7-7v18"
                        />
                      </svg>
                      <span>+{income.change}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Active Users Section */}
        <div className="grid grid-cols-1 mb-8">
          <div className="bg-white card p-6 rounded-xl shadow-lg border border-gray-100">
            <h2 className="text-xl font-bold mb-4 flex items-center text-gray-800">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Active Users
            </h2>
            <div className="flex flex-row overflow-x-auto space-x-4 pb-4">
              {activeUsers.map((user, index) => (
                <div key={index} className="flex-shrink-0 w-48 p-3 bg-gray-50 rounded-lg text-center shadow-sm border border-gray-100">
                  <div className="relative mx-auto">
                    <img src={user.avatar} alt={user.user} className="rounded-full h-10 w-10 mx-auto mb-2" />
                    <span
                      className={`absolute bottom-0 right-0 block h-3 w-3 rounded-full ring-2 ring-white ${
                        user.status === 'Active' ? 'bg-green-500' : user.status === 'Available' ? 'bg-blue-500' : 'bg-yellow-500'
                      }`}
                    />
                  </div>
                  <p className="font-medium text-gray-800 text-sm">{user.user}</p>
                  <p className="text-sm text-gray-500">{user.status}</p>
                  <p className="text-xs text-gray-500">{user.time}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LotteryDashboard;
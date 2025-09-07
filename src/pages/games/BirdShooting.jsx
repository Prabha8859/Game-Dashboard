import React, { useState, useEffect } from 'react';
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

const BirdShootingDashboard = () => {
  // State for game data and charts
  const [gameStats, setGameStats] = useState({
    totalPlayers: 12845,
    activeGames: 1258,
    activeBirds: 354,
    totalEarnings: 58200,
    topPlayerScore: 9845,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [suggestedResponse, setSuggestedResponse] = useState('');

  // Data for bar chart - Birds shot by type
  const birdTypeChartData = {
    labels: ['Sparrows', 'Eagles', 'Parrots', 'Owls', 'Pigeons', 'Hawks'],
    datasets: [
      {
        label: 'Birds Shot',
        data: [12000, 8500, 6500, 4500, 10500, 7000],
        backgroundColor: [
          'rgba(139, 92, 246, 0.8)',
          'rgba(16, 185, 129, 0.8)',
          'rgba(245, 158, 11, 0.8)',
          'rgba(239, 68, 68, 0.8)',
          'rgba(59, 130, 246, 0.8)',
          'rgba(157, 23, 77, 0.8)',
        ],
        borderColor: [
          'rgba(139, 92, 246, 1)',
          'rgba(16, 185, 129, 1)',
          'rgba(245, 158, 11, 1)',
          'rgba(239, 68, 68, 1)',
          'rgba(59, 130, 246, 1)',
          'rgba(157, 23, 77, 1)',
        ],
        borderWidth: 1,
        borderRadius: 6,
      },
    ],
  };

  // Data for doughnut chart - Bird types distribution
  const doughnutChartData = {
    labels: ['Sparrows', 'Eagles', 'Parrots', 'Owls', 'Pigeons', 'Hawks'],
    datasets: [
      {
        data: [30, 20, 15, 10, 15, 10],
        backgroundColor: [
          'rgba(139, 92, 246, 0.8)',
          'rgba(16, 185, 129, 0.8)',
          'rgba(245, 158, 11, 0.8)',
          'rgba(239, 68, 68, 0.8)',
          'rgba(59, 130, 246, 0.8)',
          'rgba(157, 23, 77, 0.8)',
        ],
        borderWidth: 0,
        hoverOffset: 20,
      },
    ],
  };

  // Financial data for line chart
  const financialChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Revenue',
        data: [45, 52, 38, 60, 55, 68, 72, 65, 80, 75, 82, 90],
        borderColor: 'rgba(139, 92, 246, 1)',
        backgroundColor: 'rgba(139, 92, 246, 0.2)',
        fill: true,
        tension: 0.4,
      },
      {
        label: 'Expenses',
        data: [30, 35, 25, 40, 38, 45, 50, 42, 55, 50, 58, 65],
        borderColor: 'rgba(239, 68, 68, 1)',
        backgroundColor: 'rgba(239, 68, 68, 0.2)',
        fill: true,
        tension: 0.4,
      },
    ],
  };

  // Weapon usage data
  const weaponData = [
    { weapon: 'Shotgun', usage: 23584, change: 12 },
    { weapon: 'Sniper Rifle', usage: 15245, change: 8 },
    { weapon: 'Crossbow', usage: 12891, change: 15 },
    { weapon: 'Pistol', usage: 6742, change: 22 },
  ];

  // Recent activities data with status added
  const recentActivities = [
    { user: 'EagleEye42', action: 'Achieved perfect score', time: '2 min ago', score: '10,000', avatar: 'https://i.pravatar.cc/40?img=12', status: 'online' },
    { user: 'FeatherHunter', action: 'Unlocked golden eagle', time: '5 min ago', score: '2,500', avatar: 'https://i.pravatar.cc/40?img=8', status: 'online' },
    { user: 'BirdSniper', action: 'Purchased premium scope', time: '10 min ago', score: '$100', avatar: 'https://i.pravatar.cc/40?img=11', status: 'offline' },
    { user: 'SkyHunter', action: 'Won tournament', time: '15 min ago', score: '$1,200', avatar: 'https://i.pravatar.cc/40?img=2', status: 'online' },
    { user: 'WingShooter', action: 'Set new record', time: '20 min ago', score: '15,420', avatar: 'https://i.pravatar.cc/40?img=3', status: 'offline' },
  ];

  // Animation states
  const [statsAnimation, setStatsAnimation] = useState(false);

  useEffect(() => {
    // Trigger animations on component mount
    setStatsAnimation(true);
    
    // Simulate data loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  // Options for charts
  const birdTypeChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          usePointStyle: true,
          padding: 15,
          font: {
            size: window.innerWidth < 768 ? 10 : 12
          }
        }
      },
      title: {
        display: true,
        text: 'Birds Shot by Type',
        color: '#6B7280',
        font: {
          size: window.innerWidth < 768 ? 14 : 16,
          weight: 'bold'
        }
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          drawBorder: false,
        },
        ticks: {
          callback: function(value) {
            return value / 1000 + 'k';
          },
          font: {
            size: window.innerWidth < 768 ? 10 : 12
          }
        }
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: window.innerWidth < 768 ? 10 : 12
          }
        }
      },
    },
    animation: {
      duration: 2000,
      easing: 'easeOutQuart'
    }
  };

  const doughnutChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          usePointStyle: true,
          padding: 15,
          font: {
            size: window.innerWidth < 768 ? 10 : 12
          }
        }
      },
      title: {
        display: true,
        text: 'Bird Types Distribution',
        color: '#6B7280',
        font: {
          size: window.innerWidth < 768 ? 14 : 16,
          weight: 'bold'
        }
      },
    },
    animation: {
      duration: 2000,
      easing: 'easeOutQuart'
    },
    cutout: '65%'
  };

  const financialChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          usePointStyle: true,
          padding: 15,
          font: {
            size: window.innerWidth < 768 ? 10 : 12
          }
        }
      },
      title: {
        display: true,
        text: 'Revenue & Expenses',
        color: '#6B7280',
        font: {
          size: window.innerWidth < 768 ? 14 : 16,
          weight: 'bold'
        }
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          drawBorder: false,
        },
        ticks: {
          callback: function(value) {
            return '$' + value;
          },
          font: {
            size: window.innerWidth < 768 ? 10 : 12
          }
        }
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: window.innerWidth < 768 ? 10 : 12
          }
        }
      },
    },
    animation: {
      duration: 2000,
      easing: 'easeOutQuart'
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 font-sans p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8 gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              🎯 Bird Shooting Dashboard
            </h1>
            <p className="text-gray-600 mt-1 sm:mt-2 text-sm sm:text-base">Track your bird shooting game performance and statistics</p>
          </div>
          <div className="flex items-center gap-2 bg-white rounded-xl px-3 py-1.5 sm:px-4 sm:py-2 shadow-lg self-start sm:self-auto">
            <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-500 rounded-full animate-pulse"></div>
            <span className="font-medium text-gray-700 text-sm sm:text-base">Live Data</span>
          </div>
        </div>

        {/* Stats Cards - All Same Size */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
          
          {/* Total Players Card */}
          <div className={`card p-4 sm:p-6 bg-white rounded-xl sm:rounded-2xl shadow-lg transform transition-all duration-500 hover:scale-105 hover:shadow-xl ${statsAnimation ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="flex items-start justify-between">
              <div className="text-gray-800">
                <h2 className="text-xs sm:text-sm font-semibold text-gray-500">Total Players</h2>
                <p className="text-2xl sm:text-3xl font-bold mt-1 text-gray-900">{gameStats.totalPlayers.toLocaleString()}</p>
              </div>
              <div className="text-indigo-600 bg-indigo-100 p-2 sm:p-3 rounded-lg sm:rounded-xl">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
            </div>
            <div className="mt-3 sm:mt-4 flex items-center">
              <span className="text-xs sm:text-sm font-medium text-green-500 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-4 sm:w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
                18.2% increase
              </span>
            </div>
          </div>

          {/* Active Games Card */}
          <div className={`card p-4 sm:p-6 bg-white rounded-xl sm:rounded-2xl shadow-lg transform transition-all duration-500 hover:scale-105 hover:shadow-xl delay-75 ${statsAnimation ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="flex items-start justify-between">
              <div className="text-gray-800">
                <h2 className="text-xs sm:text-sm font-semibold text-gray-500">Active Games</h2>
                <p className="text-2xl sm:text-3xl font-bold mt-1 text-gray-900">{gameStats.activeGames.toLocaleString()}</p>
              </div>
              <div className="text-green-600 bg-green-100 p-2 sm:p-3 rounded-lg sm:rounded-xl">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
            </div>
            <div className="mt-3 sm:mt-4 flex items-center">
              <span className="text-xs sm:text-sm font-medium text-green-500 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-4 sm:w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
                8.5% increase
              </span>
            </div>
          </div>

          {/* Active Birds Card */}
          <div className={`card p-4 sm:p-6 bg-white rounded-xl sm:rounded-2xl shadow-lg transform transition-all duration-500 hover:scale-105 hover:shadow-xl delay-150 ${statsAnimation ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="flex items-start justify-between">
              <div className="text-gray-800">
                <h2 className="text-xs sm:text-sm font-semibold text-gray-500">Active Birds</h2>
                <p className="text-2xl sm:text-3xl font-bold mt-1 text-gray-900">{gameStats.activeBirds.toLocaleString()}</p>
              </div>
              <div className="text-amber-600 bg-amber-100 p-2 sm:p-3 rounded-lg sm:rounded-xl">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
            </div>
            <div className="mt-3 sm:mt-4 flex items-center">
              <span className="text-xs sm:text-sm font-medium text-green-500 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-4 sm:w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
                12.6% increase
              </span>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
          {/* Birds Shot by Type Chart */}
          <div className="bg-white card p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-lg transform transition-all duration-300 hover:scale-[1.02]">
            <h2 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 flex items-center text-gray-700">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 text-indigo-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v极速6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 极速0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              Birds Shot by Type
            </h2>
            <div className="h-64">
              <Bar data={birdTypeChartData} options={birdTypeChartOptions} />
            </div>
          </div>

          {/* Bird Types Distribution Chart */}
          <div className="bg-white card p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-lg transform transition-all duration-300 hover:scale-[1.02]">
            <h2 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 flex items-center text-gray-700">
              <svg xmlns="http://www.w3.org/2000/s极速vg" className="h-4 w-4 sm:h-5 sm:w-5 text-indigo-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
              </svg>
              Bird Types Distribution
            </h2>
            <div className="h-80 flex items-center justify-center">
              <Doughnut data={doughnutChartData} options={doughnutChartOptions} />
            </div>
          </div>
        </div>

        {/* Financial Overview & Recent Activities */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
          {/* Financial Overview */}
          <div className="bg-white card p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-lg transform transition-all duration-300 hover:极速scale-[1.02]">
            <h2 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 flex items-center text-gray-700">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 text-indigo-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 极速3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2极速.599 1M12 8V7m极速0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Financial Overview
            </h2>
            <div className="h-64 mb-4">
              <Line data={financialChartData} options={financialChartOptions} />
            </div>
            
            <div className="space-y-3 sm:space-y-4">
              <h3 className="font-semibold text-gray-700 text-sm sm:text-base">Weapon Usage Stats</h3>
              {weaponData.map((weapon, index) => (
                <div key={index} className="flex items-center justify-between p-2 sm:p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all duration-300">
                  <div className="flex items-center">
                    <div
                      className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full mr-2 ${
                        index === 0
                          ? 'bg-indigo-600'
                          : index === 1
                          ? 'bg-green-500'
                          : index === 2
                          ? 'bg-yellow-500'
                          : 'bg-purple-500'
                      }`}
                    ></div>
                    <span className="text-xs sm:text-sm">{weapon.weapon}</span>
                  </div>
                  <div className="font-semibold text-xs sm:text-sm">{weapon.usage.toLocaleString()}</div>
                  <div className="text-green-500 text-xs flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 极速0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                    </svg>
                    <span>+{weapon.change}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activities */}
          <div className="bg-white card p-4 sm:p-6 rounded-xl sm:rounded-2xl shadow-lg transform transition-all duration-300 hover:scale-[1.02]">
            <h2 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 flex items-center text-gray-700">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5 text-indigo-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Recent Player Activities
            </h2>
            
            <div className="space-y-3 sm:space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-2 sm:p-3 bg-gray极速-50 rounded-lg hover:bg-gray-100 transition-all duration-300 transform hover:-translate-y-1">
                  <div className="flex items-center">
                    <div className="relative">
                      <img src={activity.avatar} alt={activity.user} className="rounded-full h-8 w-8 sm:h-10 sm:w-10 mr-2 sm:mr-3" />
                      {/* Status indicator added here */}
                      <span className={`absolute bottom-0 right-1 sm:right-2 block h-2 w-2 sm:h-3 sm:w-3 rounded-full ring-2 ring-white ${activity.status === 'online' ? 'bg-green-500' : 'bg-gray-400'}`} />
                    </div>
                    <div>
                      <p className="font-medium text-gray-800 text-xs sm:text-sm">{activity.user}</p>
                      <p className="text-xs text-gray-500">{activity.action}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs sm:text-sm font-medium text-gray-800">{activity.score}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BirdShootingDashboard;
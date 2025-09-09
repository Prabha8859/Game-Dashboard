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
    totalActivePlayers: 2847,
    totalShotsFiredToday: 45623,
    totalCoinsSpent: 128450,
    totalCoinsWon: 96780,
    adminCommissionEarned: 31870,
    totalPlayers: 12845,
    activeGames: 1258,
    activeBirds: 354,
    topPlayerScore: 9845,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [statsAnimation, setStatsAnimation] = useState(false);

  // Data for bar chart - Birds shot by type
  const birdTypeChartData = {
    labels: ['Sparrows', 'Eagles', 'Parrots', 'Owls', 'Pigeons', 'Hawks'],
    datasets: [
      {
        label: 'Birds Shot Today',
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
        borderWidth: 2,
        borderRadius: 8,
      },
    ],
  };

  // Data for doughnut chart - Shot accuracy
  const accuracyChartData = {
    labels: ['Successful Hits', 'Missed Shots'],
    datasets: [
      {
        data: [72, 28],
        backgroundColor: [
          'rgba(16, 185, 129, 0.8)',
          'rgba(239, 68, 68, 0.8)',
        ],
        borderWidth: 3,
        borderColor: ['rgba(16, 185, 129, 1)', 'rgba(239, 68, 68, 1)'],
        hoverOffset: 20,
      },
    ],
  };

  // Financial data for line chart - Coins flow
  const coinsFlowData = {
    labels: ['6 AM', '9 AM', '12 PM', '3 PM', '6 PM', '9 PM', '12 AM'],
    datasets: [
      {
        label: 'Coins Spent',
        data: [2400, 3200, 4800, 6200, 5800, 7200, 8400],
        borderColor: 'rgba(239, 68, 68, 1)',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        fill: true,
        tension: 0.4,
        pointBackgroundColor: 'rgba(239, 68, 68, 1)',
        pointBorderColor: '#fff',
        pointBorderWidth: 3,
        pointRadius: 6,
      },
      {
        label: 'Coins Won',
        data: [1800, 2400, 3600, 4680, 4350, 5400, 6300],
        borderColor: 'rgba(16, 185, 129, 1)',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        fill: true,
        tension: 0.4,
        pointBackgroundColor: 'rgba(16, 185, 129, 1)',
        pointBorderColor: '#fff',
        pointBorderWidth: 3,
        pointRadius: 6,
      },
    ],
  };

  // Recent game activities data
  const recentGameActivities = [
    { 
      user: 'EagleEye42', 
      action: 'Shot Golden Eagle', 
      time: '2 min ago', 
      coins: '+2,500', 
      avatar: 'https://i.pravatar.cc/40?img=12', 
      status: 'online',
      gameType: 'Premium Hunt'
    },
    { 
      user: 'BirdMaster99', 
      action: 'Perfect Round (10/10)', 
      time: '4 min ago', 
      coins: '+5,000', 
      avatar: 'https://i.pravatar.cc/40?img=8', 
      status: 'online',
      gameType: 'Challenge Mode'
    },
    { 
      user: 'SkyHunter', 
      action: 'Hit Rare Parrot', 
      time: '7 min ago', 
      coins: '+1,200', 
      avatar: 'https://i.pravatar.cc/40?img=11', 
      status: 'offline',
      gameType: 'Classic Hunt'
    },
    { 
      user: 'FeatherShooter', 
      action: 'Bought 50 Bullets', 
      time: '10 min ago', 
      coins: '-500', 
      avatar: 'https://i.pravatar.cc/40?img=2', 
      status: 'online',
      gameType: 'Store'
    },
    { 
      user: 'WingDestroyer', 
      action: 'Tournament Winner', 
      time: '15 min ago', 
      coins: '+10,000', 
      avatar: 'https://i.pravatar.cc/40?img=3', 
      status: 'online',
      gameType: 'Tournament'
    },
    { 
      user: 'BulletTime', 
      action: 'Shot 3 Birds in Row', 
      time: '18 min ago', 
      coins: '+1,800', 
      avatar: 'https://i.pravatar.cc/40?img=5', 
      status: 'offline',
      gameType: 'Combo Hunt'
    },
    { 
      user: 'SharpShooter', 
      action: 'Missed All 10 Shots', 
      time: '20 min ago', 
      coins: '-1,000', 
      avatar: 'https://i.pravatar.cc/40?img=7', 
      status: 'online',
      gameType: 'Classic Hunt'
    },
  ];

  // Top weapons data
  const weaponStats = [
    { weapon: 'Sniper Rifle', usage: 45, accuracy: 89, color: 'bg-purple-500' },
    { weapon: 'Shotgun', usage: 32, accuracy: 67, color: 'bg-blue-500' },
    { weapon: 'Hunting Bow', usage: 23, accuracy: 78, color: 'bg-green-500' },
    { weapon: 'Crossbow', usage: 18, accuracy: 82, color: 'bg-yellow-500' },
  ];

  useEffect(() => {
    setStatsAnimation(true);
    
    // Simulate real-time data updates
    const interval = setInterval(() => {
      setGameStats(prev => ({
        ...prev,
        totalActivePlayers: prev.totalActivePlayers + Math.floor(Math.random() * 10) - 5,
        totalShotsFiredToday: prev.totalShotsFiredToday + Math.floor(Math.random() * 50),
        totalCoinsSpent: prev.totalCoinsSpent + Math.floor(Math.random() * 100),
        totalCoinsWon: prev.totalCoinsWon + Math.floor(Math.random() * 80),
        adminCommissionEarned: prev.adminCommissionEarned + Math.floor(Math.random() * 20),
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Chart options
  const birdTypeChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          usePointStyle: true,
          padding: 15,
          font: { size: window.innerWidth < 768 ? 10 : 12 }
        }
      },
      title: {
        display: true,
        text: 'Birds Shot Today by Type',
        color: '#6B7280',
        font: { size: window.innerWidth < 768 ? 14 : 16, weight: 'bold' }
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: { drawBorder: false },
        ticks: {
          callback: function(value) { return value / 1000 + 'k'; },
          font: { size: window.innerWidth < 768 ? 10 : 12 }
        }
      },
      x: {
        grid: { display: false },
        ticks: { font: { size: window.innerWidth < 768 ? 10 : 12 } }
      },
    },
    animation: { duration: 2000, easing: 'easeOutQuart' }
  };

  const accuracyChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          usePointStyle: true,
          padding: 15,
          font: { size: window.innerWidth < 768 ? 10 : 12 }
        }
      },
      title: {
        display: true,
        text: 'Today\'s Shot Accuracy',
        color: '#6B7280',
        font: { size: window.innerWidth < 768 ? 14 : 16, weight: 'bold' }
      },
    },
    animation: { duration: 2000, easing: 'easeOutQuart' },
    cutout: '60%'
  };

  const coinsFlowOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          usePointStyle: true,
          padding: 15,
          font: { size: window.innerWidth < 768 ? 10 : 12 }
        }
      },
      title: {
        display: true,
        text: 'Today\'s Coins Flow',
        color: '#6B7280',
        font: { size: window.innerWidth < 768 ? 14 : 16, weight: 'bold' }
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: { drawBorder: false },
        ticks: {
          callback: function(value) { return value / 1000 + 'k'; },
          font: { size: window.innerWidth < 768 ? 10 : 12 }
        }
      },
      x: {
        grid: { display: false },
        ticks: { font: { size: window.innerWidth < 768 ? 10 : 12 } }
      },
    },
    animation: { duration: 2000, easing: 'easeOutQuart' }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-100 font-sans p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 sm:mb-8 gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
              🎯 Bird Shooting Game Dashboard
            </h1>
            <p className="text-gray-600 mt-2 text-base sm:text-lg">Real-time game statistics and player activities</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-white rounded-xl px-4 py-2 shadow-lg">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span className="font-medium text-gray-700">Live Data</span>
            </div>
            <div className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl px-4 py-2 shadow-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="font-medium">Today's Stats</span>
            </div>
          </div>
        </div>

        {/* Main Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-6 mb-8">
          
          {/* Total Active Players */}
          <div className={`card p-4 sm:p-6 bg-white border-t-4 border-blue-500 text-gray-800 rounded-xl sm:rounded-2xl shadow-xl transform transition-all duration-500 hover:scale-105 hover:shadow-2xl ${statsAnimation ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-xs sm:text-sm font-semibold text-gray-600">Active Players</h3>
                <p className="text-xl sm:text-2xl font-bold mt-1 text-blue-600">{gameStats.totalActivePlayers.toLocaleString()}</p>
              </div>
              <div className="p-2 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            <div className="mt-3 flex items-center">
              <span className="text-xs font-medium text-gray-600 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
                Currently Playing
              </span>
            </div>
          </div>

          {/* Total Shots Fired Today */}
          <div className={`card p-4 sm:p-6 bg-white border-t-4 border-red-500 text-gray-800 rounded-xl sm:rounded-2xl shadow-xl transform transition-all duration-500 hover:scale-105 hover:shadow-2xl delay-75 ${statsAnimation ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-xs sm:text-sm font-semibold text-gray-600">Shots Fired Today</h3>
                <p className="text-xl sm:text-2xl font-bold mt-1 text-red-600">{gameStats.totalShotsFiredToday.toLocaleString()}</p>
              </div>
              <div className="p-2 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 110-6 3 3 0 010 6z" />
                </svg>
              </div>
            </div>
            <div className="mt-3 flex items-center">
              <span className="text-xs font-medium text-gray-600 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
                +15.2% from yesterday
              </span>
            </div>
          </div>

          {/* Total Coins Spent */}
          <div className={`card p-4 sm:p-6 bg-white border-t-4 border-orange-500 text-gray-800 rounded-xl sm:rounded-2xl shadow-xl transform transition-all duration-500 hover:scale-105 hover:shadow-2xl delay-150 ${statsAnimation ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-xs sm:text-sm font-semibold text-gray-600">Coins Spent</h3>
                <p className="text-xl sm:text-2xl font-bold mt-1 text-orange-600">{gameStats.totalCoinsSpent.toLocaleString()}</p>
              </div>
              <div className="p-2 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-orange-500" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M8.433 7.418c.606-.291 1.254-.429 1.905-.417a5.55 5.55 0 01.378 1.144c.484.775 1.056 1.579 1.708 2.302.39.43.766.862 1.11 1.258.423.49.697 1.01.815 1.527l-.612.482a8.627 8.627 0 01-1.017-.502 6.57 6.57 0 00-1.255-1.071c-.422-.294-.834-.616-1.196-.949-.441-.4-.84-.799-1.203-1.155a5.55 5.55 0 01-1.233-1.397.7.7 0 01-.137-.417c0-.203.04-.396.117-.582zM10 2a8 8 0 100 16 8 8 0 000-16zM6 10a1 1 0 112 0 1 1 0 01-2 0zm8 0a1 1 0 11-2 0 1 1 0 012 0z" />
                </svg>
              </div>
            </div>
            <div className="mt-3 flex items-center">
              <span className="text-xs font-medium text-gray-600 flex items-center">
                Bullets & Power-ups
              </span>
            </div>
          </div>

          {/* Total Coins Won */}
          <div className={`card p-4 sm:p-6 bg-white border-t-4 border-green-500 text-gray-800 rounded-xl sm:rounded-2xl shadow-xl transform transition-all duration-500 hover:scale-105 hover:shadow-2xl delay-200 ${statsAnimation ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-xs sm:text-sm font-semibold text-gray-600">Coins Won</h3>
                <p className="text-xl sm:text-2xl font-bold mt-1 text-green-600">{gameStats.totalCoinsWon.toLocaleString()}</p>
              </div>
              <div className="p-2 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9H5.5a2.5 2.5 0 100 5H7v2.222A5.996 5.996 0 015.5 17C4.672 17 4 16.328 4 15.5S4.672 14 5.5 14H7V9zm6.5 0h-2v2.222a5.996 5.996 0 012.5 4.545c.828 0 1.5-.672 1.5-1.5S15.328 13 14.5 13H13V9zm0 0v-2.222A5.996 5.996 0 0114.5 7c.828 0 1.5.672 1.5 1.5S15.328 10 14.5 10H13V7z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            <div className="mt-3 flex items-center">
              <span className="text-xs font-medium text-gray-600 flex items-center">
                Player Rewards
              </span>
            </div>
          </div>

          {/* Admin Commission */}
          <div className={`card p-4 sm:p-6 bg-white border-t-4 border-purple-500 text-gray-800 rounded-xl sm:rounded-2xl shadow-xl transform transition-all duration-500 hover:scale-105 hover:shadow-2xl delay-300 ${statsAnimation ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-xs sm:text-sm font-semibold text-gray-600">Admin Commission</h3>
                <p className="text-xl sm:text-2xl font-bold mt-1 text-purple-600">{gameStats.adminCommissionEarned.toLocaleString()}</p>
              </div>
              <div className="p-2 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-purple-500" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                </svg>
              </div>
            </div>
            <div className="mt-3 flex items-center">
              <span className="text-xs font-medium text-gray-600 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
                +8.3% Today
              </span>
            </div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
          
          {/* Birds Shot Chart */}
          <div className="bg-white card p-6 rounded-2xl shadow-xl transform transition-all duration-300 hover:scale-[1.02]">
            <div className="h-80">
              <Bar data={birdTypeChartData} options={birdTypeChartOptions} />
            </div>
          </div>

          {/* Shot Accuracy Chart */}
          <div className="bg-white card p-6 rounded-2xl shadow-xl transform transition-all duration-300 hover:scale-[1.02]">
            <div className="h-80">
              <Doughnut data={accuracyChartData} options={accuracyChartOptions} />
            </div>
            <div className="mt-4 text-center">
              <p className="text-lg font-bold text-gray-800">72% Accuracy</p>
              <p className="text-sm text-gray-600">Today's Overall Performance</p>
            </div>
          </div>

          {/* Coins Flow Chart */}
          <div className="bg-white card p-6 rounded-2xl shadow-xl transform transition-all duration-300 hover:scale-[1.02] lg:col-span-2 xl:col-span-1">
            <div className="h-80">
              <Line data={coinsFlowData} options={coinsFlowOptions} />
            </div>
          </div>
        </div>

        {/* Recent Activities & Weapons Stats - Now in a single row */}
        <div className=" lg:flex-row gap-6 mb-8">
          
          {/* Recent Game Activities */}
          <div className="flex-1 bg-white card p-6 rounded-2xl shadow-xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold flex items-center text-gray-800">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Recent Game Activities
              </h2>
              <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">Live Updates</span>
            </div>
            
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {recentGameActivities.map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl hover:from-indigo-50 hover:to-purple-50 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg">
                  <div className="flex items-center">
                    <div className="relative">
                      <img src={activity.avatar} alt={activity.user} className="rounded-full h-12 w-12 mr-4 border-2 border-white shadow-lg" />
                      <span className={`absolute bottom-0 right-3 block h-3 w-3 rounded-full ring-2 ring-white ${activity.status === 'online' ? 'bg-green-500' : 'bg-gray-400'}`} />
                    </div>
                    <div>
                      <p className="font-bold text-gray-800">{activity.user}</p>
                      <p className="text-sm text-gray-600">{activity.action}</p>
                      <p className="text-xs text-indigo-600 font-medium">{activity.gameType}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`text-lg font-bold ${activity.coins.startsWith('+') ? 'text-green-600' : 'text-red-500'}`}>
                      {activity.coins}
                    </p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Weapon Stats */}
          <div className="lg:w-3/3 mt-6 bg-white card p-6 rounded-2xl shadow-xl">
            <h2 className="text-xl font-bold flex items-center text-gray-800 mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>
              Popular Weapons
            </h2>
            
            <div className="space-y-4">
              {weaponStats.map((weapon, index) => (
                <div key={index} className="p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl hover:shadow-lg transition-all duration-300">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <div className={`w-4 h-4 rounded-full ${weapon.color} mr-3`}></div>
                      <span className="font-semibold text-gray-800">{weapon.weapon}</span>
                    </div>
                    <span className="text-sm font-bold text-indigo-600">{weapon.accuracy}%</span>
                  </div>
                  
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                    <div 
                      className={`h-2 rounded-full ${weapon.color}`}
                      style={{ width: `${weapon.usage}%` }}
                    ></div>
                  </div>
                  
                  <div className="flex justify-between text-xs text-gray-600">
                    <span>Usage: {weapon.usage}%</span>
                    <span>Accuracy: {weapon.accuracy}%</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Stats */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Stats</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <p className="text-2xl font-bold text-blue-600">{gameStats.activeGames}</p>
                  <p className="text-xs text-gray-600">Active Games</p>
                </div>
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <p className="text-2xl font-bold text-green-600">{gameStats.activeBirds}</p>
                  <p className="text-xs text-gray-600">Birds in Game</p>
                </div>
              </div>
            </div>

            {/* Today's Top Player */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">🏆 Top Player Today</h3>
              <div className="flex items-center p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl border-l-4 border-yellow-500">
                <img 
                  src="https://i.pravatar.cc/50?img=1" 
                  alt="Top Player" 
                  className="rounded-full h-12 w-12 mr-4 border-2 border-yellow-500"
                />
                <div>
                  <p className="font-bold text-gray-800">EagleEye42</p>
                  <p className="text-sm text-gray-600">Score: {gameStats.topPlayerScore.toLocaleString()}</p>
                  <p className="text-xs text-yellow-600 font-medium">🥇 Tournament Champion</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Stats */}
        <div className="mt-8 bg-white rounded-2xl shadow-xl p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">{(gameStats.totalCoinsWon / gameStats.totalCoinsSpent * 100).toFixed(1)}%</div>
              <div className="text-sm text-gray-600">Coins Won Ratio</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">72%</div>
              <div className="text-sm text-gray-600">Average Accuracy</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600">{Math.round(gameStats.totalShotsFiredToday / gameStats.totalActivePlayers)}</div>
              <div className="text-sm text-gray-600">Shots per Player</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-orange-600">{Math.round(gameStats.adminCommissionEarned / gameStats.totalCoinsSpent * 100)}%</div>
              <div className="text-sm text-gray-600">Commission Rate</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BirdShootingDashboard;

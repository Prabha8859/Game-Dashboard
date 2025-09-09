import React, { useState, useEffect, useRef } from 'react';
import { 
  Users, UserCheck, Mail, DollarSign, Wallet, TrendingUp, TrendingDown, 
  Clock, X, Percent, ChevronRight, MoreHorizontal, Gamepad, Trophy, 
  Activity, Plus, Shield, Settings, Eye, Play, UserX, CalendarDays,
  Search, Filter, Award, Crown, Crosshair
} from 'lucide-react';
import { 
  LineChart, Line, XAxis, YAxis, ResponsiveContainer, AreaChart, Area, 
  BarChart, Bar, PieChart, Pie, Cell, ComposedChart
} from 'recharts';

const GamingDashboard = ({ isDarkMode = false }) => {
  const [dynamicStats, setDynamicStats] = useState({
    totalUsers: 45867,
    totalGamesPlayed: 128716,
    totalRevenue: 2847356,
    totalWinners: 8952,
    activeGames: 12,
    dailyTraffic: 2836
  });

  const [dateRange, setDateRange] = useState({
    from: '2025-08-10',
    to: '2025-09-09'
  });
  
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showAllGames, setShowAllGames] = useState(false);
  const datePickerRef = useRef(null);

  // Games Data
  const gamesData = [
    {
      id: 1,
      name: 'Ludo',
      icon: '🎲',
      totalPlays: 45820,
      revenue: 856400,
      activeUsers: 1247,
      winners: 2856,
      lastPlayed: '2 mins ago',
      trend: '+15.2%',
      trendType: 'positive',
      status: 'active'
    },
    {
      id: 2,
      name: 'Jackpot',
      icon: '🎰',
      totalPlays: 28450,
      revenue: 745200,
      activeUsers: 892,
      winners: 1247,
      lastPlayed: '5 mins ago',
      trend: '+8.7%',
      trendType: 'positive',
      status: 'active'
    },
    {
      id: 3,
      name: 'Lottery',
      icon: '🎫',
      totalPlays: 18960,
      revenue: 425800,
      activeUsers: 654,
      winners: 856,
      lastPlayed: '1 min ago',
      trend: '-2.3%',
      trendType: 'negative',
      status: 'active'
    },
    {
      id: 4,
      name: 'Teen Patti',
      icon: '🃏',
      totalPlays: 35740,
      revenue: 820600,
      activeUsers: 1124,
      winners: 1987,
      lastPlayed: '3 mins ago',
      trend: '+22.1%',
      trendType: 'positive',
      status: 'active'
    },
    {
      id: 5,
      name: 'Mines',
      icon: '💣',
      totalPlays: 22380,
      revenue: 567800,
      activeUsers: 743,
      winners: 1124,
      lastPlayed: '7 mins ago',
      trend: '+5.9%',
      trendType: 'positive',
      status: 'maintenance'
    },
    {
      id: 6,
      name: 'Bird Shooting',
      icon: '🎯',
      totalPlays: 41200,
      revenue: 1024500,
      activeUsers: 1456,
      winners: 2145,
      lastPlayed: '1 min ago',
      trend: '+18.4%',
      trendType: 'positive',
      status: 'active'
    }
  ];

  // Recent Winners Data
  const recentWinners = [
    { id: 1, user: 'Rahul Kumar', game: 'Ludo', amount: 5000, time: '2 mins ago' },
    { id: 2, user: 'Priya Sharma', game: 'Teen Patti', amount: 7500, time: '15 mins ago' },
    { id: 3, user: 'Amit Singh', game: 'Bird Shooting', amount: 12000, time: '30 mins ago' },
    { id: 4, user: 'Sneha Patel', game: 'Jackpot', amount: 3000, time: '1 hour ago' },
    { id: 5, user: 'Vikram Joshi', game: 'Ludo', amount: 4500, time: '2 hours ago' }
  ];

  // Chart Data
  const dailyGamePlaysData = [
    { date: '01', ludo: 1200, jackpot: 800, lottery: 600, teenPatti: 900, mines: 500, birdShooting: 1100 },
    { date: '05', ludo: 1400, jackpot: 900, lottery: 700, teenPatti: 1100, mines: 600, birdShooting: 1300 },
    { date: '10', ludo: 1100, jackpot: 750, lottery: 550, teenPatti: 850, mines: 480, birdShooting: 1000 },
    { date: '15', ludo: 1600, jackpot: 1200, lottery: 800, teenPatti: 1300, mines: 700, birdShooting: 1500 },
    { date: '20', ludo: 1800, jackpot: 1100, lottery: 750, teenPatti: 1200, mines: 650, birdShooting: 1400 },
    { date: '25', ludo: 1500, jackpot: 950, lottery: 650, teenPatti: 1000, mines: 580, birdShooting: 1200 },
    { date: '30', ludo: 2000, jackpot: 1400, lottery: 900, teenPatti: 1500, mines: 800, birdShooting: 1800 }
  ];

  const revenueByGameData = [
    { name: 'Bird Shooting', value: 1024500, color: '#8b5cf6' },
    { name: 'Ludo', value: 856400, color: '#3b82f6' },
    { name: 'Teen Patti', value: 820600, color: '#10b981' },
    { name: 'Jackpot', value: 745200, color: '#f59e0b' },
    { name: 'Mines', value: 567800, color: '#ef4444' },
    { name: 'Lottery', value: 425800, color: '#ec4899' }
  ];

  const userGrowthData = [
    { month: 'Jan', users: 35000, newUsers: 2400 },
    { month: 'Feb', users: 37400, newUsers: 2800 },
    { month: 'Mar', users: 40200, newUsers: 2200 },
    { month: 'Apr', users: 42400, newUsers: 3200 },
    { month: 'May', users: 45600, newUsers: 2800 },
    { month: 'Jun', users: 48400, newUsers: 3500 },
    { month: 'Jul', users: 51900, newUsers: 2900 },
    { month: 'Aug', users: 54800, newUsers: 3800 }
  ];

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setDynamicStats(prev => ({
        totalUsers: prev.totalUsers + Math.floor(Math.random() * 5),
        totalGamesPlayed: prev.totalGamesPlayed + Math.floor(Math.random() * 20),
        totalRevenue: prev.totalRevenue + Math.floor(Math.random() * 1000),
        totalWinners: prev.totalWinners + Math.floor(Math.random() * 3),
        activeGames: prev.activeGames,
        dailyTraffic: prev.dailyTraffic + Math.floor(Math.random() * 10) - 5
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Handle click outside for date picker
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (datePickerRef.current && !datePickerRef.current.contains(event.target)) {
        setShowDatePicker(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle date range change
  const handleDateRangeChange = (newDateRange) => {
    setDateRange(newDateRange);
    setShowDatePicker(false);
    console.log('Date range changed:', newDateRange);
  };

  // Summary Cards Data
  const summaryCards = [
    {
      title: 'Total Users',
      value: dynamicStats.totalUsers.toLocaleString(),
      change: '+12.5%',
      changeType: 'positive',
      icon: Users,
      color: 'blue'
    },
    {
      title: 'Total Games Played',
      value: dynamicStats.totalGamesPlayed.toLocaleString(),
      change: '+8.7%',
      changeType: 'positive',
      icon: Gamepad,
      color: 'purple'
    },
    {
      title: 'Total Revenue',
      value: `₹${(dynamicStats.totalRevenue / 100000).toFixed(1)}L`,
      change: '+15.3%',
      changeType: 'positive',
      icon: DollarSign,
      color: 'green'
    },
    {
      title: 'Total Winners',
      value: dynamicStats.totalWinners.toLocaleString(),
      change: '+6.2%',
      changeType: 'positive',
      icon: Trophy,
      color: 'yellow'
    },
    {
      title: 'Active Games',
      value: dynamicStats.activeGames.toString(),
      change: '0%',
      changeType: 'neutral',
      icon: Play,
      color: 'indigo'
    },
    {
      title: 'Daily Traffic',
      value: dynamicStats.dailyTraffic.toLocaleString(),
      change: '+4.8%',
      changeType: 'positive',
      icon: Activity,
      color: 'red'
    }
  ];

  const SummaryCard = ({ title, value, change, changeType, icon: Icon, color }, index) => {
    const colorClasses = {
      blue: { bg: 'bg-blue-500', text: 'text-blue-500' },
      purple: { bg: 'bg-purple-500', text: 'text-purple-500' },
      green: { bg: 'bg-green-500', text: 'text-green-500' },
      yellow: { bg: 'bg-yellow-500', text: 'text-yellow-500' },
      indigo: { bg: 'bg-indigo-500', text: 'text-indigo-500' },
      red: { bg: 'bg-red-500', text: 'text-red-500' }
    };

    return (
      <div 
        className="bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden transform hover:scale-105 transition-all duration-300 hover:shadow-2xl cursor-pointer group"
        data-aos="fade-up"
        data-aos-delay={index * 100}
        data-aos-duration="800"
        data-aos-easing="ease-out"
      >
        <div className={`h-1 ${colorClasses[color].bg} group-hover:h-2 transition-all duration-300`}></div>
        <div className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div className={`p-2 rounded-lg ${colorClasses[color].bg} transition-transform duration-300 group-hover:scale-110 shadow-md`}>
              <Icon className="w-4 h-4 text-white" />
            </div>
            <div className="flex items-center space-x-1">
              {changeType === 'positive' && <TrendingUp className="w-3 h-3 text-green-500 animate-pulse" />}
              {changeType === 'negative' && <TrendingDown className="w-3 h-3 text-red-500 animate-pulse" />}
              <span className={`text-xs font-medium transition-all duration-300 ${
                changeType === 'positive' ? 'text-green-500' : 
                changeType === 'negative' ? 'text-red-500' : 'text-gray-500'
              } group-hover:font-bold`}>
                {change}
              </span>
            </div>
          </div>
          <div>
            <h3 className="text-xs font-medium text-gray-600 mb-1 group-hover:text-gray-700 transition-colors duration-300">
              {title}
            </h3>
            <p className="text-xl font-bold text-gray-900 group-hover:text-2xl transition-all duration-300">
              {value}
            </p>
          </div>
        </div>
      </div>
    );
  };

  const GameCard = ({ game }, index) => (
    <div 
      className={`rounded-2xl shadow-lg border transition-all duration-500 hover:scale-105 hover:shadow-2xl cursor-pointer group overflow-hidden relative bg-white border-gray-200 hover:border-blue-300`}
      data-aos="fade-up"
      data-aos-delay={index * 100}
      data-aos-duration="800"
      data-aos-easing="ease-out"
    >
      <div className={`h-1 ${game.status === 'active' ? 'bg-green-500' : 'bg-orange-500'} group-hover:h-2 transition-all duration-300`}></div>
      <div className="relative z-10 p-4">
        <div className={`absolute top-2 right-2 px-2 py-0.5 rounded-full text-xs font-medium ${
          game.status === 'active' 
            ? (isDarkMode ? 'bg-green-900/30 text-green-400' : 'bg-green-100 text-green-700')
            : (isDarkMode ? 'bg-orange-900/30 text-orange-400' : 'bg-orange-100 text-orange-700')
        }`}>
          {game.status}
        </div>
        <div className="flex items-center space-x-3 mb-4">
          <div className="text-2xl group-hover:scale-110 transition-transform duration-300">
            {game.icon}
          </div>
          <div>
            <h3 className={`text-lg font-bold ${isDarkMode ? 'text-white group-hover:text-blue-400' : 'text-gray-900 group-hover:text-blue-600'}`}>
              {game.name}
            </h3>
            <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              Last played: {game.lastPlayed}
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3 mb-3">
          <div>
            <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Total Plays</p>
            <p className={`text-sm font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              {game.totalPlays.toLocaleString()}
            </p>
          </div>
          <div>
            <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Revenue</p>
            <p className="text-sm font-bold text-green-500">
              ₹{(game.revenue / 1000).toFixed(0)}K
            </p>
          </div>
          <div>
            <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Active Users</p>
            <p className="text-sm font-bold text-blue-500">
              {game.activeUsers.toLocaleString()}
            </p>
          </div>
          <div>
            <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Winners</p>
            <p className="text-sm font-bold text-yellow-500">
              {game.winners.toLocaleString()}
            </p>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1">
            {game.trendType === 'positive' ? (
              <TrendingUp className="w-3 h-3 text-green-500" />
            ) : (
              <TrendingDown className="w-3 h-3 text-red-500" />
            )}
            <span className={`text-xs font-medium ${
              game.trendType === 'positive' ? 'text-green-500' : 'text-red-500'
            }`}>
              {game.trend}
            </span>
          </div>
          <ChevronRight className={`w-3 h-3 transition-transform duration-300 group-hover:translate-x-1 ${
            isDarkMode ? 'text-gray-400' : 'text-gray-500'
          }`} />
        </div>
      </div>
    </div>
  );

  const QuickActionButton = ({ icon: Icon, label, color, onClick }, index) => (
    <button
      onClick={onClick}
      className={`flex items-center space-x-2 p-3 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg bg-white border border-gray-200 hover:border-${color}-300 text-gray-900 cursor-pointer group`}
      data-aos="fade-up"
      data-aos-delay={index * 100}
      data-aos-duration="800"
      data-aos-easing="ease-out"
    >
      <div className={`p-1.5 rounded-lg bg-${color}-500 text-white group-hover:scale-110 transition-transform duration-300`}>
        <Icon className="w-3 h-3" />
      </div>
      <span className="text-sm font-medium">{label}</span>
    </button>
  );

  // Date Picker Dropdown
  const DatePickerDropdown = () => (
    <div 
      ref={datePickerRef} 
      className="absolute top-full right-0 mt-2 p-4 rounded-2xl shadow-2xl bg-white border border-gray-200 w-80 z-50"
      data-aos="fade-down"
      data-aos-duration="600"
      data-aos-easing="ease-out"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-gray-900">Select Date Range</h3>
        <button
          onClick={() => setShowDatePicker(false)}
          className="p-1 rounded-lg hover:bg-gray-100"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
      <div className="space-y-3">
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">From Date</label>
          <input
            type="date"
            value={dateRange.from}
            onChange={(e) => setDateRange(prev => ({ ...prev, from: e.target.value }))}
            className="w-full p-2 rounded-lg border border-gray-300 bg-white"
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">To Date</label>
          <input
            type="date"
            value={dateRange.to}
            onChange={(e) => setDateRange(prev => ({ ...prev, to: e.target.value }))}
            className="w-full p-2 rounded-lg border border-gray-300 bg-white"
          />
        </div>
      </div>
      <div className="flex space-x-2 mt-4">
        <button
          onClick={() => setShowDatePicker(false)}
          className="flex-1 py-2 px-3 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 text-sm"
        >
          Cancel
        </button>
        <button
          onClick={() => handleDateRangeChange(dateRange)}
          className="flex-1 py-2 px-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 text-sm"
        >
          Apply
        </button>
      </div>
    </div>
  );

  // All Games Modal
  const AllGamesModal = () => (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      data-aos="zoom-in"
      data-aos-duration="600"
      data-aos-easing="ease-out"
    >
      <div className={`p-6 rounded-2xl shadow-2xl ${isDarkMode ? 'bg-gray-800' : 'bg-white'} w-4/5 max-w-6xl max-h-[90vh] overflow-y-auto`}>
        <div className="flex items-center justify-between mb-6">
          <h3 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            All Games Management
          </h3>
          <button
            onClick={() => setShowAllGames(false)}
            className={`p-2 rounded-lg ${isDarkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="flex items-center space-x-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search games..."
              className={`w-full pl-10 pr-4 py-2 rounded-lg border ${
                isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300'
              } text-sm`}
            />
          </div>
          <button className={`p-2 rounded-lg border ${
            isDarkMode ? 'border-gray-600 text-gray-400 hover:bg-gray-700' : 'border-gray-300 text-gray-700 hover:bg-gray-50'
          }`}>
            <Filter className="w-4 h-4" />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {gamesData.map((game, index) => (
            <div 
              key={game.id} 
              className={`p-4 rounded-xl border ${isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-gray-50 border-gray-200'}`}
              data-aos="fade-up"
              data-aos-delay={index * 100}
              data-aos-duration="800"
              data-aos-easing="ease-out"
            >
              <GameCard game={game} index={index} />
              <div className="flex space-x-2 mt-3">
                <button className="flex-1 py-2 px-3 bg-blue-500 text-white rounded-lg text-xs hover:bg-blue-600">
                  Edit
                </button>
                <button className="flex-1 py-2 px-3 bg-green-500 text-white rounded-lg text-xs hover:bg-green-600">
                  Stats
                </button>
                <button className={`flex-1 py-2 px-3 rounded-lg text-xs ${
                  game.status === 'active' 
                    ? 'bg-red-500 hover:bg-red-600 text-white' 
                    : 'bg-green-500 hover:bg-green-600 text-white'
                }`}>
                  {game.status === 'active' ? 'Disable' : 'Enable'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className={`min-h-screen p-6 transition-all duration-300 ${
      isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'
    }`}>
      {/* Modals */}
      {showAllGames && <AllGamesModal />}
      
      {/* Header Section */}
      <div 
        className="flex items-center justify-between mb-8"
        data-aos="fade-down"
        data-aos-duration="800"
        data-aos-easing="ease-out"
      >
        <div>
          <h1 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Gaming Dashboard
          </h1>
          <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            Monitor your gaming platform performance and analytics
          </p>
        </div>
        <div className="relative">
          <button
            onClick={() => setShowDatePicker(!showDatePicker)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-colors ${
              isDarkMode ? 'bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700' : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
          >
            <CalendarDays className="w-4 h-4" />
            <span className="text-sm">
              {new Date(dateRange.from).toLocaleDateString()} - {new Date(dateRange.to).toLocaleDateString()}
            </span>
          </button>
          {showDatePicker && <DatePickerDropdown />}
        </div>
      </div>

      {/* Summary Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
        {summaryCards.map((card, index) => (
          <SummaryCard key={index} {...card} index={index} />
        ))}
      </div>

      {/* Per Game Insights Section */}
      <div className="mb-8" data-aos="fade-up" data-aos-duration="800" data-aos-easing="ease-out">
        <div className="flex items-center justify-between mb-6">
          <h2 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Per Game Insights
          </h2>
          <button
            onClick={() => setShowAllGames(true)}
            className={`px-4 py-2 rounded-lg transition-colors ${
              isDarkMode ? 'bg-gray-800 hover:bg-gray-700 text-gray-300' : 'bg-white hover:bg-gray-50 text-gray-700'
            } border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'} text-sm`}
          >
            View All Games
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {gamesData.map((game, index) => (
            <GameCard key={game.id} game={game} index={index} />
          ))}
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Daily Game Plays Trend */}
        <div 
          className={`p-6 rounded-2xl shadow-lg border ${
            isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          }`}
          data-aos="zoom-in"
          data-aos-duration="800"
          data-aos-easing="ease-out"
        >
          <h3 className={`text-lg font-semibold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Daily Game Plays Trend (Last 30 Days)
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={dailyGamePlaysData}>
                <XAxis 
                  dataKey="date" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: isDarkMode ? '#9ca3af' : '#6b7280' }}
                />
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: isDarkMode ? '#9ca3af' : '#6b7280' }}
                />
                <Line type="monotone" dataKey="ludo" stroke="#3b82f6" strokeWidth={2} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="jackpot" stroke="#f59e0b" strokeWidth={2} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="lottery" stroke="#ec4899" strokeWidth={2} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="teenPatti" stroke="#10b981" strokeWidth={2} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="mines" stroke="#ef4444" strokeWidth={2} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="birdShooting" stroke="#8b5cf6" strokeWidth={2} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-wrap gap-4 mt-4">
            {[
              { name: 'Ludo', color: '#3b82f6' },
              { name: 'Jackpot', color: '#f59e0b' },
              { name: 'Lottery', color: '#ec4899' },
              { name: 'Teen Patti', color: '#10b981' },
              { name: 'Mines', color: '#ef4444' },
              { name: 'Bird Shooting', color: '#8b5cf6' }
            ].map((item, index) => (
              <div key={item.name} className="flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }}></div>
                <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {item.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Revenue by Game (Pie Chart) */}
        <div 
          className={`p-6 rounded-2xl shadow-lg border ${
            isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          }`}
          data-aos="zoom-in"
          data-aos-delay="200"
          data-aos-duration="800"
          data-aos-easing="ease-out"
        >
          <h3 className={`text-lg font-semibold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Revenue Distribution by Game
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={revenueByGameData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {revenueByGameData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-2">
            {revenueByGameData.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }}></div>
                  <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {item.name}
                  </span>
                </div>
                <span className={`text-xs font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  ₹{(item.value / 1000).toFixed(0)}K
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* User Growth Chart */}
        <div 
          className={`p-6 rounded-2xl shadow-lg border ${
            isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          }`}
          data-aos="zoom-in"
          data-aos-delay="400"
          data-aos-duration="800"
          data-aos-easing="ease-out"
        >
          <h3 className={`text-lg font-semibold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            User Growth Over Time
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={userGrowthData}>
                <XAxis 
                  dataKey="month" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: isDarkMode ? '#9ca3af' : '#6b7280' }}
                />
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: isDarkMode ? '#9ca3af' : '#6b7280' }}
                />
                <Area
                  type="monotone"
                  dataKey="users"
                  fill="url(#userGrowthGradient)"
                  stroke="#3b82f6"
                  strokeWidth={2}
                />
                <Bar dataKey="newUsers" fill="#10b981" radius={[4, 4, 0, 0]} />
                <defs>
                  <linearGradient id="userGrowthGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
              </ComposedChart>
            </ResponsiveContainer>
          </div>
          <div className="flex items-center space-x-6 mt-4">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Total Users
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                New Users
              </span>
            </div>
          </div>
        </div>

        {/* Revenue Trends */}
        <div 
          className={`p-6 rounded-2xl shadow-lg border ${
            isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          }`}
          data-aos="zoom-in"
          data-aos-delay="600"
          data-aos-duration="800"
          data-aos-easing="ease-out"
        >
          <h3 className={`text-lg font-semibold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Monthly Revenue Trends
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={userGrowthData.map(item => ({ 
                ...item, 
                revenue: item.users * 0.65,
                profit: item.users * 0.25 
              }))}>
                <defs>
                  <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="profitGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis 
                  dataKey="month" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: isDarkMode ? '#9ca3af' : '#6b7280' }}
                />
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: isDarkMode ? '#9ca3af' : '#6b7280' }}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stackId="1"
                  stroke="#10b981"
                  fill="url(#revenueGradient)"
                />
                <Area
                  type="monotone"
                  dataKey="profit"
                  stackId="2"
                  stroke="#f59e0b"
                  fill="url(#profitGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="flex items-center space-x-6 mt-4">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Revenue
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              <span className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Profit
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity & User Stats Section */}
      <div className=" grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* Recent Activity Table */}
        <div 
          className={`lg:col-span-2 p-6 rounded-2xl shadow-lg border mb-8 ${
            isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          }`}
          data-aos="fade-left"
          data-aos-duration="800"
          data-aos-easing="ease-out"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Recent Activity / Logs
            </h3>
            <button className={`px-4 py-2 rounded-lg text-sm transition-colors ${
              isDarkMode ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
            }`}>
              View All
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className={`border-b ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                  <th className={`text-left py-3 px-4 font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Date & Time
                  </th>
                  <th className={`text-left py-3 px-4 font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    User
                  </th>
                  <th className={`text-left py-3 px-4 font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Action
                  </th>
                  <th className={`text-left py-3 px-4 font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Game
                  </th>
                  <th className={`text-left py-3 px-4 font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Result
                  </th>
                  <th className={`text-right py-3 px-4 font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody>
                {recentActivities.map((activity, index) => (
                  <tr 
                    key={activity.id}
                    className={`border-b transition-colors hover:bg-opacity-50 ${
                      isDarkMode ? 'border-gray-700 hover:bg-gray-700' : 'border-gray-100 hover:bg-gray-50'
                    }`}
                    data-aos="fade-up"
                    data-aos-delay={index * 50}
                    data-aos-duration="800"
                    data-aos-easing="ease-out"
                  >
                    <td className={`py-3 px-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-900'}`}>
                      <div className="text-sm">
                        <div>{activity.date}</div>
                        <div className={`text-xs ${isDarkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                          {activity.time}
                        </div>
                      </div>
                    </td>
                    <td className={`py-3 px-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-900'}`}>
                      <div className="font-medium">{activity.user}</div>
                    </td>
                    <td className={`py-3 px-4`}>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        activity.action === 'Won' 
                          ? (isDarkMode ? 'bg-green-900/30 text-green-400' : 'bg-green-100 text-green-700')
                          : (isDarkMode ? 'bg-blue-900/30 text-blue-400' : 'bg-blue-100 text-blue-700')
                      }`}>
                        {activity.action}
                      </span>
                    </td>
                    <td className={`py-3 px-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-900'}`}>
                      {activity.game}
                    </td>
                    <td className={`py-3 px-4`}>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        activity.result === 'Win' 
                          ? (isDarkMode ? 'bg-green-900/30 text-green-400' : 'bg-green-100 text-green-700')
                          : (isDarkMode ? 'bg-red-900/30 text-red-400' : 'bg-red-100 text-red-700')
                      }`}>
                        {activity.result}
                      </span>
                    </td>
                    <td className={`py-3 px-4 text-right font-medium ${
                      activity.amount > 0 ? 'text-green-500' : 'text-red-500'
                    }`}>
                      {activity.amount > 0 ? '+' : ''}₹{Math.abs(activity.amount)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Winners Section */}
        <div 
          className={`p-6 rounded-2xl shadow-lg border ${
            isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          }`}
          data-aos="fade-right"
          data-aos-duration="800"
          data-aos-easing="ease-out"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Recent Winners
            </h3>
            <button className={`text-sm px-3 py-1 rounded-lg transition-colors ${
              isDarkMode ? 'text-gray-400 hover:text-white hover:bg-gray-700' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            }`}>
              View All
            </button>
          </div>
          <div className="space-y-4">
            {recentWinners.map((winner, index) => (
              <div
                key={winner.id}
                className={`p-4 rounded-xl border-l-4 border-yellow-500 ${
                  isDarkMode ? 'bg-gray-700/50' : 'bg-gray-50'
                } transition-all duration-300 hover:shadow-md`}
                data-aos="fade-up"
                data-aos-delay={index * 100}
                data-aos-duration="800"
                data-aos-easing="ease-out"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-1 rounded-full bg-yellow-500">
                      <Crown className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        {winner.user} won in {winner.game}
                      </p>
                      <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        {winner.time}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-yellow-500">
                      ₹{winner.amount.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            {recentWinners.length === 0 && (
              <div 
                className={`text-center py-8 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}
                data-aos="fade-up"
                data-aos-duration="800"
                data-aos-easing="ease-out"
              >
                <Trophy className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>No recent winners</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Quick Actions & System Status Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Quick Actions */}
        <div 
          className={`p-6 rounded-2xl shadow-lg border ${
            isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          }`}
          data-aos="fade-up"
          data-aos-duration="800"
          data-aos-easing="ease-out"
        >
          <h3 className={`text-lg font-semibold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Quick Actions / Admin Tools
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { icon: Plus, label: 'Add New Game', color: 'green', onClick: () => console.log('Add new game') },
              { icon: Shield, label: 'Block Suspicious User', color: 'red', onClick: () => console.log('Block user') },
              { icon: Settings, label: 'Adjust Game Rules', color: 'blue', onClick: () => console.log('Adjust rules') },
              { icon: Eye, label: 'Monitor Live Games', color: 'purple', onClick: () => console.log('Monitor games') },
              { icon: Award, label: 'Manage Rewards', color: 'yellow', onClick: () => console.log('Manage rewards') },
              { icon: Crosshair, label: 'Set Daily Targets', color: 'indigo', onClick: () => console.log('Set targets') }
            ].map((action, index) => (
              <QuickActionButton key={index} {...action} index={index} />
            ))}
          </div>
        </div>

        {/* System Status */}
        <div 
          className={`p-6 rounded-2xl shadow-lg border ${
            isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
          }`}
          data-aos="fade-up"
          data-aos-delay="200"
          data-aos-duration="800"
          data-aos-easing="ease-out"
        >
          <h3 className={`text-lg font-semibold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            System Status
          </h3>
          <div className="space-y-3">
            {[
              { label: 'Server Status', status: 'Online', color: 'green' },
              { label: 'Payment Gateway', status: 'Active', color: 'green' },
              { label: 'Maintenance Mode', status: 'Inactive', color: 'gray' }
            ].map((item, index) => (
              <div 
                key={index} 
                className="flex items-center justify-between"
                data-aos="fade-up"
                data-aos-delay={index * 100}
                data-aos-duration="800"
                data-aos-easing="ease-out"
              >
                <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  {item.label}
                </span>
                <div className="flex items-center space-x-2">
                  <div className={`w-2 h-2 bg-${item.color}-500 rounded-full animate-pulse`}></div>
                  <span className={`text-xs text-${item.color}-500`}>{item.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Live Stats Footer */}
      <div 
        className={`p-6 rounded-2xl shadow-lg border ${
          isDarkMode ? 'bg-gradient-to-r from-gray-800 to-gray-900 border-gray-700' : 'bg-gradient-to-r from-white to-gray-50 border-gray-200'
        }`}
        data-aos="fade-up"
        data-aos-duration="800"
        data-aos-easing="ease-out"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {[
            { value: `${(dynamicStats.totalGamesPlayed / 1000).toFixed(0)}K`, label: 'Games Today', color: isDarkMode ? 'blue-400' : 'blue-600' },
            { value: `₹${(dynamicStats.totalRevenue / 100000).toFixed(1)}L`, label: 'Revenue Today', color: isDarkMode ? 'green-400' : 'green-600' },
            { value: dynamicStats.totalWinners, label: 'Winners Today', color: isDarkMode ? 'yellow-400' : 'yellow-600' },
            { value: Math.floor(dynamicStats.dailyTraffic * 0.8), label: 'Currently Playing', color: isDarkMode ? 'purple-400' : 'purple-600' },
            { value: '99.8%', label: 'Uptime', color: isDarkMode ? 'red-400' : 'red-600' },
            { value: `${Math.floor(Math.random() * 50) + 150}ms`, label: 'Avg Response', color: isDarkMode ? 'indigo-400' : 'indigo-600' }
          ].map((stat, index) => (
            <div 
              key={index} 
              className="text-center"
              data-aos="fade-up"
              data-aos-delay={index * 100}
              data-aos-duration="800"
              data-aos-easing="ease-out"
            >
              <div className={`text-xl font-bold ${isDarkMode ? `text-${stat.color}` : `text-${stat.color}`}`}>
                {stat.value}
              </div>
              <div className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Recent Activities Data
const recentActivities = [
  { id: 1, date: '09-09-2025', time: '14:32', user: 'Rahul Kumar', action: 'Won', game: 'Ludo', result: 'Win', amount: 500 },
  { id: 2, date: '09-09-2025', time: '14:28', user: 'Priya Sharma', action: 'Played', game: 'Jackpot', result: 'Loss', amount: -200 },
  { id: 3, date: '09-09-2025', time: '14:25', user: 'Amit Singh', action: 'Won', game: 'Teen Patti', result: 'Win', amount: 750 },
  { id: 4, date: '09-09-2025', time: '14:20', user: 'Sneha Patel', action: 'Played', game: 'Lottery', result: 'Loss', amount: -100 },
  { id: 5, date: '09-09-2025', time: '14:15', user: 'Vikram Joshi', action: 'Won', game: 'Bird Shooting', result: 'Win', amount: 1200 },
  { id: 6, date: '09-09-2025', time: '14:10', user: 'Deepika Roy', action: 'Played', game: 'Mines', result: 'Loss', amount: -300 },
  { id: 7, date: '09-09-2025', time: '14:05', user: 'Arjun Mehta', action: 'Won', game: 'Ludo', result: 'Win', amount: 400 },
  { id: 8, date: '09-09-2025', time: '14:00', user: 'Kavya Reddy', action: 'Played', game: 'Jackpot', result: 'Loss', amount: -150 }
];

export default GamingDashboard;
import React, { useState, useEffect } from 'react';
import { Users, UserCheck, Mail, DollarSign, Wallet, TrendingUp, TrendingDown, Clock, X, Percent, ChevronRight, MoreHorizontal } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, AreaChart, Area, BarChart, Bar } from 'recharts';

const Dashboard = ({ isDarkMode = false }) => {
  const [dynamicStats, setDynamicStats] = useState({
    totalUsers: 34945,
    activeUsers: 37802,
    emailUnverified: 34,
    totalDeposited: 34945
  });

  // Sample user data for the new user section
  const usersData = [
    { id: 1, name: 'Alex Johnson', role: 'Premium User', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face' },
    { id: 2, name: 'Sarah Chen', role: 'Gold Member', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b29c?w=150&h=150&fit=crop&crop=face' },
    { id: 3, name: 'Michael Brown', role: 'Standard User', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face' },
    { id: 4, name: 'Emma Davis', role: 'VIP Member', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face' },
    { id: 5, name: 'James Wilson', role: 'Premium User', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face' },
    { id: 6, name: 'Lisa Garcia', role: 'Gold Member', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face' },
    { id: 7, name: 'David Kim', role: 'Standard User', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=face' },
    { id: 8, name: 'Rachel Adams', role: 'VIP Member', avatar: 'https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=150&h=150&fit=crop&crop=face' }
  ];

  // Simulate dynamic data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setDynamicStats(prev => ({
        totalUsers: prev.totalUsers + Math.floor(Math.random() * 10) - 5,
        activeUsers: prev.activeUsers + Math.floor(Math.random() * 15) - 7,
        emailUnverified: Math.max(0, prev.emailUnverified + Math.floor(Math.random() * 3) - 1),
        totalDeposited: prev.totalDeposited + Math.floor(Math.random() * 100) - 50
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Sample data for charts
  const userGrowthData = [
    { month: 'Jan', users: 2000 },
    { month: 'Feb', users: 2800 },
    { month: 'Mar', users: 2200 },
    { month: 'Apr', users: 3200 },
    { month: 'May', users: 2800 },
    { month: 'Jun', users: 3500 },
    { month: 'Jul', users: 2900 },
    { month: 'Aug', users: 3800 },
    { month: 'Sep', users: 3200 },
    { month: 'Oct', users: 4200 },
    { month: 'Nov', users: 3600 },
    { month: 'Dec', users: 2800 }
  ];

  const depositWithdrawalData = [
    { month: 'Jan', deposits: 1800, withdrawals: 1600 },
    { month: 'Feb', deposits: 2900, withdrawals: 2300 },
    { month: 'Mar', deposits: 1900, withdrawals: 1800 },
    { month: 'Apr', deposits: 3200, withdrawals: 2700 },
    { month: 'May', deposits: 1400, withdrawals: 1200 },
    { month: 'Jun', deposits: 2100, withdrawals: 1900 },
    { month: 'Jul', deposits: 2800, withdrawals: 2400 }
  ];

  const transactionData = [
    { month: 'Jan', amount: 2400 },
    { month: 'Feb', amount: 3200 },
    { month: 'Mar', amount: 1800 },
    { month: 'Apr', amount: 2800 },
    { month: 'May', amount: 4200 },
    { month: 'Jun', amount: 3600 },
    { month: 'Jul', amount: 2200 },
    { month: 'Aug', amount: 3100 }
  ];

  // Dynamic Stats Cards Data
  const statsCards = [
    {
      title: 'Total Users',
      value: dynamicStats.totalUsers.toLocaleString(),
      change: '+1.56%',
      changeType: 'positive',
      icon: Users,
      iconBg: 'bg-blue-500',
      bgGradient: 'from-blue-50 to-blue-100',
      chartColor: '#3b82f6',
      darkBgGradient: 'from-blue-900/20 to-blue-800/20'
    },
    {
      title: 'Active Users',
      value: dynamicStats.activeUsers.toLocaleString(),
      change: '+1.56%',
      changeType: 'negative',
      icon: UserCheck,
      iconBg: 'bg-red-500',
      bgGradient: 'from-red-50 to-red-100',
      chartColor: '#ef4444',
      darkBgGradient: 'from-red-900/20 to-red-800/20'
    },
    {
      title: 'Email Unverified Users',
      value: dynamicStats.emailUnverified.toString(),
      change: '0.00%',
      changeType: 'neutral',
      icon: Mail,
      iconBg: 'bg-gray-400',
      bgGradient: 'from-gray-50 to-gray-100',
      chartColor: '#6b7280',
      darkBgGradient: 'from-gray-700/20 to-gray-600/20'
    },
    {
      title: 'Total Amount Deposited',
      value: dynamicStats.totalDeposited.toLocaleString(),
      change: '+1.56%',
      changeType: 'positive',
      icon: DollarSign,
      iconBg: 'bg-green-500',
      bgGradient: 'from-green-50 to-green-100',
      chartColor: '#10b981',
      darkBgGradient: 'from-green-900/20 to-green-800/20'
    }
  ];

  // Deposit Cards Data
  const depositCards = [
    {
      title: 'Total Deposited',
      value: '$1,494,154.00',
      icon: DollarSign,
      iconBg: 'bg-green-500'
    },
    {
      title: 'Pending Deposits',
      value: '819',
      icon: Clock,
      iconBg: 'bg-orange-500'
    },
    {
      title: 'Rejected Deposits',
      value: '0',
      icon: X,
      iconBg: 'bg-red-500'
    },
    {
      title: 'Deposited Charge',
      value: '$16,353.78',
      icon: Percent,
      iconBg: 'bg-purple-500'
    }
  ];

  // Withdrawal Cards Data
  const withdrawalCards = [
    {
      title: 'Total Withdrawn',
      value: '$894,210.00',
      icon: Wallet,
      iconBg: 'bg-green-500'
    },
    {
      title: 'Pending Withdrawals',
      value: '412',
      icon: Clock,
      iconBg: 'bg-orange-500'
    },
    {
      title: 'Rejected Withdrawals',
      value: '3',
      icon: X,
      iconBg: 'bg-red-500'
    },
    {
      title: 'Withdrawal Charge',
      value: '$6,215.60',
      icon: Percent,
      iconBg: 'bg-purple-500'
    }
  ];

  const StatCard = ({ title, value, change, changeType, icon: Icon, iconBg, bgGradient, darkBgGradient, chartColor }) => (
    <div className={`relative p-6 rounded-2xl shadow-lg transition-all duration-500 transform hover:scale-105 hover:shadow-2xl cursor-pointer bg-gradient-to-br ${
      isDarkMode ? `${darkBgGradient} border border-gray-700 hover:border-gray-600` : `${bgGradient} border border-white hover:border-gray-200`
    } group overflow-hidden`}>
      {/* Animated background overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className={`p-3 rounded-xl ${iconBg} transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110`}>
            <Icon className="w-6 h-6 text-white" />
          </div>
          <div className="flex items-center space-x-1">
            {changeType === 'positive' && <TrendingUp className="w-4 h-4 text-green-500 animate-pulse" />}
            {changeType === 'negative' && <TrendingDown className="w-4 h-4 text-red-500 animate-pulse" />}
            <span className={`text-sm font-medium transition-all duration-300 ${
              changeType === 'positive' ? 'text-green-500' : 
              changeType === 'negative' ? 'text-red-500' : 
              isDarkMode ? 'text-gray-400' : 'text-gray-500'
            } group-hover:font-bold`}>
              {change}
            </span>
          </div>
        </div>
        
        <div className="mb-4">
          <h3 className={`text-sm font-medium mb-1 transition-colors duration-300 ${
            isDarkMode ? 'text-gray-400 group-hover:text-gray-300' : 'text-gray-600 group-hover:text-gray-700'
          }`}>
            {title}
          </h3>
          <p className={`text-2xl font-bold transition-all duration-300 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          } group-hover:text-3xl`}>
            {value}
          </p>
        </div>

        <div className="h-12 opacity-80 group-hover:opacity-100 transition-opacity duration-300">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={userGrowthData.slice(-7)}>
              <defs>
                <linearGradient id={`gradient-${title}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={chartColor} stopOpacity={0.3}/>
                  <stop offset="95%" stopColor={chartColor} stopOpacity={0}/>
                </linearGradient>
              </defs>
              <Area
                type="monotone"
                dataKey="users"
                stroke={chartColor}
                strokeWidth={2}
                fill={`url(#gradient-${title})`}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );

  const InfoCard = ({ title, value, icon: Icon, iconBg }) => (
    <div className={`p-4 rounded-xl shadow-sm border transition-all duration-300 hover:shadow-lg cursor-pointer transform hover:-translate-y-1 hover:scale-105 group ${
      isDarkMode ? 'bg-gray-800 border-gray-700 hover:border-gray-600' : 'bg-white border-gray-200 hover:border-gray-300'
    } overflow-hidden relative`}>
      {/* Hover effect background */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      <div className="relative z-10 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className={`p-2 rounded-lg ${iconBg} transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110`}>
            <Icon className="w-4 h-4 text-white" />
          </div>
          <div>
            <p className={`text-lg font-bold transition-colors duration-300 ${
              isDarkMode ? 'text-white group-hover:text-blue-400' : 'text-gray-900 group-hover:text-blue-600'
            }`}>
              {value}
            </p>
            <p className={`text-xs transition-colors duration-300 ${
              isDarkMode ? 'text-gray-400 group-hover:text-gray-300' : 'text-gray-600 group-hover:text-gray-700'
            }`}>
              {title}
            </p>
          </div>
        </div>
        <ChevronRight className={`w-4 h-4 transition-all duration-300 group-hover:translate-x-1 ${
          isDarkMode ? 'text-gray-400 group-hover:text-blue-400' : 'text-gray-400 group-hover:text-blue-600'
        }`} />
      </div>
    </div>
  );

  const UserCard = ({ user }) => (
    <div className={`p-4 rounded-xl border transition-all duration-300 hover:shadow-lg cursor-pointer transform hover:-translate-y-1 group ${
      isDarkMode ? 'bg-gray-800 border-gray-700 hover:border-blue-500' : 'bg-white border-gray-200 hover:border-blue-300'
    } mb-4`}>
      <div className="flex items-center space-x-4">
        <div className="relative">
          <img 
            src={user.avatar} 
            alt={user.name}
            className="w-12 h-12 rounded-full object-cover ring-2 ring-offset-2 ring-blue-500 transition-transform duration-300 group-hover:scale-110"
          />
          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
        </div>
        <div className="flex-1 min-w-0">
          <h4 className={`font-medium truncate transition-colors duration-300 ${
            isDarkMode ? 'text-white group-hover:text-blue-400' : 'text-gray-900 group-hover:text-blue-600'
          }`}>
            {user.name}
          </h4>
          <p className={`text-sm truncate ${
            isDarkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            {user.role}
          </p>
        </div>
        <ChevronRight className={`w-4 h-4 transition-all duration-300 group-hover:translate-x-1 ${
          isDarkMode ? 'text-gray-400' : 'text-gray-400'
        }`} />
      </div>
    </div>
  );

  return (
    <div className={`min-h-full p-6 transition-all duration-300 ${
      isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'
    }`}>
      
      {/* Stats Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statsCards.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Total Users Section - Split Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        
        {/* Chart Section */}
        <div className={`p-6 rounded-2xl shadow-sm border ${
          isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        }`}>
          <div className="flex items-center justify-between mb-6">
            <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Total Users Growth
            </h3>
            <MoreHorizontal className={`w-5 h-5 cursor-pointer ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`} />
          </div>
          
          <div className="h-64 mb-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={userGrowthData}>
                <defs>
                  <linearGradient id="userGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis 
                  dataKey="month" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: isDarkMode ? '#9ca3af' : '#6b7280' }}
                />
                <YAxis hide />
                <Area
                  type="monotone"
                  dataKey="users"
                  stroke="#3b82f6"
                  strokeWidth={3}
                  fill="url(#userGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Users Section */}
        <div className={`p-6 rounded-2xl shadow-sm border ${
          isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        }`}>
          <div className="flex items-center justify-between mb-6">
            <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Recent Active Users
            </h3>
            <span className={`text-sm px-3 py-1 rounded-full ${
              isDarkMode ? 'bg-blue-900/30 text-blue-400' : 'bg-blue-100 text-blue-600'
            }`}>
              Online: {usersData.length}
            </span>
          </div>
          
          {/* Scrollable Users List */}
          <div className="h-80 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 pr-2">
            <div className="space-y-2">
              {[...usersData, ...usersData].map((user, index) => (
                <UserCard key={`${user.id}-${index}`} user={user} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Deposits Overview - Enhanced Dashboard Style */}
      <div className={`p-8 rounded-3xl shadow-xl border mb-8 relative overflow-hidden ${
        isDarkMode ? 'bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700' : 'bg-gradient-to-br from-white to-gray-50 border-gray-200'
      }`}>
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, #10b981 2px, transparent 2px), radial-gradient(circle at 75% 75%, #10b981 2px, transparent 2px)`,
            backgroundSize: '50px 50px'
          }}></div>
        </div>

        <div className="relative z-10">
          {/* Header Section */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl shadow-lg">
                <DollarSign className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Deposits Overview
                </h3>
                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Monitor all deposit transactions and statistics
                </p>
              </div>
            </div>
            <div className={`px-4 py-2 rounded-full text-sm font-medium ${
              isDarkMode ? 'bg-green-900/30 text-green-400' : 'bg-green-100 text-green-700'
            }`}>
              +12.5% this month
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {depositCards.map((card, index) => (
              <div key={index} className={`relative p-6 rounded-2xl border transition-all duration-500 hover:scale-105 cursor-pointer group overflow-hidden ${
                isDarkMode ? 'bg-gray-800/50 border-gray-700 hover:border-green-500/50' : 'bg-white/70 border-gray-200 hover:border-green-300'
              } backdrop-blur-sm`}>
                {/* Animated background */}
                <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-xl ${card.iconBg} shadow-lg transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110`}>
                      <card.icon className="w-5 h-5 text-white" />
                    </div>
                    {index === 0 && <TrendingUp className="w-5 h-5 text-green-500 animate-pulse" />}
                    {index === 1 && <Clock className="w-5 h-5 text-orange-500" />}
                    {index === 2 && <X className="w-5 h-5 text-red-500" />}
                    {index === 3 && <Percent className="w-5 h-5 text-purple-500" />}
                  </div>
                  
                  <div>
                    <p className={`text-2xl font-bold mb-1 transition-all duration-300 group-hover:text-3xl ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      {card.value}
                    </p>
                    <p className={`text-sm transition-colors duration-300 ${
                      isDarkMode ? 'text-gray-400 group-hover:text-gray-300' : 'text-gray-600 group-hover:text-gray-700'
                    }`}>
                      {card.title}
                    </p>
                  </div>

                  {/* Mini chart for each card */}
                  <div className="h-8 mt-4 opacity-60 group-hover:opacity-100 transition-opacity duration-300">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={depositWithdrawalData.slice(-4)}>
                        <Area
                          type="monotone"
                          dataKey="deposits"
                          stroke="#10b981"
                          strokeWidth={2}
                          fill="rgba(16, 185, 129, 0.1)"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Deposit Trend Chart */}
          <div className={`p-6 rounded-2xl border ${
            isDarkMode ? 'bg-gray-800/50 border-gray-700' : 'bg-white/70 border-gray-200'
          } backdrop-blur-sm`}>
            <h4 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Monthly Deposit Trends
            </h4>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={depositWithdrawalData}>
                  <defs>
                    <linearGradient id="depositGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
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
                    dataKey="deposits"
                    stroke="#10b981"
                    strokeWidth={3}
                    fill="url(#depositGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      {/* Withdrawals Overview - Enhanced Dashboard Style */}
      <div className={`p-8 rounded-3xl shadow-xl border mb-8 relative overflow-hidden ${
        isDarkMode ? 'bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700' : 'bg-gradient-to-br from-white to-gray-50 border-gray-200'
      }`}>
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, #ef4444 2px, transparent 2px), radial-gradient(circle at 75% 75%, #ef4444 2px, transparent 2px)`,
            backgroundSize: '50px 50px'
          }}></div>
        </div>

        <div className="relative z-10">
          {/* Header Section */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-gradient-to-r from-red-500 to-pink-600 rounded-2xl shadow-lg">
                <Wallet className="w-8 h-8 text-white" />
              </div>
              <div>
                <h3 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Withdrawals Overview
                </h3>
                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Track withdrawal requests and processing status
                </p>
              </div>
            </div>
            <div className={`px-4 py-2 rounded-full text-sm font-medium ${
              isDarkMode ? 'bg-red-900/30 text-red-400' : 'bg-red-100 text-red-700'
            }`}>
              -8.2% this month
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {withdrawalCards.map((card, index) => (
              <div key={index} className={`relative p-6 rounded-2xl border transition-all duration-500 hover:scale-105 cursor-pointer group overflow-hidden ${
                isDarkMode ? 'bg-gray-800/50 border-gray-700 hover:border-red-500/50' : 'bg-white/70 border-gray-200 hover:border-red-300'
              } backdrop-blur-sm`}>
                {/* Animated background */}
                <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-xl ${card.iconBg} shadow-lg transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110`}>
                      <card.icon className="w-5 h-5 text-white" />
                    </div>
                    {index === 0 && <TrendingDown className="w-5 h-5 text-red-500 animate-pulse" />}
                    {index === 1 && <Clock className="w-5 h-5 text-orange-500" />}
                    {index === 2 && <X className="w-5 h-5 text-red-500" />}
                    {index === 3 && <Percent className="w-5 h-5 text-purple-500" />}
                  </div>
                  
                  <div>
                    <p className={`text-2xl font-bold mb-1 transition-all duration-300 group-hover:text-3xl ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      {card.value}
                    </p>
                    <p className={`text-sm transition-colors duration-300 ${
                      isDarkMode ? 'text-gray-400 group-hover:text-gray-300' : 'text-gray-600 group-hover:text-gray-700'
                    }`}>
                      {card.title}
                    </p>
                  </div>

                  {/* Mini chart for each card */}
                  <div className="h-8 mt-4 opacity-60 group-hover:opacity-100 transition-opacity duration-300">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={depositWithdrawalData.slice(-4)}>
                        <Area
                          type="monotone"
                          dataKey="withdrawals"
                          stroke="#ef4444"
                          strokeWidth={2}
                          fill="rgba(239, 68, 68, 0.1)"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Withdrawal Trend Chart */}
          <div className={`p-6 rounded-2xl border ${
            isDarkMode ? 'bg-gray-800/50 border-gray-700' : 'bg-white/70 border-gray-200'
          } backdrop-blur-sm`}>
            <h4 className={`text-lg font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              Monthly Withdrawal Trends
            </h4>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={depositWithdrawalData}>
                  <defs>
                    <linearGradient id="withdrawalGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ef4444" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
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
                    dataKey="withdrawals"
                    stroke="#ef4444"
                    strokeWidth={3}
                    fill="url(#withdrawalGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Deposit & Withdrawal Report */}
        <div className={`p-6 rounded-2xl shadow-sm border ${
          isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        }`}>
          <h3 className={`text-lg font-semibold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Deposit & Withdrawal Report
          </h3>
          
          <div className="flex items-center space-x-6 mb-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Deposits
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Withdrawals
              </span>
            </div>
          </div>
          
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={depositWithdrawalData}>
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
                <Bar dataKey="deposits" fill="#10b981" radius={[4, 4, 0, 0]} />
                <Bar dataKey="withdrawals" fill="#ef4444" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Transaction Report */}
        <div className={`p-6 rounded-2xl shadow-sm border ${
          isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
        }`}>
          <h3 className={`text-lg font-semibold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Transaction Report
          </h3>
          
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={transactionData}>
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
                <Bar 
                  dataKey="amount" 
                  fill="#3b82f6" 
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
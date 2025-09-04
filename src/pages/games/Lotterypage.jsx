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
    offlineUsers: 1258,
    pendingTickets: 358,
    totalDeposits: 58200,
    activeUsers: 9845,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [suggestedResponse, setSuggestedResponse] = useState('');

  // Data for bar chart
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

  // Data for doughnut chart
  const doughnutChartData = {
    labels: ['New Users', 'Returning Users', 'Premium Users', 'Inactive Users'],
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

  // Financial data for line chart
  const financialChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Revenue',
        data: [45, 52, 38, 60, 55, 68, 72, 65, 80, 75, 82, 90],
        borderColor: 'rgba(79, 70, 229, 1)',
        backgroundColor: 'rgba(79, 70, 229, 0.2)',
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

  // Deposit data
  const depositData = [
    { method: 'Credit Card', amount: 23584, change: 12 },
    { method: 'PayPal', amount: 15245, change: 8 },
    { method: 'Bank Transfer', amount: 12891, change: 15 },
    { method: 'Crypto', amount: 6742, change: 22 },
  ];

  // Recent activities data with status added
  const recentActivities = [
    { user: 'John Smith', action: 'Purchased ticket', time: '2 min ago', amount: '$20', avatar: 'https://i.pravatar.cc/40?img=12', status: 'online' },
    { user: 'Emma Johnson', action: 'Won prize', time: '5 min ago', amount: '$2,500', avatar: 'https://i.pravatar.cc/40?img=8', status: 'online' },
    { user: 'Michael Brown', action: 'Deposited funds', time: '10 min ago', amount: '$100', avatar: 'https://i.pravatar.cc/40?img=11', status: 'offline' },
    { user: 'Sarah Wilson', action: 'Withdrew winnings', time: '15 min ago', amount: '$1,200', avatar: 'https://i.pravatar.cc/40?img=2', status: 'online' },
    { user: 'Robert Davis', action: 'Registered account', time: '20 min ago', amount: '-', avatar: 'https://i.pravatar.cc/40?img=3', status: 'offline' },
  ];

  // Chat messages
  const [chatMessages, setChatMessages] = useState([
    { user: 'John Smith', message: 'Hello, I have a question about the lottery draw timing.', time: '2 min ago', isAdmin: false, avatar: 'https://i.pravatar.cc/40?img=12' },
    { user: 'Admin', message: 'Sure, the next draw is at 8 PM EST. How can I help?', time: '1 min ago', isAdmin: true, avatar: 'https://i.pravatar.cc/40?img=1' },
    { user: 'Mary Johnson', message: 'When will the winning numbers be announced?', time: 'just now', isAdmin: false, avatar: 'https://i.pravatar.cc/40?img=6' },
  ]);

  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setChatMessages([
        ...chatMessages,
        { user: 'You', message: newMessage, time: 'just now', isAdmin: true, avatar: 'https://i.pravatar.cc/40?img=4' }
      ]);
      setNewMessage('');
    }
  };

  const getSuggestedResponse = async (userMessage) => {
    setIsLoading(true);
    setSuggestedResponse('');
    const prompt = userMessage;
    const systemPrompt = "You are a helpful and concise lottery dashboard assistant. Analyze the user's message and provide a brief, professional response to help the admin answer the query. Do not add any conversational fillers or phrases like 'Hello' or 'Sure'. Just provide the response text.";
    const apiKey = "";
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;

    try {
      const payload = {
        contents: [{ parts: [{ text: prompt }] }],
        systemInstruction: {
            parts: [{ text: systemPrompt }]
        },
      };

      let response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        throw new Error(`API call failed: ${response.statusText}`);
      }

      const result = await response.json();
      const candidate = result.candidates?.[0];
      const text = candidate?.content?.parts?.[0]?.text || 'No suggestion available.';

      setSuggestedResponse(text);
    } catch (error) {
      console.error('Error generating response:', error);
      setSuggestedResponse('Sorry, an error occurred while generating a response.');
    } finally {
      setIsLoading(false);
    }
  };

  const useSuggestedResponse = () => {
    if (suggestedResponse) {
      setNewMessage(suggestedResponse);
      setSuggestedResponse('');
    }
  };

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
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          drawBorder: false,
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  const doughnutChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
      },
      title: {
        display: true,
        text: 'User Distribution',
      },
    },
  };

  const financialChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Financial Overview',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          drawBorder: false,
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 font-sans p-4">
      <div className="max-w-7xl mx-auto">
        {/* Stats Cards - Refreshed Design */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          
          {/* Total Users Card */}
          <div className="card p-6 bg-white rounded-xl shadow-lg transform transition duration-300 hover:scale-105">
            <div className="flex items-start justify-between">
              <div className="text-gray-800">
                <h2 className="text-sm font-semibold text-gray-500">Total Users</h2>
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

          {/* Offline Users Card */}
          <div className="card p-6 bg-white rounded-xl shadow-lg transform transition duration-300 hover:scale-105">
            <div className="flex items-start justify-between">
              <div className="text-gray-800">
                <h2 className="text-sm font-semibold text-gray-500">Offline Users</h2>
                <p className="text-3xl font-bold mt-1 text-gray-900">{userStats.offlineUsers.toLocaleString()}</p>
              </div>
              <div className="text-rose-500">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636a9 9 0 010 12.728m0 0l-2.829-2.829m2.829 2.829L21 21M15.536 8.464a5 5 0 010 7.072m0 0l-2.829-2.829m-4.243 2.829a4.978 4.978 0 01-1.414-2.83m-1.414 5.244a9 9 0 01-2.167-9.238m7.824 2.167a1 1 0 111.414 1.414m-1.414-1.414L3 3m8.293 8.293l1.414 1.414" />
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
          <div className="card p-6 bg-white rounded-xl shadow-lg transform transition duration-300 hover:scale-105">
            <div className="flex items-start justify-between">
              <div className="text-gray-800">
                <h2 className="text-sm font-semibold text-gray-500">Pending Tickets</h2>
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

          {/* Total Deposits Card */}
          <div className="card p-6 bg-white rounded-xl shadow-lg transform transition duration-300 hover:scale-105">
            <div className="flex items-start justify-between">
              <div className="text-gray-800">
                <h2 className="text-sm font-semibold text-gray-500">Total Deposits</h2>
                <p className="text-3xl font-bold mt-1 text-gray-900">${userStats.totalDeposits.toLocaleString()}</p>
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
          <div className="bg-white card p-6 rounded-xl shadow">
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

          {/* User Distribution Chart */}
          <div className="bg-white card p-6 rounded-xl shadow">
            <h2 className="text-lg font-semibold mb-4 flex items-center text-gray-700">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
              </svg>
              User Distribution
            </h2>
            <div className="h-80 flex items-center justify-center">
              <Doughnut data={doughnutChartData} options={doughnutChartOptions} />
            </div>
          </div>
        </div>

        {/* Live Chat Monitor */}
        <div className="bg-white card p-6 rounded-xl shadow mb-8">
          <h2 className="text-lg font-semibold mb-4 flex items-center text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
            Live Chat Monitor
          </h2>
          <div className="bg-gray-100 p-4 rounded-lg h-64 overflow-y-auto">
            {chatMessages.map((msg, index) => (
              <div
                key={index}
                className={`flex mb-4 ${msg.isAdmin ? 'justify-end' : ''}`}
              >
                {!msg.isAdmin && <img src={msg.avatar} alt="User" className="rounded-full h-10 w-10" />}
                <div className={`ml-3 chat-message ${msg.isAdmin ? 'mr-3' : ''}`}>
                  <div
                    className={`p-3 rounded-lg shadow-sm ${
                      msg.isAdmin ? 'bg-indigo-600 text-white' : 'bg-white'
                    }`}
                  >
                    <p className="text-sm">{msg.message}</p>
                    <span
                      className={`text-xs ${msg.isAdmin ? 'text-indigo-200' : 'text-gray-500'}`}
                    >
                      {msg.user}, {msg.time}
                    </span>
                  </div>
                  {!msg.isAdmin && (
                    <button
                      className="mt-2 text-indigo-500 text-xs font-semibold hover:underline"
                      onClick={() => getSuggestedResponse(msg.message)}
                      disabled={isLoading}
                    >
                      ✨ Suggest Response
                    </button>
                  )}
                </div>
                {msg.isAdmin && <img src={msg.avatar} alt="Admin" className="rounded-full h-10 w-10" />}
              </div>
            ))}
          </div>
          {suggestedResponse && (
            <div className="mt-4 p-4 bg-purple-100 rounded-lg border-l-4 border-purple-500">
              <p className="font-semibold text-purple-800">Suggested Response:</p>
              <p className="text-purple-700 mt-1">{suggestedResponse}</p>
              <button
                className="mt-2 bg-purple-500 text-white px-3 py-1 text-sm rounded-lg hover:bg-purple-600 transition"
                onClick={useSuggestedResponse}
              >
                Use this Response
              </button>
            </div>
          )}
          {isLoading && (
            <div className="mt-4 text-center text-gray-500">
              Generating suggestion...
            </div>
          )}
          <div className="mt-4 flex">
            <input
              type="text"
              placeholder="Type your message..."
              className="flex-1 border border-gray-300 rounded-l-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            />
            <button
              className="bg-indigo-600 text-white px-4 py-3 rounded-r-lg hover:bg-indigo-700 transition flex items-center"
              onClick={handleSendMessage}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </div>
        </div>

        {/* Financial Overview & Recent Activities */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Financial Overview */}
          <div className="bg-white card p-6 rounded-xl shadow">
            <h2 className="text-lg font-semibold mb-4 flex items-center text-gray-700">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Financial Overview
            </h2>
            <div className="h-64 mb-4">
              <Line data={financialChartData} options={financialChartOptions} />
            </div>
            
            <div className="space-y-4">
              {depositData.map((deposit, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div
                      className={`w-3 h-3 rounded-full mr-2 ${
                        index === 0
                          ? 'bg-indigo-600'
                          : index === 1
                          ? 'bg-green-500'
                          : index === 2
                          ? 'bg-yellow-500'
                          : 'bg-purple-500'
                      }`}
                    ></div>
                    <span>{deposit.method}</span>
                  </div>
                  <div className="font-semibold">${deposit.amount.toLocaleString()}</div>
                  <div className="text-green-500 text-sm flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                    </svg>
                    <span>+{deposit.change}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activities */}
          <div className="bg-white card p-6 rounded-xl shadow">
            <h2 className="text-lg font-semibold mb-4 flex items-center text-gray-700">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Recent Activities
            </h2>
            
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <div className="relative">
                      <img src={activity.avatar} alt={activity.user} className="rounded-full h-10 w-10 mr-3" />
                      {/* Status indicator added here */}
                      <span className={`absolute bottom-0 right-3 block h-3 w-3 rounded-full ring-2 ring-white ${activity.status === 'online' ? 'bg-green-500' : 'bg-gray-400'}`} />
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">{activity.user}</p>
                      <p className="text-sm text-gray-500">{activity.action}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-800">{activity.amount}</p>
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

export default LotteryDashboard;

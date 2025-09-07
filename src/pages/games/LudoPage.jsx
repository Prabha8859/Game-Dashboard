import { Bell, Settings, User, Gamepad2, Users, Cpu, DollarSign } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

const LudoDashboard = () => {
  const revenueData = [
    { day: "Mon", revenue: 4000 },
    { day: "Tue", revenue: 3200 },
    { day: "Wed", revenue: 5000 },
    { day: "Thu", revenue: 4200 },
    { day: "Fri", revenue: 6000 },
    { day: "Sat", revenue: 4800 },
    { day: "Sun", revenue: 7000 },
  ];

  const usersData = [
    { game: "Classic", users: 240 },
    { game: "Quick", users: 180 },
    { game: "Tournament", users: 320 },
    { game: "Bot Match", users: 150 },
  ];

  const cards = [
    { title: "Active Games", value: "120", icon: <Gamepad2 />, color: "from-blue-500 to-indigo-500" },
    { title: "Online Users", value: "540", icon: <Users />, color: "from-green-500 to-emerald-500" },
    { title: "Active Bots", value: "35", icon: <Cpu />, color: "from-purple-500 to-pink-500" },
    { title: "Revenue Today", value: "₹12,340", icon: <DollarSign />, color: "from-yellow-400 to-orange-500" },
  ];

  return (
    <div className="flex flex-col w-full min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Navbar */}
      <div className="flex items-center justify-between bg-white px-6 py-3 shadow-lg relative top-0">
        <h4 className="text-xl font-bold text-black flex items-center gap-2">
          🎮 Ludo Dashboard
        </h4>
        <div className="flex items-center gap-6 text-black">
          <Bell className="w-5 h-5 cursor-pointer hover:scale-110 transition" />
          <Settings className="w-5 h-5 cursor-pointer hover:scale-110 transition" />
          <div className="flex items-center gap-2 cursor-pointer bg-white/10 hover:bg-white/20 px-3 py-1 rounded-lg transition">
            <User className="w-6 h-6" />
            <span className="font-medium">Admin</span>
          </div>
        </div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
        {cards.map((card, i) => (
          <div
            key={i}
            className="p-6 bg-white rounded-2xl shadow hover:shadow-xl transition relative overflow-hidden"
          >
            <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${card.color}`}></div>
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-xl bg-gradient-to-br ${card.color} text-white`}>
                {card.icon}
              </div>
              <div>
                <p className="text-gray-500 text-sm">{card.title}</p>
                <h4 className="text-2xl font-bold text-gray-800">{card.value}</h4>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Graphs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
        <div className="bg-white rounded-2xl shadow p-5">
          <h5 className="font-semibold text-dark mb-3">📊 Revenue Trend</h5>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={revenueData}>
              <defs>
                <linearGradient id="revColor" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.8}/>
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="url(#revColor)"
                strokeWidth={3}
                dot={{ r: 5 }}
                animationDuration={1200}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-2xl shadow p-5">
          <h5 className="font-semibold text-dark mb-3">📈 Active Users / Game Popularity</h5>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={usersData}>
              <defs>
                <linearGradient id="userColor" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10b981" stopOpacity={0.9}/>
                  <stop offset="100%" stopColor="#10b981" stopOpacity={0.3}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="game" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="users" fill="url(#userColor)" radius={[10, 10, 0, 0]} animationDuration={1200}/>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
        <div className="bg-white rounded-2xl shadow p-5">
          <h5 className="font-semibold text-dark mb-3">🎲 Recent Games</h5>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead className="sticky top-0 bg-gray-100">
                <tr className="text-left text-dark">
                  <th className="p-3">Room ID</th>
                  <th className="p-3">Players</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { id: "LUDO1001", players: 4, status: "Completed" },
                  { id: "LUDO1002", players: 3, status: "Ongoing" },
                  { id: "LUDO1003", players: 2, status: "Pending" },
                ].map((game, i) => (
                  <tr key={i} className="border-b hover:bg-gray-50">
                    <td className="p-3">{game.id}</td>
                    <td className="p-3">{game.players}</td>
                    <td className={`p-3 font-medium ${
                      game.status === "Completed" ? "text-green-600" :
                      game.status === "Ongoing" ? "text-blue-600" :
                      "text-yellow-600"
                    }`}>
                      {game.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow p-5">
          <h5 className="font-semibold text-dark mb-3">💰 Recent Transactions</h5>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead className="sticky top-0 bg-gray-100">
                <tr className="text-left text-dark">
                  <th className="p-3">User</th>
                  <th className="p-3">Amount</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { user: "User123", amount: "₹500", status: "Success" },
                  { user: "User456", amount: "₹200", status: "Pending" },
                  { user: "User789", amount: "₹800", status: "Failed" },
                ].map((txn, i) => (
                  <tr key={i} className="border-b hover:bg-gray-50">
                    <td className="p-3">{txn.user}</td>
                    <td className="p-3">{txn.amount}</td>
                    <td className={`p-3 font-medium ${
                      txn.status === "Success" ? "text-green-600" :
                      txn.status === "Pending" ? "text-yellow-600" :
                      "text-red-600"
                    }`}>
                      {txn.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LudoDashboard;
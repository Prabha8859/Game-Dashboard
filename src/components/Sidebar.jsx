import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Gamepad2,
  CreditCard,
  Banknote,
  Headphones,
  BarChart3,
  ChevronDown,
  ChevronRight,
  Menu,
  X,
  Link,
  DollarSign,
  UserCheck,
  ClipboardList,
  UserPlus,
  UserX,
  CreditCard as CreditCardIcon,
  Ban,
  CheckCircle,
  Clock,
  Ticket,
  FileText,
  Dices,
  Coins,
  Bomb,
  Play,
} from "lucide-react";

import playzeloLogo from "../assets/image/logo2.png";

const Sidebar = ({ isDarkMode }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [openSubDropdown, setOpenSubDropdown] = useState(null);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleDropdownToggle = (key, path) => {
    setOpenDropdown(openDropdown === key ? null : key);
    if (path) navigate(path); // main game click → open dashboard
  };

  const handleSubDropdownToggle = (key, path) => {
    setOpenSubDropdown(openSubDropdown === key ? null : key);
    if (path) navigate(path);
  };

  const iconClass = "w-6 h-6 text-gray-600";

  const menuItems = [
    {
      name: "Dashboard",
      icon: <LayoutDashboard />,
      key: "dashboard",
      path: "/dashboard",
    },
    {
      name: "Manage Games",
      icon: <Gamepad2 />,
      key: "manageGames",
      dropdown: true,
      subItems: [
        {
          name: "Ludo",
          key: "ludo",
          icon: <Dices />,
          path: "/games/ludo", // default dashboard
          dropdown: true,
          subItems: [
            { name: "Admin Console", key: "reportludo", path: "/games/ludo/report", icon: <BarChart3 /> },
            { name: "Player & Matches", key: "transectionludo", path: "/games/ludo/transaction", icon: <ClipboardList /> },
            { name: "Wallet & Winner", key: "walletludo", path: "/games/ludo/wallet", icon: <Coins /> },
            { name: "Game Ludo", key: "gameludo", path: "/games/ludo/game", icon: <Play /> },
            { name: "Users Ludo", key: "userludo", path: "/games/ludo/users", icon: <Users /> },
            { name: "UserData Ludo", key: "userdataludo", path: "/games/ludo/userdata", icon: <Coins /> },
          ],
        },
        {
          name: "Jackpot",
          key: "jackpot",
          icon: <Coins />,
          path: "/games/jackpot",
          dropdown: true,
          subItems: [
            { name: "Manage Jackpot", key: "mangejackpot", path: "/games/jackpot/manage", icon: <Coins /> },
            { name: "Settings Jackpot", key: "walletjackpot", path: "/games/jackpot/wallet", icon: <CreditCard /> },
            { name: "Logs Jackpot", key: "logsjackpot", path: "/games/jackpot/logs", icon: <ClipboardList /> },
            { name: "UserData Jackpot", key: "userdatajackpot", path: "/games/jackpot/userdata", icon: <Users /> },
          ],
        },
        {
          name: "Mines",
          key: "mines",
          icon: <Bomb />,
          path: "/games/mines",
          dropdown: true,
          subItems: [
            { name: "Game Monitory", key: "mangemine", path: "/games/mines/manage", icon: <BarChart3 /> },
            { name: "User Management", key: "walletMine", path: "/games/mines/wallet", icon: <Users /> },
            { name: "Control Admin", key: "controladmin", path: "/games/mines/admin", icon: <BarChart3 /> },
            { name: "User Jackpot", key: "userdatamine", path: "/games/mines/userdata", icon: <Coins /> },
          ],
        },
        {
          name: "Teen Patti",
          key: "teenPatti",
          icon: <Play />,
          path: "/games/teenpatti",
          dropdown: true,
          subItems: [
            { name: "Teen Patti Rules", key: "mangeteenpatti", path: "/games/teenpatti/manage", icon: <FileText /> },
            { name: "Transactions & Wallet", key: "walletteenpatti", path: "/games/teenpatti/wallet", icon: <CreditCard /> },
            { name: "User Jackpot", key: "userdatateenpatti", path: "/games/teenpatti/userdata", icon: <Users /> },
          ],
        },
        {
          name: "Lottery",
          key: "lottery",
          icon: <Coins />,
          path: "/games/lottery",
          dropdown: true,
          subItems: [
            { name: "Manage Lottery", key: "allLottery", path: "/games/lottery/manage", icon: <ClipboardList /> },
            { name: "Wallet Lottery", key: "activeLottery", path: "/games/lottery/users", icon: <CreditCard /> },
            { name: "User Lottery", key: "Resultslottery", path: "/games/lottery/results", icon: <Users /> },
          ],
        },
        {
          name: "Bird Shooting",
          key: "birdshooting",
          icon: <Play />,
          path: "/games/birdshooting",
          dropdown: true,
          subItems: [
            { name: "Lobby Manage", key: "lobbymange", path: "/games/birdshooting/lobby", icon: <Users /> },
            { name: "Gaming Manage", key: "gamingbird", path: "/games/birdshooting/manage", icon: <Play /> },
            { name: "UserData Manage", key: "userdatabird", path: "/games/birdshooting/userdata", icon: <Users /> },
          ],
        },
      ],
    },
    {
      name: "Manage Users",
      icon: <Users />,
      key: "manageUsers",
      dropdown: true,
      subItems: [
        { name: "Active Users", key: "activeUsers", path: "/users/active", icon: <UserPlus /> },
        { name: "Banned Users", key: "bannedUsers", path: "/users/banned", icon: <UserX /> },
        { name: "All Users", key: "allUsers", path: "/users/all", icon: <Users /> },
      ],
    },
    {
      name: "Deposits",
      icon: <CreditCard />,
      key: "deposits",
      dropdown: true,
      subItems: [
        { name: "Pending Deposits", key: "pendingDeposits", path: "/deposits/pending", icon: <Clock /> },
        { name: "Approved Deposits", key: "approvedDeposits", path: "/deposits/approved", icon: <CheckCircle /> },
        { name: "Rejected Deposits", key: "rejectedDeposits", path: "/deposits/rejected", icon: <Ban /> },
        { name: "All Deposits", key: "allDeposits", path: "/deposits/all", icon: <CreditCardIcon /> },
      ],
    },
    {
      name: "Withdrawals",
      icon: <Banknote />,
      key: "withdrawals",
      dropdown: true,
      subItems: [
        { name: "Pending Withdrawals", key: "pendingWithdrawals", path: "/withdrawals/pending", icon: <Clock /> },
        { name: "Approved Withdrawals", key: "approvedWithdrawals", path: "/withdrawals/approved", icon: <CheckCircle /> },
        { name: "Rejected Withdrawals", key: "rejectedWithdrawals", path: "/withdrawals/rejected", icon: <Ban /> },
      ],
    },
    {
      name: "Support Tickets",
      icon: <Headphones />,
      key: "supportTickets",
      dropdown: true,
      subItems: [
        { name: "Open Tickets", key: "openTickets", path: "/tickets/open", icon: <Ticket /> },
        { name: "Closed Tickets", key: "closedTickets", path: "/tickets/closed", icon: <X /> },
      ],
    },
    {
      name: "Report",
      icon: <BarChart3 />,
      key: "report",
      dropdown: true,
      subItems: [
        { name: "Daily Report", key: "dailyReport", path: "/reports/daily", icon: <FileText /> },
        { name: "Monthly Report", key: "monthlyReport", path: "/reports/monthly", icon: <FileText /> },
      ],
    },
  ];

  return (
    <div
      className={`transition-all duration-300 h-screen flex flex-col border-r ${
        isCollapsed ? "w-20" : "w-72"
      } ${isDarkMode ? "bg-gray-900 border-gray-700 text-gray-200" : "bg-white border-gray-200 text-gray-800"}`}
    >
      {/* Header */}
      <div className={`flex items-center justify-between p-3 border-b ${isDarkMode ? "border-gray-700" : "border-gray-200"}`}>
        <div className={`transition-opacity duration-300 ${isCollapsed ? "opacity-0 w-0 overflow-hidden" : "opacity-100"}`}>
          <img src={playzeloLogo} alt="PlayZelo Logo" className="w-40 h-12 object-contain" />
        </div>
        <button
          onClick={toggleSidebar}
          className={`p-2 rounded-full transition-colors duration-200 flex-shrink-0 ${
            isDarkMode ? "hover:bg-gray-800" : "hover:bg-gray-100"
          }`}
        >
          {isCollapsed ? <Menu className="w-6 h-6 text-gray-600" /> : <X className="w-6 h-6 text-gray-600" />}
        </button>
      </div>

      {/* Menu */}
      <nav className="flex-1 px-4 py-4 custom-scroll overflow-y-auto">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.key}>
              <div
                className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                  isDarkMode ? "text-gray-300 hover:bg-gray-800" : "text-gray-600 hover:bg-gray-50"
                }`}
                onClick={() => (item.dropdown ? handleDropdownToggle(item.key, item.path) : navigate(item.path))}
              >
                <div className="flex-shrink-0">{React.cloneElement(item.icon, { className: iconClass })}</div>
                {!isCollapsed && <span className="font-medium">{item.name}</span>}
                {item.dropdown && !isCollapsed && (
                  <div className="ml-auto">{openDropdown === item.key ? <ChevronDown className={iconClass} /> : <ChevronRight className={iconClass} />}</div>
                )}
              </div>

              {/* Sub menu */}
              {item.dropdown && openDropdown === item.key && !isCollapsed && (
                <ul className="pl-10 mt-2 space-y-1">
                  {item.subItems.map((subItem) => (
                    <li key={subItem.key}>
                      <div
                        className={`flex items-center p-2 text-sm rounded-lg cursor-pointer transition-all duration-200 ${
                          isDarkMode ? "text-gray-400 hover:bg-gray-800 hover:text-white" : "text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                        }`}
                        onClick={() =>
                          subItem.dropdown
                            ? handleSubDropdownToggle(subItem.key, subItem.path)
                            : navigate(subItem.path)
                        }
                      >
                        <div className="w-6 h-6 flex items-center justify-center mr-2 text-gray-600">
                          {React.cloneElement(subItem.icon, { className: iconClass })}
                        </div>
                        <span className="flex-1">{subItem.name}</span>
                        {subItem.dropdown && <ChevronRight className={`transform ${openSubDropdown === subItem.key ? "rotate-90" : ""}`} />}
                      </div>

                      {/* Nested sub menu */}
                      {subItem.dropdown && openSubDropdown === subItem.key && (
                        <ul className="pl-8 mt-1 space-y-1">
                          {subItem.subItems.map((nestedItem) => (
                            <li key={nestedItem.key}>
                              <div
                                className={`flex items-center p-2 text-sm rounded-lg cursor-pointer transition-all duration-200 ${
                                  isDarkMode ? "text-gray-400 hover:bg-gray-800 hover:text-white" : "text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                                }`}
                                onClick={() => navigate(nestedItem.path)}
                              >
                                <div className="w-6 h-6 flex items-center justify-center mr-2 text-gray-600">
                                  {React.cloneElement(nestedItem.icon, { className: iconClass })}
                                </div>
                                <span>{nestedItem.name}</span>
                              </div>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;


import React, { useState } from "react";
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
  Swords,
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
  Play
} from "lucide-react";

import playzeloLogo from "../assets/image/logo2.png";

const Sidebar = ({ onMenuClick, isDarkMode }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [openGameItems, setOpenGameItems] = useState({}); // For each game row arrow

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleDropdownToggle = (key) => {
    setOpenDropdown(openDropdown === key ? null : key);
  };

  // New handler for game row arrow rotation and "navigation"
  const handleGameClick = (key) => {
    setOpenGameItems((prev) => ({
      ...prev,
      [key]: !prev[key]
    }));
    onMenuClick(key);
  };

  const menuItems = [
    {
      name: "Dashboard",
      icon: <LayoutDashboard />,
      key: "dashboard",
      active: true,
      iconColor: "text-blue-600",
      bgColor: isDarkMode ? "bg-blue-900" : "bg-blue-50",
    },
    {
      name: "Referral",
      icon: <Users />,
      key: "referral",
      iconColor: "text-orange-600",
      bgColor: isDarkMode ? "bg-orange-900" : "bg-orange-50",
      dropdown: true,
      subItems: [
        { name: "Referral Links", key: "referralLinks", icon: <Link />, iconColor: "text-orange-500" },
        { name: "Referral Earnings", key: "referralEarnings", icon: <DollarSign />, iconColor: "text-orange-500" },
        { name: "Referral Users", key: "referralUsers", icon: <UserCheck />, iconColor: "text-orange-500" },
      ],
    },
    {
      name: "Manage Games",
      icon: <Gamepad2 />,
      key: "manageGames",
      iconColor: "text-purple-600",
      bgColor: isDarkMode ? "bg-purple-900" : "bg-purple-50",
      dropdown: true,
      subItems: [
        {
          name: "Ludo",
          key: "ludo",
          icon: <Dices />,
          iconColor: "text-purple-500"
        },
        {
          name: "Jackpot",
          key: "jackpot",
          icon: <Coins />,
          iconColor: "text-yellow-500"
        },
        {
          name: "Mines",
          key: "mines",
          icon: <Bomb />,
          iconColor: "text-red-500"
        },
        {
          name: "Teen Patti",
          key: "teenPatti",
          icon: <Play />,
          iconColor: "text-green-500"
        },
        {
          name: "Slots",
          key: "slots",
          icon: <Coins />,
          iconColor: "text-orange-500"
        },
        {
          name: "Game Log",
          key: "gameLogs",
          icon: <ClipboardList />,
          iconColor: "text-purple-500"
        }
      ],
    },
    {
      name: "Manage Users",
      icon: <Users />,
      key: "manageUsers",
      iconColor: "text-indigo-600",
      bgColor: isDarkMode ? "bg-indigo-900" : "bg-indigo-50",
      dropdown: true,
      subItems: [
        { name: "Active Users", key: "activeUsers", icon: <UserPlus />, iconColor: "text-indigo-500" },
        { name: "Banned Users", key: "bannedUsers", icon: <UserX />, iconColor: "text-indigo-500" },
        { name: "All Users", key: "allUsers", icon: <Users />, iconColor: "text-indigo-500" },
      ],
    },
    {
      name: "Deposits",
      icon: <CreditCard />,
      key: "deposits",
      iconColor: "text-green-600",
      bgColor: isDarkMode ? "bg-green-900" : "bg-green-50",
      dropdown: true,
      subItems: [
        { name: "Pending Deposits", key: "pendingDeposits", icon: <Clock />, iconColor: "text-yellow-500" },
        { name: "Approved Deposits", key: "approvedDeposits", icon: <CheckCircle />, iconColor: "text-green-500" },
        { name: "Rejected Deposits", key: "rejectedDeposits", icon: <Ban />, iconColor: "text-red-500" },
        { name: "All Deposits", key: "allDeposits", icon: <CreditCardIcon />, iconColor: "text-green-500" },
      ],
    },
    {
      name: "Withdrawals",
      icon: <Banknote />,
      key: "withdrawals",
      iconColor: "text-emerald-600",
      bgColor: isDarkMode ? "bg-emerald-900" : "bg-emerald-50",
      dropdown: true,
      subItems: [
        { name: "Pending Withdrawals", key: "pendingWithdrawals", icon: <Clock />, iconColor: "text-yellow-500" },
        { name: "Approved Withdrawals", key: "approvedWithdrawals", icon: <CheckCircle />, iconColor: "text-green-500" },
        { name: "Rejected Withdrawals", key: "rejectedWithdrawals", icon: <Ban />, iconColor: "text-red-500" },
      ],
    },
    {
      name: "Support Tickets",
      icon: <Headphones />,
      key: "supportTickets",
      iconColor: "text-cyan-600",
      bgColor: isDarkMode ? "bg-cyan-900" : "bg-cyan-50",
      dropdown: true,
      subItems: [
        { name: "Open Tickets", key: "openTickets", icon: <Ticket />, iconColor: "text-cyan-500" },
        { name: "Closed Tickets", key: "closedTickets", icon: <X />, iconColor: "text-gray-500" },
      ],
    },
    {
      name: "Report",
      icon: <BarChart3 />,
      key: "report",
      iconColor: "text-red-600",
      bgColor: isDarkMode ? "bg-red-900" : "bg-red-50",
      dropdown: true,
      subItems: [
        { name: "Daily Report", key: "dailyReport", icon: <FileText />, iconColor: "text-red-500" },
        { name: "Monthly Report", key: "monthlyReport", icon: <FileText />, iconColor: "text-red-500" },
      ],
    },
  ];

  return (
    <div
      className={`transition-all duration-300 h-screen flex flex-col border-r ${
        isCollapsed ? "w-20" : "w-72"
      } ${
        isDarkMode
          ? "bg-gray-900 border-gray-700 text-gray-200"
          : "bg-white border-gray-200 text-gray-800"
      }`}
    >
      {/* Logo + Toggle */}
      <div className={`flex items-center justify-between p-3 border-b ${isDarkMode ? "border-gray-700" : "border-gray-200"}`}>
        <div
          className={`transition-opacity duration-300 ${
            isCollapsed ? "opacity-0 w-0 overflow-hidden" : "opacity-100"
          }`}
        >
          <img
            src={playzeloLogo}
            alt="PlayZelo Logo"
            className="w-40 h-12 object-contain"
          />
        </div>
        <button
          onClick={toggleSidebar}
          className={`p-2 rounded-full transition-colors duration-200 flex-shrink-0 ${
            isDarkMode ? "hover:bg-gray-800" : "hover:bg-gray-100"
          }`}
        >
          {isCollapsed ? (
            <Menu className={`w-6 h-6 ${isDarkMode ? "text-gray-300" : "text-gray-600"}`} />
          ) : (
            <X className={`w-6 h-6 ${isDarkMode ? "text-gray-300" : "text-gray-600"}`} />
          )}
        </button>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 px-4 py-4 custom-scroll overflow-y-auto">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.key}>
              <div
                className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                  item.active
                    ? `${item.bgColor} ${item.iconColor}`
                    : isDarkMode
                      ? "text-gray-300 hover:bg-gray-800"
                      : "text-gray-600 hover:bg-gray-50"
                }`}
                onClick={() => {
                  if (!item.dropdown) {
                    onMenuClick(item.key);
                  } else {
                    handleDropdownToggle(item.key);
                  }
                }}
              >
                <div className="flex-shrink-0">
                  {React.cloneElement(item.icon, {
                    className: `w-6 h-6 ${item.iconColor}`,
                  })}
                </div>
                <span
                  className={`font-medium transition-all duration-300 ${
                    isCollapsed ? "opacity-0 w-0 overflow-hidden" : "opacity-100"
                  }`}
                >
                  {item.name}
                </span>
                {item.dropdown && !isCollapsed && (
                  <div className="ml-auto">
                    {openDropdown === item.key ? (
                      <ChevronDown className="w-5 h-5" />
                    ) : (
                      <ChevronRight className="w-5 h-5" />
                    )}
                  </div>
                )}
              </div>

              {/* Only for Manage Games, show game rows with right/arrow */}
              {item.dropdown && openDropdown === item.key && item.key === "manageGames" && !isCollapsed && (
                <ul className="pl-10 mt-2 space-y-1">
                  {item.subItems.slice(0, 5).map((subItem) => (
                    <li key={subItem.key}>
                      <div
                        className={`flex items-center p-2 text-sm rounded-lg cursor-pointer transition-all duration-200 group ${
                          isDarkMode
                            ? "text-gray-400 hover:bg-gray-800 hover:text-white"
                            : "text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                        }`}
                        onClick={() => handleGameClick(subItem.key)}
                      >
                        <div className={`w-6 h-6 flex items-center justify-center mr-2 ${subItem.iconColor}`}>
                          {subItem.icon}
                        </div>
                        <span className="flex-1">{subItem.name}</span>
                        {/* Arrow Icon with smooth rotate */}
                        <span
                          className={`transition-transform duration-200 ${
                            openGameItems[subItem.key] ? "rotate-90" : ""
                          }`}
                        >
                          <ChevronRight className="w-4 h-4" />
                        </span>
                      </div>
                    </li>
                  ))}
                  {/* Game Log (normal, no arrow) */}
                  <li key={item.subItems[5].key}>
                    <div
                      className={`flex items-center p-2 text-sm rounded-lg cursor-pointer transition-all duration-200 ${
                        isDarkMode
                          ? "text-gray-400 hover:bg-gray-800 hover:text-white"
                          : "text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                      }`}
                      onClick={() => onMenuClick(item.subItems[5].key)}
                    >
                      <div className={`w-6 h-6 flex items-center justify-center mr-2 ${item.subItems[5].iconColor}`}>
                        {item.subItems[5].icon}
                      </div>
                      {item.subItems[5].name}
                    </div>
                  </li>
                </ul>
              )}

              {/* Others: normal old behavior */}
              {item.dropdown && openDropdown === item.key && item.key !== "manageGames" && !isCollapsed && (
                <ul className="pl-10 mt-2 space-y-1">
                  {item.subItems.map((subItem) => (
                    <li key={subItem.key}>
                      <div
                        className={`flex items-center p-2 text-sm rounded-lg cursor-pointer transition-all duration-200 ${
                          isDarkMode
                            ? "text-gray-400 hover:bg-gray-800 hover:text-white"
                            : "text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                        }`}
                        onClick={() => onMenuClick(subItem.key)}
                      >
                        <div className={`w-6 h-6 flex items-center justify-center mr-2 ${subItem.iconColor}`}>
                          {subItem.icon}
                        </div>
                        {subItem.name}
                      </div>
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
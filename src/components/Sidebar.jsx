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

const Sidebar = ({ onMenuClick, isDarkMode }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [openSubDropdown, setOpenSubDropdown] = useState(null);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleDropdownToggle = (key) => {
    setOpenDropdown(openDropdown === key ? null : key);
  };

  const handleSubDropdownToggle = (key) => {
    setOpenSubDropdown(openSubDropdown === key ? null : key);
  };

  const iconClass = "w-6 h-6 text-gray-600";

  const menuItems = [
    {
      name: "Dashboard",
      icon: <LayoutDashboard />,
      key: "dashboard",
      active: true,
    },
    {
      name: "Referral",
      icon: <Users />,
      to: "/referral",
      dropdown: true,
      subItems: [
        { name: "Referral Links", to: "referralLinks", icon: <Link /> },
        { name: "Referral Earnings", to: "/referralEarnings", icon: <DollarSign /> },
        { name: "Referral Users", to: "/referralUsers", icon: <UserCheck /> },
      ],
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
          dropdown: true,
          subItems: [
            { name: "Admin Console", key: "reportludo", icon: <BarChart3 /> },
            { name: "Player&Matches", key: "transectionludo", icon: <BarChart3 /> },
            { name: "Wallet&Winner", key: "walletludo", icon: <Dices /> },
            { name: "Game Ludo", key: "gameludo", icon: <BarChart3 /> },
            { name: "Users Ludo", key: "userludo", icon: <BarChart3 /> },
            { name: "UserDate Ludo", key: "userdataludo", icon: <Coins /> },
          ],
        },
        {
          name: "Jackpot",
          key: "jackpot",
          icon: <Coins />,
          dropdown: true,
          subItems: [
            { name: "Manage Jackpot", key: "mangejackpot", icon: <Coins /> },
            { name: "Settings Jackpot", key: "walletjackpot", icon: <Coins /> },
            { name: "Logs Jackpot", key: "logsjackpot", icon: <Coins /> },
            { name: "UserData Jackpot", key: "userdatajackpot", icon: <Coins /> },
          ],
        },
        {
          name: "Mines",
          key: "mines",
          icon: <Bomb />,
          dropdown: true,
          subItems: [
            { name: "Game Montory", key: "mangemine", icon: <Bomb /> },
            { name: "User Mangement", key: "walletMine", icon: <BarChart3 /> },
            { name: "Control Admin", key: "controladmin", icon: <BarChart3 /> },
            { name: "User Jackpot", key: "userdatamine", icon: <Coins /> },
          ],
        },
        {
          name: "Teen Patti",
          key: "teenPatti",
          icon: <Play />,
          dropdown: true,
          subItems: [
            { name: "Teen Patti Rules", key: "mangeteenpatti", icon: <Play /> },
            { name: "Transactions&Wallet ", key: "walletteenpatti", icon: <BarChart3 /> },
            { name: "User Jackpot", key: "userdatateenpatti", icon: <Coins /> },
          ],
        },
        {
          name: "Lottery",
          key: "lottery",
          icon: <Coins />,
          dropdown: true,
          subItems: [
            { name: "Manage Lottery", key: "allLottery", icon: <Coins /> },
            { name: "Wallet Lottery", key: "activeLottery", icon: <Coins /> },
            { name: "User Lottery", key: "Resultslottery", icon: <Coins /> },
          ],
        },
        {
          name: "BirdShooting",
          key: "birdshooting",
          icon: <Coins />,
          dropdown: true,
          subItems: [
            { name: "Lobby Mange", key: "lobbymange", icon: <Coins /> },
            { name: "Gaming Mange", key: "gamingbird", icon: <Coins /> },
            { name: "UserData Mange", key: "userdata", icon: <Coins /> },
          ],
        },
        { name: "Game Log", key: "gameLogs", icon: <ClipboardList /> },
      ],
    },
    {
      name: "Manage Users",
      icon: <Users />,
      key: "manageUsers",
      dropdown: true,
      subItems: [
        { name: "Active Users", key: "activeUsers", icon: <UserPlus /> },
        { name: "Banned Users", key: "bannedUsers", icon: <UserX /> },
        { name: "All Users", key: "allUsers", icon: <Users /> },
      ],
    },
    {
      name: "Deposits",
      icon: <CreditCard />,
      key: "deposits",
      dropdown: true,
      subItems: [
        { name: "Pending Deposits", key: "pendingDeposits", icon: <Clock /> },
        { name: "Approved Deposits", key: "approvedDeposits", icon: <CheckCircle /> },
        { name: "Rejected Deposits", key: "rejectedDeposits", icon: <Ban /> },
        { name: "All Deposits", key: "allDeposits", icon: <CreditCardIcon /> },
      ],
    },
    {
      name: "Withdrawals",
      icon: <Banknote />,
      key: "withdrawals",
      dropdown: true,
      subItems: [
        { name: "Pending Withdrawals", key: "pendingWithdrawals", icon: <Clock /> },
        { name: "Approved Withdrawals", key: "approvedWithdrawals", icon: <CheckCircle /> },
        { name: "Rejected Withdrawals", key: "rejectedWithdrawals", icon: <Ban /> },
      ],
    },
    {
      name: "Support Tickets",
      icon: <Headphones />,
      key: "supportTickets",
      dropdown: true,
      subItems: [
        { name: "Open Tickets", key: "openTickets", icon: <Ticket /> },
        { name: "Closed Tickets", key: "closedTickets", icon: <X /> },
      ],
    },
    {
      name: "Report",
      icon: <BarChart3 />,
      key: "report",
      dropdown: true,
      subItems: [
        { name: "Daily Report", key: "dailyReport", icon: <FileText /> },
        { name: "Monthly Report", key: "monthlyReport", icon: <FileText /> },
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
      <div
        className={`flex items-center justify-between p-3 border-b ${
          isDarkMode ? "border-gray-700" : "border-gray-200"
        }`}
      >
        <div
          className={`transition-opacity duration-300 ${
            isCollapsed ? "opacity-0 w-0 overflow-hidden" : "opacity-100"
          }`}
        >
          <img src={playzeloLogo} alt="PlayZelo Logo" className="w-40 h-12 object-contain" />
        </div>
        <button
          onClick={toggleSidebar}
          className={`p-2 rounded-full transition-colors duration-200 flex-shrink-0 ${
            isDarkMode ? "hover:bg-gray-800" : "hover:bg-gray-100"
          }`}
        >
          {isCollapsed ? (
            <Menu className="w-6 h-6 text-gray-600" />
          ) : (
            <X className="w-6 h-6 text-gray-600" />
          )}
        </button>
      </div>

      <nav className="flex-1 px-4 py-4 custom-scroll overflow-y-auto">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.key}>
              <div
                className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                  isDarkMode
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
                  {React.cloneElement(item.icon, { className: iconClass })}
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
                      <ChevronDown className={iconClass} />
                    ) : (
                      <ChevronRight className={iconClass} />
                    )}
                  </div>
                )}
              </div>

              {item.dropdown && openDropdown === item.key && !isCollapsed && (
                <ul className="pl-10 mt-2 space-y-1">
                  {item.subItems.map((subItem) => (
                    <li key={subItem.key}>
                      <div
                        className={`flex items-center p-2 text-sm rounded-lg cursor-pointer transition-all duration-200 ${
                          isDarkMode
                            ? "text-gray-400 hover:bg-gray-800 hover:text-white"
                            : "text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                        }`}
                        onClick={() => {
                          if (subItem.dropdown) {
                            onMenuClick(subItem.key);
                            handleSubDropdownToggle(subItem.key);
                          } else {
                            onMenuClick(subItem.key);
                          }
                        }}
                      >
                        <div className={`w-6 h-6 flex items-center justify-center mr-2 text-gray-600`}>
                          {React.cloneElement(subItem.icon, { className: iconClass })}
                        </div>
                        <span className="flex-1">{subItem.name}</span>
                        {subItem.dropdown && (
                          <span
                            onClick={(e) => {
                              e.stopPropagation();
                              handleSubDropdownToggle(subItem.key);
                            }}
                            className={`transition-transform duration-200 cursor-pointer ${
                              openSubDropdown === subItem.key ? "rotate-90" : ""
                            }`}
                          >
                            <ChevronRight className={iconClass} />
                          </span>
                        )}
                      </div>

                      {subItem.dropdown && openSubDropdown === subItem.key && (
                        <ul className="pl-8 mt-1 space-y-1">
                          {subItem.subItems.map((nestedItem) => (
                            <li key={nestedItem.key}>
                              <div
                                className={`flex items-center p-2 text-sm rounded-lg cursor-pointer transition-all duration-200 ${
                                  isDarkMode
                                    ? "text-gray-400 hover:bg-gray-800 hover:text-white"
                                    : "text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                                }`}
                                onClick={() => onMenuClick(nestedItem.key)}
                              >
                                <div className={`w-6 h-6 flex items-center justify-center mr-2 text-gray-600`}>
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

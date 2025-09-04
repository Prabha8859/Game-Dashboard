import React, { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import LoginPage from "./components/AdminPages/LoginPage";
import ProfileModal from "./components/AdminPages/ProfileModal";

// Import all pages
import Dashboard from "./pages/Dashboard";
import Game from "./pages/Game";
import GameLogs from "./pages/GameLogs";
import ActiveUsers from "./pages/ActiveUsers";
import AllUsers from "./pages/AllUsers";
import UserPermissions from "./pages/UserPermissions";
import BannedUsers from "./pages/BannedUsers";
import PendingDeposits from "./pages/PendingDeposits";
import ApprovedDeposits from "./pages/ApprovedDeposits";
import RejectedDeposits from "./pages/RejectedDeposits";
import AllDeposits from "./pages/AllDeposits";
import PendingWithdrawals from "./pages/PendingWithdrawals";
import ApprovedWithdrawals from "./pages/ApprovedWithdrawals";
import RejectedWithdrawals from "./pages/RejectedWithdrawals";
import OpenTickets from "./pages/OpenTickets";
import ClosedTickets from "./pages/ClosedTickets";
import DailyReport from "./pages/DailyReport";
import MonthlyReport from "./pages/MonthlyReport";

// 🎮 Game pages
import LudoGame from "./pages/games/LudoPage";
import JackpotGame from "./pages/games/Jackpotpage";
import MinesGame from "./pages/games/MinesPage";
import TeenPattiGame from "./pages/games/TeenPattiPage";
import LotteryPage from "./pages/games/Lotterypage" ;


// Import Lottery pages
import AllLottery from "./pages/games/lottery-control/LotterySettingsPage";
import ActiveLottery from "./pages/games/lottery-control/LotteryUserControlsPage";
import LotteryResults from "./pages/games/lottery-control/LotteryUserDataPage";


export default function App() {
  const [selectedPage, setSelectedPage] = useState("dashboard");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isProfileModalOpen,setIsProfileModalOpen] = useState(false);
  const [activeProfileSection, setActiveProfileSection] = useState("profile");

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  const handleLogin = () => setIsLoggedIn(true);
  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsProfileModalOpen(false);
    setSelectedPage("dashboard");
  };

  const handleProfileClick = (section) => {
    setActiveProfileSection(section);
    setIsProfileModalOpen(true);
  };

  // if (!isLoggedIn) {
  //   return <LoginPage onLogin={handleLogin} isDarkMode={isDarkMode} />;
  // }

  const renderContent = () => {
    switch (selectedPage) {
      case "dashboard":
        return <Dashboard isDarkMode={isDarkMode} />;
      case "game":
        return <Game isDarkMode={isDarkMode} />;
      case "gameLogs":
        return <GameLogs isDarkMode={isDarkMode} />;
      case "activeUsers":
        return <ActiveUsers isDarkMode={isDarkMode} />;
      case "allUsers":
        return <AllUsers isDarkMode={isDarkMode} />;
      case "userPermissions":
        return <UserPermissions isDarkMode={isDarkMode} />;
      case "bannedUsers":
        return <BannedUsers isDarkMode={isDarkMode} />;
      case "pendingDeposits":
        return <PendingDeposits isDarkMode={isDarkMode} />;
      case "approvedDeposits":
        return <ApprovedDeposits isDarkMode={isDarkMode} />;
      case "rejectedDeposits":
        return <RejectedDeposits isDarkMode={isDarkMode} />;
      case "allDeposits":
        return <AllDeposits isDarkMode={isDarkMode} />;
      case "pendingWithdrawals":
        return <PendingWithdrawals isDarkMode={isDarkMode} />;
      case "approvedWithdrawals":
        return <ApprovedWithdrawals isDarkMode={isDarkMode} />;
      case "rejectedWithdrawals":
        return <RejectedWithdrawals isDarkMode={isDarkMode} />;
      case "openTickets":
        return <OpenTickets isDarkMode={isDarkMode} />;
      case "closedTickets":
        return <ClosedTickets isDarkMode={isDarkMode} />;
      case "dailyReport":
        return <DailyReport isDarkMode={isDarkMode} />;
      case "monthlyReport":
        return <MonthlyReport isDarkMode={isDarkMode} />;

      // 🎮 Game pages
      case "ludo":
        return <LudoGame isDarkMode={isDarkMode} />;
      case "jackpot":
        return <JackpotGame isDarkMode={isDarkMode} />;
      case "mines":
        return <MinesGame isDarkMode={isDarkMode} />;
      case "teenPatti":
        return <TeenPattiGame isDarkMode={isDarkMode} />;
      case "lottery":
        return <LotteryPage isDarkMode={isDarkMode} />;

        // Lottery submenu
    case "allLottery":
      return <AllLottery isDarkMode={isDarkMode} />;
    case "activeLottery":
      return <ActiveLottery isDarkMode={isDarkMode} />;
    case "Resultslottery":
      return <LotteryResults isDarkMode={isDarkMode} />; 

      default:
        return <Dashboard isDarkMode={isDarkMode} />;
    }
  };

  return (
    <div
      className={`flex h-screen transition-all duration-300 ${
        isDarkMode ? "bg-gray-900 text-gray-100" : "bg-gray-100 text-gray-900"
      }`}
    >
      <Sidebar
        selectedPage={selectedPage}
        onMenuClick={setSelectedPage}
        isDarkMode={isDarkMode}
      />

      <div className="flex flex-col flex-1">
        <Header
          isDarkMode={isDarkMode}
          toggleDarkMode={toggleDarkMode}
          onLogout={handleLogout}
          onProfileClick={handleProfileClick}
        />
        <div className="flex-1 p-6 overflow-y-auto">{renderContent()}</div>
      </div>

      <ProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        isDarkMode={isDarkMode}
        activeSection={activeProfileSection}
        setActiveSection={setActiveProfileSection}
      />
    </div>
  );
}

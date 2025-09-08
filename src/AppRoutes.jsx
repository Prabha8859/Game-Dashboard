// AppRoutes.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

// Import all your pages like before
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
import LudoGame from "./pages/games/LudoPage";
import JackpotGame from "./pages/games/Jackpotpage";
import MinesGame from "./pages/games/MinesPage";
import TeenPattiGame from "./pages/games/TeenPattiPage";
import LotteryPage from "./pages/games/Lotterypage";
import BirdShooting from './pages/games/BirdShooting';
import AllLottery from "./pages/games/lottery-control/LotterySettingsPage";
import ActiveLottery from "./pages/games/lottery-control/LotteryUserControlsPage";
import LotteryResults from "./pages/games/lottery-control/LotteryUserDataPage";
import Mangejackpots from "./pages/games/Jackpot-control/MangeJackpot";
import Walletjackpot from "./pages/games/Jackpot-control/WalletJackpt";
import Userdatajackpot from "./pages/games/Jackpot-control/UserdataJackpot";
import Logsjackpot from "./pages/games/Jackpot-control/LogsJackpot";
import WalletLudo from './pages/games/Ludo-control/WalletLudo'; 
import TransectionLudo from './pages/games/Ludo-control/TransectionLudo'; 
import GameLudo from './pages/games/Ludo-control/GameLudo';
import ReportLudo from './pages/games/Ludo-control/Report'; 
import UserLudo from './pages/games/Ludo-control/UserLudo'; 
import UserdataLudo from './pages/games/Ludo-control/UserdataLudo';
import MangeMine from './pages/games/Mine-control/GameMonitory';
import WalletMine from './pages/games/Mine-control/WalletMine';
import UserdataMine from './pages/games/Mine-control/UserdataMine';
import ControlAdmin from './pages/games/Mine-control/ControlAdmin';
import MangeTeenpatti from './pages/games/Teenpatti-control/MangeTeenpatti';
import WalletTeenpatti from './pages/games/Teenpatti-control/WalletTeenpatti';
import UserdataTeenpatti from './pages/games/Teenpatti-control/UserdataTeenpatti';
import GamingBird from './pages/games/BirdShooting-Control/GamingBird';
import LobbyMange from './pages/games/BirdShooting-Control/Lobbymange';
import UserDataBird from './pages/games/BirdShooting-Control/UserDatamange';

export default function AppRoutes({ isDarkMode }) {
  return (
     <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/game" element={<Game />} />
      <Route path="/gameLogs" element={<GameLogs />} />
      <Route path="/activeUsers" element={<ActiveUsers />} />
      <Route path="/allUsers" element={<AllUsers />} />
      <Route path="/userPermissions" element={<UserPermissions />} />
      <Route path="/bannedUsers" element={<BannedUsers />} />
      <Route path="/pendingDeposits" element={<PendingDeposits />} />
      <Route path="/approvedDeposits" element={<ApprovedDeposits />} />
      <Route path="/rejectedDeposits" element={<RejectedDeposits />} />
      <Route path="/allDeposits" element={<AllDeposits />} />
      <Route path="/pendingWithdrawals" element={<PendingWithdrawals />} />
      <Route path="/approvedWithdrawals" element={<ApprovedWithdrawals />} />
      <Route path="/rejectedWithdrawals" element={<RejectedWithdrawals />} />
      <Route path="/openTickets" element={<OpenTickets />} />
      <Route path="/closedTickets" element={<ClosedTickets />} />
      <Route path="/dailyReport" element={<DailyReport />} />
      <Route path="/monthlyReport" element={<MonthlyReport />} />
      <Route path="/ludo" element={<LudoGame />} />
      <Route path="/jackpot" element={<JackpotGame />} />
      <Route path="/mines" element={<MinesGame />} />
      <Route path="/teenPatti" element={<TeenPattiGame />} />
      <Route path="/lottery" element={<LotteryPage />} />
      <Route path="/birdshooting" element={<BirdShooting />} />
      <Route path="/allLottery" element={<AllLottery />} />
      <Route path="/activeLottery" element={<ActiveLottery />} />
      <Route path="/Resultslottery" element={<LotteryResults />} />
      <Route path="/mangejackpot" element={<Mangejackpots />} />
      <Route path="/walletjackpot" element={<Walletjackpot />} />
      <Route path="/userdatajackpot" element={<Userdatajackpot />} />
      <Route path="/logsjackpot" element={<Logsjackpot />} />
      <Route path="/walletludo" element={<WalletLudo />} />
      <Route path="/transectionludo" element={<TransectionLudo />} />
      <Route path="/userdataludo" element={<UserdataLudo />} />
      <Route path="/gameludo" element={<GameLudo />} />
      <Route path="/reportludo" element={<ReportLudo />} />
      <Route path="/userludo" element={<UserLudo />} />
      <Route path="/mangemine" element={<MangeMine />} />
      <Route path="/walletMine" element={<WalletMine />} />
      <Route path="/userdatamine" element={<UserdataMine />} />
      <Route path="/controladmin" element={<ControlAdmin />} />
      <Route path="/mangeteenpatti" element={<MangeTeenpatti />} />
      <Route path="/walletteenpatti" element={<WalletTeenpatti />} />
      <Route path="/userdatateenpatti" element={<UserdataTeenpatti />} />
      <Route path="/lobbymange" element={<LobbyMange />} />
      <Route path="/gamingbird" element={<GamingBird />} />
      <Route path="/userdatabird" element={<UserDataBird />} />
    </Routes>
  );
}

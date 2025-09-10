import React from "react";
import { Routes, Route } from "react-router-dom";

// Main Pages
import Dashboard from "../pages/Dashboard";
// import Game from "../pages/Game";
import GameLogs from "../pages/GameLogs";
import ActiveUsers from "../pages/Users/ActiveUsers";
import AllUsers from "../pages/Users/AllUsers";
// import UserPermissions from "../pages/UserPermissions";
import BannedUsers from "../pages/Users/BannedUsers";

// Deposits
import PendingDeposits from "../pages/Deposits/PendingDeposits";
import ApprovedDeposits from "../pages/Deposits/ApprovedDeposits";
import RejectedDeposits from "../pages/Deposits/RejectedDeposits";
import AllDeposits from "../pages/Deposits/AllDeposits";

// Withdrawals
import PendingWithdrawals from "../pages/Withdrawals/PendingWithdrawals";
import ApprovedWithdrawals from "../pages/Withdrawals/ApprovedWithdrawals";
import RejectedWithdrawals from "../pages/Withdrawals/RejectedWithdrawals";

// Support Tickets
import OpenTickets from "../pages/Tickets/OpenTickets";
import ClosedTickets from "../pages/Tickets/ClosedTickets";

// Reports
import DailyReport from "../pages/Reports/DailyReport";
import MonthlyReport from "../pages/Reports/MonthlyReport";

// ------------------------- Games -------------------------

// Ludo

import LudoPage from "../pages/games/LudoPage";
import WalletLudo from "../pages/games/Ludo-control/WalletLudo";
import TransactionLudo from "../pages/games/Ludo-control/Player&Matches";
import GameLudo from "../pages/games/Ludo-control/GameLudo";
import ReportLudo from "../pages/games/Ludo-control/AdminConsole";
import UserLudo from "../pages/games/Ludo-control/UserLudo";
import UserdataLudo from "../pages/games/Ludo-control/UserdataLudo";

// Jackpot

import JackpotPage from "../pages/games/Jackpotpage";
import ManageJackpot from "../pages/games/Jackpot-control/MangeJackpot";
import WalletJackpot from "../pages/games/Jackpot-control/WalletJackpt";
import UserdataJackpot from "../pages/games/Jackpot-control/UserdataJackpot";
import LogsJackpot from "../pages/games/Jackpot-control/LogsJackpot";

// Mines
import MinesPage from "../pages/games/MinesPage";
import ManageMine from "../pages/games/Mine-control/GameMonitory";
import WalletMine from "../pages/games/Mine-control/WalletMine";
import UserdataMine from "../pages/games/Mine-control/UserdataMine";
import ControlAdmin from "../pages/games/Mine-control/ControlAdmin";

// Teen Patti
import TeenPattiPage from "../pages/games/TeenPattiPage";
import ManageTeenpatti from "../pages/games/Teenpatti-control/MangeTeenpatti";
import WalletTeenpatti from "../pages/games/Teenpatti-control/WalletTeenpatti";
import UserdataTeenpatti from "../pages/games/Teenpatti-control/UserdataTeenpatti";

// Lottery
import LotteryPage from "../pages/games/LotteryPage";
import LotterySettings from "../pages/games/lottery-control/LotterySettingsPage";
import LotteryUsers from "../pages/games/lottery-control/LotteryUserControlsPage";
import LotteryResults from "../pages/games/lottery-control/LotteryUserDataPage";

// Bird Shooting

import BirdShootingPage from "../pages/games/BirdShooting";
import GamingBird from "../pages/games/BirdShooting-Control/GamingBird";
import LobbyManage from "../pages/games/BirdShooting-Control/Lobbymange";
import UserDataBird from "../pages/games/BirdShooting-Control/UserDatamange";

export default function AppRoutes({ isDarkMode }) {
  return (
    <Routes>
      {/* Dashboard & Users */}
      <Route path="/" element={<Dashboard isDarkMode={isDarkMode} />} />
      <Route path="/dashboard" element={<Dashboard isDarkMode={isDarkMode} />} />
      {/* <Route path="/game" element={<Game isDarkMode={isDarkMode} />} /> */}
      <Route path="/gamelogs" element={<GameLogs isDarkMode={isDarkMode} />} />
      <Route path="/users/active" element={<ActiveUsers isDarkMode={isDarkMode} />} />
      <Route path="/users/all" element={<AllUsers isDarkMode={isDarkMode} />} />
      <Route path="/users/banned" element={<BannedUsers isDarkMode={isDarkMode} />} />

      {/* Deposits */}
      <Route path="/deposits/pending" element={<PendingDeposits isDarkMode={isDarkMode} />} />
      <Route path="/deposits/approved" element={<ApprovedDeposits isDarkMode={isDarkMode} />} />
      <Route path="/deposits/rejected" element={<RejectedDeposits isDarkMode={isDarkMode} />} />
      <Route path="/deposits/all" element={<AllDeposits isDarkMode={isDarkMode} />} />

      {/* Withdrawals */}
      <Route path="/withdrawals/pending" element={<PendingWithdrawals isDarkMode={isDarkMode} />} />
      <Route path="/withdrawals/approved" element={<ApprovedWithdrawals isDarkMode={isDarkMode} />} />
      <Route path="/withdrawals/rejected" element={<RejectedWithdrawals isDarkMode={isDarkMode} />} />

      {/* Support */}
      <Route path="/tickets/open" element={<OpenTickets isDarkMode={isDarkMode} />} />
      <Route path="/tickets/closed" element={<ClosedTickets isDarkMode={isDarkMode} />} />

      {/* Reports */}
      <Route path="/reports/daily" element={<DailyReport isDarkMode={isDarkMode} />} />
      <Route path="/reports/monthly" element={<MonthlyReport isDarkMode={isDarkMode} />} />

      {/* ---------------- Ludo ---------------- */}
      <Route path="/games/ludo" element={<LudoPage isDarkMode={isDarkMode} />} />
      <Route path="/games/ludo/wallet" element={<WalletLudo isDarkMode={isDarkMode} />} />
      <Route path="/games/ludo/transaction" element={<TransactionLudo isDarkMode={isDarkMode} />} />
      <Route path="/games/ludo/game" element={<GameLudo isDarkMode={isDarkMode} />} />
      <Route path="/games/ludo/report" element={<ReportLudo isDarkMode={isDarkMode} />} />
      <Route path="/games/ludo/users" element={<UserLudo isDarkMode={isDarkMode} />} />
      <Route path="/games/ludo/userdata" element={<UserdataLudo isDarkMode={isDarkMode} />} />

      {/* ---------------- Jackpot ---------------- */}
      <Route path="/games/jackpot" element={<JackpotPage isDarkMode={isDarkMode} />} />
      <Route path="/games/jackpot/manage" element={<ManageJackpot isDarkMode={isDarkMode} />} />
      <Route path="/games/jackpot/wallet" element={<WalletJackpot isDarkMode={isDarkMode} />} />
      <Route path="/games/jackpot/userdata" element={<UserdataJackpot isDarkMode={isDarkMode} />} />
      <Route path="/games/jackpot/logs" element={<LogsJackpot isDarkMode={isDarkMode} />} />

      {/* ---------------- Mines ---------------- */}
      <Route path="/games/mines" element={<MinesPage isDarkMode={isDarkMode} />} />
      <Route path="/games/mines/manage" element={<ManageMine isDarkMode={isDarkMode} />} />
      <Route path="/games/mines/wallet" element={<WalletMine isDarkMode={isDarkMode} />} />
      <Route path="/games/mines/userdata" element={<UserdataMine isDarkMode={isDarkMode} />} />
      <Route path="/games/mines/admin" element={<ControlAdmin isDarkMode={isDarkMode} />} />

      {/* ---------------- Teen Patti ---------------- */}
      <Route path="/games/teenpatti" element={<TeenPattiPage isDarkMode={isDarkMode} />} />
      <Route path="/games/teenpatti/manage" element={<ManageTeenpatti isDarkMode={isDarkMode} />} />
      <Route path="/games/teenpatti/wallet" element={<WalletTeenpatti isDarkMode={isDarkMode} />} />
      <Route path="/games/teenpatti/userdata" element={<UserdataTeenpatti isDarkMode={isDarkMode} />} />

      {/* ---------------- Lottery ---------------- */}
      <Route path="/games/lottery" element={<LotteryPage isDarkMode={isDarkMode} />} />
      <Route path="/games/lottery/manage" element={<LotterySettings isDarkMode={isDarkMode} />} />
      <Route path="/games/lottery/users" element={<LotteryUsers isDarkMode={isDarkMode} />} />
      <Route path="/games/lottery/results" element={<LotteryResults isDarkMode={isDarkMode} />} />

      {/* ---------------- Bird Shooting ---------------- */}
      <Route path="/games/birdshooting" element={<BirdShootingPage isDarkMode={isDarkMode} />} />
      <Route path="/games/birdshooting/manage" element={<GamingBird isDarkMode={isDarkMode} />} />
      <Route path="/games/birdshooting/lobby" element={<LobbyManage isDarkMode={isDarkMode} />} />
      <Route path="/games/birdshooting/userdata" element={<UserDataBird isDarkMode={isDarkMode} />} />
    </Routes>
  );
}

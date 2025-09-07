import React, { useState, useMemo } from "react";
import Swal from "sweetalert2";

const initialGameData = [
  { roomId: "RM101", players: ["Alice", "Bob"], entryFee: 20, status: "Ongoing", winner: "Alice", date: "2025-09-01" },
  { roomId: "RM102", players: ["Charlie", "Dave"], entryFee: 10, status: "Completed", winner: "Dave", date: "2025-09-02" },
  { roomId: "RM103", players: ["Eve", "Frank"], entryFee: 50, status: "Ongoing", winner: null, date: "2025-09-04" },
  { roomId: "RM104", players: ["Grace", "Heidi"], entryFee: 20, status: "Completed", winner: "Grace", date: "2025-09-03" },
  { roomId: "RM105", players: ["Ivan", "Judy"], entryFee: 10, status: "Ongoing", winner: null, date: "2025-09-05" },
 { roomId: "RM106", players: ["Eve", "Frank"], entryFee: 50, status: "Ongoing", winner: null, date: "2025-09-04" },
  { roomId: "RM107", players: ["Grace", "Heidi"], entryFee: 20, status: "Completed", winner: "Grace", date: "2025-09-03" },
  { roomId: "RM108", players: ["Ivan", "Judy"], entryFee: 10, status: "Ongoing", winner: null, date: "2025-09-05" },

 { roomId: "RM109", players: ["Eve", "Frank"], entryFee: 50, status: "Ongoing", winner: null, date: "2025-09-04" },
  { roomId: "RM1010", players: ["Grace", "Heidi"], entryFee: 20, status: "Completed", winner: "Grace", date: "2025-09-03" },
  { roomId: "RM1011", players: ["Ivan", "Judy"], entryFee: 10, status: "Ongoing", winner: null, date: "2025-09-05" },
 { roomId: "RM1012", players: ["Eve", "Frank"], entryFee: 50, status: "Ongoing", winner: null, date: "2025-09-04" },
  { roomId: "RM1014", players: ["Grace", "Heidi"], entryFee: 20, status: "Completed", winner: "Grace", date: "2025-09-03" },
  { roomId: "RM1015", players: ["Ivan", "Judy"], entryFee: 10, status: "Ongoing", winner: null, date: "2025-09-05" },

];

const ITEMS_PER_PAGE = 7;

const LudoGame = () => {
  const [games, setGames] = useState(initialGameData);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [entryFeeFilter, setEntryFeeFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  const handleForceStart = (roomId) => {
    setGames((prev) =>
      prev.map((game) =>
        game.roomId === roomId ? { ...game, status: "Ongoing" } : game
      )
    );
    Swal.fire("Started!", "The game has been started.", "success");
  };

  const handleEndGame = (roomId) => {
    Swal.fire({
      title: "End Game",
      text: "Please enter the winner's name:",
      input: "text",
      inputPlaceholder: "Winner name",
      showCancelButton: true,
      confirmButtonText: "End Game",
      preConfirm: (winner) => {
        if (!winner) {
          Swal.showValidationMessage("Winner name is required!");
        }
        return winner;
      },
    }).then((result) => {
      if (result.isConfirmed) {
        setGames((prev) =>
          prev.map((game) =>
            game.roomId === roomId
              ? { ...game, status: "Completed", winner: result.value }
              : game
          )
        );
        Swal.fire("Ended!", "The game has been ended.", "success");
      }
    });
  };

  const handleSpectate = (game) => {
    Swal.fire({
      title: "Spectate Mode",
      html: `<strong>${game.players[0]}</strong> vs <strong>${game.players[1]}</strong><br><br>Status: <b>${game.status}</b>`,
      icon: "info",
      confirmButtonText: "Close",
    });
  };

  const filteredGames = useMemo(() => {
    return games.filter((game) => {
      const matchesSearch = game.players.join(" ").toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === "All" || game.status === statusFilter;
      const matchesFee = entryFeeFilter === "All" || game.entryFee === parseInt(entryFeeFilter);
      return matchesSearch && matchesStatus && matchesFee;
    });
  }, [searchTerm, statusFilter, entryFeeFilter, games]);

  const totalPages = Math.ceil(filteredGames.length / ITEMS_PER_PAGE);
  const paginatedGames = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredGames.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredGames, currentPage]);

  const goToPage = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  return (
    <div className="min-h-screen p-4 md:p-6 bg-gradient-to-b from-gray-50 to-gray-200 dark:from-gray-900 dark:to-gray-800 text-gray-900 dark:text-gray-100 transition-all">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-blue-800 dark:text-blue-400">🎮 Ludo Games</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:flex gap-3 w-full md:w-auto">
          <input
            type="text"
            placeholder="Search by player name..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="p-2 sm:p-3 w-full md:w-64 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm bg-white dark:bg-gray-800"
          />
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="p-2 sm:p-3 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm bg-white dark:bg-gray-800"
          >
            <option value="All">All Statuses</option>
            <option value="Completed">Completed</option>
            <option value="Ongoing">Ongoing</option>
          </select>
          <select
            value={entryFeeFilter}
            onChange={(e) => {
              setEntryFeeFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="p-2 sm:p-3 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm bg-white dark:bg-gray-800"
          >
            <option value="All">All Entry Fees</option>
            <option value="10">₹10</option>
            <option value="20">₹20</option>
            <option value="50">₹50</option>
          </select>
        </div>
      </div>

      {/* Table */}
     <div className="overflow-x-auto rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
  <table className="w-full table-fixed text-left border-separate border-spacing-y-3 text-xs sm:text-sm ">
    <thead
      style={{
        backgroundImage:
          "linear-gradient(-225deg, #2CD8D5 0%, #6B8DD6 48%, #8E37D7 100%) ",
      }}
      className="text-white"
    >
      <tr>
        <th className="py-2 px-3 sm:py-3 sm:px-5 text-center w-[15%]">Room ID</th>
        <th className="py-2 px-3 sm:py-3 sm:px-5 text-center w-[15%]">Entry Fee</th>
        <th className="py-2 px-3 sm:py-3 sm:px-5 text-center w-[15%]">Status</th>
        <th className="py-2 px-3 sm:py-3 sm:px-5 text-center w-[20%]">Winner</th>
        <th className="py-2 px-3 sm:py-3 sm:px-5 text-center w-[15%]">Date</th>
       <th className="py-2 px-3 sm:py-3 sm:px-5 text-center w-[30%]">Actions</th>

      </tr>
    </thead>
   <tbody>
  {paginatedGames.map((game) => (
    <tr key={game.roomId} className="border-spacing-y-3">
      <td colSpan={6} className="p-0">
        <div className="bg-white dark:bg-gray-800 hover:bg-blue-50 dark:hover:bg-gray-700 shadow-md rounded-lg transition p-3 flex justify-between items-center">
          <div className="w-[15%] text-center">#{game.roomId}</div>
          <div className="w-[15%] text-center">₹{game.entryFee}</div>
          <div className="w-[15%] text-center">
            <span
              className={`px-2 py-1 rounded-full text-xs font-medium ${
                game.status === "Ongoing"
                  ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-800/30 dark:text-yellow-300"
                  : "bg-green-100 text-green-800 dark:bg-green-800/30 dark:text-green-300"
              }`}
            >
              {game.status}
            </span>
          </div>
          <div className="w-[20%] text-center">
            {game.winner || <span className="text-gray-500 italic">TBD</span>}
          </div>
          <div className="w-[15%] text-center">{game.date}</div>
          <div className="w-[20%] flex justify-center gap-2">
            <button
              onClick={() => handleForceStart(game.roomId)}
              className="text-xs py-1 px-2 rounded text-white"
              style={{
                backgroundImage:
                  "linear-gradient(-225deg, #5271C4 0%, #B19FFF 48%, #ECA1FE 100%)",
              }}
            >
              Force Start
            </button>
            <button
              onClick={() => handleEndGame(game.roomId)}
              className="text-xs py-1 px-2 rounded text-white"
              style={{
                backgroundImage:
                  "linear-gradient(-225deg, #FFE29F 0%, #FFA99F 48%, #FF719A 100%)",
              }}
            >
              End Game
            </button>
            <button
              onClick={() => handleSpectate(game)}
              className="text-xs py-1 px-2 rounded text-white"
              style={{
                backgroundImage:
                  "linear-gradient(-225deg, #9EFBD3 0%, #57E9F2 48%, #45D4FB 100%)",
              }}
            >
              Spectate
            </button>
          </div>
        </div>
      </td>
    </tr>
  ))}
</tbody>

  </table>
</div>


      {/* Pagination */}
      <div className="flex flex-wrap justify-center mt-6 gap-2">
        <button onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1} className="px-3 py-1 rounded border bg-white dark:bg-gray-800 disabled:text-gray-400">Prev</button>
        {[...Array(totalPages)].map((_, idx) => {
          const pageNum = idx + 1;
          return (
            <button key={pageNum} onClick={() => goToPage(pageNum)} className={`px-3 py-1 rounded border ${currentPage === pageNum ? "bg-blue-600 text-white" : "bg-white dark:bg-gray-800 hover:bg-blue-100 dark:hover:bg-gray-700"}`}>{pageNum}</button>
          );
        })}
        <button onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages} className="px-3 py-1 rounded border bg-white dark:bg-gray-800 disabled:text-gray-400">Next</button>
      </div>
    </div>
  );
};

export default LudoGame;
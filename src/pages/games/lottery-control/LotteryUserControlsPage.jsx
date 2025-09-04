import React, { useState, useEffect } from 'react';

const AdminControls = () => {
  // State for tickets and winners
  const [tickets, setTickets] = useState([]);
  const [winners, setWinners] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredTickets, setFilteredTickets] = useState([]);
  
  // State for winner form
  const [winnerForm, setWinnerForm] = useState({
    username: '',
    ticketNumber: '',
    prizeAmount: '',
    profileImageUrl: '',
    notes: ''
  });

  // Sample initial data (replace with actual data from API)
  useEffect(() => {
    // Mock ticket data
    const mockTickets = [
      { id: 1, number: 'LT-4892', isSold: true, userId: 'john_doe', purchaseDate: '2023-06-15' },
      { id: 2, number: 'LT-4893', isSold: false, userId: null, purchaseDate: null },
      { id: 3, number: 'LT-4894', isSold: true, userId: 'sara_smith', purchaseDate: '2023-06-16' },
      { id: 4, number: 'LT-4895', isSold: true, userId: 'mike_jones', purchaseDate: '2023-06-17' },
      { id: 5, number: 'LT-4896', isSold: false, userId: null, purchaseDate: null },
      { id: 6, number: 'LT-4897', isSold: true, userId: 'emma_wilson', purchaseDate: '2023-06-18' },
    ];
    
    // Mock winners data
    const mockWinners = [
      { id: 1, username: 'john_doe', ticketNumber: 'LT-4892', prizeAmount: 5000, profileImageUrl: 'https://i.pravatar.cc/150?img=1', notes: 'First prize winner', lotteryId: 'LOT123', drawDate: '2023-06-20' },
      { id: 2, username: 'sara_smith', ticketNumber: 'LT-4894', prizeAmount: 2500, profileImageUrl: 'https://i.pravatar.cc/150?img=2', notes: 'Second prize winner', lotteryId: 'LOT123', drawDate: '2023-06-20' },
    ];
    
    setTickets(mockTickets);
    setFilteredTickets(mockTickets);
    setWinners(mockWinners);
  }, []);

  // Handle search
  useEffect(() => {
    if (searchTerm === '') {
      setFilteredTickets(tickets);
    } else {
      const filtered = tickets.filter(ticket => 
        ticket.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (ticket.userId && ticket.userId.toLowerCase().includes(searchTerm.toLowerCase()))
      );
      setFilteredTickets(filtered);
    }
  }, [searchTerm, tickets]);

  // Toggle ticket status (Sold/Available)
  const toggleTicketStatus = (ticketId) => {
    const updatedTickets = tickets.map(ticket => 
      ticket.id === ticketId ? { ...ticket, isSold: !ticket.isSold } : ticket
    );
    setTickets(updatedTickets);
  };

  // Copy ticket number to clipboard
  const handleCopy = (ticketNumber) => {
    navigator.clipboard.writeText(ticketNumber)
      .then(() => {
        alert('Ticket number copied to clipboard!');
      })
      .catch(err => {
        console.error('Failed to copy: ', err);
      });
  };

  // Export tickets to CSV
  const handleExportCSV = () => {
    const csvContent = [
      ['Ticket Number', 'Status', 'User ID', 'Purchase Date'],
      ...tickets.map(ticket => [
        ticket.number,
        ticket.isSold ? 'Sold' : 'Available',
        ticket.userId || 'N/A',
        ticket.purchaseDate || 'N/A'
      ])
    ].map(e => e.join(',')).join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', 'tickets_export.csv');
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Handle winner form input changes
  const handleWinnerFormChange = (e) => {
    const { name, value } = e.target;
    setWinnerForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Announce winner
  const announceWinner = (e) => {
    e.preventDefault();
    
    // Add validation if needed
    const newWinner = {
      id: winners.length + 1,
      username: winnerForm.username,
      ticketNumber: winnerForm.ticketNumber,
      prizeAmount: winnerForm.prizeAmount,
      profileImageUrl: winnerForm.profileImageUrl,
      notes: winnerForm.notes,
      lotteryId: 'LOT123', // This should come from active lottery
      drawDate: new Date().toISOString().split('T')[0] // Current date
    };
    
    setWinners([...winners, newWinner]);
    clearWinnerForm();
    
    alert('Winner announced successfully!');
  };

  // Clear winner form
  const clearWinnerForm = () => {
    setWinnerForm({
      username: '',
      ticketNumber: '',
      prizeAmount: '',
      profileImageUrl: '',
      notes: ''
    });
  };

  // Delete winner
  const deleteWinner = (winnerId) => {
    if (window.confirm('Are you sure you want to delete this winner?')) {
      const updatedWinners = winners.filter(winner => winner.id !== winnerId);
      setWinners(updatedWinners);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Controls - Active Lottery</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 px-4 sm:px-0 mb-8">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-indigo-500 rounded-md p-3">
                  <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Total Tickets</dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900">{tickets.length}</div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-green-500 rounded-md p-3">
                  <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Sold Tickets</dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900">
                        {tickets.filter(ticket => ticket.isSold).length}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-yellow-500 rounded-md p-3">
                  <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Available Tickets</dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900">
                        {tickets.filter(ticket => !ticket.isSold).length}
                      </div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-red-500 rounded-md p-3">
                  <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">Total Winners</dt>
                    <dd className="flex items-baseline">
                      <div className="text-2xl font-semibold text-gray-900">{winners.length}</div>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Ticket Controls Section */}
        <div className="bg-white shadow rounded-lg mb-8">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Ticket Controls</h2>
            <p className="mt-1 text-sm text-gray-500">Manage and monitor all lottery tickets</p>
          </div>
          
          <div className="px-4 py-5 sm:p-6">
            {/* Search Section */}
            <div className="mb-6">
              <div className="flex items-center mb-4">
                <div className="relative flex-1">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    placeholder="Search tickets or users..."
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <button 
                  className="ml-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  onClick={() => setSearchTerm('')}
                >
                  Clear
                </button>
              </div>
              
              <div className="flex space-x-4">
                <button 
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  onClick={handleExportCSV}
                >
                  <svg className="-ml-1 mr-2 h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V8z" clipRule="evenodd" />
                  </svg>
                  Export Tickets CSV
                </button>
              </div>
            </div>
            
            {/* Tickets Table */}
            <div className="overflow-hidden border border-gray-200 rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ticket Number</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User ID</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Purchase Date</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredTickets.map(ticket => (
                    <tr key={ticket.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{ticket.number}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${ticket.isSold ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                          {ticket.isSold ? 'Sold' : 'Available'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{ticket.userId || 'N/A'}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{ticket.purchaseDate || 'N/A'}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                        <button 
                          className={`text-white px-3 py-1 rounded-md text-xs ${ticket.isSold ? 'bg-yellow-600 hover:bg-yellow-700' : 'bg-blue-600 hover:bg-blue-700'}`}
                          onClick={() => toggleTicketStatus(ticket.id)}
                        >
                          {ticket.isSold ? 'Mark Available' : 'Mark Sold'}
                        </button>
                        <button 
                          className="text-white px-3 py-1 bg-gray-600 rounded-md text-xs hover:bg-gray-700"
                          onClick={() => handleCopy(ticket.number)}
                        >
                          Copy
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        
        {/* Declare Winner Section */}
        <div className="bg-white shadow rounded-lg mb-8">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Declare Winner</h2>
            <p className="mt-1 text-sm text-gray-500">Announce a new winner for the lottery</p>
          </div>
          
          <div className="px-4 py-5 sm:p-6">
            <form onSubmit={announceWinner} className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="username"
                    id="username"
                    value={winnerForm.username}
                    onChange={handleWinnerFormChange}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    required
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="ticketNumber" className="block text-sm font-medium text-gray-700">Ticket Number</label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="ticketNumber"
                    id="ticketNumber"
                    value={winnerForm.ticketNumber}
                    onChange={handleWinnerFormChange}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    required
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="prizeAmount" className="block text-sm font-medium text-gray-700">Prize Amount ($)</label>
                <div className="mt-1">
                  <input
                    type="number"
                    name="prizeAmount"
                    id="prizeAmount"
                    value={winnerForm.prizeAmount}
                    onChange={handleWinnerFormChange}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    required
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="profileImageUrl" className="block text-sm font-medium text-gray-700">Profile Image URL</label>
                <div className="mt-1">
                  <input
                    type="url"
                    name="profileImageUrl"
                    id="profileImageUrl"
                    value={winnerForm.profileImageUrl}
                    onChange={handleWinnerFormChange}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>

              <div className="sm:col-span-6">
                <label htmlFor="notes" className="block text-sm font-medium text-gray-700">Notes</label>
                <div className="mt-1">
                  <textarea
                    id="notes"
                    name="notes"
                    rows={3}
                    value={winnerForm.notes}
                    onChange={handleWinnerFormChange}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  ></textarea>
                </div>
              </div>

              <div className="sm:col-span-6 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={clearWinnerForm}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Clear Form
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Announce Winner
                </button>
              </div>
            </form>
          </div>
        </div>
        
        {/* Winners List Section */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Winners List</h2>
            <p className="mt-1 text-sm text-gray-500">All declared winners for the lottery</p>
          </div>
          
          <div className="px-4 py-5 sm:p-6">
            <div className="overflow-hidden border border-gray-200 rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Winner</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ticket Number</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Prize Amount</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Draw Date</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Notes</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {winners.map(winner => (
                    <tr key={winner.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <img className="h-10 w-10 rounded-full" src={winner.profileImageUrl} alt="" />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{winner.username}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{winner.ticketNumber}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${winner.prizeAmount}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{winner.drawDate}</td>
                      <td className="px-6 py-4 text-sm text-gray-500">{winner.notes}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button 
                          className="text-red-600 hover:text-red-900"
                          onClick={() => deleteWinner(winner.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminControls;
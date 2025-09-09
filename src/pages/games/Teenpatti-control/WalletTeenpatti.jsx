import React, { useState, useEffect } from "react";
// All components are defined within this single file to make it self-contained.

// Tailwind CSS is assumed to be available. We will use the Tailwind class names directly.
// The "use client" directive is at the top of the file as per the original code.

// Re-implementing shadcn/ui components with simple Tailwind CSS and Divs
const Card = ({ children, className }) => (
  <div className={`rounded-lg border bg-white text-card-foreground shadow-sm ${className}`}>
    {children}
  </div>
);
const CardHeader = ({ children, className }) => (
  <div className={`flex flex-col space-y-1.5 p-4 ${className}`}>
    {children}
  </div>
);
const CardTitle = ({ children, className }) => (
  <h3 className={`font-semibold tracking-tight text-lg ${className}`}>
    {children}
  </h3>
);
const CardDescription = ({ children, className }) => (
  <p className={`text-sm text-muted-foreground ${className}`}>
    {children}
  </p>
);
const CardContent = ({ children, className }) => (
  <div className={`p-4 pt-0 ${className}`}>
    {children}
  </div>
);

const Button = ({ children, className, variant, size, onClick, ...props }) => {
  let baseClasses = "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50";
  let variantClasses = "";
  let sizeClasses = "";

  switch (variant) {
    case "outline":
      variantClasses = "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground";
      break;
    case "destructive":
      variantClasses = "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90";
      break;
    case "secondary":
      variantClasses = "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80";
      break;
    default: // default is primary
      variantClasses = "bg-primary text-primary-foreground shadow hover:bg-primary/90";
      break;
  }

  switch (size) {
    case "sm":
      sizeClasses = "h-8 px-3 text-xs";
      break;
    default: // default is default
      sizeClasses = "h-9 px-4 py-2";
      break;
  }

  return (
    <button
      className={`${baseClasses} ${variantClasses} ${sizeClasses} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

const Badge = ({ children, variant, className }) => {
  let baseClasses = "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2";
  let variantClasses = "";
  switch (variant) {
    case "destructive":
      variantClasses = "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80";
      break;
    case "secondary":
      variantClasses = "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80";
      break;
    default:
      variantClasses = "border-transparent bg-primary text-primary-foreground hover:bg-primary/80";
      break;
  }
  return (
    <div className={`${baseClasses} ${variantClasses} ${className}`}>
      {children}
    </div>
  );
};

const Input = ({ className, ...props }) => (
  <input
    className={`flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    {...props}
  />
);

const Select = ({ value, onValueChange, children, placeholder, className }) => (
  <select
    value={value}
    onChange={(e) => onValueChange(e.target.value)}
    className={`flex h-9 w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-1 focus:ring-ring ${className}`}
  >
    <option value="all" disabled>{placeholder}</option>
    {children}
  </select>
);

const SelectItem = ({ value, children }) => (
  <option value={value}>{children}</option>
);

const Tabs = ({ children, defaultValue, className }) => {
  const [activeTab, setActiveTab] = useState(defaultValue);
  const tabsWithProps = React.Children.map(children, child => {
    if (child.type === TabsList) {
      return React.cloneElement(child, { activeTab, setActiveTab });
    }
    if (child.type === TabsContent) {
      return React.cloneElement(child, { activeTab });
    }
    return child;
  });
  return <div className={className}>{tabsWithProps}</div>;
};

const TabsList = ({ children, activeTab, setActiveTab, className }) => (
  <div className={`flex border-b border-gray-200 ${className}`}>
    {React.Children.map(children, child =>
      React.cloneElement(child, { activeTab, setActiveTab })
    )}
  </div>
);

const TabsTrigger = ({ children, value, activeTab, setActiveTab }) => (
  <button
    onClick={() => setActiveTab(value)}
    className={`px-4 py-2 text-sm font-medium transition-colors border-b-2 focus:outline-none ${value === activeTab ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
  >
    {children}
  </button>
);

const TabsContent = ({ children, value, activeTab }) => (
  <div
    className={`mt-2 ${value !== activeTab ? 'hidden' : ''}`}
  >
    {children}
  </div>
);

const Table = ({ children, className }) => (
  <div className="w-full overflow-auto">
    <table className={`w-full caption-bottom text-sm ${className}`}>{children}</table>
  </div>
);
const TableHeader = ({ children, className }) => <thead className={`[&_tr]:border-b ${className}`}>{children}</thead>;
const TableBody = ({ children, className }) => <tbody className={`[&_tr:last-child]:border-0 ${className}`}>{children}</tbody>;
const TableRow = ({ children, className }) => <tr className={`border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted ${className}`}>{children}</tr>;
const TableHead = ({ children, className }) => (
  <th className={`h-10 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 ${className}`}>
    {children}
  </th>
);
const TableCell = ({ children, className }) => (
  <td className={`p-4 align-middle [&:has([role=checkbox])]:pr-0 ${className}`}>
    {children}
  </td>
);

// Inline SVG icons to replace lucide-react
const ArrowUpCircle = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx="12" cy="12" r="10" />
    <path d="m16 12-4-4-4 4" />
  </svg>
);
const ArrowDownCircle = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx="12" cy="12" r="10" />
    <path d="m8 12 4 4 4-4" />
  </svg>
);
const Gamepad2 = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <line x1="6" x2="10" y1="12" y2="12" />
    <line x1="8" x2="8" y1="10" y2="14" />
    <line x1="15" x2="15.01" y1="13" y2="13" />
    <line x1="18" x2="18.01" y1="11" y2="11" />
    <rect width="20" height="12" x="2" y="6" rx="2" />
  </svg>
);
const Percent = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <line x1="19" x2="5" y1="5" y2="19" />
    <circle cx="6.5" cy="6.5" r="2.5" />
    <circle cx="17.5" cy="17.5" r="2.5" />
  </svg>
);
const Trophy = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
    <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
    <path d="M4 22h16" />
    <path d="M10 14.66V16c0 .55-.47.98-.97 1.21C7.85 17.75 7 18.24 7 19v1c0 .27.2.55.5.74.3.2.8.26 1.1.26M14 14.66V16c0 .55.47.98.97 1.21C16.15 17.75 17 18.24 17 19v1c0 .27-.2.55-.5.74-.3.2-.8.26-1.1.26" />
    <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
  </svg>
);
const Clock = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);
const Search = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.3-4.3" />
  </svg>
);
const Filter = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
  </svg>
);
const Download = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" x2="12" y1="15" y2="3" />
  </svg>
);
const CheckCircle = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);
const XCircle = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx="12" cy="12" r="10" />
    <path d="m15 9-6 6" />
    <path d="m9 9 6 6" />
  </svg>
);

// Helper function to format date
const formatDate = (timestamp) => {
  const date = new Date(timestamp);
  return date.toLocaleString();
};

const mockTransactions = {
  deposits: [
    {
      id: "DEP001",
      userId: "USER1234",
      userName: "RoyalFlush_King",
      amount: 5000,
      status: "completed",
      timestamp: "2024-01-15 14:30:25",
      method: "UPI",
    },
    {
      id: "DEP002",
      userId: "USER5678",
      userName: "CardMaster99",
      amount: 2500,
      status: "pending",
      timestamp: "2024-01-15 14:25:10",
      method: "Bank Transfer",
    },
    {
      id: "DEP003",
      userId: "USER9012",
      userName: "TeenPatti_Pro",
      amount: 10000,
      status: "completed",
      timestamp: "2024-01-15 14:20:45",
      method: "Wallet",
    },
  ],
  withdrawals: [
    {
      id: "WTH001",
      userId: "USER3456",
      userName: "LuckyPlayer",
      amount: 7500,
      status: "pending",
      timestamp: "2024-01-15 14:15:30",
      method: "Bank Transfer",
    },
    {
      id: "WTH002",
      userId: "USER7890",
      userName: "PokerFace",
      amount: 3200,
      status: "completed",
      timestamp: "2024-01-15 14:10:15",
      method: "UPI",
    },
    {
      id: "WTH003",
      userId: "USER2468",
      userName: "WinnerCircle",
      amount: 15000,
      status: "rejected",
      timestamp: "2024-01-15 14:05:00",
      method: "Bank Transfer",
    },
  ],
  bets: [
    {
      id: "BET001",
      userId: "USER1234",
      userName: "RoyalFlush_King",
      tableId: "TABLE45",
      amount: 500,
      status: "settled",
      timestamp: "2024-01-15 14:35:20",
      result: "won",
    },
    {
      id: "BET002",
      userId: "USER5678",
      userName: "CardMaster99",
      tableId: "TABLE12",
      amount: 1000,
      status: "active",
      timestamp: "2024-01-15 14:34:55",
      result: "pending",
    },
    {
      id: "BET003",
      userId: "USER9012",
      userName: "TeenPatti_Pro",
      tableId: "TABLE78",
      amount: 750,
      status: "settled",
      timestamp: "2024-01-15 14:33:40",
      result: "lost",
    },
  ],
  commissions: [
    {
      id: "COM001",
      tableId: "TABLE45",
      totalBets: 25000,
      commissionRate: 5,
      amount: 1250,
      timestamp: "2024-01-15 14:30:00",
    },
    {
      id: "COM002",
      tableId: "TABLE12",
      totalBets: 18000,
      commissionRate: 5,
      amount: 900,
      timestamp: "2024-01-15 14:25:00",
    },
    {
      id: "COM003",
      tableId: "TABLE78",
      totalBets: 32000,
      commissionRate: 7,
      amount: 2240,
      timestamp: "2024-01-15 14:20:00",
    },
  ],
  payouts: [
    {
      id: "PAY001",
      userId: "USER1234",
      userName: "RoyalFlush_King",
      betId: "BET001",
      amount: 1500,
      status: "completed",
      timestamp: "2024-01-15 14:36:00",
    },
    {
      id: "PAY002",
      userId: "USER3456",
      userName: "LuckyPlayer",
      betId: "BET045",
      amount: 2250,
      status: "processing",
      timestamp: "2024-01-15 14:32:15",
    },
    {
      id: "PAY003",
      userId: "USER7890",
      userName: "PokerFace",
      betId: "BET078",
      amount: 800,
      status: "completed",
      timestamp: "2024-01-15 14:28:30",
    },
  ],
};

const fetchTransactions = async () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(mockTransactions);
    }, 1500); // 1.5 second delay to simulate network latency
  });
};

export default function App() {
  const [transactions, setTransactions] = useState(null);
  const [summaries, setSummaries] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");
  const [filteredData, setFilteredData] = useState(null);

  // useEffect to fetch the mock data once on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchTransactions();
        setTransactions(data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load data.");
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Calculate summaries dynamically
  useEffect(() => {
    if (transactions) {
      const todayDeposits = transactions.deposits.reduce((sum, t) => sum + t.amount, 0);
      const todayWithdrawals = transactions.withdrawals.reduce((sum, t) => sum + t.amount, 0);
      const commissionEarned = transactions.commissions.reduce((sum, c) => sum + c.amount, 0);
      const pendingCount = transactions.deposits.filter(t => t.status === 'pending').length +
        transactions.withdrawals.filter(t => t.status === 'pending').length;

      setSummaries({
        deposits: { amount: todayDeposits, count: transactions.deposits.length },
        withdrawals: { amount: todayWithdrawals, count: transactions.withdrawals.length },
        commission: { amount: commissionEarned, count: transactions.commissions.length },
        pending: pendingCount,
      });
    }
  }, [transactions]);

  // useEffect to handle filtering whenever search or filter states change
  useEffect(() => {
    if (!transactions) {
      return; // Exit if transactions data is not yet loaded
    }

    const filterByDate = (item) => {
      const today = "2024-01-15"; // Hardcoded for mock data
      switch (dateFilter) {
        case "today":
          return item.timestamp.startsWith(today);
        case "yesterday":
          return false; // No data for yesterday in mock
        case "week":
        case "month":
          return true;
        default:
          return true;
      }
    };

    const filterBySearch = (item) => {
      const lowerCaseSearchTerm = searchTerm.toLowerCase();
      return Object.values(item).some(
        (value) =>
          typeof value === "string" &&
          value.toLowerCase().includes(lowerCaseSearchTerm)
      );
    };

    const filterByStatus = (item) => {
      return statusFilter === "all" || item.status === statusFilter;
    };

    const newFilteredData = {
      deposits: transactions.deposits
        .filter(filterBySearch)
        .filter(filterByStatus)
        .filter(filterByDate),
      withdrawals: transactions.withdrawals
        .filter(filterBySearch)
        .filter(filterByStatus)
        .filter(filterByDate),
      bets: transactions.bets
        .filter(filterBySearch)
        .filter(filterByStatus)
        .filter(filterByDate),
      commissions: transactions.commissions
        .filter(filterBySearch)
        .filter(filterByDate), // Commissions don't have a status
      payouts: transactions.payouts
        .filter(filterBySearch)
        .filter(filterByStatus)
        .filter(filterByDate),
      // Combine pending transactions for the pending tab
      pending: [
        ...transactions.deposits.filter((t) => t.status === "pending"),
        ...transactions.withdrawals.filter((t) => t.status === "pending"),
      ].filter(filterBySearch).filter(filterByDate),
    };

    setFilteredData(newFilteredData);
  }, [searchTerm, statusFilter, dateFilter, transactions]);

  const getStatusBadge = (status) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-100 text-green-800 border-green-200">Completed</Badge>;
      case "pending":
      case "processing":
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Pending</Badge>;
      case "rejected":
        return <Badge className="bg-red-100 text-red-800 border-red-200">Rejected</Badge>;
      case "active":
        return <Badge className="bg-blue-100 text-blue-800 border-blue-200">Active</Badge>;
      case "settled":
        return <Badge className="bg-gray-100 text-gray-800 border-gray-200">Settled</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getResultBadge = (result) => {
    switch (result) {
      case "won":
        return <Badge className="bg-green-100 text-green-800 border-green-200">Won</Badge>;
      case "lost":
        return <Badge className="bg-red-100 text-red-800 border-red-200">Lost</Badge>;
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">Pending</Badge>;
      default:
        return <Badge variant="outline">{result}</Badge>;
    }
  };

  // Check if data is loading or if there's an error
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        <p className="ml-4 text-gray-700 font-medium">Loading data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="text-red-500 text-center">
          <h2 className="text-2xl font-bold mb-2">Error</h2>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Transactions & Wallet Management
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Track all money movements and financial activities
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Advanced Filter
          </Button>
        </div>
      </div>

      {/* Summary Cards - Smaller with top border color */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-t-4 border-green-600">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Deposits Today
            </CardTitle>
            <ArrowUpCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold text-green-600">₹{summaries.deposits?.amount.toLocaleString()}</div>
            <p className="text-xs text-gray-500">{summaries.deposits?.count} transactions</p>
          </CardContent>
        </Card>

        <Card className="border-t-4 border-red-600">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Withdrawals Today
            </CardTitle>
            <ArrowDownCircle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold text-red-600">₹{summaries.withdrawals?.amount.toLocaleString()}</div>
            <p className="text-xs text-gray-500">{summaries.withdrawals?.count} transactions</p>
          </CardContent>
        </Card>

        <Card className="border-t-4 border-blue-600">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Commission Earned
            </CardTitle>
            <Percent className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold text-blue-600">₹{summaries.commission?.amount.toLocaleString()}</div>
            <p className="text-xs text-gray-500">From {summaries.commission?.count} tables</p>
          </CardContent>
        </Card>

        <Card className="border-t-4 border-yellow-600">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Pending Approvals
            </CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-xl font-bold text-yellow-600">
              {summaries.pending}
            </div>
            <p className="text-xs text-gray-500">Requires action</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters - Improved layout */}
      <Card className="rounded-lg">
        <CardContent className="pt-4">
          <div className="flex flex-col gap-4 md:flex-row md:items-end">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Search by user ID, transaction ID, or username..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 rounded-md"
                />
              </div>
            </div>
            <div className="w-full md:w-[180px]">
              <label className="block text-sm font-medium text-gray-700 mb-1">Filter by status</label>
              <Select value={statusFilter} onValueChange={setStatusFilter} placeholder="Filter by status">
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="processing">Processing</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </Select>
            </div>
            <div className="w-full md:w-[180px]">
              <label className="block text-sm font-medium text-gray-700 mb-1">Filter by date</label>
              <Select value={dateFilter} onValueChange={setDateFilter} placeholder="Filter by date">
                <SelectItem value="all">All Dates</SelectItem>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="yesterday">Yesterday</SelectItem>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Transactions Tabs - Improved with underline design */}
      {filteredData && (
        <Tabs defaultValue="deposits" className="space-y-4">
          <TabsList>
            <TabsTrigger value="deposits">Deposits</TabsTrigger>
            <TabsTrigger value="withdrawals">Withdrawals</TabsTrigger>
            <TabsTrigger value="bets">Bets</TabsTrigger>
            <TabsTrigger value="commissions">Commission</TabsTrigger>
            <TabsTrigger value="payouts">Payouts</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
          </TabsList>

          <TabsContent value="deposits">
            <Card className="rounded-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ArrowUpCircle className="h-5 w-5 text-green-600" />
                  User Deposits
                </CardTitle>
                <CardDescription>Money added to user wallets</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Transaction ID</TableHead>
                      <TableHead>User</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Method</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Timestamp</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredData.deposits.length > 0 ? (
                      filteredData.deposits.map((transaction) => (
                        <TableRow key={transaction.id}>
                          <TableCell className="font-mono text-sm">{transaction.id}</TableCell>
                          <TableCell>
                            <div className="font-medium">{transaction.userName}</div>
                            <div className="text-xs text-gray-500">{transaction.userId}</div>
                          </TableCell>
                          <TableCell className="font-semibold text-green-600">
                            ₹{transaction.amount.toLocaleString()}
                          </TableCell>
                          <TableCell>{transaction.method}</TableCell>
                          <TableCell>{getStatusBadge(transaction.status)}</TableCell>
                          <TableCell className="text-sm">{transaction.timestamp}</TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              {transaction.status === "pending" && (
                                <>
                                  <Button size="sm" variant="outline" className="h-8">
                                    <CheckCircle className="h-3 w-3 mr-1" />
                                    Approve
                                  </Button>
                                  <Button size="sm" variant="outline" className="h-8">
                                    <XCircle className="h-3 w-3 mr-1" />
                                    Reject
                                  </Button>
                                </>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center text-gray-500 py-6">
                          No deposits found.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="withdrawals">
            <Card className="rounded-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ArrowDownCircle className="h-5 w-5 text-red-600" />
                  User Withdrawals
                </CardTitle>
                <CardDescription>Money withdrawn from user wallets</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Transaction ID</TableHead>
                      <TableHead>User</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Method</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Timestamp</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredData.withdrawals.length > 0 ? (
                      filteredData.withdrawals.map((transaction) => (
                        <TableRow key={transaction.id}>
                          <TableCell className="font-mono text-sm">{transaction.id}</TableCell>
                          <TableCell>
                            <div className="font-medium">{transaction.userName}</div>
                            <div className="text-xs text-gray-500">{transaction.userId}</div>
                          </TableCell>
                          <TableCell className="font-semibold text-red-600">
                            ₹{transaction.amount.toLocaleString()}
                          </TableCell>
                          <TableCell>{transaction.method}</TableCell>
                          <TableCell>{getStatusBadge(transaction.status)}</TableCell>
                          <TableCell className="text-sm">{transaction.timestamp}</TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              {transaction.status === "pending" && (
                                <>
                                  <Button size="sm" variant="outline" className="h-8">
                                    <CheckCircle className="h-3 w-3 mr-1" />
                                    Approve
                                  </Button>
                                  <Button size="sm" variant="outline" className="h-8">
                                    <XCircle className="h-3 w-3 mr-1" />
                                    Reject
                                  </Button>
                                </>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center text-gray-500 py-6">
                          No withdrawals found.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="bets">
            <Card className="rounded-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Gamepad2 className="h-5 w-5 text-blue-600" />
                  Bets Collection
                </CardTitle>
                <CardDescription>All table entry bets and game participation</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Bet ID</TableHead>
                      <TableHead>User</TableHead>
                      <TableHead>Table</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Result</TableHead>
                      <TableHead>Timestamp</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredData.bets.length > 0 ? (
                      filteredData.bets.map((bet) => (
                        <TableRow key={bet.id}>
                          <TableCell className="font-mono text-sm">{bet.id}</TableCell>
                          <TableCell>
                            <div className="font-medium">{bet.userName}</div>
                            <div className="text-xs text-gray-500">{bet.userId}</div>
                          </TableCell>
                          <TableCell className="font-mono text-sm">{bet.tableId}</TableCell>
                          <TableCell className="font-semibold">₹{bet.amount.toLocaleString()}</TableCell>
                          <TableCell>{getStatusBadge(bet.status)}</TableCell>
                          <TableCell>{getResultBadge(bet.result)}</TableCell>
                          <TableCell className="text-sm">{bet.timestamp}</TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center text-gray-500 py-6">
                          No bets found.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="commissions">
            <Card className="rounded-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Percent className="h-5 w-5 text-blue-600" />
                  Commission Earned
                </CardTitle>
                <CardDescription>Admin commission from table activities</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Commission ID</TableHead>
                      <TableHead>Table ID</TableHead>
                      <TableHead>Total Bets</TableHead>
                      <TableHead>Rate (%)</TableHead>
                      <TableHead>Commission Amount</TableHead>
                      <TableHead>Timestamp</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredData.commissions.length > 0 ? (
                      filteredData.commissions.map((commission) => (
                        <TableRow key={commission.id}>
                          <TableCell className="font-mono text-sm">{commission.id}</TableCell>
                          <TableCell className="font-mono text-sm">{commission.tableId}</TableCell>
                          <TableCell>₹{commission.totalBets.toLocaleString()}</TableCell>
                          <TableCell>{commission.commissionRate}%</TableCell>
                          <TableCell className="font-semibold text-blue-600">
                            ₹{commission.amount.toLocaleString()}
                          </TableCell>
                          <TableCell className="text-sm">{commission.timestamp}</TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center text-gray-500 py-6">
                          No commissions found.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="payouts">
            <Card className="rounded-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-green-600" />
                  Payouts to Winners
                </CardTitle>
                <CardDescription>Winnings distributed to players</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Payout ID</TableHead>
                      <TableHead>Winner</TableHead>
                      <TableHead>Bet ID</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Timestamp</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredData.payouts.length > 0 ? (
                      filteredData.payouts.map((payout) => (
                        <TableRow key={payout.id}>
                          <TableCell className="font-mono text-sm">{payout.id}</TableCell>
                          <TableCell>
                            <div className="font-medium">{payout.userName}</div>
                            <div className="text-xs text-gray-500">{payout.userId}</div>
                          </TableCell>
                          <TableCell className="font-mono text-sm">{payout.betId}</TableCell>
                          <TableCell className="font-semibold text-green-600">
                            ₹{payout.amount.toLocaleString()}
                          </TableCell>
                          <TableCell>{getStatusBadge(payout.status)}</TableCell>
                          <TableCell className="text-sm">{payout.timestamp}</TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center text-gray-500 py-6">
                          No payouts found.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="pending">
            <Card className="rounded-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-yellow-600" />
                  Pending Transactions
                </CardTitle>
                <CardDescription>Transactions requiring approval</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredData.pending.length > 0 ? (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>ID</TableHead>
                          <TableHead>User</TableHead>
                          <TableHead>Amount</TableHead>
                          <TableHead>Method/Type</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredData.pending.map((transaction) => (
                          <TableRow key={transaction.id}>
                            <TableCell className="font-mono text-sm">{transaction.id}</TableCell>
                            <TableCell>
                              <div className="font-medium">{transaction.userName}</div>
                              <div className="text-xs text-gray-500">{transaction.userId}</div>
                            </TableCell>
                            <TableCell className={`font-semibold ${transaction.id.startsWith('DEP') ? 'text-green-600' : 'text-red-600'}`}>
                              ₹{transaction.amount.toLocaleString()}
                            </TableCell>
                            <TableCell>{transaction.id.startsWith('DEP') ? `Deposit (${transaction.method})` : `Withdrawal (${transaction.method})`}</TableCell>
                            <TableCell>
                              <div className="flex gap-2">
                                <Button size="sm" className="h-8">
                                  <CheckCircle className="h-3 w-3 mr-1" />
                                  Approve
                                </Button>
                                <Button size="sm" variant="destructive" className="h-8">
                                  <XCircle className="h-3 w-3 mr-1" />
                                  Reject
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  ) : (
                    <p className="text-center text-gray-500 py-6">
                      No pending transactions found.
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}
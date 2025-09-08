import React, { useState, useEffect } from "react";
// All components are defined within this single file to make it self-contained.

// Tailwind CSS is assumed to be available. We will use the Tailwind class names directly.
// The "use client" directive is at the top of the file as per the original code.

// Re-implementing shadcn/ui components with simple Tailwind CSS and Divs
const Card = ({ children, className }) => (
  <div className={`rounded-lg border bg-card text-card-foreground shadow-sm ${className}`}>
    {children}
  </div>
);
const CardHeader = ({ children, className }) => (
  <div className={`flex flex-col space-y-1.5 p-6 ${className}`}>
    {children}
  </div>
);
const CardTitle = ({ children, className }) => (
  <h3 className={`font-semibold tracking-tight text-xl ${className}`}>
    {children}
  </h3>
);
const CardDescription = ({ children, className }) => (
  <p className={`text-sm text-muted-foreground ${className}`}>
    {children}
  </p>
);
const CardContent = ({ children, className }) => (
  <div className={`p-6 pt-0 ${className}`}>
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

const Select = ({ value, onValueChange, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="relative">
      <div onClick={() => setIsOpen(!isOpen)}>{children[0]}</div>
      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-popover border rounded-md shadow-lg">{children[1]}</div>
      )}
    </div>
  );
};
const SelectTrigger = ({ children, className }) => (
  <div className={`flex h-9 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 ${className}`}>
    {children}
  </div>
);
const SelectValue = ({ placeholder }) => <span>{placeholder}</span>;
const SelectContent = ({ children }) => <div>{children}</div>;
const SelectItem = ({ value, children, onSelect }) => (
  <div
    className="relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
    onClick={() => onSelect(value)}
  >
    {children}
  </div>
);

const Tabs = ({ children, defaultValue, ...props }) => {
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
  return <div {...props}>{tabsWithProps}</div>;
};
const TabsList = ({ children, activeTab, setActiveTab, className }) => (
  <div className={`inline-flex h-9 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground ${className}`}>
    {React.Children.map(children, child =>
      React.cloneElement(child, { activeTab, setActiveTab })
    )}
  </div>
);
const TabsTrigger = ({ children, value, activeTab, setActiveTab }) => (
  <button
    onClick={() => setActiveTab(value)}
    className={`inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow ${value === activeTab ? 'data-[state=active]' : ''}`}
  >
    {children}
  </button>
);
const TabsContent = ({ children, value, activeTab }) => (
  <div
    className={`mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${value !== activeTab ? 'hidden' : ''}`}
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
  <th className={`h-10 px-2 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px] ${className}`}>
    {children}
  </th>
);
const TableCell = ({ children, className }) => (
  <td className={`p-2 align-middle [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px] ${className}`}>
    {children}
  </td>
);

// Inline SVG icons to replace lucide-react
const ArrowUpCircle = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx="12" cy="12" r="10" />
    <path d="m12 16-4-4h8l-4-4" />
  </svg>
);
const ArrowDownCircle = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx="12" cy="12" r="10" />
    <path d="m12 8 4 4-4 4-4-4" />
  </svg>
);
const Gamepad2 = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M6 12h4m-2-2v4" />
    <path d="M15 13a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
    <path d="M18 15a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
    <rect width="20" height="12" x="2" y="6" rx="2" ry="2" />
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
    <path d="M20 9a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2z" />
    <path d="M12 18v3" />
    <path d="M17 18h2" />
    <path d="M5 18h2" />
    <path d="M12 9a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />
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
    <path d="M22 11.08V12a10 10 0 1 1-5.93-8.8" />
    <path d="M22 4 12 14.01l-3-3" />
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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");
  const [activeTab, setActiveTab] = useState("deposits");
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
        return <Badge className="bg-green-600 text-white">Completed</Badge>;
      case "pending":
      case "processing":
        return <Badge className="bg-yellow-600 text-white">Pending</Badge>;
      case "rejected":
        return <Badge variant="destructive">Rejected</Badge>;
      case "active":
        return <Badge className="bg-blue-600 text-white">Active</Badge>;
      case "settled":
        return <Badge variant="secondary">Settled</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getResultBadge = (result) => {
    switch (result) {
      case "won":
        return <Badge className="bg-green-600 text-white">Won</Badge>;
      case "lost":
        return <Badge variant="destructive">Lost</Badge>;
      case "pending":
        return <Badge className="bg-yellow-600 text-white">Pending</Badge>;
      default:
        return <Badge variant="outline">{result}</Badge>;
    }
  };

  // Check if data is loading or if there's an error
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
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
    <div className="p-4 space-y-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Transactions & Wallet Management
          </h1>
          <p className="text-sm text-gray-500">
            Track all money movements and financial activities
          </p>
        </div>
        <div className="flex gap-2">
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

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="rounded-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Deposits Today
            </CardTitle>
            <ArrowUpCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">₹17,500</div>
            <p className="text-xs text-gray-500">3 transactions</p>
          </CardContent>
        </Card>

        <Card className="rounded-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Withdrawals Today
            </CardTitle>
            <ArrowDownCircle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">₹25,700</div>
            <p className="text-xs text-gray-500">3 transactions</p>
          </CardContent>
        </Card>

        <Card className="rounded-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Commission Earned
            </CardTitle>
            <Percent className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">₹4,390</div>
            <p className="text-xs text-gray-500">From 3 tables</p>
          </CardContent>
        </Card>

        <Card className="rounded-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Pending Approvals
            </CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {filteredData?.pending?.length || 0}
            </div>
            <p className="text-xs text-gray-500">Requires action</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="rounded-lg">
        <CardContent className="pt-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <div className="flex-1">
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
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-[180px] rounded-md">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all" onSelect={() => setStatusFilter("all")}>All Status</SelectItem>
                <SelectItem value="completed" onSelect={() => setStatusFilter("completed")}>Completed</SelectItem>
                <SelectItem value="pending" onSelect={() => setStatusFilter("pending")}>Pending</SelectItem>
                <SelectItem value="processing" onSelect={() => setStatusFilter("processing")}>Processing</SelectItem>
                <SelectItem value="rejected" onSelect={() => setStatusFilter("rejected")}>Rejected</SelectItem>
              </SelectContent>
            </Select>
            <Select value={dateFilter} onValueChange={setDateFilter}>
              <SelectTrigger className="w-full md:w-[180px] rounded-md">
                <SelectValue placeholder="Filter by date" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all" onSelect={() => setDateFilter("all")}>All Dates</SelectItem>
                <SelectItem value="today" onSelect={() => setDateFilter("today")}>Today</SelectItem>
                <SelectItem value="yesterday" onSelect={() => setDateFilter("yesterday")}>Yesterday</SelectItem>
                <SelectItem value="week" onSelect={() => setDateFilter("week")}>This Week</SelectItem>
                <SelectItem value="month" onSelect={() => setDateFilter("month")}>This Month</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Transactions Tabs */}
      {filteredData && (
        <Tabs defaultValue="deposits" className="space-y-4 rounded-lg">
          <TabsList className="grid w-full grid-cols-6">
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
                          <TableCell className="font-mono">{transaction.id}</TableCell>
                          <TableCell>
                            <div>
                              <div className="font-medium">{transaction.userName}</div>
                              <div className="text-sm text-gray-500">{transaction.userId}</div>
                            </div>
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
                                  <Button size="sm" variant="outline" className="h-8 bg-transparent">
                                    <CheckCircle className="h-3 w-3 mr-1" />
                                    Approve
                                  </Button>
                                  <Button size="sm" variant="outline" className="h-8 bg-transparent">
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
                        <TableCell colSpan={7} className="text-center text-gray-500">
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
                          <TableCell className="font-mono">{transaction.id}</TableCell>
                          <TableCell>
                            <div>
                              <div className="font-medium">{transaction.userName}</div>
                              <div className="text-sm text-gray-500">{transaction.userId}</div>
                            </div>
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
                                  <Button size="sm" variant="outline" className="h-8 bg-transparent">
                                    <CheckCircle className="h-3 w-3 mr-1" />
                                    Approve
                                  </Button>
                                  <Button size="sm" variant="outline" className="h-8 bg-transparent">
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
                        <TableCell colSpan={7} className="text-center text-gray-500">
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
                          <TableCell className="font-mono">{bet.id}</TableCell>
                          <TableCell>
                            <div>
                              <div className="font-medium">{bet.userName}</div>
                              <div className="text-sm text-gray-500">{bet.userId}</div>
                            </div>
                          </TableCell>
                          <TableCell className="font-mono">{bet.tableId}</TableCell>
                          <TableCell className="font-semibold">₹{bet.amount.toLocaleString()}</TableCell>
                          <TableCell>{getStatusBadge(bet.status)}</TableCell>
                          <TableCell>{getResultBadge(bet.result)}</TableCell>
                          <TableCell className="text-sm">{bet.timestamp}</TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center text-gray-500">
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
                          <TableCell className="font-mono">{commission.id}</TableCell>
                          <TableCell className="font-mono">{commission.tableId}</TableCell>
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
                        <TableCell colSpan={6} className="text-center text-gray-500">
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
                          <TableCell className="font-mono">{payout.id}</TableCell>
                          <TableCell>
                            <div>
                              <div className="font-medium">{payout.userName}</div>
                              <div className="text-sm text-gray-500">{payout.userId}</div>
                            </div>
                          </TableCell>
                          <TableCell className="font-mono">{payout.betId}</TableCell>
                          <TableCell className="font-semibold text-green-600">
                            ₹{payout.amount.toLocaleString()}
                          </TableCell>
                          <TableCell>{getStatusBadge(payout.status)}</TableCell>
                          <TableCell className="text-sm">{payout.timestamp}</TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center text-gray-500">
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
                            <TableCell className="font-mono">{transaction.id}</TableCell>
                            <TableCell>
                              <div>
                                <div className="font-medium">{transaction.userName}</div>
                                <div className="text-sm text-gray-500">{transaction.userId}</div>
                              </div>
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
                    <p className="text-center text-gray-500">
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

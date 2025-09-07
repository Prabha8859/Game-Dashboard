import React, { useState, useEffect } from "react";
import { Card, CardContent } from "./UI-Card-Button-Ludo/CardReportLudo";
import { Button } from "./UI-Card-Button-Ludo/ButtonReportLudo";
import { Download, FileText } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import Swal from "sweetalert2";

// 🎨 Chart Colors
const COLORS = ["#0088FE", "#FF8042", "#00C49F", "#FFBB28"];

const Reports = () => {
  const [revenueData, setRevenueData] = useState([]);
  const [winLossData, setWinLossData] = useState([]);
  const [botVsHumanData, setBotVsHumanData] = useState([]);

  const generateData = () => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"];
    setRevenueData(
      months.map((m) => ({
        month: m,
        revenue: Math.floor(Math.random() * 7000) + 2000,
        users: Math.floor(Math.random() * 3000) + 1000,
      }))
    );

    setWinLossData([
      { name: "Wins", value: Math.floor(Math.random() * 500) + 200 },
      { name: "Losses", value: Math.floor(Math.random() * 400) + 100 },
    ]);

    setBotVsHumanData([
      { name: "Bot Games", value: Math.floor(Math.random() * 500) + 100 },
      { name: "Human Games", value: Math.floor(Math.random() * 800) + 200 },
    ]);
  };

  useEffect(() => {
    generateData();
  }, []);

  const handleExportCSV = () => {
    const headers = "Month,Revenue,Users";
    const rows = revenueData.map((row) => `${row.month},${row.revenue},${row.users}`);
    const csvContent = [headers, ...rows].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "report.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    Swal.fire({
      icon: "success",
      title: "Exported!",
      text: "CSV Report has been downloaded successfully.",
    });
  };

  const handleExportPDF = () => {
    Swal.fire({
      icon: "info",
      title: "Coming Soon!",
      text: "PDF Export functionality is under development.",
    });
  };

  return (
    <div className="p-6 space-y-6 w-full">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Reports & Analytics</h1>
        <div className="flex space-x-3 mt-3 md:mt-0">
          <Button
            onClick={handleExportCSV}
            style={{ backgroundImage: "linear-gradient(-225deg, #7DE2FC 0%, #B9B6E5 100%)" }}
            className="flex items-center gap-2 text-white px-4 py-2 rounded hover:opacity-90 transition"
          >
            <Download size={18} /> Export CSV
          </Button>

          <Button
            onClick={handleExportPDF}
            style={{ backgroundImage: "linear-gradient(-225deg, #B7F8DB 0%, #50A7C2 100%)" }}
            className="flex items-center gap-2 text-white px-4 py-2 rounded hover:opacity-90 transition"
          >
            <FileText size={18} /> Export PDF
          </Button>

          <Button
            onClick={generateData}
            style={{ backgroundImage: "linear-gradient(-225deg, #FFE29F 0%, #FFA99F 48%, #FF719A 100%)" }}
            className="flex items-center gap-2 text-white px-4 py-2 rounded hover:opacity-90 transition"
          >
            🔄 Refresh Data
          </Button>
        </div>
      </div>

      <Card>
        <CardContent>
          <h2 className="text-lg font-semibold mb-4">Revenue & Active Users</h2>
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="revenue" stroke="#8884d8" />
              <Line type="monotone" dataKey="users" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardContent>
            <h2 className="text-lg font-semibold mb-4">Win / Loss Ratio</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={winLossData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label>
                  {winLossData.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <h2 className="text-lg font-semibold mb-4">Bot vs Human Games</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={botVsHumanData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Reports;

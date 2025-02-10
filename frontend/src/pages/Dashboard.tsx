import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { FiUsers, FiShoppingCart, FiDollarSign, FiTrendingUp } from "react-icons/fi";

const stats = [
  { title: "Customers", value: "1,250", icon: <FiUsers className="text-blue-500" />, bg: "bg-blue-100" },
  { title: "Orders", value: "3,452", icon: <FiShoppingCart className="text-green-500" />, bg: "bg-green-100" },
  { title: "Revenue", value: "$124K", icon: <FiDollarSign className="text-yellow-500" />, bg: "bg-yellow-100" },
  { title: "Growth", value: "23%", icon: <FiTrendingUp className="text-purple-500" />, bg: "bg-purple-100" },
];

const chartData = [
  { name: "Jan", sales: 4000 },
  { name: "Feb", sales: 3200 },
  { name: "Mar", sales: 5000 },
  { name: "Apr", sales: 7000 },
  { name: "May", sales: 8000 },
  { name: "Jun", sales: 6500 },
];

const Dashboard: React.FC = () => {
  return (
    <div className="p-6 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">CRM Dashboard</h1>
        <div className="w-10 h-10 rounded-full bg-gray-300"></div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {stats.map((stat, index) => (
          <div key={index} className={`p-4 rounded-lg shadow-md flex items-center space-x-4 ${stat.bg}`}>
            <div className="text-3xl">{stat.icon}</div>
            <div>
              <h3 className="text-lg font-semibold">{stat.title}</h3>
              <p className="text-2xl font-bold">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Chart */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold mb-4">Sales Analytics</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="sales" fill="#3b82f6" radius={[5, 5, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Dashboard;

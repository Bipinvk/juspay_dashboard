import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";

// Sample data matching the dashboard image
const Dashboard = () => {
  const customersData = { value: 3781, change: "+11.01%" };
  const ordersData = { value: 1219, change: "-0.03%" };
  const revenueData = { value: 695, change: "+15.03%" };
  const growthData = { value: "30.1%", change: "+0.08%" };

  // Data for Projections vs Actuals (Bar Chart)
  const projectionsVsActualsData = [
    { month: "Jan", projections: 30, actuals: 28 },
    { month: "Feb", projections: 32, actuals: 31 },
    { month: "Mar", projections: 28, actuals: 25 },
    { month: "Apr", projections: 35, actuals: 34 },
    { month: "May", projections: 38, actuals: 37 },
    { month: "Jun", projections: 40, actuals: 39 },
  ];

  // Data for Revenue Trend (Line Chart)
  const revenueTrendData = [
    { month: "Jan", current: 8, previous: 7 },
    { month: "Feb", current: 12, previous: 9 },
    { month: "Mar", current: 10, previous: 8 },
    { month: "Apr", current: 15, previous: 12 },
    { month: "May", current: 18, previous: 15 },
    { month: "Jun", current: 20, previous: 18 },
  ];

  // Revenue by Location (Simplified as Bar Chart since Recharts doesn't support maps natively)
  // In a full app, you could integrate a map library like react-simple-maps
  const revenueByLocationData = [
    { location: "New York", revenue: 72 },
    { location: "San Francisco", revenue: 39 },
    { location: "Sydney", revenue: 25 },
    { location: "Singapore", revenue: 61 },
  ];

  const topSellingProductsData = [
    { name: "ASOS Ridley High Waist", price: 75.49, quantity: 82, amount: 6188.18 },
    { name: "Marco Lightweight Shirt", price: 128.50, quantity: 37, amount: 4754.50 },
    { name: "Half Sleeve Shirt", price: 33.99, quantity: 64, amount: 2175.36 },
    { name: "Lightweight Jacket", price: 20.00, quantity: 184, amount: 3680.00 },
    { name: "Marco Shoes", price: 75.49, quantity: 64, amount: 4831.36 },
  ];

  const totalSalesData = [
    { name: "Direct", value: 300.56 },
    { name: "Affiliate", value: 135.18 },
    { name: "Sponsored", value: 154.02 },
    { name: "E-mail", value: 48.96 },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  // Helper to format numbers with commas
  const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <div className=" min-h-screen">
      <h2 className="font-semibold mb-6 text-gray-800">eCommerce</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {/* KPI Cards */}
        <div className="bg-gray-50/70 rounded-lg  p-6">
          <h3 className="text-lg font-semibold text-gray-600 mb-2">Customers</h3>
          <p className="text-3xl font-bold text-gray-800">
            {customersData.value}
            <span className="text-green-500 ml-2 text-sm">
              {customersData.change}
            </span>
          </p>
        </div>
        <div className="bg-gray-50/70 rounded-lg  p-6">
          <h3 className="text-lg font-semibold text-gray-600 mb-2">Orders</h3>
          <p className="text-3xl font-bold text-gray-800">
            {ordersData.value}
            <span className={`ml-2 text-sm ${ordersData.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
              {ordersData.change}
            </span>
          </p>
        </div>
        <div className="bg-gray-50/70 rounded-lg  p-6">
          <h3 className="text-lg font-semibold text-gray-600 mb-2">Revenue</h3>
          <p className="text-3xl font-bold text-gray-800">
            ${revenueData.value}
            <span className="text-green-500 ml-2 text-sm">
              {revenueData.change}
            </span>
          </p>
        </div>
        <div className="bg-gray-50/70 rounded-lg  p-6">
          <h3 className="text-lg font-semibold text-gray-600 mb-2">Growth</h3>
          <p className="text-3xl font-bold text-gray-800">
            {growthData.value}
            <span className="text-green-500 ml-2 text-sm">
              {growthData.change}
            </span>
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Projections vs Actuals Bar Chart */}
        <div className="bg-gray-50/70 rounded-lg  p-6">
          <h3 className="text-lg font-semibold text-gray-600 mb-4">Projections vs Actuals</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={projectionsVsActualsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => [`$${value}k`, "Revenue"]} />
              <Legend />
              <Bar dataKey="projections" fill="#e5e7eb" name="Projections" />
              <Bar dataKey="actuals" fill="#3b82f6" name="Actuals" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Revenue Line Chart */}
        <div className="bg-gray-50/70 rounded-lg  p-6">
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-600">Revenue</h3>
            <p className="text-sm text-gray-500">
              Current Week: ${formatNumber(58211)} | Previous Week: ${formatNumber(58768)}
            </p>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenueTrendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => [`$${value}M`, "Revenue"]} />
              <Legend />
              <Line type="monotone" dataKey="current" stroke="#000" strokeWidth={2} name="Current" />
              <Line type="monotone" dataKey="previous" stroke="#9ca3af" strokeWidth={2} dot={false} name="Previous" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Revenue by Location (Simplified Bar Chart) */}
        <div className="bg-gray-50/70 rounded-lg  p-6">
          <h3 className="text-lg font-semibold text-gray-600 mb-4">Revenue by Location</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={revenueByLocationData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="location" />
              <YAxis />
              <Tooltip formatter={(value) => [`$${value}k`, "Revenue"]} />
              <Bar dataKey="revenue" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
          {/* Note: For a map visualization, integrate a library like react-simple-maps */}
        </div>

        {/* Total Sales Pie Chart */}
        <div className="bg-gray-50/70 rounded-lg  p-6">
          <h3 className="text-lg font-semibold text-gray-600 mb-4">Total Sales</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={totalSalesData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {totalSalesData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`$${value}`, "Amount"]} />
            </PieChart>
          </ResponsiveContainer>
          <ul className="mt-4 space-y-2">
            {totalSalesData.map((sale, index) => (
              <li key={index} className="flex items-center text-sm">
                <div
                  className="w-4 h-4 mr-2 rounded-full"
                  style={{ backgroundColor: COLORS[index % COLORS.length] }}
                ></div>
                <span className="font-medium">{sale.name}:</span>
                <span className="ml-auto">${sale.value}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Top Selling Products Table */}
      <div className="bg-gray-50/70 rounded-lg  p-6">
        <h3 className="text-lg font-semibold text-gray-600 mb-4">Top Selling Products</h3>
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-50/70">
              <th className="border border-gray-300 px-4 py-2 text-left">Name</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Price</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Quantity</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Amount</th>
            </tr>
          </thead>
          <tbody>
            {topSellingProductsData.map((product, index) => (
              <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : ""}>
                <td className="border border-gray-300 px-4 py-2">{product.name}</td>
                <td className="border border-gray-300 px-4 py-2">${product.price}</td>
                <td className="border border-gray-300 px-4 py-2">{product.quantity}</td>
                <td className="border border-gray-300 px-4 py-2">${formatNumber(product.amount)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
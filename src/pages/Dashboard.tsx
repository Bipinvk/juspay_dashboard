import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  LineChart,
  Line,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  ArrowUpRight,
  ArrowDownRight,
  TrendingUpIcon,
  TrendingDownIcon,
} from "lucide-react";
import { useTheme } from "../context/ThemeContext/ThemeContext";
import worldMap from "../assets/dashboard/worldmap.svg";

const Dashboard = () => {
  const { theme } = useTheme();
  const customersData = { value: 3781, change: "+11.01%" };
  const ordersData = { value: 1219, change: "-0.03%" };
  const revenueData = { value: 695, change: "+15.03%" };
  const growthData = { value: "30.1%", change: "+6.08%" };

  const projectionsVsActualsData = [
    { month: "Jan", projections: 30, actuals: 28 },
    { month: "Feb", projections: 32, actuals: 31 },
    { month: "Mar", projections: 28, actuals: 25 },
    { month: "Apr", projections: 35, actuals: 34 },
    { month: "May", projections: 38, actuals: 37 },
    { month: "Jun", projections: 40, actuals: 39 },
  ];

  const ProjectionsVsActualsChart = ({ theme = "light" }) => {
    // Theme-based colors
    const isDark = theme === "dark";
    const gridStroke = isDark ? "#374151" : "#e5e7eb";
    const axisStroke = isDark ? "#9ca3af" : "#374151";
    const bgColor = isDark ? "bg-gray-800" : "bg-white";
    const textColor = isDark ? "text-gray-200" : "text-gray-800";

    return (
      <div
        className={`${bgColor} rounded-2xl p-6 shadow-sm flex-1 flex flex-col dark:border dark:border-gray-700`}
      >
        <h3 className={`text-base font-semibold ${textColor} mb-4`}>
          Projections vs Actuals
        </h3>
        <ResponsiveContainer width="100%" height={180}>
          <BarChart data={projectionsVsActualsData}>
            <CartesianGrid strokeDasharray="3 3" stroke={gridStroke} />
            <XAxis dataKey="month" stroke={axisStroke} />
            <YAxis stroke={axisStroke} />
            <Tooltip
              contentStyle={{
                backgroundColor: isDark ? "#1f2937" : "#ffffff",
                border: `1px solid ${isDark ? "#374151" : "#e5e7eb"}`,
                color: isDark ? "#f9fafb" : "#111827",
              }}
            />
            <Bar
              dataKey="actuals"
              fill="#3b82f6"
              stackId="a"
              radius={[2, 2, 0, 0]}
            />
            <Bar
              dataKey="projections"
              fill="#dbeafe"
              stackId="a"
              radius={[2, 2, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  };

  const revenueTrendData = [
    { month: "Jan", current: 8, previous: 10 },
    { month: "Feb", current: 12, previous: 18 },
    { month: "Mar", current: 15, previous: 12 },
    { month: "Apr", current: 18, previous: 14 },
    { month: "May", current: 22, previous: 18 },
    { month: "Jun", current: 26, previous: 20 },
  ];

  const topSellingProductsData = [
    {
      name: "ASOS Ridley High Waist",
      price: "$79.49",
      quantity: 82,
      amount: "$6,118",
    },
    {
      name: "Morco Lightweight Shirt",
      price: "$128.50",
      quantity: 37,
      amount: "$4,754.50",
    },
    {
      name: "Half Sleeve Shirt",
      price: "$29.99",
      quantity: 64,
      amount: "$2,599.36",
    },
    {
      name: "Linen Jacket",
      price: "$200.00",
      quantity: 184,
      amount: "$36,800",
    },
    { name: "Leather Shoes", price: "$79.49", quantity: 64, amount: "$5,081" },
  ];

  const stats = [
    { title: "Customers", data: customersData, bg: "bg-blue-50" },
    { title: "Orders", data: ordersData, bg: "bg-secondaryBg" },
    { title: "Revenue", data: revenueData, bg: "bg-secondaryBg " },
    { title: "Growth", data: growthData, bg: "bg-blue-50/80" },
  ];

  const totalSalesData = [
    { name: "Direct", value: 500.54 },
    { name: "Affiliate", value: 300.18 },
    { name: "Sponsored", value: 154.02 },
    { name: "E-mail", value: 89.46 },
  ];

  const COLORS = ["#8884d8", "#82ca9d", "#ff7300", "#ffcc00"];

  const TopSellingProducts = () => (
    <div className="bg-secondaryBg rounded-2xl p-6 shadow-sm">
      <h3 className="text-base font-semibold text-textColor mb-4">
        Top Selling Products
      </h3>
      <table className="w-full text-sm ">
        <thead>
          <tr className="border-b text-textSecondary">
            <th className="py-2 text-left ">Name</th>
            <th className="py-2 text-left ">Price</th>
            <th className="py-2 text-left ">Quantity</th>
            <th className="py-2 text-left ">Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr className="">
            <td className="py-2">ASOS Ridley High Waist</td>
            <td className="py-2">$79.49</td>
            <td className="py-2">82</td>
            <td className="py-2">$6,518.18</td>
          </tr>
          <tr className="">
            <td className="py-2">Marco Lightweight Shirt</td>
            <td className="py-2">$128.50</td>
            <td className="py-2">57</td>
            <td className="py-2">$7,574.50</td>
          </tr>
          <tr className="">
            <td className="py-2">Half Sleeve Shirt</td>
            <td className="py-2">$39.99</td>
            <td className="py-2">64</td>
            <td className="py-2">$2,559.36</td>
          </tr>
          <tr className="">
            <td className="py-2">Lightweight Jacket</td>
            <td className="py-2">$20.00</td>
            <td className="py-2">184</td>
            <td className="py-2">$3,680.00</td>
          </tr>
          <tr>
            <td className="py-2">Marco Shoes</td>
            <td className="py-2">$79.49</td>
            <td className="py-2">64</td>
            <td className="py-2">$5,087.36</td>
          </tr>
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="p-5 bg-mainBg min-h-screen text-textColor">
      <h2 className="text-base font-semibold mb-6">eCommerce</h2>
      <div className="flex flex-col md:flex-row gap-6 mb-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 gap-6 flex-1">
          {stats.map((item, idx) => (
            <div
              key={idx}
              className={`rounded-2xl p-6 shadow-sm ${item.bg} 
        ${
          theme === "dark" && (idx === 0 || idx === stats.length - 1)
            ? "text-black"
            : "text-textColor"
        }
      `}
            >
              <p className="text-sm font-medium">{item.title}</p>
              <h3 className="text-2xl mt-2 flex items-center font-medium">
                {item.title === "Revenue"
                  ? `$${item.data.value}`
                  : item.data.value}
                <span className="ml-2 text-sm flex items-center font-normal">
                  {item.data.change.startsWith("+") ? (
                    <TrendingUpIcon size={14} className="mr-1" />
                  ) : (
                    <TrendingDownIcon size={14} className="mr-1" />
                  )}
                  {item.data.change}
                </span>
              </h3>
            </div>
          ))}
        </div>

        {/* Charts Row */}
        <div className="flex flex-col gap-6 flex-1">
          {/* Projections vs Actuals */}
          <div className="bg-secondaryBg rounded-2xl p-6 shadow-sm flex-1 flex flex-col">
            <h3 className="text-base font-semibold text-textColor mb-4">
              Projections vs Actuals
            </h3>
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={projectionsVsActualsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" stroke="#374151" />
                <YAxis stroke="#374151" />
                <Tooltip />
                <Bar
                  dataKey="projections"
                  fill="#dbeafe"
                  stackId="a"
                  radius={[2, 2, 0, 0]}
                />
                <Bar
                  dataKey="actuals"
                  fill="#3b82f6"
                  stackId="a"
                  radius={[2, 2, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Top Section */}
      <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-6 w-full">
        {/* Revenue Trend (2fr) */}
        <div className="bg-secondaryBg rounded-2xl p-6 shadow-sm flex flex-col">
          <div className="flex items-center justify-start gap-4 mb-2">
            <h3 className="text-base font-semibold text-textColor ">Revenue</h3>

            <p className="text-sm text-gray-500 ">
              | <span> </span> Current Week: $58,211 | Previous Week: $68,768
            </p>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={revenueTrendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" stroke="#374151" />
              <YAxis stroke="#374151" />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="current"
                stroke="#000000"
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="previous"
                stroke="#0000ff"
                strokeDasharray="5 5"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Revenue by Location (1fr) */}
        <div className="bg-secondaryBg rounded-2xl p-6 shadow-sm flex flex-col">
          <h3 className="text-base font-semibold text-textColor mb-4">
            Revenue by Location
          </h3>
          <img src={worldMap}></img>
          <p className="text-sm text-gray-500">
            New York: $72K, San Francisco: $39K, Sydney: $25K, Singapore: $61K
          </p>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-6 mt-6 w-full">
        {/* Top Selling Products (2fr) */}
        <TopSellingProducts />

        {/* Total Sales (1fr) */}
        <div className="bg-secondaryBg rounded-2xl p-6 shadow-sm flex flex-col">
          <h3 className="text-base font-semibold text-textColor mb-4">
            Total Sales
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={totalSalesData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                labelLine={false}
                label={({ name, percent }) =>
                  `${name} ${(percent * 100).toFixed(1)}%`
                }
              >
                {totalSalesData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 text-sm text-textSecondary flex flex-col gap-2">
            <p className="flex items-center gap-2 ">
              <span className="w-3 h-3 rounded-full bg-[#1E3A8A]"></span>{" "}
              Direct: $500.54
            </p>
            <p className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#10B981]"></span>{" "}
              Affiliate: $300.18
            </p>
            <p className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#9333EA]"></span>{" "}
              Sponsored: $154.02
            </p>
            <p className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#F59E0B]"></span>{" "}
              E-mail: $89.46
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

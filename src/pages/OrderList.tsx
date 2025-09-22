import React, { useState } from "react";

const OrderList = () => {
  const initialOrders = [
    {
      id: "CMB801",
      user: "Natalie Craig",
      project: "Landing Page",
      address: "Meadow Lane Oakland",
      date: "Just now",
      status: "In Progress",
    },
    {
      id: "CMB802",
      user: "Kate Morrison",
      project: "CRM Admin pages",
      address: "Larry San Francisco",
      date: "A minute ago",
      status: "Complete",
    },
    {
      id: "CMB803",
      user: "Drew Cano",
      project: "Client Project",
      address: "Bogwell Avenue Cocoa",
      date: "1 hour ago",
      status: "Pending",
    },
    {
      id: "CMB804",
      user: "Orlando Diggs",
      project: "Admin Dashboard",
      address: "Washburn Baton Rouge",
      date: "Yesterday",
      status: "Approved",
    },
    {
      id: "CMB805",
      user: "Andi Lane",
      project: "App Landing Page",
      address: "Nest Lane Olivette",
      date: "Feb 2, 2023",
      status: "Rejected",
    },
    {
      id: "CMB801",
      user: "Natalie Craig",
      project: "Landing Page",
      address: "Meadow Lane Oakland",
      date: "Just now",
      status: "In Progress",
    },
    {
      id: "CMB802",
      user: "Kate Morrison",
      project: "CRM Admin pages",
      address: "Larry San Francisco",
      date: "A minute ago",
      status: "Complete",
    },
    {
      id: "CMB803",
      user: "Drew Cano",
      project: "Client Project",
      address: "Bogwell Avenue Cocoa",
      date: "1 hour ago",
      status: "Pending",
    },
    {
      id: "CMB804",
      user: "Orlando Diggs",
      project: "Admin Dashboard",
      address: "Washburn Baton Rouge",
      date: "Yesterday",
      status: "Approved",
    },
    {
      id: "CMB805",
      user: "Andi Lane",
      project: "App Landing Page",
      address: "Nest Lane Olivette",
      date: "Feb 2, 2023",
      status: "Rejected",
    },
  ];

  const [orders, setOrders] = useState(initialOrders);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filteredOrders = initialOrders.filter(
      (order) =>
        order.id.toLowerCase().includes(term) ||
        order.user.toLowerCase().includes(term) ||
        order.project.toLowerCase().includes(term) ||
        order.address.toLowerCase().includes(term) ||
        order.date.toLowerCase().includes(term) ||
        order.status.toLowerCase().includes(term)
    );
    setOrders(filteredOrders);
  };

  const statusColors = {
    "In Progress": "text-blue-600",
    Complete: "text-green-600",
    Pending: "text-orange-600",
    Approved: "text-yellow-600",
    Rejected: "text-red-600",
  };

  return (
    <div className="container bg-mainBg mx-auto p-4 text-textColor">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text- font-normal">Order List</h2>
      </div>
      <div className="flex justify-between items-center mb-4 bg-secondaryBg p-2 rounded-md h-9">
        <div className="flex space-x-2">
          <button className="text-textColor px-3 py-1 rounded text-sm h-7">+ </button>
          <button className="text-textColor px-3 py-1 rounded text-sm h-7">⋮</button>
        </div>
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearch}
          className="p-1 border  rounded bg-secondaryBg text-textColor border-borderColor text-sm h-7"
        />
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left text-textSecondary">
          <thead className="text-sm text-textSecondary bg-secondaryBg font-normal">
            <tr className="font-normal">
              <th className="p-4">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded"
                />
              </th>
              <th className="px-6 py-3 font-normal">Order ID</th>
              <th className="px-6 py-3 font-normal">User</th>
              <th className="px-6 py-3 font-normal">Project</th>
              <th className="px-6 py-3 font-normal">Address</th>
              <th className="px-6 py-3 font-normal">Date</th>
              <th className="px-6 py-3 font-normal">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr
                key={order.id}
                className="bg-mainBg text-textColor border-b border-gray-100 dark:border-white/10  hover:bg-secondaryBg"
              >
                <td className="w-4 p-4">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded"
                  />
                </td>
                <td className="px-6 py-4">{order.id}</td>
                <td className="px-6 py-4">{order.user}</td>
                <td className="px-6 py-4">{order.project}</td>
                <td className="px-6 py-4">{order.address}</td>
                <td className="px-6 py-4">{order.date}</td>
                <td className="px-6 py-4">
                  <span
                    className={statusColors[order.status] || "text-gray-600"}
                  >
                    {order.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-end mt-4">
        <nav
          className="inline-flex rounded-md shadow-sm"
          aria-label="Pagination"
        >
          <button
            className="px-3 py-1 rounded-l-md border border-borderColor bg-secondaryBg text-textSecondary hover:bg-mainBg focus:outline-none"
            disabled
          >
            &lt;
          </button>
          <button className="px-3 py-1 border-t border-b border-borderColor bg-mainBg text-textColor font-semibold hover:bg-secondaryBg focus:outline-none">
            1
          </button>
          <button className="px-3 py-1 border-t border-b border-borderColor bg-secondaryBg text-textSecondary hover:bg-mainBg focus:outline-none">
            2
          </button>
          <button className="px-3 py-1 border-t border-b border-borderColor bg-secondaryBg text-textSecondary hover:bg-mainBg focus:outline-none">
            3
          </button>
          <button className="px-3 py-1 border-t border-b border-borderColor bg-secondaryBg text-textSecondary hover:bg-mainBg focus:outline-none">
            4
          </button>
          <button className="px-3 py-1 border-t border-b border-borderColor bg-secondaryBg text-textSecondary hover:bg-mainBg focus:outline-none">
            5
          </button>
          <button className="px-3 py-1 rounded-r-md border border-borderColor bg-secondaryBg text-textSecondary hover:bg-mainBg focus:outline-none">
            &gt;
          </button>
        </nav>
      </div>
    </div>
  );
};

export default OrderList;

// TopNav.tsx
import React from "react";
import star from "../assets/topnav/star.svg";
import togLeft from "../assets/topnav/togLeft.svg";
import search from "../assets/topnav/search.svg";
import text from "../assets/topnav/Text.svg";
import sun from "../assets/topnav/sun.svg";
import bell from "../assets/topnav/bell.svg";
import togRight from "../assets/topnav/togRight.svg";
import history from "../assets/topnav/history.svg";
const TopNav: React.FC = () => {
  return (
    <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-white">
      <div className="flex items-center space-x-6">
        <div className="flex items-center space-x-4">
          <img src={togLeft}></img>
          <img src={star} className=""></img>
        </div>
        {/* Breadcrumb */}
        <div className="flex items-center space-x-4">
          <div className="text-sm text-gray-400">Dashboards</div>
          <span className="text-sm text-gray-400">/</span>
          <span className="text-gray-900 ">Default</span>
        </div>
      </div>

      {/* Search and Icons */}
      <div className="flex items-center space-x-4">
        {/* Search */}
        <div className="relative bg-gray-300 rounded-md">
          <img
            src={search}
            className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400"
          />
          <input
            type="text"
            placeholder="Search"
            className="pl-10 pr-8 bg-gray-100 py-1 w-32 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <img
            src={text}
            className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400"
          />
        </div>

        {/* Action Icons */}
        <div className="flex items-center  text-gray-500">
          <button className="p-2 hover:text-gray-700">
            <img src={sun} className="h-5 w-5" />
          </button>
          <button className="p-2 hover:text-gray-700">
            <img src={history} className="h-5 w-5" />
          </button>
          <button className="p-2 hover:text-gray-700">
            <img src={bell} className="h-5 w-5" />
          </button>
          <button className="p-2 hover:text-gray-700">
            <img src={togRight} className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TopNav;

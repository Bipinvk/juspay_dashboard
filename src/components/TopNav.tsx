// TopNav.tsx
import React from "react";
import star from "../assets/topnav/star.svg";
import whiteStar from "../assets/topnav/whiteStar.svg";
import togLeft from "../assets/topnav/togLeft.svg";
import whitetogLeft from "../assets/topnav/whitetoLeft.svg";
import search from "../assets/topnav/search.svg";
import whiteSearch from "../assets/topnav/whiteSearch.svg";
import text from "../assets/topnav/Text.svg";
import whiteText from "../assets/topnav/whiteText.svg";
import sun from "../assets/topnav/sun.svg";
import whiteSun from "../assets/topnav/whiteSun.svg";
import bell from "../assets/topnav/bell.svg";
import whiteBell from "../assets/topnav/whiteBell.svg";
import togRight from "../assets/topnav/togRight.svg";
import whiteTogRight from "../assets/topnav/whiteTogRight.svg";
import history from "../assets/topnav/history.svg";
import whiteHistory from "../assets/topnav/whiteHistory.svg";
import { useTheme } from "../context/ThemeContext/ThemeContext";

const TopNav: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <div className="bg-mainBg text-textColor flex items-center justify-between px-4 py-3 border-b border-borderColor ">
      <div className="flex items-center space-x-6">
        <div className="flex items-center space-x-4">
          <img
            src={theme == "dark" ? whitetogLeft : togLeft}
            className="text-blue-500"
          ></img>
          <img
            src={theme == "dark" ? whiteStar : star}
            className="text-textColor "
          ></img>
        </div>
        {/* Breadcrumb */}
        <div className="flex items-center space-x-4">
          <div className="text-sm text-textSecondary">Dashboards</div>
          <span className="text-sm text-textSecondary">/</span>
          <span className="text-textColor ">Default</span>
        </div>
      </div>

      {/* Search and Icons */}
      <div className="flex items-center space-x-4">
        {/* Search */}
        <div className="relative bg-secondaryBg rounded-md">
          <img
            src={theme == "dark" ? whiteSearch : search}
            className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-textSecondary "
          />
          <input
            type="text"
            placeholder="Search"
            className="pl-10 pr-8 bg-secondaryBg  py-1 w-32 rounded-md text-sm placeholder-gray-500
             dark:placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <img
            src={theme == "dark" ? whiteText : text}
            className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-textSecondary"
          />
        </div>

        {/* Action Icons */}
        <div className="flex items-center  text-gray-500">
          <button className="p-2 hover:text-gray-700" onClick={toggleTheme}>
            <img src={theme == "dark" ? whiteSun : sun} className="h-5 w-5" />
          </button>
          <button className="p-2 hover:text-gray-700">
            <img
              src={theme == "dark" ? whiteHistory : history}
              className="h-5 w-5"
            />
          </button>
          <button className="p-2 hover:text-gray-700">
            <img src={theme == "dark" ? whiteBell : bell} className="h-5 w-5" />
          </button>
          <button className="p-2 hover:text-gray-700">
            <img
              src={theme == "dark" ? togRight : whiteTogRight}
              className="h-5 w-5"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TopNav;

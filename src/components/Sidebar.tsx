import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useTheme } from "../context/ThemeContext/ThemeContext";

import dashboardIcon from "../assets/sidemenus/default.svg";
import whiteDashboardIcon from "../assets/sidemenus/whiteDefault.svg";

import ecomIcon from "../assets/sidemenus/ecommerce.svg";
import whiteEcomIcon from "../assets/sidemenus/whiteEcommerce.svg";

import projects from "../assets/sidemenus/projects.svg";
import whiteProjects from "../assets/sidemenus/whiteProjects.svg";

import acc from "../assets/sidemenus/account.svg";
import whiteAcc from "../assets/sidemenus/whiteAccount.svg";

import blog from "../assets/sidemenus/blog.svg";
import whiteBlog from "../assets/sidemenus/whiteBlog.svg";

import corporate from "../assets/sidemenus/corporate.svg";
import whiteCorporate from "../assets/sidemenus/whiteCorporate.svg";

import courses from "../assets/sidemenus/onlinecourses.svg";
import whiteCourses from "../assets/sidemenus/whiteOnlineCourses.svg";

import profile from "../assets/sidemenus/profile.svg";
import whiteProfile from "../assets/sidemenus/whiteProfile.svg";

import social from "../assets/sidemenus/social.svg";
import whiteSocial from "../assets/sidemenus/whiteSocial.svg";

import ByeWind from "../assets/logo/ByeWind.png";

import { ChevronDown, ChevronRight } from "lucide-react";

const menuItems = [
  { id: "orderlist", label: "Overview", category: "favorites", dot: true },
  { id: "project", label: "Projects", category: "favorites", dot: true },
  {
    id: "default",
    label: "Default",
    icons: { light: dashboardIcon, dark: whiteDashboardIcon },
    category: "misc",
    selected: true,
  },
  {
    id: "ecommerce",
    label: "eCommerce",
    icons: { light: ecomIcon, dark: whiteEcomIcon },
    category: "misc",
    showChevron: true,
  },
  {
    id: "projects2",
    label: "Projects",
    icons: { light: projects, dark: whiteProjects },
    category: "misc",
    showChevron: true,
  },
  {
    id: "online-courses",
    label: "Online Courses",
    icons: { light: courses, dark: whiteCourses },
    category: "misc",
    showChevron: true,
  },
  {
    id: "user-profile",
    label: "User Profile",
    icons: { light: profile, dark: whiteProfile },
    category: "pages",
    children: [
      { id: "overview", label: "Overview" },
      { id: "projects", label: "Projects" },
      { id: "campaigns", label: "Campaigns" },
      { id: "documents", label: "Documents" },
      { id: "followers", label: "Followers" },
    ],
  },
  {
    id: "account",
    label: "Account",
    icons: { light: acc, dark: whiteAcc },
    category: "pages",
    showChevron: true,
  },
  {
    id: "corporate",
    label: "Corporate",
    icons: { light: corporate, dark: whiteCorporate },
    category: "pages",
    showChevron: true,
  },
  {
    id: "blog",
    label: "Blog",
    icons: { light: blog, dark: whiteBlog },
    category: "pages",
    showChevron: true,
  },
  {
    id: "social",
    label: "Social",
    icons: { light: social, dark: whiteSocial },
    category: "pages",
    showChevron: true,
  },
];

const categories = {
  dashboard: "Dashboards",
  misc: "",
  pages: "Pages",
};

export default function Sidebar({ collapsed }: { collapsed: boolean }) {
  const { theme } = useTheme(); // ✅ move inside component
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname.replace(/^\/+/, "");

  const [expanded, setExpanded] = useState(new Set(["user-profile"]));
  const [activeTopTab, setActiveTopTab] = useState("favorites"); // toggle between favorites/recently

  const groupedItems = menuItems.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, typeof menuItems>);

  const getIcon = (item: any) => (item.icons ? (theme === "dark" ? item.icons.dark : item.icons.light) : undefined);

  return (
    <div
      className={`h-screen border-r border-borderColor flex flex-col transition-all duration-300 
      ${collapsed ? "w-20" : "w-56"} bg-mainBg text-textColor`}
    >
      {/* Logo */}
      <div className="flex items-center p-4">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center">
            <img src={ByeWind} alt="ByeWind Logo" />
          </div>
          {!collapsed && <h1 className="text-textColor text-sm">ByeWind</h1>}
        </div>
      </div>

      {/* Top Tabs */}
      {!collapsed && (
        <div className="text-sm flex px-4 gap-8 justify-start">
          <button
            onClick={() => setActiveTopTab("favorites")}
            className={`rounded-md py-1.5 transition ${activeTopTab === "favorites" ? "text-textSecondary" : "text-textSecondary/70"}`}
          >
            Favorites
          </button>
          <button
            onClick={() => setActiveTopTab("recently")}
            className={`rounded-md py-1.5 transition ${activeTopTab === "recently" ? "text-textSecondary" : "text-textSecondary/70"}`}
          >
            Recently
          </button>
        </div>
      )}

      {/* Nav Items */}
      <nav className="flex-1 px-4 space-y-4 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
        {Object.entries(groupedItems).map(([category, items]) => (
          <div key={category}>
            {!collapsed && categories[category] && (
              <h3 className="mb-2 text-sm text-textSecondary tracking-wide">{categories[category]}</h3>
            )}
            {collapsed && Object.keys(groupedItems).indexOf(category) !== 0 && (
              <div className="my-2 border-t border-primaryBorder" />
            )}
            <div className="space-y-1">
              {items.map((item) => {
                const isActive = currentPath === item.id || currentPath.startsWith(`${item.id}/`);
                const hasSubmenu = !!item.children?.length;
                const showArrow = hasSubmenu || (!!item.showChevron && category !== "favorites");

                return (
                  <div key={item.id}>
                    <button
                      onClick={() => {
                        if (hasSubmenu) {
                          setExpanded((prev) => {
                            const newSet = new Set(prev);
                            newSet.has(item.id) ? newSet.delete(item.id) : newSet.add(item.id);
                            return newSet;
                          });
                        } else {
                          navigate(`/${item.id}`);
                        }
                      }}
                      title={collapsed ? item.label : ""}
                      className={`relative w-full flex items-center ${item.selected ? "gap-4" : ""} rounded-md text-sm font-normal transition-colors ${
                        collapsed ? "justify-center py-1" : "py-1 space-x-2"
                      } ${isActive ? "text-blue-600 " : "hover:bg-secondaryBg hover:text-textColor"}`}
                    >
                      {!collapsed && showArrow ? (
                        <span className={`${isActive ? "text-blue-600" : "text-textSecondary"}`}>
                          {hasSubmenu && expanded.has(item.id) ? <ChevronDown size={15} /> : <ChevronRight size={15} />}
                        </span>
                      ) : (
                        <>
                          {isActive || (item.selected && <span className="absolute left-0 top-1/2 -translate-y-1/2 h-3 w-0.5 bg-textColor rounded-t-full rounded-b-full"></span>)}
                        </>
                      )}
                      {item.dot && <span className={`ml-1 w-1 h-1 rounded-full ${isActive ? "bg-blue-600" : "bg-textSecondary"}`}></span>}

                      <span className="flex items-center space-x-1">
                        {item.icons && <img src={getIcon(item)} className="w-4 h-4" />}
                        {!collapsed && <span className={`truncate ${isActive ? "text-blue-600" : "text-textColor"}`}>{item.label}</span>}
                      </span>
                    </button>

                    {/* Submenu */}
                    {hasSubmenu && expanded.has(item.id) && !collapsed && (
                      <div className="space-y-1 ml-6 mt-1">
                        {item.children.map((sub) => {
                          const subActive = currentPath === `${item.id}/${sub.id}`;
                          return (
                            <button
                              key={sub.id}
                              onClick={() => navigate(`/${item.id}/${sub.id}`)}
                              className={`w-full text-left rounded-md text-sm px-2 py-1 transition-colors ${
                                subActive ? "bg-blue-50 text-blue-600" : "hover:bg-secondaryBg text-textColor"
                              }`}
                            >
                              {sub.label}
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </nav>
    </div>
  );
}

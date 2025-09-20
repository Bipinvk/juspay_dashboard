import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import dashboardIcon from "../assets/sidemenus/default.svg";
import ecomIcon from "../assets/sidemenus/ecommerce.svg";
import projects from "../assets/sidemenus/projects.svg";
import acc from "../assets/sidemenus/account.svg";
import blog from "../assets/sidemenus/blog.svg";
import corporate from "../assets/sidemenus/corporate.svg";
import courses from "../assets/sidemenus/onlinecourses.svg";
import profile from "../assets/sidemenus/profile.svg";
import social from "../assets/sidemenus/social.svg";
import ByeWind from "../assets/logo/ByeWind.png";
import { ChevronDown, ChevronRight } from "lucide-react";

const menuItems = [
  { id: "overview", label: "Overview", category: "favorites", dot: true },
  { id: "projects", label: "Projects", category: "favorites", dot: true },
  {
    id: "dashboard",
    label: "Default",
    icon: dashboardIcon,
    category: "misc",
    selected: true,
  },
  {
    id: "ecommerce",
    label: "eCommerce",
    icon: ecomIcon,
    category: "misc",
    showChevron: true,
  },
  {
    id: "projects2",
    label: "Projects",
    icon: projects,
    category: "misc",
    showChevron: true,
  },
  {
    id: "online-courses",
    label: "Online Courses",
    icon: courses,
    category: "misc",
    showChevron: true,
  },
  {
    id: "user-profile",
    label: "User Profile",
    icon: profile,
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
    icon: acc,
    category: "pages",
    showChevron: true,
  },
  {
    id: "corporate",
    label: "Corporate",
    icon: corporate,
    category: "pages",
    showChevron: true,
  },
  {
    id: "blog",
    label: "Blog",
    icon: blog,
    category: "pages",
    showChevron: true,
  },
  {
    id: "social",
    label: "Social",
    icon: social,
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
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname.replace(/^\/+/, "");
  const [expanded, setExpanded] = useState(new Set(["user-profile"]));
  const [activeTopTab, setActiveTopTab] = useState("favorites"); // NEW: toggle between favorites / recently

  const groupedItems = menuItems.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, typeof menuItems>);

  return (
    <div
      className={`h-screen border-r border-gray-200 bg-white flex flex-col transition-all duration-300 
        ${collapsed ? "w-20" : "w-56"}`}
    >
      {/* Logo */}
      <div className="flex items-center p-4">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center">
            <img src={ByeWind} alt="ByeWind Logo" />
          </div>
          {!collapsed && (
            <div className="transition-opacity duration-200">
              <h1 className="text-gray-900 text-sm">ByeWind</h1>
            </div>
          )}
        </div>
      </div>

      {/* Top Tabs: Favorites / Recently */}
      {!collapsed && (
        <div className=" text-sm flex px-4 gap-10 justify-start">
          <button
            onClick={() => setActiveTopTab("favorites")}
            className={`rounded-md py-1.5 transition 
              ${
                activeTopTab === "favorites"
                  ? "text-gray-400 "
                  : " text-gray-300 "
              }`}
          >
            Favorites
          </button>
          <button
            onClick={() => setActiveTopTab("recently")}
            className={`  rounded-md py-1.5 transition 
              ${
                activeTopTab === "recently" ? "text-gray-400" : " text-gray-300"
              }`}
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
              <h3 className="mb-2 text-sm  text-gray-500  tracking-wide">
                {categories[category]}
              </h3>
            )}
            {collapsed && Object.keys(groupedItems).indexOf(category) !== 0 && (
              <div className="my-2 border-t border-gray-200" />
            )}
            <div className="space-y-1">
              {items.map((item) => {
                const isActive =
                  currentPath === item.id ||
                  currentPath.startsWith(`${item.id}/`);
                const hasSubmenu = !!item.children?.length;
                const showArrow =
                  hasSubmenu ||
                  (!!item.showChevron && category !== "favorites");

                return (
                  <div key={item.id}>
                    <button
                      onClick={() => {
                        if (hasSubmenu) {
                          setExpanded((prev) => {
                            const newSet = new Set(prev);
                            newSet.has(item.id)
                              ? newSet.delete(item.id)
                              : newSet.add(item.id);
                            return newSet;
                          });
                        } else {
                          navigate(`/`);
                        }
                      }}
                      title={collapsed ? item.label : ""}
                      className={`relative w-full flex items-center ${
                        item.selected ? "gap-4" : ""
                      } rounded-md text-sm font-normal transition-colors
                        ${
                          collapsed ? "justify-center  py-1" : " py-1 space-x-2"
                        }
                       
                        ${
                          isActive
                            ? " text-blue-600 border-l-2 border-gray-900"
                            : "text-black hover:bg-gray-100 hover:text-gray-900 "
                        }`}
                    >
                      {!collapsed && showArrow ? (
                        <span
                          className={`${
                            isActive ? "text-blue-600" : "text-gray-300"
                          }`}
                        >
                          {hasSubmenu && expanded.has(item.id) ? (
                            <ChevronDown size={16} />
                          ) : (
                            <ChevronRight size={16} />
                          )}
                        </span>
                      ) : (
                        <>
                          {isActive ||
                            (item.selected && (
                              <span className="absolute left-0 top-1/2 -translate-y-1/2 h-3 w-0.5 bg-black rounded-t-full rounded-b-full"></span>
                            ))}
                        </>
                      )}
                      {item.dot && (
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            isActive ? "bg-blue-600" : "bg-gray-300"
                          }`}
                        ></span>
                      )}

                      <span className="flex items-center space-x-1">
                        {item.icon && (
                          <img
                            src={item.icon}
                            className={`w-4 h-4 ${
                              isActive ? "text-blue-600" : "text-black"
                            }`}
                          />
                        )}
                        {!collapsed && (
                          <span
                            className={`truncate ${
                              isActive ? "text-blue-600" : "text-black"
                            }`}
                          >
                            {item.label}
                          </span>
                        )}
                      </span>
                    </button>

                    {/* Submenu */}
                    {hasSubmenu && expanded.has(item.id) && !collapsed && (
                      <div className="space-y-1 ml-6 mt-1">
                        {item.children.map((sub) => {
                          const subActive =
                            currentPath === `${item.id}/${sub.id}`;
                          return (
                            <button
                              key={sub.id}
                              onClick={() => navigate(`/${item.id}/${sub.id}`)}
                              className={`w-full text-left rounded-md text-sm px-2 py-1 transition-colors
                                ${
                                  subActive
                                    ? "bg-blue-50 text-blue-600"
                                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
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

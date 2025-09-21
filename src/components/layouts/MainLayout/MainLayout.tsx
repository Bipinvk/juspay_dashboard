// Layout.tsx
import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../Sidebar";
import Breadcrumb from "../../ui/Breadcrumb/breadCrumb";
import Notifications from "../../Notifications";
import TopNav from "../../TopNav";

interface LayoutProps {
  children?: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = () => {
  return (
    <div className="flex h-screen w-full overflow-hidden">
      <Sidebar collapsed={false} />
      <div className="flex-1 flex flex-col">
        <TopNav />
        <div className="flex-1  overflow-y-auto">
          <Outlet />
        </div>
      </div>
      <Notifications />
    </div>
  );
};

export default Layout;

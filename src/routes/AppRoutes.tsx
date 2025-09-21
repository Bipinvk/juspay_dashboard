// routes/AppRoutes.tsx
import { Routes, Route, Navigate, Router } from "react-router-dom";
import Layout from "../components/layouts/MainLayout/MainLayout";
import Dashboard from "../pages/Dashboard";
import OrderList from "../pages/OrderList";
const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Layout />}>
      <Route index path="/" element={<Dashboard />} />
      <Route path="orderlist" element={<OrderList />} />
    </Route>
  </Routes>
);

export default AppRoutes;

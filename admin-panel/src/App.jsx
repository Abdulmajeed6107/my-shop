import { BrowserRouter, Routes, Route } from "react-router-dom";

import ProtectedAdminRoute from "./components/ProtectedAdminRoute";
import Dashboard from "./pages/Dashboard";
import AddProduct from "./pages/AddProduct";
import Products from "./pages/Products";
import AdminLogin from "./pages/AdminLogin";
import AdminSignup from "./pages/AdminSignup";
import UpdateProduct from "./pages/UpdateProduct";
import { Orders } from "./pages/Orders";
import GetUsers from "./pages/Users";
import DashboardStats from "./pages/Dashbaordstats";
import OrderDetail from "./pages/OrderDetail";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<AdminLogin />} />
        <Route path="/admin/register" element={<AdminSignup />} />

        <Route path="/dashboard" element={
          <ProtectedAdminRoute><Dashboard /></ProtectedAdminRoute>
        } />

        <Route path="/add-product" element={
          <ProtectedAdminRoute><AddProduct /></ProtectedAdminRoute>
        } />

        <Route path="/products" element={
          <ProtectedAdminRoute><Products /></ProtectedAdminRoute>
        } />

        <Route path="/update-product/:id" element={
          <ProtectedAdminRoute><UpdateProduct /></ProtectedAdminRoute>
        } />

        <Route path="/orders" element={
          <ProtectedAdminRoute><Orders /></ProtectedAdminRoute>
        } />

        <Route path="/users" element={
          <ProtectedAdminRoute><GetUsers /></ProtectedAdminRoute>
        } />

        <Route path="/dashboardstats" element={
          <ProtectedAdminRoute><DashboardStats /></ProtectedAdminRoute>
        } />

        <Route path="/orders/:id" element={
          <ProtectedAdminRoute><OrderDetail /></ProtectedAdminRoute>
        } />

      </Routes>
    </BrowserRouter>
  )
}

export default App
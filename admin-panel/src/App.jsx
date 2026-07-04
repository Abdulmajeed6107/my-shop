import { BrowserRouter, Routes, Route } from "react-router-dom";


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

<Route 
path="/"
element={<AdminLogin/>}
/>

<Route 
path="/admin/register"
element={<AdminSignup/>}
/>

<Route
path="/dashboard"
element={<Dashboard/>}
/>


<Route
path="/add-product"
element={<AddProduct/>}
/>


<Route
path="/products"
element={<Products/>}
/>

<Route
path="/update-product/:id"
element={<UpdateProduct/>}
/>

<Route
path="/orders"
element={<Orders/>}
/>

<Route
path="/users"
element={<GetUsers/>}
/>

<Route
path="/dashboardstats"
element={<DashboardStats/>}
/>

<Route
path="/orders/:id"
element={<OrderDetail/>}
/>

</Routes>


</BrowserRouter>

  )
}

export default App

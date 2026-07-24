import {Route, Routes } from "react-router-dom";
import ProductsPage from "../pages/home/ProductsPage";
import ProductDetail from "../pages/home/productdetail/productdetails";
import Header from "../pages/header/Header";
import Login from "../pages/login/Login";
import Register from "../pages/register/Register";
import Cart from "../components/CartItem";
import CartSummary from "../components/CartSummary";
import LocationMap from "../components/LocationMap";
import OrderSuccess from "../components/OrderSuccess";
import AboutUs from "../pages/about";
import Profile from "../pages/profile/Profile";
import Admin from "../pages/admin/Admin";
import FavoritesPage from "../components/Favorites";
import Policies from '../pages/Policies/policies';
import Contact from "../pages/contact/Contact";
import Locator from '../pages/locator'
// import ContactUs from "../components/ContactUs";
// import AddToCart from "../pages/cart/addcart";

export default function AppRoute() 
{
return(
<Routes>
    <Route path="/" element = {<Header/>} />
    <Route path="/login" element = {<Login />} />
    <Route path="/register" element = {<Register />} />
    <Route path="/products" element = {<ProductsPage />} />
    <Route path="/product/productDetail/:id" element = {<ProductDetail />} />
    <Route path="/cart" element = {<Cart />} />
    <Route path="/locationmap" element = {<LocationMap />} />
    <Route path="/cartsummary" element = {<CartSummary />} />
    <Route path="/OrderSuccess" element={<OrderSuccess />} />
    {/* <Route path="/products" element = {<ProductsPage />} /> */}
    <Route path="/about" element = {<AboutUs />} />
    <Route path="/profile" element = {<Profile />} />
    <Route path="/admin" element = {<Admin />} />
    <Route path="/favorite" element= {<FavoritesPage  />} />
    <Route path="/policies" element= {<Policies  />} />
    <Route path="/contact" element= {<Contact  />} />
    <Route path="/locator" element= {<Locator  />} />

    
    {/* <Route path="/product/addtocart" element = {<AddToCart />} /> */}


</Routes>
);
}   

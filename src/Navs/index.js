import React from "react";
import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";
import AdminLogin from "../components/Admin/Auth";
import AdminLandingPage from "../components/Admin/AdminLandingPage";
import AdminDashboard from "../components/Admin/AdminDashboard";
import CMSOrders from "../components/Admin/CMSOrders";
import CMSProducts from "../components/Admin//CMSProduct";
import Sidebar from "../components/Sidebar";
import Auth from "../components/user/Auth";
import LandingPage from "../components/user/LandingPage";
import Category from "../components/user/Category";
import Product from "../components/user/PDP";
import Cart from "../components/user/Cart";
import Checkout from "../components/user/Checkout";
import Orders from "../components/user/Orders";

function Navs() {
  const RouteProtection = ({ type }) => {
    if (type === "user") {
      if (
        // check if the user is logged in
        true
      ) {
        return <Outlet />;
      } else {
        // redirect to user login page
        return <Navigate to="/auth" />;
      }
    } else {
      if (
        // check if the user is admin
        true
      ) {
        return (
          <Sidebar>
            <Outlet />
          </Sidebar>
        );
      } else {
        // redirect to admin login page
        return <Navigate to="/admin/login" />;
      }
    }
  };
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/admin/login" element={<AdminLogin />} />

        <Route element={<RouteProtection type={"admin"} />}>
          <Route path="admin/dashboard" element={<AdminDashboard />} />
          <Route path="admin/landingpage" element={<AdminLandingPage />} />
          <Route path="admin/products" element={<CMSProducts />} />
          <Route path="admin/orders" element={<CMSOrders />} />
        </Route>

        <Route path="/auth" element={<Auth />} />

        <Route path="/category/:catId" element={<Category />} />
        <Route path="/product/:productId" element={<Product />} />

        <Route path="/cart" element={<Cart />} />

        <Route element={<RouteProtection type={"user"} />}>
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/orders" element={<Orders />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Navs;

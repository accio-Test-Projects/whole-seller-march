import React from "react";
import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from "react-router-dom";
function Navs() {
  const RouteProtection = ({type}) => {
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
    }
    else{
    if (
      // check if the user is admin
      true
    ) {
      return <Outlet />;
    } else {
      // redirect to admin login page
      return <Navigate to="/admin/login" />;
    }
  }
  };
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<h1>landingpage</h1>} />
        <Route path="/admin/login" element={<h1>admin login</h1>} />

        <Route element={<RouteProtection type={'admin'} />}>
          <Route path="admin/dashboard" element={<h1>dashboard</h1>} />
          <Route
            path="admin/landingpage"
            element={<h1>landingpage admin</h1>}
          />
          <Route path="admin/products" element={<h1>products</h1>} />
          <Route path="admin/orders" element={<h1>orders</h1>} />
        </Route>

        <Route path="/auth" element={<h2>user auth</h2>} />

        <Route path="/category/:catId" element={<h2>category </h2>} />
        <Route path="/product/:productId" element={<h2>product</h2>} />

        <Route path="/cart" element={<h2>cart</h2>} />

        <Route element={<RouteProtection type={'user'} />}>
        <Route path="/checkout" element={<h2>checkout</h2>} />
        <Route path="/orders" element={<h2>orders</h2>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Navs;

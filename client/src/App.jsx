import React from "react";
import { Route, Routes } from "react-router-dom";
import AuthLogin from "./store/pages/auth/login";
import AuthRegister from "./store/pages/auth/register";
import AuthLayout from "./components/ui/auth/layout";
import AdminDashBoard from "./store/pages/admin-view/dashboard";
import AdminProducts from "./store/pages/admin-view/products";
import AdminOrders from "./store/pages/admin-view/orders";
import AdminFeatures from "./store/pages/admin-view/features";
import AdminLayout from "./components/admin-view/layout";
import ShoppingLayout from "./components/shopping-view/layout";
import NotFound from "./store/pages/not-found";
import ShoppingHome from "./store/pages/shopping-view/home";
import ShoppingList from "./store/pages/shopping-view/listing";
import ShoppingCheckOut from "./store/pages/shopping-view/checkout";
import ShoppingAccount from "./store/pages/shopping-view/account";
import CheckAuth from "./components/common/checkauth";
import { RollerCoaster } from "lucide-react";
import UnAuthPage from "./store/pages/unauth-page";

function App() {
  const isAuthenticated = false;
  const user = null;

  return (
    <div className="flex flex-col overflow-hidden bg-white">
      {/* rendering  common components*/}
      {/* <h1>Header component</h1> */}
      <Routes>
        <Route
          path="/auth"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AuthLayout />
            </CheckAuth>
          }
        >
          <Route path="login" element={<AuthLogin />} />
          <Route path="register" element={<AuthRegister />} />
        </Route>

        <Route
          path="/admin"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AdminLayout />
            </CheckAuth>
          }
        >
          <Route path="dashboard" element={<AdminDashBoard />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="features" element={<AdminFeatures />} />
        </Route>

        <Route
          path="/shop"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <ShoppingLayout />
            </CheckAuth>
          }
        >
          <Route path="home" element={<ShoppingHome />} />
          <Route path="listing" element={<ShoppingList />} />
          <Route path="checkout" element={<ShoppingCheckOut />} />
          <Route path="account" element={<ShoppingAccount />} />
        </Route>

        <Route path="*" element={<NotFound />} />
        <Route path="/unauth-page" element={<UnAuthPage />} />
      </Routes>
    </div>
  );
}

export default App;

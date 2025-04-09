// 3 props : 1.isAuthentication :checking 2.user :user info(if authenticated) 3.children :component we want to render

import { Navigate, useLocation } from "react-router-dom";

function CheckAuth({ user, isAuthenticated, children }) {
  const location = useLocation(); // gives current location (ur route) you are at
  console.log("Auth", isAuthenticated);
  console.log("user", user);
  console.log("path", location.pathname);
  if (location.pathname === "/") {
    if (!isAuthenticated) {
      return <Navigate to="/auth/login" />;
    } else {
      if (user?.role === "admin") {
        return <Navigate to="/admin/dashboard" />;
      } else {
        return <Navigate to="/shop/home" />;
      }
    }
  }

  if (
    !isAuthenticated &&
    !(
      location.pathname.includes("/login") ||
      location.pathname.includes("/register")
    )
  ) {
    return <Navigate to="/auth/login" />;
  }

  if (
    isAuthenticated &&
    (location.pathname.includes("/login") ||
      location.pathname.includes("/register"))
  ) {
    if (user?.role === "admin") {
      return <Navigate to="/admin/dashboard" />;
    } else {
      return <Navigate to="/shop/home" />;
    }
  }
  if (
    isAuthenticated &&
    user?.role !== "admin" &&
    location.pathname.includes("/admin")
  ) {
    return <Navigate to="/unauth-page" />;
  }
  if (
    isAuthenticated &&
    user?.role === "admin" &&
    location.pathname.includes("/shop")
  ) {
    return <Navigate to="admin/dashboard" />;
  }
  return <> {children}</>;
}

export default CheckAuth;

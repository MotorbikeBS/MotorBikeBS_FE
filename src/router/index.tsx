import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Register from "../pages/register-components/Register";
import LoginComponent from "../pages/login-component/LoginComponent";
import ForgotPasswordComponent from "../pages/forgot-password-component/ForgotPasswordComponent";
import AdminHome from "../pages/admin/home-component/AdminHome";
import CustomerHome from "../pages/customer/home-component/CustomerHomeComponent";
import PageNotFound from "../pages/page-notfound-component/PageNotFound";
const AppRoutes = () => {
  return (
    <Routes>
      {/* Common Router  */}
      <Route path="/" element={<Navigate to="/login" replace />} />

      <Route path="/sign-up" element={<Register />} />
      <Route path="/login" element={<LoginComponent />} />
      <Route path="/forgot-password" element={<ForgotPasswordComponent />} />

      {/* Page Not Found  */}
      <Route path="*" element={<PageNotFound />} />

      {/* Admin Router */}
      <Route path="/admin-home" element={<AdminHome />} />

      {/* Owner Router & Customer Router  */}
      <Route path="/customer-home" element={<CustomerHome />} />

      {/* Store Owner */}

    </Routes>
  );
};

export default AppRoutes;

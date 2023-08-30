import React from "react";
import { Route, Routes } from "react-router-dom";
import Register from "../pages/register-components/Register";
import LoginComponent from "../pages/login-component/LoginComponent";
import ForgotPasswordComponent from "../pages/forgot-password-component/ForgotPasswordComponent";
import AdminHome from "../pages/admin/home-component/AdminHome";
import CustomerHome from "../pages/buyer/home-component/HomeComponent";
const AppRoutes = () => {
  return (
    <Routes>
      {/* Common Router  */}
      <Route path="/sign-up" element={<Register />} />
      <Route path="/login" element={<LoginComponent />} />
      <Route path="/forgot-password" element={<ForgotPasswordComponent />} />

      {/* Page Not Found  */}
      <Route path="*" element={<LoginComponent />} />

      {/* Admin Router */}
      <Route path="/admin-home" element={<AdminHome />} />

      {/* BuyerRouter */}
      <Route path="/customer-home" element={<CustomerHome />} />

      {/* Owner Router  */}

      {/* Store Owner */}

    </Routes>
  );
};

export default AppRoutes;

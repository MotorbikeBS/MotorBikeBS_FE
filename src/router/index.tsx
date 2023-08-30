import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Register from "../pages/register-components/Register";
import LoginComponent from "../pages/login-component/LoginComponent";
import ForgotPasswordComponent from "../pages/forgot-password-component/ForgotPasswordComponent";
import AdminHome from "../pages/admin/home-component/AdminHome";
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="*" element={<LoginComponent />} />

      <Route path="/sign-up" element={<Register />} />
      <Route path="/login" element={<LoginComponent />} />
      <Route path="/forgot-password" element={<ForgotPasswordComponent />} />
      //Admin Router
      <Route path="/admin-home" element={<AdminHome />} />

      //BuyerRouter
      <Route path="/customer-home" element={<AdminHome />} />

    </Routes>
  );
};

export default AppRoutes;

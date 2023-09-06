import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Register from "../pages/register-components/Register";
import LoginComponent from "../pages/login-component/LoginComponent";
import ForgotPasswordComponent from "../pages/forgot-password-component/ForgotPasswordComponent";
import AdminHome from "../pages/admin/admin-home-component/AdminHome";
import CustomerHome from "../pages/customer/customer-home-component/CustomerHome";
import PageNotFound from "../pages/page-notfound-component/PageNotFound";
import StoreHome from "../pages/store-owner/store-home-component/StoreHome";
import UserProfile from "../pages/user-profile-component/UserProfile";
import EditUserProfile from "../pages/user-profile-component/EditUserProfile";
import StoreListComponent from "../pages/customer/store-list-component/StoreListComponent";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Common Router  */}
      <Route path="/" element={<Navigate to="/login" replace />} />

      <Route path="/sign-up" element={<Register />} />
      <Route path="/login" element={<LoginComponent />} />
      <Route path="/forgot-password" element={<ForgotPasswordComponent />} />
      <Route path="/store-list" element={<StoreListComponent />} />

      <Route path="/user/profile" element={<UserProfile />} />
      <Route path="/user/edit-profile" element={<EditUserProfile />} />

      {/* Page Not Found  */}
      <Route path="*" element={<PageNotFound />} />

      {/* Admin Router */}
      <Route path="/admin-home" element={<AdminHome />} />

      {/* Owner Router & Customer Router  */}
      <Route path="/customer-home" element={<CustomerHome />} />

      {/* Store Owner */}
      <Route path="/store-home" element={<StoreHome />} />
    </Routes>
  );
};

export default AppRoutes;

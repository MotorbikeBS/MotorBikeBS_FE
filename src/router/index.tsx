import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Register from "../pages/register/Register";
import Login from "../pages/login/Login";
import PageNotFound from "../pages/page-notfound/PageNotFound";
import UserProfile from "../pages/user-profile/UserProfile";
import EditUserProfile from "../pages/user-profile/EditUserProfile";
import ForgotPassword from "../pages/forgot-password/ForgotPassword";
import StoreList from "../pages/customer/store-list/StoreList";
import AdminHome from "../pages/admin/admin-home/AdminHome";
import CustomerHome from "../pages/customer/customer-home/CustomerHome";
import StoreHome from "../pages/store/store-home-component/StoreHome";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Common Router  */}
      <Route path="/" element={<Navigate to="/login" replace />} />

      <Route path="/sign-up" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/user/profile" element={<UserProfile />} />
      <Route path="/user/edit-profile" element={<EditUserProfile />} />

      {/* Page Not Found  */}
      <Route path="*" element={<PageNotFound />} />

      {/* Admin Router */}
      <Route path="/admin-home" element={<AdminHome />} />

      {/* Owner Router & Customer Router  */}
      <Route path="/customer-home" element={<CustomerHome />} />
      <Route path="/store-list" element={<StoreList />} />

      {/* Store Owner */}
      <Route path="/store-home" element={<StoreHome />} />
    </Routes>
  );
};

export default AppRoutes;

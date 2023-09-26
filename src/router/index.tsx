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
import OwnerHome from "../pages/owner/owner-home/OwnerHome";
import MotorBikeDetail from "../pages/customer/motorbike-detail/MotorBikeDetail";
import StoreDetail from "../pages/customer/store-detail/StoreDetail";
import SignUpStoreOwner from "../pages/customer/signup-store-owner/SignUpStoreOwner";
import SignUpMotorbikeOwner from "../pages/customer/signup-motorbike-owner/SignUpMotorbikeOwner";
import FauvoriteList from "../pages/customer/favourite-list/FauvoriteList";
import DateBooking from "../pages/customer/date-booking/DateBooking";
import VerifyAccount from "../pages/register/verify-account/VerifyAccount";
import BuyHistory from "../pages/customer/buy-history/date-booking/BuyHistory";
import ResetPassword from "../pages/forgot-password/reset-password/ResetPassword";
import ChangePassword from "../pages/user-profile/ChangePassword";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Common Router  */}
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />

      {/* Signup  */}
      <Route path="/sign-up" element={<Register />} />
      <Route path='/users/:id/verify/:token' element={<VerifyAccount />} />

      {/* forgot-passworrd */}
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/user/:id/reset-password/:token" element={<ResetPassword />} />
      <Route path="/change-password" element={<ChangePassword />} />

      <Route path="/user/profile" element={<UserProfile />} />
      <Route path="/user/edit-profile" element={<EditUserProfile />} />

      {/* Page Not Found  */}
      <Route path="*" element={<PageNotFound />} />

      {/* Admin Router */}
      <Route path="/admin-home" element={<AdminHome />} />

      {/*Customer Router  */}
      <Route path="/customer-home" element={<CustomerHome />} />
      <Route path="/store-list" element={<StoreList />} />
      <Route path="/store/:storeId" element={<StoreDetail />} />
      <Route path="/motorbike/:motorbikeId" element={<MotorBikeDetail />} />
      <Route path="/customer/store-owner-signup" element={<SignUpStoreOwner />} />
      <Route path="/customer/bike-owner-signup" element={<SignUpMotorbikeOwner />} />
      <Route path="/favourite-list" element={<FauvoriteList />} />
      <Route path="/date-booking" element={<DateBooking />} />
      <Route path="/buy-history" element={<BuyHistory />} />

      {/* Owner Router  */}
      <Route path="/owner-home" element={<OwnerHome />} /> {/* Store list */}

      {/* Store Owner */}
      <Route path="/store-home" element={<StoreHome />} />
    </Routes>
  );
};

export default AppRoutes;

import React, { useEffect } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import Register from '../pages/register/Register';
import Login from '../pages/login/Login';
import PageNotFound from '../pages/page-notfound/PageNotFound';
import UserProfile from '../pages/user-profile/UserProfile';
import EditUserProfile from '../pages/user-profile/EditUserProfile';
import ForgotPassword from '../pages/forgot-password/ForgotPassword';
import StoreList from '../pages/customer/store-list/StoreList';
import AdminHome from '../pages/admin/admin-home/AdminHome';
import CustomerHome from '../pages/customer/customer-home/CustomerHome';
import StoreHome from '../pages/store/store-home-component/StoreHome';
import OwnerHome from '../pages/owner/owner-home/OwnerHome';
import MotorBikeDetail from '../pages/customer/motorbike-detail/MotorBikeDetail';
import StoreDetail from '../pages/customer/store-detail/StoreDetail';
import SignUpStoreOwner from '../pages/customer/signup-store-owner/SignUpStoreOwner';
import SignUpMotorbikeOwner from '../pages/customer/signup-motorbike-owner/SignUpMotorbikeOwner';
import FauvoriteList from '../pages/customer/favourite-list/FauvoriteList';
import DateBooking from '../pages/customer/date-booking/DateBooking';
import VerifyAccount from '../pages/register/verify-account/VerifyAccount';
import BuyHistory from '../pages/customer/buy-history/date-booking/BuyHistory';
import ResetPassword from '../pages/forgot-password/reset-password/ResetPassword';
import ChangePassword from '../pages/user-profile/ChangePassword';
import { useAppSelector } from '../services/store/store';
import ListUser from '../pages/admin/list-user/ListUser';

const AppRoutes = () => {
    const { user } = useAppSelector((state) => state.account);
    const navigate = useNavigate();
    useEffect(() => {
        const storeLocal = localStorage.getItem('motorbike_bs');
        if (!storeLocal) {
            navigate('/login');
        }
    }, [navigate]);

    return (
        <Routes>
            {user === null && (
                <>
                    {/*========================================= COMMON ROUTE ===================================  */}
                    <Route
                        path="/"
                        element={<Navigate to="/login" replace />}
                    />
                    <Route path="/login" element={<Login />} />
                    {/* Page Not Found  */}
                    <Route path="*" element={<PageNotFound />} />

                    {/* Signup  */}
                    <Route path="/sign-up" element={<Register />} />
                    <Route
                        path="/users/:id/verify/:token"
                        element={<VerifyAccount />}
                    />

                    {/* forgot-passworrd */}
                    <Route
                        path="/forgot-password"
                        element={<ForgotPassword />}
                    />
                    <Route
                        path="/user/:id/reset-password/:token"
                        element={<ResetPassword />}
                    />
                </>
            )}
            {/* ============================================== ROUTE ADMIN ======================================================== */}
            {user?.roleId === 1 && (
                <>
                    {/* Admin Router */}
                    <Route
                        path="/"
                        element={<Navigate to="/admin-home" replace />}
                    />
                    <Route path="/admin-home" element={<AdminHome />} />
                    <Route path="/list-user" element={<ListUser />} />

                    <Route path="*" element={<PageNotFound />} />
                </>
            )}
            {/* ============================================== ROUTE STORE ======================================================== */}
            {user?.roleId === 2 && (
                <>
                    {/* Store Owner */}
                    <Route
                        path="/"
                        element={<Navigate to="/store-home" replace />}
                    />

                    <Route path="/store-home" element={<StoreHome />} />

                    <Route path="*" element={<PageNotFound />} />
                </>
            )}
            {/* ============================================== ROUTE OWNER ==================================================== */}
            {user?.roleId === 3 && (
                <>
                    {/* Owner Router  */}
                    <Route
                        path="/"
                        element={<Navigate to="/owner-home" replace />}
                    />
                    <Route path="/owner-home" element={<OwnerHome />} />{' '}
                    <Route path="/store/:storeId" element={<StoreDetail />} />
                    <Route path="*" element={<PageNotFound />} />
                    <Route
                        path="/motorbike/:motorbikeId"
                        element={<MotorBikeDetail />}
                    />
                    {/* Store list */}
                </>
            )}
            {/* ============================================== ROUTE CUSTOMER ================================================== */}
            {user?.roleId === 4 && (
                <>
                    {/*Customer Router  */}
                    <Route
                        path="/"
                        element={<Navigate to="/customer-home" replace />}
                    />

                    <Route path="/customer-home" element={<CustomerHome />} />
                    <Route path="/store-list" element={<StoreList />} />
                    <Route path="/store/:storeId" element={<StoreDetail />} />
                    <Route
                        path="/motorbike/:motorbikeId"
                        element={<MotorBikeDetail />}
                    />
                    <Route
                        path="/customer/store-owner-signup"
                        element={<SignUpStoreOwner />}
                    />
                    <Route
                        path="/customer/bike-owner-signup"
                        element={<SignUpMotorbikeOwner />}
                    />
                    <Route path="/favourite-list" element={<FauvoriteList />} />
                    <Route path="/date-booking" element={<DateBooking />} />
                    <Route path="/buy-history" element={<BuyHistory />} />

                    <Route path="*" element={<PageNotFound />} />
                </>
            )}
            {/*================================================= ROUTE SHARED ==================================================*/}
            {user !== null && (
                <>
                    <Route
                        path="/change-password"
                        element={<ChangePassword />}
                    />

                    <Route path="/user/profile" element={<UserProfile />} />
                    <Route
                        path="/user/edit-profile"
                        element={<EditUserProfile />}
                    />
                </>
            )}
            {/* ====================================================== Page Not Found =========================================  */}
            {/* <Route path="*" element={<PageNotFound />} /> */}
        </Routes>
    );
};

export default AppRoutes;

import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
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
import VerifyAccount from '../pages/register/verify-account/VerifyAccount';
import BuyHistory from '../pages/customer/buy-history/date-booking/BuyHistory';
import ResetPassword from '../pages/forgot-password/reset-password/ResetPassword';
import ChangePassword from '../pages/user-profile/ChangePassword';
import { useAppSelector } from '../services/store/store';
import ListUser from '../pages/admin/list-user/ListUser';
import StoreListAdmin from '../pages/admin/store-list/StoreList';
import MotorOwnerExchange from '../pages/store/motor-owner-exchange/MotorOwnerExchange';
import OwnerMotorDetail from '../pages/store/motor-owner-exchange/OwnerMotorDetail';
import OwnerMotorList from '../pages/owner/owner-motor-list/OwnerMotorList';
import BookingListOwner from '../pages/owner/booking-component/BookingListOwner';
import StoreMotorList from '../pages/store/store-motor-list/StoreMotorList';
import BookingListStore from '../pages/store/booking-list/BookingListStore';
import MotorBikeDetailForStore from '../pages/customer/motorbike-detail/MotorBikeDetailForStore';
import MotorFields from '../pages/admin/motorFields-component/MotorFields';
import OwnerMotorAcceptNegotitationDetail from '../pages/store/motor-owner-exchange/OwnerMotorAcceptNegotiationDetail';
import ContractHistoryList from '../pages/store/contract-list/ContractHistoryList';
import ContractHistoryWithStore from '../pages/owner/contract-list-with-store/ContractHistoryWithStore';
import CustomerBookingComponentWithStore from '../pages/customer/customer-booking/CustomerBookingWithStoreComponent';

const AppRoutes = () => {
    const { account } = useAppSelector((state) => state.account);

    const token = localStorage.getItem('motorbike_bs');

    return (
        <Routes>
            <Route
                path="/user/:id/reset-password/:token"
                element={<ResetPassword />}
            />

            <Route
                path="/users/:id/verify/:token"
                element={<VerifyAccount />}
            />

            {(account === null || account === undefined || token === null) && (
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

                    {/* forgot-passworrd */}
                    <Route
                        path="/forgot-password"
                        element={<ForgotPassword />}
                    />
                </>
            )}
            {/* ============================================== ROUTE ADMIN ======================================================== */}
            {account?.roleId === 1 && token && (
                <>
                    {/* Admin Router */}
                    <Route
                        path="/"
                        element={<Navigate to="/admin-home" replace />}
                    />
                    <Route path="/admin-home" element={<AdminHome />} />
                    <Route path="/list-user" element={<ListUser />} />
                    <Route
                        path="/store-list-admin"
                        element={<StoreListAdmin />}
                    /><Route
                        path="/motor-fields"
                        element={<MotorFields />}
                    />
                    <Route path="*" element={<PageNotFound />} />
                </>
            )}
            {/* ============================================== ROUTE STORE ======================================================== */}
            {account?.roleId === 2 && token && (
                <>
                    {/* Store Owner */}
                    <Route
                        path="/"
                        element={<Navigate to="/dashboard" replace />}
                    />
                    <Route path="/dashboard" element={<StoreHome />} />
                    <Route
                        path="/motorbike-exchange"
                        element={<MotorOwnerExchange />}
                    />
                    <Route
                        path="/motorbike/:motorbikeId"
                        element={<OwnerMotorDetail />}
                    />
                    <Route
                        path="/negotiation/detail/:negotiationId"
                        element={<OwnerMotorAcceptNegotitationDetail />}
                    />
                    <Route
                        path="/motorbike-list"
                        element={<StoreMotorList />}
                    />
                    <Route
                        path='/booking-list'
                        element={<BookingListStore />}
                    />
                    <Route
                        path='/store/contract'
                        element={<ContractHistoryList />}
                    />
                    <Route path="*" element={<PageNotFound />} />
                </>
            )}
            {/* ============================================== ROUTE OWNER ==================================================== */}
            {account?.roleId === 3 && token && (
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
                    <Route
                        path="/store/motorbike/:motorbikeId"
                        element={<MotorBikeDetailForStore />}
                    />
                    <Route path="/owner/motors" element={<OwnerMotorList />} />
                    <Route path='/owner/my-booking' element={<BookingListOwner />} />
                    <Route path='/owner/contract' element={<ContractHistoryWithStore />} />
                </>
            )}
            {/* ============================================== ROUTE CUSTOMER ================================================== */}
            {account?.roleId === 4 && token && (
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
                        path="/store/motorbike/:motorbikeId"
                        element={<MotorBikeDetailForStore />}
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
                    <Route path="/customer/my-booking" element={<CustomerBookingComponentWithStore />} />
                    <Route path="/buy-history" element={<BuyHistory />} />

                    <Route path="*" element={<PageNotFound />} />
                </>
            )}
            {/*================================================= ROUTE SHARED ==================================================*/}
            {account !== null && (
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
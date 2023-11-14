// Import các module cần thiết
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useSelector, useDispatch } from 'react-redux';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import accountSlice from '../features/auth/accountSlice';
import userslice from '../features/user/userSlice';
import storeSlice from '../features/store/storeSlice';
import motorbikeSlice from '../features/motorbike/motorbikeSlice';
import motorFiledsSlice from '../features/motorbike/motorFields';
import ownerSlice from '../features/owner/ownerSlice';
import wishListSlice from '../features/motorbike/wishListSlice';
import billSlice from '../features/bill/billSlice';
import customerBookingSlice from '../features/booking/customerBookingSlice';
import paymentSlice from '../features/payment/paymentSlice';
import valuationSlice from '../features/valuation/valuationSlice';
import negotiationSlice from '../features/negotiation/negotiationSlice';
import postBootingSlice from '../features/posting/postBootingSlice';

// Định nghĩa cấu hình persist
const persistConfig = {
    key: 'root',
    storage,
    whitelist: [
        'account',
        'users',
        'store',
        'owner',
        'motorbikes',
        'motorFields',
        'wishlist',
        'negotiation',
        'customerBooking',
        'bill',
        'payment',
        'post',
    ],
};

const rootReducer = combineReducers({
    account: accountSlice,
    users: userslice,
    store: storeSlice,
    owner: ownerSlice,
    motorbikes: motorbikeSlice,
    motorFields: motorFiledsSlice,
    wishlist: wishListSlice,
    negotiation: negotiationSlice,
    valuation: valuationSlice,
    postBooting: postBootingSlice,
    customerBooking: customerBookingSlice,
    bill: billSlice,
    payment: paymentSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// Import các module cần thiết
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useSelector, useDispatch } from 'react-redux';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import accountSlice from '../features/accountSlice';
import userslice from '../features/userSlice';
import storeSlice from '../features/storeSlice';
import motorbikeSlice from '../features/motorbikeSlice';
import motorFiledsSlice from '../features/motorFields';
import ownerSlice from '../features/ownerSlice';
import wishListSlice from './../features/wishListSlice';

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

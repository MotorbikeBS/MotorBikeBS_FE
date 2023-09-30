import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IRegisterStore } from '../../models/Account/AccountInterface';
import axios from 'axios';
import {
    getAllStoreEndPoint,
    registerStoreEndPoint,
} from '../config/api-config';
import { toast } from 'react-toastify';
import { IStore } from '../../models/Store/Store';

interface StoreState {
    loading: boolean;
    storeRegister: IRegisterStore | null;
    stores: IStore[] | null;
    error: string[] | unknown;
}

const initialState: StoreState = {
    loading: false,
    storeRegister: null,
    stores: null,
    error: null,
};

export const registerStore = createAsyncThunk<IRegisterStore, Object>(
    'store/registerStore',
    async (data, thunkAPI) => {
        try {
            const token = localStorage.getItem('motorbike_bs');
            const response = await axios.post(registerStoreEndPoint, data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            toast.success(
                'Đăng ký tài khoản chủ cửa hàng thành công! Đợi xem xét !',
            );
            return response.data;
        } catch (error: any) {
            toast.error('Có lỗi xảy ra, vui lòng thử lại sau !');
            return thunkAPI.rejectWithValue({
                error: error.response?.data?.errorMessages,
            });
        }
    },
);

export const getAllStore = createAsyncThunk<IStore[], void>(
    'store/getAllStore',
    async (_, thunkAPI) => {
        try {
            const token = localStorage.getItem('motorbike_bs');
            const response = await axios.get(getAllStoreEndPoint, {
                headers: {
                    Authorization: `Beare ${token}`,
                },
            });
            return response.data.result;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({
                error: error.response?.data?.errorMessages,
            });
        }
    },
);

export const storeSlice = createSlice({
    name: 'store',
    initialState,
    reducers: {
        setError: (state, action) => {
            state.error = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(registerStore.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(registerStore.fulfilled, (state, action) => {
            state.loading = false;
            state.storeRegister = action.payload;
            state.error = null;
        });
        builder.addCase(registerStore.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
        builder.addCase(getAllStore.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getAllStore.fulfilled, (state, action) => {
            state.loading = false;
            state.stores = action.payload;
        });
        builder.addCase(getAllStore.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    },
});

export const { setError } = storeSlice.actions;
export default storeSlice.reducer;

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import {
    loginEndpoint,
    signupEndpoint,
    verifyEndpoit,
} from '../config/api-config';
import { toast } from 'react-toastify';
import { IUser } from '../../models/Account/UserInterface';

interface AccountState {
    loading: boolean;
    user: IUser | null;
    error: string[] | unknown;
}

const initialState: AccountState = {
    loading: false,
    user: null,
    error: null,
};

export const registerUser = createAsyncThunk<IUser, Object>(
    'auth/register-user',
    async (data, thunkAPI) => {
        try {
            const response = await axios.post(signupEndpoint, data);
            toast.success(
                'Đăng ký thành công ! Vui lòng xác minh email để tiếp tục !',
            );
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({
                error: error.response?.data?.errorMessages,
            });
        }
    },
);
export const verifyEmail = createAsyncThunk<
    IUser,
    { id: number; token: string }
>('auth/verify-email', async (data, thunkAPI) => {
    const { id, token } = data;
    try {
        const response = await axios.post(
            `${verifyEndpoit}?id=${id}&token=${token}`,
        );
        toast.success('Xác minh email thành công !');
        return response.data;
    } catch (error: any) {
        console.log(error);
        toast.error(
            'Xác minh email không thành công ! Token không hợp lệ hoặc đã hết hạn !',
        );
        return thunkAPI.rejectWithValue({
            error: error.response?.data?.errorMessages,
        });
    }
});

export const loginUser = createAsyncThunk<IUser, string | Object>(
    'auth/login-user',
    async (data, thunkAPI) => {
        try {
            const response = await axios.post(loginEndpoint, data);
            const token = response.data.result.token;
            localStorage.setItem('motorbike_bs', token);
            toast.success('Đăng nhập thành công !');
            return response.data;
        } catch (error: any) {
            toast.error('Đăng nhập không thành công !');
            return thunkAPI.rejectWithValue({
                error: error.response?.data?.errorMessages,
            });
        }
    },
);

export const accountSlice = createSlice({
    name: 'account',
    initialState,
    reducers: {
        setError: (state, action) => {
            state.error = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(registerUser.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(registerUser.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload;
            state.error = null;
        });
        builder.addCase(registerUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });

        builder.addCase(loginUser.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(loginUser.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload;
            state.error = null;
        });
        builder.addCase(loginUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
        builder.addCase(verifyEmail.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(verifyEmail.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload;
            state.error = null;
        });
        builder.addCase(verifyEmail.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    },
});
export const { setError } = accountSlice.actions;

export default accountSlice.reducer;

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import {
    forgotPasswordEndPoint,
    loginEndpoint,
    resetPasswordEndPoint,
    signupEndPoint,
    verifyEndPoit,
} from '../../config/api-config';
import { toast } from 'react-toastify';
import { IAccount } from '../../../models/Account/AccountInterface';

interface AccountState {
    loading: boolean;
    account: IAccount | null;
    error: string[] | unknown;
    success: boolean;
    verify: boolean;
    reset: boolean;
}

const initialState: AccountState = {
    loading: false,
    account: null,
    success: false,
    verify: false,
    reset: false,
    error: null,
};

export const registerUser = createAsyncThunk<IAccount, Object>(
    'auth/register-user',
    async (data, thunkAPI) => {
        try {
            const response = await axios.post(signupEndPoint, data);
            toast.success(
                'Đăng ký thành công ! Vui lòng xác minh email để tiếp tục !',
            );
            return response.data;
        } catch (error: any) {
            if (error.response) {
                toast.error(`${error.response.data?.errorMessages}`);
                return thunkAPI.rejectWithValue({
                    error: error.response?.data?.errorMessages,
                });
            }
        }
    },
);
export const verifyEmail = createAsyncThunk<
    IAccount,
    { id: number; token: string }
>('auth/verify-email', async (data, thunkAPI) => {
    const { id, token } = data;
    try {
        const response = await axios.post(
            `${verifyEndPoit}?id=${id}&token=${token}`,
        );
        toast.success('Xác minh email thành công !');
        return response.data;
    } catch (error: any) {
        if (error.response) {
            toast.error(`${error.response.data?.errorMessages}`);
            return thunkAPI.rejectWithValue({
                error: error.response?.data?.errorMessages,
            });
        }
    }
});

export const loginUser = createAsyncThunk<IAccount, string | Object>(
    'auth/login-user',
    async (data, thunkAPI) => {
        try {
            const response = await axios.post(loginEndpoint, data);
            const token = response.data.result.token;
            localStorage.setItem('motorbike_bs', token);
            // toast.success('Đăng nhập thành công !');
            toast.success(response.data.message);
            return response.data.result;
        } catch (error: any) {
            if (error.response) {
                toast.error(`${error.response.data?.errorMessages}`);
                return thunkAPI.rejectWithValue({
                    error: error.response?.data?.errorMessages,
                });
            }
        }
    },
);
export const logoutUser = createAsyncThunk<IAccount | null, string | Object>(
    'auth/logout-user',
    async (data, thunkAPI) => {
        try {
            localStorage.removeItem('motorbike_bs');
            toast.success('Đăng xuất thành công !');

            return null;
        } catch (error: any) {
            toast.error('Đăng xuất không thành công !');
            return thunkAPI.rejectWithValue({
                error: error.response?.data?.errorMessages,
            });
        }
    },
);

export const forgotPassword = createAsyncThunk<IAccount, { email: string }>(
    'auth/forgot-pasword',
    async (data, thunkAPI) => {
        const { email } = data;
        try {
            const response = await axios.post(
                `${forgotPasswordEndPoint}?email=${email}`,
            );
            toast.success('Mã xác minh đã được gửi đến email của bạn !');
            return response.data;
        } catch (error: any) {
            if (error.response) {
                toast.error(`${error.response.data?.errorMessages}`);
                return thunkAPI.rejectWithValue({
                    error: error.response?.data?.errorMessages,
                });
            }
        }
    },
);
export const resetPassword = createAsyncThunk<
    IAccount,
    { token: string; password: string; passwordConfirmed: string }
>('auth/reset-password', async (data, thunkAPI) => {
    const { token, password, passwordConfirmed } = data;
    try {
        const response = await axios.post(
            `${resetPasswordEndPoint}?token=${token}`,
            { password, passwordConfirmed },
        );
        toast.success('Đổi mật khẩu thành công! Bạn có thể đăng nhập !');
        return response.data;
    } catch (error: any) {
        if (error.response) {
            toast.error(`${error.response.data?.errorMessages}`);
            return thunkAPI.rejectWithValue({
                error: error.response?.data?.errorMessages,
            });
        }
    }
});

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
            state.success = true;
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
            state.account = action.payload;
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
            state.verify = true;
            state.error = null;
        });
        builder.addCase(verifyEmail.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
        builder.addCase(forgotPassword.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(forgotPassword.fulfilled, (state, action) => {
            state.loading = false;
            // state.account = action.payload;
            state.success = true;
            state.error = null;
        });
        builder.addCase(forgotPassword.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
        builder.addCase(resetPassword.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(resetPassword.fulfilled, (state, action) => {
            state.loading = false;
            // state.account = action.payload;
            state.reset = true;
            state.error = null;
        });
        builder.addCase(resetPassword.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
        builder.addCase(logoutUser.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(logoutUser.fulfilled, (state, action) => {
            state.loading = false;
            state.account = action.payload;
            state.error = null;
        });
        builder.addCase(logoutUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    },
});
export const { setError } = accountSlice.actions;

export default accountSlice.reducer;

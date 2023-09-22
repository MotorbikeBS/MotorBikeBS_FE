import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { ISignup } from '../../models/Account/UserInterface';
import { signupEndpoint } from '../config/api-config';
import { toast } from 'react-toastify';

interface AccountState {
    loading: boolean;
    user: ISignup | null;
    isLoggedIn: boolean;
    error: string[] | unknown;
}

const initialState: AccountState = {
    loading: false,
    user: null,
    isLoggedIn: false,
    error: null,
};

export const registerUser = createAsyncThunk<ISignup, Object>(
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
                error: error.response.data.errors,
            });
        }
    },
);
export const accountReducer = createSlice({
    name: 'account',
    initialState,
    reducers: {},
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
    },
});
export default accountReducer.reducer;

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IRegisterOwner } from '../../../models/Account/AccountInterface';
import { toast } from 'react-toastify';
import { IUser } from '../../../models/User/UserInterface';
import axios from 'axios';
import { ownerRegisterEndPoint } from '../../config/api-config';

interface OwnerState {
    loading: boolean;
    error: string[] | unknown;
    ownerRegister: IUser | null;
}

const initialState: OwnerState = {
    loading: false,
    error: null,
    ownerRegister: null,
};

export const ownerRegister = createAsyncThunk<IUser, IRegisterOwner>(
    'owners/ownerRegister',
    async (data, thunkAPI) => {
        try {
            const token = localStorage.getItem('motorbike_bs');
            const response = await axios.put(ownerRegisterEndPoint, data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            toast.success(
                'Đăng ký tài khoản chủ xe thành công ! vui lòng đăng nhập lại để thực hiện các chức năng',
            );
            return response.data;
        } catch (error: any) {
            toast.error('Có lỗi xảy ra ! Vui lòng kiểm tra lại ! ');
            return thunkAPI.rejectWithValue({
                error: error.response?.data?.errorMessages,
            });
        }
    },
);

export const ownerSlice = createSlice({
    name: 'owners',
    initialState,
    reducers: {
        setError: (state, action) => {
            state.error = action.payload;
        },
        clearError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(ownerRegister.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(ownerRegister.fulfilled, (state, action) => {
            state.loading = false;
            state.ownerRegister = action.payload;
            state.error = null;
        });
        builder.addCase(ownerRegister.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    },
});

export const { setError, clearError } = ownerSlice.actions;
export default ownerSlice.reducer;

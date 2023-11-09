import { error } from 'console';
import { IPaymentRequest } from '../../../models/Payment/Payment';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { paymentRequestEndPoint } from '../../config/api-config';
import { toast } from 'react-toastify';

interface IPaymentState {
    loading: boolean;
    error: string[] | unknown;
    paymentRequest: IPaymentRequest | null;
}
const initialState: IPaymentState = {
    loading: false,
    error: null,
    paymentRequest: null,
};

export const paymentPointRequest = createAsyncThunk<
    IPaymentRequest | null,
    Object
>('payment/paymentPointRequest', async (data, thunkAPI) => {
    try {
        const token = localStorage.getItem('motorbike_bs');
        const response = await axios.post(paymentRequestEndPoint, data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        toast.success('Đang chuyển hướng');
        return response.data.result;
    } catch (error: any) {
        toast.error(`${error.response.data?.errorMessages}`);
        return thunkAPI.rejectWithValue({
            error: error.response?.data?.errorMessages,
        });
    }
});

export const paymentSlice = createSlice({
    name: 'payment',
    initialState,
    reducers: {
        clearPayment: (state) => {
            state.paymentRequest = null;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(paymentPointRequest.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(paymentPointRequest.fulfilled, (state, action) => {
            state.loading = false;
            state.paymentRequest = action.payload;
        });
        builder.addCase(paymentPointRequest.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    },
});
export const { clearPayment } = paymentSlice.actions;

export default paymentSlice.reducer;

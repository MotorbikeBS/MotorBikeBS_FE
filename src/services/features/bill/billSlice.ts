import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { toast } from 'react-toastify';
import { IBill } from '../../../models/Bill/Bill';
import {
    createBillConsignmentEndPoint,
    createBillInStockEndPoint,
    createBillNonConsignmentEndPoint,
    getBillByIdEndPoint,
    getBillByStoreIdEndPoint,
    getBillByUserIDEndPoint,
} from '../../config/api-config';

interface BillState {
    loading: boolean;
    error: string[] | unknown;
    billStore: IBill[] | null;
    billUser: IBill[] | null;
}

const initialState: BillState = {
    loading: false,
    error: null,
    billStore: null,
    billUser: null,
};

export const getBillByStoreId = createAsyncThunk<
    IBill[],
    { receiverId: number }
>('bill/getBillByStoreId', async ({ receiverId }, thunkAPI) => {
    try {
        const token = localStorage.getItem('motorbike_bs');
        const response = await axios.get(
            `${getBillByStoreIdEndPoint}?receiverId=${receiverId}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
        );
        return response.data.result;
    } catch (error: any) {
        toast.error(`${error.response.data?.errorMessages}`);
        return thunkAPI.rejectWithValue({
            error: error.response?.data?.errorMessages,
        });
    }
});

export const getBillByUserId = createAsyncThunk<IBill[], { userId: number }>(
    'bill/getBillByUserId',
    async ({ userId }, thunkAPI) => {
        try {
            const token = localStorage.getItem('motorbike_bs');
            const response = await axios.get(
                `${getBillByUserIDEndPoint}?UserId=${userId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            );
            return response.data.result;
        } catch (error: any) {
            toast.error(`${error.response.data?.errorMessages}`);
            return thunkAPI.rejectWithValue({
                error: error.response?.data?.errorMessages,
            });
        }
    },
);

export const getBillByBillId = createAsyncThunk<IBill, { billId: number }>(
    'bill/getBillByBillId',
    async ({ billId }, thunkAPI) => {
        try {
            const token = localStorage.getItem('motorbike_bs');
            const response = await axios.get(
                `${getBillByIdEndPoint}?receiverId=${billId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            );
            return response.data.result;
        } catch (error: any) {
            toast.error(`${error.response.data?.errorMessages}`);
            return thunkAPI.rejectWithValue({
                error: error.response?.data?.errorMessages,
            });
        }
    },
);

export const createBillInStock = createAsyncThunk<
    IBill,
    { newUser: number; motorId: number }
>('bill/createBillInStock', async ({ newUser, motorId }, thunkAPI) => {
    try {
        const token = localStorage.getItem('motorbike_bs');
        const response = await axios.post(
            `${createBillInStockEndPoint}?newUser=${newUser}&MotorID=${motorId}`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
        );
        return response.data.result;
    } catch (error: any) {
        toast.error(`${error.response.data?.errorMessages}`);
        return thunkAPI.rejectWithValue({
            error: error.response?.data?.errorMessages,
        });
    }
});

export const createBillConsignment = createAsyncThunk<
    IBill,
    { newUser: number; motorId: number }
>('bill/createBillConsignment', async ({ newUser, motorId }, thunkAPI) => {
    try {
        const token = localStorage.getItem('motorbike_bs');
        const response = await axios.post(
            `${createBillConsignmentEndPoint}?newUser=${newUser}&MotorID=${motorId}`,{},
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
        );
        return response.data.result;
    } catch (error: any) {
        toast.error(`${error.response.data?.errorMessages}`);
        return thunkAPI.rejectWithValue({
            error: error.response?.data?.errorMessages,
        });
    }
});

export const createBillNonConsignment = createAsyncThunk<
    IBill,
    { motorId: number }
>('bill/createBillNonConsignment', async ({ motorId }, thunkAPI) => {
    try {
        const token = localStorage.getItem('motorbike_bs');
        const response = await axios.post(
            `${createBillNonConsignmentEndPoint}?MotorID=${motorId}`,{},
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
        );
        return response.data.result;
    } catch (error: any) {
        toast.error(`${error.response.data?.errorMessages}`);
        return thunkAPI.rejectWithValue({
            error: error.response?.data?.errorMessages,
        });
    }
});

export const billSlice = createSlice({
    name: 'bookingOwerExchange',
    initialState,
    reducers: {
        clearBill: (state) => {
            state.billStore = null;
            state.billUser = null;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getBillByStoreId.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getBillByStoreId.fulfilled, (state, action) => {
            state.loading = false;
            state.billStore = action.payload;
            state.error = null;
        });
        builder.addCase(getBillByStoreId.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
        builder.addCase(getBillByUserId.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getBillByUserId.fulfilled, (state, action) => {
            state.loading = false;
            state.billUser = action.payload;
            state.error = null;
        });
        builder.addCase(getBillByUserId.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
        builder.addCase(getBillByBillId.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getBillByBillId.fulfilled, (state, action) => {
            state.loading = false;
            state.error = null;
        });
        builder.addCase(getBillByBillId.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
        builder.addCase(createBillInStock.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(createBillInStock.fulfilled, (state, action) => {
            state.loading = false;
            state.error = null;
        });
        builder.addCase(createBillInStock.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
        builder.addCase(createBillConsignment.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(createBillConsignment.fulfilled, (state, action) => {
            state.loading = false;
            state.error = null;
        });
        builder.addCase(createBillConsignment.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
        builder.addCase(createBillNonConsignment.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(createBillNonConsignment.fulfilled, (state, action) => {
            state.loading = false;
            state.error = null;
        });
        builder.addCase(createBillNonConsignment.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    },
});

export const { clearBill } = billSlice.actions;
export default billSlice.reducer;

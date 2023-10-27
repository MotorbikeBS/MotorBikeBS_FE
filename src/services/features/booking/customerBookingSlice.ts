import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
    ICustomerBooking,
    ICustomerBookingField,
} from '../../../models/Booking/CustomerBooking';
import { toast } from 'react-toastify';
import axios from 'axios';
import {
    acceptBookingBuyerEndPoint,
    buyerBookingNonConsignmentEndPoint,
    cancelBookingBuyerEndPoint,
    getBookingBuyerEndPoint,
    rejectBookingBuyerEndPoint,
} from '../../config/api-config';

interface CustomerBookingState {
    loading: boolean;
    error: string[] | unknown;
    customerBooking: ICustomerBooking | null;
    getAllCustomerBooking: ICustomerBooking[] | null;
}

const initialState: CustomerBookingState = {
    loading: false,
    error: null,
    customerBooking: null,
    getAllCustomerBooking: null,
};

export const customerBookingWithStore = createAsyncThunk<
    ICustomerBooking,
    ICustomerBookingField
>(
    'buyerBooking/customerBookingWithStore',
    async (data: ICustomerBookingField, thunkAPI) => {
        const { motorId, bookingDate, note } = data;
        try {
            const token = localStorage.getItem('motorbike_bs');
            const response = await axios.post(
                `${buyerBookingNonConsignmentEndPoint}?motorId=${motorId}`,
                { bookingDate, note },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            );
            toast.success(`${response.data.message}`);
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

export const getAllBookingByCustomer = createAsyncThunk<
    ICustomerBooking[],
    void
>('buyerBooking/getAllBookingByCustomer', async (_, thunkAPI) => {
    try {
        const token = localStorage.getItem('motorbike_bs');
        const response = await axios.get(getBookingBuyerEndPoint, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data.result;
    } catch (error: any) {
        if (error.response) {
            toast.warning(`${error.response.data?.errorMessages}`);
            return thunkAPI.rejectWithValue({
                error: error.response?.data?.errorMessages,
            });
        }
    }
});

export const cancelBookingByCustomer = createAsyncThunk<
    ICustomerBooking,
    { bookingId: number }
>('buyerBooking/cancelBookingByCustomer', async (data, thunkAPI) => {
    const { bookingId } = data;
    try {
        const token = localStorage.getItem('motorbike_bs');
        const response = await axios.put(
            `${cancelBookingBuyerEndPoint}?bookingId=${bookingId}`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
        );
        toast.success(`${response.data.message}`);
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

export const acceptCustomerBookingByStore = createAsyncThunk<
    ICustomerBooking,
    { bookingId: number }
>('buyerBooking/acceptCustomerBookingByStore', async (data, thunkAPI) => {
    const { bookingId } = data;
    try {
        const token = localStorage.getItem('motorbike_bs');
        const response = await axios.put(
            `${acceptBookingBuyerEndPoint}?bookingId=${bookingId}`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
        );
        toast.success(`${response.data.message}`);
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

export const rejectCustomerBookingByStore = createAsyncThunk<
    ICustomerBooking,
    { bookingId: number }
>('buyerBooking/rejectCustomerBookingByStore', async (data, thunkAPI) => {
    const { bookingId } = data;
    try {
        const token = localStorage.getItem('motorbike_bs');
        const response = await axios.put(
            `${rejectBookingBuyerEndPoint}?bookingId=${bookingId}`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
        );
        toast.success(`${response.data.message}`);
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

export const customerBookingSlice = createSlice({
    name: 'customerBooking',
    initialState,
    reducers: {
        setError: (state, action) => {
            state.error = action.payload;
        },
        clearCustomerBooking: (state) => {},
    },
    extraReducers: (builder) => {
        builder.addCase(customerBookingWithStore.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(customerBookingWithStore.fulfilled, (state) => {
            state.loading = false;
            state.error = null;
        });
        builder.addCase(customerBookingWithStore.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });

        builder.addCase(getAllBookingByCustomer.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getAllBookingByCustomer.fulfilled, (state, action) => {
            state.loading = false;
            state.getAllCustomerBooking = action.payload;
        });
        builder.addCase(getAllBookingByCustomer.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });

        builder.addCase(cancelBookingByCustomer.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(cancelBookingByCustomer.fulfilled, (state) => {
            state.loading = false;
            state.error = null;
        });
        builder.addCase(cancelBookingByCustomer.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });

        builder.addCase(acceptCustomerBookingByStore.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(acceptCustomerBookingByStore.fulfilled, (state) => {
            state.loading = false;
            state.error = null;
        });
        builder.addCase(
            acceptCustomerBookingByStore.rejected,
            (state, action) => {
                state.loading = false;
                state.error = action.payload;
            },
        );

        builder.addCase(rejectCustomerBookingByStore.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(rejectCustomerBookingByStore.fulfilled, (state) => {
            state.loading = false;
        });
        builder.addCase(
            rejectCustomerBookingByStore.rejected,
            (state, action) => {
                state.loading = false;
                state.error = action.payload;
            },
        );
    },
});

export const { setError, clearCustomerBooking } = customerBookingSlice.actions;
export default customerBookingSlice.reducer;

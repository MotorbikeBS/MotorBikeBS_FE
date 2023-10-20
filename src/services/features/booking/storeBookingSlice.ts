import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
    IBookingByStore,
    IBookingFieldByStore,
} from '../../../models/Booking/StoreBooking';
import axios from 'axios';
import { storeBookingEndPoint } from '../../config/api-config';
import { toast } from 'react-toastify';

interface StoreBookingState {
    loading: boolean;
    error: string[] | unknown;
    storeBooking: IBookingByStore | null;
}
const initialState: StoreBookingState = {
    loading: false,
    error: null,
    storeBooking: null,
};

export const storeBookingOwnerExchange = createAsyncThunk<
    IBookingByStore,
    IBookingFieldByStore
>(
    'storeBooking/storeBookingWithOwnerExchange',
    async (data: IBookingFieldByStore, thunkAPI) => {
        const { negotiationId, bookingDate, note } = data;
        try {
            const token = localStorage.getItem('motorbike_bs');
            const response = await axios.post(
                `${storeBookingEndPoint}?negotiationId=${negotiationId}`,
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

export const storeBookingSlice = createSlice({
    name: 'storeBooking',
    initialState,
    reducers: {
        setError: (state, action) => {
            state.error = action.payload;
        },
        clearStoreBooking: (state) => {
            state.storeBooking = null;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(storeBookingOwnerExchange.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(
            storeBookingOwnerExchange.fulfilled,
            (state, action) => {
                state.loading = false;
                state.storeBooking = action.payload;
            },
        );
        builder.addCase(storeBookingOwnerExchange.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    },
});

export const { setError, clearStoreBooking } = storeBookingSlice.actions;
export default storeBookingSlice.reducer;

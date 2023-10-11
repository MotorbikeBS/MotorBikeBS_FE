import { IBookingResponse } from './../../../models/Booking/Booking';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IBookingOwnerExchange } from '../../../models/Booking/Booking';
import axios from 'axios';
import {
    getAllBookingByOwnerEndPoint,
    storeBookingWithOwnerExchangeEndPoint,
} from '../../config/api-config';
import { toast } from 'react-toastify';

interface BookingOwnerState {
    loading: boolean;
    error: string[] | unknown;
    getStoreBooking: IBookingResponse[] | null;
    storeBooking: IBookingResponse | null;
}

const initialState: BookingOwnerState = {
    loading: false,
    error: null,
    getStoreBooking: null,
    storeBooking: null,
};

export const storeBookingOwnerExchange = createAsyncThunk<
    IBookingResponse,
    IBookingOwnerExchange
>(
    'booking/storeBookingWithOwnerExchange',
    async (data: IBookingOwnerExchange, thunkAPI) => {
        const { motorId, bookingDate, note } = data;
        try {
            const token = localStorage.getItem('motorbike_bs');
            const response = await axios.post(
                `${storeBookingWithOwnerExchangeEndPoint}?motorId=${motorId}`,
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

export const getAllBookingByOwner = createAsyncThunk<IBookingResponse[], void>(
    'bookings/getAllBookingByOWner',
    async (_, thunkAPI) => {
        try {
            const token = localStorage.getItem('motorbike_bs');
            const response = await axios.get(getAllBookingByOwnerEndPoint, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
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
export const bookingSlice = createSlice({
    name: 'bookingOwerExchange',
    initialState,
    reducers: {
        setError: (state, action) => {
            state.error = action.payload;
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
        builder.addCase(getAllBookingByOwner.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getAllBookingByOwner.fulfilled, (state, action) => {
            state.loading = false;
            state.getStoreBooking = action.payload;
        });
        builder.addCase(getAllBookingByOwner.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    },
});

export const { setError } = bookingSlice.actions;
export default bookingSlice.reducer;

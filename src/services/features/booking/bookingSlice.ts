import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import {
    acceptBookingEndPoint,
    getAllBookingByOwnerEndPoint,
    getBookingByIDEndPoint,
    storeBookingWithOwnerExchangeEndPoint,
} from '../../config/api-config';
import { toast } from 'react-toastify';
import {
    IBooking,
    IBookingOwnerExchange,
} from '../../../models/Booking/Booking';

interface BookingOwnerState {
    loading: boolean;
    error: string[] | unknown;
    getBooking: IBooking[] | null;
    storeBooking: IBooking | null;
}

const initialState: BookingOwnerState = {
    loading: false,
    error: null,
    getBooking: null,
    storeBooking: null,
};

export const storeBookingOwnerExchange = createAsyncThunk<
    IBooking,
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

export const getAllBookingByOwner = createAsyncThunk<IBooking[], void>(
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
                toast.warning(`${error.response.data?.errorMessages}`);
                return thunkAPI.rejectWithValue({
                    error: error.response?.data?.errorMessages,
                });
            }
        }
    },
);
export const getBookingByID = createAsyncThunk<IBooking, { id: number }>(
    'bookings/getBookingByID',
    async ({ id }, thunkAPI) => {
        try {
            const token = localStorage.getItem('motorbike_bs');
            const response = await axios.get(
                `${getBookingByIDEndPoint}/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            );
            return response.data.result;
        } catch (error: any) {
            toast.error('Có lỗi xảy ra ! Vui lòng kiểm tra lại ! ');
            return thunkAPI.rejectWithValue({
                error: error.response?.data?.errorMessages,
            });
        }
    },
);
export const acceptBooking = createAsyncThunk<IBooking, { bookingId: number }>(
    'booking/acceptBookingByOwner',
    async (data, thunkAPI) => {
        const { bookingId } = data;
        try {
            const token = localStorage.getItem('motorbike_bs');
            const response = await axios.put(
                `${acceptBookingEndPoint}?bookingId=${bookingId}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            );
            toast.success('Xác nhận lịch hẹn thành công !');
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
export const bookingSlice = createSlice({
    name: 'bookingOwerExchange',
    initialState,
    reducers: {
        setError: (state, action) => {
            state.error = action.payload;
        },
        clearBooking: (state) => {
            state.getBooking = [];
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
        builder.addCase(getAllBookingByOwner.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getAllBookingByOwner.fulfilled, (state, action) => {
            state.loading = false;
            state.getBooking = action.payload;
        });
        builder.addCase(getAllBookingByOwner.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
        builder.addCase(getBookingByID.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getBookingByID.fulfilled, (state, action) => {
            state.loading = false;
            state.storeBooking = action.payload;
        });
        builder.addCase(getBookingByID.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
        builder.addCase(acceptBooking.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(acceptBooking.fulfilled, (state, action) => {
            state.loading = false;
            state.storeBooking = action.payload;
            state.error = null;
        });
        builder.addCase(acceptBooking.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    },
});

export const { setError, clearBooking } = bookingSlice.actions;
export default bookingSlice.reducer;

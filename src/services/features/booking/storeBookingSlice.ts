import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
    IBookingByStore,
    IBookingFieldByStore,
} from '../../../models/Booking/StoreBooking';
import axios from 'axios';
import {
    getAllStoreBookingOwnerEndPoind,
    storeBookingEndPoint,
    storeCancelBookingEndPoint,
} from '../../config/api-config';
import { toast } from 'react-toastify';

interface StoreBookingState {
    loading: boolean;
    error: string[] | unknown;
    storeBooking: IBookingByStore | null;
    getAllBooking: IBookingByStore[] | null;
}
const initialState: StoreBookingState = {
    loading: false,
    error: null,
    storeBooking: null,
    getAllBooking: null,
};

export const storeBookingOwnerExchange = createAsyncThunk<
    IBookingByStore,
    IBookingFieldByStore
>(
    'booking/storeBookingWithOwnerExchange',
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
export const getAllBookingOwnerExchange = createAsyncThunk<
    IBookingByStore[],
    void
>('booking/getAllBookingOnOwnerExchange', async (_, thunkAPI) => {
    try {
        const token = localStorage.getItem('motorbike_bs');
        const response = await axios.get(getAllStoreBookingOwnerEndPoind, {
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

export const cancleBookingByStore = createAsyncThunk<
    IBookingByStore,
    { bookingId: number }
>('booking/cancelBookingByStore', async (data, thunkAPI) => {
    const { bookingId } = data;
    try {
        const token = localStorage.getItem('motorbike_bs');
        const response = await axios.put(
            `${storeCancelBookingEndPoint}?bookingId=${bookingId}`,
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

export const storeBookingSlice = createSlice({
    name: 'storeBooking',
    initialState,
    reducers: {
        setError: (state, action) => {
            state.error = action.payload;
        },
        clearStoreBooking: (state) => {
            state.storeBooking = null;
            state.getAllBooking = null;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(storeBookingOwnerExchange.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(storeBookingOwnerExchange.fulfilled, (state) => {
            state.loading = false;
            state.error = null;
        });
        builder.addCase(storeBookingOwnerExchange.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
        builder.addCase(getAllBookingOwnerExchange.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(
            getAllBookingOwnerExchange.fulfilled,
            (state, action) => {
                state.loading = false;
                state.getAllBooking = action.payload;
            },
        );
        builder.addCase(
            getAllBookingOwnerExchange.rejected,
            (state, action) => {
                state.loading = false;
                state.error = action.payload;
            },
        );
        builder.addCase(cancleBookingByStore.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(cancleBookingByStore.fulfilled, (state, action) => {
            state.loading = false;
            state.error = null;
        });
        builder.addCase(cancleBookingByStore.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    },
});

export const { setError, clearStoreBooking } = storeBookingSlice.actions;
export default storeBookingSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

interface CustomerBookingState {
    loading: boolean;
    error: string[] | unknown;
}

const initialState: CustomerBookingState = {
    loading: false,
    error: null,
};

export const customerBookingSlice = createSlice({
    name: 'customerBooking',
    initialState,
    reducers: {
        setError: (state, action) => {
            state.error = action.payload;
        },
        clearCustomerBooking: (state) => {},
    },
});

export const { setError, clearCustomerBooking } = customerBookingSlice.actions;
export default customerBookingSlice.reducer;

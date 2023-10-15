import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
    INegotiation,
    INegotiationStore,
} from '../../../models/Negotiation/Negotiation';
import { toast } from 'react-toastify';
import axios from 'axios';
import { startNegotitationEndPoint } from '../../config/api-config';

interface INegotiationState {
    loading: boolean;
    error: string[] | unknown;
    startNegotiation: INegotiation | null;
}
const initialState: INegotiationState = {
    loading: false,
    error: null,
    startNegotiation: null,
};

export const startNegotiation = createAsyncThunk<
    INegotiation,
    INegotiationStore
>('negotiation/startNegotiation', async (data: INegotiationStore, thunkAPI) => {
    const { motorId, storePrice, description } = data;
    try {
        const token = localStorage.getItem('motorbike_bs');
        const response = await axios.post(
            `${startNegotitationEndPoint}?motorId=${motorId}`,
            { storePrice, description },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
        );
        toast.success(`${response.data.message}`);
        return response.data;
    } catch (err: any) {
        if (err.response) {
            toast.error(`${err.response.data?.errorMessages}`);
            return thunkAPI.rejectWithValue({
                error: err.response?.data?.errorMessages,
            });
        }
    }
});

export const negotiationSlice = createSlice({
    name: 'negotiation',
    initialState,
    reducers: {
        setError: (state, action) => {
            state.error = action.payload;
        },
        clearNegotiation: (state) => {
            state.startNegotiation = null;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(startNegotiation.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(startNegotiation.fulfilled, (state, action) => {
            state.loading = false;
            // state.startNegotiation = action.payload;
            state.error = null;
        });
        builder.addCase(startNegotiation.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    },
});

export const { setError, clearNegotiation } = negotiationSlice.actions;
export default negotiationSlice.reducer;

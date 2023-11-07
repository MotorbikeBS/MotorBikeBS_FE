import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { toast } from 'react-toastify';
import axios from 'axios';
import {
    startNegotitationEndPoint,
    getNegotiationRequestEndPoint,
    cancleNegotiationEndPoint,
} from '../../config/api-config';
import {
    IFieldRequest,
    INegotiation,
} from '../../../models/Negotiation/Negotiation';

interface INegotiationState {
    loading: boolean;
    error: string[] | unknown;
    negotiation: INegotiation | null;
    negotiations: INegotiation[] | null;
}
const initialState: INegotiationState = {
    loading: false,
    error: null,
    negotiation: null,
    negotiations: [],
};

export const startNegotiation = createAsyncThunk<INegotiation, IFieldRequest>(
    'negotiation/startNegotiation',
    async (data: IFieldRequest, thunkAPI) => {
        const { motorId, price, startTime, endTime, description } = data;
        try {
            const token = localStorage.getItem('motorbike_bs');
            const response = await axios.post(
                `${startNegotitationEndPoint}?motorId=${motorId}`,
                { price, startTime, endTime, description },
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
    },
);

export const getNegotiationRequest = createAsyncThunk<INegotiation[], void>(
    'negotiation/getNegotiationRequest',
    async (_, thunkAPI) => {
        try {
            const token = localStorage.getItem('motorbike_bs');
            const response = await axios.get(getNegotiationRequestEndPoint, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data.result;
        } catch (err: any) {
            if (err.response) {
                toast.warning(`${err.response.data?.errorMessages}`);
                return thunkAPI.rejectWithValue({
                    error: err.response?.data?.errorMessages,
                });
            }
        }
    },
);

export const cancleNegotiation = createAsyncThunk<
    INegotiation,
    { negotiationId: number }
>('negotiation/cancleNegotion', async (data, thunkAPI) => {
    const { negotiationId } = data;
    try {
        const token = localStorage.getItem('motorbike_bs');
        const response = await axios.put(
            `${cancleNegotiationEndPoint}?NegotiationId=${negotiationId}`,
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

export const negotiationSlice = createSlice({
    name: 'negotiation',
    initialState,
    reducers: {
        setError: (state, action) => {
            state.error = action.payload;
        },
        clearNegotiation: (state) => {
            state.negotiation = null;
            state.negotiations = null;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(startNegotiation.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(startNegotiation.fulfilled, (state, action) => {
            state.loading = false;
            state.negotiation = action.payload;
            state.error = null;
        });
        builder.addCase(startNegotiation.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
        builder.addCase(getNegotiationRequest.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getNegotiationRequest.fulfilled, (state, action) => {
            state.loading = false;
            state.negotiations = action.payload;
        });
        builder.addCase(getNegotiationRequest.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
        builder.addCase(cancleNegotiation.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(cancleNegotiation.fulfilled, (state, action) => {
            state.loading = false;
            state.negotiation = action.payload;
        });
        builder.addCase(cancleNegotiation.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    },
});

export const { setError, clearNegotiation } = negotiationSlice.actions;
export default negotiationSlice.reducer;

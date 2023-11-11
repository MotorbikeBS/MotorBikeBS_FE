import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
    IFieldNegoInfor,
    INegotiation,
} from '../../../models/Negotiation/Negotiation';
import { toast } from 'react-toastify';
import {
    accepNegotiationEndPoint,
    createNegotitationEndPoint,
    getNegotiationEndPoint,
} from '../../config/api-config';
import axios from 'axios';

interface INegotiationState {
    loading: boolean;
    error: string[] | unknown;
    negotiation: INegotiation | null;
    negotiations: INegotiation[] | null;
}

const initialState: INegotiationState = {
    loading: false,
    error: false,
    negotiation: null,
    negotiations: null,
};

export const createNegotiationInfor = createAsyncThunk<
    INegotiation,
    IFieldNegoInfor
>('negotiation/createNegotiation', async (data: IFieldNegoInfor, thunkAPI) => {
    const { valuationId, finalPrice, startTime, endTime, content, deposit } =
        data;
    try {
        const token = localStorage.getItem('motorbike_bs');
        const response = await axios.post(
            `${createNegotitationEndPoint}?valuationId=${valuationId}`,
            { finalPrice, startTime, endTime, deposit, content },
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

export const getNegotiationInfo = createAsyncThunk<INegotiation[], void>(
    'negotiation/getNegotiationInfo',
    async (_, thunkAPI) => {
        try {
            const token = localStorage.getItem('motorbike_bs');
            const response = await axios.get(getNegotiationEndPoint, {
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
export const acceptNegotiationInfo = createAsyncThunk<
    INegotiation,
    { negotiationId: number }
>('negotiation/acceptNegotiationInfor', async (data, thunkAPI) => {
    const { negotiationId } = data;
    try {
        const token = localStorage.getItem('motorbike_bs');
        const response = await axios.put(
            `${accepNegotiationEndPoint}?negotiationId=${negotiationId}`,
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
        builder.addCase(createNegotiationInfor.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(createNegotiationInfor.fulfilled, (state) => {
            state.loading = false;
            state.error = null;
        });
        builder.addCase(createNegotiationInfor.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
        builder.addCase(getNegotiationInfo.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getNegotiationInfo.fulfilled, (state, action) => {
            state.loading = false;
            state.negotiations = action.payload;
            state.error = null;
        });
        builder.addCase(getNegotiationInfo.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
        builder.addCase(acceptNegotiationInfo.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(acceptNegotiationInfo.fulfilled, (state) => {
            state.loading = false;
            state.error = null;
        });
        builder.addCase(acceptNegotiationInfo.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    },
});
export const { setError, clearNegotiation } = negotiationSlice.actions;
export default negotiationSlice.reducer;

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IFieldRequest, IValuation } from '../../../models/Valuation/Valuation';
import { toast } from 'react-toastify';
import axios from 'axios';
import {
    acceptValuationEndPoint,
    cancelValuationEndPoint,
    getValuationEndPoint,
    startValuationEndPoint,
} from '../../config/api-config';

interface IValuationState {
    loading: boolean;
    error: string[] | unknown;
    valuation: IValuation | null;
    valuations: IValuation[] | null;
}

const initialState: IValuationState = {
    loading: false,
    error: false,
    valuation: null,
    valuations: null,
};

export const startValuation = createAsyncThunk<IValuation, IFieldRequest>(
    'valuation/startValuation',
    async (data: IFieldRequest, thunkAPI) => {
        const { motorId, storePrice, description } = data;
        try {
            const token = localStorage.getItem('motorbike_bs');
            const response = await axios.post(
                `${startValuationEndPoint}?motorId=${motorId}`,
                { description, storePrice },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            );
            toast.success(`${response.data.message}`);
            return response.data.result;
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

export const getValuationRequest = createAsyncThunk<IValuation[], void>(
    'valuation/getAllValuationRequest',
    async (_, thunkAPI) => {
        try {
            const token = localStorage.getItem('motorbike_bs');
            const response = await axios.get(getValuationEndPoint, {
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

export const cancleValuation = createAsyncThunk<
    IValuation,
    { valuationId: number }
>('valuation/cancleValuation', async (data, thunkAPI) => {
    const { valuationId } = data;
    try {
        const token = localStorage.getItem('motorbike_bs');
        const response = await axios.put(
            `${cancelValuationEndPoint}?valuationId=${valuationId}`,
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

export const acceptValuation = createAsyncThunk<
    IValuation,
    { valuationId: number }
>(
    'valuation/acceptValuation',

    async (data, thunkAPI) => {
        const { valuationId } = data;
        try {
            const token = localStorage.getItem('motorbike_bs');
            const response = await axios.put(
                `${acceptValuationEndPoint}?valuationId=${valuationId}`,
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
    },
);
export const valuationSlice = createSlice({
    name: 'valuation',
    initialState,
    reducers: {
        setError: (state, action) => {
            state.error = action.payload;
        },
        clearValuation: (state) => {
            state.valuation = null;
            state.valuations = null;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(startValuation.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(startValuation.fulfilled, (state) => {
            state.loading = false;
            state.error = null;
        });
        builder.addCase(startValuation.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
        builder.addCase(getValuationRequest.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getValuationRequest.fulfilled, (state, action) => {
            state.loading = false;
            state.valuations = action.payload;
        });
        builder.addCase(getValuationRequest.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
        builder.addCase(cancleValuation.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(cancleValuation.fulfilled, (state) => {
            state.loading = false;
            state.error = null;
        });
        builder.addCase(cancleValuation.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
        builder.addCase(acceptValuation.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(acceptValuation.fulfilled, (state) => {
            state.loading = false;
            state.error = null;
        });
        builder.addCase(acceptValuation.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    },
});

export const { setError, clearValuation } = valuationSlice.actions;
export default valuationSlice.reducer;

import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IMotorbike } from '../../models/Motorbike/Motorbike';
import {
    getAllOnExChangeEndPoint,
    getAllOnStoreExChangeEndPoint,
} from '../config/api-config';

interface MotorbikeState {
    loading: boolean;
    motorbikes: IMotorbike[] | null;
    error: string[] | unknown;
}

const initialState: MotorbikeState = {
    loading: false,
    motorbikes: null,
    error: null,
};

export const getAllOnExchange = createAsyncThunk<IMotorbike[], void>(
    'motorbikes/getAllOnExchange',
    async (_, thunkAPI) => {
        try {
            const token = localStorage.getItem('motorbike_bs');
            const response = await axios.get(getAllOnExChangeEndPoint, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data.result;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({
                error: error.response?.data?.errorMessages,
            });
        }
    },
);

export const getAllOnStoreExchange = createAsyncThunk<IMotorbike[], void>(
    'motorbikes/getAllOnStoreExchange',
    async (_, thunkAPI) => {
        try {
            const token = localStorage.getItem('motorbike_bs');
            const response = await axios.get(getAllOnStoreExChangeEndPoint, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data.result;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({
                error: error.response?.data?.errorMessages,
            });
        }
    },
);

export const motorbikeSlice = createSlice({
    name: 'motorbikes',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllOnExchange.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getAllOnExchange.fulfilled, (state, action) => {
            state.loading = false;
            state.motorbikes = action.payload;
            state.error = null;
        });
        builder.addCase(getAllOnExchange.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
        builder.addCase(getAllOnStoreExchange.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getAllOnStoreExchange.fulfilled, (state, action) => {
            state.loading = false;
            state.motorbikes = action.payload;
            state.error = null;
        });
        builder.addCase(getAllOnStoreExchange.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    },
});

export default motorbikeSlice.reducer;

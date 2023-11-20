import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
    IPostBooting,
    IPostBootingField,
} from '../../../models/PostBooting/PostBooting';
import { toast } from 'react-toastify';
import axios from 'axios';
import {
    createPostBootingEndPoint,
    extendPostBootingEndPoint,
    getPostBootingHistoryEndPoint,
} from '../../config/api-config';

interface IPostBootingState {
    loading: boolean;
    error: string[] | unknown;
    postBooting: IPostBootingField | null;
    postBootings: IPostBooting[] | null;
}
const initialState: IPostBootingState = {
    loading: false,
    error: false,
    postBooting: null,
    postBootings: null,
};

export const createPostBooting = createAsyncThunk<
    IPostBooting,
    IPostBootingField
>(
    'postBooting/createPostBooting',
    async (data: IPostBootingField, thunkAPI) => {
        const { motorId, startTime, endTime, level } = data;
        try {
            const token = localStorage.getItem('motorbike_bs');
            const response = await axios.post(
                `${createPostBootingEndPoint}?motorId=${motorId}`,
                { startTime, endTime, level },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            );
            toast.success(`${response.data.message}`);
            return response.data;
        } catch (error: any) {
            toast.error(`${error.response.data?.errorMessages}`);
            return thunkAPI.rejectWithValue({
                error: error.response?.data?.errorMessages,
            });
        }
    },
);
export const getHistoryPostBoosting = createAsyncThunk<IPostBooting[], void>(
    'postBoosting/getHistoryPostBoosting',
    async (_, thunkAPI) => {
        try {
            const token = localStorage.getItem('motorbike_bs');
            const response = await axios.get(getPostBootingHistoryEndPoint, {
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
export const extendPostBoosting = createAsyncThunk<
    IPostBooting,
    { boostingId: number; data: Object }
>('postBoosting/extendPostBoosting', async ({ boostingId, data }, thunkAPI) => {
    try {
        const token = localStorage.getItem('motorbike_bs');
        const response = await axios.put(
            `${extendPostBootingEndPoint}?boostingId=${boostingId}`,
            data,
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

export const postBootingSlice = createSlice({
    name: 'postBooting',
    initialState,
    reducers: {
        clearPostBoostingHistory: (state) => {
            state.postBooting = null;
            state.postBootings = null;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(createPostBooting.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(createPostBooting.fulfilled, (state) => {
            state.loading = false;
            state.error = null;
        });
        builder.addCase(createPostBooting.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
        builder.addCase(getHistoryPostBoosting.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getHistoryPostBoosting.fulfilled, (state, action) => {
            state.loading = false;
            state.postBootings = action.payload;
            state.error = null;
        });
        builder.addCase(getHistoryPostBoosting.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
        builder.addCase(extendPostBoosting.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(extendPostBoosting.fulfilled, (state) => {
            state.loading = false;
            state.error = null;
        });
        builder.addCase(extendPostBoosting.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    },
});
export const { clearPostBoostingHistory } = postBootingSlice.actions;
export default postBootingSlice.reducer;

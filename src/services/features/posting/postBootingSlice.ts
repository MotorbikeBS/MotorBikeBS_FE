import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
    IPostBooting,
    IPostBootingField,
} from '../../../models/PostBooting/PostBooting';
import { toast } from 'react-toastify';
import axios from 'axios';
import { createPostBootingEndPoint } from '../../config/api-config';

interface IPostBootingState {
    loading: boolean;
    error: string[] | unknown;
    postBooting: IPostBootingField | null;
}
const initialState: IPostBootingState = {
    loading: false,
    error: false,
    postBooting: null,
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
            return response.data;
        } catch (error: any) {
            toast.error(`${error.response.data?.errorMessages}`);
            return thunkAPI.rejectWithValue({
                error: error.response?.data?.errorMessages,
            });
        }
    },
);

export const postBootingSlice = createSlice({
    name: 'postBooting',
    initialState,
    reducers: {},
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
    },
});
export default postBootingSlice.reducer;

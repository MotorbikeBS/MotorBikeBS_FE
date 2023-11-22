import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IRevenueAdmin } from '../../../models/AdminStatistics/AdminStatistics';
import { toast } from 'react-toastify';
import axios from 'axios';
import { revenueStatisticsAdminEndPoint } from '../../config/api-config';

interface RevenueState {
    loading: boolean;
    error: string[] | unknown;
    revenue: IRevenueAdmin | null;
}

const initialState: RevenueState = {
    loading: false,
    error: null,
    revenue: null,
};

export const getRevenueStatisticAdmin = createAsyncThunk<
    IRevenueAdmin,
    {
        year: number;
    }
>('revenue/getRevenueStatisticAdmin', async ({ year }, thunkAPI) => {
    try {
        const token = localStorage.getItem('motorbike_bs');
        const response = await axios.get(
            `${revenueStatisticsAdminEndPoint}?year=${year}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
        );
        return response.data.result;
    } catch (error: any) {
        toast.error(`${error.response.data?.errorMessages}`);
        return thunkAPI.rejectWithValue({
            error: error.response?.data?.errorMessages,
        });
    }
});
export const revenueAdminSlice = createSlice({
    name: 'statisticRevenue',
    initialState,
    reducers: {
        clearRevenue: (state) => {
            state.revenue = null;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getRevenueStatisticAdmin.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getRevenueStatisticAdmin.fulfilled, (state, action) => {
            state.loading = false;
            state.revenue = action.payload;
            state.error = null;
        });
        builder.addCase(getRevenueStatisticAdmin.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    },
});
export const { clearRevenue } = revenueAdminSlice.actions;
export default revenueAdminSlice.reducer;

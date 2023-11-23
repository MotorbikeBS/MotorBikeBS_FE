import { createReportStoreEndPoint } from './../../config/api-config';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ICreateReport, IReport } from '../../../models/Report/Report';
import { toast } from 'react-toastify';
import axios from 'axios';

interface ReportStoreState {
    loading: boolean;
    error: string[] | unknown;
    createReport: ICreateReport | null;
    // reports: IReport[] | null;
}
const initialState: ReportStoreState = {
    loading: false,
    error: null,
    createReport: null,
};
export const createReportStore = createAsyncThunk<IReport, ICreateReport>(
    'report/createReportStore',
    async (data: ICreateReport, thunkAPI) => {
        const { storeId, title, description, images } = data;
        try {
            const token = localStorage.getItem('motorbike_bs');
            const response = await axios.post(
                `${createReportStoreEndPoint}?storeId=${storeId}`,
                { title, description, images },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data',
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

export const reportSlice = createSlice({
    name: 'report',
    initialState,
    reducers: {
        clearReport: (state) => {
            state.createReport = null;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(createReportStore.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(createReportStore.fulfilled, (state) => {
            state.loading = false;
            state.error = null;
        });
        builder.addCase(createReportStore.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    },
});

export const { clearReport } = reportSlice.actions;
export default reportSlice.reducer;

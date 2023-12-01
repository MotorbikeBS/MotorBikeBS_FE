import {
    createReportStoreEndPoint,
    getListReportStoreEndPoint,
} from './../../config/api-config';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ICreateReport, IReport } from '../../../models/Report/Report';
import { toast } from 'react-toastify';
import axios from 'axios';
import { get } from 'http';

interface ReportStoreState {
    loading: boolean;
    error: string[] | unknown;
    createReport: ICreateReport | null;
    reportStores: IReport[] | null;
}
const initialState: ReportStoreState = {
    loading: false,
    error: null,
    createReport: null,
    reportStores: null,
};
export const createReportStore = createAsyncThunk<void, FormData>(
    'report/createReportStore',
    async (formData: FormData, thunkAPI) => {
        try {
            const token = localStorage.getItem('motorbike_bs');
            const response = await axios.post(
                `${createReportStoreEndPoint}?storeId=${formData.get(
                    'storeId',
                )}`,
                formData,
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
export const getListReportStorebyAdmin = createAsyncThunk<IReport[], void>(
    'report/listReportStore',
    async (_, thunkAPI) => {
        try {
            const token = localStorage.getItem('motorbike_bs');
            const response = await axios(getListReportStoreEndPoint, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data.result;
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
            state.reportStores = null;
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
        builder.addCase(getListReportStorebyAdmin.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(
            getListReportStorebyAdmin.fulfilled,
            (state, action) => {
                state.loading = false;
                state.reportStores = action.payload;
            },
        );
        builder.addCase(getListReportStorebyAdmin.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    },
});

export const { clearReport } = reportSlice.actions;
export default reportSlice.reducer;

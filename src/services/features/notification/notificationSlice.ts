import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import {
    editNotificationMarkReadEndPoint,
    getNotificationByUserIDEndPoint,
} from '../../config/api-config';
import { toast } from 'react-toastify';
import { INotify } from '../../../models/Notify/Notify';

interface NotificationState {
    loading: boolean;
    error: string[] | unknown;
    notificationByUserId: INotify[] | null;
    notificationMarkRead: INotify | null;
}

const initialState: NotificationState = {
    loading: false,
    error: null,
    notificationByUserId: null,
    notificationMarkRead: null,
};

export const getNotificationByUserID = createAsyncThunk<
    INotify[],
    { id: number }
>('notification/getNotificationByUserID', async ({ id }, thunkAPI) => {
    try {
        const token = localStorage.getItem('motorbike_bs');
        const response = await axios.get(
            `${getNotificationByUserIDEndPoint}?id=${id}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
        );
        return response.data.result;
    } catch (error: any) {
        // toast.error(`${error.response.data?.errorMessages}`);
        return thunkAPI.rejectWithValue({
            error: error.response?.data?.errorMessages,
        });
    }
});

export const editNotificationMarkRead = createAsyncThunk<
    INotify,
    {
        notificationID: number;
    }
>(
    'notification/editNotificationMarkRead',
    async ({ notificationID }, thunkAPI) => {
        try {
            const token = localStorage.getItem('motorbike_bs');
            const response = await axios.put(
                `${editNotificationMarkReadEndPoint}?NotificationID=${notificationID}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            );
            return response.data.result;
        } catch (error: any) {
            // toast.error(`${error.response.data?.errorMessages}`);
            return thunkAPI.rejectWithValue({
                error: error.response?.data?.errorMessages,
            });
        }
    },
);

export const notificationSlice = createSlice({
    name: 'notifications',
    initialState,
    reducers: {
        clearNotification: (state) => {
            state.notificationByUserId = null;
            state.notificationMarkRead = null;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getNotificationByUserID.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getNotificationByUserID.fulfilled, (state, action) => {
            state.loading = false;
            state.notificationByUserId = action.payload;
            state.error = null;
        });
        builder.addCase(getNotificationByUserID.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
        builder.addCase(editNotificationMarkRead.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(editNotificationMarkRead.fulfilled, (state, action) => {
            state.loading = false;
            state.notificationMarkRead = action.payload;
            state.error = null;
        });
        builder.addCase(editNotificationMarkRead.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    },
});
export const { clearNotification } = notificationSlice.actions;
export default notificationSlice.reducer;

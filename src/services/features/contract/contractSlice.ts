import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IContract, ICreateContract } from '../../../models/Contract/Contract';
import { toast } from 'react-toastify';
import axios from 'axios';
import { createContractByStoreEndPoint } from '../../config/api-config';

interface IContractState {
    loading: boolean;
    createContract: IContract | null;
    error: string[] | unknown;
}
const initialState: IContractState = {
    loading: false,
    error: null,
    createContract: null,
};

export const createContractByStore = createAsyncThunk<
    IContract,
    { bookingId: number; data: Object }
>('contract/createContractByStore', async ({ bookingId, data }, thunkAPI) => {
    try {
        const token = localStorage.getItem('motorbike_bs');
        const response = await axios.post(
            `${createContractByStoreEndPoint}?bookingId=${bookingId}`,
            data,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
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

export const contractSlice = createSlice({
    name: 'contract',
    initialState,
    reducers: {
        setError: (state, action) => {
            state.error = action.payload;
        },
        clearContract: (state) => {
            state.createContract = null;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(createContractByStore.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(createContractByStore.fulfilled, (state, action) => {
            state.loading = false;
            state.createContract = action.payload;
        });
        builder.addCase(createContractByStore.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    },
});

export const { setError, clearContract } = contractSlice.actions;
export default contractSlice.reducer;

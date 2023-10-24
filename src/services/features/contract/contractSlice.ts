import {
    cancelContractEndPoint,
    getAllContractEndPoint,
} from './../../config/api-config';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IContract, ICreateContract } from '../../../models/Contract/Contract';
import { toast } from 'react-toastify';
import axios from 'axios';
import { createContractByStoreEndPoint } from '../../config/api-config';

interface IContractState {
    loading: boolean;
    error: string[] | unknown;
    createContract: IContract | null;
    getContracts: IContract[] | null;
    cancelContract: IContract | null;
}
const initialState: IContractState = {
    loading: false,
    error: null,
    createContract: null,
    getContracts: null,
    cancelContract: null,
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
export const getAllContract = createAsyncThunk<IContract[], void>(
    'contract/getAllContract',
    async (_, thunkAPI) => {
        try {
            const token = localStorage.getItem('motorbike_bs');
            const response = await axios.get(getAllContractEndPoint, {
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
export const cancelContractByOwner = createAsyncThunk<
    IContract,
    { contractId: number }
>('contract/cancelContractByOwner', async (data, thunkAPI) => {
    const { contractId } = data;
    try {
        const token = localStorage.getItem('motorbike_bs');
        const response = await axios.put(
            `${cancelContractEndPoint}?contractId=${contractId}`,
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

export const contractSlice = createSlice({
    name: 'contract',
    initialState,
    reducers: {
        setError: (state, action) => {
            state.error = action.payload;
        },
        clearContract: (state) => {
            state.createContract = null;
            state.getContracts = null;
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
        builder.addCase(getAllContract.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getAllContract.fulfilled, (state, action) => {
            state.loading = false;
            state.getContracts = action.payload;
        });
        builder.addCase(getAllContract.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
        builder.addCase(cancelContractByOwner.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(cancelContractByOwner.fulfilled, (state) => {
            state.loading = false;
        });
        builder.addCase(cancelContractByOwner.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    },
});

export const { setError, clearContract } = contractSlice.actions;
export default contractSlice.reducer;

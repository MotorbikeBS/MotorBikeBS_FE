import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
    IBrand,
    IModel,
    IMotorStatus,
    IMotorType,
} from '../../../models/Motorbike/Motorbike';
import {
    getMotorBrandEndPoint,
    getMotorModelEndPoint,
    getMotorStatusEndPoint,
    getMotorTypeEndPoint,
} from '../../config/api-config';

interface MotorFileds {
    loading: boolean;
    motorBrands: IBrand[] | null;
    motorBrand: IBrand | null;
    motorModels: IModel[] | null;
    motorTypes: IMotorType[] | null;
    motorStatus: IMotorStatus[] | null;
    error: string[] | unknown;
}

const initialState: MotorFileds = {
    loading: false,
    motorBrands: null,
    motorBrand: null,
    motorModels: null,
    motorTypes: null,
    motorStatus: null,
    error: null,
};

export const getMotorBrand = createAsyncThunk<IBrand[], void>(
    'motorFields/getMotorBrand',
    async (_, thunkAPI) => {
        try {
            const token = localStorage.getItem('motorbike_bs');
            const response = await axios.get(getMotorBrandEndPoint, {
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

export const getMotorBrandById = createAsyncThunk<
    IBrand,
    { motorBrandId: number }
>('motorFields/getMotorBrandById', async ({ motorBrandId }, thunkAPI) => {
    try {
        const token = localStorage.getItem('motorbike_bs');
        const response = await axios.get(
            `${getMotorBrandEndPoint}/${motorBrandId}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
        );
        return response.data.result;
    } catch (error: any) {
        return thunkAPI.rejectWithValue({
            error: error.response?.data?.errorMessages,
        });
    }
});

export const getMotorModel = createAsyncThunk<IModel[], void>(
    'motorFields/getMotorModel',
    async (_, thunkAPI) => {
        try {
            const token = localStorage.getItem('motorbike_bs');
            const response = await axios.get(getMotorModelEndPoint, {
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

export const getMotorType = createAsyncThunk<IMotorType[], void>(
    'motorFields/getMotorType',
    async (_, thunkAPI) => {
        try {
            const token = localStorage.getItem('motorbike_bs');
            const response = await axios.get(getMotorTypeEndPoint, {
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

export const getMotorStatus = createAsyncThunk<IMotorStatus[], void>(
    'motorFields/getMotorStatus',
    async (_, thunkAPI) => {
        try {
            const token = localStorage.getItem('motorbike_bs');
            const response = await axios.get(getMotorStatusEndPoint, {
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

export const motorFiledsSlice = createSlice({
    name: 'motorFields',
    initialState,
    reducers: {
        clearMotorFields: (state) => {
            state.motorBrands = null;
            state.motorModels = null;
            state.motorBrand = null;
            state.motorTypes = null;
            state.motorStatus= null;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getMotorBrand.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getMotorBrand.fulfilled, (state, action) => {
            state.loading = false;
            state.motorBrands = action.payload;
            state.error = null;
        });
        builder.addCase(getMotorBrand.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
        builder.addCase(getMotorModel.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getMotorModel.fulfilled, (state, action) => {
            state.loading = false;
            state.motorModels = action.payload;
            state.error = null;
        });
        builder.addCase(getMotorModel.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
        builder.addCase(getMotorType.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getMotorType.fulfilled, (state, action) => {
            state.loading = false;
            state.motorTypes = action.payload;
            state.error = null;
        });
        builder.addCase(getMotorType.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
        builder.addCase(getMotorStatus.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getMotorStatus.fulfilled, (state, action) => {
            state.loading = false;
            state.motorStatus = action.payload;
            state.error = null;
        });
        builder.addCase(getMotorStatus.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
        builder.addCase(getMotorBrandById.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getMotorBrandById.fulfilled, (state, action) => {
            state.loading = false;
            state.motorBrand = action.payload;
            state.error = null;
        });
        builder.addCase(getMotorBrandById.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    },
});
export const { clearMotorFields } = motorFiledsSlice.actions;
export default motorFiledsSlice.reducer;

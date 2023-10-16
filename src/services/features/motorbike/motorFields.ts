import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
    IBrand,
    IModel,
    IMotorStatus,
    IMotorType,
} from '../../../models/Motorbike/Motorbike';
import {
    createMotorBrandEndPoint,
    createMotorModelEndPoint,
    createMotorTypeEndPoint,
    getMotorBrandEndPoint,
    getMotorModelEndPoint,
    getMotorStatusEndPoint,
    getMotorTypeEndPoint,
} from '../../config/api-config';
import { toast } from 'react-toastify';

interface MotorFileds {
    loading: boolean;
    motorBrands: IBrand[] | null;
    motorBrand: IBrand | null;
    motorModels: IModel[] | null;
    motorModel: IModel | null;
    motorTypes: IMotorType[] | null;
    motorType: IMotorType | null;
    motorStatus: IMotorStatus[] | null;
    error: string[] | unknown;
}

const initialState: MotorFileds = {
    loading: false,
    motorBrands: null,
    motorBrand: null,
    motorModels: null,
    motorModel: null,
    motorTypes: null,
    motorType: null,
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
        toast.error(`${error.response?.data?.errorMessages}`);
        return thunkAPI.rejectWithValue({
            error: error.response?.data?.errorMessages,
        });
    }
});

export const createMotorBrand = createAsyncThunk<IBrand, void>(
    'motorFields/createMotorBrand',
    async (data, thunkAPI) => {
        try {
            const token = localStorage.getItem('motorbike_bs');
            const response = await axios.post(createMotorBrandEndPoint, data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data.result;
        } catch (error: any) {
            toast.error(`${error.response?.data?.errorMessages}`);
            return thunkAPI.rejectWithValue({
                error: error.response?.data?.errorMessages,
            });
        }
    },
);

export const updateMotorBrandById = createAsyncThunk<
    IBrand,
    { id: number; brandName: string; description: string; status: string }
>(
    'motorFields/updateMotorBrandById',
    async ({ id, brandName, description, status }, thunkAPI) => {
        try {
            const token = localStorage.getItem('motorbike_bs');
            const response = await axios.put(
                `${getMotorBrandEndPoint}?id=${id}`,
                {
                    brandName,
                    description,
                    status,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            );
            return response.data.result;
        } catch (error: any) {
            toast.error(`${error.response?.data?.errorMessages}`);
            return thunkAPI.rejectWithValue({
                error: error.response?.data?.errorMessages,
            });
        }
    },
);

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

export const getMotorModelById = createAsyncThunk<IModel, { id: number }>(
    'motorFields/getMotorModelById',
    async ({ id }, thunkAPI) => {
        try {
            const token = localStorage.getItem('motorbike_bs');
            const response = await axios.get(`${getMotorModelEndPoint}/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data.result;
        } catch (error: any) {
            toast.error(`${error.response?.data?.errorMessages}`);
            return thunkAPI.rejectWithValue({
                error: error.response?.data?.errorMessages,
            });
        }
    },
);

export const createMotorModel = createAsyncThunk<
    IModel,
    { brandId: number; modelName: string; description: string; status: string }
>(
    'motorFields/createMotorModel',
    async ({ brandId, modelName, description, status }, thunkAPI) => {
        try {
            const token = localStorage.getItem('motorbike_bs');
            const response = await axios.post(
                `${createMotorModelEndPoint}?brandID=${brandId}`,
                {
                    modelName,
                    description,
                    status,
                    brandId,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            );
            return response.data.result;
        } catch (error: any) {
            toast.error(`${error.response?.data?.errorMessages}`);
            return thunkAPI.rejectWithValue({
                error: error.response?.data?.errorMessages,
            });
        }
    },
);

export const updateMotorModelById = createAsyncThunk<
    IModel,
    {
        id: number;
        brandId: number;
        modelName: string;
        description: string;
        status: string;
    }
>(
    'motorFields/updateMotorModelById',
    async ({ id, brandId, modelName, description, status }, thunkAPI) => {
        try {
            const token = localStorage.getItem('motorbike_bs');
            const response = await axios.put(
                `${getMotorModelEndPoint}?id=${id}`,
                {
                    modelName,
                    description,
                    status,
                    brandId,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            );
            return response.data.result;
        } catch (error: any) {
            toast.error(`${error.response?.data?.errorMessages}`);
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

export const getMotorTypeById = createAsyncThunk<IMotorType, { id: number }>(
    'motorFields/getMotorTypeById',
    async ({ id }, thunkAPI) => {
        try {
            const token = localStorage.getItem('motorbike_bs');
            const response = await axios.get(`${getMotorTypeEndPoint}/${id}`, {
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

export const createMotorType = createAsyncThunk<
    IMotorType,
    { id: number; title: string; description: string; status: string }
>(
    'motorFields/createMotorType',
    async ({ id, title, description, status }, thunkAPI) => {
        try {
            const token = localStorage.getItem('motorbike_bs');
            const response = await axios.post(
                createMotorTypeEndPoint,
                {
                    title,
                    description,
                    status,
                },
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
    },
);

export const updateMotorTypeById = createAsyncThunk<
    IMotorType,
    { id: number; title: string; description: string; status: string }
>(
    'motorFields/updateMotorTypeById',
    async ({ id, title, description, status }, thunkAPI) => {
        try {
            const token = localStorage.getItem('motorbike_bs');
            const response = await axios.put(
                `${getMotorTypeEndPoint}?id=${id}`,
                {
                    title,
                    description,
                    status,
                },
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
            state.motorStatus = null;
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
        builder.addCase(createMotorBrand.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(createMotorBrand.fulfilled, (state, action) => {
            state.loading = false;
            state.motorBrand = action.payload;
            state.error = null;
        });
        builder.addCase(createMotorBrand.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
        builder.addCase(updateMotorBrandById.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(updateMotorBrandById.fulfilled, (state, action) => {
            state.loading = false;
            state.motorBrand = action.payload;
            state.error = null;
        });
        builder.addCase(updateMotorBrandById.rejected, (state, action) => {
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
        builder.addCase(getMotorModelById.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getMotorModelById.fulfilled, (state, action) => {
            state.loading = false;
            state.motorModel = action.payload;
            state.error = null;
        });
        builder.addCase(getMotorModelById.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
        builder.addCase(createMotorModel.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(createMotorModel.fulfilled, (state, action) => {
            state.loading = false;
            state.motorModel = action.payload;
            state.error = null;
        });
        builder.addCase(createMotorModel.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
        builder.addCase(updateMotorModelById.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(updateMotorModelById.fulfilled, (state, action) => {
            state.loading = false;
            state.motorModel = action.payload;
            state.error = null;
        });
        builder.addCase(updateMotorModelById.rejected, (state, action) => {
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
        builder.addCase(getMotorTypeById.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getMotorTypeById.fulfilled, (state, action) => {
            state.loading = false;
            state.motorType = action.payload;
            state.error = null;
        });
        builder.addCase(getMotorTypeById.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
        builder.addCase(createMotorType.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(createMotorType.fulfilled, (state, action) => {
            state.loading = false;
            state.motorType = action.payload;
            state.error = null;
        });
        builder.addCase(createMotorType.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
        builder.addCase(updateMotorTypeById.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(updateMotorTypeById.fulfilled, (state, action) => {
            state.loading = false;
            state.motorType = action.payload;
            state.error = null;
        });
        builder.addCase(updateMotorTypeById.rejected, (state, action) => {
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
    },
});
export const { clearMotorFields } = motorFiledsSlice.actions;
export default motorFiledsSlice.reducer;

import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IFilter, IMotorbike } from '../../../models/Motorbike/Motorbike';
import {
    cancelPostingEndPoint,
    filterMotorbikeEndPoint,
    getAllOnExChangeEndPoint,
    getAllOnStoreExChangeEndPoint,
    getMotorByIdEndPoint,
    getMotorByOwnerIdEndPoint,
    getMotorByStoreIdEndPoint,
    postMotorRegisterEndPoint,
    searchMotorNameEndPoint,
    updateMotorByIdEndPoint,
    updateMotorStatusEndPoint,
} from '../../config/api-config';
import { toast } from 'react-toastify';

interface MotorbikeState {
    loading: boolean;
    motorbikes: IMotorbike[] | null;
    motorbikesByOwner: IMotorbike[] | null;
    motorbike: IMotorbike | null;
    motorbikeByStoreId: IMotorbike[] | null;
    error: string[] | unknown;
}

const initialState: MotorbikeState = {
    loading: false,
    motorbikes: null,
    motorbikesByOwner: null,
    motorbike: null,
    motorbikeByStoreId: null,
    error: null,
};

export const getAllOnExchange = createAsyncThunk<IMotorbike[], void>(
    'motorbikes/getAllOnExchange',
    async (_, thunkAPI) => {
        try {
            const token = localStorage.getItem('motorbike_bs');
            const response = await axios.get(getAllOnExChangeEndPoint, {
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

export const getAllOnStoreExchange = createAsyncThunk<IMotorbike[], void>(
    'motorbikes/getAllOnStoreExchange',
    async (_, thunkAPI) => {
        try {
            const token = localStorage.getItem('motorbike_bs');
            const response = await axios.get(getAllOnStoreExChangeEndPoint, {
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

export const getMotorByStoreId = createAsyncThunk<
    IMotorbike[],
    { storeId: number }
>('motorbikes/getMotorByStoreId', async ({ storeId }, thunkAPI) => {
    // const {storeId} = data;
    try {
        const token = localStorage.getItem('motorbike_bs');
        const response = await axios.get(
            `${getMotorByStoreIdEndPoint}?storeId=${storeId}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
        );
        return response.data.result;
    } catch (error: any) {
        console.log(error);
        return thunkAPI.rejectWithValue({
            error: error.response?.data?.errorMessages,
        });
    }
});

export const getMotorByOwnerId = createAsyncThunk<
    IMotorbike[],
    { ownerId: number }
>('motorbikes/getMotorByOwnerId', async ({ ownerId }, thunkAPI) => {
    try {
        const token = localStorage.getItem('motorbike_bs');
        const response = await axios.get(
            `${getMotorByOwnerIdEndPoint}?ownerId=${ownerId}`,
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

export const getMotorId = createAsyncThunk<IMotorbike, { motorId: number }>(
    'motorbikes/getMotorById',
    async ({ motorId }, thunkAPI) => {
        try {
            const token = localStorage.getItem('motorbike_bs');
            const response = await axios.get(
                `${getMotorByIdEndPoint}/${motorId}`,
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

export const createMotorbike = createAsyncThunk<IMotorbike, Object>(
    'motorbikes/createMotorbike',
    async (data, thunkAPI) => {
        try {
            const token = localStorage.getItem('motorbike_bs');
            const response = await axios.post(postMotorRegisterEndPoint, data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });
            return response.data;
        } catch (error: any) {
            toast.error(`${error.response.data?.errorMessages}`);
            return thunkAPI.rejectWithValue({
                error: error.response?.data?.errorMessages,
            });
        }
    },
);

export const updateMotorById = createAsyncThunk<
    IMotorbike,
    { motorId: number; data: Object }
>('motorbike/updateMotorById', async ({ motorId, data }, thunkAPI) => {
    try {
        const token = localStorage.getItem('motorbike_bs');
        const response = await axios.put(
            `${updateMotorByIdEndPoint}?motorId=${motorId}`,
            data,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            },
        );
        return response.data;
    } catch (error: any) {
        // toast.error(`${error.response.data?.errorMessages}`);
        return thunkAPI.rejectWithValue({
            error: error.response?.data?.errorMessages,
        });
    }
});

export const updateMotorStatus = createAsyncThunk<
    IMotorbike,
    { motorId: number; statusId: number }
>('motorbike/updateMotorStatus', async ({ motorId, statusId }, thunkAPI) => {
    try {
        const token = localStorage.getItem('motorbike_bs');
        const response = await axios.put(
            `${updateMotorStatusEndPoint}?motorId=${motorId}&statusId=${statusId}`,
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
});

export const searchMotorByName = createAsyncThunk<
    IMotorbike[],
    { motorName: string }
>('motorbike/searchMotorByName', async ({ motorName }, thunkAPI) => {
    try {
        const token = localStorage.getItem('motorbike_bs');
        const response = await axios.get(
            `${searchMotorNameEndPoint}?motorName=${motorName}`,
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

export const filterMotor = createAsyncThunk<IMotorbike[], Partial<IFilter>>(
    'motorbike/filterMotorbike',
    async (params, thunkAPI) => {
        try {
            const token = localStorage.getItem('motorbike_bs');
            const queryParams = new URLSearchParams();

            if (params.brandId) {
                if (Array.isArray(params.brandId)) {
                    for (const brandId of params.brandId) {
                        queryParams.append('BrandId', brandId.toString());
                    }
                } else {
                    queryParams.set('BrandId', params.brandId);
                }
            }

            if (params.modelId) {
                if (Array.isArray(params.modelId)) {
                    for (const modelId of params.modelId) {
                        queryParams.append('ModelId', modelId.toString());
                    }
                } else {
                    queryParams.set('ModelId', params.modelId);
                }
            }
            if (params.minPrice)
                queryParams.set('minPrice', params.minPrice.toString());
            if (params.maxPrice)
                queryParams.set('maxPrice', params.maxPrice.toString());

            if (params.motorTypeId) {
                if (Array.isArray(params.motorTypeId)) {
                    for (const motorTypeId of params.motorTypeId) {
                        queryParams.append(
                            'MotorTypeId',
                            motorTypeId.toString(),
                        );
                    }
                } else {
                    queryParams.set('MotorTypeId', params.motorTypeId);
                }
            }

            const queryString = queryParams.toString();

            const response = await axios.get(
                `${filterMotorbikeEndPoint}?${queryString}`,
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

export const cancelPosting = createAsyncThunk<IMotorbike, { motorId: number }>(
    'motorbikes/cancelPosting',
    async ({ motorId }, thunkAPI) => {
        try {
            const token = localStorage.getItem('motorbike_bs');
            const response = await axios.put(
                `${cancelPostingEndPoint}?MotorID=${motorId}`, {},
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
    },
);

export const motorbikeSlice = createSlice({
    name: 'motorbikes',
    initialState,
    reducers: {
        clearMotor: (state) => {
            state.motorbikes = [];
            state.motorbikeByStoreId = [];
            state.motorbikesByOwner = [];
            state.motorbike = null;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getAllOnExchange.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getAllOnExchange.fulfilled, (state, action) => {
            state.loading = false;
            state.motorbikes = action.payload;
            state.error = null;
        });
        builder.addCase(getAllOnExchange.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
        builder.addCase(getAllOnStoreExchange.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getAllOnStoreExchange.fulfilled, (state, action) => {
            state.loading = false;
            state.motorbikesByOwner = action.payload;
            state.error = null;
        });
        builder.addCase(getAllOnStoreExchange.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
        builder.addCase(getMotorByStoreId.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getMotorByStoreId.fulfilled, (state, action) => {
            state.loading = false;
            state.motorbikeByStoreId = action.payload;
            state.error = null;
        });
        builder.addCase(getMotorByStoreId.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
        builder.addCase(getMotorByOwnerId.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getMotorByOwnerId.fulfilled, (state, action) => {
            state.loading = false;
            state.motorbikesByOwner = action.payload;
            state.error = null;
        });
        builder.addCase(getMotorByOwnerId.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
        builder.addCase(getMotorId.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getMotorId.fulfilled, (state, action) => {
            state.loading = false;
            state.motorbike = action.payload;
            state.error = null;
        });
        builder.addCase(getMotorId.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
        builder.addCase(createMotorbike.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(createMotorbike.fulfilled, (state, action) => {
            state.loading = false;
            // state.motorbike = action.payload;
            state.error = null;
        });
        builder.addCase(createMotorbike.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
        builder.addCase(updateMotorById.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(updateMotorById.fulfilled, (state, action) => {
            state.loading = false;
            state.motorbike = action.payload;
            state.error = null;
        });
        builder.addCase(updateMotorById.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
        builder.addCase(updateMotorStatus.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(updateMotorStatus.fulfilled, (state, action) => {
            state.loading = false;
            state.motorbike = action.payload;
            state.error = null;
        });
        builder.addCase(updateMotorStatus.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
        builder.addCase(searchMotorByName.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(searchMotorByName.fulfilled, (state, action) => {
            state.loading = false;
            state.motorbikes = action.payload;
            state.error = null;
        });
        builder.addCase(searchMotorByName.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
        builder.addCase(filterMotor.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(filterMotor.fulfilled, (state, action) => {
            state.loading = false;
            state.motorbikes = action.payload;
            state.error = null;
        });
        builder.addCase(filterMotor.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
        builder.addCase(cancelPosting.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(cancelPosting.fulfilled, (state, action) => {
            state.loading = false;
            state.motorbike = action.payload;
            state.error = null;
        });
        builder.addCase(cancelPosting.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    },
});
export const { clearMotor } = motorbikeSlice.actions;
export default motorbikeSlice.reducer;

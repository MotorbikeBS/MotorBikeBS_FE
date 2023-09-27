import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';
import { IUser } from '../../models/User/UserInterface';
import { getAllUserEndPoint } from '../config/api-config';

interface UserState {
    loading: boolean;
    users: IUser | null;
    error: string[] | unknown;
}

const initialState: UserState = {
    loading: false,
    users: null,
    error: null,
};

export const getAllUser = createAsyncThunk<IUser[], void>(
    'users/getAllUser',
    async (_, thunkAPI) => {
        try {
            const token = localStorage.getItem('motorbike_bs');
            const response = await axios.get(getAllUserEndPoint, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({
                error: error.response?.data?.errorMessages,
            });
        }
    },
);

export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        setError: (state, action) => {
            state.error = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getAllUser.pending, (state) => {
            state.loading = true;
        });
    },
});
export const { setError } = usersSlice.actions;
export default usersSlice.reducer;

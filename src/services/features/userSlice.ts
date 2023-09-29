import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';
import { IEditUser, IUser } from '../../models/User/UserInterface';
import {
    editUserByIDEndPoint,
    getAllUserEndPoint,
    getUserByIDEndPoint,
} from '../config/api-config';

interface UserState {
    loading: boolean;
    users: IUser[] | null;
    user: IUser | null;
    error: string[] | unknown;
}

const initialState: UserState = {
    loading: false,
    users: null,
    user: null,
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
            return response.data.result;
        } catch (error: any) {
            return thunkAPI.rejectWithValue({
                error: error.response?.data?.errorMessages,
            });
        }
    },
);

export const getUserByID = createAsyncThunk<IUser, { id: number }>(
    'users/getUserbyID',
    async (data, thunkAPI) => {
        const { id } = data;
        try {
            const token = localStorage.getItem('motorbike_bs');
            const response = await axios.get(`${getUserByIDEndPoint}/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log(response);
            return response.data.result;
        } catch (err: any) {
            toast.error('Có lỗi xảy ra ! Vui lòng kiểm tra lại ! ');
            return thunkAPI.rejectWithValue({
                error: err.response?.data?.errorMessages,
            });
        }
    },
);
// export const editUserByID = createAsyncThunk<IUser, IEditUser>(
//     'users/editUserByID',
//     async (data, thunkAPI) => {
//         try {
//             const token = localStorage.getItem('motorbike_bs');
//             const response = await axios.put(
//                 `${editUserByIDEndPoint}/${id}`,
//                 data,
//                 {
//                     headers: {
//                         Authorization: `Bearer ${token}`,
//                     },
//                 },
//             );
//             return response.data;
//         } catch (err: any) {
//             toast.error('Có lỗi xảy ra ! Vui lòng kiểm tra lại ! ');
//             return thunkAPI.rejectWithValue({
//                 error: err.response?.data?.errorMessages,
//             });
//         }
//     },
// );
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
        builder.addCase(getAllUser.fulfilled, (state, action) => {
            state.loading = false;
            state.users = action.payload;
            state.error = null;
        });
        builder.addCase(getAllUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
        builder.addCase(getUserByID.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getUserByID.fulfilled, (state, action) => {
            state.loading = false;
            state.user = action.payload;
        });
        builder.addCase(getUserByID.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    },
});
export const { setError } = usersSlice.actions;
export default usersSlice.reducer;

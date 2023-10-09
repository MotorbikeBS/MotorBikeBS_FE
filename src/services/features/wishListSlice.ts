import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IWishList } from '../../models/WishList/WishList';
import axios from 'axios';
import {
    deleteAllWishListEndPoint,
    getWishListEndPoint,
} from '../config/api-config';
import { toast } from 'react-toastify';

interface WishListState {
    loading: boolean;
    wishlists: IWishList[] | null;
    error: string[] | unknown;
}

const initialState: WishListState = {
    loading: false,
    wishlists: null,
    error: null,
};

export const getWishList = createAsyncThunk<IWishList[], void>(
    'wishlist/getAllWishList',
    async (_, thunkAPI) => {
        try {
            const token = localStorage.getItem('motorbike_bs');
            const response = await axios.get(getWishListEndPoint, {
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
export const deleteAllWishList = createAsyncThunk<IWishList[], void>(
    'wishlist/deleteAllWishLish',
    async (_, thunkAPI) => {
        try {
            const token = localStorage.getItem('motorbike_bs');
            const response = await axios.delete(deleteAllWishListEndPoint, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            toast.success('Xóa danh sách yêu thích thành công !');
            return response.data.result;
        } catch (error: any) {
            toast.error('Xóa danh sách yêu thích không thành công');
            return thunkAPI.rejectWithValue({
                error: error.response?.data?.errorMessages,
            });
        }
    },
);

export const wishListSlice = createSlice({
    name: 'wishlist',
    initialState,
    reducers: {
        setError: (state, action) => {
            state.error = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getWishList.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getWishList.fulfilled, (state, action) => {
            state.loading = false;
            state.wishlists = action.payload;
        });
        builder.addCase(getWishList.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
        builder.addCase(deleteAllWishList.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(deleteAllWishList.fulfilled, (state, action) => {
            state.loading = false;
            state.wishlists = [];
        });
        builder.addCase(deleteAllWishList.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
    },
});

export const { setError } = wishListSlice.actions;
export default wishListSlice.reducer;

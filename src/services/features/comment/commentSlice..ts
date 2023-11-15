import { getHistoryCommentByRequestIdEndPoint } from './../../config/api-config';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IComment } from '../../../models/Comment/Comment';
import { toast } from 'react-toastify';
import axios from 'axios';
import {
    createCommentEndPoint,
    deleteCommentEndPoint,
    editCommentEndPoint,
    getCommentByStoreIdEndPoint,
    getRequestAssociatedWithStoreEndPoint,
    replyCommentEndPoint,
} from '../../config/api-config';
import { IRequest } from '../../../models/Request/Request';

interface CommentState {
    loading: boolean;
    error: string[] | unknown;
    comment: IComment | null;
    commentStore: IComment[] | null;
    requestsWithStore: IRequest[] | null;
}

const initialState: CommentState = {
    loading: false,
    error: null,
    comment: null,
    commentStore: null,
    requestsWithStore: null,
};

export const getCommentByStoreId = createAsyncThunk<
    IComment[],
    { storeId: number }
>('comment/getCommentByStoreId', async ({ storeId }, thunkAPI) => {
    try {
        const token = localStorage.getItem('motorbike_bs');
        const response = await axios.get(
            `${getCommentByStoreIdEndPoint}?StoreID=${storeId}`,
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
});

export const getHistoryCommentByRequestId = createAsyncThunk<
    IComment[],
    { requestId: number }
>('comment/getHistoryCommentByRequestId', async ({ requestId }, thunkAPI) => {
    try {
        const token = localStorage.getItem('motorbike_bs');
        const response = await axios.get(
            `${getHistoryCommentByRequestIdEndPoint}?RequestID=${requestId}`,
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
});

export const createComment = createAsyncThunk<
    IComment,
    { requestId: number; data: Object }
>('comment/createComment', async ({ requestId, data }, thunkAPI) => {
    try {
        const token = localStorage.getItem('motorbike_bs');
        const response = await axios.post(
            `${createCommentEndPoint}?RequestID=${requestId}`,
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
        toast.error(`${error.response.data?.errorMessages}`);
        return thunkAPI.rejectWithValue({
            error: error.response?.data?.errorMessages,
        });
    }
});

export const replyComment = createAsyncThunk<
    IComment,
    { replyId: number; data: Object }
>('comment/replyComment', async ({ replyId, data }, thunkAPI) => {
    try {
        const token = localStorage.getItem('motorbike_bs');
        const response = await axios.post(
            `${replyCommentEndPoint}?ReplyId=${replyId}`,
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
        toast.error(`${error.response.data?.errorMessages}`);
        return thunkAPI.rejectWithValue({
            error: error.response?.data?.errorMessages,
        });
    }
});

export const editComment = createAsyncThunk<
    IComment,
    { commentId: number; data: Object }
>('comment/editComment', async ({ commentId, data }, thunkAPI) => {
    try {
        const token = localStorage.getItem('motorbike_bs');
        const response = await axios.put(
            `${editCommentEndPoint}?CommentID=${commentId}`,
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
        toast.error(`${error.response.data?.errorMessages}`);
        return thunkAPI.rejectWithValue({
            error: error.response?.data?.errorMessages,
        });
    }
});

export const deleteComment = createAsyncThunk<IComment, { id: number }>(
    'comment/deleteComment',
    async ({ id }, thunkAPI) => {
        try {
            const token = localStorage.getItem('motorbike_bs');
            const response = await axios.put(
                `${deleteCommentEndPoint}?id=${id}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                },
            );
            return response.data;
        } catch (error: any) {
            toast.error(`${error.response.data?.errorMessages}`);
            return thunkAPI.rejectWithValue({
                error: error.response?.data?.errorMessages,
            });
        }
    },
);

export const getRequestAssociatedWithStore = createAsyncThunk<
    IRequest[],
    { storeId: number }
>('request/getRequestAssociatedWithStore', async ({ storeId }, thunkAPI) => {
    try {
        const token = localStorage.getItem('motorbike_bs');
        const response = await axios.get(
            `${getRequestAssociatedWithStoreEndPoint}?StoreID=${storeId}`,
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

export const commentSlice = createSlice({
    name: 'comment',
    initialState,
    reducers: {
        clearComment: (state) => {
            state.comment = null;
            state.commentStore = null;
        },
        clearRequest: (state) => {
            state.requestsWithStore = null;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getCommentByStoreId.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(getCommentByStoreId.fulfilled, (state, action) => {
            state.loading = false;
            state.commentStore = action.payload;
            state.error = null;
        });
        builder.addCase(getCommentByStoreId.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
        builder.addCase(createComment.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(createComment.fulfilled, (state, action) => {
            state.loading = false;
            state.comment = action.payload;
            state.error = null;
        });
        builder.addCase(createComment.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });

        builder.addCase(replyComment.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(replyComment.fulfilled, (state, action) => {
            state.loading = false;
            state.comment = action.payload;
            state.error = null;
        });
        builder.addCase(replyComment.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
        builder.addCase(editComment.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(editComment.fulfilled, (state, action) => {
            state.loading = false;
            state.comment = action.payload;
            state.error = null;
        });
        builder.addCase(editComment.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
        builder.addCase(deleteComment.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(deleteComment.fulfilled, (state, action) => {
            state.loading = false;
            state.comment = action.payload;
            state.error = null;
        });
        builder.addCase(deleteComment.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
        });
        builder.addCase(getRequestAssociatedWithStore.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(
            getRequestAssociatedWithStore.fulfilled,
            (state, action) => {
                state.loading = false;
                state.requestsWithStore = action.payload;
                state.error = null;
            },
        );
        builder.addCase(
            getRequestAssociatedWithStore.rejected,
            (state, action) => {
                state.loading = false;
                state.error = action.payload;
            },
        );
    },
});

export const { clearComment, clearRequest } = commentSlice.actions;
export default commentSlice.reducer;

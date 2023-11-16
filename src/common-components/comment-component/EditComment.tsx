import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Rating,
    TextareaAutosize,
    Typography,
} from '@mui/material';
import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../services/store/store';
import {
    editComment,
    getCommentByCommentId,
} from '../../services/features/comment/commentSlice.';
import { toast } from 'react-toastify';

interface ICommentProps {
    content: string;
    rating: number;
}

interface EditCommentProps {
    commentId: number;
    isOpenEditComment: boolean;
    onCloseEditComment: () => void;
    loadData: () => void;
}

const EditComment: React.FC<EditCommentProps> = ({
    commentId,
    isOpenEditComment,
    onCloseEditComment,
    loadData,
}) => {
    const dispatch = useAppDispatch();
    const { comment } = useAppSelector((state) => state.comment);

    useEffect(() => {
        dispatch(getCommentByCommentId({ commentId: commentId }));
    }, [dispatch, commentId]);

    const form = useForm<ICommentProps>({
        defaultValues: {
            content: '',
            rating: undefined,
        },
    });

    const { control, handleSubmit, setValue } = form;

    useEffect(() => {
        if (comment) {
            form.setValue('rating', comment?.rating);
            form.setValue('content', comment?.content);
        }
    }, [comment, form]);

    const onSubmit = (data: ICommentProps) => {
        dispatch(editComment({ commentId: commentId, data }))
            .unwrap()
            .then(() => {
                loadData();
                toast.success('Chỉnh sửa bình luận thành công.');
                onCloseEditComment();
            })
            .catch((error) => {
                console.log(error);
            });
        console.log(data);
    };
    return (
        <Box sx={{ width: '70%' }}>
            <Dialog
                fullWidth
                maxWidth="sm"
                open={isOpenEditComment}
                onClose={onCloseEditComment}
            >
                <DialogTitle>
                    <Typography variant="h5" textAlign="center">
                        Chỉnh sửa bình luận
                    </Typography>
                </DialogTitle>
                <DialogContent>
                    <Box sx={{ padding: 2 }}>
                        <form noValidate className="form-cmt">
                            <Controller
                                name="rating"
                                control={control}
                                render={({ field }) => (
                                    <Rating
                                        {...field}
                                        defaultValue={0}
                                        precision={1}
                                    />
                                )}
                            />
                            <Controller
                                name="content"
                                control={control}
                                render={({ field }) => (
                                    <TextareaAutosize
                                        {...field}
                                        placeholder="Viết bình luận ..."
                                        style={{
                                            width: '85%',
                                            height: '60px',
                                            resize: 'none',
                                        }}
                                    />
                                )}
                            />
                        </form>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onCloseEditComment} color="error">
                        Hủy bỏ
                    </Button>
                    <Button
                        type="submit"
                        onClick={handleSubmit(onSubmit)}
                        color="info"
                    >
                        Xác nhận
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default EditComment;

import React, { useEffect } from 'react';
import {
    useAppDispatch,
} from '../../../../services/store/store';
import {
    editComment,
} from '../../../../services/features/comment/commentSlice.';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextareaAutosize,
    Typography,
} from '@mui/material';

interface ICommentProps {
    content: string;
    rating: number;
}

interface EditReplyCommentProps {
    replyCommentId: number;
    replyContent: string;
    isOpenEditComment: boolean;
    onCloseEditComment: () => void;
    loadData: () => void;
}

const EditReplyComment: React.FC<EditReplyCommentProps> = ({
    replyCommentId,
    replyContent,
    isOpenEditComment,
    onCloseEditComment,
    loadData,
}) => {
    const dispatch = useAppDispatch();
    const form = useForm<ICommentProps>({
        defaultValues: {
            content: '',
            rating: 0,
        },
    });

    const { control, handleSubmit } = form;

    useEffect(() => {
        if (replyContent) {
            form.setValue('content', replyContent);
        }
    }, [replyContent, form]);

    const onSubmit = (data: ICommentProps) => {
        dispatch(editComment({ commentId: replyCommentId, data }))
            .unwrap()
            .then(() => {
                loadData();
                toast.success('Chỉnh sửa bình luận thành công.');
                onCloseEditComment();
            })
            .catch((error) => {
                console.log(error);
            });
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
                                name="content"
                                control={control}
                                render={({ field }) => (
                                    <TextareaAutosize
                                        {...field}
                                        placeholder="Viết bình luận ..."
                                        style={{
                                            width: '100%',
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

export default EditReplyComment;

import React, { useEffect } from 'react';
import {
    useAppDispatch,
    useAppSelector,
} from '../../../../services/store/store';
import { Controller, useForm } from 'react-hook-form';
import {
    getCommentByCommentId,
    replyComment,
} from '../../../../services/features/comment/commentSlice.';
import { toast } from 'react-toastify';
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Paper,
    Rating,
    TextareaAutosize,
    Typography,
} from '@mui/material';

interface ICommentProps {
    content: string;
    rating: number;
}

interface createReplyCommentProps {
    commentId: number;
    isOpenCreateReplyComment: boolean;
    onCloseCreateReplyComment: () => void;
    loadData: () => void;
}

const CreateReplyComment: React.FC<createReplyCommentProps> = ({
    commentId,
    isOpenCreateReplyComment,
    onCloseCreateReplyComment,
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
            rating: 0,
        },
    });

    const clearForm = () => {
        form.reset();
    };

    const onClose = () => {
        clearForm();
        onCloseCreateReplyComment();
    };

    const { control, handleSubmit, formState } = form;
    const { isDirty } = formState;

    const onSubmit = async (data: ICommentProps) => {
        dispatch(replyComment({ replyId: Number(commentId), data }))
            .unwrap()
            .then(() => {
                loadData();
                clearForm();
                onCloseCreateReplyComment();
                toast.success('Bình luận thành công.');
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
                open={isOpenCreateReplyComment}
                onClose={onCloseCreateReplyComment}
            >
                <DialogTitle>
                    <Typography variant="h5" textAlign="center">
                        Trả lời bình luận
                    </Typography>
                </DialogTitle>
                <DialogContent>
                    {comment && (
                        <Paper key={comment?.commentId} elevation={3}>
                            <Box className="comment-box-paper">
                                <Box className="cmt-box">
                                    <Box className="user-date">
                                        {comment?.userId ===
                                        comment?.request?.receiver?.userId ? (
                                            <Typography className="user-date-name">
                                                {
                                                    comment?.request?.receiver
                                                        ?.userName
                                                }
                                            </Typography>
                                        ) : (
                                            <>
                                                <Typography className="user-date-name">
                                                    {
                                                        comment?.request?.sender
                                                            ?.userName
                                                    }
                                                </Typography>
                                            </>
                                        )}
                                        <Typography variant="subtitle1">
                                            {comment.createAt &&
                                                new Date(
                                                    comment.createAt,
                                                ).toLocaleString('vi-VN', {
                                                    timeZone:
                                                        'Asia/Ho_Chi_Minh',
                                                    day: '2-digit',
                                                    month: '2-digit',
                                                    year: 'numeric',
                                                    hour: '2-digit',
                                                    minute: '2-digit',
                                                })}
                                        </Typography>
                                    </Box>
                                    <Box className="info-cmt">
                                        <Rating
                                            readOnly
                                            defaultValue={comment?.rating}
                                            precision={1}
                                        />
                                        <Typography>
                                            {comment?.content}
                                        </Typography>
                                        <Typography className="request-description">
                                            {
                                                comment?.request?.requestType
                                                    ?.description
                                            }
                                        </Typography>
                                    </Box>
                                </Box>
                            </Box>
                        </Paper>
                    )}

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
                    <Button onClick={onClose} color="error">
                        Hủy bỏ
                    </Button>
                    <Button
                        type="submit"
                        onClick={handleSubmit(onSubmit)}
                        color="info"
                        disabled={!isDirty}
                    >
                        Trả lời
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default CreateReplyComment;

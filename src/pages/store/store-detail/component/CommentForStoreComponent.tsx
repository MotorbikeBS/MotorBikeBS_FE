import React, { useEffect, useState } from 'react';
import {
    Box,
    Button,
    CircularProgress,
    Container,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Paper,
    Rating,
    Typography,
} from '@mui/material';
import {
    useAppDispatch,
    useAppSelector,
} from '../../../../services/store/store';
import { getUserByID } from '../../../../services/features/user/userSlice';
import {
    clearComment,
    deleteComment,
    getCommentByStoreId,
} from '../../../../services/features/comment/commentSlice.';
import '../style/style.scss';
import { toast } from 'react-toastify';
import EditReplyComment from './EditReplyComment';
import CreateReplyComment from './CreateReplyComment';

const CommentForStoreComponent = () => {
    const dispatch = useAppDispatch();
    const { account } = useAppSelector((state) => state.account);
    const { user } = useAppSelector((state) => state.users);
    const { commentStore, loading } = useAppSelector((state) => state.comment);

    const [selectedCommentId, setSelectedCommentId] = useState<number>();
    const [editReplyContent, setEditReplyContent] = useState<string>();
    const [isOpenCreateReplyComment, setIsOpenCreateReplyComment] =
        useState(false);
    const [isOpenEditComment, setIsOpenEditComment] = useState(false);

    const [openSubmitDeleteComment, setOpenSubmitDeleteComment] =
        useState(false);
    const [deleteReplyCommentId, setDeleteReplyCommentId] = useState<
        number | undefined
    >();

    const handleCloseCreateReplyComment = () => {
        setIsOpenCreateReplyComment(false);
    };

    const handleCloseEditComment = () => {
        setIsOpenEditComment(false);
    };

    const handleOpenCreateReplyComment = (createReplyCommentId: number) => {
        setIsOpenCreateReplyComment(true);
        setSelectedCommentId(createReplyCommentId);
    };

    const handleOpenEditComment = (
        replyCommentId: number,
        replyContent: string,
    ) => {
        setIsOpenEditComment(true);
        setSelectedCommentId(replyCommentId);
        setEditReplyContent(replyContent);
    };

    const handleOpenSubmitDeleteComment = (replyCommentId: number) => {
        setOpenSubmitDeleteComment(true);
        setDeleteReplyCommentId(replyCommentId);
    };

    const handleCancelSubmitDeleteComment = () => {
        setOpenSubmitDeleteComment(false);
    };

    const handleSubmitDeleteComment = () => {
        dispatch(deleteComment({ commentId: Number(deleteReplyCommentId) }))
            .unwrap()
            .then(() => {
                loadData();
                toast.success('Đã xóa bình luận thành công!');
                handleCancelSubmitDeleteComment();
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        dispatch(getUserByID({ id: Number(account?.userId) }));
    }, [dispatch, account]);

    const loadData = () => {
        dispatch(clearComment());
        dispatch(
            getCommentByStoreId({
                storeId: Number(user?.storeDesciptions[0]?.storeId),
            }),
        );
    };

    useEffect(() => {
        loadData();
    }, [dispatch, user]);

    return (
        <>
            <Paper elevation={3} sx={{ padding: 2, marginBottom: 2 }}>
                <Typography variant="h5">Bình luận</Typography>
                <hr />
            </Paper>
            {loading === true ? (
                <Box textAlign="center">
                    <CircularProgress />
                </Box>
            ) : (
                <>
                    {commentStore && commentStore?.length === 0 ? (
                        <>
                            <Container className="comment-container-notFound">
                                <Paper elevation={3} sx={{ padding: 2 }}>
                                    Chưa có bình luận nào.
                                </Paper>
                            </Container>
                        </>
                    ) : (
                        <>
                            {commentStore &&
                                commentStore?.map((comment) => (
                                    <>
                                        <Paper
                                            key={comment?.commentId}
                                            elevation={3}
                                        >
                                            <Box className="comment-box-paper">
                                                <Box className="cmt-box">
                                                    <Box className="user-date">
                                                        {comment?.userId ===
                                                        comment?.request
                                                            ?.receiver
                                                            ?.userId ? (
                                                            <Typography className="user-date-name">
                                                                {
                                                                    comment
                                                                        ?.request
                                                                        ?.receiver
                                                                        ?.userName
                                                                }
                                                            </Typography>
                                                        ) : (
                                                            <>
                                                                <Typography className="user-date-name">
                                                                    {
                                                                        comment
                                                                            ?.request
                                                                            ?.sender
                                                                            ?.userName
                                                                    }
                                                                </Typography>
                                                            </>
                                                        )}
                                                        <Typography variant="subtitle1">
                                                            {comment.createAt &&
                                                                (() => {
                                                                    const originalDate =
                                                                        new Date(
                                                                            comment.createAt,
                                                                        );
                                                                    const newDate =
                                                                        new Date(
                                                                            originalDate.getTime() +
                                                                                7 *
                                                                                    60 *
                                                                                    60 *
                                                                                    1000,
                                                                        );

                                                                    return newDate.toLocaleString(
                                                                        'vi-VN',
                                                                        {
                                                                            timeZone:
                                                                                'Asia/Ho_Chi_Minh',
                                                                            day: '2-digit',
                                                                            month: '2-digit',
                                                                            year: 'numeric',
                                                                            hour: '2-digit',
                                                                            minute: '2-digit',
                                                                        },
                                                                    );
                                                                })()}
                                                        </Typography>
                                                    </Box>
                                                    <Box className="info-cmt">
                                                        <Rating
                                                            readOnly
                                                            defaultValue={
                                                                comment?.rating
                                                            }
                                                            precision={1}
                                                        />
                                                        <Typography>
                                                            {comment?.content}
                                                        </Typography>
                                                        <Typography className="request-description">
                                                            {
                                                                comment?.request
                                                                    ?.requestType
                                                                    ?.description
                                                            }{' '}
                                                            -{' '}
                                                            {
                                                                comment?.request
                                                                    ?.motor
                                                                    ?.motorName
                                                            }{' '}
                                                            -{' '}
                                                            {
                                                                comment?.request
                                                                    ?.status
                                                            }
                                                        </Typography>
                                                    </Box>
                                                </Box>
                                                <Box>
                                                    <Button
                                                        onClick={() =>
                                                            handleOpenCreateReplyComment(
                                                                comment?.commentId,
                                                            )
                                                        }
                                                        variant="outlined"
                                                    >
                                                        Trả lời
                                                    </Button>
                                                </Box>
                                            </Box>
                                        </Paper>
                                        {comment?.inverseReply &&
                                            comment?.inverseReply.map(
                                                (replyCmt) => (
                                                    <>
                                                        {replyCmt?.status !==
                                                            'DELETE' && (
                                                            <Paper
                                                                key={
                                                                    replyCmt?.commentId
                                                                }
                                                                elevation={3}
                                                                sx={{
                                                                    marginLeft: 6,
                                                                }}
                                                            >
                                                                <Typography className="reply-title">
                                                                    Trả lời:
                                                                </Typography>
                                                                <Box className="comment-box-paper">
                                                                    <Box className="cmt-box">
                                                                        <Box className="user-date">
                                                                            {comment
                                                                                ?.request
                                                                                ?.receiver
                                                                                ?.roleId ===
                                                                                2 && (
                                                                                <Typography className="user-date-name">
                                                                                    {
                                                                                        comment
                                                                                            ?.request
                                                                                            ?.receiver
                                                                                            ?.userName
                                                                                    }{' '}
                                                                                    -{' '}
                                                                                    {
                                                                                        comment
                                                                                            ?.request
                                                                                            ?.receiver
                                                                                            ?.storeDesciptions[0]
                                                                                            ?.storeName
                                                                                    }
                                                                                </Typography>
                                                                            )}
                                                                            {comment
                                                                                ?.request
                                                                                ?.sender
                                                                                ?.roleId ===
                                                                                2 && (
                                                                                <Typography className="user-date-name">
                                                                                    {
                                                                                        comment
                                                                                            ?.request
                                                                                            ?.sender
                                                                                            ?.userName
                                                                                    }{' '}
                                                                                    -{' '}
                                                                                    {
                                                                                        comment
                                                                                            ?.request
                                                                                            ?.sender
                                                                                            ?.storeDesciptions[0]
                                                                                            ?.storeName
                                                                                    }
                                                                                </Typography>
                                                                            )}

                                                                            {replyCmt?.updateAt !==
                                                                                null && (
                                                                                <Typography
                                                                                    sx={{
                                                                                        color: '#ccc',
                                                                                    }}
                                                                                >
                                                                                    Đã
                                                                                    chỉnh
                                                                                    sửa
                                                                                </Typography>
                                                                            )}
                                                                            <Typography variant="subtitle1">
                                                                                {replyCmt.createAt &&
                                                                                    (() => {
                                                                                        const originalDate =
                                                                                            new Date(
                                                                                                replyCmt.createAt,
                                                                                            );
                                                                                        const newDate =
                                                                                            new Date(
                                                                                                originalDate.getTime() +
                                                                                                    7 *
                                                                                                        60 *
                                                                                                        60 *
                                                                                                        1000,
                                                                                            );

                                                                                        return newDate.toLocaleString(
                                                                                            'vi-VN',
                                                                                            {
                                                                                                timeZone:
                                                                                                    'Asia/Ho_Chi_Minh',
                                                                                                day: '2-digit',
                                                                                                month: '2-digit',
                                                                                                year: 'numeric',
                                                                                                hour: '2-digit',
                                                                                                minute: '2-digit',
                                                                                            },
                                                                                        );
                                                                                    })()}
                                                                            </Typography>
                                                                        </Box>
                                                                        <Box className="info-cmt">
                                                                            <Typography>
                                                                                {
                                                                                    replyCmt?.content
                                                                                }
                                                                            </Typography>
                                                                        </Box>
                                                                    </Box>

                                                                    <Box>
                                                                        <Button
                                                                            sx={{
                                                                                marginRight: 1,
                                                                            }}
                                                                            onClick={() =>
                                                                                handleOpenEditComment(
                                                                                    replyCmt?.commentId,
                                                                                    replyCmt?.content,
                                                                                )
                                                                            }
                                                                            variant="outlined"
                                                                        >
                                                                            Chỉnh
                                                                            sửa
                                                                        </Button>
                                                                        <Button
                                                                            onClick={() =>
                                                                                handleOpenSubmitDeleteComment(
                                                                                    replyCmt?.commentId,
                                                                                )
                                                                            }
                                                                            variant="outlined"
                                                                            color="error"
                                                                        >
                                                                            Xóa
                                                                        </Button>
                                                                    </Box>
                                                                </Box>
                                                            </Paper>
                                                        )}
                                                    </>
                                                ),
                                            )}
                                    </>
                                ))}
                        </>
                    )}
                </>
            )}
            <Dialog open={openSubmitDeleteComment}>
                <DialogTitle>
                    <Typography variant="h5">Xác nhận xoá bình luận</Typography>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <Typography>
                            Bạn có chắc chắn muốn xóa bình luận không ?
                        </Typography>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        color="error"
                        variant="outlined"
                        onClick={handleCancelSubmitDeleteComment}
                    >
                        Hủy bỏ
                    </Button>
                    <Button
                        color="success"
                        variant="outlined"
                        onClick={handleSubmitDeleteComment}
                    >
                        Đồng ý
                    </Button>
                </DialogActions>
            </Dialog>
            <CreateReplyComment
                commentId={selectedCommentId || 0}
                isOpenCreateReplyComment={isOpenCreateReplyComment}
                onCloseCreateReplyComment={handleCloseCreateReplyComment}
                loadData={loadData}
            />
            <EditReplyComment
                replyContent={editReplyContent || ''}
                replyCommentId={selectedCommentId || 0}
                isOpenEditComment={isOpenEditComment}
                loadData={loadData}
                onCloseEditComment={handleCloseEditComment}
            />
        </>
    );
};

export default CommentForStoreComponent;

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

import './style/style.scss';
import CreateComment from './CreateComment';
import SelectRequestModal from './SelectRequestModal';
import { useAppDispatch, useAppSelector } from '../../services/store/store';
import { useParams } from 'react-router';
import {
    clearComment,
    clearRequest,
    deleteComment,
    getCommentByStoreId,
    getRequestAssociatedWithStore,
} from '../../services/features/comment/commentSlice.';
import EditComment from './EditComment';
import { toast } from 'react-toastify';

type storeParams = {
    storeId: number;
};

const CommentComponent = () => {
    const dispatch = useAppDispatch();
    const { commentStore, loading, requestsWithStore } = useAppSelector(
        (state) => state.comment,
    );
    const { account } = useAppSelector((state) => state.account);
    const { storeId } = useParams<storeParams | any>();

    const [isOpen, setIsOpen] = useState(false);
    const [isOpenEditComment, setIsOpenEditComment] = useState(false);
    const [openSubmitDeleteComment, setOpenSubmitDeleteComment] =
        useState(false);
    const [deleteCommentId, setDeleteCommentId] = useState<
        number | undefined
    >();
    const [editCommentId, setEditCommentId] = useState<number>();

    const handleOpenSelectRequest = () => {
        setIsOpen(true);
    };

    const handleCloseSelectRequest = () => {
        setIsOpen(false);
    };

    const handleOpenEditComment = (commentId: number) => {
        setIsOpenEditComment(true);
        setEditCommentId(commentId);
    };

    const handleCloseEditComment = () => {
        setIsOpenEditComment(false);
    };

    const handleOpenSubmitDeleteComment = (commentId: number) => {
        setOpenSubmitDeleteComment(true);
        setDeleteCommentId(commentId);
    };

    const handleCancelSubmitDeleteComment = () => {
        setOpenSubmitDeleteComment(false);
    };

    const handleSubmitDeleteComment = () => {
        dispatch(deleteComment({ commentId: Number(deleteCommentId) }))
            .unwrap()
            .then(() => {
                loadData();
                toast.success('Đã xóa bình luận thành công!');
                handleCancelSubmitDeleteComment();
            })
            .catch((error) => {
            });
    };

    const loadData = () => {
        dispatch(clearComment());
        dispatch(clearRequest());
        dispatch(getCommentByStoreId({ storeId: Number(storeId) }));
        dispatch(getRequestAssociatedWithStore({ storeId: Number(storeId) }));
    };

    useEffect(() => {
        loadData();
    }, [dispatch, storeId]);

    const [selectedRequestId, setSelectedRequestId] = useState<string>('');
    const [selectedRequestTitle, setSelectedRequestTitle] =
        useState<string>('');

    const handleClearRequestTitle = () => {
        setSelectedRequestTitle('');
    };

    const handleRequestSelect = (requestId: string, title: string) => {
        setSelectedRequestId(requestId);
        setSelectedRequestTitle(title);
    };

    return (
        <>
            <Paper elevation={3} className="cmt-paper">
                <Typography variant="h5">Bình luận</Typography>
                <hr />

                {requestsWithStore === null ? (
                    <Typography></Typography>
                ) : (
                    <>
                        <Box sx={{ marginBottom: 2 }}>
                            <Button
                                variant="contained"
                                onClick={handleOpenSelectRequest}
                            >
                                Chọn Yêu cầu để bình luận
                            </Button>
                        </Box>
                        <SelectRequestModal
                            isOpen={isOpen}
                            onClose={handleCloseSelectRequest}
                            onRequestSelect={handleRequestSelect}
                        />
                        {selectedRequestTitle === '' ? (
                            <></>
                        ) : (
                            <>
                                <Box className="request-title">
                                    <Typography className="request-title-text">
                                        {selectedRequestTitle}
                                    </Typography>
                                </Box>
                                <Box>
                                    <CreateComment
                                        requestId={selectedRequestId}
                                        loadData={loadData}
                                        handleClearRequestTitle={
                                            handleClearRequestTitle
                                        }
                                    />
                                </Box>
                            </>
                        )}
                    </>
                )}
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
                                                        {comment?.updateAt !==
                                                            null &&
                                                            comment?.userId ===
                                                            account?.userId && (
                                                                <Typography
                                                                    sx={{
                                                                        color: '#ccc',
                                                                    }}
                                                                >
                                                                    Đã chỉnh sửa
                                                                </Typography>
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
                                                {comment?.inverseReply &&
                                                    (comment.inverseReply as any[])
                                                        .length !== 0 ? (
                                                    <Typography></Typography>
                                                ) : (
                                                    <>
                                                        {account?.roleId ===
                                                            3 &&
                                                            comment?.request
                                                                ?.receiver
                                                                ?.userId ===
                                                            account?.userId && (
                                                                <Box>
                                                                    <Button
                                                                        sx={{
                                                                            marginRight: 1,
                                                                        }}
                                                                        onClick={() =>
                                                                            handleOpenEditComment(
                                                                                comment?.commentId,
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
                                                                                comment?.commentId,
                                                                            )
                                                                        }
                                                                        variant="outlined"
                                                                        color="error"
                                                                    >
                                                                        Xóa
                                                                    </Button>
                                                                </Box>
                                                            )}
                                                        {account?.roleId ===
                                                            4 &&
                                                            comment?.request
                                                                ?.sender
                                                                ?.userId ===
                                                            account?.userId && (
                                                                <Box>
                                                                    <Button
                                                                        sx={{
                                                                            marginRight: 1,
                                                                        }}
                                                                        onClick={() =>
                                                                            handleOpenEditComment(
                                                                                comment?.commentId,
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
                                                                                comment?.commentId,
                                                                            )
                                                                        }
                                                                        variant="outlined"
                                                                        color="error"
                                                                    >
                                                                        Xóa
                                                                    </Button>
                                                                </Box>
                                                            )}
                                                    </>
                                                )}
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
                                                                                                    ?.storeDescriptions[0]
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
                                                                                                    ?.storeDescriptions[0]
                                                                                                    ?.storeName
                                                                                            }
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
            <EditComment
                commentId={editCommentId || 0}
                isOpenEditComment={isOpenEditComment}
                loadData={loadData}
                onCloseEditComment={handleCloseEditComment}
            />
        </>
    );
};

export default CommentComponent;

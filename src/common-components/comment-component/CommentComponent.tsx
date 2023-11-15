import React, { useEffect, useState } from 'react';
import {
    Box,
    Button,
    CircularProgress,
    Container,
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
    getCommentByStoreId,
    getRequestAssociatedWithStore,
} from '../../services/features/comment/commentSlice.';
import { format } from 'date-fns';

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

    const handleOpenSelectRequest = () => {
        setIsOpen(true);
    };

    const handleCloseSelectRequest = () => {
        setIsOpen(false);
    };

    const loadData = () => {
        dispatch(clearComment());
        dispatch(clearRequest());
        dispatch(getCommentByStoreId({ storeId: Number(storeId) }));
        dispatch(getRequestAssociatedWithStore({ storeId: Number(storeId) }));
    };

    useEffect(() => {
        loadData()
    }, [dispatch, storeId]);

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
                        />
                        <Box className="request-title">
                            <Typography className="request-title-text">
                                Yêu cầu thương lượng giá - Wave
                            </Typography>
                        </Box>
                        <Box>
                            <CreateComment />
                        </Box>
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
                                    <Paper
                                        key={comment?.commentId}
                                        elevation={3}
                                        sx={{
                                            paddingY: 2,
                                            paddingX: 4,
                                            marginBottom: 2,
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <Box className="cmt-box">
                                            <Box className="user-date">
                                                {comment?.request?.motor
                                                    ?.owner === null ? (
                                                    <Typography className="user-date-name">
                                                        {
                                                            comment?.request
                                                                ?.receiver
                                                                ?.userName
                                                        }
                                                    </Typography>
                                                ) : (
                                                    <>
                                                        <Typography className="user-date-name">
                                                            {
                                                                comment?.request
                                                                    ?.sender
                                                                    ?.userName
                                                            }
                                                        </Typography>
                                                    </>
                                                )}
                                                {/* <Typography
                                                    sx={{ color: '#ccc' }}
                                                >
                                                    Đã chỉnh sửa
                                                </Typography> */}
                                                <Typography variant="subtitle1">
                                                    {comment?.createAt &&
                                                        format(
                                                            new Date(
                                                                comment?.createAt,
                                                            ),
                                                            'dd-MM-yyyy HH:mm',
                                                        )}
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
                                                    }
                                                </Typography>
                                            </Box>
                                        </Box>
                                        {account?.roleId === 3 &&
                                            comment?.request?.receiver
                                                ?.userId ===
                                                account?.userId && (
                                                <Box>
                                                    <Button variant="outlined">
                                                        Chỉnh sửa
                                                    </Button>
                                                </Box>
                                            )}
                                        {account?.roleId === 4 &&
                                            comment?.request?.sender?.userId ===
                                                account?.userId && (
                                                <Box>
                                                    <Button variant="outlined">
                                                        Chỉnh sửa
                                                    </Button>
                                                </Box>
                                            )}
                                    </Paper>
                                ))}
                        </>
                    )}
                </>
            )}
        </>
    );
};

export default CommentComponent;

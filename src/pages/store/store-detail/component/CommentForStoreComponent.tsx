import React, { useEffect } from 'react';
import {
    Box,
    Button,
    CircularProgress,
    Container,
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
    getCommentByStoreId,
} from '../../../../services/features/comment/commentSlice.';
import '../style/style.scss';
import { format } from 'date-fns';

const CommentForStoreComponent = () => {
    const dispatch = useAppDispatch();
    const { account } = useAppSelector((state) => state.account);
    const { user } = useAppSelector((state) => state.users);
    const { commentStore, loading } = useAppSelector((state) => state.comment);

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
                                                <Typography className="user-date-name">
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
                                                                    comment
                                                                        ?.request
                                                                        ?.sender
                                                                        ?.userName
                                                                }
                                                            </Typography>
                                                        </>
                                                    )}
                                                </Typography>
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
                                        <Box>
                                            <Button variant="outlined">
                                                Trả lời
                                            </Button>
                                        </Box>
                                    </Paper>
                                ))}
                        </>
                    )}
                </>
            )}
        </>
    );
};

export default CommentForStoreComponent;

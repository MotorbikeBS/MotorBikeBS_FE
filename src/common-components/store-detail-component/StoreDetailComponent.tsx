import React, { useEffect, useMemo } from 'react';
import {
    Avatar,
    Box,
    Button,
    Container,
    Grid,
    Paper,
    Rating,
    Typography,
} from '@mui/material';
import './style/style.scss';
import { useAppDispatch, useAppSelector } from '../../services/store/store';
import { useParams } from 'react-router-dom';
import { IStore } from '../../models/Store/Store';
import MotorbikeByStoreIdComponent from './MotorBikeByStoreIDComponent';
import { Report } from '@mui/icons-material';
import { format } from 'date-fns';
import CommentComponent from '../comment-component/CommentComponent';
import {
    clearComment,
    getCommentByStoreId,
} from '../../services/features/comment/commentSlice.';

type storeParams = {
    storeId: number;
};

const StoreDetailComponent = () => {
    const { storeId } = useParams<storeParams | any>();
    const dispatch = useAppDispatch();
    const { stores } = useAppSelector((state) => state.store);
    const { commentStore } = useAppSelector((state) => state.comment);

    const averageRating = useMemo(() => {
        if (!commentStore) return undefined;

        const totalRating = commentStore.reduce((total, comment) => {
            if (comment?.rating && comment?.replyId === null) {
                return total + comment.rating;
            }
            return total;
        }, 0);

        const numberOfRatings =
            commentStore.filter(
                (comment) => comment?.rating && comment?.replyId === null,
            ).length || 1;

        return totalRating / numberOfRatings;
    }, [commentStore]);

    const averageFeedback = useMemo(() => {
        if (!commentStore) return undefined;

        const numberOfRatings =
            commentStore.filter((comment) => comment?.rating).length || 1;

        return numberOfRatings;
    }, [commentStore]);

    useEffect(() => {
        dispatch(clearComment());
        dispatch(getCommentByStoreId({ storeId: Number(storeId) }));
    }, [dispatch, storeId]);

    if (!storeId) {
        return (
            <Container>
                <Paper elevation={3} sx={{ padding: 2 }}>
                    Cửa hàng không tồn tại
                </Paper>
            </Container>
        );
    }

    if (!storeId) {
        return (
            <Container>
                <Paper elevation={3} sx={{ padding: 2 }}>
                    Đợi tí......
                </Paper>
            </Container>
        );
    }

    const store = stores?.find((st: IStore) => st.storeId === Number(storeId));

    if (!storeId) {
        return (
            <Container>
                <Paper elevation={3} sx={{ padding: 2 }}>
                    Cửa hàng không tồn tại
                </Paper>
            </Container>
        );
    }

    return (
        <Box className="store-detail-container">
            <Box className="store-detail-header">
                <Grid container spacing={2}>
                    <Grid xs={6} md={4}>
                        <div className="store-info-header">
                            <Avatar
                                sx={{
                                    width: 60,
                                    height: 60,
                                    bgcolor: 'orange',
                                }}
                            >
                                Hi
                            </Avatar>
                            <div>
                                <Typography variant="h5">
                                    {store?.storeName}
                                </Typography>
                                <Typography>
                                    Ngày tham gia:{' '}
                                    <strong>
                                        {store?.storeCreatedAt &&
                                            format(
                                                new Date(store.storeCreatedAt),
                                                'dd-MM-yyyy HH:mm',
                                            )}
                                    </strong>
                                </Typography>
                            </div>
                        </div>
                    </Grid>
                    <Grid xs={6} md={4}>
                        <Box>
                            <div className="store-info">
                                <Typography className="store-info-txt">
                                    <strong>Email : </strong>
                                    {store?.storeEmail}
                                </Typography>
                            </div>
                            <div className="store-info">
                                <Typography className="store-info-txt">
                                    <strong>Điện thoại: </strong>
                                    {store?.storePhone}
                                </Typography>
                            </div>
                            <div className="store-info">
                                <Typography className="store-info-txt">
                                    <strong>Địa chỉ:</strong>
                                    {store?.address}
                                </Typography>
                            </div>
                        </Box>
                    </Grid>
                    <Grid xs={6} md={4}>
                        <div className="btn-action-container">
                            <Button variant="text" color="error">
                                <Report
                                    sx={{
                                        fontSize: '35px',
                                    }}
                                />
                            </Button>
                            <Box>
                                <Button>
                                    <Rating
                                        name="read-only"
                                        defaultValue={averageRating}
                                        precision={0.5}
                                        readOnly
                                    />
                                </Button>
                                <Typography
                                    sx={{ marginLeft: 2, fontSize: 20 }}
                                >
                                    Tổng đánh giá: {averageFeedback}
                                </Typography>
                            </Box>
                        </div>
                    </Grid>
                </Grid>
            </Box>

            <hr />

            <Box>
                <MotorbikeByStoreIdComponent />
            </Box>

            <Container maxWidth="lg">
                <CommentComponent />
            </Container>
        </Box>
    );
};

export default StoreDetailComponent;

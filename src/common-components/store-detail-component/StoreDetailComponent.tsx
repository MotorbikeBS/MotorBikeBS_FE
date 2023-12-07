import React, { useEffect, useState } from 'react';
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
    getAverageStar,
} from '../../services/features/comment/commentSlice.';
import ReportStoreDialog from '../report-store-dialog/ReportStoreDialog';

type storeParams = {
    storeId: number;
};

const StoreDetailComponent = () => {
    const { storeId } = useParams<storeParams | any>();
    const dispatch = useAppDispatch();
    const { stores } = useAppSelector((state) => state.store);
    const { averageStarCmt } = useAppSelector((state) => state.comment);

    const [isOpenReportDialog, setIsOpenReportDialog] = useState(false)
    const [isOpenSubmitReportDialog, setIsOpenSubmitReportDialog] = useState(false);
    const [isOpenCancelReportDialog, setIsOpenCancelReportDialog] = useState(false);
    const [storeIdForDialog, setStoreIdForDialog] = React.useState<
        number | null
    >(null);

    useEffect(() => {
        dispatch(clearComment());
        dispatch(getAverageStar({ storeId: Number(storeId) }));
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

    const handleOpenReportDialog = (storeId: number) => {
        setStoreIdForDialog(storeId)
        setIsOpenReportDialog(true)
    }
    const handleCloseReportDialog = () => {
        setIsOpenReportDialog(false)
        setIsOpenSubmitReportDialog(false)
        setIsOpenCancelReportDialog(false)
    }
    const handleOpenSubmitReportDialog = () => {
        setIsOpenSubmitReportDialog(true)
    }
    const handleCloseSubmitReportDialog = () => {
        setIsOpenSubmitReportDialog(false)
    }

    const handleOpenCancelReportDialog = () => {
        setIsOpenCancelReportDialog(true)
    }
    const handleCloseCancelReportDialog = () => {
        setIsOpenCancelReportDialog(false)
    }

    return (
        <>
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
                                <Button
                                    color="error"
                                    onClick={() => {
                                        if (store?.storeId !== undefined) {
                                            handleOpenReportDialog(store.storeId);
                                        }
                                    }}
                                >
                                    <Report
                                        sx={{
                                            fontSize: '35px',
                                        }}
                                    />
                                </Button>
                                <Box>
                                    {averageStarCmt?.averageRating !==
                                        undefined && (
                                            <Button>
                                                <Rating
                                                    name="read-only"
                                                    defaultValue={
                                                        averageStarCmt.averageRating
                                                    }
                                                    precision={0.5}
                                                    readOnly
                                                />
                                            </Button>
                                        )}
                                    {averageStarCmt?.totalComment !== undefined && (
                                        <Typography
                                            sx={{ marginLeft: 2, fontSize: 20 }}
                                        >
                                            Tổng đánh giá:{' '}
                                            {averageStarCmt?.totalComment &&
                                                averageStarCmt.totalComment}
                                        </Typography>
                                    )}
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
            <ReportStoreDialog
                open={isOpenReportDialog}
                onClose={handleCloseReportDialog}
                openSubmit={isOpenSubmitReportDialog}
                openCancel={isOpenCancelReportDialog}
                onOpenSubmitDialog={handleOpenSubmitReportDialog}
                onCloseSubmitDialog={handleCloseSubmitReportDialog}
                onOpenCancelDialog={handleOpenCancelReportDialog}
                onCloseCancelDialog={handleCloseCancelReportDialog}
                storeId={storeIdForDialog}
            />
        </>
    );
};

export default StoreDetailComponent;

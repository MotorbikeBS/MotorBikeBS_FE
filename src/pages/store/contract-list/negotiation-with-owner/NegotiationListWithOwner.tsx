import { Box, Button, CircularProgress, Container, Paper, Typography } from '@mui/material';
import React from 'react';
import './style/_style.scss';
import {
    useAppDispatch,
    useAppSelector,
} from '../../../../services/store/store';
import useFormatCurrency from '../../../../hooks/useFormatCurrency';

import ReUpdateNegoInfoDialogByStore from '../../negotiation-dialog-store/ReUpdateNegoInfoDialog';
import { clearNegotiation, getNegotiationInfo } from '../../../../services/features/negotiation/negotiationSlice';

const NegotiationListWithOwner = () => {
    const dispatch = useAppDispatch();
    const formattedCurrency = useFormatCurrency();
    const { negotiations, loading } = useAppSelector((state) => state.negotiation);

    const [negotiationInfoIdDialog, setNegotiationInfoIdDialog] = React.useState<
        number | null
    >(null);
    const [isOpenNegoInfoDialog, setIsOpenNegoInfoDialog] =
        React.useState(false);
    const [isOpenSubmitDialog, setIsOpenSubmitDialog] = React.useState(false);
    const [isOpenCancelDialog, setIsOpenCancelDialog] = React.useState(false);

    const loadData = React.useCallback(() => {
        dispatch(clearNegotiation())
        dispatch(getNegotiationInfo())
    }, [dispatch])

    React.useEffect(() => {
        loadData()
    }, [loadData]);

    const handleOpenReUpdateNegotiationDialog = (negotiationId: number) => {
        setNegotiationInfoIdDialog(negotiationId);
        setIsOpenNegoInfoDialog(true);
        loadData();

    };
    const handleCloseReUpdateNegoInfoDialog = () => {
        setIsOpenNegoInfoDialog(false);
        setIsOpenSubmitDialog(false);
        setIsOpenCancelDialog(false);
        loadData();

    };
    const handleOpenSubmitDialog = () => {
        setIsOpenSubmitDialog(true);
    };

    const handleCloseSubmitDialog = () => {
        setIsOpenSubmitDialog(false);
    };
    const handleOpenCancelDialog = () => {
        setIsOpenCancelDialog(true);
    };
    const handleCloseCancelDialog = () => {
        setIsOpenCancelDialog(false);
    };

    return (
        <Container className="container-lg" maxWidth="lg">
            <Typography className="h4-heading" variant="h4" gutterBottom>
                Danh sách biên nhận với chủ xe
            </Typography>
            {loading === true ? (
                <Box textAlign="center">
                    <CircularProgress />
                </Box>
            ) : (
                <>
                {negotiations && negotiations.length === 0 ? (
                    <>
                        <Container className='receipt-container-notFound'>
                            <Paper elevation={3} sx={{ padding: 2 }}>
                                Chưa có biên nhận.
                            </Paper>
                        </Container>
                    </>
                ) : (
                <>
                    {negotiations && negotiations?.map((negoInfo) => (
                        <Paper
                            className="paper-contract-list"
                            key={
                                negoInfo?.valuations[0]?.negotiations[0]?.negotiationId
                            }
                        >
                            <Box className="contract-row" display="flex">
                                <Box className="left-box" flexGrow={3}>
                                    <div className="image-contract-product">
                                        <img
                                            src={
                                                negoInfo?.motor?.motorbikeImages[0]?.imageLink
                                            }
                                            alt="Ảnh mô tả xe"
                                        />
                                    </div>
                                    <div className="product-contract">
                                        <Typography
                                            variant="h5"
                                            fontWeight={700}
                                            align="center"
                                        >
                                            {negoInfo?.motor?.motorName}
                                        </Typography>
                                        <Typography
                                            variant="h6"
                                            fontWeight={700}
                                            align="center"
                                            color="red"
                                        >
                                            Giá chốt: {' '}
                                            {formattedCurrency(
                                                negoInfo?.valuations[0]?.negotiations[0]?.finalPrice
                                            )}
                                        </Typography>
                                    </div>
                                    <div className="product-content">
                                        <Typography>
                                            <strong>Số KM: </strong>
                                            {negoInfo?.motor?.odo} KM
                                        </Typography>
                                        <div className="register-date">
                                            <Typography>
                                                Ngày Đăng Ký:
                                            </Typography>
                                            <Typography>
                                                {new Date(
                                                    negoInfo?.motor?.year,
                                                ).toLocaleDateString('vi-VN')}
                                            </Typography>
                                        </div>
                                        {/* <div className="tag-motorbike-status">
                                            <Typography variant="subtitle1">
                                                {contract?.motor?.motorStatus
                                                    ?.title === 'CONSIGNMENT'
                                                    ? 'ĐÃ ĐĂNG BÁN - KÝ GỬI'
                                                    : contract?.motor
                                                        ?.motorStatus
                                                        ?.title ===
                                                        'LIVELIHOOD'
                                                        ? 'ĐÃ ĐĂNG BÁN - KHÔNG KÝ GỬI'
                                                        : contract?.motor
                                                            ?.motorStatus
                                                            ?.title === 'STORAGE' && contract?.negotiations[0]?.contracts[0]?.storeId
                                                            ? 'ĐÃ CHUYỂN VÀO KHO'
                                                            : 'KHÔNG XÁC ĐỊNH'}
                                            </Typography>
                                        </div> */}
                                    </div>
                                </Box>
                                <Box className="right-box" flexGrow={9}>
                                    <div className="motorbike-owner-info">
                                        <div className="motorbike-owner-info-header">
                                            <Typography
                                                variant="h5"
                                                sx={{ color: '#f0c413' }}
                                            >
                                                Thông tin chủ xe:
                                            </Typography>
                                        </div>
                                        <div className="motorbike-owner-info-content">
                                            <Typography>
                                                <strong>Tên chủ xe:</strong>
                                                {negoInfo?.receiver?.userName}
                                            </Typography>
                                            <Typography>
                                                <strong>Số điện thoại:</strong>
                                                {negoInfo?.receiver?.phone}
                                            </Typography>
                                            <Typography>
                                                <strong>Email:</strong>
                                                {negoInfo?.receiver?.email}
                                            </Typography>
                                            <Typography>
                                                <strong>Địa chỉ:</strong>
                                                {negoInfo?.receiver?.address}
                                            </Typography>
                                        </div>
                                    </div>
                                    <div className="contract-owner-info">
                                        <div className="contract-owner-info-header">
                                            <Typography
                                                variant="h5"
                                                sx={{ color: '#35c206' }}
                                            >
                                                Thông tin biên nhận
                                            </Typography>
                                        </div>
                                        <div className="contract-owner-info-content">
                                            <Typography>
                                                <strong>Ngày tạo:</strong>{' '}
                                                {new Date(
                                                    negoInfo?.valuations[0]?.negotiations[0]?.createdAt
                                                ).toLocaleDateString('vi-VN')}
                                            </Typography>
                                            <Typography>
                                                <strong>Ngày nhận xe:</strong>{' '}
                                                {new Date(
                                                    negoInfo?.valuations[0]?.negotiations[0]?.startTime
                                                ).toLocaleDateString('vi-VN')}
                                            </Typography> <Typography>
                                                <strong>Ngày kết thúc:</strong>{' '}
                                                {new Date(
                                                    negoInfo?.valuations[0]?.negotiations[0]?.endTime
                                                ).toLocaleDateString('vi-VN')}
                                            </Typography>
                                            <Typography>
                                                <strong>Đặt cọc:</strong>{' '}
                                                {
                                                    formattedCurrency(negoInfo?.valuations[0]?.negotiations[0]?.deposit)
                                                }
                                            </Typography>
                                            <Typography>
                                                <strong>Nội dung:</strong>{' '}
                                                {
                                                    negoInfo?.valuations[0]?.negotiations[0]?.content
                                                }
                                            </Typography>
                                            <Typography
                                                sx={{
                                                    fontWeight: '700'
                                                }}
                                            >
                                                Trạng thái xe:{' '}
                                                {
                                                    negoInfo?.motor?.motorStatus.title === 'CONSIGNMENT' ? 'KÝ GỬI'
                                                        : negoInfo?.motor?.motorStatus.title === 'LIVELIHOOD' ? 'KHÔNG KÝ GỬI'
                                                            : 'TRONG KHO'
                                                }
                                            </Typography>
                                            <div style={{ display: 'flex' }}>
                                                <Typography fontWeight={700}>
                                                    Trạng thái:
                                                </Typography>
                                                <Typography
                                                    sx={{
                                                        fontWeight: 'bold',
                                                        textShadow:
                                                            '2px 2px 4px rgba(255, 0, 0, 0.5)',
                                                        color: 'red',
                                                    }}
                                                >
                                                    {negoInfo?.valuations[0]
                                                        ?.negotiations[0]?.status === 'PENDING'
                                                        ? 'CHỜ ĐỢI'
                                                        : negoInfo?.valuations[0]
                                                            ?.negotiations[0]?.status === 'ACCEPT'
                                                            ? 'CHẤP NHẬN'
                                                            : negoInfo?.valuations[0]
                                                                ?.negotiations[0]?.status === 'CANCEL'
                                                                ? 'SAI'
                                                                : negoInfo?.valuations[0]
                                                                    ?.negotiations[0]?.status === 'REJECT'
                                                                    ? 'TỪ CHỐI'
                                                                    : 'CHƯA XÁC ĐỊNH'
                                                    }
                                                </Typography>
                                            </div>
                                        </div>
                                        {negoInfo?.valuations[0]
                                            ?.negotiations[0]?.status === 'CANCEL' ? (
                                            <div className="contract-owner-btn-contract">
                                                <Button
                                                    variant="contained"
                                                    size="small"
                                                    color="warning"
                                                    onClick={() =>
                                                        handleOpenReUpdateNegotiationDialog(
                                                            negoInfo?.valuations[0]?.negotiations[0]?.negotiationId
                                                        )
                                                    }
                                                >
                                                    Tải lại thông tin
                                                </Button>
                                            </div>
                                        ) : (
                                            <></>
                                        )}
                                    </div>
                                </Box>
                            </Box>
                        </Paper>
                    ))}
                </>
            )}
       </>
            )}
            <ReUpdateNegoInfoDialogByStore
                open={isOpenNegoInfoDialog}
                openSubmit={isOpenSubmitDialog}
                openCancle={isOpenCancelDialog}
                onOpenSubmitDialog={handleOpenSubmitDialog}
                onCloseSubmitDialog={handleCloseSubmitDialog}
                onOpenCancelDialog={handleOpenCancelDialog}
                onCloseCancelDialog={handleCloseCancelDialog}
                onClose={handleCloseReUpdateNegoInfoDialog}
                negotiationId={negotiationInfoIdDialog}
                loadData={loadData}
            />
        </Container>
    );
};

export default NegotiationListWithOwner

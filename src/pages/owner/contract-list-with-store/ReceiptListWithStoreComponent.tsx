import {
    Box,
    Button,
    CircularProgress,
    Container,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Paper,
    Typography,
} from '@mui/material';
import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../services/store/store';
import useFormatCurrency from '../../../hooks/useFormatCurrency';
import './style/_style.scss';
import {
    EmailOutlined,
    PhoneIphoneOutlined,
    PlaceOutlined,
    StoreOutlined,
} from '@mui/icons-material';
import { acceptNegotiationInfo, clearNegotiation, getNegotiationInfo } from '../../../services/features/negotiation/negotiationSlice';

const ReceiptListWithStoreComponent = () => {
    const dispatch = useAppDispatch();

    const { negotiations, loading } = useAppSelector((state) => state.negotiation);
    const formattedCurrency = useFormatCurrency();


    const [isOpenErrorReceiptDialog, setIsOpenErrorReceiptDialog] =
        React.useState(false);
    const [isOpenAcceptReceiptDialog, setIsOpenAcceptReceiptDialog] =
        React.useState(false);
    const [negotiationIdDialog, setNegotiationIdDialog] = React.useState<
        number | null
    >(null);

    const loadData = React.useCallback(() => {
        dispatch(clearNegotiation());
        dispatch(getNegotiationInfo());
    }, [dispatch])

    React.useEffect(() => {
        loadData();
    }, [loadData]);

    const handleAcceptNegoInfor = (negotiationId: number) => {
        setNegotiationIdDialog(negotiationId);
        setIsOpenAcceptReceiptDialog(true);
    };
    const handleCloseAccectContractDialog = () => {
        setIsOpenAcceptReceiptDialog(false);
    };
    const handleConfirmAcceptNegoInfo = (negotiationId: number | null) => {
        if (negotiationId !== null) {
            dispatch(acceptNegotiationInfo({ negotiationId })).then(() => {
                loadData();
                setTimeout(() => {
                    setIsOpenAcceptReceiptDialog(false);
                }, 1000);
            });
        }
    };

    const handleErrorNegoInfor = (contractId: number) => {
        setNegotiationIdDialog(contractId);
        setIsOpenErrorReceiptDialog(true);
        console.log(contractId)
    };
    const handleCloseNegoInfoErrorDialog = () => {
        setIsOpenErrorReceiptDialog(false);
    };
    // const handleConfirmErrorContract = (contractId: number | null) => {
    //     if (contractId !== null) {
    //         dispatch(cancelContractByOwner({ contractId })).then(() => {
    //             loadData();
    //             setTimeout(() => {
    //                 setIsOpenErrorContractDialog(false);
    //             }, 1000);
    //         });
    //     }
    // };



    return (
        <Container className="container-xl" maxWidth="lg">
            <Typography
                className="h4-heading"
                variant="h4"
                gutterBottom
                style={{ marginBottom: '20px' }}
            >
                Lịch sử giao dịch với cửa hàng:
            </Typography>
            {loading === true ? (
                <Box textAlign="center">
                    <CircularProgress />
                </Box>
            ) : (
                <>
                    {negotiations?.map((negoInfo) => (
                        <Paper
                            key={
                                negoInfo?.valuations[0]
                                    ?.negotiations[0]?.negotiationId

                            }
                            className="paper-booking-list"
                        >
                            <Box className="booking-row" display="flex">
                                <Box className="left-box" flexGrow={3}>
                                    <div className="image-booking-product">
                                        <img
                                            src={
                                                negoInfo?.motor?.motorbikeImages[0]
                                                    ?.imageLink || ''
                                            }
                                            alt="Mô tả Xe máy cũ"
                                        />
                                    </div>
                                    <div className="product-booking">
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
                                                {contractOwner?.motor
                                                    ?.motorStatus?.title ===
                                                    'CONSIGNMENT' &&
                                                    contractOwner.negotiations[0]
                                                        ?.contracts[0]
                                                        ?.status === 'ACCEPT'
                                                    ? 'ĐÃ THỎA THUẬN'
                                                    : contractOwner?.motor
                                                        ?.motorStatus
                                                        ?.title ===
                                                        'LIVELIHOOD' &&
                                                        contractOwner
                                                            .negotiations[0]
                                                            ?.contracts[0]
                                                            ?.status === 'ACCEPT'
                                                        ? 'ĐÃ THỎA THUẬN'
                                                        : contractOwner?.motor
                                                            ?.motorStatus
                                                            ?.title ===
                                                            'STORAGE' &&
                                                            contractOwner
                                                                .negotiations[0]
                                                                ?.contracts[0]
                                                                ?.status === 'ACCEPT'
                                                            ? 'ĐÃ THỎA THUẬN'
                                                            : 'CHƯA XÁC ĐỊNH'}
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
                                                Thông tin cửa hàng:
                                            </Typography>
                                        </div>
                                        <div className="motorbike-owner-info-content">
                                            <Typography display="flex">
                                                <StoreOutlined />{' '}
                                                {
                                                    negoInfo?.sender
                                                        ?.storeDesciptions[0]
                                                        ?.storeName
                                                }
                                            </Typography>
                                            <Typography display="flex">
                                                <PhoneIphoneOutlined />{' '}
                                                {
                                                    negoInfo?.sender
                                                        ?.storeDesciptions[0]
                                                        .storePhone
                                                }
                                            </Typography>
                                            <Typography display="flex">
                                                <EmailOutlined />{' '}
                                                {
                                                    negoInfo?.sender
                                                        ?.storeDesciptions[0]
                                                        ?.storeEmail
                                                }
                                            </Typography>
                                            <Typography display="flex">
                                                <PlaceOutlined />{' '}
                                                {
                                                    negoInfo?.sender
                                                        ?.storeDesciptions[0]
                                                        .address
                                                }
                                            </Typography>
                                        </div>
                                    </div>
                                    <div className="booking-owner-info">
                                        <div className="booking-owner-info-header">
                                            <Typography
                                                variant="h5"
                                                sx={{ color: '#35c206' }}
                                            >
                                                Thông tin hợp đồng
                                            </Typography>
                                        </div>
                                        <div className="booking-owner-info-content">
                                            <Typography>
                                                <strong>Ngày tạo:</strong>{' '}
                                                {new Date(
                                                    negoInfo?.valuations[0]?.negotiations[0]?.createdAt
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
                                        <div
                                            style={{
                                                flexDirection: 'column',
                                                marginTop: '20px',
                                            }}
                                        >
                                            {negoInfo?.valuations[0]
                                                ?.negotiations[0]?.status === 'PENDING' ? (
                                                <>
                                                    <div
                                                        className="booking-owner-btn-contract"
                                                        style={{
                                                            marginBottom:
                                                                '20px',
                                                        }}
                                                    >
                                                        <Button
                                                            variant="contained"
                                                            size="small"
                                                            color="success"
                                                            onClick={() =>
                                                                handleAcceptNegoInfor(
                                                                    negoInfo?.valuations[0]
                                                                        ?.negotiations[0]?.negotiationId
                                                                )
                                                            }
                                                        >
                                                            Xác nhận thông tin
                                                        </Button>
                                                    </div>

                                                    <div className="booking-store-btn-reContract">
                                                        <Button
                                                            variant="contained"
                                                            size="small"
                                                            color="error"
                                                            onClick={() =>
                                                                handleErrorNegoInfor(
                                                                    negoInfo?.valuations[0]
                                                                        ?.negotiations[0]?.negotiationId

                                                                )
                                                            }
                                                        >
                                                            Sai thông tin
                                                        </Button>
                                                    </div>
                                                </>
                                            ) : (
                                                <></>
                                            )}
                                        </div>
                                    </div>
                                </Box>
                            </Box>
                        </Paper>
                    ))}
                </>
            )}
            <Dialog
                open={isOpenErrorReceiptDialog}
                onClose={handleCloseNegoInfoErrorDialog}>
                <DialogTitle>
                    Hợp đồng bị lỗi? Yêu cầu cập nhật lại.
                </DialogTitle>
                <DialogContent>
                    <Typography>
                        Bạn có chắc muốn yêu cầu chủ cửa hàng cập nhật lại hợp
                        đồng?
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={handleCloseNegoInfoErrorDialog}
                        color="error"
                    >
                        Hủy
                    </Button>
                    <Button
                        // onClick={() =>
                        //     handleConfirmError(contractIdDialog)
                        // }
                        color="success"
                    >
                        Xác nhận
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog
                open={isOpenAcceptReceiptDialog}
                onClose={handleCloseAccectContractDialog}
            >
                <DialogTitle fontWeight="700">
                    Bạn đã đọc kỹ thông tin biên nhận hay chưa? Xác nhận thông tin biên nhận đã chính xác
                </DialogTitle>
                <DialogContent>
                    <Typography variant="h6">
                        Bạn có chắc muốn xác nhận thông tin?
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={handleCloseAccectContractDialog}
                        color="error"
                    >
                        Hủy
                    </Button>
                    <Button
                        onClick={() =>
                            handleConfirmAcceptNegoInfo(negotiationIdDialog)
                        }
                        color="success"
                    >
                        Xác nhận
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default ReceiptListWithStoreComponent;

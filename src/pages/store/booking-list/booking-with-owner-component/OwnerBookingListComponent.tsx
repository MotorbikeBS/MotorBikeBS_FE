import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../services/store/store';
import { Box, Button, Container, Dialog, DialogActions, DialogContent, DialogTitle, Paper, Typography } from '@mui/material';
import { cancleBookingByStore, clearStoreBooking, getAllBookingOwnerExchange } from '../../../../services/features/booking/storeBookingSlice';
import './style/_style.scss';
import useFormatCurrency from '../../../../hooks/useFormatCurrency';
import CreateContractDialogByStore from '../../contract-dialog-store/CreateContractDialogByStore';

const OwnerBookingListComponent = () => {
    const dispatch = useAppDispatch();
    const formattedCurrency = useFormatCurrency();
    const { getAllBooking } = useAppSelector((state) => state.storeBooking);

    const [bookingIdDialog, setBookingIdDialog] = useState<number | null>(null)
    const [isOpenContractDialog, setIsOpenContractDialog] = useState(false)
    const [isOpenSubmitDialog, setIsOpenSubmitDialog] = useState(false)
    const [isOpenCancelDialog, setIsOpenCancelDialog] = React.useState(false);

    const [isOpenCancelBookingDialog, setIsOpenCancelBookingDialog] = React.useState(false);

    useEffect(() => {
        loadData();
    }, [dispatch]);

    const loadData = () => {
        dispatch(clearStoreBooking());
        dispatch(getAllBookingOwnerExchange());
    }

    const handleOpenCreateContractDialog = (bookingId: number) => {
        setBookingIdDialog(bookingId)
        setIsOpenContractDialog(true)
        console.log(bookingId)
    }
    const handleCloseCreateContractDialog = () => {
        setIsOpenContractDialog(false)
        setIsOpenSubmitDialog(false);
        setIsOpenCancelDialog(false);
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

    const handleOpenCancleBooking = (bookingId: number) => {
        setBookingIdDialog(bookingId)
        setIsOpenCancelBookingDialog(true)
    }
    const handleCloseCancelBookingDialog = () => {
        setIsOpenCancelBookingDialog(false)
    }
    const handleConfirmCancelBooking = (bookingId: number | null) => {
        if (bookingId !== null) {
            dispatch(cancleBookingByStore({ bookingId }))
                .then(() => {
                    loadData()
                    setTimeout(() => {
                        setIsOpenCancelBookingDialog(false)
                    }, 1000)
                })
        }
    }


    return (
        <Container className="container-xl" maxWidth="lg">
            <Typography className="h4-heading" variant="h4" gutterBottom>
                Danh sách lịch hẹn của tôi
            </Typography>
            {getAllBooking?.map((booking) => (
                <Paper key={booking.negotiations[0].bookings[0].bookingId} className="paper-booking-list">
                    <Box className="booking-row" display="flex">
                        <Box className="left-box" flexGrow={3}>
                            <div className="image-booking-product">
                                <img
                                    src={booking?.motor?.motorbikeImages[0]?.imageLink || ''}
                                    alt="Motor Image"
                                />
                            </div>
                            <div className="product-booking">
                                <Typography variant='h5' fontWeight={700} align='center'>
                                    {booking?.motor?.motorName}
                                </Typography>
                                <Typography variant='h6' fontWeight={700} align='center' color='red'>
                                    {formattedCurrency(booking?.negotiations[0]?.finalPrice)}
                                </Typography>
                            </div>
                            <div className="product-content">
                                <Typography>
                                    <strong>Số KM: </strong>
                                    {booking?.motor?.odo} KM
                                </Typography>
                                <div className='register-date'>
                                    <Typography>Ngày Đăng Ký:</Typography>
                                    <Typography>
                                        {new Date(booking?.motor?.year).toLocaleDateString('vi-VN')}
                                    </Typography>
                                </div>
                                <div className='tag-motorbike-status'>
                                    <Typography variant='subtitle1'>
                                        {booking?.motor?.motorStatus?.title === 'CONSIGNMENT' ? 'KÝ GỬI' :
                                            booking?.motor?.motorStatus?.title === 'LIVELIHOOD' ? 'KHÔNG KÝ GỬI' : 'KHÔNG XÁC ĐỊNH'}
                                    </Typography>
                                </div>
                            </div>
                        </Box>
                        <Box className="right-box" flexGrow={9}>
                            <div className="motorbike-owner-info">
                                <div className="motorbike-owner-info-header">
                                    <Typography variant='h5' sx={{ color: '#f0c413' }}>Thông tin chủ xe:</Typography>
                                </div>
                                <div className="motorbike-owner-info-content">
                                    <Typography>Tên chủ xe: {booking?.receiver?.userName}</Typography>
                                    <Typography>Số điện thoại: {booking?.receiver?.phone}</Typography>
                                    <Typography>Email: {booking?.receiver?.email}</Typography>
                                    <Typography>Địa chỉ: {booking?.receiver?.address}</Typography>
                                </div>
                            </div>
                            <div className="booking-owner-info">
                                <div className="booking-owner-info-header">
                                    <Typography variant='h5' sx={{ color: '#35c206' }}>Thông tin đặt lịch:</Typography>
                                </div>
                                <div className="booking-owner-info-content">
                                    <Typography>
                                        Ngày đặt lịch:
                                        {new Date(booking?.negotiations[0]?.bookings[0]?.bookingDate).toLocaleDateString('vi-VN')}
                                    </Typography>
                                    <Typography>Chú ý: {booking?.negotiations[0]?.bookings[0]?.note}</Typography>
                                    <div style={{ display: 'flex' }}>
                                        <Typography fontWeight={700}>Trạng thái:</Typography>
                                        <Typography
                                            sx={{
                                                fontWeight: 'bold',
                                                textShadow: '2px 2px 4px rgba(255, 0, 0, 0.5)',
                                                color: 'red',
                                            }}
                                        >
                                            {booking?.negotiations[0]?.bookings[0]?.status === 'PENDING' ? 'CHỜ ĐỢI' :
                                                booking?.negotiations[0]?.bookings[0]?.status === 'ACCEPT' ? 'ĐÃ DUYỆT/SẼ TỚI' :
                                                    'QUÁ HẠN/CHƯA XÁC ĐỊNH'
                                            }
                                        </Typography>
                                    </div>
                                </div>
                                <div className='booking-owner-btn-contract'>
                                    <Button
                                        variant='contained'
                                        size='small'
                                        color='success'
                                        sx={{ marginRight: '10px' }}
                                        onClick={() => handleOpenCreateContractDialog(
                                            booking?.negotiations[0]?.bookings[0]?.bookingId
                                        )}
                                    >
                                        Tải hợp đồng
                                    </Button>
                                    <Button
                                        variant='contained'
                                        size='small'
                                        color='error'
                                        onClick={
                                            () => handleOpenCancleBooking(
                                                booking?.negotiations[0]?.bookings[0]?.bookingId
                                            )
                                        }
                                    >
                                        Hủy Đặt Lịch
                                    </Button>
                                </div>
                            </div>

                        </Box>
                    </Box>
                </Paper>
            ))}
            <CreateContractDialogByStore
                open={isOpenContractDialog}
                openSubmit={isOpenSubmitDialog}
                openCancle={isOpenCancelDialog}
                onOpenSubmitDialog={handleOpenSubmitDialog}
                onCloseSubmitDialog={handleCloseSubmitDialog}
                onOpenCancelDialog={handleOpenCancelDialog}
                onCloseCancelDialog={handleCloseCancelDialog}
                onClose={handleCloseCreateContractDialog}
                bookingId={bookingIdDialog}
            />
            <Dialog
                open={isOpenCancelBookingDialog}
                onClose={handleCloseCancelBookingDialog}
            >
                <DialogTitle fontWeight='700'>
                    Xác nhận hủy lịch hẹn
                </DialogTitle>
                <DialogContent>
                    <Typography
                        variant='h5'

                    >
                        Bạn có chắc chắn muốn hủy lịch hay không?
                    </Typography>
                    <Typography
                        variant='h6'
                        color='red'
                    >
                        Hãy thông báo cho chủ xe
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={handleCloseCancelBookingDialog}
                        color='error'
                    >
                        Hủy
                    </Button>
                    <Button
                        onClick={() =>
                            handleConfirmCancelBooking(bookingIdDialog)}
                        color='success'
                    >
                        Xác nhận
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default OwnerBookingListComponent;

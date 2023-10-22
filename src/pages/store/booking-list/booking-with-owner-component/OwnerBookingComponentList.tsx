import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../services/store/store';
import { Box, Button, Container, Paper, Typography } from '@mui/material';
import { clearStoreBooking, getAllBookingOwnerExchange } from '../../../../services/features/booking/storeBookingSlice';
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

    useEffect(() => {
        dispatch(clearStoreBooking());
        dispatch(getAllBookingOwnerExchange());
    }, [dispatch]);

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
                                        onClick={() => handleOpenCreateContractDialog(
                                            booking?.negotiations[0]?.bookings[0]?.bookingId
                                        )}
                                    >
                                        Tải hợp đồng
                                    </Button>
                                </div>
                            </div>
                            {/* <div className='image-contract'>
                                <div className="image-owner-info-header">
                                    <Typography variant='h5' sx={{ color: '#f0c413' }}>
                                        Hợp đồng</Typography>
                                </div>
                                <img src='https://i0.wp.com/www.dichthuatsms.com/wp-content/uploads/2021/11/Hop-dong-thi-cong-xay-dung-song-ngu-Anh-Viet-1.jpg?fit=1654%2C2339&ssl=1' alt='Hợp đồng' />
                            </div> */}
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
        </Container>
    );
};

export default OwnerBookingListComponent;

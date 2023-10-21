import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../services/store/store';
import { Box, Container, Paper, Typography } from '@mui/material';
import { clearStoreBooking, getAllBookingOwnerExchange } from '../../../../services/features/booking/storeBookingSlice';
import './style/_style.scss';
import useFormatCurrency from '../../../../hooks/useFormatCurrency';

const OwnerBookingComponent = () => {
    const dispatch = useAppDispatch();
    const formettedCurrency = useFormatCurrency()
    const { getAllBooking } = useAppSelector((state) => state.storeBooking);

    useEffect(() => {
        dispatch(clearStoreBooking());
        dispatch(getAllBookingOwnerExchange());
    }, [dispatch]);



    return (
        <Container className="container-xl" maxWidth="lg">
            <Typography className="h4-heading" variant="h4" gutterBottom>
                Danh sách lịch hẹn của tôi
            </Typography>
            {getAllBooking?.map((booking) => (

                <Paper className="paper-booking-list">
                    <Box
                        className="booking-row"
                        display="flex"
                    >
                        <Box className="left-box" flexGrow={5}>
                            <div className="image-booking-product">
                                <img src={booking?.motor?.motorbikeImages[0]?.imageLink ?
                                    booking?.motor?.motorbikeImages[0]?.imageLink
                                    : ''} alt="Motor Image" />
                            </div>
                            <div className="product-booking">
                                <Typography
                                    variant='h5'
                                    fontWeight='700'
                                    alignContent='center'
                                    textAlign='center'
                                >
                                    {booking?.motor?.motorName}
                                </Typography>
                                <Typography
                                    variant='h6'
                                    fontWeight='700'
                                    alignContent='center'
                                    textAlign='center'
                                    color='red'
                                >

                                    {formettedCurrency(booking?.negotiations[0]?.finalPrice)}
                                </Typography>
                            </div>
                            <div className="product-content">
                                <Typography>
                                    <strong>Số KM: </strong>
                                    {booking?.motor?.odo} KM</Typography>
                                <div className='register-date'>
                                    <Typography>
                                        Ngày Đăng Ký:
                                    </Typography>
                                    <Typography>

                                        {new Date(booking?.motor?.year).toLocaleDateString('vi-VN')}
                                    </Typography>
                                </div>
                                <div className='tag-motorbike-status'>
                                    <Typography
                                        variant='subtitle1'
                                    >
                                        {booking?.motor?.motorStatus?.title === 'CONSIGNMENT' ? 'KÝ GỬI' :
                                            booking?.motor?.motorStatus?.title === 'LIVELIHOOD' ? 'KHÔNG KÝ GỬI'
                                                : 'KHÔNG XÁC ĐỊNH'}
                                    </Typography>
                                </div>
                            </div>
                        </Box>
                        <Box className="right-box" flexGrow={5} display='flex'>
                            <div className="motorbike-owner-info">
                                <div className="motorbike-owner-info-header">
                                    <Typography
                                        variant='h5'
                                        color='#f0c413'
                                    >Thông tin chủ xe:</Typography>
                                </div>
                                <div className="motorbike-owner-info-content">
                                    <Typography>Tên chủ xe: {booking?.receiver?.userName}</Typography>
                                    <Typography>Số điện thoại : {booking?.receiver?.phone}</Typography>
                                    <Typography>Email: {booking?.receiver?.email}</Typography>
                                    <Typography>Địa chỉ: {booking?.receiver?.address}</Typography>
                                </div>
                            </div>
                            <div className="booking-owner-info">
                                <div className="booking-owner-info-header">
                                    <Typography
                                        variant='h5'
                                        color='#35c206'
                                    >Thông tin đặt lịch:</Typography>
                                </div>
                                <div className="booking-owner-info-content">
                                    <Typography>
                                        Ngày đặt lịch:
                                        {new Date(booking?.negotiations[0]?.bookings[0]?.bookingDate).toLocaleDateString('vi-VN')}
                                    </Typography>
                                    <Typography>Chú ý: {booking?.negotiations[0]?.bookings[0]?.note}</Typography>
                                    <div style={{
                                        display: 'flex'
                                    }}>
                                        <Typography
                                            fontWeight='700'
                                        >
                                            Trạng thái:
                                        </Typography>
                                        <Typography
                                            sx={{
                                                fontWeight: 'bold',
                                                textShadow: '2px 2px 4px rgba(255, 0, 0, 0.5)',
                                                color: 'red',
                                            }}
                                        >
                                            {booking?.negotiations[0]?.bookings[0]?.status}
                                        </Typography>
                                    </div>
                                </div>
                            </div>
                        </Box>
                    </Box>
                </Paper>

            ))}
        </Container>
    );
};

export default OwnerBookingComponent;

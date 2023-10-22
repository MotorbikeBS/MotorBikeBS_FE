import React, { useEffect } from 'react'

import {
    Box,
    Button,
    Container,
    Paper,
    Typography
} from '@mui/material'
import {

    StoreOutlined,
    PhoneIphoneOutlined,
    EmailOutlined,
    PlaceOutlined
} from '@mui/icons-material';
import './style/_style.scss'
import { useAppDispatch, useAppSelector } from '../../../../services/store/store'
import useFormatCurrency from '../../../../hooks/useFormatCurrency'
import { clearStoreBooking, getAllBookingOwnerExchange } from '../../../../services/features/booking/storeBookingSlice'
const StoreBookingWithOwnerComponent = () => {
    const dispatch = useAppDispatch()
    const formattedCurrency = useFormatCurrency()
    const { getAllBooking } = useAppSelector((state) => state.storeBooking)

    useEffect(() => {
        dispatch(clearStoreBooking());
        dispatch(getAllBookingOwnerExchange());
    }, [dispatch]);

    return (
        <Container className='container-xl' maxWidth='xl'>
            <Typography
                className='h4-heading'
                variant="h4"
                gutterBottom
                marginBottom='20px'
            >
                Danh Sách lịch hẹn với cửa hàng:
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
                                    <Typography variant='h5' sx={{ color: '#f0c413' }}>Thông tin cửa hàng:</Typography>
                                </div>
                                <div className="motorbike-owner-info-content">
                                    <Typography display='flex'>
                                        <StoreOutlined />{' '}
                                        {booking?.sender?.storeDesciptions[0]?.storeName}
                                    </Typography>
                                    <Typography display='flex'>
                                        <PhoneIphoneOutlined />{' '}
                                        {booking?.sender?.storeDesciptions[0].storePhone}</Typography>
                                    <Typography display='flex'>
                                        <EmailOutlined />{' '}
                                        {booking?.sender?.storeDesciptions[0]?.storeEmail}</Typography>
                                    <Typography display='flex'>
                                        <PlaceOutlined />{' '}
                                        {booking?.sender?.storeDesciptions[0].address}</Typography>
                                </div>
                            </div>
                            <div className="booking-owner-info">
                                <div className="booking-owner-info-header">
                                    <Typography variant='h5' sx={{ color: '#35c206' }}>Thông tin đặt lịch:</Typography>
                                </div>
                                <div className="booking-owner-info-content">
                                    <Typography>
                                        <strong>Ngày đặt lịch:</strong>
                                        {new Date(booking?.negotiations[0]?.bookings[0]?.bookingDate).toLocaleDateString('vi-VN')}
                                    </Typography>
                                    <Typography>
                                        <strong>Chú ý:</strong>
                                        {booking?.negotiations[0]?.bookings[0]?.note}
                                    </Typography>
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
                                <div style={{
                                    flexDirection: 'column',
                                    marginTop: '20px',

                                }}>
                                    <div className='booking-owner-btn-contract'
                                        style={{
                                            marginBottom: '20px'
                                        }}
                                    >
                                        <Button
                                            variant='contained'
                                            size='small'
                                            color='success'
                                        >
                                            Đạt thỏa thuận
                                        </Button>

                                    </div>
                                    <div className='booking-store-btn-reContract'>
                                        <Button
                                            variant='contained'
                                            size='small'
                                            color='error'
                                        >
                                            Sai hợp đồng
                                        </Button>
                                    </div>
                                </div>
                            </div>
                            <div className='image-contract'>
                                <div className="image-owner-info-header">
                                    <Typography variant='h5' sx={{ color: '#f0c413' }}>
                                        Hợp đồng</Typography>
                                </div>
                                <img src='https://i0.wp.com/www.dichthuatsms.com/wp-content/uploads/2021/11/Hop-dong-thi-cong-xay-dung-song-ngu-Anh-Viet-1.jpg?fit=1654%2C2339&ssl=1' alt='Hợp đồng' />
                            </div>
                        </Box>
                    </Box>
                </Paper>
            ))}
        </Container>

    )
}

export default StoreBookingWithOwnerComponent
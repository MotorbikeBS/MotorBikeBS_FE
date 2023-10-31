import React from 'react'
import { useAppDispatch, useAppSelector } from '../../../../services/store/store'
import useFormatCurrency from '../../../../hooks/useFormatCurrency'
import { acceptCustomerBookingByStore, clearCustomerBooking, getAllBookingByCustomer, rejectCustomerBookingByStore } from '../../../../services/features/booking/customerBookingSlice'
import { Box, Button, Container, Dialog, DialogActions, DialogContent, DialogTitle, Paper, Typography } from '@mui/material'
import { EmailOutlined, PhoneIphoneOutlined, PlaceOutlined, StoreOutlined } from '@mui/icons-material'
import './style/_customer-booking.scss'

const CustomerBookingComponent = () => {
    const dispatch = useAppDispatch()
    const formattedCurrency = useFormatCurrency()
    const { getAllCustomerBooking } = useAppSelector((state) => state.customerBooking)

    const [bookingIdDialog, setBookingIdDialog] = React.useState<number | null>(null)
    const [isOpenRejectBookingDialog, setIsOpenRejectBookingDialog] = React.useState(false);
    const [isOpenAcceptBookingDialog, setIsOpenAcceptBookingDialog] = React.useState(false);

    const loadData = () => {
        dispatch(clearCustomerBooking())
        dispatch(getAllBookingByCustomer());
    }
    React.useEffect(() => {
        loadData()
    }, [dispatch])

    const handleOpenRejectBooking = (bookingId: number) => {
        setBookingIdDialog(bookingId)
        setIsOpenRejectBookingDialog(true)
    }
    const handleOpenAcceptBooking = (bookingId: number) => {
        setBookingIdDialog(bookingId)
        setIsOpenAcceptBookingDialog(true)
    }

    const handleCloseRejectBookingDialog = () => {
        setIsOpenRejectBookingDialog(false)
    }
    const handleCloseAcceptBookingDialog = () => {
        setIsOpenAcceptBookingDialog(false)
    }

    const handleConfirmRejectBooking = (bookingId: number | null) => {
        if (bookingId !== null) {
            dispatch(rejectCustomerBookingByStore({ bookingId }))
                .then(() => {
                    loadData()
                    setTimeout(() => {
                        setIsOpenRejectBookingDialog(false)
                    }, 1000)
                })
        }
    }

    const handleConfirmAcceptBooking = (bookingId: number | null) => {
        if (bookingId !== null) {
            dispatch(acceptCustomerBookingByStore({ bookingId }))
                .then(() => {
                    loadData()
                    setTimeout(() => {
                        setIsOpenAcceptBookingDialog(false)
                    }, 1000)
                })
        }
    }

    return (
        <Container className='container-xl' maxWidth='lg'>
            <Typography
                className='h4-heading'
                variant="h4"
                gutterBottom
                marginBottom='20px'
            >
                Danh sách lịch hẹn với khách mua
            </Typography>
            {getAllCustomerBooking?.map((booking) => (
                <Paper
                    key={booking?.buyerBookings[0]?.bookingId}
                    className="paper-booking-list"
                >
                    <Box className="booking-row" display="flex">
                        <Box className="left-box" flexGrow={3}>
                            <div className="image-booking-product">
                                <img
                                    src={booking?.motor?.motorbikeImages[0]?.imageLink}
                                    alt='Motorbike image'
                                />
                            </div>
                            <div className="product-booking">
                                <Typography variant='h5' fontWeight={700} align='center'>
                                    {booking?.motor?.motorName}
                                </Typography>
                                <Typography variant='h6' fontWeight={700} align='center' color='red'>
                                    {formattedCurrency(booking?.motor?.price)}
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
                            <div className="customer-info">
                                <div className="motorbike-customer-info-header">
                                    <Typography variant='h5' sx={{ color: '#f0c413', fontWeight: 'bold', marginBottom: '10px' }}>Thông tin khách hàng:</Typography>
                                </div>
                                <div className="motorbike-customer-info-content">
                                    <Typography display='flex'>
                                        <StoreOutlined />{' '}
                                        {booking?.sender?.userName}
                                    </Typography>
                                    <Typography display='flex'>
                                        <PhoneIphoneOutlined />{' '}
                                        {booking?.sender?.phone}
                                    </Typography>
                                    <Typography display='flex'>
                                        <EmailOutlined />{' '}
                                        {booking?.sender?.email}
                                    </Typography>
                                    <Typography display='flex'>
                                        <PlaceOutlined />{' '}
                                        {booking?.sender?.address}
                                    </Typography>
                                </div>
                            </div>
                            <div className="booking-customer-info">
                                <div className="booking-customer-info-header">
                                    <Typography variant='h5' sx={{ color: '#35c206', fontWeight: 'bold', marginBottom: '10px' }}>Thông tin đặt lịch:</Typography>
                                </div>
                                <div className="booking-customer-info-content">
                                    <Typography>
                                        <strong>Ngày đặt lịch:</strong>
                                        {new Date(booking?.buyerBookings[0]?.bookingDate).toLocaleDateString('vi-VN')}
                                    </Typography>
                                    <Typography>
                                        <strong>Chú ý:</strong>
                                        {booking?.buyerBookings[0]?.note}
                                    </Typography>
                                    <div style={{ display: 'flex' }}>
                                        <Typography fontWeight={700}>Trạng thái:</Typography>
                                        <Typography
                                            sx={{
                                                fontWeight: 'bold',
                                                textShadow: booking?.buyerBookings[0]?.status === 'PENDING' ? '2px 2px 4px rgba(250, 237, 117, 0.5)' :
                                                    booking?.buyerBookings[0]?.status === 'ACCEPT' ? '2px 2px 4px rgba(208, 250, 72, 0.5)' :
                                                        booking?.buyerBookings[0]?.status === 'REJECT' ? '2px 2px 4px rgba(247, 79, 102, 0.5)'
                                                            : '2px 2px 4px rgba(115, 114, 108, 0.5)',

                                                color: booking?.buyerBookings[0]?.status === 'PENDING' ? '#eba21c' :
                                                    booking?.buyerBookings[0]?.status === 'ACCEPT' ? 'green' :
                                                        booking?.buyerBookings[0]?.status === 'REJECT' ? 'red' :
                                                            'black'
                                            }}
                                        >
                                            {booking?.buyerBookings[0]?.status === 'PENDING' ? 'CHỜ ĐỢI' :
                                                booking?.buyerBookings[0]?.status === 'ACCEPT' ? 'ĐÃ DUYỆT' :
                                                    booking?.buyerBookings[0]?.status === 'REJECT' ? 'TỪ CHỐI' :
                                                        'QUÁ HẠN'
                                            }
                                        </Typography>
                                    </div>
                                </div>
                                <div style={{
                                    flexDirection: 'row',
                                    display: 'flex',
                                    marginTop: '40px',
                                }}>
                                    <div
                                        style={{
                                            marginRight: '10px'
                                        }}>
                                        {booking?.buyerBookings[0]?.status === 'PENDING' && (
                                            <Button
                                                color='error'
                                                variant='contained'
                                                onClick={() => handleOpenRejectBooking(booking?.buyerBookings[0]?.bookingId)}
                                            >
                                                Từ Chối
                                            </Button>
                                        )}
                                    </div>
                                    <div>
                                        {booking?.buyerBookings[0]?.status === 'PENDING' && (
                                            <Button
                                                color='success'
                                                variant='contained'
                                                onClick={() => handleOpenAcceptBooking(booking?.buyerBookings[0]?.bookingId)}
                                            >
                                                Đồng Ý
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </Box>
                    </Box>
                </Paper>
            ))}
            <Dialog
                open={isOpenRejectBookingDialog}
                onClose={handleCloseRejectBookingDialog}
            >
                <DialogTitle fontWeight='700'>
                    Xác nhận từ chối lịch hẹn
                </DialogTitle>
                <DialogContent>
                    <Typography
                        variant='h5'
                    >
                        Bạn có chắc chắn muốn từ chối lịch hẹn với khách hàng này hay không?
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={handleCloseRejectBookingDialog}
                        color='error'
                    >
                        Hủy
                    </Button>
                    <Button
                        onClick={() =>
                            handleConfirmRejectBooking(bookingIdDialog)}
                        color='success'
                    >
                        Xác nhận
                    </Button>
                </DialogActions>
            </Dialog>
            <Dialog
                open={isOpenAcceptBookingDialog}
                onClose={handleCloseAcceptBookingDialog}
            >
                <DialogTitle fontWeight='700'>
                    Xác nhận lịch hẹn với khách hàng
                </DialogTitle>
                <DialogContent>
                    <Typography
                        variant='h5'
                    >
                        Bạn có chắc chắn muốn đồng ý lịch hẹn với khách hàng này hay không?
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={handleCloseAcceptBookingDialog}
                        color='error'
                    >
                        Hủy
                    </Button>
                    <Button
                        onClick={() =>
                            handleConfirmAcceptBooking(bookingIdDialog)}
                        color='success'
                    >
                        Xác nhận
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    )
}

export default CustomerBookingComponent
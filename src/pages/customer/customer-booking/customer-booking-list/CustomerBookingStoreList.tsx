import React from 'react'
import { useAppDispatch, useAppSelector } from '../../../../services/store/store'
import useFormatCurrency from '../../../../hooks/useFormatCurrency'
import { Box, Button, Container, Dialog, DialogActions, DialogContent, DialogTitle, Paper, Typography } from '@mui/material'
import { cancelBookingByCustomer, clearCustomerBooking, getAllBookingByCustomer } from '../../../../services/features/booking/customerBookingSlice'
import './style/_style.scss'
import { EmailOutlined, PhoneIphoneOutlined, PlaceOutlined, StoreOutlined } from '@mui/icons-material'

const CustomerBookingStoreList = () => {
    const dispatch = useAppDispatch()
    const formattedCurrency = useFormatCurrency()
    const { getAllCustomerBooking } = useAppSelector((state) => state.customerBooking)

    const [bookingIdDialog, setBookingIdDialog] = React.useState<number | null>(null)
    const [isOpenCancelBookingDialog, setIsOpenCancelBookingDialog] = React.useState(false);

    const loadData = () => {
        dispatch(clearCustomerBooking())
        dispatch(getAllBookingByCustomer());
    }

    React.useEffect(() => {
        loadData()
    }, [dispatch])


    const handleOpenCancleBooking = (bookingId: number) => {
        setBookingIdDialog(bookingId)
        setIsOpenCancelBookingDialog(true)
    }
    const handleCloseCancelBookingDialog = () => {
        setIsOpenCancelBookingDialog(false)
    }
    const handleConfirmCancelBooking = (bookingId: number | null) => {
        if (bookingId !== null) {
            dispatch(cancelBookingByCustomer({ bookingId }))
                .then(() => {
                    loadData()
                    setTimeout(() => {
                        setIsOpenCancelBookingDialog(false)
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
                Danh Sách lịch hẹn với cửa hàng:
            </Typography>
            {getAllCustomerBooking?.map((cusBooking) => (
                <Paper
                    key={cusBooking?.buyerBookings[0]?.bookingId}
                    className="paper-booking-list"
                >
                    <Box className="booking-row" display="flex">
                        <Box className="left-box" flexGrow={4}>
                            <div className="image-booking-product">
                                <img
                                    src={cusBooking?.motor?.motorbikeImages[0]?.imageLink}
                                    alt='Motorbike image'
                                />
                            </div>
                            <div className="product-booking">
                                <Typography variant='h5' fontWeight={700} align='center'>
                                    {cusBooking?.motor?.motorName}
                                </Typography>
                                <Typography variant='h6' fontWeight={700} align='center' color='red'>
                                    {formattedCurrency(cusBooking?.motor?.price)}
                                </Typography>
                            </div>
                            <div className="product-content">
                                <Typography>
                                    <strong>Số KM: </strong>
                                    {cusBooking?.motor?.odo} KM
                                </Typography>
                                <div className='register-date'>
                                    <Typography>Ngày Đăng Ký:</Typography>
                                    <Typography>
                                        {new Date(cusBooking?.motor?.year).toLocaleDateString('vi-VN')}
                                    </Typography>
                                </div>
                                <div className='tag-motorbike-status'>
                                    <Typography variant='subtitle1'>
                                        {cusBooking?.motor?.motorStatus?.title === 'CONSIGNMENT' ? 'KÝ GỬI' :
                                            cusBooking?.motor?.motorStatus?.title === 'LIVELIHOOD' ? 'KHÔNG KÝ GỬI' : 'KHÔNG XÁC ĐỊNH'}
                                    </Typography>
                                </div>
                            </div>
                        </Box>
                        <Box className="right-box" flexGrow={8}>
                            <div className="store-info">
                                <div className="motorbike-store-info-header">
                                    <Typography variant='h5' sx={{ color: '#f0c413' }}>Thông tin cửa hàng:</Typography>
                                </div>
                                <div className="motorbike-owner-info-content">
                                    <Typography display='flex'>
                                        <StoreOutlined />{' '}
                                        {cusBooking?.receiver?.storeDesciptions[0]?.storeName}
                                    </Typography>
                                    <Typography display='flex'>
                                        <PhoneIphoneOutlined />{' '}
                                        {cusBooking?.receiver?.storeDesciptions[0]?.storePhone}</Typography>
                                    <Typography display='flex'>
                                        <EmailOutlined />{' '}
                                        {cusBooking?.receiver?.storeDesciptions[0]?.storeEmail}</Typography>
                                    <Typography display='flex'>
                                        <PlaceOutlined />{' '}
                                        {cusBooking?.receiver?.storeDesciptions[0]?.address}</Typography>
                                </div>
                            </div>
                            <div className="booking-store-info">
                                <div className="booking-store-info-header">
                                    <Typography variant='h5' sx={{ color: '#35c206' }}>Thông tin đặt lịch:</Typography>
                                </div>
                                <div className="booking-store-info-content">
                                    <Typography>
                                        <strong>Ngày đặt lịch:</strong>
                                        {new Date(cusBooking?.buyerBookings[0]?.bookingDate).toLocaleDateString('vi-VN')}
                                    </Typography>
                                    <Typography>
                                        <strong>Chú ý:</strong>
                                        {cusBooking?.buyerBookings[0]?.note}
                                    </Typography>
                                    <div style={{ display: 'flex' }}>
                                        <Typography fontWeight={700}>Trạng thái:</Typography>
                                        <Typography
                                            sx={{
                                                fontWeight: 'bold',
                                                textShadow: cusBooking?.buyerBookings[0]?.status === 'PENDING' ? '2px 2px 4px rgba(250, 237, 117, 0.5)' :
                                                    cusBooking?.buyerBookings[0]?.status === 'ACCEPT' ? '2px 2px 4px rgba(208, 250, 72, 0.5)' :
                                                        cusBooking?.buyerBookings[0]?.status === 'REJECT' ? '2px 2px 4px rgba(247, 79, 102, 0.5)'
                                                            : '2px 2px 4px rgba(115, 114, 108, 0.5)',

                                                color: cusBooking?.buyerBookings[0]?.status === 'PENDING' ? '#eba21c' :
                                                    cusBooking?.buyerBookings[0]?.status === 'ACCEPT' ? 'green' :
                                                        cusBooking?.buyerBookings[0]?.status === 'REJECT' ? 'red' :
                                                            'black'
                                            }}
                                        >
                                            {cusBooking?.buyerBookings[0]?.status === 'PENDING' ? 'CHỜ ĐỢI' :
                                                cusBooking?.buyerBookings[0]?.status === 'ACCEPT' ? 'ĐÃ DUYỆT' :
                                                    cusBooking?.buyerBookings[0]?.status === 'REJECT' ? 'TỪ CHỐI' :
                                                        'QUÁ HẠN'
                                            }
                                        </Typography>
                                    </div>
                                </div>
                                <div style={{
                                    flexDirection: 'column',
                                    marginTop: '40px',
                                }}>
                                    <Button
                                        color='error'
                                        variant='contained'
                                        onClick={() => handleOpenCancleBooking(cusBooking?.buyerBookings[0]?.bookingId)}
                                        disabled={cusBooking?.buyerBookings[0]?.status !== 'PENDING'}
                                    >
                                        Hủy lịch
                                    </Button>
                                </div>
                            </div>
                        </Box>
                    </Box>

                </Paper>
            ))}
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
    )
}

export default CustomerBookingStoreList
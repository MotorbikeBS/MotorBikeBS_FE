import { Box, Button, Container, Dialog, DialogActions, DialogContent, DialogTitle, Paper, Typography } from '@mui/material'
import React from 'react'
import { useAppDispatch, useAppSelector } from '../../../services/store/store'
import useFormatCurrency from '../../../hooks/useFormatCurrency'
import { cancelContractByOwner, clearContract, getAllContract } from '../../../services/features/contract/contractSlice'
import './style/_style.scss'
import { EmailOutlined, PhoneIphoneOutlined, PlaceOutlined, StoreOutlined } from '@mui/icons-material'
import TradeHistoryImgeDialog from '../../../common-components/trade-history-img-dialog/TradeHistoryImgeDialog'

const TradeHistoryWithStoreComponent = () => {
    const dispatch = useAppDispatch()
    const { getContracts } = useAppSelector((state) => state.contract)
    const formattedCurrency = useFormatCurrency()

    const [fullImageContract, setFullImageContract] = React.useState(false);
    const [imageArray, setImageArray] = React.useState<string[]>([]);

    const [isOpenErrorContractDialo, setIsOpenErrorContractDialog] = React.useState(false);
    const [contractIdDialog, setContractIdDialog] = React.useState<number | null
    >(null);

    const loadData = () => {
        dispatch(clearContract())
        dispatch(getAllContract())
    }

    React.useEffect(() => {
        loadData();
    }, [dispatch])

    const handleOpenFullImage = (imageUrls: string[]) => {
        setImageArray(imageUrls);
        setFullImageContract(true);
    };

    const handleErrorContract = (contractId: number) => {
        setContractIdDialog(contractId)
        setIsOpenErrorContractDialog(true)
    }
    const handleCloseContractErrorDialog = () => {
        setIsOpenErrorContractDialog(false)
    }
    const handleConfirmErrorContract = (contractId: number | null) => {
        if (contractId !== null) {
            dispatch(cancelContractByOwner({ contractId }))
                .then(() => {
                    loadData()
                    setTimeout(() => {
                        setIsOpenErrorContractDialog(false)
                    }, 1000)
                })
        }
    }

    return (
        <Container className='container-xl' maxWidth='xl'>
            <Typography
                className='h4-heading'
                variant="h4"
                gutterBottom
                style={{ marginBottom: '20px' }}
            >
                Lịch sử giao dịch với cửa hàng:
            </Typography>
            {getContracts?.map((contractOwner) => (
                <Paper
                    key={contractOwner?.negotiations[0]?.bookings[0]?.contracts[0]?.contractId}
                    className="paper-booking-list"                >
                    <Box className="booking-row" display="flex">
                        <Box className="left-box" flexGrow={3}>
                            <div className="image-booking-product">
                                <img
                                    src={
                                        contractOwner?.motor?.motorbikeImages[0]
                                            ?.imageLink || ''}
                                    alt="Motor Image"
                                />
                            </div>
                            <div className="product-booking">
                                <Typography variant='h5' fontWeight={700} align='center'>
                                    {contractOwner?.motor?.motorName}
                                </Typography>
                                <Typography variant='h6' fontWeight={700} align='center' color='red'>
                                    {formattedCurrency(contractOwner?.negotiations[0]?.finalPrice)}
                                </Typography>
                            </div>
                            <div className="product-content">
                                <Typography>
                                    <strong>Số KM: </strong>
                                    {contractOwner?.motor?.odo} KM
                                </Typography>
                                <div className='register-date'>
                                    <Typography>Ngày Đăng Ký:</Typography>
                                    <Typography>
                                        {new Date(contractOwner?.motor?.year).toLocaleDateString('vi-VN')}
                                    </Typography>
                                </div>
                                <div className='tag-motorbike-status'>
                                    <Typography variant='subtitle1'>
                                        {contractOwner?.motor?.motorStatus?.title === 'CONSIGNMENT' ? 'KÝ GỬI' :
                                            contractOwner?.motor?.motorStatus?.title === 'LIVELIHOOD' ? 'KHÔNG KÝ GỬI' : 'KHÔNG XÁC ĐỊNH'}
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
                                        {contractOwner?.sender?.storeDesciptions[0]?.storeName}
                                    </Typography>
                                    <Typography display='flex'>
                                        <PhoneIphoneOutlined />{' '}
                                        {contractOwner?.sender?.storeDesciptions[0].storePhone}</Typography>
                                    <Typography display='flex'>
                                        <EmailOutlined />{' '}
                                        {contractOwner?.sender?.storeDesciptions[0]?.storeEmail}</Typography>
                                    <Typography display='flex'>
                                        <PlaceOutlined />{' '}
                                        {contractOwner?.sender?.storeDesciptions[0].address}</Typography>
                                </div>
                            </div>
                            <div className="booking-owner-info">
                                <div className="booking-owner-info-header">
                                    <Typography variant='h5' sx={{ color: '#35c206' }}>Thông tin hợp đồng</Typography>
                                </div>
                                <div className="booking-owner-info-content">
                                    <Typography>
                                        <strong>Ngày tạo</strong>
                                        {new Date(contractOwner?.negotiations[0]?.bookings[0]?.contracts[0]?.createdAt).toLocaleDateString('vi-VN')}
                                    </Typography>
                                    <Typography>
                                        <strong>Chú ý:</strong>
                                        {contractOwner?.negotiations[0]?.bookings[0]?.contracts[0]?.content}
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
                                            {contractOwner?.negotiations[0]?.bookings[0]?.contracts[0]?.status === 'PENDING' ? 'CHỜ ĐỢI' :
                                                contractOwner?.negotiations[0]?.bookings[0]?.contracts[0]?.status === 'ACCEPT' ? 'ĐÃ DUYỆT/SẼ TỚI' :
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
                                            onClick={
                                                () => handleErrorContract(
                                                    contractOwner?.negotiations[0]?.bookings[0]?.contracts[0]?.contractId
                                                )
                                            }
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
                                <img
                                    src={
                                        contractOwner?.negotiations[0]?.bookings[0]
                                            ?.contracts[0]?.contractImages[0].imageLink
                                    }
                                    alt='Hợp đồng'
                                    onClick={() => handleOpenFullImage(
                                        contractOwner?.negotiations[0]?.bookings[0]
                                            ?.contracts[0]?.contractImages.map(image => image.imageLink) || []
                                    )}

                                />
                            </div>
                        </Box>
                    </Box>
                </Paper>
            ))}
            <TradeHistoryImgeDialog
                isOpen={fullImageContract}
                onClose={() => setFullImageContract(false)}
                imageUrls={imageArray}
            />
            <Dialog
                open={isOpenErrorContractDialo}
                onClose={handleCloseContractErrorDialog}
            >
                <DialogTitle>Hợp đồng bị lỗi? Yêu cầu cập nhật lại.</DialogTitle>
                <DialogContent>
                    <Typography>
                        Bạn có chắc muốn yêu cầu chủ cửa hàng cập nhật lại hợp đồng?
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={handleCloseContractErrorDialog}
                        color="error"
                    >
                        Hủy
                    </Button>
                    <Button
                        onClick={() =>
                            handleConfirmErrorContract(contractIdDialog)
                        }
                        color="success"
                    >
                        Xác nhận
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    )
}

export default TradeHistoryWithStoreComponent
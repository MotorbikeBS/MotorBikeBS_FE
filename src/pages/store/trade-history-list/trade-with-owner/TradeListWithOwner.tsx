import { Box, Button, Container, Paper, Typography } from '@mui/material'
import React from 'react'
import './style/_style.scss'
import { useAppDispatch, useAppSelector } from '../../../../services/store/store'
import useFormatCurrency from '../../../../hooks/useFormatCurrency'
import { clearContract, getAllContract } from '../../../../services/features/contract/contractSlice'
import CreateContractDialogByStore from '../../contract-dialog-store/CreateContractDialogByStore'
import TradeHistoryImgeDialog from '../../../../common-components/trade-history-img-dialog/TradeHistoryImgeDialog'

const TradeListWithOwner = () => {
    const dispatch = useAppDispatch()
    const formattedCurrency = useFormatCurrency()
    const { getContracts } = useAppSelector((state) => state.contract)

    const [bookingIdDialog, setBookingIdDialog] = React.useState<number | null>(null)
    const [isOpenContractDialog, setIsOpenContractDialog] = React.useState(false)
    const [isOpenSubmitDialog, setIsOpenSubmitDialog] = React.useState(false)
    const [isOpenCancelDialog, setIsOpenCancelDialog] = React.useState(false);

    const [fullImageContract, setFullImageContract] = React.useState(false);
    const [imageArray, setImageArray] = React.useState<string[]>([]);


    React.useEffect(() => {
        dispatch(clearContract())
        dispatch(getAllContract())
    }, [dispatch])

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

    const handleOpenFullImage = (imageUrls: string[]) => {
        setImageArray(imageUrls);
        setFullImageContract(true);
    };


    return (
        <Container className="container-xl" maxWidth="lg">
            <Typography className="h4-heading"
                variant="h4"
                gutterBottom
            >
                Danh sách giao dịch với chủ xe
            </Typography>
            {getContracts?.map((contract) => (
                <Paper
                    className='paper-contract-list'
                    key={
                        contract?.negotiations[0]
                            ?.bookings[0]?.contracts[0]
                            ?.contractId
                    }
                >
                    <Box className="contract-row" display="flex">
                        <Box className="left-box" flexGrow={3}>
                            <div className="image-contract-product">
                                <img
                                    src={contract?.motor?.motorbikeImages[0]?.imageLink || ''}
                                    alt="Motor Image"
                                />
                            </div>
                            <div className="product-contract">
                                <Typography variant='h5' fontWeight={700} align='center'>
                                    {contract?.motor?.motorName}
                                </Typography>
                                <Typography variant='h6' fontWeight={700} align='center' color='red'>
                                    {formattedCurrency(contract?.negotiations[0]?.finalPrice)}
                                </Typography>
                            </div>
                            <div className="product-content">
                                <Typography>
                                    <strong>Số KM: </strong>
                                    {contract?.motor?.odo} KM
                                </Typography>
                                <div className='register-date'>
                                    <Typography>Ngày Đăng Ký:</Typography>
                                    <Typography>
                                        {new Date(contract?.motor?.year).toLocaleDateString('vi-VN')}
                                    </Typography>
                                </div>
                                <div className='tag-motorbike-status'>
                                    <Typography variant='subtitle1'>
                                        {contract?.motor?.motorStatus?.title === 'CONSIGNMENT' ? 'KÝ GỬI' :
                                            contract?.motor?.motorStatus?.title === 'LIVELIHOOD' ? 'KHÔNG KÝ GỬI' : 'KHÔNG XÁC ĐỊNH'}
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
                                    <Typography>
                                        <strong>Tên chủ xe:</strong>
                                        {contract?.receiver?.userName}
                                    </Typography>
                                    <Typography>
                                        <strong>Số điện thoại:</strong>
                                        {contract?.receiver?.phone}
                                    </Typography>
                                    <Typography>
                                        <strong>Email:</strong>
                                        {contract?.receiver?.email}
                                    </Typography>
                                    <Typography>
                                        <strong>Địa chỉ:</strong>
                                        {contract?.receiver?.address}
                                    </Typography>
                                </div>
                            </div>
                            <div className="contract-owner-info">
                                <div className="contract-owner-info-header">
                                    <Typography variant='h5' sx={{ color: '#35c206' }}>Thông tin hợp đồng</Typography>
                                </div>
                                <div className="contract-owner-info-content">
                                    <Typography>
                                        <strong>Ngày tạo:</strong>{' '}
                                        {
                                            new Date(contract?.negotiations[0]?.bookings[0]?.contracts[0]?.createdAt).toLocaleDateString('vi-VN')}
                                    </Typography>
                                    <Typography>
                                        <strong>Nội dung:</strong>{' '}
                                        {contract?.negotiations[0]?.bookings[0]?.contracts[0]?.content}
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
                                            {contract?.negotiations[0]?.bookings[0]?.contracts[0]?.status === 'PENDING' ? 'CHỜ ĐỢI' :
                                                contract?.negotiations[0]?.bookings[0]?.contracts[0]?.status === 'ACCEPT' ? 'CHẤP NHẬN' :
                                                    contract?.negotiations[0]?.bookings[0]?.contracts[0]?.status === 'CANCEL' ? 'TỪ CHỐI' :
                                                        'CHƯA XÁC ĐỊNH'
                                            }
                                        </Typography>
                                    </div>
                                </div>
                                {contract?.negotiations[0]?.bookings[0]?.contracts[0]?.status === 'CANCEL' ? (
                                    <div className='contract-owner-btn-contract'>
                                        <Button
                                            variant='contained'
                                            size='small'
                                            color='warning'
                                            onClick={() => handleOpenCreateContractDialog(
                                                contract?.negotiations[0]?.bookings[0]?.bookingId
                                            )}
                                        >
                                            Tải Lại hợp đồng
                                        </Button>
                                    </div>
                                ) : (
                                    <></>
                                )}

                            </div>
                            <div className='image-contract'>
                                <div className="image-owner-info-header">
                                    <Typography variant='h5' sx={{ color: '#f0c413' }}>
                                        Hợp đồng</Typography>
                                </div>
                                <img
                                    src={
                                        contract?.negotiations[0]?.bookings[0]
                                            ?.contracts[0]?.contractImages[0].imageLink
                                    }
                                    alt='Hợp đồng'
                                    onClick={() => handleOpenFullImage(
                                        contract?.negotiations[0]?.bookings[0]
                                            ?.contracts[0]?.contractImages.map(image => image.imageLink) || []
                                    )}
                                />
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
            <TradeHistoryImgeDialog
                isOpen={fullImageContract}
                onClose={() => setFullImageContract(false)}
                imageUrls={imageArray}
            />
        </Container >
    )
}

export default TradeListWithOwner
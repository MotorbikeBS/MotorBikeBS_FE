import React, { ReactNode } from 'react'
import { ISelectRowNegotiation } from '../../../../../models/Negotiation/Negotiation';
import {
    Box,
    Button,
    Modal,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    TextField,
    Typography
}
    from '@mui/material';
import { ClearRounded } from '@mui/icons-material';
import './style/_style.scss'
import { useAppDispatch } from '../../../../../services/store/store';
import { acceptEnemyPrice } from '../../../../../services/features/negotiation/negotiationSlice';

interface NegotiationInforModalProps {

    isOpen: boolean;
    onClose: () => void;
    loadingData: () => void;
    data: ISelectRowNegotiation | null;
}
const NegotiationInforModalByOwner: React.FC<NegotiationInforModalProps> = ({
    isOpen,
    onClose,
    loadingData,
    data,
}) => {
    const dispatch = useAppDispatch()

    const handleAcceptEnemyPrice = () => {
        if (data && data.id) {
            dispatch(acceptEnemyPrice({ negotiationId: data.id }))
                .then(() => {
                    loadingData()
                    setTimeout(() => {
                        onClose()
                    }, 1000)
                })
        }
    }
    const createData = (label: string, value: ReactNode | string) => ({
        label,
        value,
    });
    const rows = [
        createData('Tên Xe', data?.motorName),
        createData('Số đăng ký', data?.certificateNumber),
        createData('Năm đăng ký', data?.year ? data.year.toLocaleString() : 'N/A'),
        createData('Giá ban đầu',
            <Typography
                fontWeight='bold'
            >
                {data?.price}
            </Typography>
        ),
        createData('Giá Store đưa ra',
            <div className='price-value'>
                <TextField
                    value={data?.storePrice
                        ? data?.storePrice
                        : 'Chưa trả giá'
                    }
                    disabled
                />
                <Box>
                    <Button
                        variant="contained"
                        color="success"
                        className='btn-accept-price'
                        onClick={handleAcceptEnemyPrice}
                    >
                        Chấp nhận
                    </Button>
                </Box>
            </div>
        ),
        createData('Giá của bạn',
            <div className='price-value'>
                <TextField
                    value={data?.ownerPrice
                        ? data?.ownerPrice
                        : 'Bạn chưa trả giá'}
                />
                <Button
                    variant="contained"
                    color="warning"
                    className='btn-again-price'
                >
                    Trả giá lại
                </Button>
            </div>

        ),
        createData('Tên cửa hàng', data?.storeName),
        createData('Số điện thoại cửa hàng', data?.storePhone),
        createData('Địa chỉ cửa hàng', data?.storeAddress),
        createData('Trạng thái thương lượng',
            data?.negotiationStatus === 'PENDING' ? (
                <Typography
                    color='red'
                    fontWeight='700'
                >
                    Đang Chờ
                </Typography>
            ) : data?.negotiationStatus === 'ACCEPT' ? (
                <Typography
                    color='green'
                    fontWeight='700'
                >
                    Đã Duyệt
                </Typography>
            ) : (
                <Typography
                    color='black'
                    fontWeight='700'
                >
                    Chưa Xác Định
                </Typography>
            )
        ),
        createData('Trạng thái xe',

            data?.motorStatus === 'CONSIGNMENT'
                || data?.motorStatus === 4 ? (
                <Typography
                    color='#E6A160'
                    fontWeight='700'
                >
                    KÝ GỞI
                </Typography>
            ) : data?.motorStatus === 'LIVELIHOOD'
                || data?.motorStatus === 5 ? (
                <Typography sx={{ color: 'green' }}>KHÔNG KÍ GỞI</Typography>

            ) : (
                <Typography sx={{ color: '#3D609A' }}>CHƯA XÁC ĐỊNH</Typography>
            )

        ),
    ]
    return (
        <Modal open={isOpen} onClose={onClose}>
            <div className='modal-container'>
                <div className='modal-header'>
                    <Typography variant="h6"
                        gutterBottom
                        fontWeight='700'>
                        Thông tin thương lượng
                    </Typography>
                    <div className='header-btn-close'>
                        <Button onClick={onClose}>
                            <ClearRounded />
                        </Button>
                    </div>
                </div>
                <TableContainer component={Paper}>
                    <Table>
                        <TableBody>
                            {rows.map((row, index) => (
                                <TableRow key={index}>
                                    <TableCell component="th" scope="row"
                                        sx={{
                                            fontWeight: '700'
                                        }}
                                    >
                                        {row.label}
                                    </TableCell>
                                    <TableCell align="left">{row.value}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                {data?.negotiationStatus === 'PENDING' &&
                    (
                        <Box className='btn-negotiation-status'>
                            <Button
                                variant="contained"
                                color="error"
                            // onClick={handleCancleNegotiation}
                            >
                                Hủy giao dịch
                            </Button>
                        </Box>
                    )}
            </div>
        </Modal>
    )
}

export default NegotiationInforModalByOwner
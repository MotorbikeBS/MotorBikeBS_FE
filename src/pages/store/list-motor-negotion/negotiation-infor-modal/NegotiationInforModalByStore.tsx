import React, { ReactNode, useState } from 'react'
import { Box, Button, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableRow, TextField, Typography } from '@mui/material';
import { ClearRounded } from '@mui/icons-material';
import './style/_style.scss'
import { ISelectRowNegotiation } from '../../../../models/Negotiation/Negotiation';
import { useAppDispatch } from '../../../../services/store/store';
import useFormatCurrency from '../../../../hooks/useFormatCurrency';
import { cancleNegotiation } from '../../../../services/features/negotiation/negotiationSlice';

interface NegotiationInforModalProps {

    isOpen: boolean;
    onClose: () => void;
    loadingData: () => void;
    data: ISelectRowNegotiation | null;
}


const NegotiationInforModalByStore: React.FC<NegotiationInforModalProps> = ({
    isOpen,
    onClose,
    loadingData,
    data,

}) => {
    const dispatch = useAppDispatch()
    const formatPrice = useFormatCurrency()


    const createData = (label: string, value: ReactNode | string) => ({
        label,
        value,
    });
    const rows = [

        createData('Tên Xe', data?.motorName),
        createData('Số đăng ký', data?.certificateNumber),
        createData('Năm đăng ký', data?.year ? data.year.toLocaleString() : 'N/A'),
        createData('Giá ban đầu',
            <Typography fontWeight='bold'>
                {data?.price !== undefined ? formatPrice(data.price) : 'N/A'}
            </Typography>
        ),
        createData('Ngày nhận xe', data?.startTime ? data.startTime.toLocaleString() : 'N/A'),
        createData('Ngày kết thúc', data?.endTime ? data.endTime.toLocaleString() : 'N/A'),
        createData('Tên chủ xe', data?.ownerName),
        createData('Số điện thoại chủ xe', data?.ownerPhone),
        createData('Địa chỉ chủ xe', data?.ownerAddress),
        createData('Trạng thái thương lượng', (
            data?.negotiationStatus === 'PENDING' ? (
                <Typography color='red' fontWeight='700'>
                    Đang Chờ
                </Typography>
            ) : data?.negotiationStatus === 'ACCEPT' ? (
                <Typography color='green' fontWeight='700'>
                    Đã Duyệt
                </Typography>
            ) : (
                <Typography color='black' fontWeight='700'>
                    Chưa Xác Định
                </Typography>
            )
        )),
        createData('Trạng thái xe', (
            data?.motorStatus === 'CONSIGNMENT' || data?.motorStatus === 4 ? (
                <Typography color='#E6A160' fontWeight='700'>
                    KÝ GỞI
                </Typography>
            ) : data?.motorStatus === 'LIVELIHOOD' || data?.motorStatus === 5 ? (
                <Typography sx={{ color: 'green' }}>KHÔNG KÍ GỞI</Typography>
            ) : (
                <Typography sx={{ color: '#3D609A' }}>CHƯA XÁC ĐỊNH</Typography>
            )
        )),
    ]

    const handleCancleNegotiation = () => {
        if (data && data.id) {
            dispatch(cancleNegotiation({ negotiationId: data.id }))
                .then(() => {
                    loadingData()
                    setTimeout(() => {
                        onClose()
                    }, 1000)
                })
        }
    }


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
                                onClick={handleCancleNegotiation}
                            >
                                Hủy giao dịch
                            </Button>
                        </Box>
                    )}
            </div>
        </Modal>
    )
}

export default NegotiationInforModalByStore
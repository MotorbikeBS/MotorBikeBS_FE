import React, { ReactNode } from 'react'
import { ISelectRowNegotiation } from '../../../../../models/Negotiation/Negotiation';
import { Box, Button, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableRow, TextField, Typography } from '@mui/material';
import { ClearRounded } from '@mui/icons-material';
import useFormatCurrency from '../../../../../hooks/useFormatCurrency';
import './style/_style.scss'
import { useAppSelector } from '../../../../../services/store/store';

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
    // const formattedCurrency = useFormatCurrency()
    const { account } = useAppSelector((state) => state.account)

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
        createData('Giá chủ xe',
            <div className='price-value'>
                <TextField
                    value={data?.ownerPrice
                        ? data?.ownerPrice
                        : 'Chưa nhập'}
                    disabled
                />
                <Box>
                    <Button
                        variant="contained"
                        color="success"
                        className='btn-accept-price'
                    >
                        Chấp nhận
                    </Button>
                </Box>
            </div>

        ),
        createData('Giá của bạn',

            <div className='price-value'>
                <TextField
                    value={data?.storePrice || 0}

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
        createData('Tên chủ xe', data?.ownerName),
        createData('Số điện thoại chủ xe', data?.ownerPhone),
        createData('Địa chỉ chủ xe', data?.ownerAddress),
        createData('Trạng thái thương lượng', data?.negotiationStatus),
        createData('Trạng thái xe', data?.motorStatus),
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
                            // onClick={handleReActive}
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
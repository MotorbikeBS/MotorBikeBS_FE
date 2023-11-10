import React, { ReactNode, useState } from 'react';
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Modal,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Typography,
} from '@mui/material';
import { ClearRounded } from '@mui/icons-material';
import './style/_style.scss';
import { useAppDispatch } from '../../../../../services/store/store';
import useFormatCurrency from '../../../../../hooks/useFormatCurrency';
import { ISelectRowValuation } from '../../../../../models/Valuation/Valuation';
import { acceptValuation, cancleValuation } from '../../../../../services/features/valuation/valuationSlice';

interface NegotiationInforModalProps {
    isOpen: boolean;
    onClose: () => void;
    loadingData: () => void;
    data: ISelectRowValuation | null;
}

const ValuationInforModalByOwner: React.FC<NegotiationInforModalProps> = ({
    isOpen,
    onClose,
    loadingData,
    data,
}) => {
    const dispatch = useAppDispatch();
    const formatPrice = useFormatCurrency();

    const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
    const [cancelConfirmDialogOpen, setCancelConfirmDialogOpen] = useState(false);

    const handleCancleValuation = () => {
        if (data && data.id) {
            openCancelConfirmDialog();
        }
    }

    const handleAcceptValuation = () => {
        if (data && data.id) {
            openConfirmDialog();
        }
    }

    const openCancelConfirmDialog = () => {
        setCancelConfirmDialogOpen(true);
    };

    const openConfirmDialog = () => {
        setConfirmDialogOpen(true);
    }

    const confirmCancelValuation = () => {
        if (data && data.id) {
            dispatch(cancleValuation({ valuationId: data.id }))
                .then(() => {
                    loadingData();
                    setTimeout(() => {
                        onClose();
                    }, 1000);
                });
        }
        setCancelConfirmDialogOpen(false);
    };

    const confirmNegotiation = () => {
        if (data && data.id) {
            dispatch(acceptValuation({
                valuationId: data.id
            }))
                .then(() => {
                    loadingData();
                    setTimeout(() => {
                        onClose();
                    }, 1000);
                });
        }
        setConfirmDialogOpen(false);
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
            <Typography fontWeight='bold'>
                {data?.price !== undefined ? formatPrice(data.price) : 'N/A'}
            </Typography>
        ),
        createData('Giá cửa hàng đề xuất',
            <Typography fontWeight='bold'>
                {data?.storePrice !== undefined ? formatPrice(data.storePrice) : 'N/A'}
            </Typography>
        ),
        createData('Tên cửa hàng', data?.storeName),
        createData('Số điện thoại cửa hàng', data?.storePhone),
        createData('Địa chỉ cửa hàng', data?.storeAddress),
        createData('Nội dung', data?.noteValuation),
        createData('Trạng thái thương lượng',
            data?.valuationStatus === 'PENDING' ? (
                <Typography
                    color='red'
                    fontWeight='700'
                >
                    Đang Chờ
                </Typography>
            ) : data?.valuationStatus === 'ACCEPT' ? (
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
        <div>
            <Modal open={isOpen} onClose={onClose}>
                <div className='modal-container'>
                    <div className='modal-header'>
                        <Typography variant="h6" gutterBottom fontWeight='700'>
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
                                        <TableCell component="th" scope="row" sx={{ fontWeight: '700' }}>
                                            {row.label}
                                        </TableCell>
                                        <TableCell align="left">{row.value}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

                    {data?.valuationStatus === 'PENDING' &&
                        (
                            <Box className='btn-negotiation-status'>
                                <Button
                                    variant="contained"
                                    color="error"
                                    onClick={handleCancleValuation}
                                >
                                    Hủy giao dịch
                                </Button>
                                <Button
                                    variant="contained"
                                    color="success"
                                    onClick={handleAcceptValuation}
                                >
                                    Xác nhận
                                </Button>
                            </Box>
                        )}
                </div>
            </Modal>

            <Dialog open={confirmDialogOpen} onClose={() => setConfirmDialogOpen(false)}>
                <DialogTitle>Xác nhận giao dịch</DialogTitle>
                <DialogContent>
                    <Typography>Bạn có chắc chắn muốn xác nhận giao dịch?</Typography>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={() => setConfirmDialogOpen(false)}
                        color="error"
                        variant='outlined'
                    >
                        Hủy
                    </Button>
                    <Button
                        onClick={confirmNegotiation}
                        color="success"
                        variant='outlined'

                    >
                        Xác nhận
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog open={cancelConfirmDialogOpen} onClose={() => setCancelConfirmDialogOpen(false)}>
                <DialogTitle>Xác nhận hủy giao dịch</DialogTitle>
                <DialogContent>
                    <Typography>Bạn có chắc chắn muốn hủy giao dịch?</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setCancelConfirmDialogOpen(false)} color="error">
                        Hủy
                    </Button>
                    <Button onClick={confirmCancelValuation} color="success">
                        Xác nhận
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default ValuationInforModalByOwner;

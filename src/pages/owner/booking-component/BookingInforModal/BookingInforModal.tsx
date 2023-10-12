import React, { ReactNode } from 'react';
import { IBookingResponse } from '../../../../models/Booking/Booking';
import './style/style.scss';
import { Button, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from '@mui/material';
import { ClearRounded } from '@mui/icons-material';

interface BookingInforModalProps {
    isOpen: boolean;
    onClose: () => void;
    loadingData?: () => void;
    data: IBookingResponse | null;
}

const BookingInforModal: React.FC<BookingInforModalProps> = ({
    isOpen,
    onClose,
    data,
    loadingData
}) => {
    if (!data) {
        return null;
    }

    console.log(data);

    const createData = (label: string, value: ReactNode) => ({ label, value: value || 'N/A' });

    const rows = [
        createData('Request ID', data.requestId || 'N/A'),
        createData('Tên xe', data.motor?.motorName || 'N/A'),
        createData('Số đăng ký', data.motor?.certificateNumber || 'N/A')
    ];

    console.log(rows);

    return (
        <Modal
            open={isOpen}
            onClose={onClose}
        >
            <div className='modal-container'>
                <div className='modal-header'>
                    <Typography variant="h4" gutterBottom fontWeight='700'>
                        Thông tin cửa hàng {data.sender?.storeName}
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
                                    <TableCell component="th" scope="row">
                                        {row.label}
                                    </TableCell>
                                    <TableCell align="left">{row.value}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </Modal>
    );
}

export default BookingInforModal;

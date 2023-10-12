import React, { ReactNode, useEffect, useState } from 'react';
import {
    Modal,
    Typography,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Paper,
} from '@mui/material';
import { ClearRounded } from '@mui/icons-material';
import './style/style.scss';
import { IBookingSelectRow } from '../../../../models/Booking/Booking';


interface BookingInforModalProps {

    isOpen: boolean;
    onClose: () => void;
    data: IBookingSelectRow | null;
}

const BookingInforModal: React.FC<BookingInforModalProps> = ({ isOpen, onClose, data }) => {

    console.log(data?.status)

    const createData = (label: string, value: ReactNode) => ({
        label,
        value: value ?? 'N/A',
    });

    const rows = [
        createData('Tên Xe', data?.motorName),
        createData('Số Đăng Ký', data?.certificateNumber),
        createData('Tên Cửa Hàng', data?.storeName),
        createData('Số Điện Thoại Cửa Hàng', data?.storePhone),
        // createData('Ngày Đặt Lịch', data?.bookingDate),
        createData('Ghi Chú', data?.note),
        createData('Trạng Thái', data?.status),
    ];




    return (
        <Modal open={isOpen} onClose={onClose}>
            <div className='modal-container'>
                <div className='modal-header'>
                    <Typography variant="h4" gutterBottom fontWeight='700'>
                        Thông tin cửa hàng
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
};

export default BookingInforModal;

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
    Grid,
    Box,
} from '@mui/material';
import { ClearRounded } from '@mui/icons-material';
import './style/style.scss';
import { IBookingSelectRow } from '../../../../models/Booking/Booking';
import { useAppDispatch, useAppSelector } from '../../../../services/store/store';
import { acceptBooking } from '../../../../services/features/booking/bookingSlice';


interface BookingInforModalProps {

    isOpen: boolean;
    onClose: () => void;
    loadingData: () => void;
    data: IBookingSelectRow | null;
}

const BookingInforModal: React.FC<BookingInforModalProps> = ({
    isOpen,
    onClose,
    data,
    loadingData
}) => {
    const dispatch = useAppDispatch()
    const { user } = useAppSelector((state) => state.users)

    console.log(data?.bookingId)

    const createData = (label: string, value: ReactNode | string) => ({
        label,
        value,
    });
    const rows = [
        createData('Tên Xe', data?.motorName),
        createData('Số Đăng Ký', data?.certificateNumber),
        createData('Tên Cửa Hàng', data?.storeName),
        createData('Địa chỉ cửa hàng', data?.address),
        createData('Số Điện Thoại Cửa Hàng', data?.storePhone),
        createData('Ngày Đặt Lịch', data?.bookingDate ? data.bookingDate.toLocaleString() : 'N/A'),
        createData('Ghi Chú', data?.note),
        createData('Trạng Thái', data?.status),
    ];

    const handleAcceptBooking = () => {
        if (data && data.bookingId) {
            dispatch(acceptBooking({ bookingId: data.bookingId }))
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
                {data?.status === 'PENDING' && user?.role.roleId === 3 && (
                    <Grid
                        container
                        spacing={2}
                        justifyContent="center"
                        className='btn-status'
                    >
                        <Grid item>
                            <Button
                                variant="contained"
                                color="success"
                                onClick={handleAcceptBooking}
                            >
                                Chấp nhận
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button
                                variant="contained"
                                color="error"
                            // onClick={handleRefuse}
                            >
                                Từ Chối
                            </Button>
                        </Grid>
                    </Grid>
                )}
                {data?.status === 'PENDING' && user?.role.roleId === 2 && (
                    <Box className='btn-status'>
                        <Button
                            variant="contained"
                            color="warning"
                        // onClick={handleReActive}
                        >
                            Hủy Đặt Lịch
                        </Button>
                    </Box>
                )}
                {data?.status === 'ACCEPT' && user?.role.roleId === 3 && (
                    <Box className='btn-status'>
                        <Button
                            variant="contained"
                            color="warning"
                        // onClick={handleReActive}
                        >
                            Hoàn Tất/Đã Bán
                        </Button>
                    </Box>
                )}
            </div>
        </Modal>
    );
};

export default BookingInforModal;

import React, { ReactNode } from 'react'
import { IBookingSelectRowWithStore } from '../../../models/Booking/Booking';
import { Box, Button, Grid, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../services/store/store';
import { ClearRounded } from '@mui/icons-material';
interface BookingInforModalStoreProps {

    isOpen: boolean;
    onClose: () => void;
    loadingData: () => void;
    data: IBookingSelectRowWithStore | null;
}

const BookingInforModalStore: React.FC<BookingInforModalStoreProps> = ({
    isOpen,
    onClose,
    data,
    loadingData
}) => {
    const dispatch = useAppDispatch()
    const { account } = useAppSelector((state) => state.account)

    console.log(data?.id)

    const createData = (label: string, value: ReactNode | string) => ({
        label,
        value,
    });
    const rows = [
        createData('Tên Xe', data?.motorName),
        createData('Số Đăng Ký', data?.certificateNumber),
        createData('Trạng Thái Xe', data?.motorStatus),
        createData('Tên Chủ Xe', data?.userName),
        createData('Số Điện Thoại Chủ Xe', data?.phone),
        createData('Địa chỉ chủ xe', data?.address),
        createData('Ngày Đặt Lịch', data?.bookingDate ? data.bookingDate.toLocaleString() : 'N/A'),
        createData('Ghi Chú', data?.note),
        createData('Trạng Thái', data?.status),
    ];

    return (
        <Modal open={isOpen} onClose={onClose}>
            <div className='modal-container'>
                <div className='modal-header'>
                    <Typography variant="h4" gutterBottom fontWeight='700'>
                        Thông tin lịch hẹn
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

                {data?.status === 'PENDING' &&
                    account?.roleId === 2 && (
                        <Box className='btn-status'>
                            <Button
                                variant="contained"
                                color="warning"
                            // onClick={handleReActive}
                            >
                                Hủy Lịch
                            </Button>
                        </Box>
                    )}
            </div>
        </Modal>
    )
}

export default BookingInforModalStore
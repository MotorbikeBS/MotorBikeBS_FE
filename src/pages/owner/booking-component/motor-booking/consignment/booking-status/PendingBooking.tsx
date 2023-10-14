import React, { useEffect, useMemo, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../../../../services/store/store'
import { clearBooking, getAllBookingByOwner } from '../../../../../../services/features/booking/bookingSlice'
import { Container, Paper, Typography } from '@mui/material'
import { DataGrid, GridRowParams } from '@mui/x-data-grid'
import { columns } from '../../table/Table'
import BookingInforModal from '../../../booking-infor-modal/BookingInforModal'
import { IBooking, IBookingSelectRow } from '../../../../../../models/Booking/Booking'

const PendingBooking = () => {
    const dispatch = useAppDispatch()
    const { getBooking } = useAppSelector((state) => state.booking)
    const [selectedRow, setSelectedRow] = useState<IBookingSelectRow | null>(null)
    const [isModalOpen, setIsModalOpen] = useState(false);


    useEffect(() => {
        dispatch(clearBooking())
        dispatch(getAllBookingByOwner());
    }, [dispatch]);

    const loadingData = () => {
        dispatch(getAllBookingByOwner())
    }

    const pendingBooking = useMemo(() => {
        return (getBooking ?? []).filter(
            (booking: IBooking) => booking.status === 'PENDING'
                && booking.motor.motorStatus.title === 'CONSIGNMENT'
        );
    }, [getBooking]);

    const rows = useMemo(() => {
        return pendingBooking.map((booking: IBooking) => ({
            id: booking?.bookings[0].bookingId,
            motorName: booking.motor?.motorName,
            certificateNumber: booking.motor?.certificateNumber,
            motorStatus: booking.motor?.motorStatus?.title,
            storeName: booking.sender.storeName,
            storePhone: booking.sender.storePhone,
            address: booking.sender.address,
            bookingDate: booking.bookings[0]?.bookingDate,
            note: booking.bookings[0]?.note,
            status: booking.bookings[0]?.status
        }));
    }, [pendingBooking]);

    const handleRowDoubleClick = (params: GridRowParams) => {
        setSelectedRow(params.row as IBookingSelectRow);
        setIsModalOpen(true);
    };


    return (
        <Container maxWidth="xl">
            <Paper style={{ marginBottom: '20px', padding: '20px' }}>
                <Typography variant="h4" gutterBottom>
                    Danh sách cửa hàng đặt lịch
                </Typography>
                <Typography fontSize='12px' gutterBottom color='red'>
                    <strong>Lưu ý: </strong>Vui lòng nhấn đúp vào 1 hàng để xem thông tin người đặt và cập nhật trạng thái
                </Typography>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSizeOptions={[5, 10, 100]}
                    disableRowSelectionOnClick
                    onRowDoubleClick={handleRowDoubleClick}
                />
            </Paper>
            <BookingInforModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                data={selectedRow}
                loadingData={loadingData}
            />
        </Container>
    )
}

export default PendingBooking
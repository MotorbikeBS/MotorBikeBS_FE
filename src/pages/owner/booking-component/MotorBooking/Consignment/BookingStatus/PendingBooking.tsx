import React, { useEffect, useMemo, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../../../../services/store/store'
import { getAllBookingByOwner } from '../../../../../../services/features/booking/bookingSlice'
import { Container, Paper, Typography } from '@mui/material'
import { DataGrid, GridRowParams } from '@mui/x-data-grid'
import { columns } from '../../Table/Table'
import BookingInforModal from '../../../BookingInforModal/BookingInforModal'
import { IBooking, IBookingSelectRow } from '../../../../../../models/Booking/Booking'

const PendingBooking = () => {
    const dispatch = useAppDispatch()
    const { getStoreBooking } = useAppSelector((state) => state.booking)
    const [selectedRow, setSelectedRow] = useState<IBookingSelectRow | null>(null)
    const [isModalOpen, setIsModalOpen] = useState(false);

    const loadingData = () => {
        dispatch(getAllBookingByOwner())
    }

    useEffect(() => {
        dispatch(getAllBookingByOwner());
    }, [dispatch]);


    const pendingBooking = useMemo(() => {
        return (getStoreBooking ?? []).filter((booking: IBooking) => booking.status === 'PENDING');
    }, [getStoreBooking]);

    const rows = useMemo(() => {
        return pendingBooking.map((booking: IBooking) => ({
            id: booking.requestId,
            motorName: booking.motor?.motorName,
            certificateNumber: booking.motor?.certificateNumber,
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
            />

        </Container>)
}

export default PendingBooking
import React, { useEffect, useMemo, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../../../../services/store/store'
import { IBooking, IBookingSelectRow } from '../../../../../../models/Booking/Booking'
import { getAllBookingByOwner } from '../../../../../../services/features/booking/bookingSlice'
import { Container, Paper, Typography } from '@mui/material'
import { DataGrid, GridRowParams } from '@mui/x-data-grid'
import { columns } from '../../Table/Table'
import BookingInforModal from '../../../BookingInforModal/BookingInforModal'

const AcceptBooking = () => {

    const dispatch = useAppDispatch()
    const { getBooking } = useAppSelector((state) => state.booking)
    const [selectedRow, setSelectedRow] = useState<IBookingSelectRow | null>(null)
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        dispatch(getAllBookingByOwner())
    }, [dispatch])

    const accepttedBooking = useMemo(() => {
        return (getBooking ?? []).filter((booking: IBooking) => booking.status === 'ACCEPT');
    }, [getBooking]);

    const rows = useMemo(() => {
        return accepttedBooking.map((booking: IBooking) => ({
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
    }, [accepttedBooking])

    const handleRowDoubleClick = (params: GridRowParams) => {
        setSelectedRow(params.row as IBookingSelectRow);
        setIsModalOpen(true)
    }

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

        </Container>

    )
}

export default AcceptBooking
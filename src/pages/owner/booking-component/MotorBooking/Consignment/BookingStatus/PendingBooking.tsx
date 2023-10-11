import React, { useEffect, useMemo } from 'react'
import { useAppDispatch, useAppSelector } from '../../../../../../services/store/store'
import { getAllBookingByOwner } from '../../../../../../services/features/booking/bookingSlice'
import { IBookingResponse } from '../../../../../../models/Booking/Booking'
import { Container, Paper, Typography } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { columns } from '../../Table/Table'

const PendingBooking = () => {
    const dispatch = useAppDispatch()
    const { getStoreBooking } = useAppSelector((state) => state.booking)

    const loadingData = () => {
        dispatch(getAllBookingByOwner())
    }

    useEffect(() => {
        dispatch(getAllBookingByOwner())
    }, [dispatch])

    const pendingBooking = useMemo(() => {
        return (getStoreBooking ?? []).filter((booking: IBookingResponse) => booking.status === 'PENDING')
    }, [getAllBookingByOwner])

    const rows = useMemo(() => {
        return pendingBooking.map((booking: IBookingResponse) => ({
            id: booking.requestId,
            motorName: booking.motor.motorName,
            certificateNumber: booking.motor.certificateNumber,
            storeName: booking.sender.storeName,
            storePhone: booking.sender.storePhone,
            address: booking.sender.address,
            bookingDate: booking.bookings[0].bookingDate,
            note: booking.bookings[0].note,
            status: booking.bookings[0].status

        }))
    }, [pendingBooking])

    return (
        <Container maxWidth="xl">
            <Paper style={{ marginBottom: '20px', padding: '20px' }}>
                <Typography variant="h4" gutterBottom>
                    Danh sách cửa hàng đã xác thực
                </Typography>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSizeOptions={[5, 10, 100]}
                    disableRowSelectionOnClick
                // onRowDoubleClick={handleRowDoubleClick}
                />
            </Paper>
            {/* <StoreModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} data={selectedRow} loadData={loadData} /> */}
        </Container>)
}

export default PendingBooking
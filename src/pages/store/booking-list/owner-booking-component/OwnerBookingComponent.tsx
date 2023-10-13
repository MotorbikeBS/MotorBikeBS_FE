import React, { useEffect, useMemo, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../../services/store/store'
import { IBooking, IBookingSelectRow } from '../../../../models/Booking/Booking'
import { clearBooking, getAllBookingByOwner } from '../../../../services/features/booking/bookingSlice'
import { DataGrid, GridRowParams } from '@mui/x-data-grid'
import { Container, Paper, Typography } from '@mui/material'
import BookingInforModal from '../../../owner/booking-component/booking-infor-modal/BookingInforModal'
import { columns } from '../table/Table'

const OwnerBookingComponent = () => {
    const dispatch = useAppDispatch()
    const { getBooking } = useAppSelector((state) => state.booking)

    const [selectedRow, setSelectedRow] = useState<IBookingSelectRow | null>(null)
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        dispatch(clearBooking())
        dispatch(getAllBookingByOwner());

    }, [dispatch])

    const loadingData = () => {
        dispatch(getAllBookingByOwner())
    }

    const handleRowDoubleClick = (params: GridRowParams) => {
        setSelectedRow(params.row as IBookingSelectRow);
        setIsModalOpen(true);
    };

    const getBookingByStore = useMemo(() => {
        return (getBooking ?? [])
    }, [getBooking])

    const rows = useMemo(() => {
        return getBookingByStore.map((booking: IBooking) => ({
            id: booking?.bookings[0].bookingId,
            motorName: booking.motor?.motorName,
            certificateNumber: booking.motor?.certificateNumber,

            note: booking.bookings[0]?.note,
            status: booking.bookings[0]?.status

        }))
    }, [getBookingByStore])
    return (
        <Container maxWidth="xl">
            <Paper style={{ marginBottom: '20px', padding: '20px' }}>
                <Typography variant="h4" gutterBottom>
                    Danh sách lịch hẹn của tôi
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

export default OwnerBookingComponent
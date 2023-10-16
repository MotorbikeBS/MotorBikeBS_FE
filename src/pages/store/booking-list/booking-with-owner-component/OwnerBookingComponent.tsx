import React, { useEffect, useMemo, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../../services/store/store'
import { IBooking, IBookingSelectRowWithStore } from '../../../../models/Booking/Booking'
import { clearBooking, getAllBookingByOwner } from '../../../../services/features/booking/bookingSlice'
import { DataGrid, GridRowParams } from '@mui/x-data-grid'
import { Container, Paper, Typography } from '@mui/material'
import { columns } from '../table/Table'
import { format } from 'date-fns';
import BookingInforModalStore from '../../booking-dialog-store/BookingInforModalStore'

const OwnerBookingComponent = () => {
    const dispatch = useAppDispatch()
    const { getBooking } = useAppSelector((state) => state.booking)

    const [selectedRow, setSelectedRow] = useState<IBookingSelectRowWithStore | null>(null)
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        dispatch(clearBooking())
        dispatch(getAllBookingByOwner());

    }, [dispatch])

    const loadingData = () => {
        dispatch(getAllBookingByOwner())
    }

    const handleRowDoubleClick = (params: GridRowParams) => {
        setSelectedRow(params.row as IBookingSelectRowWithStore);
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
            motorStatus: booking.motor?.motorStatus?.title,
            userName: booking.motor?.owner?.userName,
            phone: booking.motor?.owner?.phone,
            address: booking.motor?.owner?.address,
            bookingDate: format(new Date(booking.bookings[0].bookingDate), 'dd/MM/yyyy HH:mm'),
            note: booking.bookings[0]?.note,
            status: booking.bookings[0]?.status

        }))
    }, [getBookingByStore])
    console.log(rows)
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
            <BookingInforModalStore
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                data={selectedRow}
                loadingData={loadingData}
            />
        </Container>
    )
}

export default OwnerBookingComponent
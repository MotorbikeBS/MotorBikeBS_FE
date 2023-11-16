import { Container, Paper, Typography } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import React, { useMemo } from 'react'
import { columns } from '../payment-history-table/PaymentHistoryTable'
import { useAppDispatch, useAppSelector } from '../../../../../services/store/store'
import { clearPayment, getPaymentHistory } from '../../../../../services/features/payment/paymentSlice'
import { IPaymentHistory } from '../../../../../models/Payment/Payment'
import { format } from 'date-fns'

const StorePaymentHistory = () => {
    const dispatch = useAppDispatch()

    const { paymentHistory } = useAppSelector((state) => state.payment)

    const loadingData = React.useCallback(() => {
        dispatch(clearPayment());
        dispatch(getPaymentHistory());
    }, [dispatch]);

    React.useEffect(() => {
        loadingData();
    }, [loadingData]);

    const row = useMemo(() => {
        return paymentHistory?.map((history: IPaymentHistory) => ({
            id: history.payments[0]?.paymentId,
            vnpayOrderId: history?.payments[0]?.vnpayOrderId,
            dateCreated: format(new Date(history.payments[0]?.dateCreated), 'dd-MM-yyy HH:mm:ss'),
            paymentTime: format(new Date(history.payments[0]?.paymentTime), 'dd-MM-yyyy HH:mm:ss'),
            content: history?.payments[0]?.content,
            paymentStatus: history?.status
        }));
    }, [paymentHistory]);

    return (
        <Container maxWidth='xl'>
            <Paper sx={{
                marginBottom: '20px',
                padding: '20px'
            }}>
                <Typography variant="h4" gutterBottom>
                    Lịch sử giao dịch của tôi
                </Typography>
                <Typography fontSize="12px" gutterBottom color="red">
                    <strong>Lưu ý: </strong>Vui lòng nhấn đúp vào 1 hàng để xem
                    thông tin cập nhật trạng thái
                </Typography>
            </Paper>
            <DataGrid
                rows={row ?? []}
                columns={columns}
                pageSizeOptions={[5, 10, 100]}
                disableRowSelectionOnClick
                // onRowDoubleClick={handleRowDoubleClick}
                // loading={loading}
                autoHeight
                localeText={{
                    noRowsLabel: 'Không có dữ liệu',
                }}
            />
        </Container>)
}

export default StorePaymentHistory
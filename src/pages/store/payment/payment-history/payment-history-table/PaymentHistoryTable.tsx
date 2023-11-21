import { Typography } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
export const columns: GridColDef[] = [
    { field: 'id', headerName: 'Số Hóa Đơn', width: 180, hideable: true },
    { field: 'vnpayOrderId', headerName: 'Mã giao dịch', width: 280, hideable: true },

    {
        field: 'dateCreated',
        headerName: 'Ngày tạo',
        editable: false,
        width: 200,
    },
    {
        field: 'paymentTime',
        headerName: 'Thời gian thanh toán',
        editable: false,
        width: 200,

    },
    {
        field: 'content',
        headerName: 'Nội Dung',
        editable: false,
        width: 200,
    },
    {
        field: 'paymentStatus',
        headerName: 'Trạng Thái',
        editable: false,
        width: 200,
        renderCell: (params) =>
            params.row.paymentStatus === 'UNPAID' ? (
                <Typography color='#f7d71e' fontWeight='700'>CHƯA THANH TOÁN</Typography>
            ) : params.row.paymentStatus === 'PAID' ? (
                <Typography color='green' fontWeight='700'>THÀNH CÔNG</Typography>
            ) : params.row.paymentStatus === 'ERROR' ? (
                <Typography color='red' fontWeight='700'>LỖI GIAO DỊCH</Typography>
            )

                : (<></>)
    },
];

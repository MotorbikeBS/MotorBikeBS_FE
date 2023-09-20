import { Typography } from '@mui/material';
import { GridColDef, GridColTypeDef } from '@mui/x-data-grid';
import '../../style/style.scss'

const currencyFormatter = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
});

const vndPrice: GridColTypeDef = {
    valueFormatter: ({ value }) => currencyFormatter.format(value),
    cellClassName: 'price_row',
};

export const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 100 },
    {
        field: 'motoName',
        headerName: 'Tên xe',
        width: 200,
    },
    {
        field: 'bookingDate',
        headerName: 'Ngày xem xe',
        width: 200,
        editable: false,
    },
    {
        field: 'dateCreated',
        headerName: 'Ngày tạo lịch',
        width: 200,
        editable: false,
    },
    {
        field: 'nameStore',
        headerName: 'Tên cửa hàng',
        width: 240,
    },
    {
        field: 'phone',
        headerName: 'Số điện thoại',
        width: 200,
        editable: true,
    },
    {
        field: 'price',
        headerName: 'Giá xe',
        width: 200,
        editable: false,
        ...vndPrice,
    },
    {
        field: 'status',
        headerName: 'Trạng thái',
        width: 200,
        renderCell: (params) =>
            params.row.status === 'isCancel' ? (
                <Typography color="error">Từ chối</Typography>
            ) : params.row.status === 'isApprove' ? (
                <Typography sx={{ color: 'green' }}>Đã duyệt</Typography>
            ) : (
                <Typography sx={{ color: 'orange' }}>Chờ duyệt</Typography>
            ),
    },
];

export const rows = [
    {
        id: 1,
        motoName: 'Future Fi',
        bookingDate: '20/10/2023',
        dateCreated: '20/10/2023',
        nameStore: 'Phi Vũ',
        price: 20000000,
        phone: '0902199112',
        status: 'isApprove',
    },
    {
        id: 2,
        motoName: 'Future Fi',
        bookingDate: '20/10/2023',
        dateCreated: '20/10/2023',
        nameStore: 'Phi Vũ',
        price: 20000000,
        phone: '0902199112',
        status: 'isApprove',
    },
    {
        id: 3,
        motoName: 'Future Fi',
        bookingDate: '20/10/2023',
        dateCreated: '20/10/2023',
        nameStore: 'Phi Vũ',
        price: 20000000,
        phone: '0902199112',
        status: 'isApprove',
    },
    {
        id: 4,
        motoName: 'Future Fi',
        bookingDate: '20/10/2023',
        dateCreated: '20/10/2023',
        nameStore: 'Phi Vũ',
        price: 20000000,
        phone: '0902199112',
        status: 'isWaiting',
    },
    {
        id: 5,
        motoName: 'Future Fi',
        bookingDate: '20/10/2023',
        dateCreated: '20/10/2023',
        nameStore: 'Phi Vũ',
        price: 20000000,
        phone: '0902199112',
        status: 'isWaiting',
    },
    {
        id: 6,
        motoName: 'Future Fi',
        bookingDate: '20/10/2023',
        dateCreated: '20/10/2023',
        nameStore: 'Phi Vũ',
        price: 20000000,
        phone: '0902199112',
        status: 'isCancel',
    },
    {
        id: 7,
        motoName: 'Future Fi',
        bookingDate: '20/10/2023',
        dateCreated: '20/10/2023',
        nameStore: 'Phi Vũ',
        price: 20000000,
        phone: '0902199112',
        status: 'isWaiting',
    },
];

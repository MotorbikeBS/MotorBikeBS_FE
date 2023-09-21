import { Button, Typography } from '@mui/material';
import { GridColDef, GridColTypeDef } from '@mui/x-data-grid';
import '../../style/style.scss';

const currencyFormatter = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
});

const vndPrice: GridColTypeDef = {
    valueFormatter: ({ value }) => currencyFormatter.format(value),
    cellClassName: 'price_row',
    editable: false,
};

export const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'certNumber', headerName: 'Số đăng ký', width: 200 },
    {
        field: 'motoName',
        headerName: 'Tên xe',
        width: 250,
    },
    {
        field: 'tradeDate',
        headerName: 'Ngày giao dịch',
        width: 200,
        editable: false,
    },
    {
        field: 'nameStore',
        headerName: 'Tên cửa hàng',
        width: 240,
        editable: false,
    },
    {
        field: 'phone',
        headerName: 'Số điện thoại',
        width: 250,
        editable: false,
    },
    {
        field: 'price',
        headerName: 'Giá xe',
        width: 200,
        editable: false,
        ...vndPrice,
    },
    {
        field: 'isChange',
        headerName: 'Đổi/Trả',
        width: 160,
        editable: false,
        renderCell: (params) =>
            params.row.isChange === false ? (
                <Typography color="error">Từ chối</Typography>
            ) : (
                <Button sx={{ color: 'orange' }}>Đổi/Trả</Button>
            ),
    },
];

export const rows = [
    {
        id: 1,
        certNumber: 121231,
        motoName: 'Future Fi',
        tradeDate: '20/10/2023',
        nameStore: 'Phi Vũ',
        price: 20000000,
        phone: '0902199112',
        isChange: false,
    },
];

import { GridColDef } from '@mui/x-data-grid';

export const columns: GridColDef[] = [
    { field: 'id', headerName: 'Booking ID', width: 100 },
    {
        field: 'motorName',
        headerName: 'Tên xe',
        width: 240,
        editable: false,
    },
    {
        field: 'certificateNumber',
        headerName: 'Số Đăng Ký Xe',
        width: 240,
        editable: false,
    },
    {
        field: 'motorStatus',
        headerName: 'Trạng thái xe',
        width: 200,
    },
    {
        field: 'storeName',
        headerName: 'Tên cửa hàng',
        width: 200,
    },
    {
        field: 'storePhone',
        headerName: 'Số điện thoại cửa hàng',
        width: 250,
        editable: false,
    },
    {
        field: 'address',
        headerName: 'Địa chỉ cửa hàng',
        width: 200,
        editable: false,
    },

    {
        field: 'bookingDate',
        headerName: 'Ngày hẹn',
        width: 240,
        editable: false,
    },
    {
        field: 'note',
        headerName: 'Ghi Chú',
        width: 240,
        editable: false,
    },

    {
        field: 'status',
        headerName: 'Trạng thái',
        width: 240,
        editable: false,
    },
];

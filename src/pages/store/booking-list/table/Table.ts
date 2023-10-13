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
        headerName: 'Số đăng ký xe',
        width: 240,
        editable: false,
    },
    {
        field: 'storeName',
        headerName: 'Tên chủ xe',
        width: 200,
    },
    {
        field: 'storePhone',
        headerName: 'Số điện thoại chủ xe',
        width: 250,
        editable: false,
    },
    {
        field: 'address',
        headerName: 'Địa chỉ chủ xe',
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

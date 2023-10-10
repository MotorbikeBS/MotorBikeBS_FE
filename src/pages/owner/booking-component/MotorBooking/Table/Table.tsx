import { GridColDef } from '@mui/x-data-grid';

export const columns: GridColDef[] = [
    { field: 'id', headerName: 'Request ID', width: 100 },
    {
        field: 'storeName',
        headerName: 'Tên cửa hàng',
        width: 200,
    },
    {
        field: 'storeEmail',
        headerName: 'Email cửa hàng',
        width: 250,
        editable: false,
    },
    {
        field: 'idCard',
        headerName: 'CCCD/CMND',
        width: 250,
        editable: false,
    },
    {
        field: 'phone',
        headerName: 'Số điện thoại',
        width: 200,
        editable: false,
    },
    {
        field: 'userVerifyAt',
        headerName: 'Đăng Ký',
        width: 240,
        editable: false,
    },
    {
        field: 'roleTitle',
        headerName: 'Role',
        width: 240,
        editable: false,
    },

    {
        field: 'status',
        headerName: 'Status',
        width: 240,
        editable: false,
    },

];


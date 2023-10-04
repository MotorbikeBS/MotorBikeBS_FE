import { GridColDef } from '@mui/x-data-grid';

export const columns: GridColDef[] = [
    { field: 'id', headerName: 'User ID', width: 100 },
    {
        field: 'userName',
        headerName: 'Tên người dùng',
        width: 200,
    },
    {
        field: 'email',
        headerName: 'Email',
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


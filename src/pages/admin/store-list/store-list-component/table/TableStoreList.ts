import { GridColDef } from '@mui/x-data-grid';
export const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'storeId', headerName: 'Store ID', width: 100 },
    {
        field: 'storeName',
        headerName: 'Tên cửa hàng',
        width: 200,
    },
    {
        field: 'taxCode',
        headerName: 'Mã Số Thuế',
        width: 100,
        editable: false,
    },
    {
        field: 'storePhone',
        headerName: 'Số điện thoại',
        width: 200,
        editable: false,
    },
    {
        field: 'storeEmail',
        headerName: 'Email cửa hàng',
        width: 250,
        editable: false,
    },
    {
        field: 'address',
        headerName: 'Địa chỉ cửa hàng',
        width: 250,
        editable: false,
    },
    {
        field: 'storeCreatedAt',
        headerName: 'Ngày đăng ký',
        width: 250,
        editable: false,
    },
    {
        field: 'status',
        headerName: 'Status',
        width: 100,
        editable: false,
    },
];

import { GridColDef } from '@mui/x-data-grid';

export const columns: GridColDef[] = [
    { field: 'id', headerName: 'Brand ID', width: 300 },
    {
        field: 'brandName',
        headerName: 'Tên Brand',
        width: 300,
    },
    {
        field: 'description',
        headerName: 'Mô tả',
        width: 436,
        editable: false,
    },
    {
        field: 'status',
        headerName: 'Trạng thái',
        width: 450,
        editable: false,
    },
];


import { GridColDef } from '@mui/x-data-grid';

export const columns: GridColDef[] = [
    { field: 'id', headerName: 'Type ID', width: 300 },
    {
        field: 'title',
        headerName: 'Tên loại',
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

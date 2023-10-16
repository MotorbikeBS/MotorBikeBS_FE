import { GridColDef } from '@mui/x-data-grid';

export const columns: GridColDef[] = [
    { field: 'id', headerName: 'Type ID', width: 100 },
    {
        field: 'title',
        headerName: 'Tên loại',
        width: 200,
    },
    {
        field: 'description',
        headerName: 'Mô tả',
        width: 250,
        editable: false,
    },
    {
        field: 'status',
        headerName: 'Trạng thái',
        width: 240,
        editable: false,
    },
];

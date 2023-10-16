import { GridColDef } from '@mui/x-data-grid';

export const columns: GridColDef[] = [
    { field: 'id', headerName: 'Model ID', width: 100 },
    {
        field: 'modelName',
        headerName: 'Tên Model',
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
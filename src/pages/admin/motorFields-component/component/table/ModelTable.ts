import { GridColDef } from '@mui/x-data-grid';

export const columns: GridColDef[] = [
    { field: 'id', headerName: 'Model ID', width: 200 },
    {
        field: 'modelName',
        headerName: 'Tên Model',
        width: 300,
    },
    {
        field: 'description',
        headerName: 'Mô tả',
        width: 350,
        editable: false,
    },
    {
        field: 'brandName',
        headerName: 'Tên brand',
        width: 300,
        editable: false,
    },
    {
        field: 'status',
        headerName: 'Trạng thái',
        width: 335,
        editable: false,
    },
];
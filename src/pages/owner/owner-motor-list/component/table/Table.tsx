import { Typography } from '@mui/material';
import { GridColDef, GridColTypeDef } from '@mui/x-data-grid';
import '../../style/style.scss';

const currencyFormatter = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
});

const vndPrice: GridColTypeDef = {
    valueFormatter: ({ value }) => currencyFormatter.format(value),
    cellClassName: 'price_row',
    editable: false,
};

const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    });
};

export const columns: GridColDef[] = [
    { field: 'id', headerName: 'Motor ID', width: 100 },
    {
        field: 'certificateNumber',
        headerName: 'Số đăng ký',
        width: 150,
    },
    {
        field: 'motorName',
        headerName: 'Tên xe',
        width: 180,
        editable: false,
    },
    {
        field: 'odo',
        headerName: 'Số km',
        width: 150,
        editable: false,
    },
    {
        field: 'year',
        headerName: 'Năm đăng ký',
        width: 200,
        editable: false,
        valueFormatter: ({ value }) => formatDate(value),
    },
    {
        field: 'price',
        headerName: 'Giá',
        width: 160,
        editable: false,
        ...vndPrice,
    },
    {
        field: 'modelName',
        headerName: 'Model xe',
        width: 150,
        editable: false,
    },
    {
        field: 'motorType',
        headerName: 'Loại xe',
        width: 156,
        editable: false,
    },
    {
        field: 'motorStatus',
        headerName: 'Tình trạng',
        width: 240,
        editable: false,
        renderCell: (params) => params.row.motorStatus === 'Consignment' ? (
            <Typography sx={{ color: 'blue' }}>Consignment</Typography>
        ) : params.row.motorStatus === 'Storage' ? (
            <Typography sx={{ color: 'orange' }}>Storage</Typography>
        ) : (
            <Typography sx={{ color: 'green' }}>Posting</Typography>
        ),
    },
];

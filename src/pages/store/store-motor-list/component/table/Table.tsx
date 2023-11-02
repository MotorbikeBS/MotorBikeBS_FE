import { Typography } from '@mui/material';
import { GridColDef, GridColTypeDef } from '@mui/x-data-grid';
import ReportIcon from '@mui/icons-material/Report';

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
    { field: 'id', headerName: 'Motor ID', width: 100, hideable: true },
    {
        field: 'storeId',
        headerName: 'Cửa hàng ID',
        width: 120,
        hideable: true,
    },
    {
        field: 'certificateNumber',
        headerName: 'Số đăng ký',
        width: 150,
    },
    {
        field: 'images',
        headerName: 'Ảnh',
        width: 150,
        renderCell: (params) =>
            params.row.images ? (
                <img
                    src={params.row.images}
                    alt="Đây là ảnh sản phẩm"
                    width="70"
                    height="70"
                />
            ) : null,
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
        width: 120,
        editable: false,
    },
    {
        field: 'year',
        headerName: 'Năm đăng ký',
        width: 150,
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
        width: 120,
        editable: false,
    },
    {
        field: 'motorTypeName',
        headerName: 'Loại xe',
        width: 156,
        editable: false,
    },
    {
        field: 'motorStatus',
        headerName: 'Tình trạng',
        width: 150,
        editable: false,
        renderCell: (params) =>
            params.row.motorStatus === 'POSTING' ? (
                <Typography sx={{ color: 'green' }}>POSTING</Typography>
            ) : params.row.motorStatus === 'STORAGE' ? (
                <Typography sx={{ color: 'orange' }}>KHO XE</Typography>
            ) : params.row.motorStatus === 'CONSIGNMENT' ? (
                <Typography sx={{ color: '#E6A160' }}>KÍ GỞI</Typography>
            ) : (
                <Typography sx={{ color: '#3D609A' }}>KHÔNG KÍ GỞI</Typography>
            ),
    },
];

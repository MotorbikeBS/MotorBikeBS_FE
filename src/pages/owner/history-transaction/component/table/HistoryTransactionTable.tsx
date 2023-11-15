import { GridColDef, GridColTypeDef } from '@mui/x-data-grid';

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
    { field: 'id', headerName: 'Bill Id', width: 480, hideable: true },
    {
        field: 'motorId',
        headerName: 'Motor Id',
        width: 400,
        hideable: true,
    },
    {
        field: 'price',
        headerName: 'Giá',
        width: 600,
        ...vndPrice,
    },
    {
        field: 'createAt',
        headerName: 'Ngày tạo hóa đơn',
        editable: false,
        width: 400,
        valueFormatter: ({ value }) => formatDate(value),
    },
];

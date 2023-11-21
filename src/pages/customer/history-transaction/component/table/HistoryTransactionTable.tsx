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
    { field: 'id', headerName: 'Bill Id', width: 120, hideable: true },
    {
        field: 'motorId',
        headerName: 'Motor Id',
        width: 200,
        hideable: true,
    },
    {
        field: 'motorName',
        headerName: 'Tên xe',
        width: 280,
        hideable: true,
    },
    {
        field: 'certificateNumber',
        headerName: 'Số đăng ký xe',
        width: 200,
        hideable: true,
    },
    {
        field: 'price',
        headerName: 'Giá',
        width: 280,
        ...vndPrice,
    },
    {
        field: 'storeName',
        headerName: 'Tên cửa hàng',
        width: 300,
    },
    {
        field: 'createAt',
        headerName: 'Ngày tạo hóa đơn',
        editable: false,
        width: 300,
        valueFormatter: ({ value }) => formatDate(value),
    },
];

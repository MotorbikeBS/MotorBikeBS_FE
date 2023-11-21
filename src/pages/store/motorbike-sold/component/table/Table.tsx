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
    { field: 'id', headerName: 'Bill Id', width: 180, hideable: true },
    {
        field: 'motorId',
        headerName: 'Motor Id',
        width: 200,
        hideable: true,
    },
    {
        field: 'motorName',
        headerName: 'Tên xe',
        width: 250,
        hideable: true,
    },
    {
        field: 'certificateNumber',
        headerName: 'Số đăng ký xe',
        width: 220,
        hideable: true,
    },

    {
        field: 'buyer',
        headerName: 'Người mua',
        width: 230,
        hideable: true,
    },
    {
        field: 'consignor',
        headerName: 'Người kí gửi',
        hideable: true,
        width: 230,
    },
    {
        field: 'price',
        headerName: 'Giá',
        width: 300,
        ...vndPrice,
    },
    {
        field: 'createAt',
        headerName: 'Ngày tạo hóa đơn',
        editable: false,
        width: 300,
        valueFormatter: ({ value }) => formatDate(value),
    },
];

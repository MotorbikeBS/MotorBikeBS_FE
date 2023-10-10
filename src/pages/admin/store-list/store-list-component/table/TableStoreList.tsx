import { GridColDef } from '@mui/x-data-grid';
export const columns: GridColDef[] = [
    { field: 'id', headerName: 'User ID', width: 100 },
    { field: 'storeId', headerName: 'Store ID', width: 100 },
    {
        field: 'storeName',
        headerName: 'Tên cửa hàng',
        width: 200,
    },
    {
        field: 'businessLicense',
        headerName: 'Giấy phép kinh doanh',
        width: 200,
        renderCell: (params) => (
            <div>
                {params.row.businessLicense && (
                    <img
                        src={params.row.businessLicense}
                        alt='Business License'
                        style={{ width: '30%', height: '30%', objectFit: 'cover' }}
                    />
                )}
            </div>
        ),
    },
    {
        field: 'taxCode',
        headerName: 'Mã Số Thuế',
        width: 100,
        editable: false,
    },
    {
        field: 'storePhone',
        headerName: 'Số điện thoại',
        width: 200,
        editable: false,
    },
    {
        field: 'storeEmail',
        headerName: 'Email cửa hàng',
        width: 250,
        editable: false,
    },
    {
        field: 'address',
        headerName: 'Địa chỉ cửa hàng',
        width: 250,
        editable: false,
    },
    {
        field: 'storeCreatedAt',
        headerName: 'Ngày đăng ký',
        width: 250,
        editable: false,
    },
    {
        field: 'storeUpdatedAt',
        headerName: 'Ngày cập nhật',
        width: 250,
        editable: false,
    },
    {
        field: 'status',
        headerName: 'Status',
        width: 100,
        editable: false,
    },
];

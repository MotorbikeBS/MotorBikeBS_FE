import { Typography } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';

const currencyFormatter = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
});

export const columns: GridColDef[] = [
    { field: 'id', headerName: 'Negotiation ID', width: 100 },
    { field: 'motorName', headerName: 'Tên Xe', width: 100 },
    {
        field: 'images',
        headerName: 'Ảnh',
        width: 200,
        renderCell: (params) => (
            <div>
                {params.row.images && (
                    <img
                        src={params.row.images}
                        alt="Business License"
                        style={{
                            width: '30%',
                            height: '30%',
                            objectFit: 'cover',
                        }}
                    />
                )}
            </div>
        ),
    },
    {
        field: 'certificateNumber',
        headerName: 'Số đăng ký',
        width: 150,
    },
    {
        field: 'year',
        headerName: 'Năm đăng ký',
        width: 200,
        editable: false,
    },
    {
        field: 'pricce',
        headerName: 'Giá thương lượng',
        width: 200,
        editable: false,
        renderCell: (params) =>
            params.row.price > 0 ?
                (<Typography
                    color='#fab71b'
                    fontWeight='700'
                >
                    {currencyFormatter.format(params.row.price)}
                </Typography>) : (
                    <Typography
                        color='#ad1e02'
                    >
                        Chưa nhập giá
                    </Typography>
                ),
    },
    {
        field: 'startTime',
        headerName: 'Ngày nhận',
        width: 200,
        editable: false,
    },
    {
        field: 'endTime',
        headerName: 'Ngày kết thúc',
        width: 200,
        editable: false,
    },
    {
        field: 'storeName',
        headerName: 'Tên cửa hàng',
        width: 200,
    },
    {
        field: 'storePhone',
        headerName: 'Số điện thoại cửa hàng',
        width: 250,
        editable: false,
    },
    {
        field: 'storeAddress',
        headerName: 'Địa chỉ cửa hàng',
        width: 200,
        editable: false,
    },
    {
        field: 'noteNegotiation',
        headerName: 'Nội dung thương lượng',
        width: 200,
        editable: false,
    },
    {
        field: 'negotiationStatus',
        headerName: 'Tình trạng thương lượng',
        width: 150,
        editable: false,
        renderCell: (params) =>
            params.row.negotiationStatus === 'PENDING' ? (
                <Typography sx={{ color: 'red', fontWeight: '700' }}>Đang Chờ</Typography>
            ) : params.row.negotiationStatus === 'ACCEPT' ? (
                <Typography sx={{ color: 'green', fontWeight: '700' }}>Đã Duyệt</Typography>
            ) : (
                <Typography></Typography>
            ),
    },
    {
        field: 'motorStatus',
        headerName: 'Tình trạng xe',
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

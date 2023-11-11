import { Typography } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';

const currencyFormatter = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
});


export const columns: GridColDef[] = [
    { field: 'id', headerName: 'Valuation ID', width: 100 },
    { field: 'motorName', headerName: 'Tên xe', width: 100 },
    {
        field: 'images',
        headerName: 'Ảnh xe',
        width: 200,
        renderCell: (params) => (
            <div>
                {params.row.images && (
                    <img
                        src={params.row.images}
                        alt='Ảnh xe'
                        style={{ width: '30%', height: '30%', objectFit: 'cover' }}
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
        field: 'price',
        headerName: 'Giá ban đầu',
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
        field: 'storePrice',
        headerName: 'Giá đề xuất',
        width: 200,
        editable: false,
        renderCell: (params) =>
            params.row.storePrice > 0 ?
                (<Typography
                    color='red'
                    fontWeight='700'
                >
                    {currencyFormatter.format(params.row.storePrice)}
                </Typography>) : (
                    <Typography
                        color='#ad1e02'
                    >
                        Chưa nhập giá
                    </Typography>
                ),
    },
    {
        field: 'ownerName',
        headerName: 'Tên chủ xe',
        width: 200,
    },
    {
        field: 'ownerPhone',
        headerName: 'Số điện thoại chủ xe',
        width: 250,
        editable: false,
    },
    {
        field: 'ownerAddress',
        headerName: 'Địa chỉ chủ xe',
        width: 200,
        editable: false,
    },
    {
        field: 'noteValuation',
        headerName: 'Ghi chú',
        width: 200,
        editable: false,
    },
    {
        field: 'valuationStatus',
        headerName: 'Trạng thái yêu cầu',
        width: 150,
        editable: false,
        renderCell: (params) =>
            params.row.valuationStatus === 'PENDING' ? (

                <Typography sx={{ color: 'red', fontWeight: '700' }}>Đang Chờ</Typography>
            ) : params.row.valuationStatus === 'ACCEPT' ? (
                <Typography sx={{ color: 'green', fontWeight: '700' }}>Chấp nhận</Typography>
            ) : (
                <></>
            )
    },
    {
        field: 'motorStatus',
        headerName: 'Tình trạng xe',
        width: 150,
        editable: false,
        renderCell: (params) =>
            params.row.motorStatus === 'LIVELIHOOD' ? (
                <Typography sx={{ color: 'green' }}>KHÔNG KÍ GỞI</Typography>
            ) : params.row.motorStatus === 'POSTING' ? (
                <Typography sx={{ color: 'green' }}>POSTING</Typography>
            ) : params.row.motorStatus === 'STORAGE' ? (
                <Typography sx={{ color: 'orange' }}>KHO XE</Typography>
            ) : params.row.motorStatus === 'CONSIGNMENT' ? (
                <Typography sx={{ color: '#E6A160' }}>KÍ GỞI</Typography>
            ) : (
                <Typography sx={{ color: '#3D609A' }}>CHƯA XÁC ĐỊNH</Typography>
            ),
    },
]
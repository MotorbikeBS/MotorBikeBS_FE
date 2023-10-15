import { Typography } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
export const columns: GridColDef[] = [
    { field: 'id', headerName: 'Negotiation', width: 100 },
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
                        alt='Business License'
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
        headerName: 'Giá',
        width: 160,
        editable: false,
    },
    {
        field: 'storePrice',
        headerName: 'Giá Store Đưa Ra',
        width: 200,
        editable: false,
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
]
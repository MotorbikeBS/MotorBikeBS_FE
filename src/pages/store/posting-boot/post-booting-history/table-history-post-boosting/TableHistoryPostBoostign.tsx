import { Typography } from '@mui/material';
import { GridColDef, GridColTypeDef } from '@mui/x-data-grid';


export const columns: GridColDef[] = [
    { field: 'id', headerName: 'PostBoosting ID', width: 180, hideable: true },
    {
        field: 'motorName',
        headerName: 'Tên Xe',
        width: 200,
        hideable: true,
    },
    {
        field: 'certificateNumber',
        headerName: 'Số đăng ký',
        width: 200,
        hideable: true,
    },
    {
        field: 'startTime',
        headerName: 'Ngày đẩy bài',
        width: 200,
        hideable: true,
    },
    {
        field: 'endTime',
        headerName: 'Ngày Kết thúc',
        width: 200,
        hideable: true,
    },
    {
        field: 'level',
        headerName: 'Gói đẩy bài',
        width: 100,
        hideable: true,
        renderCell: (params) =>
            params.row.level === 1 ? (
                <Typography color='#f7d71e' fontWeight='700'>Default</Typography>
            ) : params.row.level === 2 ? (
                <Typography color='#63f2ab' fontWeight='700'>Medium</Typography>
            ) : params.row.level === 3 ? (
                <Typography color='#057a40' fontWeight='700'>Premium</Typography>
            ) : (
                <></>
            )
    },
    {
        field: 'qty',
        headerName: 'Số điểm đã trừ',
        width: 150,
        hideable: true,
        renderCell: (params) =>
            params.row.qty > 0 && (
                <Typography color='red' fontWeight='700'>- {params.row.qty}</Typography>
            )
    },
    {
        field: 'status',
        headerName: 'Trạng thái đẩy bài',
        width: 200,
        hideable: true,
        renderCell: (params) =>
            params.row.status === 'ACCEPT' ? (
                <Typography color='green' fontWeight='700'>ĐANG ĐẨY BÀI</Typography>
            ) : params.row.status === 'CANCEL' ? (
                <Typography color='red' fontWeight='700'>Hết Hạn</Typography>
            ) : (
                <></>
            )
    },
]
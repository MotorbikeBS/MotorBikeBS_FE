import { Typography } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';

export const columns: GridColDef[] = [
    {
        field: 'id',
        headerName: 'Report ID',
        width: 180,
        hideable: true
    },
    {
        field: 'imageReport',
        headerName: 'Bằng chứng',
        width: 200,
        hideable: true,
        renderCell: (params) => (
            <div>
                {params.row.imageReport && (
                    <img
                        src={params.row.imageReport}
                        alt='Business License'
                        style={{ width: '30%', height: '30%', objectFit: 'cover' }}
                    />
                )}
            </div>
        )
    },
    {
        field: 'title',
        headerName: 'Tiêu đề báo cáo',
        width: 180,
        hideable: true
    },
    {
        field: 'description',
        headerName: 'Nội dung báo cáo',
        width: 180,
        hideable: true
    },
    {
        field: 'reportStore',
        headerName: 'Cửa hàng bị báo cáo',
        width: 240,
        hideable: true
    },
    {
        field: 'storePhone',
        headerName: 'Số điện thoại cửa hàng',
        width: 240,
        hideable: true
    },
    {
        field: 'sender',
        headerName: 'Người báo cáo',
        width: 240,
        hideable: true
    },
]
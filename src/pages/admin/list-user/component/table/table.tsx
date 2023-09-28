import { GridColDef } from '@mui/x-data-grid';


export const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 100 },
    {
        field: 'userName',
        headerName: 'Tên người dùng',
        width: 200,
    },
    {
        field: 'email',
        headerName: 'Email',
        width: 250,
        editable: false,
    },
    {
        field: 'phone',
        headerName: 'Số điện thoại',
        width: 200,
        editable: false,
    },
    {
        field: 'roleName',
        headerName: 'Role',
        width: 240,
        editable: false,
    },
    // {
    //     field: 'phone',
    //     headerName: 'Số điện thoại',
    //     width: 200,
    //     editable: false,
    // },
    // {
    //     field: 'price',
    //     headerName: 'Giá xe',
    //     width: 200,
    //     editable: false,
    //     ...vndPrice,
    // },
    // {
    //     field: 'status',
    //     headerName: 'Trạng thái',
    //     width: 200,
    //     editable: false,
    //     renderCell: (params) =>
    //         params.row.status === 'isCancel' ? (
    //             <Typography color="error">Từ chối</Typography>
    //         ) : params.row.status === 'isApprove' ? (
    //             <Typography sx={{ color: 'green' }}>Đã duyệt</Typography>
    //         ) : (
    //             <Typography sx={{ color: 'orange' }}>Chờ duyệt</Typography>
    //         ),
    // },
];

export const rows = [
    {
        id: 1,
        userName: 'Minh Trí',
        email: 'phanminhtri269@gmail.com',
        phone: '0902199112',
        roleName: 'Customer',
        // nameStore: 'Phi Vũ',
        // price: 20000000,
        // status: 'isApprove',
    },
    {
        id: 2,
        userName: 'Minh Trí',
        email: 'phanminhtri269@gmail.com',
        phone: '0902199112',
        roleName: 'Customer',
        // nameStore: 'Phi Vũ',
        // price: 20000000,
        // status: 'isApprove',
    },
    {
        id: 3,
        userName: 'Minh Trí',
        email: 'phanminhtri269@gmail.com',
        phone: '0902199112',
        roleName: 'Customer',
        // nameStore: 'Phi Vũ',
        // price: 20000000,
        // status: 'isApprove',
    },
    {
        id: 4,
        userName: 'Minh Trí',
        email: 'phanminhtri269@gmail.com',
        phone: '0902199112',
        roleName: 'Customer',
        // nameStore: 'Phi Vũ',
        // price: 20000000,
        // status: 'isWaiting',
    },
    {
        id: 5,
        userName: 'Minh Trí',
        email: 'phanminhtri269@gmail.com',
        phone: '0902199112',
        roleName: 'Customer',
        // nameStore: 'Phi Vũ',
        // price: 20000000,
        // status: 'isWaiting',
    },
    {
        id: 6,
        userName: 'Minh Trí',
        email: 'phanminhtri269@gmail.com',
        phone: '0902199112',
        roleName: 'Customer',
        // nameStore: 'Phi Vũ',
        // price: 20000000,
        // status: 'isCancel',
    },
    {
        id: 7,
        userName: 'Minh Trí',
        email: 'phanminhtri269@gmail.com',
        phone: '0902199112',
        roleName: 'Customer',
        // nameStore: 'Phi Vũ',
        // price: 20000000,
        // status: 'isWaiting',
    },
];

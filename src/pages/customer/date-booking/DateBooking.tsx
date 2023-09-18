import React from 'react';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { Box } from '@mui/material';
import CustomerMenuComponent from '../customer-menu-component/CustomerMenuComponent';
import FooterComponent from '../../../common-components/footer-component/FooterComponent';

const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 100 },
    {
        field: 'motoName',
        headerName: 'Tên xe',
        width: 200,
        editable: true,
    },
    {
        field: 'bookingDate',
        headerName: 'Ngày xem xe',
        width: 200,
        editable: true,
    },
    {
        field: 'dateCreated',
        headerName: 'Ngày tạo lịch',
        width: 200,
        editable: true,
    },
    {
        field: 'nameStore',
        headerName: 'Tên cửa hàng',
        width: 240,
    },
    {
        field: 'price',
        headerName: 'Giá xe',
        headerAlign: 'left',
        align: 'left',
        type: 'number',
        width: 200,
        editable: true,
    },
    {
        field: 'status',
        headerName: 'Trạng thái',
        width: 200,
    },
];

const rows = [
    {
        id: 1,
        motoName: 'Future Fi',
        bookingDate: '20/10/2023',
        dateCreated: '20/10/2023',
        nameStore: 'Phi Vũ',
        price: 20000000,
        status: 'Đã duyệt'
    },
    {
        id: 2,
        motoName: 'Future Fi',
        bookingDate: '20/10/2023',
        dateCreated: '20/10/2023',
        nameStore: 'Phi Vũ',
        price: 20000000,
        status: 'Đã duyệt'
    },
    {
        id: 3,
        motoName: 'Future Fi',
        bookingDate: '20/10/2023',
        dateCreated: '20/10/2023',
        nameStore: 'Phi Vũ',
        price: 20000000,
        status: 'Đã duyệt'

    },
    {
        id: 4,
        motoName: 'Future Fi',
        bookingDate: '20/10/2023',
        dateCreated: '20/10/2023',
        nameStore: 'Phi Vũ',
        price: 20000000,
        status: 'Chờ duyệt'

    },
    {
        id: 5,
        motoName: 'Future Fi',
        bookingDate: '20/10/2023',
        dateCreated: '20/10/2023',
        nameStore: 'Phi Vũ',
        price: 20000000,
        status: 'Chờ duyệt'

    },
    {
        id: 6,
        motoName: 'Future Fi',
        bookingDate: '20/10/2023',
        dateCreated: '20/10/2023',
        nameStore: 'Phi Vũ',
        price: 20000000,
        status: 'Từ chối'

    },
    {
        id: 7,
        motoName: 'Future Fi',
        bookingDate: '20/10/2023',
        dateCreated: '20/10/2023',
        nameStore: 'Phi Vũ',
        price: 20000000,
        status: 'Chờ duyệt'

    },
];

const DateBooking = () => {
    return (
        <>
            <CustomerMenuComponent />
            <Box m={6}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 5,
                            },
                        },
                    }}
                    pageSizeOptions={[5]}
                />
            </Box>
            <Box flexGrow={1} className="footer-style">
                <FooterComponent />
            </Box>
        </>
    );
};

export default DateBooking;

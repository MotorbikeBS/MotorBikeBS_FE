import React, { useEffect, useMemo } from 'react';
import { Container } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { columns } from './table/HistoryTransactionTable';
import {
    useAppDispatch,
    useAppSelector,
} from '../../../../services/store/store';
import { IBill } from '../../../../models/Bill/Bill';
import {
    clearBill,
    getBillByUserId,
} from '../../../../services/features/bill/billSlice';

const HistoryTransactionComponent = () => {
    const dispatch = useAppDispatch();
    const { account } = useAppSelector((state) => state.account);
    const { billUser, loading } = useAppSelector((state) => state.bill);

    useEffect(() => {
        dispatch(clearBill());
        dispatch(getBillByUserId({ userId: Number(account?.userId) }));
    }, [dispatch, account]);

    const rows = useMemo(() => {
        return (
            billUser ??
            [].map((bill: IBill) => ({
                id: bill.billConfirmId,
                motorId: bill?.motorId,
                price: bill?.price,
                createAt: bill?.createAt,
            }))
        );
    }, [billUser]);

    return (
        <Container maxWidth="xl">
            <div
                style={{
                    marginBottom: '32px',
                    width: '100%',
                }}
            >
                <DataGrid
                    sx={{
                        '& .css-gl260s-MuiDataGrid-columnHeadersInner': {
                            background: '#ccc',
                        },
                    }}
                    rows={rows}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 5 },
                        },
                    }}
                    pageSizeOptions={[5, 10, 100]}
                    disableRowSelectionOnClick
                    autoHeight
                    localeText={{
                        noRowsLabel: 'Không có dữ liệu',
                    }}
                    loading={loading}
                    // onRowDoubleClick={handleRowDoubleClick}
                />
            </div>
        </Container>
    );
};

export default HistoryTransactionComponent;

import React, { useEffect, useMemo } from 'react';
import { Container } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { columns } from './table/Table';
import {
    useAppDispatch,
    useAppSelector,
} from '../../../../services/store/store';
import {
    clearBill,
    getBillByStoreId,
} from '../../../../services/features/bill/billSlice';
import { IBill } from '../../../../models/Bill/Bill';
import { getUserByID } from '../../../../services/features/user/userSlice';

const MotorbikeSoldComponent = () => {
    const dispatch = useAppDispatch();
    const { billStore } = useAppSelector((state) => state.bill);
    const { account } = useAppSelector((state) => state.account);
    const { user } = useAppSelector((state) => state.users);


    useEffect(() => {
        if (account && account.userId) {
            dispatch(getUserByID({ id: Number(account.userId) }));
        }
    }, [dispatch, account]);

    useEffect(() => {
        dispatch(clearBill());
        dispatch(
            getBillByStoreId({
                receiverId: Number(user?.storeDesciptions[0]?.storeId),
            }),
        );
    }, [dispatch, user]);

    const rows = useMemo(() => {
        return (billStore ?? []).map((bill: IBill) => ({
            id: bill.billConfirmId,
            motorId: bill?.motorId,
            price: bill?.price,
            createAt: bill?.createAt,
        }));
    }, [billStore]);
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
                    // onRowDoubleClick={handleRowDoubleClick}
                />
            </div>
        </Container>
    );
};

export default MotorbikeSoldComponent;

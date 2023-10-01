import React, { useEffect, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../services/store/store';
import { getAllStore } from '../../../../services/features/storeSlice';
import { IStore } from '../../../../models/Store/Store';
import { Container, Typography, Paper } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { columns } from './table/TableStoreList';

const StoreListNotVerify = () => {
    const dispatch = useAppDispatch();
    const { stores } = useAppSelector((state) => state.store);

    useEffect(() => {
        dispatch(getAllStore());
    }, [dispatch]);

    const notVerifiedStores = useMemo(() => {
        return (stores ?? []).filter((store: IStore) => store.status === 'NOT VERIFY');
    }, [stores]);

    const rows = useMemo(() => {
        return notVerifiedStores.map((store: IStore) => ({
            id: store.storeId,
            storeName: store.storeName,
            taxCode: store.taxCode,
            storePhone: store.storePhone,
            storeEmail: store.storeEmail,
            storeCreateAt: store.storeCreatedAt,
            status: store.status,
        }));
    }, [stores]);

    return (
        <Container maxWidth="xl">
            <Paper style={{ marginBottom: '20px', padding: '20px' }}>
                <Typography variant="h4" gutterBottom>
                    Danh sách cửa hàng chưa xác thực
                </Typography>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSizeOptions={[5, 10, 100, 200]}
                    disableRowSelectionOnClick
                />
            </Paper>
        </Container>
    );
};

export default StoreListNotVerify;

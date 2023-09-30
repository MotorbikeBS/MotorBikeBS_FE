import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../services/store/store';
import { getAllStore } from '../../../../services/features/storeSlice';
import { IStore } from '../../../../models/Store/Store';
import { Container, Typography, Paper } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { columns } from './table/TableStoreList';

const StoreListComponent = () => {
    const dispatch = useAppDispatch();
    const { stores } = useAppSelector((state) => state.store);

    useEffect(() => {
        dispatch(getAllStore());
    }, [dispatch]);

    const filterStoresByStatus = (status: string) =>
        (stores ?? []).filter((store: IStore) => store.status === status);

    const rowMapper = (store: IStore) => ({
        id: store.storeId,
        storeName: store.storeName,
        taxCode: store.taxCode,
        storePhone: store.storePhone,
        storeEmail: store.storeEmail,
        storeCreateAt: store.storeCreatedAt,
        status: store.status,
    });

    const activeStores = filterStoresByStatus('ACTIVE').map(rowMapper);
    const notVerifyStores = filterStoresByStatus('NOT VERIFY').map(rowMapper);

    return (
        <Container maxWidth="xl">
            <Paper style={{ marginBottom: '20px', padding: '20px' }}>
                <Typography variant="h4" gutterBottom>
                    Danh sách cửa hàng đang hoạt động
                </Typography>
                <DataGrid
                    rows={activeStores}
                    columns={columns}
                    pageSizeOptions={[5, 10, 100, 200]}
                />
            </Paper>
            <Paper style={{ marginBottom: '20px', padding: '20px' }}>
                <Typography variant="h4" gutterBottom>
                    Danh sách cửa hàng chưa xác minh
                </Typography>
                <DataGrid
                    rows={notVerifyStores}
                    columns={columns}
                    pageSizeOptions={[5, 10, 100, 200]}
                />
            </Paper>
        </Container>
    );
};

export default StoreListComponent;

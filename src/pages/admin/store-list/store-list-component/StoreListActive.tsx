import React, { useEffect, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../services/store/store';
import { Container, Paper, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { columns } from './table/TableStoreList';
import { getAllStore } from '../../../../services/features/storeSlice';
import { IStore } from '../../../../models/Store/Store';

const StoreListActive = () => {
    const dispatch = useAppDispatch();
    const { stores } = useAppSelector((state) => state.store);

    useEffect(() => {
        dispatch(getAllStore());
    }, [dispatch]);

    const VerifiedStores = useMemo(() => {
        return (stores ?? []).filter((store: IStore) => store.status === 'ACTIVE');
    }, [stores]);

    const rows = useMemo(() => {
        return VerifiedStores.map((store: IStore) => ({
            id: store.storeId,
            storeName: store.storeName,
            taxCode: store.taxCode,
            storePhone: store.storePhone,
            storeEmail: store.storeEmail,
            storeCreateAt: store.storeCreatedAt,
            status: store.status,
        }));
    }, [VerifiedStores]);

    return (
        <Container maxWidth="xl">
            <Paper style={{ marginBottom: '20px', padding: '20px' }}>
                <Typography variant="h4" gutterBottom>
                    Danh sách cửa hàng đã xác thực
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

export default StoreListActive;

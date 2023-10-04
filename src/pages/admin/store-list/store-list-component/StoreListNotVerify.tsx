// StoreListNotVerify.js
import React, { useEffect, useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../services/store/store';
import { getAllStore } from '../../../../services/features/storeSlice';
import { IStore } from '../../../../models/Store/Store';
import { Container, Typography, Paper } from '@mui/material';
import { DataGrid, GridRowParams } from '@mui/x-data-grid';
import StoreModal from '../ModalComponent/StoreModalComponent';
import { columns } from './table/TableStoreList';

const StoreListNotVerify = () => {
    const dispatch = useAppDispatch();
    const { stores } = useAppSelector((state) => state.store);
    const [selectedRow, setSelectedRow] = useState<IStore | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        dispatch(getAllStore());
    }, [dispatch]);


    const notVerifiedStores = useMemo(() => {
        return (stores ?? []).filter((store: IStore) => store.status === 'NOT VERIFY');
    }, [stores]);

    const rows = useMemo(() => {
        return notVerifiedStores.map((store: IStore) => ({
            id: store.userId,
            storeId: store.storeId,
            storeName: store.storeName,
            taxCode: store.taxCode,
            storePhone: store.storePhone,
            storeEmail: store.storeEmail,
            address: store.address,
            storeCreatedAt: store.storeCreatedAt,
            status: store.status,
        }));
    }, [stores]);

    const handleRowDoubleClick = (params: GridRowParams) => {
        setSelectedRow(params.row as IStore);
        setIsModalOpen(true);
    };

    return (
        <Container maxWidth="xl">
            <Paper style={{ marginBottom: '20px', padding: '20px' }}>
                <Typography variant="h4" gutterBottom>
                    Danh sách cửa hàng chưa xác thực
                </Typography>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSizeOptions={[5, 10, 100]}
                    disableRowSelectionOnClick
                    onRowDoubleClick={handleRowDoubleClick}
                />
            </Paper>
            <StoreModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} data={selectedRow} />
        </Container>
    );
};

export default StoreListNotVerify;

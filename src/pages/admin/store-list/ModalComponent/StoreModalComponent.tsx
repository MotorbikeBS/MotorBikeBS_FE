import React from 'react';
import {
    Modal,
    Typography,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
} from '@mui/material';
import { IStore } from '../../../../models/Store/Store';
import { useAppDispatch, useAppSelector } from '../../../../services/store/store';
import { verifyStore } from '../../../../services/features/storeSlice';

interface StoreModalProps {
    isOpen: boolean;
    onClose: () => void;
    data: IStore | null;
}

const StoreModal: React.FC<StoreModalProps> = ({ isOpen, onClose, data }) => {
    const dispatch = useAppDispatch();
    const { store } = useAppSelector((state) => state.store);

    if (!data) {
        return null;
    }

    const columns = [
        { id: 'storeId', label: 'ID cửa hàng' },
        { id: 'storeName', label: 'Tên cửa hàng' },
        { id: 'taxCode', label: 'Mã số thuế' },
        { id: 'storePhone', label: 'Số điện thoại' },
        { id: 'storeEmail', label: 'Email' },
        { id: 'address', label: 'Địa chỉ cửa hàng' },
        { id: 'storeCreatedAt', label: 'Ngày tạo' },
        { id: 'status', label: 'Trạng thái' },
    ];

    const createData = (label: string, value: string | number | null) => ({ label, value });

    const rows = [
        createData('ID cửa hàng', data.storeId),
        createData('Tên cửa hàng', data.storeName),
        createData('Mã số thuế', data.taxCode),
        createData('Số điện thoại', data.storePhone),
        createData('Email', data.storeEmail),
        createData('Địa chỉ cửa hàng', data.address),
        createData('Ngày tạo', data.storeCreatedAt ? data.storeCreatedAt.toLocaleString() : 'N/A'),
        createData('Trạng thái', data.status),
    ];

    const handleActive = () => {
        if (data && data.storeId) {
            dispatch(verifyStore({ storeId: data.storeId }));
        }
    };

    return (
        <Modal open={isOpen} onClose={onClose}>
            <div
                style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    padding: '20px',
                    backgroundColor: 'white',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Typography variant="h4" gutterBottom>
                    Thông tin cửa hàng
                </Typography>
                <TableContainer component={Paper}>
                    <Table>
                        <TableBody>
                            {rows.map((row) => (
                                <TableRow key={row.label}>
                                    <TableCell component="th" scope="row">
                                        {row.label}
                                    </TableCell>
                                    <TableCell align="left">{row.value}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Button
                    variant="contained"
                    color="success"
                    style={{
                        position: 'absolute',
                        bottom: '16%',
                        right: '20px',
                    }}
                    onClick={handleActive}
                >
                    ACTIVE
                </Button>
                <div>
                    <Button
                        onClick={onClose}
                        variant="contained"
                        color="primary"
                        style={{
                            marginTop: '20px',
                        }}
                    >
                        Đóng
                    </Button>
                </div>
            </div>
        </Modal>
    );
};

export default StoreModal;

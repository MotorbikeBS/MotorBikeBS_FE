import React from 'react';
import {
    Modal,
    Typography,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Paper,
    Grid,
} from '@mui/material';
import { IStore } from '../../../../models/Store/Store';
import { useAppDispatch } from '../../../../services/store/store';
import { inActiveStore, reActiveStore, refuseStore, verifyStore } from '../../../../services/features/storeSlice';
import './style/style.scss'
interface StoreModalProps {
    isOpen: boolean;
    onClose: () => void;
    data: IStore | null;
}

const StoreModal: React.FC<StoreModalProps> = ({ isOpen, onClose, data }) => {
    const dispatch = useAppDispatch();

    if (!data) {
        return null;
    }


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
        onClose();
    };
    const handleRefuse = () => {
        if (data && data.storeId) {
            dispatch(refuseStore({ storeId: data.storeId }));
        }
        onClose();
    };

    const handleInActive = () => {
        if (data && data.storeId) {
            dispatch(inActiveStore({ storeId: data.storeId }))
        }
        onClose();
    }
    const handleReActive = () => {
        if (data && data.storeId) {
            dispatch(reActiveStore({ storeId: data.storeId }))
        }
        onClose()
    }

    return (
        <Modal open={isOpen} onClose={onClose}>
            <div className='modal-container'>
                <Typography variant="h4" gutterBottom fontWeight='700'>
                    Thông tin cửa hàng {data.storeName}
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
                {data.status === 'NOT VERIFY' && (
                    <Grid className='btn-status'>
                        <div>
                            <Button
                                variant="contained"
                                color="success"
                                onClick={handleActive}
                            >
                                ACTIVE
                            </Button>
                        </div>
                        <div>
                            <Button
                                variant="contained"
                                color="error"
                                onClick={handleRefuse}
                            >
                                REFUSE
                            </Button>
                        </div>
                    </Grid>
                )}

                {data.status === 'ACTIVE' && (
                    <Grid>
                        <div>
                            <Button
                                variant="contained"
                                color="error"
                                style={{
                                    position: 'absolute',
                                    bottom: '16%',
                                    right: '24px',
                                }}
                                onClick={handleInActive}
                            >
                                IN-ACTIVE
                            </Button>
                        </div>
                    </Grid>
                )}
                {data.status === 'INACTIVE' && (
                    <Grid>
                        <div>
                            <Button
                                variant="contained"
                                color="warning"
                                style={{
                                    position: 'absolute',
                                    bottom: '16%',
                                    right: '24px',
                                }}
                                onClick={handleReActive}
                            >
                                RE-ACTIVE
                            </Button>
                        </div>
                    </Grid>
                )}
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

import React, { ReactNode, useState } from 'react';
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
    Box,
} from '@mui/material';
import { ClearRounded } from '@mui/icons-material';
import { IStore } from '../../../../../models/Store/Store';
import { useAppDispatch } from '../../../../../services/store/store';
import { inActiveStore, reActiveStore, refuseStore, verifyStore } from '../../../../../services/features/store/storeSlice';
import '../style/style.scss';
import FullScreenImageDialog from './FullScreenImageDialog';

interface StoreModalProps {
    isOpen: boolean;
    onClose: () => void;
    loadData: () => void;
    data: IStore | null;
}

const StoreModal: React.FC<StoreModalProps> = ({
    isOpen,
    onClose,
    data,
    loadData
}) => {
    const dispatch = useAppDispatch();
    const [fullscreenOpen, setFullscreenOpen] = useState(false);

    if (!data) {
        return null;
    }

    const createData = (label: string, value: ReactNode) => ({ label, value });

    const rows = [
        createData('ID cửa hàng', data.storeId),
        createData('Tên cửa hàng', data.storeName),
        createData('Giấy phép kinh doanh', (
            <div className='business-license-container'>
                <img
                    src={data.businessLicense}
                    alt='Business License'
                    className='business-license-image'
                    style={{ width: '100px', height: 'auto' }}
                    onClick={() => setFullscreenOpen(true)}

                />
            </div>
        )),
        createData('Mã số thuế', data.taxCode),
        createData('Số điện thoại', data.storePhone),
        createData('Email', data.storeEmail),
        createData('Địa chỉ cửa hàng', data.address),
        createData('Ngày tạo', data.storeCreatedAt ? data.storeCreatedAt.toLocaleString() : 'N/A'),
        createData('Trạng thái', data.status),
    ];

    const handleActive = () => {
        if (data && data.storeId) {
            dispatch(verifyStore({ storeId: data.storeId }))
                .then(() => {
                    loadData();
                    setTimeout(() => {
                        onClose();
                    }, 1000);
                });
        }
    };

    const handleRefuse = () => {
        if (data && data.storeId) {
            dispatch(refuseStore({ storeId: data.storeId }))
                .then(() => {
                    loadData();
                    setTimeout(() => {
                        onClose();
                    }, 1000);
                });
        }
    };

    const handleInActive = () => {
        if (data && data.storeId) {
            dispatch(inActiveStore({ storeId: data.storeId }))
                .then(() => {
                    loadData();
                    setTimeout(() => {
                        onClose();
                    }, 1000);
                });
        }
    };

    const handleReActive = () => {
        if (data && data.storeId) {
            dispatch(reActiveStore({ storeId: data.storeId }))
                .then(() => {
                    loadData();
                    setTimeout(() => {
                        onClose();
                    }, 1000);
                })
                .catch(() => {
                    onClose();
                });
        }
    };

    return (
        <>
            <Modal open={isOpen} onClose={onClose}>
                <div className='modal-container'>
                    <div className='modal-header'>
                        <Typography variant="h4" gutterBottom fontWeight='700'>
                            Thông tin {data.storeName}
                        </Typography>
                        <div className='header-btn-close'>
                            <Button onClick={onClose}>
                                <ClearRounded />
                            </Button>
                        </div>
                    </div>

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
                        <Grid container spacing={2} justifyContent="center" className='btn-status'>
                            <Grid item>
                                <Button
                                    variant="contained"
                                    color="success"
                                    onClick={handleActive}
                                >
                                    ACTIVE
                                </Button>
                            </Grid>
                            <Grid item>
                                <Button
                                    variant="contained"
                                    color="error"
                                    onClick={handleRefuse}
                                >
                                    REFUSE
                                </Button>
                            </Grid>
                        </Grid>
                    )}

                    {data.status === 'ACTIVE' && (
                        <Box className='btn-status'>
                            <Button
                                variant="contained"
                                color="error"
                                onClick={handleInActive}
                            >
                                IN-ACTIVE
                            </Button>
                        </Box>
                    )}

                    {data.status === 'INACTIVE' && (
                        <Box className='btn-status'>
                            <Button
                                variant="contained"
                                color="warning"
                                onClick={handleReActive}
                            >
                                RE-ACTIVE
                            </Button>
                        </Box>
                    )}
                </div>
            </Modal>
            <FullScreenImageDialog
                isOpen={fullscreenOpen}
                onClose={() => setFullscreenOpen(false)}
                imageUrl={data.businessLicense}
            />
        </>
    );
};

export default StoreModal;

// StoreModal.js
import React from 'react';
import { Modal, Typography, Button } from '@mui/material';
import { IStore } from '../../../../models/Store/Store';

interface StoreModalProps {
    isOpen: boolean;
    onClose: () => void;
    data: IStore | null;
}

const StoreModal: React.FC<StoreModalProps> = ({ isOpen, onClose, data }) => {
    if (!data) {
        return null;
    }

    return (
        <Modal open={isOpen} onClose={onClose}>
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', padding: '20px', backgroundColor: 'white' }}>
                <Typography variant="h5" gutterBottom>
                    Thông tin cửa hàng
                </Typography>
                <Typography>
                    Tên cửa hàng: {data.storeName}
                </Typography>
                <Typography>
                    Mã số thuế: {data.taxCode}
                </Typography>
                <Typography>
                    Số điện thoại: {data.storePhone}
                </Typography>
                <Typography>
                    Email: {data.storeEmail}
                </Typography>
                <Typography>
                    Ngày tạo: {data.storeCreatedAt ? data.storeCreatedAt.toLocaleString() : 'N/A'}
                </Typography>
                <Typography>
                    Trạng thái: {data.status}
                </Typography>
                <Button onClick={onClose} variant="contained" color="primary" style={{ marginTop: '20px' }}>
                    Đóng
                </Button>
            </div>
        </Modal>
    );
};

export default StoreModal;

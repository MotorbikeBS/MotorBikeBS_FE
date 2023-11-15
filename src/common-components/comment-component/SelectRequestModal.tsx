import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../services/store/store';
import { useParams } from 'react-router';
import {
    getRequestAssociatedWithStore,
} from '../../services/features/comment/commentSlice.';

interface SelectRequestProps {
    isOpen: boolean;
    onClose: () => void;
    onRequestSelect: (requestId: string, requestTitle: string) => void;
}

type storeParams = {
    storeId: number;
};

const SelectRequestModal: React.FC<SelectRequestProps> = ({
    isOpen,
    onClose,
    onRequestSelect,
}) => {
    const dispatch = useAppDispatch();
    const { requestsWithStore } = useAppSelector((state) => state.comment);

    const { storeId } = useParams<storeParams | any>();

    useEffect(() => {
        dispatch(getRequestAssociatedWithStore({ storeId: Number(storeId) }));
    }, [dispatch, storeId]);

    const [selectedRequest, setSelectedRequest] = useState<{
        requestId: string;
        requestTitle: string;
    } | null>(null);

    const handleSelectRequest = (event: SelectChangeEvent) => {
        const selectedRequestId = event.target.value as string;
        const selectedRequestData = requestsWithStore && requestsWithStore.find(
            (request) => request?.requestId === Number(selectedRequestId)
        );

        if (selectedRequestData) {
            setSelectedRequest({
                requestId: selectedRequestId,
                requestTitle: `${selectedRequestData.requestType.description} - ${selectedRequestData.motor?.motorName} - ${selectedRequestData.status}`,
            });
        }
    };

    const handleConfirm = () => {
        if (selectedRequest) {
            onRequestSelect(selectedRequest.requestId, selectedRequest.requestTitle);
        }
        onClose();
    };
    return (
        <Box sx={{ width: '70%' }}>
            <Dialog fullWidth maxWidth="sm" open={isOpen} onClose={onClose}>
                <DialogTitle>
                    <Typography variant="h5" textAlign="center">
                        Chọn yêu cầu bình luận
                    </Typography>
                </DialogTitle>
                <DialogContent>
                    <Box sx={{ padding: 2 }}>
                        <FormControl fullWidth>
                            <InputLabel id="buyer">Yêu cầu</InputLabel>
                            <Select
                                labelId="buyer"
                                label="Người mua"
                                // value={requestId}
                                value={selectedRequest?.requestId || ''}
                                onChange={handleSelectRequest}
                            >
                                {requestsWithStore &&
                                    requestsWithStore.map((request) => (
                                        <MenuItem value={request?.requestId}>
                                            {request?.requestType.description} -{' '}
                                            {request?.motor?.motorName} -{' '}
                                            {request?.status}
                                        </MenuItem>
                                    ))}
                            </Select>
                        </FormControl>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose} color="error">
                        Hủy bỏ
                    </Button>
                    <Button onClick={handleConfirm} color="info">
                        Xác nhận
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default SelectRequestModal;

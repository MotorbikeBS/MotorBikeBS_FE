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
import React, { useState } from 'react';

interface SelectRequestProps {
    isOpen: boolean;
    onClose: () => void;
    // onRequestSelect: (requestId: number, requestTitle: string) => void;
}

const SelectRequestModal: React.FC<SelectRequestProps> = ({
    isOpen,
    onClose,
    // onRequestSelect,
}) => {
    const [requestId, setRequestId] = useState('');

    const handleSelectRequest = (event: SelectChangeEvent) => {
        setRequestId(event.target.value);
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
                                value={requestId}
                                onChange={handleSelectRequest}
                            >
                                {/* {getCustomerBooking &&
                                    getCustomerBooking.map((booking) => ( */}
                                <MenuItem
                                    value={
                                        // booking?.buyerBookings[0]
                                        //     ?.bookingId
                                        1
                                    }
                                >
                                    {/* {booking?.sender?.userName} -{' '}
                                            {booking?.sender?.phone} */}
                                    Yêu
                                </MenuItem>
                                {/* ))} */}
                            </Select>
                        </FormControl>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose} color="error">
                        Hủy bỏ
                    </Button>
                    <Button
                        // onClick={handleOpenSubmitDialog}
                        color="info"
                    >
                        Xác nhận
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default SelectRequestModal;

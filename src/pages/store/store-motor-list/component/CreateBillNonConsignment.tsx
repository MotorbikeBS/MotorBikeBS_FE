import React, { useEffect, useState } from 'react';
import {
    useAppDispatch,
    useAppSelector,
} from '../../../../services/store/store';
import {
    clearCustomerBooking,
    getAllBookingByCustomer,
} from '../../../../services/features/booking/customerBookingSlice';
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
import { createBillNonConsignment } from '../../../../services/features/bill/billSlice';
import { IMotorbike } from '../../../../models/Motorbike/Motorbike';
import { toast } from 'react-toastify';

interface CreateBillNonConsignmentDialogProps {
    open: boolean;
    openSubmit: boolean;
    onOpenSubmitDialog: () => void;
    onCloseSubmitDialog: () => void;
    onCloseCancelDialog: () => void;
    onClose: () => void;
    loadData: () => void;
    selectedRow: IMotorbike | null;
}

const CreateBillNonConsignment: React.FC<
    CreateBillNonConsignmentDialogProps
> = ({
    open,
    openSubmit,
    onOpenSubmitDialog,
    onCloseSubmitDialog,
    onCloseCancelDialog,
    onClose,
    loadData,
    selectedRow,
}) => {
    const dispatch = useAppDispatch();
    const { getAllCustomerBooking } = useAppSelector(
        (state) => state.customerBooking,
    );
    useEffect(() => {
        dispatch(clearCustomerBooking());
        dispatch(getAllBookingByCustomer());
    }, [dispatch]);

    const [buyerBookingId, setBuyerBookingId] = useState('');

    const handleSelectBookingId = (event: SelectChangeEvent) => {
        setBuyerBookingId(event.target.value);
    };

    const getCustomerBooking =
        getAllCustomerBooking &&
        getAllCustomerBooking?.filter(
            (booking) => booking?.motorId === selectedRow?.id,
        );

    const handleCloseDialog = () => {
        onClose();
    };

    const handleOpenSubmitDialog = () => {
        onOpenSubmitDialog();
    };

    const handleSubmitConfirmSaleNonConsignmentMotor = () => {
        dispatch(
            createBillNonConsignment({
                motorId: Number(selectedRow?.id),
                buyerBookingId: Number(buyerBookingId),
            }),
        )
            .unwrap()
            .then(() => {
                toast.success('Xe đã bán. Thông tin hóa đơn được thêm vào lịch sử giao dịch của bạn.');
                loadData();
                handleCloseDialog();
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <div>
            <Dialog open={open}>
                <DialogTitle>
                    <Typography variant="h5" textAlign="center">
                        Xác nhận người mua xe không kí gởi
                    </Typography>
                </DialogTitle>
                <DialogContent>
                    <Box sx={{ padding: 2 }}>
                        <FormControl fullWidth>
                            <InputLabel id="buyer">Người mua</InputLabel>
                            <Select
                                labelId="buyer"
                                label="Người mua"
                                value={buyerBookingId}
                                onChange={handleSelectBookingId}
                            >
                                {getCustomerBooking &&
                                    getCustomerBooking.map((booking) => (
                                        <MenuItem
                                            value={
                                                booking?.buyerBookings[0]
                                                    ?.bookingId
                                            }
                                        >
                                            {booking?.sender?.userName} -{' '}
                                            {booking?.sender?.phone}
                                        </MenuItem>
                                    ))}
                            </Select>
                        </FormControl>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onCloseSubmitDialog} color="error">
                        Hủy bỏ
                    </Button>
                    <Button onClick={handleOpenSubmitDialog} color="info">
                        Xác nhận
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog open={openSubmit}>
                <DialogTitle>
                    <Typography variant="h4" textAlign="center">
                        Xác nhận bán xe
                    </Typography>
                </DialogTitle>
                <DialogContent>
                    <Typography variant="subtitle1" textAlign="center">
                        Bạn có chắc chắn đã bán xe này không?
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onCloseCancelDialog} color="error">
                        Hủy bỏ
                    </Button>
                    <Button
                        onClick={handleSubmitConfirmSaleNonConsignmentMotor}
                        color="info"
                    >
                        Xác nhận
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default CreateBillNonConsignment;

import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Stack, TextField, TextareaAutosize, Typography } from '@mui/material';
import React from 'react'
import { format } from 'date-fns';
import { Controller, useForm } from 'react-hook-form';

// import { useAppDispatch } from '../../../services/store/store';
// import { storeBookingOwnerExchange } from '../../../services/features/booking/bookingSlice';

interface BookingDialogProps {
    open: boolean;
    negotiationId: number | null;
    openSubmit: boolean;
    openCancel: boolean;
    onOpenSubmitDialog: () => void;
    onCloseSubmitDialog: () => void;
    onOpenCancelDialog: () => void;
    onCloseCancelDialog: () => void;
    onClose: () => void;
}

interface IBookingViewMotorbike {
    bookingDate: Date;
    note: string;
}

const BookingAcceptNegotiationDialog: React.FC<BookingDialogProps> = ({
    open,
    negotiationId,
    openSubmit,
    openCancel,
    onOpenCancelDialog,
    onOpenSubmitDialog,
    onCloseSubmitDialog,
    onCloseCancelDialog,
    onClose, }) => {
    // const dispatch = useAppDispatch()

    const form = useForm<IBookingViewMotorbike>({
        defaultValues: {
            bookingDate: new Date(),
            note: '',
        },

    });
    const { control, handleSubmit, register } = form;

    const handleCloseDialog = () => {
        onClose();
    };
    const handleOpenSubmitDialog = () => {
        onOpenSubmitDialog();
    };

    const handleOpenCancelDialog = () => {
        onOpenCancelDialog();

    };

    const onSubmit = (data: IBookingViewMotorbike) => {
        if (negotiationId !== null) {
            // dispatch(storeBookingOwnerExchange({
            //     motorId: motorbikeId,
            //     bookingDate: data.bookingDate,
            //     note: data.note,
            // }));
            handleCloseDialog();
        } else {
        }
    };
    return (
        <div>
            <Dialog open={open} onClose={handleOpenCancelDialog}>
                <DialogTitle>
                    <Typography variant="h4">Đặt lịch cho chủ xe</Typography>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <div>
                            <Typography
                                color='red'
                                fontWeight='700'
                            >Chú ý:</Typography>
                            <Typography>
                                Lịch hẹn chỉ có hiệu lực trong vòng 3 ngày từ ngày thỏa thuận đươc hai bên đồng ý.
                            </Typography>
                        </div>
                    </DialogContentText>
                    <Box textAlign="center">
                        <form noValidate>
                            <Stack spacing={2} className="booking-form-style">
                                <Controller
                                    name="bookingDate"
                                    control={control}
                                    render={({ field }) => (
                                        <TextField
                                            label="Lịch hẹn"
                                            type="datetime-local"
                                            {...field}
                                            inputProps={{
                                                min: format(new Date(), "yyyy-MM-dd'T'HH:mm"),
                                            }}
                                        />
                                    )}
                                />
                                <TextareaAutosize
                                    className="aria-note custom-textarea"
                                    aria-label="Lưu ý của bạn"
                                    {...register('note')}
                                    style={{
                                        width: '345px',
                                        height: '50px',
                                    }}
                                />
                            </Stack>
                            <Button
                                variant="contained"
                                color="primary"
                                className="btn-booking"
                                onClick={handleOpenSubmitDialog}
                            >
                                Đặt lịch
                            </Button>
                        </form>
                    </Box>
                    <DialogActions>
                        <Button onClick={handleOpenCancelDialog} color="error" variant="outlined">
                            Hủy bỏ
                        </Button>
                    </DialogActions>
                </DialogContent>
            </Dialog>

            {/* Dialog Đặt lịch */}
            <Dialog open={openSubmit}>
                <DialogTitle>
                    <Typography variant="h5">Xác nhận Đặt lịch</Typography>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <Typography>Bạn có chắc chắn muốn đặt lịch xem xe không ?</Typography>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button color="error" variant="outlined" onClick={onCloseSubmitDialog}>
                        Hủy bỏ
                    </Button>
                    <Button type="submit" color="success" variant="outlined" onClick={handleSubmit(onSubmit)}>
                        Đồng ý
                    </Button>
                </DialogActions>
            </Dialog>
            {/* Dialog Hủy */}
            <Dialog open={openCancel}>
                <DialogTitle>
                    <Typography variant="h5">Xác nhận hủy bỏ</Typography>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <Typography>Bạn có chắc chắn muốn hủy bỏ đặt lịch xem xe không ?</Typography>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button color="error" variant="outlined" onClick={onCloseCancelDialog}>
                        Hủy bỏ
                    </Button>
                    <Button color="success" variant="outlined" onClick={handleCloseDialog}>
                        Đồng ý
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default BookingAcceptNegotiationDialog
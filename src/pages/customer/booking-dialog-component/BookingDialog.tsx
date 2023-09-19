import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { format } from 'date-fns';
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Stack,
    TextField,
    TextareaAutosize,
    Typography,
} from '@mui/material';
import './style/style.scss';

interface BookingDialogProps {
    open: boolean;
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
    bookingTime: Date;
    note: string;
}

const BookingDialog: React.FC<BookingDialogProps> = ({
    open,
    openSubmit,
    openCancel,
    onOpenCancelDialog,
    onOpenSubmitDialog,
    onCloseSubmitDialog,
    onCloseCancelDialog,
    onClose,
}) => {
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
        console.log(data);
        handleCloseDialog()  
    };

    return (
        <div>
            <Dialog open={open} onClose={handleOpenCancelDialog}>
                <DialogTitle>
                    <Typography variant="h4">Đặt Lịch Xem Xe</Typography>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <div>
                            <strong>Chú ý:</strong>
                            <Typography>
                                Bạn nên đến đúng lịch hẹn để không ảnh hưởng đến thời gian của hai bên. Xin cảm ơn!
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
};

export default BookingDialog;

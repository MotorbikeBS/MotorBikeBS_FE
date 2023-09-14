import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { format } from 'date-fns';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Stack, TextField, TextareaAutosize, Typography } from '@mui/material';
import './style/style.scss'

interface BookingDialogProps {
    open: boolean;
    onClose: () => void;
}

interface IBookingViewMotorbike {
    bookingDate: Date;
    bookingTime: Date;
    note: string;
}

const BookingDialog: React.FC<BookingDialogProps> = ({ open, onClose }) => {
    const form = useForm<IBookingViewMotorbike>({
        defaultValues: {
            bookingDate: new Date(),
            note: ''
        },
    });
    const { control, handleSubmit, register } = form;


    const handleCloseDialog = () => {
        onClose()
    };

    const onSubmit = (data: IBookingViewMotorbike) => {
        console.log(data);
    };

    return (
        <div>
            <Dialog open={open} onClose={handleCloseDialog}>
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
                    <Box textAlign='center'>
                        <form onSubmit={handleSubmit(onSubmit)} noValidate>
                            <Stack
                                spacing={2}
                                className='booking-form-style'
                            >
                                <Controller
                                    name="bookingDate"
                                    control={control}
                                    render={({ field }) => (
                                        <TextField
                                            label='Lịch hẹn'
                                            type="datetime-local"
                                            {...field}
                                            inputProps={{
                                                min: format(new Date(), "yyyy-MM-dd'T'HH:mm")
                                            }}
                                        />
                                    )}
                                />
                                <TextareaAutosize
                                    className='aria-note custom-textarea'
                                    aria-label="Lưu ý của bạn"
                                    {...register('note')}
                                    style={{
                                        width: '345px',
                                        height: '50px'
                                    }}
                                />
                            </Stack>
                            <Button
                                type="submit"
                                variant='contained'
                                color='primary'
                                className='btn-booking'
                                onClick={handleCloseDialog}
                            >
                                Submit
                            </Button>
                        </form>
                    </Box>
                    <DialogActions>
                        <Button
                            onClick={handleCloseDialog}
                            color='error'
                            variant='outlined'
                        >
                            Cancel
                        </Button>
                    </DialogActions>
                </DialogContent>
            </Dialog>
        </div >
    );
};

export default BookingDialog;

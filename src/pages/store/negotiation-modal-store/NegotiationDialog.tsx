import React from 'react'
import { useAppDispatch } from '../../../services/store/store';
import { Controller, useForm } from 'react-hook-form';
import { startNegotiation } from '../../../services/features/negotiation/negotiationSlice';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Stack, TextField, TextareaAutosize, Typography } from '@mui/material';
import './style/_style.scss'

interface NegotiationDialogProps {
    openNego: boolean
    motorIdNego: number | null
    openSubmitNego: boolean;
    openCancelNego: boolean;
    onOpenSubmitDialogNego: () => void;
    onCloseSubmitDialogNego: () => void;
    onOpenCancelDialogNego: () => void;
    onCloseCancelDialogNego: () => void;
    onClose: () => void;
}

interface INegotiationForm {
    storePrice: number;
    description: string;
}


const NegotiationDialog: React.FC<NegotiationDialogProps> = ({
    openNego,
    motorIdNego,
    openSubmitNego,
    openCancelNego,
    onOpenSubmitDialogNego,
    onOpenCancelDialogNego,
    onCloseSubmitDialogNego,
    onCloseCancelDialogNego,
    onClose
}) => {
    const dispatch = useAppDispatch()

    const form = useForm<INegotiationForm>({
        defaultValues: {
            storePrice: undefined,
            description: ''
        }
    });
    const { control, handleSubmit, register } = form

    const handleCloseDialogNego = () => {
        onClose();
    };
    const handleOpenSubmitDialogNego = () => {
        onOpenSubmitDialogNego();
    };

    const handleOpenCancelDialogNego = () => {
        onOpenCancelDialogNego();

    };
    const onSubmit = (data: INegotiationForm) => {
        if (motorIdNego !== null) {
            dispatch(startNegotiation({
                motorId: motorIdNego,
                storePrice: data.storePrice,
                description: data.description
            }))
            handleCloseDialogNego();
        } else {
        }
    };
    return (
        <div>
            <Dialog open={openNego} onClose={handleOpenCancelDialogNego}>
                <DialogTitle>
                    <Typography variant="h4">Thương lượng giá cả</Typography>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <div>
                            <strong>Chú ý:</strong>
                            <Typography>
                                Bạn nên thể hiện sự nghiêm túc trong quá trình đàm phán giá, để tránh tình trạng bị báo cáo về tài khoản                            </Typography>
                        </div>
                    </DialogContentText>

                    <Box textAlign="center">
                        <form noValidate>
                            <Stack spacing={2} className="negotiation-form-style">
                                <Controller
                                    name="storePrice"
                                    control={control}
                                    render={({ field }) => (
                                        <TextField
                                            label="Giá mong muốn"
                                            type="text"
                                            {...field}
                                        />
                                    )}
                                />
                                <TextareaAutosize
                                    className="aria-note custom-textarea"
                                    aria-label="Mô tả"
                                    {...register('description')}
                                    style={{
                                        width: '345px',
                                        height: '50px',
                                    }}
                                />
                            </Stack>
                            <div className='btn-negotiation'>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={handleOpenSubmitDialogNego}
                                >
                                    Trả giá
                                </Button>
                                <Button
                                    variant="contained"
                                    color="success"
                                // onClick={handleOpenSubmitDialogNego}
                                >
                                    Chấp nhận
                                </Button>
                            </div>
                        </form>
                    </Box>
                    <DialogActions>
                        <Button onClick={handleOpenCancelDialogNego} color="error" variant="outlined">
                            Hủy bỏ
                        </Button>
                    </DialogActions>
                </DialogContent>
            </Dialog>
            <Dialog open={openSubmitNego}>
                <DialogTitle>
                    <Typography variant="h5">Xác nhận trả giá</Typography>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <Typography>Bạn có chắc chắn muốn trả giá cho xe này</Typography>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button color="error" variant="outlined" onClick={onCloseSubmitDialogNego}>
                        Hủy bỏ
                    </Button>
                    <Button type="submit" color="success" variant="outlined" onClick={handleSubmit(onSubmit)}>
                        Đồng ý
                    </Button>
                </DialogActions>
            </Dialog>
            <Dialog open={openCancelNego}>
                <DialogTitle>
                    <Typography variant="h5">Xác nhận hủy bỏ</Typography>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <Typography>Bạn có chắc chắn muốn hủy bỏ đặt lịch xem xe không ?</Typography>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button color="error" variant="outlined" onClick={onCloseCancelDialogNego}>
                        Hủy bỏ
                    </Button>
                    <Button color="success" variant="outlined" onClick={handleCloseDialogNego}>
                        Đồng ý
                    </Button>
                </DialogActions>
            </Dialog>
        </div>

    )
}

export default NegotiationDialog
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Input,
    Stack,

    TextField,

    TextareaAutosize,
    Typography
} from '@mui/material';
import React from 'react'
import { Controller, useForm } from 'react-hook-form';
import './style/_style.scss';
import { useAppDispatch } from '../../../services/store/store';
import { createContractByStore } from '../../../services/features/contract/contractSlice';
import { createNegotiationInfor } from '../../../services/features/negotiation/negotiationSlice';
import { format } from 'date-fns';

interface CreateNegotiationInforDialogProps {
    open: boolean;
    valuationId: number | null
    openSubmit: boolean;
    openCancle: boolean;
    onOpenSubmitDialog: () => void;
    onCloseSubmitDialog: () => void;
    onOpenCancelDialog: () => void;
    onCloseCancelDialog: () => void;
    onClose: () => void;
}

interface ICreateNegoInforForm {
    finalPrice: number;
    content: string;
    startTime: Date;
    endTime: Date;
    deposit: number;
}

const CreateNegoInforDialogByStore: React.FC<CreateNegotiationInforDialogProps> = ({
    open,
    valuationId,
    openSubmit,
    openCancle,
    onOpenCancelDialog,
    onOpenSubmitDialog,
    onCloseSubmitDialog,
    onCloseCancelDialog,
    onClose
}) => {
    const dispatch = useAppDispatch()

    const form = useForm<ICreateNegoInforForm>({
        defaultValues: {
            finalPrice: undefined,
            content: '',
            startTime: undefined,
            endTime: undefined,
            deposit: undefined
        }
    });

    const { control, handleSubmit, register } = form

    const handleCloseDialog = () => {
        onClose();
    };
    const handleOpenSubmitDialog = () => {
        onOpenSubmitDialog();
    };

    const handleOpenCancelDialog = () => {
        onOpenCancelDialog();
    };

    const onSubmit = (data: ICreateNegoInforForm) => {
        if (valuationId != null) {
            dispatch(createNegotiationInfor({
                valuationId: valuationId,
                finalPrice: data.finalPrice,
                content: data.content,
                startTime: data.startTime,
                endTime: data.endTime,
                deposit: data.deposit
            }))
            handleCloseDialog()
        }
        else {
        }

    }

    return (
        <div>
            <Dialog
                open={open}
                onClose={handleOpenCancelDialog}
            >
                <DialogTitle>
                    <Typography
                        variant='h4'
                    >
                        Tạo thông tin thương lượng
                    </Typography>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <div>
                            <Typography
                                color='red'
                                fontWeight='700'
                            >
                                Chú ý:
                            </Typography>
                            <Typography>
                                Vui lòng tạo thông tin đã thương lượng 1 cách chính xác, để quản lí giao dịch tốt hơn.
                            </Typography>
                        </div>
                    </DialogContentText>
                    <Box textAlign='center' >
                        <form encType='multipart/form-data' noValidate>
                            <Stack
                                spacing={2}
                                sx={{
                                    width: 350,
                                    marginLeft: 'auto',
                                    marginRight: 'auto',
                                    marginTop: '20px',
                                    marginBottom: '20px'
                                }}
                            >
                                <Controller
                                    name="finalPrice"
                                    control={control}
                                    render={({ field }) => (
                                        <TextField
                                            label="Giá đã chốt"
                                            type="number"
                                            {...field}
                                        />
                                    )}
                                />
                                <Controller
                                    name="startTime"
                                    control={control}
                                    render={({ field }) => (
                                        <TextField
                                            focused
                                            label="Ngày nhận xe"
                                            type="date"
                                            {...field}
                                            inputProps={{
                                                min: format(new Date(), "yyyy-MM-dd"),
                                            }}
                                        />
                                    )}
                                />
                                <Controller
                                    name="endTime"
                                    control={control}
                                    render={({ field }) => (
                                        <TextField
                                            focused
                                            type="date"
                                            label="Ngày kết thúc"
                                            {...field}
                                            inputProps={{
                                                min: format(new Date(), "yyyy-MM-dd"),
                                            }}
                                        />
                                    )}
                                />
                                <Controller
                                    control={control}
                                    name='deposit'
                                    render={({ field }) => (
                                        <TextField
                                            label="Đã cọc"
                                            type="number"
                                            {...field}
                                        />
                                    )}

                                />
                                <TextareaAutosize
                                    placeholder='Nhập mô tả của bạn.....'
                                    className="aria-note custom-textarea"
                                    {...register('content')}
                                    style={{
                                        width: '345px',
                                        height: '50px',
                                    }}
                                />
                            </Stack>
                            <Button
                                variant="contained"
                                color="success"
                                className="btn-create-contract"
                                onClick={handleOpenSubmitDialog}
                            >
                                Tạo thông tin
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
            <Dialog open={openSubmit}>
                <DialogTitle>
                    <Typography variant="h5">Xác nhận tạo hợp đồng</Typography>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <Typography>Bạn có chắc chắn muốn tạo hợp đồng mua bán xe ?</Typography>
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
            <Dialog open={openCancle}>
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
    )
}

export default CreateNegoInforDialogByStore
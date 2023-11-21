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
    Typography
} from '@mui/material';
import React from 'react'
import { Controller, useForm } from 'react-hook-form';
import './style/_style.scss';
import { useAppDispatch } from '../../../services/store/store';
import { reupNegotiationInfor } from '../../../services/features/negotiation/negotiationSlice';
import { format } from 'date-fns';
import { NumericFormat } from 'react-number-format';

interface ReupdateNegoInfoDialogProps {
    open: boolean;
    negotiationId: number | null
    openSubmit: boolean;
    openCancle: boolean;
    loadData: () => void
    onOpenSubmitDialog: () => void;
    onCloseSubmitDialog: () => void;
    onOpenCancelDialog: () => void;
    onCloseCancelDialog: () => void;
    onClose: () => void;
}

interface IReUpdateContractForm {
    finalPrice: number;
    content: string;
    startTime: Date;
    endTime: Date;
    deposit: number;
}

const ReUpdateNegoInfoDialogByStore: React.FC<ReupdateNegoInfoDialogProps> = ({
    open,
    negotiationId,
    openSubmit,
    openCancle,
    loadData,
    onOpenCancelDialog,
    onOpenSubmitDialog,
    onCloseSubmitDialog,
    onCloseCancelDialog,
    onClose
}) => {
    const dispatch = useAppDispatch()

    const form = useForm<IReUpdateContractForm>({
        defaultValues: {
            finalPrice: undefined,
            content: '',
            startTime: undefined,
            endTime: undefined,
            deposit: undefined
        }
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

    const onSubmit = (data: IReUpdateContractForm) => {
        if (negotiationId != null) {
            dispatch(reupNegotiationInfor({ negotiationId, data }))
                .then(() => {
                    loadData()
                    setTimeout(() => {
                        handleCloseDialog()
                    })
                });
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
                        Cập nhật thông tin biên nhận
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
                        <form noValidate>
                            <Stack
                                spacing={2}
                                sx={{
                                    width: 350,
                                    marginLeft: 'auto',
                                    marginRight: 'auto',
                                    marginTop: '20px',
                                }}
                            >
                                <Controller
                                    name="finalPrice"
                                    control={control}
                                    render={({ field }) => (
                                        <NumericFormat
                                            label='Giá đã chốt'
                                            allowLeadingZeros
                                            thousandSeparator=","
                                            customInput={TextField}
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
                                    name="deposit"
                                    control={control}
                                    render={({ field }) => (
                                        <NumericFormat
                                            label='Đã cọc'
                                            allowLeadingZeros
                                            thousandSeparator=","
                                            customInput={TextField}
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
                                Cập nhật thông tin
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
                    <Typography variant="h5">Xác nhận tạo thông tin</Typography>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <Typography>Bạn có chắc chắn muốn tạo thông tin đã thương lượng ?</Typography>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        color="error"
                        variant="outlined"
                        onClick={onCloseSubmitDialog}>
                        Hủy bỏ
                    </Button>
                    <Button
                        type="submit"
                        color="success"
                        variant="outlined"
                        onClick={handleSubmit(onSubmit)}
                    >
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
                        <Typography>Bạn có chắc chắn muốn hủy bỏ không ?</Typography>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        color="error"
                        variant="outlined"
                        onClick={onCloseCancelDialog}
                    >
                        Hủy bỏ
                    </Button>
                    <Button
                        color="success"
                        variant="outlined"
                        onClick={handleCloseDialog}
                    >
                        Đồng ý
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default ReUpdateNegoInfoDialogByStore
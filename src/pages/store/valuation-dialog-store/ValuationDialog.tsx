import React from 'react'
import { useAppDispatch } from '../../../services/store/store';
import { Controller, useForm } from 'react-hook-form';
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
}
    from '@mui/material';
import './style/_style.scss'
import { startValuation } from '../../../services/features/valuation/valuationSlice';
import { NumericFormat } from 'react-number-format';

interface NegotiationDialogProps {
    openValuation: boolean
    motorIdValuation: number | null
    openSubmitValuation: boolean;
    openCancelValuation: boolean;
    onOpenSubmitDialogValuation: () => void;
    onCloseSubmitDialogValuation: () => void;
    onOpenCancelDialogValuation: () => void;
    onCloseCancelDialogValuation: () => void;
    onClose: () => void;
}

interface IValuationForm {
    storePrice: number;
    description: string;
}


const ValuationDialog: React.FC<NegotiationDialogProps> = ({
    openValuation,
    motorIdValuation,
    openSubmitValuation,
    openCancelValuation,
    onOpenSubmitDialogValuation,
    onOpenCancelDialogValuation,
    onCloseSubmitDialogValuation,
    onCloseCancelDialogValuation,
    onClose
}) => {
    const dispatch = useAppDispatch()

    const form = useForm<IValuationForm>({
        defaultValues: {
            storePrice: undefined,
            description: ''
        }
    });
    const { control, handleSubmit, register } = form

    const handleCloseDialogValuation = () => {
        onClose();
    };
    const handleOpenSubmitDialogValuation = () => {
        onOpenSubmitDialogValuation();
    };

    const handleOpenCancelDialogValuation = () => {
        onOpenCancelDialogValuation();

    };
    const onSubmit = (data: IValuationForm) => {
        if (motorIdValuation !== null) {
            dispatch(startValuation({
                motorId: motorIdValuation,
                storePrice: data.storePrice,
                description: data.description
            }))
            handleCloseDialogValuation();
        } else {
        }
    };
    return (
        <div>
            <Dialog open={openValuation} onClose={handleOpenCancelDialogValuation}>
                <DialogTitle>
                    <Typography variant="h4">Định giá cho xe</Typography>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <div>
                            <strong>Chú ý:</strong>
                            <Typography>
                                Bạn nên thể hiện sự nghiêm túc trong quá trình đàm phán giá, để tránh tình trạng bị báo cáo về tài khoản
                            </Typography>
                        </div>
                    </DialogContentText>

                    <Box textAlign="center">
                        <form noValidate>
                            <Stack spacing={2} className="negotiation-form-style">
                                <Controller
                                    name="storePrice"
                                    control={control}
                                    render={({ field }) => (
                                        <NumericFormat
                                            label='Giá đề xuất'
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
                                    onClick={handleOpenSubmitDialogValuation}
                                >
                                    Tạo thông tin
                                </Button>
                            </div>
                        </form>
                    </Box>
                    <DialogActions>
                        <Button onClick={handleOpenCancelDialogValuation} color="error" variant="outlined">
                            Hủy bỏ
                        </Button>
                    </DialogActions>
                </DialogContent>
            </Dialog>
            <Dialog open={openSubmitValuation}>
                <DialogTitle>
                    <Typography variant="h5">Xác nhận tạo thông tin thương lượng</Typography>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <Typography>Bạn có chắc chắn muốn tạo thông tin thương lượng cho xe này</Typography>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button color="error" variant="outlined" onClick={onCloseSubmitDialogValuation}>
                        Hủy bỏ
                    </Button>
                    <Button type="submit" color="success" variant="outlined" onClick={handleSubmit(onSubmit)}>
                        Đồng ý
                    </Button>
                </DialogActions>
            </Dialog>
            <Dialog open={openCancelValuation}>
                <DialogTitle>
                    <Typography variant="h5">Xác nhận hủy bỏ</Typography>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <Typography>Bạn có chắc chắn muốn hủy bỏ không ?</Typography>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button color="error" variant="outlined" onClick={onCloseCancelDialogValuation}>
                        Hủy bỏ
                    </Button>
                    <Button color="success" variant="outlined" onClick={handleCloseDialogValuation}>
                        Đồng ý
                    </Button>
                </DialogActions>
            </Dialog>
        </div>

    )
}

export default ValuationDialog
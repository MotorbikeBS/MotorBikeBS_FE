import React from 'react'
import './style/_extendPostBooting.scss'
import { useAppDispatch } from '../../../../services/store/store';
import { Controller, useForm } from 'react-hook-form';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Stack, TextField, Typography } from '@mui/material';
import { extendPostBoosting } from '../../../../services/features/posting/postBootingSlice';

interface IExtendPostBoostingDialogProps {
    open: boolean;
    boostingId: number | null
    openSubmit: boolean;
    openCancle: boolean;
    loadingData: () => void;
    onOpenSubmitDialog: () => void;
    onCloseSubmitDialog: () => void;
    onOpenCancelDialog: () => void;
    onCloseCancelDialog: () => void;
    onClose: () => void;
}
interface IExtensionPostBootingField {
    endTime: Date;

}
const ExtensionPostBootingDialog: React.FC<IExtendPostBoostingDialogProps> = ({
    boostingId,
    open,
    loadingData,
    onClose,
    openSubmit,
    openCancle,
    onOpenSubmitDialog,
    onCloseSubmitDialog,
    onOpenCancelDialog,
    onCloseCancelDialog
}) => {
    const dispatch = useAppDispatch()
    const form = useForm<IExtensionPostBootingField>({
        defaultValues: {
            endTime: undefined
        }

    })
    const { control, handleSubmit, reset } = form
    const clearForm = () => {
        form.reset();
    };
    const handleCloseDialog = () => {
        clearForm();
        onClose();
    };

    const handleOpenSubmitDialog = () => {
        onOpenSubmitDialog();
    };

    const handleOpenCancelDialog = () => {
        onOpenCancelDialog();
    };
    const onSubmit = (data: IExtensionPostBootingField) => {
        if (boostingId !== null) {
            dispatch(extendPostBoosting({
                boostingId: boostingId,
                data,
            }))
                .then(() => {
                    loadingData()
                    setTimeout(() => {
                        handleCloseDialog()
                    }, 1000)
                })
        }
    }

    return (
        <div>
            <Dialog open={open} onClose={handleOpenCancelDialog}>
                <DialogTitle>
                    <Typography variant="h4">Chọn thời gian kết thúc</Typography>
                </DialogTitle>
                <DialogContent>
                    <Box textAlign="center">
                        <form noValidate>
                            <Stack spacing={2} className='create-post-booting-form'>
                                <Controller
                                    name="endTime"
                                    control={control}
                                    render={({ field }) => (
                                        <TextField
                                            focused={true}
                                            label="Ngày kết thúc"
                                            type="date"
                                            {...field}
                                        />
                                    )}
                                />

                            </Stack>
                            <Button
                                variant="contained"
                                color="primary"
                                className="btn-action"
                                onClick={handleOpenSubmitDialog}
                            >
                                Gia hạn
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
                    <Typography variant="h5">Xác nhận gia hạn đẩy bài</Typography>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <Typography>Bạn có chắc chắn muốn gia hạn đẩy bài cho xe này không?</Typography>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button color="error" variant="outlined" onClick={onCloseSubmitDialog}>
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
            <Dialog open={openCancle}>
                <DialogTitle>
                    <Typography variant="h5">Xác nhận hủy bỏ</Typography>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <Typography>Bạn có chắc chắn muốn hủy bỏ gia hạn đẩy bài cho xe này không?</Typography>
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

export default ExtensionPostBootingDialog
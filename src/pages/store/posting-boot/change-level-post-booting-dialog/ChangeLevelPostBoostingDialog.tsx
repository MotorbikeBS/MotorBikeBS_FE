import React from 'react'
import { useAppDispatch } from '../../../../services/store/store';
import { Controller, useForm } from 'react-hook-form';
import { changeLevelPostBoosting } from '../../../../services/features/posting/postBootingSlice';
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    MenuItem,
    Select,
    SelectChangeEvent,
    Stack,
    Typography
} from '@mui/material';

interface IChangeLevelPostBoostingDialogProps {
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

interface IChangeLevelPostBoostingField {
    level: number
}

const ChangeLevelPostBoostingDialog: React.FC<IChangeLevelPostBoostingDialogProps> = ({
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

    const [level, setLevel] = React.useState<number>(1);
    const handleChangeValue = (event: SelectChangeEvent<number>) => {
        setLevel(event.target.value as number);
    };
    const form = useForm<IChangeLevelPostBoostingField>({
        defaultValues: {
            level: 1,
        }
    })
    const { control, handleSubmit } = form
    const handleCloseDialog = () => {
        onClose();
    };
    const handleOpenSubmitDialog = () => {
        onOpenSubmitDialog();
    };

    const handleOpenCancelDialog = () => {
        onOpenCancelDialog();
    };
    const onSubmit = (data: IChangeLevelPostBoostingField) => {
        if (boostingId !== null) {
            dispatch(changeLevelPostBoosting({
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
                    <Typography variant="h4">Chọn gói để gia hạn</Typography>
                </DialogTitle>
                <DialogContent>
                    <Box textAlign="center">
                        <form noValidate>
                            <Stack spacing={2} className='create-post-booting-form'>
                                <Controller
                                    control={control}
                                    name="level"
                                    render={({ field }) => (
                                        <>
                                            <Select
                                                {...field}
                                                label="Level"
                                                onChange={handleChangeValue}
                                                value={level}
                                            >
                                                <MenuItem value={1}>Default (1 BS-COINS)</MenuItem>
                                                <MenuItem value={2}>Medium(2 BS-COINS)</MenuItem>
                                                <MenuItem value={3}>Premium(3 BS-COINS)</MenuItem>
                                            </Select>
                                        </>
                                    )}
                                />

                            </Stack>
                            <Button
                                variant="contained"
                                color="success"
                                className="btn-action"
                                onClick={handleOpenSubmitDialog}
                            >
                                Đổi gói
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
                    <Typography variant="h5">Xác nhận đổi gói đẩy bài</Typography>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <Typography>Bạn có chắc chắn muốn đổi gói đẩy bài cho xe này không?</Typography>
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
        </div>)
}

export default ChangeLevelPostBoostingDialog
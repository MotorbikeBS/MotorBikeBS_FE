import React from 'react'
import { useAppDispatch } from '../../../../services/store/store';
import { Controller, useForm } from 'react-hook-form';
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
    TextField,
    Typography
} from '@mui/material';
import { createPostBooting } from '../../../../services/features/posting/postBootingSlice';
import './style/_createPostBooting.scss'
interface IPostingBootProps {
    open: boolean;
    motorId: number | null;
    openSubmit: boolean;
    openCancel: boolean;
    onOpenSubmitDialog: () => void
    onCloseSubmitDialog: () => void
    onOpenCancelDialog: () => void
    onCloseCancelDialog: () => void
    onClose: () => void
}
interface IPostingBootField {
    startTime: Date;
    endTime: Date;
    level: number
}
const CreatePostBootingDialog: React.FC<IPostingBootProps> = ({
    open,
    motorId,
    openSubmit,
    openCancel,
    onOpenSubmitDialog,
    onCloseSubmitDialog,
    onOpenCancelDialog,
    onCloseCancelDialog,
    onClose,
}) => {
    const dispatch = useAppDispatch()

    const [level, setLevel] = React.useState<number>(1);

    const handleChangeValue = (event: SelectChangeEvent<number>) => {
        setLevel(event.target.value as number);
    };

    const form = useForm<IPostingBootField>({
        defaultValues: {
            startTime: new Date(),
            endTime: undefined,
            level: 1,
        },
    });

    const { control, handleSubmit, setValue } = form;

    React.useEffect(() => {
        setValue('level', level);
    }, [level, setValue]);

    const handleCloseDialog = () => {
        onClose();
    };
    const handleOpenSubmitDialog = () => {
        onOpenSubmitDialog();
    };

    const handleOpenCancelDialog = () => {
        onOpenCancelDialog();
    };

    const onSubmit = (data: IPostingBootField) => {
        if (motorId !== null) {
            dispatch(createPostBooting({
                motorId: motorId,
                startTime: data.startTime,
                endTime: data.endTime,
                level: data.level
            }))
                .then(() => {
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
                    <Typography variant="h4">Chọn thời gian đẩy bài</Typography>
                </DialogTitle>
                <DialogContent>
                    <Box textAlign="center">
                        <form noValidate>
                            <Stack spacing={2} className='create-post-booting-form'>
                                <Controller
                                    name="startTime"
                                    control={control}
                                    render={({ field }) => (
                                        <TextField
                                            focused={true}
                                            label="Ngày bắt đầu"
                                            type="datetime-local"
                                            {...field}
                                            inputProps={{
                                                min: new Date()
                                            }}
                                        />
                                    )}
                                />
                                <Controller
                                    name="endTime"
                                    control={control}
                                    render={({ field }) => (
                                        <TextField
                                            focused={true}
                                            label="Ngày kết thúc"
                                            type="date"
                                            {...field}
                                            inputProps={{
                                                min: new Date(),
                                            }}
                                        />
                                    )}
                                />
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
                                color="primary"
                                className="btn-action"
                                onClick={handleOpenSubmitDialog}
                            >
                                Đẩy bài
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
                    <Typography variant="h5">Xác nhận đẩy bài</Typography>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <Typography>Bạn có chắc chắn muốn đẩy bài cho xe này không?</Typography>
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
            <Dialog open={openCancel}>
                <DialogTitle>
                    <Typography variant="h5">Xác nhận hủy bỏ</Typography>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <Typography>Bạn có chắc chắn muốn hủy bỏ đẩy bài cho xe này không?</Typography>
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

export default CreatePostBootingDialog
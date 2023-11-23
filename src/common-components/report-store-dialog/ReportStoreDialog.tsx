import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Input, Stack, TextField, TextareaAutosize, Typography } from '@mui/material';
import { format } from 'date-fns';
import React from 'react'
import { Controller, useForm } from 'react-hook-form';
import { useAppDispatch } from '../../services/store/store';
import { createReportStore } from '../../services/features/report/reportSlice';

type ReportDialogProps = {
    open: boolean;
    onClose: () => void
    storeId: number | null
    openSubmit: boolean
    openCancel: boolean
    onOpenSubmitDialog: () => void
    onCloseSubmitDialog: () => void
    onOpenCancelDialog: () => void
    onCloseCancelDialog: () => void
}
interface IReportFormField {
    title: string
    description: string
    images: FileList;
}
const ReportStoreDialog: React.FC<ReportDialogProps> = ({
    open,
    onClose,
    storeId,
    openSubmit,
    openCancel,
    onOpenSubmitDialog,
    onCloseSubmitDialog,
    onOpenCancelDialog,
    onCloseCancelDialog
}) => {
    const dispatch = useAppDispatch()

    const form = useForm<IReportFormField>({
        defaultValues: {
            description: "",
            title: "",
            images: undefined
        },
    });
    const clearForm = () => {
        form.reset();
    };
    const { register, formState, handleSubmit, control } = form;
    const { errors } = formState;


    const handleCloseDialog = () => {
        clearForm();
        onClose()
    }
    const handleOpenSubmitDialog = () => {
        onOpenSubmitDialog()
    }
    const handleOpenCancelDialog = () => {
        onOpenCancelDialog()
    }

    const onSubmit = (data: IReportFormField) => {
        const formData = new FormData();

        formData.append('title', data.title)
        formData.append('description', data.description)
        if (data.images && data.images.length > 0) {
            for (let i = 0; i < data.images.length; i++) {
                formData.append('images', data.images[i]);
            }
        }

        if (storeId !== null) {
            dispatch(createReportStore({
                storeId: storeId,
                title: data.title,
                description: data.description,
                images: data.images[0]
            }))
                .then(() => {

                    setTimeout(() => {
                        handleCloseDialog()
                    }, 1000)
                })
        }
    };


    return (
        <div>
            <Dialog open={open} onClose={handleOpenCancelDialog}>
                <DialogTitle>
                    <Typography variant="h4">Báo cáo cửa hàng</Typography>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <div>
                            <strong>Chú ý:</strong>
                            <Typography>
                                Bạn nên cuung cấp bằng hình ảnh rõ ràng, giúp chúng tôi xử lý tốt yêu cầu của bạn. Xin cảm ơn!
                            </Typography>
                        </div>
                    </DialogContentText>
                    <Box textAlign="center">
                        <form
                            noValidate
                            encType="multipart/form-data"
                        >
                            <Stack
                                spacing={2}
                                marginBottom='20px'
                                marginTop='20px'
                                maxWidth='70%'
                                marginLeft='13%'
                            >
                                <TextField
                                    label="Tiêu đề báo cáo"
                                    type="text"
                                    {...register('title', {
                                        required: 'Bạn chưa nhập tiêu đề báo cáo',
                                    })}
                                    error={!!errors.title}
                                    helperText={errors.title?.message}
                                    variant="outlined"
                                />
                                <Controller
                                    name="description"
                                    control={control}
                                    render={({ field }) => (
                                        <TextareaAutosize
                                            {...field}
                                            placeholder="Viết báo cáo ..."
                                            style={{
                                                width: '100%',
                                                height: '60px',
                                                resize: 'none',
                                            }}
                                        />
                                    )}
                                    rules={{
                                        required: 'Bạn chưa nhập mô tả cho cửa hàng',
                                    }}

                                />
                                {errors.description && (
                                    <Typography variant="subtitle2" color="error" alignContent='start'>
                                        {errors.description.message}
                                    </Typography>
                                )}
                                <label style={{ textAlign: 'left' }} htmlFor="images">
                                    Hình ảnh cụ thể:
                                </label>
                                <Input
                                    id="images"
                                    type="file"
                                    {...register('images', {
                                        required: 'Bạn chưa chọn ảnh cho cửa hàng',
                                        validate: value => value.length > 0 || 'Bạn chưa chọn ảnh cho cửa hàng'
                                    })}
                                    inputProps={{
                                        multiple: true,
                                        accept: '.png, .jpg, .jpeg, .gif, .svg',
                                    }}
                                />
                                {errors.images && (
                                    <Typography variant="subtitle2" color="error" alignContent='start'>
                                        {errors.images.message}
                                    </Typography>
                                )}
                            </Stack>
                            <Button
                                variant="contained"
                                color="primary"
                                className="btn-booking"
                                onClick={handleOpenSubmitDialog}
                            >
                                Báo cáo
                            </Button>
                        </form>
                    </Box>
                    <DialogActions>
                        <Button
                            onClick={handleOpenCancelDialog}
                            color="error"
                            variant="outlined"
                        >
                            Hủy bỏ
                        </Button>
                    </DialogActions>
                </DialogContent>
            </Dialog>
            <Dialog open={openSubmit}>
                <DialogTitle>
                    <Typography variant="h5">Xác nhận báo cáo</Typography>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <Typography>Bạn có chắc chắn muốn báo cáo cửa hàng không ?</Typography>
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
                        <Typography>Bạn có chắc chắn muốn hủy bỏ báo cáo cửa hàng không ?</Typography>
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

export default ReportStoreDialog
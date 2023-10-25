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

interface CreateContractDialogProps {
    open: boolean;
    bookingId: number | null
    openSubmit: boolean;
    openCancle: boolean;
    onOpenSubmitDialog: () => void;
    onCloseSubmitDialog: () => void;
    onOpenCancelDialog: () => void;
    onCloseCancelDialog: () => void;
    onClose: () => void;
}

interface ICreateContractForm {
    bookingId: number | null
    content: string
    images: FileList
}

const CreateContractDialogByStore: React.FC<CreateContractDialogProps> = ({
    open,
    bookingId,
    openSubmit,
    openCancle,
    onOpenCancelDialog,
    onOpenSubmitDialog,
    onCloseSubmitDialog,
    onCloseCancelDialog,
    onClose
}) => {
    const dispatch = useAppDispatch()

    const form = useForm<ICreateContractForm>({
        defaultValues: {
            bookingId: null,
            content: '',
            images: undefined
        }
    });

    const { formState, handleSubmit, register } = form;
    const { errors } = formState;

    const handleCloseDialog = () => {
        onClose();
    };
    const handleOpenSubmitDialog = () => {
        onOpenSubmitDialog();
    };

    const handleOpenCancelDialog = () => {
        onOpenCancelDialog();
    };

    const onSubmit = (data: ICreateContractForm) => {
        const formData = new FormData();
        formData.append('content', data.content);
        if (data.images && data.images.length > 0) {
            for (let i = 0; i < data.images.length; i++) {
                formData.append('images', data.images[i]);
            }
        }
        dispatch(createContractByStore({
            bookingId: Number(bookingId),
            data: formData
        }))
            .unwrap()
            .then(() => {
                // loadData();
                handleCloseDialog();
            })
            .catch((error) => {
                onCloseSubmitDialog()
            })

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
                        Tạo hợp đồng (bảng mềm)
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
                            <Typography>Vui lòng tải lên hợp đồng (bản mềm) 1 cách rõ ràng đê thuận tiện cho việc quản lý </Typography>
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
                                }}
                            >
                                <TextareaAutosize
                                    className="aria-note custom-textarea"
                                    aria-label="Lưu ý của bạn"
                                    {...register('content')}
                                    style={{
                                        width: '345px',
                                        height: '50px',
                                    }}
                                />
                                <Input
                                    id="images"
                                    type="file"
                                    {...register(
                                        'images',
                                        {
                                            required:
                                                'Bạn chưa chọn ảnh cho hợp đồng',
                                        },
                                    )}
                                    inputProps={{
                                        multiple: true,
                                        accept: '.png, .jpg, .jpeg, .gif, .svg',
                                    }}

                                />
                                <br />
                                {errors.images && (
                                    <span className="error-message">
                                        {
                                            errors
                                                .images
                                                .message
                                        }
                                    </span>
                                )}
                            </Stack>
                            <Button
                                variant="contained"
                                color="success"
                                className="btn-create-contract"
                                onClick={handleOpenSubmitDialog}
                            >
                                Tạo Hợp Đồng
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

export default CreateContractDialogByStore
import React, { useEffect } from 'react';
import { IMotorTypeTable } from '../../../../../models/Motorbike/Motorbike';
import { useForm } from 'react-hook-form';
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    TextField,
    TextareaAutosize,
    Typography,
} from '@mui/material';
import { useAppDispatch } from '../../../../../services/store/store';
import { updateMotorTypeById } from '../../../../../services/features/motorbike/motorFields';
import { toast } from 'react-toastify';

interface EditDialogProps {
    open: boolean;
    openSubmit: boolean;
    openCancel: boolean;
    onOpenSubmitDialog: () => void;
    onCloseSubmitDialog: () => void;
    onOpenCancelDialog: () => void;
    onCloseCancelDialog: () => void;
    onClose: () => void;
    selectedRow: IMotorTypeTable | null;
    loadData: () => void;
}

interface ICreateType {
    title: string;
    description: string;
    status: string;
}

const EditTypeModal: React.FC<EditDialogProps> = ({
    open,
    openSubmit,
    openCancel,
    onOpenCancelDialog,
    onOpenSubmitDialog,
    onCloseSubmitDialog,
    onCloseCancelDialog,
    onClose,
    selectedRow,
    loadData,
}) => {
    const dispatch = useAppDispatch();
    const form = useForm<ICreateType>({
        defaultValues: {
            title: '',
            description: '',
            status: '',
        },
    });

    useEffect(() => {
        if (selectedRow) {
            form.setValue('title', selectedRow?.title);
            form.setValue('description', selectedRow?.description || '');
            form.setValue('status', selectedRow?.status || '');
        }
    }, [selectedRow, form]);

    const { formState, handleSubmit, register } = form;
    const { errors } = formState;

    const handleOpenSubmitDialog = () => {
        onOpenSubmitDialog();
    };

    const handleOpenCancelDialog = () => {
        onOpenCancelDialog();
    };

    const handleCloseDialog = () => {
        onClose();
    };

    const onSubmit = (data: ICreateType) => {
        dispatch(
            updateMotorTypeById({
                id: Number(selectedRow?.id),
                title: data.title,
                description: data.description,
                status: data.status,
            }),
        )
            .unwrap()
            .then(() => {
                loadData();
                toast.success('Chỉnh sửa thành công!');
                handleCloseDialog();
            })
            .catch((e) => {});
    };
    return (
        <div>
            <Dialog open={open} onClose={handleOpenCancelDialog}>
                <DialogTitle>
                    <Typography variant="h4" textAlign="center">
                        Chỉnh Sửa Loại xe
                    </Typography>
                </DialogTitle>
                <DialogContent>
                    <Box textAlign="center">
                        <form encType="multipart/form-data" noValidate>
                            <Box flexGrow={12} className="table-content">
                                <Box flexGrow={10}>
                                    <TableContainer component={Paper}>
                                        <Table>
                                            <TableBody>
                                                <TableRow>
                                                    <TableCell className="header-table">
                                                        Tên Loại xe
                                                    </TableCell>
                                                    <TableCell>
                                                        <TextField
                                                            label="Loại xe"
                                                            type="text"
                                                            {...register(
                                                                'title',
                                                                {
                                                                    required:
                                                                        'Bạn chưa nhập loại xe',
                                                                },
                                                            )}
                                                            error={
                                                                !!errors.title
                                                            }
                                                            helperText={
                                                                errors.title
                                                                    ?.message
                                                            }
                                                            variant="outlined"
                                                            fullWidth
                                                        />
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell className="header-table">
                                                        Mô tả
                                                    </TableCell>
                                                    <TableCell className="header-table-content">
                                                        <TextareaAutosize
                                                            aria-label="Mô tả của xe"
                                                            {...register(
                                                                'description',
                                                            )}
                                                            style={{
                                                                width: '350px',
                                                                height: '50px',
                                                            }}
                                                        />
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell className="header-table">
                                                        Trạng thái
                                                    </TableCell>
                                                    <TableCell>
                                                        <TextField
                                                            label="Trạng thái"
                                                            type="text"
                                                            {...register(
                                                                'status',
                                                            )}
                                                            variant="outlined"
                                                            fullWidth
                                                        />
                                                    </TableCell>
                                                </TableRow>
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </Box>
                            </Box>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleOpenSubmitDialog}
                            >
                                Chỉnh sửa
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
                    <Typography variant="h5">
                        Xác nhận Chỉnh sửa Loại xe
                    </Typography>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <Typography>
                            Bạn có chắc chắn muốn chỉnh sửa loại xe không ?
                        </Typography>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        color="error"
                        variant="outlined"
                        onClick={onCloseSubmitDialog}
                    >
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
                        <Typography>
                            Bạn có chắc chắn muốn hủy bỏ chỉnh sửa loại xe không
                            ?
                        </Typography>
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
    );
};

export default EditTypeModal;

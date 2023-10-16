import React, { useEffect } from 'react';
import { IBrandTable } from '../../../../../models/Motorbike/Motorbike';
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
    Typography,
} from '@mui/material';
import { useAppDispatch } from '../../../../../services/store/store';
import { updateMotorBrandById } from '../../../../../services/features/motorbike/motorFields';

interface EditDialogProps {
    open: boolean;
    openSubmit: boolean;
    openCancel: boolean;
    onOpenSubmitDialog: () => void;
    onCloseSubmitDialog: () => void;
    onOpenCancelDialog: () => void;
    onCloseCancelDialog: () => void;
    onClose: () => void;
    selectedRow: IBrandTable | null;
    loadData: () => void;
}

interface ICreateBrand {
    brandName: string;
    description: string;
    status: string;
}

const EditBrandModal: React.FC<EditDialogProps> = ({
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
    const form = useForm<ICreateBrand>({
        defaultValues: {
            brandName: '',
            description: '',
            status: '',
        },
    });

    useEffect(() => {
        if (selectedRow) {
            form.setValue('brandName', selectedRow?.brandName);
            form.setValue('description', selectedRow?.description || '');
            form.setValue('status', selectedRow?.status);
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

    const onSubmit = (data: ICreateBrand) => {
        dispatch(
            updateMotorBrandById({
                id: Number(selectedRow?.id),
                brandName: data.brandName,
                description: data.description,
                status: data.status,
            }),
        );
    };
    return (
        <div>
            <Dialog open={open} onClose={handleOpenCancelDialog}>
                <DialogTitle>
                    <Typography variant="h4" textAlign="center">
                        Chỉnh Sửa Brand
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
                                                        Tên Brand
                                                    </TableCell>
                                                    <TableCell>
                                                        <TextField
                                                            label="Tên Brand"
                                                            type="text"
                                                            {...register(
                                                                'brandName',
                                                                {
                                                                    required:
                                                                        'Bạn chưa nhập số đăng ký xe',
                                                                },
                                                            )}
                                                            error={
                                                                !!errors.brandName
                                                            }
                                                            helperText={
                                                                errors.brandName
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
                                                    <TableCell>
                                                        <TextField
                                                            label="Mô tả"
                                                            type="text"
                                                            {...register(
                                                                'description',
                                                            )}
                                                            variant="outlined"
                                                            fullWidth
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
                        Xác nhận Chỉnh sửa brand
                    </Typography>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <Typography>
                            Bạn có chắc chắn muốn chỉnh sửa brand không ?
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
                            Bạn có chắc chắn muốn hủy bỏ chỉnh sửa brand không ?
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

export default EditBrandModal;

import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    FormControl,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    SelectChangeEvent,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    TextField,
    TextareaAutosize,
    Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import { toast } from 'react-toastify';
import { createMotorModel } from '../../../services/features/motorbike/motorFields';
import { useAppDispatch, useAppSelector } from '../../../services/store/store';

interface CreateDialogProps {
    open: boolean;
    openSubmit: boolean;
    openCancel: boolean;
    onOpenSubmitDialog: () => void;
    onCloseSubmitDialog: () => void;
    onOpenCancelDialog: () => void;
    onCloseCancelDialog: () => void;
    onClose: () => void;
    loadData: () => void;
}

interface ICreateModel {
    brandId: number;
    modelName: string;
    description: string;
    status: string;
}

const CreateModelModal: React.FC<CreateDialogProps> = ({
    open,
    openSubmit,
    openCancel,
    onOpenCancelDialog,
    onOpenSubmitDialog,
    onCloseSubmitDialog,
    onCloseCancelDialog,
    onClose,
    loadData,
}) => {
    const dispatch = useAppDispatch();
    const { motorBrands } = useAppSelector((state) => state.motorFields);

    const [brand, setBrand] = useState('');

    const handleChangeBrand = (event: SelectChangeEvent) => {
        setBrand(event.target.value);
    };

    const form = useForm<ICreateModel>({
        defaultValues: {
            brandId: undefined,
            modelName: '',
            description: '',
            status: 'PENDING',
        },
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

    const onSubmit = (data: ICreateModel) => {
        dispatch(
            createMotorModel({
                modelName: data.modelName,
                description: data.description,
                status: data.status,
                brandId: data.brandId,
            }),
        )
            .unwrap()
            .then(() => {
                loadData();
                toast.success('Thêm Model thành công!');
                toast.warning('Bạn vui lòng chờ admin duyệt!');
                handleCloseDialog();
            })
            .catch((e) => { });
    };

    const motorBrandFilter =
        motorBrands &&
        motorBrands?.filter((motor) => motor.status === 'ACTIVE');

    return (
        <div>
            <Dialog open={open} onClose={handleOpenCancelDialog}>
                <DialogTitle>
                    <Typography variant="h4" textAlign="center">
                        Thêm Model
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
                                                        Brand
                                                    </TableCell>
                                                    <TableCell className="header-table-content">
                                                        <FormControl fullWidth>
                                                            <InputLabel id="demo-simple-select-label">
                                                                Brand
                                                            </InputLabel>
                                                            <Select
                                                                labelId="demo-simple-select-label"
                                                                label="Model"
                                                                value={brand}
                                                                {...register(
                                                                    'brandId',
                                                                    {
                                                                        required:
                                                                            'Bạn chưa chọn brand xe',
                                                                    },
                                                                )}
                                                                onChange={
                                                                    handleChangeBrand
                                                                }
                                                            >
                                                                {motorBrandFilter &&
                                                                    motorBrandFilter.map(
                                                                        (
                                                                            motorBrand,
                                                                        ) => (
                                                                            <MenuItem
                                                                                key={
                                                                                    motorBrand.brandId
                                                                                }
                                                                                value={
                                                                                    motorBrand.brandId
                                                                                }
                                                                            >
                                                                                {
                                                                                    motorBrand.brandName
                                                                                }
                                                                            </MenuItem>
                                                                        ),
                                                                    )}
                                                            </Select>
                                                            {errors?.brandId && (
                                                                <span className="error-message">
                                                                    {
                                                                        errors
                                                                            ?.brandId
                                                                            ?.message
                                                                    }
                                                                </span>
                                                            )}
                                                        </FormControl>
                                                    </TableCell>
                                                </TableRow>

                                                <TableRow>
                                                    <TableCell className="header-table">
                                                        Tên Model
                                                    </TableCell>
                                                    <TableCell>
                                                        <TextField
                                                            label="Model"
                                                            type="text"
                                                            {...register(
                                                                'modelName',
                                                                {
                                                                    required:
                                                                        'Bạn chưa nhập tên model',
                                                                },
                                                            )}
                                                            error={
                                                                !!errors.modelName
                                                            }
                                                            helperText={
                                                                errors.modelName
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
                                Thêm model
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

            {/* Dialog Đặt lịch */}
            <Dialog open={openSubmit}>
                <DialogTitle>
                    <Typography variant="h5">Xác nhận Thêm model</Typography>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <Typography>
                            Bạn có chắc chắn muốn thêm model không ?
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
            {/* Dialog Hủy */}
            <Dialog open={openCancel}>
                <DialogTitle>
                    <Typography variant="h5">Xác nhận hủy bỏ</Typography>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <Typography>
                            Bạn có chắc chắn muốn hủy bỏ thêm model không ?
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

export default CreateModelModal;

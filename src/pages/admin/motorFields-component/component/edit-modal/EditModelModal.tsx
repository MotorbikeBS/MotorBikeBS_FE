import React, { useEffect, useState } from 'react';
import {
    IModelTable,
} from '../../../../../models/Motorbike/Motorbike';
import { useForm } from 'react-hook-form';
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
import {
    useAppDispatch,
    useAppSelector,
} from '../../../../../services/store/store';
import {
    updateMotorModelById,
} from '../../../../../services/features/motorbike/motorFields';
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
    selectedRow: IModelTable | null;
    loadData: () => void;
}

interface ICreateModel {
    brandId: number;
    modelName: string;
    description: string;
    status: string;
}

const EditModelModal: React.FC<EditDialogProps> = ({
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
    const { motorModel, motorBrands } = useAppSelector(
        (state) => state.motorFields,
    );
    const [brand, setBrand] = useState('');

    const handleChangeBrand = (event: SelectChangeEvent) => {
        setBrand(event.target.value);
    };

    // useEffect(() => {
    //     dispatch(getMotorModelById({ id: Number(selectedRow?.id) }));
    // }, [dispatch, selectedRow]);

    // console.log(motorModel);

    const form = useForm<ICreateModel>({
        defaultValues: {
            brandId: undefined,
            modelName: '',
            description: '',
            status: 'ACTIVE',
        },
    });

    useEffect(() => {
        if (motorModel) {
            // form.setValue('brandId', model);
            form.setValue('modelName', motorModel?.modelName);
            form.setValue('description', motorModel?.description || '');
            form.setValue('status', motorModel?.status);
        }
    }, [motorModel, form]);

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

    const onSubmit = (data: ICreateModel) => {
        dispatch(
            updateMotorModelById({
                id: Number(selectedRow?.id),
                modelName: data?.modelName,
                description: data?.description,
                status: data?.status,
                brandId: data?.brandId,
            })
        ).unwrap().then(()=>{
            toast.success('Chỉnh sửa thành công!');
            handleCloseDialog()
        })
    };
    return (
        <div>
            <Dialog open={open} onClose={handleOpenCancelDialog}>
                <DialogTitle>
                    <Typography variant="h4" textAlign="center">
                        Chỉnh Sửa Model
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
                                                                {motorBrands &&
                                                                    motorBrands.map(
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
                                                                        'Bạn chưa nhập model',
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
                                                            disabled
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
                        Xác nhận Chỉnh sửa Model
                    </Typography>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <Typography>
                            Bạn có chắc chắn muốn chỉnh sửa model không ?
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
                            Bạn có chắc chắn muốn hủy bỏ chỉnh sửa Model không ?
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

export default EditModelModal;

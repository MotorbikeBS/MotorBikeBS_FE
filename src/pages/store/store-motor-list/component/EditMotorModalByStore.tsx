import React, { useEffect, useState } from 'react';
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
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    TextareaAutosize,
    SelectChangeEvent,
    Input,
} from '@mui/material';

import { toast } from 'react-toastify';

import {
    useAppDispatch,
    useAppSelector,
} from '../../../../services/store/store';
import { IMotorbike } from '../../../../models/Motorbike/Motorbike';
import {
    getMotorModel,
    getMotorType,
} from '../../../../services/features/motorbike/motorFields';
import {
    getMotorId,
    updateMotorById,
} from '../../../../services/features/motorbike/motorbikeSlice';

interface EditDialogProps {
    open: boolean;
    openSubmit: boolean;
    openCancel: boolean;
    onOpenSubmitDialog: () => void;
    onCloseSubmitDialog: () => void;
    onOpenCancelDialog: () => void;
    onCloseCancelDialog: () => void;
    onClose: () => void;
    selectedRow: IMotorbike | null;
    loadData: () => void;
}

interface ICreateMotorbike {
    certificateNumber: string;
    registrationImage: FileList;
    motorName: string;
    modelId: number;
    odo: number;
    year: Date;
    price: number;
    description: string;
    motorStatusId: number;
    storeId: number;
    motorTypeId: number;
    images: FileList;
}

const EditMotorModalByStore: React.FC<EditDialogProps> = ({
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
    const { motorbike } = useAppSelector((state) => state.motorbikes);
    const { motorModels, motorTypes } = useAppSelector(
        (state) => state.motorFields,
    );

    const { user } = useAppSelector((state) => state.users);

    const [model, setModel] = useState('');
    const [motorType, setMotorType] = useState('');

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('vi-VN', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
        });
    };

    const handleChangeModel = (event: SelectChangeEvent) => {
        setModel(event.target.value);
    };

    console.log(model);
    const handleChangeType = (event: SelectChangeEvent) => {
        setMotorType(event.target.value);
    };

    useEffect(() => {
        dispatch(getMotorModel());
        dispatch(getMotorType());
        dispatch(getMotorId({ motorId: Number(selectedRow?.id) }));
    }, [dispatch, selectedRow]);

    const form = useForm<ICreateMotorbike>({
        defaultValues: {
            certificateNumber: '',
            registrationImage: undefined,
            motorName: '',
            modelId: undefined,
            odo: undefined,
            year: new Date(),
            price: undefined,
            description: '',
            motorStatusId: undefined,
            storeId: undefined,
            motorTypeId: undefined,
            images: undefined,
        },
    });

    useEffect(() => {
        if (motorbike) {
            form.setValue('certificateNumber', motorbike?.certificateNumber);
            form.setValue('motorName', motorbike?.motorName);
            form.setValue('modelId', motorbike?.model?.modelId);
            form.setValue('odo', motorbike?.odo);
            form.setValue('price', motorbike?.price);
            form.setValue('description', motorbike?.description || '');
            form.setValue(
                'motorStatusId',
                motorbike?.motorStatus?.motorStatusId,
            );
            form.setValue(
                'storeId',
                Number(user?.storeDesciptions[0]?.storeId),
            );
            form.setValue('motorTypeId', motorbike?.motorType?.motorTypeId);
        }
    }, [motorbike, form, user]);

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

    const onSubmit = (data: ICreateMotorbike) => {
        const formData = new FormData();
        const year = new Date(data.year);
        formData.append('certificateNumber', data.certificateNumber);
        if (data.registrationImage && data.registrationImage.length > 0) {
            formData.append('registrationImage', data.registrationImage[0]);
        }
        formData.append('motorName', data.motorName);
        formData.append('modelId', data.modelId.toString());

        formData.append('odo', data.odo.toString());
        formData.append('year', year.toDateString());
        formData.append('price', data.price.toString());
        formData.append('description', data.description);
        // formData.append('motorStatusId', data.motorStatusId.toString());
        if (data.motorStatusId !== undefined) {
            formData.append('motorStatusId', data.motorStatusId.toString());
        }
        if (data.storeId !== undefined) {
            formData.append('storeId', data.storeId.toString());
        }

        formData.append('motorTypeId', data.motorTypeId.toString());
        if (data.images && data.images.length > 0) {
            for (let i = 0; i < data.images.length; i++) {
                formData.append('images', data.images[i]);
            }
        }
        console.log(data);
        // handleCloseDialog();

        dispatch(
            updateMotorById({
                motorId: Number(motorbike?.motorId),
                data: formData,
            }),
        )
            .unwrap()
            .then(() => {
                loadData();
                toast.success('Chỉnh sửa xe thành công.');
                handleCloseDialog();
            })
            .catch((error) => {
                // console.log(error);
                toast.error(error?.error[0]);
            });
    };

    const motorModelsFilter =
        motorModels &&
        motorModels?.filter((motor) => motor?.status === 'ACTIVE');

    return (
        <div>
            <Dialog open={open} onClose={handleOpenCancelDialog}>
                <DialogTitle>
                    <Typography variant="h4" textAlign="center">
                        Chỉnh Sửa Xe
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
                                                        Số đăng ký xe
                                                    </TableCell>
                                                    <TableCell>
                                                        <TextField
                                                            label="Số đăng ký xe"
                                                            type="text"
                                                            {...register(
                                                                'certificateNumber',
                                                                {
                                                                    required:
                                                                        'Bạn chưa nhập số đăng ký xe',
                                                                },
                                                            )}
                                                            error={
                                                                !!errors.certificateNumber
                                                            }
                                                            helperText={
                                                                errors
                                                                    ?.certificateNumber
                                                                    ?.message
                                                            }
                                                            variant="outlined"
                                                            fullWidth
                                                        />
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell className="header-table">
                                                        Thêm ảnh đăng ký xe
                                                    </TableCell>
                                                    <TableCell className="header-table-content">
                                                        <Input
                                                            id="registrationImage"
                                                            type="file"
                                                            {...register(
                                                                'registrationImage',
                                                                {
                                                                    required:
                                                                        'Bạn chưa chọn ảnh đăng ký xe',
                                                                },
                                                            )}
                                                        />
                                                        <br />
                                                        {errors.registrationImage && (
                                                            <span className="error-message">
                                                                {
                                                                    errors
                                                                        ?.registrationImage
                                                                        ?.message
                                                                }
                                                            </span>
                                                        )}
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell
                                                        style={{
                                                            fontWeight: 'bold',
                                                        }}
                                                        className="header-table"
                                                    >
                                                        Tên xe
                                                    </TableCell>
                                                    <TableCell className="header-table-content">
                                                        <TextField
                                                            label="Tên xe"
                                                            type="text"
                                                            {...register(
                                                                'motorName',
                                                                {
                                                                    required:
                                                                        'Bạn chưa nhập tên xe',
                                                                },
                                                            )}
                                                            error={
                                                                !!errors?.motorName
                                                            }
                                                            helperText={
                                                                errors?.motorName
                                                                    ?.message
                                                            }
                                                            variant="outlined"
                                                            fullWidth
                                                        />
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell className="header-table">
                                                        Model
                                                    </TableCell>
                                                    <TableCell className="header-table-content">
                                                        <FormControl fullWidth>
                                                            <InputLabel id="demo-simple-select-label">
                                                                Model
                                                            </InputLabel>
                                                            <Select
                                                                labelId="demo-simple-select-label"
                                                                label="Model"
                                                                value={
                                                                    String(
                                                                        model,
                                                                    ) ||
                                                                    String(
                                                                        motorbike
                                                                            ?.model
                                                                            ?.modelId,
                                                                    ) ||
                                                                    ''
                                                                }
                                                                {...register(
                                                                    'modelId',
                                                                    {
                                                                        required:
                                                                            'Bạn chưa chọn model xe',
                                                                    },
                                                                )}
                                                                onChange={
                                                                    handleChangeModel
                                                                }
                                                            >
                                                                {motorModelsFilter &&
                                                                    motorModelsFilter.map(
                                                                        (
                                                                            motorModel,
                                                                        ) => (
                                                                            <MenuItem
                                                                                key={
                                                                                    motorModel?.modelId
                                                                                }
                                                                                value={
                                                                                    motorModel?.modelId
                                                                                }
                                                                            >
                                                                                {
                                                                                    motorModel?.modelName
                                                                                }
                                                                            </MenuItem>
                                                                        ),
                                                                    )}
                                                            </Select>
                                                            {errors.modelId && (
                                                                <span className="error-message">
                                                                    {
                                                                        errors
                                                                            ?.modelId
                                                                            ?.message
                                                                    }
                                                                </span>
                                                            )}
                                                        </FormControl>
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell className="header-table">
                                                        Số Km đã đi
                                                    </TableCell>
                                                    <TableCell className="header-table-content">
                                                        <TextField
                                                            label="Số Km đã đi"
                                                            type="text"
                                                            {...register(
                                                                'odo',
                                                                {
                                                                    required:
                                                                        'Bạn chưa nhập số km đã đi',
                                                                },
                                                            )}
                                                            error={!!errors?.odo}
                                                            helperText={
                                                                errors?.odo
                                                                    ?.message
                                                            }
                                                            variant="outlined"
                                                            fullWidth
                                                        />
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell className="header-table">
                                                        Ngày đăng ký cũ
                                                    </TableCell>
                                                    <TableCell className="header-table-content">
                                                        <TextField
                                                            label="Ngày đăng ký cũ"
                                                            // value={motorbike ? formatDate(motorbike?.year.toLocaleString()) : new Date()}
                                                            value={
                                                                motorbike &&
                                                                motorbike?.year
                                                                    ? formatDate(
                                                                          motorbike?.year.toLocaleString(),
                                                                      )
                                                                    : new Date().toLocaleString(
                                                                          'vi-VN',
                                                                      )
                                                            }
                                                            type="text"
                                                            variant="outlined"
                                                            fullWidth
                                                            disabled
                                                        />
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell className="header-table">
                                                        Ngày đăng ký
                                                    </TableCell>
                                                    <TableCell className="header-table-content">
                                                        <TextField
                                                            label="Ngày đăng ký"
                                                            type="date"
                                                            {...register(
                                                                'year',
                                                                {
                                                                    required:
                                                                        'Bạn chưa nhập đăng ký mới',
                                                                },
                                                            )}
                                                            error={
                                                                !!errors?.year
                                                            }
                                                            helperText={
                                                                errors?.year
                                                                    ?.message
                                                            }
                                                            variant="outlined"
                                                            fullWidth
                                                        />
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell className="header-table">
                                                        Giá
                                                    </TableCell>
                                                    <TableCell className="header-table-content">
                                                        <TextField
                                                            label="Giá"
                                                            type="text"
                                                            {...register(
                                                                'price',
                                                                {
                                                                    required:
                                                                        'Bạn chưa nhập giá xe',
                                                                },
                                                            )}
                                                            error={
                                                                !!errors?.price
                                                            }
                                                            helperText={
                                                                errors?.price
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
                                                    <TableCell className="header-table-content">
                                                        <FormControl fullWidth>
                                                            <InputLabel id="motor-type">
                                                                Trạng thái
                                                            </InputLabel>
                                                            <Select
                                                                labelId="motor-type"
                                                                label="Trạng thái"
                                                                value={
                                                                    motorbike?.motorStatus &&
                                                                    motorbike
                                                                        ?.motorStatus
                                                                        ?.motorStatusId
                                                                        ? motorbike
                                                                              .motorStatus
                                                                              .motorStatusId
                                                                        : ''
                                                                }
                                                                {...register(
                                                                    'motorStatusId',
                                                                )}
                                                                disabled
                                                            >
                                                                <MenuItem
                                                                    value={
                                                                        motorbike?.motorStatus &&
                                                                        motorbike
                                                                            ?.motorStatus
                                                                            ?.motorStatusId
                                                                            ? motorbike
                                                                                  ?.motorStatus
                                                                                  ?.motorStatusId
                                                                            : ''
                                                                    }
                                                                >
                                                                    {motorbike?.motorStatus &&
                                                                    motorbike
                                                                        ?.motorStatus
                                                                        ?.title
                                                                        ? motorbike
                                                                              ?.motorStatus
                                                                              ?.title
                                                                        : ''}
                                                                </MenuItem>
                                                            </Select>
                                                        </FormControl>
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell className="header-table">
                                                        Loại xe
                                                    </TableCell>
                                                    <TableCell className="header-table-content">
                                                        <FormControl fullWidth>
                                                            <InputLabel id="motor-type">
                                                                Loại xe
                                                            </InputLabel>
                                                            <Select
                                                                labelId="motor-type"
                                                                label="Loại xe"
                                                                value={
                                                                    String(
                                                                        motorType,
                                                                    ) ||
                                                                    String(
                                                                        motorbike
                                                                            ?.motorType
                                                                            ?.motorTypeId,
                                                                    ) ||
                                                                    ''
                                                                }
                                                                {...register(
                                                                    'motorTypeId',
                                                                    {
                                                                        required:
                                                                            'Bạn chưa chọn loại xe',
                                                                    },
                                                                )}
                                                                onChange={
                                                                    handleChangeType
                                                                }
                                                            >
                                                                {motorTypes &&
                                                                    motorTypes.map(
                                                                        (
                                                                            motorType,
                                                                        ) => (
                                                                            <MenuItem
                                                                                value={
                                                                                    motorType?.motorTypeId
                                                                                }
                                                                            >
                                                                                {
                                                                                    motorType?.title
                                                                                }
                                                                            </MenuItem>
                                                                        ),
                                                                    )}
                                                            </Select>
                                                            {errors.motorTypeId && (
                                                                <span className="error-message">
                                                                    {
                                                                        errors
                                                                            ?.motorTypeId
                                                                            ?.message
                                                                    }
                                                                </span>
                                                            )}
                                                        </FormControl>
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell className="header-table">
                                                        Thêm ảnh
                                                    </TableCell>
                                                    <TableCell className="header-table-content">
                                                        <Input
                                                            id="images"
                                                            type="file"
                                                            {...register(
                                                                'images',
                                                                {
                                                                    required:
                                                                        'Bạn chưa chọn ảnh cho cửa hàng',
                                                                },
                                                            )}
                                                            inputProps={{
                                                                multiple: true,
                                                            }}
                                                        />
                                                        <br />
                                                        {errors.images && (
                                                            <span className="error-message">
                                                                {
                                                                    errors
                                                                        ?.images
                                                                        ?.message
                                                                }
                                                            </span>
                                                        )}
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

            {/* Dialog Chỉnh sửa xe */}
            <Dialog open={openSubmit}>
                <DialogTitle>
                    <Typography variant="h5">Xác nhận Chỉnh sửa xe</Typography>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <Typography>
                            Bạn có chắc chắn muốn chỉnh sửa xe không ?
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
                            Bạn có chắc chắn muốn hủy bỏ chỉnh sửa xe không ?
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

export default EditMotorModalByStore;

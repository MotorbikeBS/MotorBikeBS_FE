import React, { useEffect, useState } from 'react';
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
    Typography,
} from '@mui/material';
import {
    useAppDispatch,
    useAppSelector,
} from '../../../../services/store/store';
import { IMotorbike } from '../../../../models/Motorbike/Motorbike';
import {
    getMotorId,
    updateMotorStatus,
} from '../../../../services/features/motorbike/motorbikeSlice';
import { toast } from 'react-toastify';
import { getUserByID } from '../../../../services/features/user/userSlice';
interface PostDialogProps {
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

const PostMotorModalByStore: React.FC<PostDialogProps> = ({
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
    const { account } = useAppSelector((state) => state.account);
    const { motorbike } = useAppSelector((state) => state.motorbikes);

    const [motorStatus, setMotorStatus] = useState('');

    const handleChangeStatus = (event: SelectChangeEvent) => {
        setMotorStatus(event.target.value);
    };

    useEffect(() => {
        dispatch(getUserByID({ id: Number(account?.userId) }));
        dispatch(getMotorId({ motorId: Number(selectedRow?.id) }));
    }, [dispatch, account, selectedRow]);

    const handleCloseDialog = () => {
        onClose();
    };
    const handleOpenSubmitDialog = () => {
        onOpenSubmitDialog();
    };

    const handleOpenCancelDialog = () => {
        onOpenCancelDialog();
    };

    const handleSubmitUpdateMotorStatus = () => {
        dispatch(
            updateMotorStatus({
                motorId: Number(selectedRow?.id),
                statusId: Number(motorStatus),
            }),
        )
            .unwrap()
            .then(() => {
                toast.success('Đăng bài thành công!');
                loadData();
                handleCloseDialog();
            })
            .catch((error) => {
            });
    };

    return (
        <div>
            <Dialog open={open} onClose={handleOpenCancelDialog}>
                <DialogTitle>
                    <Typography variant="h4" textAlign="center">
                        Đăng bài xe
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
                                                            variant="outlined"
                                                            fullWidth
                                                            value={
                                                                selectedRow?.certificateNumber
                                                            }
                                                            disabled
                                                        />
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
                                                            value={
                                                                selectedRow?.motorName
                                                            }
                                                            variant="outlined"
                                                            fullWidth
                                                            disabled
                                                        />
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell className="header-table">
                                                        Model
                                                    </TableCell>
                                                    <TableCell className="header-table-content">
                                                        <TextField
                                                            label="Model"
                                                            type="text"
                                                            value={
                                                                selectedRow?.modelName
                                                            }
                                                            variant="outlined"
                                                            fullWidth
                                                            disabled
                                                        />
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
                                                            value={
                                                                selectedRow?.odo
                                                            }
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
                                                            type="text"
                                                            value={
                                                                selectedRow?.year
                                                            }
                                                            variant="outlined"
                                                            fullWidth
                                                            disabled
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
                                                            value={
                                                                selectedRow?.price
                                                            }
                                                            variant="outlined"
                                                            fullWidth
                                                            disabled
                                                        />
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell className="header-table">
                                                        Loại xe
                                                    </TableCell>
                                                    <TableCell className="header-table-content">
                                                        <FormControl fullWidth>
                                                            <TextField
                                                                label="Loại"
                                                                type="text"
                                                                value={
                                                                    selectedRow?.motorTypeName
                                                                }
                                                                variant="outlined"
                                                                fullWidth
                                                                disabled
                                                            />
                                                        </FormControl>
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell className="header-table">
                                                        Đăng bán
                                                    </TableCell>
                                                    <TableCell className="header-table-content">
                                                        <FormControl fullWidth>
                                                            <InputLabel id="motor-status">
                                                                Trạng thái bán
                                                                xe
                                                            </InputLabel>
                                                            <Select
                                                                labelId="motor-status"
                                                                label="Trạng thái bán xe"
                                                                value={
                                                                    motorStatus
                                                                }
                                                                onChange={
                                                                    handleChangeStatus
                                                                }
                                                            >
                                                                {motorbike
                                                                    ?.owner
                                                                    ?.roleId ===
                                                                    2 && (
                                                                        <MenuItem value="1">
                                                                            Xe có
                                                                            sẵn
                                                                        </MenuItem>
                                                                    )}
                                                                {motorbike
                                                                    ?.owner
                                                                    ?.roleId !==
                                                                    2 && (
                                                                        <MenuItem value="4">
                                                                            Xe có
                                                                            sẵn - Kí
                                                                            gửi
                                                                        </MenuItem>
                                                                    )}
                                                                {motorbike
                                                                    ?.owner
                                                                    ?.roleId !==
                                                                    2 && (
                                                                        <MenuItem value="5">
                                                                            Xe không
                                                                            có ở cửa
                                                                            hàng
                                                                        </MenuItem>
                                                                    )}
                                                            </Select>
                                                        </FormControl>
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
                                Đăng bài
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

            {/* Dialog Đăgn bài */}
            <Dialog open={openSubmit}>
                <DialogTitle>
                    <Typography variant="h5">Xác nhận Đăng bài xe</Typography>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <Typography>
                            Bạn có chắc chắn muốn đăng bài xe này không ?
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
                        color="success"
                        variant="outlined"
                        onClick={handleSubmitUpdateMotorStatus}
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
                            Bạn có chắc chắn muốn hủy bỏ đăng bài xe này không ?
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

export default PostMotorModalByStore;

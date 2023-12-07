import React, { useState } from 'react';
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
    SelectChangeEvent,
} from '@mui/material';
import { useAppDispatch } from '../../../../services/store/store';
import { IMotorbike } from '../../../../models/Motorbike/Motorbike';
import { updateMotorStatus } from '../../../../services/features/motorbike/motorbikeSlice';
import { toast } from 'react-toastify';
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

const PostMotorModal: React.FC<PostDialogProps> = ({
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

    const [motorStatus, setMotorStatus] = useState('');

    const handleChangeStatus = (event: SelectChangeEvent) => {
        setMotorStatus(event.target.value);
    };

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
                                                        {/* <FormControl fullWidth>
                                                            <InputLabel id="demo-simple-select-label">
                                                                Model
                                                            </InputLabel>
                                                            <Select
                                                                labelId="demo-simple-select-label"
                                                                label="Model"
                                                                value={model}
                                                                onChange={
                                                                    handleChangeModel
                                                                }
                                                            >
                                                                <MenuItem value="1">
                                                                    @
                                                                </MenuItem>
                                                            </Select>
                                                        </FormControl> */}
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
                                                                <MenuItem value="4">
                                                                    Kí gởi
                                                                </MenuItem>
                                                                <MenuItem value="5">
                                                                    Không kí gởi
                                                                </MenuItem>
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

export default PostMotorModal;

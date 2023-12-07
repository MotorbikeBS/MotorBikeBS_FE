import React, { useMemo, useState } from 'react';
import {
    Box,
    Button,
    Container,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Typography,
} from '@mui/material';
import { DataGrid, GridRowParams } from '@mui/x-data-grid';
import { columns } from './table/Table';
import {
    useAppDispatch,
    useAppSelector,
} from '../../../../services/store/store';
import { IMotorbike } from '../../../../models/Motorbike/Motorbike';
import {
    cancelPosting,
    clearMotor,
    getMotorByStoreId,
} from '../../../../services/features/motorbike/motorbikeSlice';
import { toast } from 'react-toastify';
import {
    createBillConsignment,
    createBillInStock,
} from '../../../../services/features/bill/billSlice';
import '../style/style.scss';
import useFormatCurrency from '../../../../hooks/useFormatCurrency';
import CreateBillNonConsignment from './CreateBillNonConsignment';
import CreatePostBootingDialog from '../../posting-boot/create-post-booting-dialog/CreatePostBootingDialog';
interface ListMotorProps {
    loadData: () => void;
}

const ListPostedMotorByStoreId: React.FC<ListMotorProps> = ({ loadData }) => {
    const dispatch = useAppDispatch();
    const { motorbikeByStoreId, loading } = useAppSelector(
        (state) => state.motorbikes,
    );
    const { user } = useAppSelector((state) => state.users);

    const formatPrice = useFormatCurrency();
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
    const [isConfirmCancelPost, setIsConfirmCancelPost] = useState(false);
    const [isConfirmSale, setIsConfirmSale] = useState(false);
    const [isConfirmSaleConsignment, setIsConfirmSaleConsignment] =
        useState(false);
    const [isConfirmSaleNonConsignment, setIsConfirmSaleNonConsignment] =
        useState(false);
    const [isOpenSelectBookingId, setIsOpenSelectBookingId] = useState(false);
    const [selectedRow, setSelectedRow] = useState<IMotorbike | null>(null);
    const [
        isCreateBillNonConsignmentSelected,
        setIsCreateBillNonConsignmentSelected,
    ] = useState(false);

    //Posting boot
    const [isOpenPostingBootDialog, setIOpenPostingBootDialog] =
        React.useState(false);
    const [isOpenSubmitPostingBootDialog, setIsOpenSubmitPostingBootDialog] =
        React.useState(false);
    const [isOpenCancelPostingBootDialog, setIsOpenCancelPostingBootDialog] =
        React.useState(false);
    const [motorbikeIdForDialog, setMotorbikeIdForDialog] = React.useState<
        number | null
    >(null);

    const handleOpenPostingBootDialog = (motorId: number) => {
        setMotorbikeIdForDialog(motorId);
        setIOpenPostingBootDialog(true);
    };

    const handleClosePostingBootDialog = () => {
        setIOpenPostingBootDialog(false);
        setIsOpenSubmitPostingBootDialog(false);
        setIsOpenCancelPostingBootDialog(false);
    };

    const handleOpenSubmitPostingBootDialog = () => {
        setIsOpenSubmitPostingBootDialog(true);
    };
    const handleCloseSubmitPostingBootDialog = () => {
        setIsOpenSubmitPostingBootDialog(false);
    };

    const handleOpenCancelPostingBoot = () => {
        setIsOpenCancelPostingBootDialog(true);
    };
    const handleCloseCancelPostingBoot = () => {
        setIsOpenCancelPostingBootDialog(false);
    };

    const closeDetailModal = () => {
        setIsDetailModalOpen(false);
    };

    const openSelectBookingModal = () => {
        setIsOpenSelectBookingId(true);
        setIsCreateBillNonConsignmentSelected(true);
        setSelectedRow(selectedRow);
    };
    const openCancelPostModal = () => {
        setIsConfirmCancelPost(true);
        setSelectedRow(selectedRow);
    };
    const openSaleModal = () => {
        setIsConfirmSale(true);
        setSelectedRow(selectedRow);
    };
    const openSaleConsignmentModal = () => {
        setIsConfirmSaleConsignment(true);
        setSelectedRow(selectedRow);
    };
    const openSaleNonConsignmentModal = () => {
        setIsConfirmSaleNonConsignment(true);
        setSelectedRow(selectedRow);
    };

    const handleCloseAll = () => {
        setIsDetailModalOpen(false);
        setIsConfirmSaleNonConsignment(false);
        setIsOpenSelectBookingId(false);
        setIsCreateBillNonConsignmentSelected(false);
    };

    const handleCloseDialog = () => {
        setIsConfirmCancelPost(false);
        setIsConfirmSale(false);
        setIsConfirmSaleConsignment(false);
        setIsConfirmSaleNonConsignment(false);
        setIsOpenSelectBookingId(false);
    };

    const handleCloseSale = () => {
        setIsConfirmSale(false);
    };

    const handleCloseSaleConsignment = () => {
        setIsConfirmSaleConsignment(false);
    };

    const handleCloseSaleNonConsignment = () => {
        setIsConfirmSaleNonConsignment(false);
    };

    const handleSubmitConfirmSaleMotor = () => {
        dispatch(
            createBillInStock({
                newUser: 0,
                motorId: Number(selectedRow?.id),
            }),
        )
            .unwrap()
            .then(() => {
                toast.success(
                    'Xe đã bán. Thông tin hóa đơn được thêm vào lịch sử giao dịch của bạn.',
                );
                loadData();
                handleCloseDialog();
            })
            .catch((error) => {
            });
    };

    const handleSubmitConfirmSaleConsignmentMotor = () => {
        dispatch(
            createBillConsignment({
                newUser: 0,
                motorId: Number(selectedRow?.id),
            }),
        )
            .unwrap()
            .then(() => {
                toast.success(
                    'Xe đã bán. Thông tin hóa đơn được thêm vào lịch sử giao dịch của bạn.',
                );
                loadData();
                handleCloseDialog();
            })
            .catch((error) => {
            });
    };

    const handleSubmitConfirmCancelPost = () => {
        dispatch(
            cancelPosting({
                motorId: Number(selectedRow?.id),
            }),
        )
            .unwrap()
            .then(() => {
                toast.success('Hủy đăng bài thành công!');
                loadData();
                handleCloseDialog();
            })
            .catch((error) => {
                toast.error(error?.error[0]);
            });
    };

    React.useEffect(() => {
        dispatch(clearMotor());
        dispatch(
            getMotorByStoreId({
                storeId: Number(user?.storeDescriptions[0]?.storeId),
            }),
        );
    }, [dispatch, user]);

    const motorbikesByStoreStorage =
        motorbikeByStoreId &&
        motorbikeByStoreId?.filter(
            (motor) => motor?.motorStatus.motorStatusId !== 3,
        );

    const rows = useMemo(() => {
        return (motorbikesByStoreStorage ?? []).map((motor: IMotorbike) => ({
            id: motor.motorId,
            storeId: motor?.storeId,
            certificateNumber: motor?.certificateNumber,
            images: motor.motorbikeImages[0]?.imageLink,
            motorName: motor?.motorName,
            odo: motor?.odo,
            year: motor?.year,
            price: motor?.price,
            modelName: motor.model?.modelName,
            motorTypeName: motor.motorType?.title,
            motorStatuss: motor.motorStatus?.title,
        }));
    }, [motorbikesByStoreStorage]);

    const handleRowDoubleClick = (params: GridRowParams) => {
        setSelectedRow(params.row as IMotorbike);
        setIsDetailModalOpen(true);
    };

    return (
        <Container maxWidth="xl">
            <div
                style={{
                    marginBottom: '32px',
                    width: '100%',
                }}
            >
                <DataGrid
                    sx={{
                        '& .css-gl260s-MuiDataGrid-columnHeadersInner': {
                            background: '#ccc',
                        },
                    }}
                    rows={rows}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 5 },
                        },
                    }}
                    pageSizeOptions={[5, 10, 100]}
                    disableRowSelectionOnClick
                    onRowDoubleClick={handleRowDoubleClick}
                    autoHeight
                    localeText={{
                        noRowsLabel: 'Không có dữ liệu',
                    }}
                    loading={loading}
                />
            </div>
            <Dialog open={isDetailModalOpen} onClose={closeDetailModal}>
                <DialogTitle>
                    <Typography variant="h4" textAlign="center">
                        Thông tin xe
                    </Typography>
                </DialogTitle>
                <DialogContent>
                    {selectedRow && (
                        <Box flexGrow={12} className="table-content">
                            <Box flexGrow={10}>
                                <TableContainer component={Paper}>
                                    <Table>
                                        <TableBody>
                                            <TableRow>
                                                <TableCell className="header-table">
                                                    Tên xe
                                                </TableCell>
                                                <TableCell className="header-table-content">
                                                    {selectedRow.motorName}
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell className="header-table">
                                                    Số đăng ký
                                                </TableCell>
                                                <TableCell className="header-table-content">
                                                    {
                                                        selectedRow.certificateNumber
                                                    }
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell className="header-table">
                                                    Số Km
                                                </TableCell>
                                                <TableCell className="header-table-content">
                                                    {selectedRow.odo}
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell className="header-table">
                                                    Năm đăng ký
                                                </TableCell>
                                                <TableCell className="header-table-content">
                                                    {new Date(
                                                        selectedRow.year,
                                                    ).toLocaleDateString(
                                                        'vi-VN',
                                                    )}
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell className="header-table">
                                                    Model
                                                </TableCell>
                                                <TableCell className="header-table-content">
                                                    {selectedRow?.modelName}
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell className="header-table">
                                                    Loại xe
                                                </TableCell>
                                                <TableCell className="header-table-content">
                                                    {selectedRow?.motorTypeName}
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell className="header-table">
                                                    Giá
                                                </TableCell>
                                                <TableCell className="header-table-content">
                                                    {formatPrice(
                                                        selectedRow.price,
                                                    )}
                                                </TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Box>
                        </Box>
                    )}
                </DialogContent>
                <DialogActions>
                    {selectedRow && selectedRow?.motorStatuss === 'POSTING' && (
                        <Button
                            onClick={openSaleModal}
                            color="secondary"
                            variant="contained"
                        >
                            Đã bán Tại cửa hàng
                        </Button>
                    )}
                    {selectedRow &&
                        selectedRow?.motorStatuss === 'CONSIGNMENT' && (
                            <Button
                                onClick={openSaleConsignmentModal}
                                color="secondary"
                                variant="contained"
                            >
                                Đã bán kí gởi
                            </Button>
                        )}
                    {selectedRow &&
                        selectedRow?.motorStatuss === 'NON-CONSIGNMENT' && (
                            <Button
                                onClick={openSelectBookingModal}
                                color="secondary"
                                variant="contained"
                            >
                                Đã bán không kí gởi
                            </Button>
                        )}

                    <Button
                        color="warning"
                        variant="contained"
                        onClick={() => {
                            const motorId = selectedRow?.id;
                            if (typeof motorId === 'number') {
                                handleOpenPostingBootDialog(motorId);
                            }
                        }}
                    >
                        Đẩy bài
                    </Button>

                    <Button
                        onClick={openCancelPostModal}
                        color="error"
                        variant="contained"
                    >
                        Hủy đăng bài
                    </Button>
                </DialogActions>
            </Dialog>
            <CreatePostBootingDialog
                open={isOpenPostingBootDialog}
                openSubmit={isOpenSubmitPostingBootDialog}
                openCancel={isOpenCancelPostingBootDialog}
                onOpenSubmitDialog={handleOpenSubmitPostingBootDialog}
                onCloseSubmitDialog={handleCloseSubmitPostingBootDialog}
                onOpenCancelDialog={handleOpenCancelPostingBoot}
                onCloseCancelDialog={handleCloseCancelPostingBoot}
                onClose={handleClosePostingBootDialog}
                motorId={motorbikeIdForDialog}
            />
            <Dialog open={isConfirmSale}>
                <DialogTitle>
                    <Typography variant="h4" textAlign="center">
                        Xác nhận bán xe
                    </Typography>
                </DialogTitle>
                <DialogContent>
                    <Typography variant="subtitle1" textAlign="center">
                        Bạn có chắc chắn đã bán xe này không?
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseSale} color="error">
                        Hủy bỏ
                    </Button>
                    <Button onClick={handleSubmitConfirmSaleMotor} color="info">
                        Xác nhận
                    </Button>
                </DialogActions>
            </Dialog>
            <Dialog open={isConfirmSaleConsignment}>
                <DialogTitle>
                    <Typography variant="h4" textAlign="center">
                        Xác nhận bán xe
                    </Typography>
                </DialogTitle>
                <DialogContent>
                    <Typography variant="subtitle1" textAlign="center">
                        Bạn có chắc chắn đã bán xe này không?
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseSaleConsignment} color="error">
                        Hủy bỏ
                    </Button>
                    <Button
                        onClick={handleSubmitConfirmSaleConsignmentMotor}
                        color="info"
                    >
                        Xác nhận
                    </Button>
                </DialogActions>
            </Dialog>
            {isCreateBillNonConsignmentSelected && (
                <CreateBillNonConsignment
                    open={isOpenSelectBookingId}
                    openSubmit={isConfirmSaleNonConsignment}
                    onOpenSubmitDialog={openSaleNonConsignmentModal}
                    onCloseSubmitDialog={handleCloseDialog}
                    onCloseCancelDialog={handleCloseSaleNonConsignment}
                    onClose={handleCloseAll}
                    loadData={loadData}
                    selectedRow={selectedRow}
                />
            )}
            <Dialog open={isConfirmCancelPost}>
                <DialogTitle>
                    <Typography variant="h4" textAlign="center">
                        Xác nhận hủy đăng bài
                    </Typography>
                </DialogTitle>
                <DialogContent>
                    <Typography variant="subtitle1" textAlign="center">
                        Bạn có chắc chắn hủy đăng bài không?
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="error">
                        Hủy bỏ
                    </Button>
                    <Button
                        onClick={handleSubmitConfirmCancelPost}
                        color="info"
                    >
                        Xác nhận
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default ListPostedMotorByStoreId;

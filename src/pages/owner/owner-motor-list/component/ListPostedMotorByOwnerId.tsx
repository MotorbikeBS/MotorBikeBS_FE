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
    getMotorByOwnerId,
    // updateMotorStatus,
} from '../../../../services/features/motorbike/motorbikeSlice';
import { toast } from 'react-toastify';
import '../style/style.scss';
import useFormatCurrency from '../../../../hooks/useFormatCurrency';

interface ListMotorProps {
    loadData: () => void;
}

const ListPostedMotorByOwnerId: React.FC<ListMotorProps> = ({ loadData }) => {
    const dispatch = useAppDispatch();
    const { motorbikesByOwner, loading } = useAppSelector(
        (state) => state.motorbikes,
    );
    const { account } = useAppSelector((state) => state.account);
    const formatPrice = useFormatCurrency();
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

    const [isConfirmCancelPost, setIsConfirmCancelPost] = useState(false);

    const [selectedRow, setSelectedRow] = useState<IMotorbike | null>(null);

    const closeDetailModal = () => {
        setIsDetailModalOpen(false);
    };

    const openEditModal = () => {
        setIsDetailModalOpen(false);
        setIsConfirmCancelPost(true);
        setSelectedRow(selectedRow);
    };
    const handleCloseDialog = () => {
        setIsDetailModalOpen(false);
        setIsConfirmCancelPost(false);
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
                // toast.error(error?.error[0]);
                // console.log(error);
            });
    };

    React.useEffect(() => {
        dispatch(clearMotor());
        dispatch(getMotorByOwnerId({ ownerId: Number(account?.userId) }));
    }, [dispatch, account?.userId]);

    const motorbikesByOwnerStorage =
        motorbikesByOwner &&
        motorbikesByOwner?.filter(
            (motor) =>
                motor?.storeId === null &&
                motor?.motorStatus?.motorStatusId !== 3,
        );

    const rows = useMemo(() => {
        return (motorbikesByOwnerStorage ?? []).map((motor: IMotorbike) => ({
            id: motor.motorId,
            certificateNumber: motor?.certificateNumber,
            images: motor?.motorbikeImages[0]?.imageLink,
            motorName: motor?.motorName,
            odo: motor?.odo,
            year: motor?.year,
            price: motor?.price,
            modelName: motor?.model?.modelName,
            motorTypeName: motor?.motorType?.title,
            motorStatus: motor?.motorStatus?.title,
        }));
    }, [motorbikesByOwnerStorage]);

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
                                                    Năm đăng ký
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
                    <Button onClick={openEditModal} color="warning">
                        Hủy đăng bài
                    </Button>
                </DialogActions>
            </Dialog>

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

export default ListPostedMotorByOwnerId;

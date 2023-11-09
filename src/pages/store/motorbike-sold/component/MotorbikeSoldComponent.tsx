import React, { useEffect, useMemo, useState } from 'react';
import {
    Box,
    Container,
    Dialog,
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
import {
    clearBill,
    getBillByStoreId,
} from '../../../../services/features/bill/billSlice';
import { IBill } from '../../../../models/Bill/Bill';
import { getUserByID } from '../../../../services/features/user/userSlice';
import { IMotorbike } from '../../../../models/Motorbike/Motorbike';
import useFormatCurrency from '../../../../hooks/useFormatCurrency';
import {
    clearMotor,
    getMotorId,
} from '../../../../services/features/motorbike/motorbikeSlice';

const MotorbikeSoldComponent = () => {
    const dispatch = useAppDispatch();
    const { billStore, loading } = useAppSelector((state) => state.bill);
    const { account } = useAppSelector((state) => state.account);
    const { user } = useAppSelector((state) => state.users);
    const { motorbike } = useAppSelector((state) => state.motorbikes);

    const formatPrice = useFormatCurrency();

    const [selectedRow, setSelectedRow] = useState<IMotorbike | null>(null);
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

    const handleRowDoubleClick = (params: GridRowParams) => {
        setSelectedRow(params.row as IMotorbike);
        setIsDetailModalOpen(true);
    };

    const closeDetailModal = () => {
        setIsDetailModalOpen(false);
    };

    useEffect(() => {
        if (account && account.userId) {
            dispatch(getUserByID({ id: Number(account.userId) }));
        }
        dispatch(clearMotor());
        dispatch(getMotorId({ motorId: Number(selectedRow?.motorId) }));
    }, [dispatch, account, selectedRow]);

    useEffect(() => {
        dispatch(clearBill());
        if (user) {
            dispatch(
                getBillByStoreId({
                    receiverId: Number(user?.storeDesciptions[0]?.storeId),
                }),
            );
        }
    }, [dispatch, user]);

    const rows = useMemo(() => {
        return (billStore ?? []).map((bill: IBill) => ({
            id: bill.billConfirmId,
            motorId: bill?.motorId,
            price: bill?.price,
            createAt: bill?.createAt,
        }));
    }, [billStore]);
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
                        Thông tin giao dịch
                    </Typography>
                </DialogTitle>
                <DialogContent>
                    {motorbike && (
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
                                                    {motorbike.motorName}
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell className="header-table">
                                                    Ảnh
                                                </TableCell>
                                                <TableCell className="header-table-content">
                                                    {motorbike?.motorbikeImages?.map(
                                                        (motor) => (
                                                            <img
                                                                key={
                                                                    motor.imageId
                                                                }
                                                                src={
                                                                    motor.imageLink
                                                                }
                                                                width="30%"
                                                                alt="ảnh xe"
                                                            />
                                                        ),
                                                    )}
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell className="header-table">
                                                    Số đăng ký
                                                </TableCell>
                                                <TableCell className="header-table-content">
                                                    {
                                                        motorbike.certificateNumber
                                                    }
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell className="header-table">
                                                    Số Km
                                                </TableCell>
                                                <TableCell className="header-table-content">
                                                    {motorbike.odo}
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell className="header-table">
                                                    Năm đăng ký
                                                </TableCell>
                                                <TableCell className="header-table-content">
                                                    {new Date(
                                                        motorbike.year,
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
                                                    {
                                                        motorbike?.model
                                                            ?.modelName
                                                    }
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell className="header-table">
                                                    Loại xe
                                                </TableCell>
                                                <TableCell className="header-table-content">
                                                    {
                                                        motorbike?.motorType
                                                            ?.title
                                                    }
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell className="header-table">
                                                    Giá
                                                </TableCell>
                                                <TableCell className="header-table-content">
                                                    {formatPrice(
                                                        motorbike.price,
                                                    )}
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell className="header-table">
                                                    Ngày tạo hóa đơn
                                                </TableCell>
                                                <TableCell className="header-table-content">
                                                    {selectedRow &&
                                                        selectedRow.createAt &&
                                                        new Date(
                                                            selectedRow.createAt,
                                                        ).toLocaleDateString(
                                                            'vi-VN',
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
            </Dialog>
        </Container>
    );
};

export default MotorbikeSoldComponent;

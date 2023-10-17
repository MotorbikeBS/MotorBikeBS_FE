import { DataGrid, GridRowParams } from '@mui/x-data-grid';
import React, { useEffect, useMemo, useState } from 'react';
import { columns } from './table/BrandTable';
import {
    useAppDispatch,
    useAppSelector,
} from '../../../../services/store/store';
import {
    Button,
    Container,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Typography,
} from '@mui/material';
import { getMotorBrand } from '../../../../services/features/motorbike/motorFields';
import { IBrand, IBrandTable } from '../../../../models/Motorbike/Motorbike';
import AddIcon from '@mui/icons-material/Add';
import '../style/style.scss';
import EditBrandModal from './edit-modal/EditBrandModal';
import CreateBrandModal from './create-modal/CreateBrandModal';

const MotorBrand = () => {
    const dispatch = useAppDispatch();
    const { motorBrands } = useAppSelector((state) => state.motorFields);

    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
    const [selectedRow, setSelectedRow] = useState<IBrand | null>(null);

    const [isOpenDialog, setOpenDialog] = useState(false);
    const [isOpenSubmitDiaglog, setIsOpenSubmitDialog] = useState(false);
    const [isOpenCancelDialog, setIsOpenCancelDialog] = useState(false);

    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isOpenSubmitEditDialog, setIsOpenSubmitEditDialog] = useState(false);
    const [isOpenCancelEditDialog, setIsOpenCancelEditDialog] = useState(false);

    useEffect(() => {
        dispatch(getMotorBrand());
    }, [dispatch]);

    const loadData = () => {
        dispatch(getMotorBrand());
    };

    const openEditModal = () => {
        setIsDetailModalOpen(false);
        setIsEditModalOpen(true);
        setSelectedRow(selectedRow);
    };
    const handleOpenDialog = () => {
        setOpenDialog(true);
    };

    const handleOpenSubmitDialog = () => {
        setIsOpenSubmitDialog(true);
    };
    const handleCloseSubmitDialog = () => {
        setIsOpenSubmitDialog(false);
        loadData();
    };

    const handleOpenCancelDialog = () => {
        setIsOpenCancelDialog(true);
    };
    const handleCloseCancelDialog = () => {
        setIsOpenCancelDialog(false);
    };

    const handleOpenSubmitEditDialog = () => {
        setIsOpenSubmitEditDialog(true);
    };
    const handleCloseSubmitEditDialog = () => {
        setIsOpenSubmitEditDialog(false);
    };
    const handleOpenCancelEditDialog = () => {
        setIsOpenCancelEditDialog(true);
    };
    const handleCloseCancelEditDialog = () => {
        setIsOpenCancelEditDialog(false);
    };

    const handleCloseCreateDialog = () => {
        setOpenDialog(false);
        setIsOpenSubmitDialog(false);
        setIsOpenCancelDialog(false);
    };

    const handleCloseDialog = () => {
        setIsEditModalOpen(false);
        setIsOpenSubmitEditDialog(false);
        setIsOpenCancelEditDialog(false);
        // setOpenDialog(false);
        // setIsOpenSubmitDialog(false);
        // setIsOpenCancelDialog(false);
    };
    const closeDetailModal = () => {
        setIsDetailModalOpen(false);
    };

    const rows = useMemo(() => {
        return (motorBrands ?? []).map((brand: IBrand) => ({
            id: brand.brandId,
            brandName: brand?.brandName,
            description:
                brand?.description !== null && brand?.description !== ''
                    ? brand?.description
                    : 'Chưa có mô tả.',
            status: brand?.status,
        }));
    }, [motorBrands]);

    const handleRowDoubleClick = (params: GridRowParams) => {
        setSelectedRow(params.row as IBrandTable);
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
                <div className="motorlist-add-btn">
                    <Button onClick={handleOpenDialog} variant="contained">
                        <AddIcon />
                        Thêm Brand
                    </Button>
                </div>

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
                />
            </div>

            <Dialog open={isDetailModalOpen} onClose={closeDetailModal}>
                <DialogTitle>
                    <Typography variant="h4" textAlign="center">
                        Thông tin Brand
                    </Typography>
                </DialogTitle>
                <DialogContent>
                    {selectedRow && (
                        <>
                            <Typography variant="subtitle1" textAlign="center">
                                Tên brand: {selectedRow.brandName}
                            </Typography>
                        </>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={openEditModal} color="info">
                        Sửa thông tin
                    </Button>
                </DialogActions>
            </Dialog>

            <EditBrandModal
                open={isEditModalOpen}
                openSubmit={isOpenSubmitEditDialog}
                openCancel={isOpenCancelEditDialog}
                onOpenSubmitDialog={handleOpenSubmitEditDialog}
                onCloseSubmitDialog={handleCloseSubmitEditDialog}
                onOpenCancelDialog={handleOpenCancelEditDialog}
                onCloseCancelDialog={handleCloseCancelEditDialog}
                onClose={handleCloseDialog}
                selectedRow={selectedRow}
                loadData={loadData}
            />

            <CreateBrandModal
                open={isOpenDialog}
                openSubmit={isOpenSubmitDiaglog}
                openCancel={isOpenCancelDialog}
                onOpenSubmitDialog={handleOpenSubmitDialog}
                onCloseSubmitDialog={handleCloseSubmitDialog}
                onOpenCancelDialog={handleOpenCancelDialog}
                onCloseCancelDialog={handleCloseCancelDialog}
                onClose={handleCloseCreateDialog}
                loadData={loadData}
            />
        </Container>
    );
};

export default MotorBrand;

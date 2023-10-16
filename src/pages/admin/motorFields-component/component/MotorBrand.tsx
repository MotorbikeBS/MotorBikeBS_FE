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

const MotorBrand = () => {
    const dispatch = useAppDispatch();
    const { motorBrands } = useAppSelector((state) => state.motorFields);

    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
    const [selectedRow, setSelectedRow] = useState<IBrand | null>(null);

    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isOpenSubmitEditDialog, setIsOpenSubmitEditDialog] = useState(false);
    const [isOpenCancelEditDialog, setIsOpenCancelEditDialog] = useState(false);

    const loadData = () => {
        dispatch(getMotorBrand());
    };

    const openEditModal = () => {
        setIsDetailModalOpen(false);
        setIsEditModalOpen(true);
        setSelectedRow(selectedRow);
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

    const handleCloseDialog = () => {
        setIsEditModalOpen(false);
        setIsOpenSubmitEditDialog(false);
        setIsOpenCancelEditDialog(false);
        // setIsPostModalOpen(false);
        // setIsOpenSubmitPostDialog(false);
        // setIsOpenCancelPostDialog(false);
    };
    const closeDetailModal = () => {
        setIsDetailModalOpen(false);
    };

    useEffect(() => {
        // dispatch(getMotorBrand());
        loadData()
    }, [dispatch]);

    const rows = useMemo(() => {
        return (motorBrands ?? []).map((brand: IBrand) => ({
            id: brand.brandId,
            brandName: brand?.brandName,
            description: brand?.description,
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
                    <Button variant="contained">
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
                                Tên xe: {selectedRow.brandName}
                            </Typography>
                        </>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={openEditModal}
                        color="info"
                    >
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

            {/* <PostMotorModal
                open={isPostModalOpen}
                openSubmit={isOpenSubmitPostDialog}
                openCancel={isOpenCancelPostDialog}
                onOpenSubmitDialog={handleOpenSubmitPostDialog}
                onCloseSubmitDialog={handleCloseSubmitPostDialog}
                onOpenCancelDialog={handleOpenCancelPostDialog}
                onCloseCancelDialog={handleCloseCancelPostDialog}
                onClose={handleCloseDialog}
                selectedRow={selectedRow}
                loadData={loadData}
            /> */}
        </Container>
    );
};

export default MotorBrand;

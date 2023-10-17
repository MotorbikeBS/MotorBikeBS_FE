import { DataGrid, GridRowParams } from '@mui/x-data-grid';
import React, { useEffect, useMemo, useState } from 'react';
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
import { getMotorModel } from '../../../../services/features/motorbike/motorFields';
import { IModel, IModelTable } from '../../../../models/Motorbike/Motorbike';
import AddIcon from '@mui/icons-material/Add';
import '../style/style.scss';
import CreateModelModal from './create-modal/CreateModelModal';
import EditModelModal from './edit-modal/EditModelModal';
import { columns } from './table/ModelTable';

const MotorModel = () => {
    const dispatch = useAppDispatch();
    const { motorModels } = useAppSelector((state) => state.motorFields);

    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
    const [selectedRow, setSelectedRow] = useState<IModel | null>(null);

    const [isOpenDialog, setOpenDialog] = useState(false);
    const [isOpenSubmitDiaglog, setIsOpenSubmitDialog] = useState(false);
    const [isOpenCancelDialog, setIsOpenCancelDialog] = useState(false);

    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isOpenSubmitEditDialog, setIsOpenSubmitEditDialog] = useState(false);
    const [isOpenCancelEditDialog, setIsOpenCancelEditDialog] = useState(false);

    useEffect(()=>{
        dispatch(getMotorModel())
    }, [dispatch])

    const loadData = () => {
        dispatch(getMotorModel());
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
        return (motorModels ?? []).map((model: IModel) => ({
            id: model.modelId,
            modelName: model?.modelName,
            description:
                (model?.description !== null && model?.description !== '')
                    ? model?.description
                    : 'Chưa có mô tả.',
            brandName: model?.brand?.brandName,
            status: model?.status,
        }));
    }, [motorModels]);

   

    const handleRowDoubleClick = (params: GridRowParams) => {
        setSelectedRow(params.row as IModelTable);
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
                        Thêm Model
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
                        Thông tin Model
                    </Typography>
                </DialogTitle>
                <DialogContent>
                    {selectedRow && (
                        <>
                            <Typography variant="subtitle1" textAlign="center">
                                Tên model: {selectedRow.modelName}
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

            <EditModelModal
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

            <CreateModelModal
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

export default MotorModel;

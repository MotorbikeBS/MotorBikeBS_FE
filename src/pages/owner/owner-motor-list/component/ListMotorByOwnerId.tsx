import React, { useMemo, useState } from 'react';
import {
    Button,
    Container,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Typography,
} from '@mui/material';
import { DataGrid, GridRowParams } from '@mui/x-data-grid';
import { columns } from './table/Table';
import {
    useAppDispatch,
    useAppSelector,
} from '../../../../services/store/store';
import { IMotorbike } from '../../../../models/Motorbike/Motorbike';
import { getMotorByOwnerId } from '../../../../services/features/motorbikeSlice';
import EditMotorModal from './EditMotorModal';
import PostMotorModal from './PostMotorModal';

const ListMotorByOwnerId = () => {
    const dispatch = useAppDispatch();
    const { motorbikesByOwner } = useAppSelector((state) => state.motorbikes);
    const { account } = useAppSelector((state) => state.account);

    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);

    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isOpenSubmitEditDialog, setIsOpenSubmitEditDialog] = useState(false);
    const [isOpenCancelEditDialog, setIsOpenCancelEditDialog] = useState(false);

    const [isPostModalOpen, setIsPostModalOpen] = useState(false);
    const [isOpenSubmitPostDialog, setIsOpenSubmitPostDialog] = useState(false);
    const [isOpenCancelPostDialog, setIsOpenCancelPostDialog] = useState(false);

    const [selectedRow, setSelectedRow] = useState<IMotorbike | null>(null);

    const closeDetailModal = () => {
        setIsDetailModalOpen(false);
    };

    const openEditModal = () => {
        setIsDetailModalOpen(false);
        setIsEditModalOpen(true);
        setSelectedRow(selectedRow);
    };

    const handleCloseDialog = () => {
        setIsEditModalOpen(false);
        setIsOpenSubmitEditDialog(false);
        setIsOpenCancelEditDialog(false);
        setIsPostModalOpen(false);
        setIsOpenSubmitPostDialog(false);
        setIsOpenCancelPostDialog(false);
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

    const handleOpenSubmitPostDialog = () => {
        setIsOpenSubmitPostDialog(true);
    };
    const handleCloseSubmitPostDialog = () => {
        setIsOpenSubmitPostDialog(false);
    };
    const handleOpenCancelPostDialog = () => {
        setIsOpenCancelPostDialog(true);
    };
    const handleCloseCancelPostDialog = () => {
        setIsOpenCancelPostDialog(false);
    };

    const openPostModal = () => {
        setIsDetailModalOpen(false);
        setIsPostModalOpen(true);
    };

    React.useEffect(() => {
        dispatch(getMotorByOwnerId({ ownerId: Number(account?.userId) }));
    }, [dispatch, account?.userId]);

    const rows = useMemo(() => {
        return (motorbikesByOwner ?? []).map((motor: IMotorbike) => ({
            id: motor.motorId,
            certificateNumber: motor.certificateNumber,
            images: motor.motorbikeImages[0].imageLink,
            motorName: motor.motorName,
            odo: motor.odo,
            year: motor.year,
            price: motor.price,
            modelName: motor.model.modelName,
            motorType: motor.motorType.title,
            motorStatus: motor.motorStatus.title,
        }));
    }, [motorbikesByOwner]);

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
                        <>
                            <Typography variant="subtitle1" textAlign="center">
                                Tên xe: {selectedRow.motorName}
                            </Typography>
                        </>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={openEditModal} color="info">
                        Sửa thông tin
                    </Button>
                    <Button onClick={openPostModal} color="warning">
                        Đăng bài
                    </Button>
                </DialogActions>
            </Dialog>

            <EditMotorModal
                open={isEditModalOpen}
                openSubmit={isOpenSubmitEditDialog}
                openCancel={isOpenCancelEditDialog}
                onOpenSubmitDialog={handleOpenSubmitEditDialog}
                onCloseSubmitDialog={handleCloseSubmitEditDialog}
                onOpenCancelDialog={handleOpenCancelEditDialog}
                onCloseCancelDialog={handleCloseCancelEditDialog}
                onClose={handleCloseDialog}
                selectedRow={selectedRow} 
                loadData={() => {}}
            />

            <PostMotorModal
                open={isPostModalOpen}
                openSubmit={isOpenSubmitPostDialog}
                openCancel={isOpenCancelPostDialog}
                onOpenSubmitDialog={handleOpenSubmitPostDialog}
                onCloseSubmitDialog={handleCloseSubmitPostDialog}
                onOpenCancelDialog={handleOpenCancelPostDialog}
                onCloseCancelDialog={handleCloseCancelPostDialog}
                onClose={handleCloseDialog}
                loadData={() => {}}
            />
        </Container>
    );
};

export default ListMotorByOwnerId;

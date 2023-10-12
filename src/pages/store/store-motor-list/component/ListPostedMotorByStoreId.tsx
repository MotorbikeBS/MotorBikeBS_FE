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
import {
    getMotorByOwnerId,
    updateMotorStatus,
} from '../../../../services/features/motorbike/motorbikeSlice';
import { toast } from 'react-toastify';

interface ListMotorProps {
    loadData: () => void;
}

const ListPostedMotorByStoreId: React.FC<ListMotorProps> = ({ loadData }) => {
    const dispatch = useAppDispatch();
    const { motorbikesByOwner } = useAppSelector((state) => state.motorbikes);
    const { account } = useAppSelector((state) => state.account);
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
            updateMotorStatus({
                motorId: Number(selectedRow?.id),
                statusId: 3,
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
        dispatch(getMotorByOwnerId({ ownerId: Number(account?.userId) }));
    }, [dispatch, account?.userId]);

    const motorbikesByOwnerStorage = motorbikesByOwner && motorbikesByOwner?.filter(
        (motor) => motor?.motorStatus.motorStatusId !== 3,
    );

    const rows = useMemo(() => {
        return (motorbikesByOwnerStorage ?? []).map((motor: IMotorbike) => ({
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
            motorStatus: motor.motorStatus?.title,
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
                    <Button onClick={handleSubmitConfirmCancelPost} color="info">
                        Xác nhận
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default ListPostedMotorByStoreId;

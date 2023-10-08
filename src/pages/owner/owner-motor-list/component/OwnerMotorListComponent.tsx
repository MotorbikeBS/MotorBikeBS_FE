import { Button } from '@mui/material';
import React, { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import CreateMotorbikeComponent from '../../../../common-components/create-motorbike-component/CreateMotorbikeComponent';
import '../style/style.scss';
import ListMotorByOwnerId from './ListMotorByOwnerId';
import { getMotorByOwnerId } from '../../../../services/features/motorbikeSlice';
import { useAppDispatch, useAppSelector } from '../../../../services/store/store';

const OwnerMotorListComponent = () => {
    const { account } = useAppSelector((state) => state.account);
    const dispatch =useAppDispatch()
    const [isOpenDialog, setOpenDialog] = useState(false);
    const [isOpenSubmitDialog, setIsOpenSubmitDialog] = useState(false);
    const [isOpenCancelDialog, setIsOpenCancelDialog] = useState(false);

    const loadData = () => {
        dispatch(getMotorByOwnerId({ ownerId: Number(account?.userId) }));
    }

    const handleOpenDialog = () => {
        setOpenDialog(true);
    };
    const handleCloseDialog = () => {
        setOpenDialog(false);
        setIsOpenSubmitDialog(false);
        setIsOpenCancelDialog(false);
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

    return (
        <div className="motorlist-container">
            <div className='motorlist-add-btn'>
                <Button onClick={handleOpenDialog} variant="contained">
                    <AddIcon />
                    Thêm xe
                </Button>
            </div>

            <ListMotorByOwnerId />

            <CreateMotorbikeComponent
                open={isOpenDialog}
                openSubmit={isOpenSubmitDialog}
                openCancel={isOpenCancelDialog}
                onOpenSubmitDialog={handleOpenSubmitDialog}
                onCloseSubmitDialog={handleCloseSubmitDialog}
                onOpenCancelDialog={handleOpenCancelDialog}
                onCloseCancelDialog={handleCloseCancelDialog}
                onClose={handleCloseDialog}
                loadData={loadData}
            />
        </div>
    );
};

export default OwnerMotorListComponent;

import React, { useState } from 'react';
import {
    useAppDispatch,
    useAppSelector,
} from '../../../../services/store/store';
import { Box, Button, Tab, Tabs } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CreateMotorbikeComponent from '../../../../common-components/create-motorbike-component/CreateMotorbikeComponent';
import { getMotorByOwnerId } from '../../../../services/features/motorbike/motorbikeSlice';
import ListStorageMotorByStoreId from './ListStorageMotorByStoreId';
import ListPostedMotorByStoreId from './ListPostedMotorByStoreId';

const StoreMotorListComponent = () => {
    const { account } = useAppSelector((state) => state.account);
    const dispatch = useAppDispatch();
    const [isOpenDialog, setOpenDialog] = useState(false);
    const [isOpenSubmitDialog, setIsOpenSubmitDialog] = useState(false);
    const [isOpenCancelDialog, setIsOpenCancelDialog] = useState(false);

    const [value, setValue] = useState<number>(0);

    const handleChangeTabs = (
        event: React.ChangeEvent<{}>,
        newValue: number,
    ) => {
        setValue(newValue);
    };

    const loadData = () => {
        // dispatch(clearMotor())
        dispatch(getMotorByOwnerId({ ownerId: Number(account?.userId) }));
    };

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
            <div className="motorlist-add-btn">
                <Button variant="contained">
                    <AddIcon />
                    Thêm Brand
                </Button>
                <Button variant="contained">
                    <AddIcon />
                    Thêm Model
                </Button>
                <Button onClick={handleOpenDialog} variant="contained">
                    <AddIcon />
                    Thêm xe
                </Button>
            </div>

            <Tabs
                value={value}
                onChange={handleChangeTabs}
                indicatorColor="secondary"
                sx={{
                    '.Mui-selected': {
                        color: `orange`,
                    },
                }}
                centered
            >
                <Tab label="Xe trong kho" />
                <Tab label="Xe đã đăng" />
            </Tabs>

            <Box flexGrow={4} marginTop="3rem">
                {value === 0 && (
                    <ListStorageMotorByStoreId loadData={loadData} />
                )}
                {value === 1 && (
                    <ListPostedMotorByStoreId loadData={loadData} />
                )}
            </Box>

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

export default StoreMotorListComponent;

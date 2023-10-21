import { Box, Button, Tab, Tabs } from '@mui/material';
import React, { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import CreateMotorbikeComponent from '../../../../common-components/create-motorbike-component/CreateMotorbikeComponent';
import '../style/style.scss';
import { clearMotor, getMotorByOwnerId } from '../../../../services/features/motorbike/motorbikeSlice';
import {
    useAppDispatch,
    useAppSelector,
} from '../../../../services/store/store';
import ListPostedMotorByOwnerId from './ListPostedMotorByOwnerId';
import ListStorageMotorByOwnerId from './ListStorageMotorByOwnerId';
import ListNegotiateMotorByOwner from '../list-negotiation-by-owner/ListNegotiateMotorByOwner';

const OwnerMotorListComponent = () => {
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
        dispatch(clearMotor());
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
                <Tab label="Xe đang thương lượng" />
            </Tabs>
            {value === 0 || value === 1 ? (
                <div className="motorlist-add-btn">
                    <Button onClick={handleOpenDialog} variant="contained">
                        <AddIcon />
                        Thêm xe
                    </Button>
                </div>
            ) : (
                <></>
            )}

            <Box flexGrow={4} marginTop="3rem">
                {value === 0 && (
                    <ListStorageMotorByOwnerId loadData={loadData} />
                )}
                {value === 1 && (
                    <ListPostedMotorByOwnerId loadData={loadData} />
                )}
                {value === 2 && <ListNegotiateMotorByOwner />}
            </Box>

            {/* <ListMotorByOwnerId loadData={loadData} /> */}

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

import React, { useState } from 'react';
import {
    useAppDispatch,
    useAppSelector,
} from '../../../../services/store/store';
import { Box, Button, Tab, Tabs } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CreateMotorbikeComponent from '../../../../common-components/create-motorbike-component/CreateMotorbikeComponent';
import {
    clearMotor,
    getMotorByStoreId,
} from '../../../../services/features/motorbike/motorbikeSlice';
import ListStorageMotorByStoreId from './ListStorageMotorByStoreId';
import ListPostedMotorByStoreId from './ListPostedMotorByStoreId';
import CreateModelModal from '../../../../common-components/create-motorbike-component/create-motorFields-component/CreateModel';
import CreateBrandModal from '../../../../common-components/create-motorbike-component/create-motorFields-component/CreateBrand';
import PostBootingHistoryComponent from '../../posting-boot/post-booting-history/PostBootingHistoryComponent';

const StoreMotorListComponent = () => {
    // const { account } = useAppSelector((state) => state.account);
    const { user } = useAppSelector((state) => state.users);
    const dispatch = useAppDispatch();
    const [isOpenDialog, setOpenDialog] = useState(false);
    const [isOpenSubmitDialog, setIsOpenSubmitDialog] = useState(false);
    const [isOpenCancelDialog, setIsOpenCancelDialog] = useState(false);

    const [isOpenBrandDialog, setOpenBrandDialog] = useState(false);
    const [isOpenBrandSubmitDialog, setIsOpenBrandSubmitDialog] =
        useState(false);
    const [isOpenBrandCancelDialog, setIsOpenBrandCancelDialog] =
        useState(false);

    const [isOpenModelDialog, setOpenModelDialog] = useState(false);
    const [isOpenModelSubmitDialog, setIsOpenModelSubmitDialog] =
        useState(false);
    const [isOpenModelCancelDialog, setIsOpenModelCancelDialog] =
        useState(false);

    const [value, setValue] = useState<number>(0);

    const handleChangeTabs = (
        event: React.ChangeEvent<{}>,
        newValue: number,
    ) => {
        setValue(newValue);
    };

    const loadData = () => {
        dispatch(clearMotor());
        dispatch(
            getMotorByStoreId({
                storeId: Number(user?.storeDesciptions[0]?.storeId),
            }),
        );
    };

    const handleOpenDialog = () => {
        setOpenDialog(true);
    };
    const handleOpenBrandDialog = () => {
        setOpenBrandDialog(true);
    };

    const handleOpenModelDialog = () => {
        setOpenModelDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setIsOpenSubmitDialog(false);
        setIsOpenCancelDialog(false);
    };

    const handleCloseBrandDialog = () => {
        setOpenBrandDialog(false);
        setIsOpenBrandSubmitDialog(false);
        setIsOpenBrandCancelDialog(false);
    };

    const handleCloseModelDialog = () => {
        setOpenModelDialog(false);
        setIsOpenModelSubmitDialog(false);
        setIsOpenModelCancelDialog(false);
    };
    const handleOpenSubmitDialog = () => {
        setIsOpenSubmitDialog(true);
    };
    const handleOpenBrandSubmitDialog = () => {
        setIsOpenBrandSubmitDialog(true);
    };
    const handleOpenModelSubmitDialog = () => {
        setIsOpenModelSubmitDialog(true);
    };

    const handleCloseSubmitDialog = () => {
        setIsOpenSubmitDialog(false);
    };

    const handleCloseBrandSubmitDialog = () => {
        setIsOpenBrandSubmitDialog(false);
    };
    const handleCloseModelSubmitDialog = () => {
        setIsOpenModelSubmitDialog(false);
    };

    const handleOpenCancelDialog = () => {
        setIsOpenCancelDialog(true);
    };

    const handleOpenBrandCancelDialog = () => {
        setIsOpenBrandCancelDialog(true);
    };
    const handleOpenModelCancelDialog = () => {
        setIsOpenModelCancelDialog(true);
    };
    const handleCloseCancelDialog = () => {
        setIsOpenCancelDialog(false);
    };
    const handleCloseBrandCancelDialog = () => {
        setIsOpenBrandCancelDialog(false);
    };
    const handleCloseModelCancelDialog = () => {
        setIsOpenModelCancelDialog(false);
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
                <Tab label="Danh sách đẩy bài" />
            </Tabs>

            {value === 0 ? (
                <div className="motorlist-add-btn">
                    <Button onClick={handleOpenBrandDialog} variant="contained">
                        <AddIcon />
                        Thêm Brand
                    </Button>
                    <Button onClick={handleOpenModelDialog} variant="contained">
                        <AddIcon />
                        Thêm Model
                    </Button>
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
                    <ListStorageMotorByStoreId loadData={loadData} />
                )}
                {value === 1 && (
                    <ListPostedMotorByStoreId loadData={loadData} />
                )}
                {value === 3 && (
                    <PostBootingHistoryComponent />
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
            <CreateBrandModal
                open={isOpenBrandDialog}
                openSubmit={isOpenBrandSubmitDialog}
                openCancel={isOpenBrandCancelDialog}
                onOpenSubmitDialog={handleOpenBrandSubmitDialog}
                onCloseSubmitDialog={handleCloseBrandSubmitDialog}
                onOpenCancelDialog={handleOpenBrandCancelDialog}
                onCloseCancelDialog={handleCloseBrandCancelDialog}
                onClose={handleCloseBrandDialog}
                loadData={loadData}
            />

            <CreateModelModal
                open={isOpenModelDialog}
                openSubmit={isOpenModelSubmitDialog}
                openCancel={isOpenModelCancelDialog}
                onOpenSubmitDialog={handleOpenModelSubmitDialog}
                onCloseSubmitDialog={handleCloseModelSubmitDialog}
                onOpenCancelDialog={handleOpenModelCancelDialog}
                onCloseCancelDialog={handleCloseModelCancelDialog}
                onClose={handleCloseModelDialog}
                loadData={loadData}
            />
        </div>
    );
};

export default StoreMotorListComponent;

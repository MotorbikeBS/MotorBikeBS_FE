import React from 'react';
import {
    Avatar,
    Button,
    Grid,
    Stack,
    TextField,
    Typography,
    Radio,
    FormLabel,
    Snackbar,
    Alert,
    Dialog,
    DialogTitle,
    DialogActions,
    Box,
} from '@mui/material';
import DoneIcon from '@mui/icons-material/Done';
import ClearIcon from '@mui/icons-material/Clear';
import './style/style.scss';
import { useNavigate } from 'react-router-dom';
import FooterComponent from '../../common-components/footer-component/FooterComponent';
import CustomerMenuComponent from '../customer/customer-menu-component/CustomerMenuComponent';
import { useAppSelector } from '../../services/store/store';
import AdminMenuComponent from '../admin/admin-menu-component/AdminMenuComponent';
import StoreMenuComponent from '../store/store-menu-component/StoreMenuComponent';
import OwnerMenuComponent from '../owner/owner-menu-component/OwnerMenuComponent';

const EditUserProfile = () => {
    const navigate = useNavigate();
    const { account } = useAppSelector((state) => state.account);

    const [selectedValue, setSelectedValue] = React.useState('male');
    const [openSave, setOpenSave] = React.useState(false);
    const [openCancel, setOpenCancel] = React.useState(false);

    const handleClickSave = () => {
        setOpenSave(true);
    };

    const handleClickCancel = () => {
        setOpenCancel(true);
    };

    const handleClose = (
        event?: React.SyntheticEvent | Event,
        reason?: string,
    ) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenSave(false);
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedValue(event.target.value);
    };

    const handleSave = () => {
        handleClickSave();
        setTimeout(() => {
            navigate('/user/profile');
        }, 2000);
    };

    const handleCancel = () => {
        handleClickCancel();
    };

    const handleCancelCan = () => {
        setOpenCancel(false);
    };

    const handleCancelSuc = () => {
        navigate('/user/profile');
    };

    return (
        <>
            {account?.roleId === 1 && <AdminMenuComponent />}
            {account?.roleId === 2 && <StoreMenuComponent />}
            {account?.roleId === 3 && <OwnerMenuComponent />}
            {account?.roleId === 4 && <CustomerMenuComponent />}

            <div className="profile-container">
                <Grid container spacing={2}>
                    <Grid item xs={6} md={3}>
                        <div className="profile-ava">
                            <Avatar
                                sx={{
                                    width: 52,
                                    height: 52,
                                    bgcolor: 'orange',
                                }}
                            >
                                Hi
                            </Avatar>
                            <div>
                                <Typography className="edit-profile-name">
                                    Minh Tri
                                </Typography>
                            </div>
                        </div>
                        <hr />
                    </Grid>
                    <Grid item xs={6} md={9}>
                        <div className="profile-input-container">
                            <Typography className="profile-input-heading">
                                Chỉnh sửa hồ sơ
                            </Typography>
                            <Stack spacing={3} className="profile-input-fields">
                                <TextField
                                    label="Email"
                                    value=""
                                    type="email"
                                    variant="outlined"
                                />
                                <TextField
                                    label="Tên"
                                    value=""
                                    type="text"
                                    variant="outlined"
                                />
                                <div>
                                    <FormLabel>Giới tính:</FormLabel>
                                    <Radio
                                        checked={selectedValue === 'male'}
                                        onChange={handleChange}
                                        value="male"
                                        name="radio-buttons"
                                        inputProps={{ 'aria-label': 'male' }}
                                    />
                                    Nam
                                    <Radio
                                        checked={selectedValue === 'female'}
                                        onChange={handleChange}
                                        value="female"
                                        name="radio-buttons"
                                        inputProps={{ 'aria-label': 'Female' }}
                                    />
                                    Nữ
                                    <Radio
                                        checked={selectedValue === 'other'}
                                        onChange={handleChange}
                                        value="other"
                                        name="radio-buttons"
                                        inputProps={{ 'aria-label': 'other' }}
                                    />
                                    Khác
                                </div>
                                <TextField
                                    label="Điện thoại"
                                    value=""
                                    type="text"
                                    variant="outlined"
                                />
                                <TextField
                                    label="Địa chỉ"
                                    value=""
                                    type="text"
                                    variant="outlined"
                                />
                                <TextField
                                    label="Ngày sinh"
                                    value=""
                                    type="date"
                                    variant="outlined"
                                />
                                <TextField
                                    label="CCCD/CMND"
                                    value=""
                                    type="text"
                                    variant="outlined"
                                />
                            </Stack>
                            <div className="edit-profile-btn">
                                <Button
                                    variant="outlined"
                                    color="success"
                                    onClick={handleSave}
                                >
                                    <DoneIcon />
                                    Lưu
                                </Button>
                                <Button
                                    variant="outlined"
                                    color="error"
                                    onClick={handleCancel}
                                >
                                    <ClearIcon />
                                    Hủy bỏ
                                </Button>
                            </div>
                        </div>
                    </Grid>
                </Grid>
                <Snackbar
                    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                    open={openSave}
                    autoHideDuration={1500}
                    onClose={handleClose}
                >
                    <Alert severity="success" sx={{ width: '100%' }}>
                        Chỉnh sửa thành công
                    </Alert>
                </Snackbar>
                <Dialog
                    open={openCancel}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle>Bạn có chắc chắn không?</DialogTitle>
                    <DialogActions>
                        <Button color="error" onClick={handleCancelCan}>
                            Từ chối
                        </Button>
                        <Button color="success" onClick={handleCancelSuc}>
                            Đồng ý
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
            <Box flexGrow={1} className="footer-style">
                <FooterComponent />
            </Box>
        </>
    );
};

export default EditUserProfile;

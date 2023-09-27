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
    Box,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import './style/style.scss';
import { useNavigate } from 'react-router-dom';
import FooterComponent from '../../common-components/footer-component/FooterComponent';
import CustomerMenuComponent from '../customer/customer-menu-component/CustomerMenuComponent';
import StoreMenuComponent from '../store/store-menu-component/StoreMenuComponent';
import OwnerMenuComponent from '../owner/owner-menu-component/OwnerMenuComponent';
import AdminMenuComponent from '../admin/admin-menu-component/AdminMenuComponent';
import { useAppSelector } from '../../services/store/store';

const UserProfile = () => {
    const navigate = useNavigate();
    const { user } = useAppSelector((state) => state.account);

    const [selectedValue, setSelectedValue] = React.useState('male');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedValue(event.target.value);
    };

    return (
        <>
            {user?.roleId === 1 && <AdminMenuComponent />}
            {user?.roleId === 2 && <StoreMenuComponent />}
            {user?.roleId === 3 && <OwnerMenuComponent />}
            {user?.roleId === 4 && <CustomerMenuComponent />}

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
                                    {user?.userName}
                                </Typography>
                                <Button
                                    className="edit-profile-btn"
                                    onClick={() =>
                                        navigate('/user/edit-profile')
                                    }
                                >
                                    <EditIcon />
                                    Sửa hồ sơ
                                </Button>
                            </div>
                        </div>
                        <hr />
                        <Button
                            className="change-password-button"
                            onClick={() => navigate('/change-password')}
                        >
                            Đổi mật khẩu
                        </Button>
                    </Grid>
                    <Grid item xs={6} md={9}>
                        <div className="profile-input-container">
                            <Typography className="profile-input-heading">
                                Hồ Sơ Của Tôi
                            </Typography>
                            <Stack spacing={3} className="profile-input-fields">
                                <TextField
                                    label="Email"
                                    value={user?.email}
                                    type="email"
                                    variant="outlined"
                                    disabled
                                />
                                <TextField
                                    label="Tên"
                                    value={user?.userName}
                                    type="text"
                                    variant="outlined"
                                    disabled
                                />
                                <div>
                                    <FormLabel>Giới tính:</FormLabel>
                                    <Radio
                                        checked={selectedValue === 'male'}
                                        onChange={handleChange}
                                        value="male"
                                        name="radio-buttons"
                                        inputProps={{ 'aria-label': 'male' }}
                                        disabled
                                    />
                                    Nam
                                    <Radio
                                        checked={selectedValue === 'female'}
                                        onChange={handleChange}
                                        value="female"
                                        name="radio-buttons"
                                        inputProps={{ 'aria-label': 'Female' }}
                                        disabled
                                    />
                                    Nữ
                                    <Radio
                                        checked={selectedValue === 'other'}
                                        onChange={handleChange}
                                        value="other"
                                        name="radio-buttons"
                                        inputProps={{ 'aria-label': 'other' }}
                                        disabled
                                    />
                                    Khác
                                </div>
                                <TextField
                                    label="Điện thoại"
                                    value={
                                        user?.phone
                                            ? user?.phone
                                            : 'Bạn chưa có số điện thoại.'
                                    }
                                    type="text"
                                    variant="outlined"
                                    disabled
                                />
                                <TextField
                                    label="Địa chỉ"
                                    value={user?.address ? (user?.address) : ('Bạn chưa có địa chỉ.')}
                                    type="text"
                                    variant="outlined"
                                    disabled
                                />
                                <TextField
                                    label="Ngày sinh"
                                    value={user?.dob ? (user?.dob) : "01/01/2022"}
                                    type="date"
                                    variant="outlined"
                                    disabled
                                />
                                <TextField
                                    label="Card"
                                    value={user?.idCard ? (user?.idCard): ("Bạn chưa có card.")}
                                    type="text"
                                    variant="outlined"
                                    disabled
                                />
                            </Stack>
                        </div>
                    </Grid>
                </Grid>
            </div>
            <Box flexGrow={1} className="footer-style">
                <FooterComponent />
            </Box>
        </>
    );
};

export default UserProfile;

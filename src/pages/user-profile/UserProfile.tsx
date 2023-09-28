import React, { useEffect } from 'react';
import {
    Avatar,
    Button,
    Grid,
    Stack,
    TextField,
    Typography,
    Radio,
    Box,
    FormLabel,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import './style/style.scss';
import { useNavigate } from 'react-router-dom';
import FooterComponent from '../../common-components/footer-component/FooterComponent';
import CustomerMenuComponent from '../customer/customer-menu-component/CustomerMenuComponent';
import StoreMenuComponent from '../store/store-menu-component/StoreMenuComponent';
import OwnerMenuComponent from '../owner/owner-menu-component/OwnerMenuComponent';
import AdminMenuComponent from '../admin/admin-menu-component/AdminMenuComponent';
import { useAppDispatch, useAppSelector } from '../../services/store/store';
import { getUserByID } from '../../services/features/userSlice';

const UserProfile = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch()

    const { user } = useAppSelector((state) => state.users)
    const { account } = useAppSelector((state) => state.account);

    const [selectedGender, setSelectedGender] = React.useState<number>(user?.gender ?? 3);

    useEffect(() => {
        if (account?.userId) {
            dispatch(getUserByID({ id: account.userId }));
        }
    }, [dispatch, account?.userId]);

    const handleGenderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedGender(Number(event.target.value));
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
                            <Box flexDirection='column' display='flex' alignContent={'left'}>
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
                            </Box>
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
                                        checked={selectedGender === 1}
                                        value={1}
                                        name="radio-buttons"
                                        inputProps={{ 'aria-label': 'male' }}
                                        onChange={handleGenderChange}
                                        disabled
                                    />
                                    Nam

                                    <Radio
                                        checked={selectedGender === 2}
                                        value={2}
                                        name="radio-buttons"
                                        inputProps={{ 'aria-label': 'female' }}
                                        onChange={handleGenderChange}
                                        disabled
                                    />
                                    Nữ

                                    <Radio
                                        checked={selectedGender === 3}
                                        value={3}
                                        name="radio-buttons"
                                        inputProps={{ 'aria-label': 'other' }}
                                        onChange={handleGenderChange}
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
                                    label="CMND/CCCD"
                                    value={user?.idCard ? (user?.idCard) : ("Bạn chưa cập nhật CMND/CCCD.")}
                                    type="text"
                                    variant="outlined"
                                    disabled
                                />
                                <TextField
                                    label="Ngày tạo tài khoản"
                                    value={user?.userVerifyAt ? (user?.userVerifyAt) : ("mm-dd-yyyy")}
                                    type="text"
                                    variant="outlined"
                                    disabled
                                />
                                <TextField
                                    label="Cập nhật lần cuối"
                                    value={user?.userUpdatedAt ? (user?.userUpdatedAt) : ("mm-dd-yyyy")}
                                    type="text"
                                    variant="outlined"
                                    disabled
                                />
                            </Stack>
                        </div>
                    </Grid>
                </Grid>
            </div >
            <Box flexGrow={1} className="footer-style">
                <FooterComponent />
            </Box>
        </>
    );
};

export default UserProfile;
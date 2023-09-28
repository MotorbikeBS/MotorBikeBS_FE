import React, { useState } from 'react';
import {
    Avatar,
    Box,
    Button,
    Grid,
    IconButton,
    InputAdornment,
    Stack,
    TextField,
    Typography,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import CustomerMenuComponent from '../customer/customer-menu-component/CustomerMenuComponent';
import EditIcon from '@mui/icons-material/Edit';
import FooterComponent from '../../common-components/footer-component/FooterComponent';
import { useAppSelector } from '../../services/store/store';
import OwnerMenuComponent from '../owner/owner-menu-component/OwnerMenuComponent';
import StoreMenuComponent from '../store/store-menu-component/StoreMenuComponent';
import AdminMenuComponent from '../admin/admin-menu-component/AdminMenuComponent';

type FormValues = {
    oldPassword: string;
    newPassword: string;
    confirmNewPassword: string;
};

const ChangePassword = () => {
    const navigate = useNavigate();
    const { account } = useAppSelector((state) => state.account);

    const form = useForm<FormValues>({
        defaultValues: {
            oldPassword: '',
            newPassword: '',
            confirmNewPassword: '',
        },
    });

    const { register, handleSubmit, formState } = form;
    const { errors } = formState;

    const [showPassword, setShowPassword] = useState(false);
    const handleShowPass = () => {
        setShowPassword(!showPassword);
    };

    const onSubmit = (data: FormValues) => {
        console.log(data);
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
                            onClick={() => navigate('/user/profile')}
                        >
                            Hồ sơ
                        </Button>
                    </Grid>
                    <Grid item xs={6} md={9}>
                        <div className="profile-input-container">
                            <Typography className="profile-input-heading">
                                Thay đổi mật khẩu
                            </Typography>
                            <Stack spacing={3} className="profile-input-fields">
                                <form
                                    onSubmit={handleSubmit(onSubmit)}
                                    noValidate
                                >
                                    <Stack
                                        spacing={4}
                                        sx={{
                                            width: 350,
                                            marginLeft: 'auto',
                                            marginRight: 'auto',
                                        }}
                                    >
                                        <TextField
                                            label="Mật khẩu Cũ"
                                            type={
                                                showPassword
                                                    ? 'text'
                                                    : 'password'
                                            }
                                            {...register('oldPassword', {
                                                required:
                                                    'Bạn Chưa Nhập Password',
                                            })}
                                            error={!!errors.oldPassword}
                                            helperText={
                                                errors.oldPassword?.message
                                            }
                                            variant="outlined"
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            onClick={
                                                                handleShowPass
                                                            }
                                                        >
                                                            {showPassword ? (
                                                                <Visibility />
                                                            ) : (
                                                                <VisibilityOff />
                                                            )}
                                                        </IconButton>
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                        <TextField
                                            label="Mật khẩu mới"
                                            type={
                                                showPassword
                                                    ? 'text'
                                                    : 'password'
                                            }
                                            {...register('newPassword', {
                                                required:
                                                    'Bạn Chưa Nhập Password',
                                            })}
                                            error={!!errors.newPassword}
                                            helperText={
                                                errors.newPassword?.message
                                            }
                                            variant="outlined"
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            onClick={
                                                                handleShowPass
                                                            }
                                                        >
                                                            {showPassword ? (
                                                                <Visibility />
                                                            ) : (
                                                                <VisibilityOff />
                                                            )}
                                                        </IconButton>
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                        <TextField
                                            label="Xác nhận mật khẩu mới"
                                            type={
                                                showPassword
                                                    ? 'text'
                                                    : 'password'
                                            }
                                            {...register('confirmNewPassword', {
                                                required:
                                                    'Bạn Chưa Nhập Password',
                                            })}
                                            error={!!errors.confirmNewPassword}
                                            helperText={
                                                errors.confirmNewPassword
                                                    ?.message
                                            }
                                            variant="outlined"
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            onClick={
                                                                handleShowPass
                                                            }
                                                        >
                                                            {showPassword ? (
                                                                <Visibility />
                                                            ) : (
                                                                <VisibilityOff />
                                                            )}
                                                        </IconButton>
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                        <Button
                                            type="submit"
                                            variant="contained"
                                            color="primary"
                                            size="large"
                                            fullWidth
                                        >
                                            Xác nhận
                                        </Button>
                                    </Stack>
                                </form>
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

export default ChangePassword;

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
import { useAppDispatch, useAppSelector } from '../../services/store/store';
import OwnerMenuComponent from '../owner/owner-menu-component/OwnerMenuComponent';
import StoreMenuComponent from '../store/store-menu-component/StoreMenuComponent';
import AdminMenuComponent from '../admin/admin-menu-component/AdminMenuComponent';
import { changePassword, setError } from '../../services/features/userSlice';
import { logoutUser } from '../../services/features/accountSlice';
import { toast } from 'react-toastify';

type FormValues = {
    oldPassword: string;
    newPassword: string;
    confirmNewPassword: string;
};

const ChangePassword = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
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

    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);

    const handleShowOldPass = () => {
        setShowOldPassword(!showOldPassword);
    };

    const handleShowNewPass = () => {
        setShowNewPassword(!showNewPassword);
    };
    const handleShowConfirmNewPass = () => {
        setShowConfirmNewPassword(!showConfirmNewPassword);
    };
    const onSubmit = (data: FormValues) => {
        dispatch(
            changePassword({
                oldPassword: data.oldPassword,
                password: data.newPassword,
                passwordConfirmed: data.confirmNewPassword,
            }),
        )
            .unwrap()
            .then(() => {
                toast.success('Đổi mật khẩu thành công.')
                dispatch(logoutUser(data))
                    .unwrap()
                    .then(() => {
                        navigate('/login');
                    });
                dispatch(setError(null));
            })
            .catch((e) => {
                toast.error(e.error[0]);
            });
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
                                            label="Mật khẩu hiện tại"
                                            type={
                                                showOldPassword
                                                    ? 'text'
                                                    : 'password'
                                            }
                                            {...register('oldPassword', {
                                                required:
                                                    'Bạn chưa nhập Mật khẩu hiện tại',
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
                                                                handleShowOldPass
                                                            }
                                                        >
                                                            {showOldPassword ? (
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
                                                showNewPassword
                                                    ? 'text'
                                                    : 'password'
                                            }
                                            {...register('newPassword', {
                                                required:
                                                    'Bạn chưa nhập Mật khẩu mới',
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
                                                                handleShowNewPass
                                                            }
                                                        >
                                                            {showNewPassword ? (
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
                                                showConfirmNewPassword
                                                    ? 'text'
                                                    : 'password'
                                            }
                                            {...register('confirmNewPassword', {
                                                required:
                                                    'Bạn chưa nhập xác nhận lại mật khẩu',
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
                                                                handleShowConfirmNewPass
                                                            }
                                                        >
                                                            {showConfirmNewPassword ? (
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

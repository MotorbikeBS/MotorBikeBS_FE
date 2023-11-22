import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import {
    Button,
    Grid,
    Stack,
    TextField,
    Typography,
    InputAdornment,
    IconButton,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

import Background from '../../common-components/background-component/BackgroundComponent';

import './login-style/login-style.scss';
import { useAppDispatch } from '../../services/store/store';
import { loginUser, setError } from '../../services/features/auth/accountSlice';

type FormValues = {
    email: string;
    password: string;
};

const LoginComponent = () => {
    const navigave = useNavigate();
    const dispatch = useAppDispatch();


    const form = useForm<FormValues>({
        defaultValues: {
            email: '',
            password: '',
        },
    });
    const { register, handleSubmit, formState } = form;
    const { errors } = formState;

    const [showPassword, setShowPassword] = useState(false);
    const handleShowPass = () => {
        setShowPassword(!showPassword);
    };

    const onSubmit = (data: FormValues) => {
        dispatch(loginUser(data))
            .unwrap()
            .then((user) => {
                if (user?.roleId === 1) {
                    navigave('/dashboard');
                } else if (user?.roleId === 2) {
                    navigave('/dashboard')
                } else if (user?.roleId === 3) {
                    navigave('/owner-home')
                }
                else if (user?.roleId === 4) {
                    navigave('/customer-home')
                } else if (user === null) {
                    navigave('/login')
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        return () => {
            dispatch(setError(null));
        };
    }, [dispatch]);

    return (
        <div className="login-container">
            <Grid container>
                <Grid item xs={10} md={8} className="background-column">
                    <Background />
                </Grid>
                <Grid item xs={12} md={4} className="form-column">
                    <Stack>
                        <Typography
                            variant="h4"
                            className="txt-heading"
                            align="center"
                        >
                            Đăng Nhập
                        </Typography>
                        {/* {errorData?.error && (
                            <div className="error-message">
                                {Object.keys(errorData?.error).map((key) => (
                                    <Typography key={key} color='red' marginBottom='20px'>
                                        {errorData.error[key]}
                                    </Typography>
                                ))}
                            </div>
                        )} */}
                        <form onSubmit={handleSubmit(onSubmit)} noValidate>
                            <Stack
                                spacing={4}
                                sx={{
                                    width: 350,
                                    marginLeft: 'auto',
                                    marginRight: 'auto',
                                }}
                            >
                                <TextField
                                    label="Email"
                                    type="email"
                                    {...register('email', {
                                        required: 'Bạn Chưa Nhập Email',
                                    })}
                                    error={!!errors.email}
                                    helperText={errors.email?.message}
                                    variant="outlined"
                                />
                                <TextField
                                    label="Mật Khẩu"
                                    type={showPassword ? 'text' : 'password'}
                                    {...register('password', {
                                        required: 'Bạn Chưa Nhập Password',
                                    })}
                                    error={!!errors.password}
                                    helperText={errors.password?.message}
                                    variant="outlined"
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    onClick={handleShowPass}
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
                                    Đăng Nhập
                                </Button>
                            </Stack>
                        </form>
                        <div className="forgot-password-text">
                            <Link
                                to="/forgot-password"
                                className="signup-link-text"
                            >
                                <Typography>Quên Mật Khẩu</Typography>
                            </Link>
                        </div>
                        <div className="no-account-text">
                            <Typography>Bạn chưa có tài khoản? </Typography>
                            <Link to="/sign-up" className="signup-link-text">
                                <Typography>Đăng Ký Ngay</Typography>
                            </Link>
                        </div>
                    </Stack>
                </Grid>
            </Grid>
        </div>
    );
};

export default LoginComponent;

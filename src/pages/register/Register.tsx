import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom'
import { Button, Grid, Stack, TextField, Typography, InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import Background from '../../common-components/background-component/BackgroundComponent';

import './styles/style.scss';
import { useAppDispatch } from '../../services/store/store';
import { registerUser, setError } from '../../services/features/auth/accountSlice';

type FormValues = {
    username: string;
    email: string;
    password: string;
    passwordConfirmed: string;
};

const Register = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    // const { error } = useAppSelector((state) => state.account);
    // const errorData: any = error;

    const form = useForm<FormValues>({
        defaultValues: {
            username: "",
            email: "",
            password: '',
            passwordConfirmed: ''
        },
    });
    const { register, handleSubmit, formState } = form;
    const { errors } = formState;

    const [showPassword, setShowPassword] = useState(false)
    const handleShowPass = () => {
        setShowPassword(!showPassword);
    }

    const [showConfirmPass, setShowConfirmPass] = useState(false)
    const handleShowConfirmPass = () => {
        setShowConfirmPass(!showConfirmPass)
    }

    const onSubmit = (data: FormValues) => {
        dispatch(registerUser(data))
            .unwrap()
            .then(() => {
                navigate('/login');
            })
            .catch((error) => {
                console.error('Registration failed:', error);
            });
    };

    useEffect(() => {
        return () => {
            dispatch(setError(null));
        };
    }, [dispatch]);

    return (
        <div className='signup-container'>
            <Grid container>
                <Grid item xs={10} md={8} className='background-column'>
                    <Background />
                </Grid>
                <Grid item xs={12} md={4} className='form-column'>
                    <Stack>
                        <Typography variant='h4' className='txt-heading' align='center'>
                            Đăng Ký
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

                            <Stack spacing={2} sx={{ width: 350, marginLeft: 'auto', marginRight: 'auto' }}>
                                <TextField
                                    label='Họ Và Tên'
                                    type='text'
                                    {...register('username', { required: 'Bạn Chưa Nhập Tên' })}
                                    error={!!errors.username}
                                />
                                <TextField
                                    label='Email'
                                    type='email'
                                    {...register('email', { required: 'Bạn Chưa Nhập Email' })}
                                    error={!!errors.email}
                                    helperText={errors.email?.message}
                                    variant='outlined'
                                />
                                <TextField
                                    label='Mật Khẩu'
                                    type={showPassword ? 'text' : 'password'}
                                    {...register('password', { required: 'Bạn Chưa Nhập Password' })}
                                    error={!!errors.password}
                                    helperText={errors.password?.message}
                                    variant='outlined'
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position='end'>
                                                <IconButton onClick={handleShowPass}>
                                                    {showPassword ? <Visibility /> : <VisibilityOff />}
                                                </IconButton>
                                            </InputAdornment>
                                        )
                                    }}
                                />
                                <TextField
                                    label='Nhập Lại Mật Khẩu'
                                    type={showConfirmPass ? 'text' : 'password'}
                                    {...register('passwordConfirmed', { required: 'Bạn Chưa Xác Nhận Mật Khẩu' })}
                                    error={!!errors.passwordConfirmed}
                                    helperText={errors.passwordConfirmed?.message}
                                    variant='outlined'
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position='end'>
                                                <IconButton onClick={handleShowConfirmPass}>
                                                    {showConfirmPass ? <Visibility /> : <VisibilityOff />}
                                                </IconButton>
                                            </InputAdornment>
                                        )
                                    }}
                                />
                                <Button type='submit' variant='contained' color='primary' size='large' fullWidth>
                                    Đăng Ký
                                </Button>
                            </Stack>
                        </form>
                        <div className='account-text'>
                            <Typography>Bạn đã có tài khoản? </Typography>
                            <Link to="/login" className='login-link-text'>
                                <Typography>Đăng Nhập</Typography>
                            </Link>
                        </div>
                    </Stack>
                </Grid>
            </Grid>
        </div >
    );
};

export default Register;

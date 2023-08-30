import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom'
import { Button, Grid, Stack, TextField, Typography, InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import Background from '../../common-components/bgr/Background';

import './styles/style.scss';

type FormValues = {
    username: string;
    address: string;
    phone: string;
    email: string;
    password: string;
    passwordConfirm: string;
};

const Register = () => {
    const form = useForm<FormValues>({
        defaultValues: {
            username: "",
            address: "",
            phone: '',
            email: "",
            password: '',
            passwordConfirm: ''
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
        console.log(data);
    };

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
                        <form onSubmit={handleSubmit(onSubmit)} noValidate>

                            <Stack spacing={2} sx={{ width: 350, marginLeft: 'auto', marginRight: 'auto' }}>
                                <TextField
                                    label='Họ Và Tên'
                                    type='text'
                                    {...register('username', { required: 'Bạn Chưa Nhập Tên' })}
                                    error={!!errors.username}
                                    helperText={errors.username?.message}
                                    variant='outlined'
                                />
                                <TextField
                                    label='Địa Chỉ'
                                    type='text'
                                    {...register('address')}
                                    variant='outlined'
                                />
                                <TextField
                                    label='Số Điện Thoại'
                                    {...register('phone', { required: 'Bạn Chưa Nhập Số Điện Thoại' })}
                                    error={!!errors.phone}
                                    helperText={errors.phone?.message}
                                    variant='outlined'
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
                                    {...register('passwordConfirm', { required: 'Bạn Chưa Xác Nhận Mật Khẩu' })}
                                    error={!!errors.passwordConfirm}
                                    helperText={errors.passwordConfirm?.message}
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

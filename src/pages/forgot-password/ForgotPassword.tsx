import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom'
import { Button, Grid, Stack, TextField, Typography } from '@mui/material';


import Background from '../../common-components/background-component/BackgroundComponent';

import './style/style.scss';

type FormValues = {
    email: string;
};

const ForgotPassword = () => {
    const form = useForm<FormValues>({
        defaultValues: {
            email: '',
        },
    });
    const { register, handleSubmit, formState } = form;
    const { errors } = formState;

    const onSubmit = (data: FormValues) => {
        console.log(data);
    };

    return (
        <div className='forgot-password-container'>
            <Grid container>
                <Grid item xs={10} md={8} className='background-column'>
                    <Background />
                </Grid>
                <Grid item xs={12} md={4} className='form-column'>
                    <Stack>
                        <Typography variant='h4' className='txt-heading' align='center'>
                            Khôi Phục Mật Khẩu
                        </Typography>
                        <form onSubmit={handleSubmit(onSubmit)} noValidate>
                            <Stack spacing={4} sx={{ width: 350, marginLeft: 'auto', marginRight: 'auto' }}>

                                <TextField
                                    label='Email'
                                    type='email'
                                    {...register('email', { required: 'Bạn Chưa Nhập Email' })}
                                    error={!!errors.email}
                                    helperText={errors.email?.message}
                                    variant='outlined'
                                />
                                <Button type='submit' variant='contained' color='primary' size='large' fullWidth>
                                    XÁC NHẬN
                                </Button>
                            </Stack>
                        </form>
                        <div className='no-account-text'>
                            <Typography>Bạn chưa có tài khoản? </Typography>
                            <Link to="/sign-up" className='signup-link-text'>
                                <Typography>Đăng Ký Ngay</Typography>
                            </Link>
                        </div>
                    </Stack>
                </Grid>
            </Grid>
        </div >
    );
};

export default ForgotPassword;

import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom'
import { Button, Grid, Stack, TextField, Typography } from '@mui/material';


import Background from '../../common-components/background-component/BackgroundComponent';

import './style/style.scss';
import { useAppDispatch, useAppSelector } from '../../services/store/store';
import { forgotPassword, setError } from '../../services/features/auth/accountSlice';

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

    const dispatch = useAppDispatch()
    // const { error } = useAppSelector((state) => state.account)
    // const errorData: any = error;

    const onSubmit = (data: FormValues) => {
        dispatch(forgotPassword(data))
    };

    useEffect(() => {
        return () => {
            dispatch(setError(null));
        };
    }, [dispatch]);

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

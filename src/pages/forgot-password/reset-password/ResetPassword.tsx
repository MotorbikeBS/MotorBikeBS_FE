import React, { useEffect } from 'react';
import './style/style.scss';
import { Button, Grid, Stack, TextField, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import BackgroundComponent from '../../../common-components/background-component/BackgroundComponent';
import {
    resetPassword,
    setError,
} from '../../../services/features/auth/accountSlice';
import { useAppDispatch } from '../../../services/store/store';
import { useParams, Link, useNavigate } from 'react-router-dom';

type FormValues = {
    password: string;
    passwordConfirmed: string;
};

const ResetPassword = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate()
    // const { error } = useAppSelector((state) => state.account);

    // const errorData: any = error;
    const form = useForm({
        defaultValues: {
            password: '',
            passwordConfirmed: '',
        },
    });
    const { register, handleSubmit, formState } = form;
    const { errors } = formState;

    const { token } = useParams<{ token?: string }>();

    const onSubmit = async (data: FormValues) => {
        if (token) {
            try {
                await dispatch(
                    resetPassword({
                        token,
                        password: data.password,
                        passwordConfirmed: data.passwordConfirmed,
                    }),
                )
                    .unwrap()
                    .then(() => {
                        navigate('/login');
                    });
            } catch (err) {
                console.error(err);
            }
        }
    };
    useEffect(() => {
        return () => {
            dispatch(setError(null));
        };
    }, [dispatch]);

    return (
        <div className="reset-password-container">
            <Grid container>
                <Grid item xs={10} md={8} className="background-column">
                    <BackgroundComponent />
                </Grid>
                <Grid item xs={12} md={4} className="form-column">
                    <Stack>
                        <Typography
                            variant="h4"
                            className="txt-heading"
                            align="center"
                        >
                            Khôi Phục Mật Khẩu
                        </Typography>
                        {/* {errorData?.error && (
                            <div className="error-message">
                                {Object.keys(errorData?.error).map((key) => (
                                    <Typography
                                        key={key}
                                        color="red"
                                        marginBottom="20px"
                                    >
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
                                    label="Nhập mật khẩu mới"
                                    type="password"
                                    {...register('password', {
                                        required: 'Bạn chưa nhập mật khẩu',
                                    })}
                                    error={!!errors.password}
                                    helperText={errors.password?.message}
                                    variant="outlined"
                                />
                                <TextField
                                    label="Xác nhận mật khẩu"
                                    type="password"
                                    {...register('passwordConfirmed', {
                                        required:
                                            'Bạn chưa xác nhận mật khẩu !',
                                    })}
                                    error={!!errors.passwordConfirmed}
                                    helperText={
                                        errors.passwordConfirmed?.message
                                    }
                                    variant="outlined"
                                />
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    size="large"
                                    fullWidth
                                >
                                    Đặt lại mật khẩu
                                </Button>
                            </Stack>
                        </form>
                        <div className="account-text">
                            <Typography>Bạn đã nhớ mật khẩu? </Typography>
                            <Link to="/login" className="login-link-text">
                                <Typography>Đăng Nhập</Typography>
                            </Link>
                        </div>
                    </Stack>
                </Grid>
            </Grid>
        </div>
    );
};

export default ResetPassword;

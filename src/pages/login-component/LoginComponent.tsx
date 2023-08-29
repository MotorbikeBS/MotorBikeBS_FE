import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom'
import { Button, Grid, Stack, TextField, Typography, InputAdornment, IconButton, Icon } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

import Background from '../../common-components/bgr/Background';

import './login-style/login-style.scss';

type FormValues = {
  email: string;
  password: string;
};

const LoginComponent = () => {
  const form = useForm<FormValues>({
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const { register, handleSubmit, formState } = form;
  const { errors } = formState;

  const [showPassword, setShowPassword] = useState(false)
  const handleShowPass = () => {
    setShowPassword(!showPassword);
  }

  const onSubmit = (data: FormValues) => {
    console.log(data);
  };

  return (
    <div className='login-container'>
      <Grid container>
        <Grid item xs={10} md={8} className='background-column'>
          <Background />
        </Grid>
        <Grid item xs={12} md={4} className='form-column'>
          <Stack>
            <Typography variant='h4' className='txt-heading' align='center'>
              Đăng Nhập
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
                <Button type='submit' variant='contained' color='primary' size='large' fullWidth>
                  Đăng Nhập
                </Button>
              </Stack>
            </form>
            <div className='forgot-password-text'>
              <Link to="/forgot-password" className='signup-link-text'>
                <Typography>Quên Mật Khẩu</Typography>
              </Link>
            </div>
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

export default LoginComponent;

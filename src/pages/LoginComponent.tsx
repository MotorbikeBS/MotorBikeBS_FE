import React from 'react';
import { Button, Grid, Stack, TextField, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import Background from '../common-components/bgr/Background';
import './LoginStyled/login-style.scss'; // Đảm bảo import file style

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
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <Stack spacing={3} sx={{ width: 350, marginLeft: 'auto', marginRight: 'auto' }}>
              <Typography variant='h4' color='#ab6502' className='txt-heading' align='center'>
                Đăng Nhập
              </Typography>
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
                type='password'
                {...register('password', { required: 'Bạn Chưa Nhập Password' })}
                error={!!errors.password}
                helperText={errors.password?.message}
                variant='outlined'
              />
              <Button type='submit' variant='contained' color='primary' size='large' fullWidth>
                Đăng Nhập
              </Button>
              <Button type='submit' variant='outlined' color='primary' size='large' fullWidth>
                Đăng Nhập với Google +
              </Button>
            </Stack>
          </form>
        </Grid>
      </Grid>
    </div>
  );
};

export default LoginComponent;

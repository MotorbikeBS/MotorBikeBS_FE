import React from 'react'
import { useForm } from 'react-hook-form';
import { Box, Button, Container, Stack, TextField, Typography } from '@mui/material'
import CustomerMenuComponent from '../customer-menu-component/CustomerMenuComponent'
import FooterComponent from '../../../common-components/footer-component/FooterComponent'

import './style/style.scss'

interface ISignupStore {
    storeName: string,
    storePhone: string,
    storeEmail: string,
    storeAddress: string,
    local: []
}

const SignUpStoreOwner = () => {
    const form = useForm<ISignupStore>({
        defaultValues: {
            storeName: '',
            storePhone: '',
            storeEmail: '',
            storeAddress: '',
            // local: []
        }
    })
    const { register, formState, handleSubmit } = form;
    const { errors } = formState;

    const onSubmit = (data: ISignupStore) => {
        console.log(data);
    };
    return (
        <Box
            display='flex'
            flexDirection='column'
            height='100vh'
            width='100%'
            flexGrow={12}
        >
            <Box flexGrow={1} zIndex={2}>
                <CustomerMenuComponent />
            </Box>
            <Box flexGrow={8} display='flex'>
                <Container
                    className='container-page'
                >
                    <div className='signup-storeOwner-header'>
                        <Typography
                            fontSize={30}
                            fontWeight={700}
                            color='primary'
                            className='text-header'
                        >
                            Đăng ký trở thành chủ cửa hàng
                        </Typography>
                    </div>
                    <div className='form-signup-storeOwner'>
                        <form onSubmit={handleSubmit(onSubmit)} noValidate>
                            <Stack
                                spacing={2}
                                sx={{
                                    width: 350,
                                    marginLeft: 'auto',
                                    marginRight: 'auto',
                                    marginTop: '20px'
                                }}
                            >
                                <TextField
                                    label='Tên cửa hàng'
                                    type='text'
                                    {...register('storeName',
                                        {
                                            required: 'Bạn chưa nhập tên cửa hàng'
                                        })}
                                    error={!!errors.storeName}
                                    helperText={errors.storeName?.message}
                                    variant='outlined'
                                />
                                <TextField
                                    label='Số điện thoại cửa hàng'
                                    type='text'
                                    {...register('storePhone',
                                        {
                                            required: 'Bạn chưa nhập số điện thoại'
                                        })}
                                    error={!!errors.storePhone}
                                    helperText={errors.storePhone?.message}
                                    variant='outlined'
                                />
                                <TextField
                                    label='Địa chỉ Email cửa hàng'
                                    type='email'
                                    {...register('storeEmail',
                                        {
                                            required: 'Bạn chưa nhập Email'
                                        })}
                                    error={!!errors.storeEmail}
                                    helperText={errors.storeEmail?.message}
                                    variant='outlined'
                                />
                                <TextField
                                    label='Địa chỉ cửa hàng'
                                    type='text'
                                    {...register('storeAddress',
                                        {
                                            required: 'Bạn chưa nhập địa chỉ'
                                        })}
                                    error={!!errors.storeAddress}
                                    helperText={errors.storeAddress?.message}
                                    variant='outlined'
                                />
                                <Button
                                    type='submit'
                                    variant='contained'
                                    color='primary'
                                    size='large'
                                    fullWidth
                                >
                                    Đăng Ký
                                </Button>
                            </Stack>
                        </form>
                    </div>
                    <div className='text-note'>
                        <Typography
                            color='red'
                        >* Lưu ý:</Typography>
                        <Typography
                            maxWidth='60%'
                            fontSize='12px'
                            minWidth='60%'
                        >
                            Đây là biểu mẫu đăng ký để trở thành chủ cửa hàng,
                            khi đã trở thành chủ cửa hàng bạn sẽ không thực hiện chức năng như như mua xe</Typography>
                    </div>
                </Container>

            </Box>
            <Box flexGrow={1} className="footer-style">
                <FooterComponent />
            </Box>
        </Box >
    )
}

export default SignUpStoreOwner
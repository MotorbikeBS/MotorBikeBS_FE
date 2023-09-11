import React from 'react'
import { useForm } from 'react-hook-form';
import { Box, Container, Stack, TextField, Typography } from '@mui/material'
import CustomerMenuComponent from '../customer-menu-component/CustomerMenuComponent'
import FooterComponent from '../../../common-components/footer-component/FooterComponent'

import './style/style.scss'

interface ISignupStore {
    storeName: string,
    storePhone: string,
    storeEmail: string,
    address: string,
    local: []
}

const SignUpStoreOwner = () => {
    const form = useForm<ISignupStore>({
        defaultValues: {
            storeName: '',
            storePhone: '',
            storeEmail: '',
            address: '',
            local: []
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
        >
            <Box flexGrow={1} zIndex={2}>
                <CustomerMenuComponent />
            </Box>
            <Box flexGrow={10} display='flex'>
                <Container>
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
                            </Stack>
                        </form>
                    </div>
                </Container>
            </Box>
            <Box flexGrow={1} className="footer-style">
                <FooterComponent />
            </Box>
        </Box>
    )
}

export default SignUpStoreOwner
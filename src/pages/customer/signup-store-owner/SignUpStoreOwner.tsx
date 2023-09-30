import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import {
    Box,
    Button,
    Container,
    Stack,
    TextField,
    Typography,
} from '@mui/material';
import CustomerMenuComponent from '../customer-menu-component/CustomerMenuComponent';
import FooterComponent from '../../../common-components/footer-component/FooterComponent';

import './style/style.scss';
import { useAppDispatch, useAppSelector } from '../../../services/store/store';
import { registerStore, setError } from '../../../services/features/storeSlice';

interface ISignupStore {
    userId: number;
    storeName: string;
    taxCode: string;
    storePhone: string;
    storeEmail: string;
    address: string;
}

const SignUpStoreOwner = () => {
    const dispatch = useAppDispatch()
    const { error } = useAppSelector((state) => state.store)
    const errorData: any = error;

    const form = useForm<ISignupStore>({
        defaultValues: {
            storeName: '',
            taxCode: '',
            storePhone: '',
            storeEmail: '',
            address: ''

        },
    });
    const { register, formState, handleSubmit } = form;
    const { errors } = formState;

    const onSubmit = (data: ISignupStore) => {
        console.log(data);
        dispatch(registerStore(data))
    };

    useEffect(() => {
        return () => {
            dispatch(setError(null));
        };
    }, [dispatch]);

    return (
        <Box
            display="flex"
            flexDirection="column"
            height="100vh"
            width="100%"
            flexGrow={12}
        >
            <Box flexGrow={1} zIndex={2}>
                <CustomerMenuComponent />
            </Box>
            <Box flexGrow={8} display="flex">
                <Container className="container-page">
                    <div className="signup-storeOwner-header">

                        <Typography
                            fontSize={30}
                            fontWeight={700}
                            color="primary"
                            className="text-header"
                        >
                            Đăng ký trở thành chủ cửa hàng
                        </Typography>
                    </div>
                    <div className="signup-storeOwner-header">
                        {errorData?.error && (
                            <div className="error-message">
                                {Object.keys(errorData?.error).map((key) => (
                                    <Typography key={key} color='red' marginBottom='20px' alignContent='center'>
                                        {errorData.error[key]}
                                    </Typography>
                                ))}
                            </div>
                        )}
                    </div>
                    <div className="form-signup-storeOwner">

                        <form onSubmit={handleSubmit(onSubmit)} noValidate>
                            <Stack
                                spacing={2}
                                sx={{
                                    width: 350,
                                    marginLeft: 'auto',
                                    marginRight: 'auto',
                                    marginTop: '20px',
                                }}
                            >
                                <TextField
                                    label="Tên cửa hàng"
                                    type="text"
                                    {...register('storeName', {
                                        required: 'Bạn chưa nhập tên cửa hàng',
                                    })}
                                    error={!!errors.storeName}
                                    helperText={errors.storeName?.message}
                                    variant="outlined"
                                />
                                <TextField
                                    label="Mã số thuế"
                                    type="text"
                                    {...register('taxCode', {
                                        required: 'Bạn chưa nhập mã số thuế',
                                    })}
                                    error={!!errors.taxCode}
                                    helperText={errors.taxCode?.message}
                                    variant="outlined"
                                />
                                <TextField
                                    label="Số điện thoại cửa hàng"
                                    type="text"
                                    {...register('storePhone', {
                                        required: 'Bạn chưa nhập số điện thoại',
                                    })}
                                    error={!!errors.storePhone}
                                    helperText={errors.storePhone?.message}
                                    variant="outlined"
                                />
                                <TextField
                                    label="Địa chỉ Email cửa hàng"
                                    type="email"
                                    {...register('storeEmail', {
                                        required: 'Bạn chưa nhập Email',
                                    })}
                                    error={!!errors.storeEmail}
                                    helperText={errors.storeEmail?.message}
                                    variant="outlined"
                                />
                                <TextField
                                    label="Địa chỉ cửa hàng"
                                    type="text"
                                    {...register('address', {
                                        required: 'Bạn chưa nhập địa chỉ',
                                    })}
                                    error={!!errors.address}
                                    helperText={errors.address?.message}
                                    variant="outlined"
                                />{' '}
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    size="large"
                                    fullWidth
                                >
                                    Đăng Ký
                                </Button>
                            </Stack>
                        </form>
                    </div>

                    <div className="text-note">

                        <Typography color="red">* Lưu ý:</Typography>
                        <Typography
                            maxWidth="60%"
                            fontSize="12px"
                            minWidth="60%"
                        >
                            Đây là biểu mẫu đăng ký để trở thành chủ cửa hàng,
                            khi đã trở thành chủ cửa hàng bạn sẽ không thực hiện
                            chức năng như như mua xe
                        </Typography>
                    </div>
                </Container>
            </Box>
            <Box flexGrow={1} className="footer-style">
                <FooterComponent />
            </Box>
        </Box>
    );
};

export default SignUpStoreOwner;

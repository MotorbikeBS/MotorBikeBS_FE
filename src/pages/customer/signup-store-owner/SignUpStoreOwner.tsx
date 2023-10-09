import React, { useEffect, } from 'react';
import { useForm } from 'react-hook-form';
import {
    Box,
    Button,
    Container,
    Input,
    InputLabel,
    Stack,
    TextField,
    Typography,
} from '@mui/material';
import CustomerMenuComponent from '../customer-menu-component/CustomerMenuComponent';
import FooterComponent from '../../../common-components/footer-component/FooterComponent';
import { useAppDispatch, useAppSelector } from '../../../services/store/store';
import { registerStore, setError } from '../../../services/features/storeSlice';

interface ISignupStore {
    storeName: string;
    taxCode: string;
    storePhone: string;
    storeEmail: string;
    address: string;
    file: FileList;
    license: FileList;
}

const SignUpStoreOwner = () => {

    const dispatch = useAppDispatch();
    const { error } = useAppSelector((state) => state.store);
    const errorData: any = error;

    const form = useForm<ISignupStore>({
        defaultValues: {
            storeName: '',
            taxCode: '',
            storePhone: '',
            storeEmail: '',
            address: '',
            file: undefined,
            license: undefined
        },
    });
    const { register, formState, handleSubmit } = form;
    const { errors } = formState;

    const onSubmit = (data: ISignupStore) => {
        const formData = new FormData();
        formData.append('storeName', data.storeName);
        formData.append('taxCode', data.taxCode);
        formData.append('storePhone', data.storePhone);
        formData.append('storeEmail', data.storeEmail);
        formData.append('address', data.address);
        if (data.file && data.file.length > 0) {
            formData.append('file', data.file[0]);
        }
        if (data.license && data.license.length > 0) {
            formData.append('license', data.license[0]);
        }

        dispatch(registerStore(formData));
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
                            textAlign='center'
                        >
                            Đăng ký trở thành chủ cửa hàng
                        </Typography>
                    </div>
                    <div className="signup-storeOwner-header">
                        {errorData?.error && (
                            <div className="error-message">
                                {Object.keys(errorData?.error).map((key) => (
                                    <Typography
                                        key={key}
                                        color="red"
                                        marginBottom="20px"
                                        alignContent="center"
                                        textAlign='center'
                                    >
                                        {errorData.error[key]}
                                    </Typography>
                                ))}
                            </div>
                        )}
                    </div>
                    <div className="form-signup-storeOwner">
                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            noValidate
                            encType="multipart/form-data"
                        >
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
                                />
                                <label htmlFor="file">Ảnh cho cửa hàng:</label>
                                <Input
                                    id="file"
                                    type="file"
                                    {...register('file', {
                                        required: 'Bạn chưa chọn ảnh cho cửa hàng',
                                    })}
                                />

                                <label htmlFor="license">Giấy phép kinh doanh:</label>
                                <Input
                                    id="license"
                                    type="file"
                                    {...register('license', {
                                        required: 'Bạn chưa chọn giấy phép kinh doanh',
                                    })}
                                />

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
                        <Typography color="red"
                            marginLeft='35%'>
                            * Lưu ý:
                        </Typography>
                        <Typography
                            maxWidth="30%"
                            fontSize="12px"
                            minWidth="30%"
                            marginLeft='35%'
                        >
                            Đây là biểu mẫu đăng ký để trở thành chủ cửa hàng,
                            khi đã trở thành chủ cửa hàng bạn sẽ không thực hiện
                            chức năng như tài khoản khách hàng.
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

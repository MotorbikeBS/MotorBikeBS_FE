import { Box, Button, Container, Stack, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import CustomerMenuComponent from '../customer-menu-component/CustomerMenuComponent'
import FooterComponent from '../../../common-components/footer-component/FooterComponent'
import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../../services/store/store';
import { clearError, ownerRegister } from '../../../services/features/ownerSlice';
import { logoutUser, setError } from '../../../services/features/accountSlice';
import { getUserByID } from '../../../services/features/userSlice';
import { useNavigate } from 'react-router-dom';


interface IRegisterOwner {
    phone: string;
    idCard: string;
    address: string;
}

const SignUpMotorbikeOwner = () => {
    const [phone, setPhone] = useState<string>('');
    const [address, setAddress] = useState<string>('');
    const [idCard, setIdCard] = useState<string>('');

    const dispatch = useAppDispatch();
    const navigate = useNavigate()

    const { account } = useAppSelector((state) => state.account);
    const { user } = useAppSelector((state) => state.users);
    const { error } = useAppSelector((state) => state.owner);
    const errorData: any = error;

    useEffect(() => {
        if (account?.userId) {
            dispatch(getUserByID({ id: account.userId }));
        }
    }, [dispatch, account?.userId]);

    useEffect(() => {
        if (user) {
            setPhone(user?.phone ? user.phone : '');
            setAddress(user?.address ? user.address : '');

            setIdCard(user?.idCard);
        }
    }, [user]);


    const form = useForm({
        defaultValues: {
            phone: account?.phone || '',
            idCard: account?.idCard || '',
            address: account?.address || '',
        }
    })

    const { register, handleSubmit, formState } = form;
    const { errors } = formState;


    const onSubmit = async (data: IRegisterOwner) => {
        try {
            await dispatch(ownerRegister(data)).unwrap();
            if (account) {
                await dispatch(getUserByID({ id: account.userId }));
                dispatch(logoutUser(account.userId));
                navigate('/login')
            }
        } catch (error) {
        }
    };
    useEffect(() => {
        return () => {
            dispatch(clearError());
        };
    }, [dispatch, form]);

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
                <Container>
                    <div className="signup-storeOwner-header">
                        <Typography
                            fontSize={30}
                            fontWeight={700}
                            color="primary"
                            className="text-header"
                            textAlign='center'
                        >
                            Đăng ký là chủ xe:
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
                                    label='Số Điện Thoại'
                                    value={user?.phone || ''}
                                    type='text'
                                    {...register('phone', {
                                        required: 'Bạn chưa nhập số điện thoại'
                                    })}
                                    onChange={(e) => {
                                        const inputValue = e.target.value;
                                        form.setValue('phone', inputValue);
                                    }}
                                    error={!!errors.phone}
                                    helperText={errors.phone?.message}
                                />
                                <TextField
                                    label='CMND/CCCD'
                                    value={
                                        user?.idCard
                                            ? user?.idCard
                                            : 'Bạn chưa cập nhật CMND/CCCD.'
                                    }
                                    type='text'
                                    {...register('idCard', {
                                        required: 'Bạn chưa nhập CMND/CCCD'
                                    })}
                                    onChange={(e) => {
                                        const inputValue = e.target.value;
                                        console.log('Input changed:', inputValue);
                                        form.setValue('idCard', inputValue);
                                    }}
                                    error={!!errors.idCard}
                                    helperText={errors.idCard?.message}
                                />

                                <TextField
                                    label='Địa chỉ của bạn'
                                    value={address}
                                    type='text'
                                    {...register('address', {
                                        required: 'Bạn chưa nhập địa chỉ'
                                    })}
                                    onChange={(e) => {
                                        const inputValue = e.target.value;
                                        form.setValue('address', inputValue);
                                    }}
                                    error={!!errors.address}
                                    helperText={errors.address?.message}
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
                            Đây là biểu mẫu đăng ký để trở thành chủ xe máy,
                            khi đã trở thành tài khoản chủ xe  bạn sẽ không thực hiện
                            chức năng như tài khoản khách hàng.
                        </Typography>
                    </div>
                </Container>
            </Box>
            <Box flexGrow={1} className="footer-style">
                <FooterComponent />
            </Box>
        </Box>
    )
}

export default SignUpMotorbikeOwner
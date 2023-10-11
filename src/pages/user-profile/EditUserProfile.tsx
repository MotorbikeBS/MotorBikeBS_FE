import React, { useEffect, useState } from 'react';
import {
    Avatar,
    Button,
    Grid,
    Stack,
    TextField,
    Typography,
    Radio,
    FormLabel,
    Dialog,
    DialogTitle,
    DialogActions,
    Box,
    FormControl,
    RadioGroup,
    FormControlLabel,
} from '@mui/material';
import DoneIcon from '@mui/icons-material/Done';
import ClearIcon from '@mui/icons-material/Clear';
import './style/style.scss';
import { useNavigate } from 'react-router-dom';
import FooterComponent from '../../common-components/footer-component/FooterComponent';
import CustomerMenuComponent from '../customer/customer-menu-component/CustomerMenuComponent';
import { useAppDispatch, useAppSelector } from '../../services/store/store';
import AdminMenuComponent from '../admin/admin-menu-component/AdminMenuComponent';
import StoreMenuComponent from '../store/store-menu-component/StoreMenuComponent';
import OwnerMenuComponent from '../owner/owner-menu-component/OwnerMenuComponent';
import { useForm } from 'react-hook-form';
import { format } from 'date-fns';
import { editUserByID, getUserByID } from '../../services/features/user/userSlice';
import { toast } from 'react-toastify';

type FormValues = {
    userId: number;
    userName: string;
    phone: string;
    gender: number;
    dob: Date;
    idCard: string;
    address: string;
};

const EditUserProfile = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const { account } = useAppSelector((state) => state.account);
    const { user } = useAppSelector((state) => state.users);

    const [openCancel, setOpenCancel] = React.useState(false);

    const [userName, setUserName] = useState<string>('');
    const [phone, setPhone] = useState<string>('');
    const [address, setAddress] = useState<string>('');
    const [dob, setDob] = useState<string>('');
    const [idCard, setIdCard] = useState<string>('');
    const [gender, setGender] = useState<string>('3');

    const handleClickCancel = () => {
        setOpenCancel(true);
    };
    const handleCancel = () => {
        handleClickCancel();
    };

    const handleCancelCan = () => {
        setOpenCancel(false);
    };

    const handleCancelSuc = () => {
        navigate('/user/profile');
    };

    const handleGenderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setGender(event.target.value);
    };

    useEffect(() => {
        if (account?.userId) {
            dispatch(getUserByID({ id: account.userId }));
        }
    }, [dispatch, account?.userId]);

    useEffect(() => {
        if (user) {
            setUserName(user?.userName);
            setPhone(user?.phone ? user.phone : '');
            setAddress(user?.address ? user.address : '');
            setDob(
                user?.dob
                    ? format(new Date(user.dob), "yyyy-MM-dd'T'HH:mm")
                    : '',
            );
            setIdCard(user?.idCard);
            setGender(user?.gender ? user?.gender.toString() : '3');
        }
    }, [user]);

    const form = useForm<FormValues>({
        defaultValues: {
            userId: account?.userId,
            userName: '',
            phone: '',
            gender: 3,
            dob: new Date(),
            idCard: '',
            address: '',
        },
    });
    const { register, handleSubmit, formState } = form;
    const { errors } = formState;

    const onSubmit = (data: FormValues) => {
        if (account && account.userId) {
            dispatch(editUserByID({ id: account.userId, data: data }))
                .unwrap()
                .then(() => {
                    toast.success('Chỉnh sửa thành công');
                    navigate('/user/profile');
                })
                .catch((err) => {
                    console.log(err.error[0]);
                    toast.error(err.error[0]);
                });
        }
        console.log(data);
    };

    return (
        <>
            {account?.roleId === 1 && <AdminMenuComponent />}
            {account?.roleId === 2 && <StoreMenuComponent />}
            {account?.roleId === 3 && <OwnerMenuComponent />}
            {account?.roleId === 4 && <CustomerMenuComponent />}

            <div className="profile-container">
                <Grid container spacing={2}>
                    <Grid item xs={6} md={3}>
                        <div className="profile-ava">
                            <Avatar
                                sx={{
                                    width: 52,
                                    height: 52,
                                    bgcolor: 'orange',
                                }}
                            >
                                Hi
                            </Avatar>
                            <div>
                                {account?.roleId === 2 ? (
                                    <>
                                        <Typography className="edit-profile-name">
                                            {user?.storeDesciptions?.[0]?.storeName || user?.userName}
                                        </Typography>
                                    </>
                                ) : (
                                    <>
                                        <Typography className="edit-profile-name">
                                            {user?.userName}
                                        </Typography>
                                    </>
                                )}
                            </div>
                        </div>
                        <hr />
                    </Grid>
                    <Grid item xs={6} md={9}>
                        <div className="profile-input-container">
                            <Typography className="profile-input-heading">
                                Chỉnh sửa hồ sơ
                            </Typography>
                            <form onSubmit={handleSubmit(onSubmit)} noValidate>
                                <Stack
                                    spacing={3}
                                    className="profile-input-fields"
                                >
                                    {account?.roleId === 2 && (
                                        <>
                                            <TextField
                                                label="Email Cửa hàng"
                                                value={user?.email}
                                                type="email"
                                                variant="outlined"
                                                disabled
                                            />

                                            <TextField
                                                label="Tên cửa hàng"
                                                value={user?.userName}
                                                type="text"
                                                variant="outlined"
                                                disabled
                                            />
                                            <TextField
                                                label="Mã số thuế"
                                                value={
                                                    user?.idCard
                                                        ? user?.idCard
                                                        : 'Bạn chưa cập nhật mã số thuế.'
                                                }
                                                type="text"
                                                variant="outlined"
                                                disabled
                                            />
                                        </>
                                    )}
                                    <TextField
                                        label="Email"
                                        value={user?.email}
                                        type="email"
                                        variant="outlined"
                                        disabled
                                    />
                                    <TextField
                                        label="Họ và Tên"
                                        type="text"
                                        value={userName}
                                        {...register('userName', {
                                            required: 'Bạn chưa chỉnh sửa tên',
                                        })}
                                        error={!!errors.userName}
                                        helperText={
                                            errors.userName &&
                                            errors.userName.message
                                        }
                                        onChange={(e) =>
                                            setUserName(e.target.value)
                                        }
                                    />
                                    <FormControl component="fieldset">
                                        <FormLabel component="legend">
                                            Giới tính:
                                        </FormLabel>
                                        <RadioGroup
                                            row
                                            aria-label="gender"
                                            value={gender}
                                            onChange={handleGenderChange}
                                        >
                                            <div>
                                                <FormControlLabel
                                                    value={1}
                                                    control={<Radio />}
                                                    label="Nam"
                                                    {...register('gender')}
                                                />
                                                <FormControlLabel
                                                    value={2}
                                                    control={<Radio />}
                                                    label="Nữ"
                                                    {...register('gender')}
                                                />
                                                <FormControlLabel
                                                    value={3}
                                                    control={<Radio />}
                                                    label="Khác"
                                                    {...register('gender')}
                                                />
                                            </div>
                                        </RadioGroup>
                                    </FormControl>

                                    <TextField
                                        label="Điện thoại"
                                        value={phone}
                                        type="text"
                                        {...register('phone', {
                                            required:
                                                'Bạn chưa chỉnh sửa Số Điện thoại',
                                        })}
                                        error={!!errors.phone}
                                        helperText={
                                            errors.phone && errors.phone.message
                                        }
                                        onChange={(e) =>
                                            setPhone(e.target.value)
                                        }
                                    />
                                    <TextField
                                        label="Địa chỉ"
                                        value={address}
                                        type="text"
                                        {...register('address', {
                                            required:
                                                'Bạn chưa chỉnh sửa Địa chỉ',
                                        })}
                                        error={!!errors.address}
                                        helperText={
                                            errors.address &&
                                            errors.address.message
                                        }
                                        onChange={(e) =>
                                            setAddress(e.target.value)
                                        }
                                    />
                                    <TextField
                                        label="Ngày sinh"
                                        value={dob}
                                        type="datetime-local"
                                        {...register('dob', {
                                            required: 'Nhập ngày',
                                        })}
                                        error={!!errors.dob}
                                        helperText={
                                            errors.dob && errors.dob.message
                                        }
                                        onChange={(e) => {
                                            setDob(e.target.value);
                                        }}
                                    />

                                    <TextField
                                        label="CCCD/CMND"
                                        value={idCard}
                                        type="text"
                                        {...register('idCard', {
                                            required:
                                                'Bạn chưa chỉnh sửa CCCD/CMND',
                                        })}
                                        error={!!errors.idCard}
                                        helperText={
                                            errors.idCard &&
                                            errors.idCard.message
                                        }
                                        onChange={(e) =>
                                            setIdCard(e.target.value)
                                        }
                                    />
                                </Stack>
                                <div className="edit-profile-btn">
                                    <Button
                                        variant="outlined"
                                        color="success"
                                        type="submit"
                                    >
                                        <DoneIcon />
                                        Lưu
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        color="error"
                                        onClick={handleCancel}
                                    >
                                        <ClearIcon />
                                        Hủy bỏ
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </Grid>
                </Grid>
                <Dialog
                    open={openCancel}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle>
                        Bạn có chắc muốn hủy bỏ chỉnh sửa không?
                    </DialogTitle>
                    <DialogActions>
                        <Button color="error" onClick={handleCancelCan}>
                            Từ chối
                        </Button>
                        <Button color="success" onClick={handleCancelSuc}>
                            Đồng ý
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
            <Box flexGrow={1} className="footer-style">
                <FooterComponent />
            </Box>
        </>
    );
};

export default EditUserProfile;

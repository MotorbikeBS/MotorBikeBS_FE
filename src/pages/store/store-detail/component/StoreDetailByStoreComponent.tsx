import { Report } from '@mui/icons-material';
import {
    Avatar,
    Box,
    Button,
    Container,
    Grid,
    Rating,
    Typography,
} from '@mui/material';
import React, { useEffect } from 'react';
import {
    useAppDispatch,
    useAppSelector,
} from '../../../../services/store/store';
import { getUserByID } from '../../../../services/features/user/userSlice';
import { format } from 'date-fns';
import '../style/style.scss';
import MotorbikeForStoreComponent from './MotorbikeForStoreComponent';
import CommentForStoreComponent from './CommentForStoreComponent';

const StoreDetailByStoreComponent = () => {
    const dispatch = useAppDispatch();
    const { account } = useAppSelector((state) => state.account);
    const { user } = useAppSelector((state) => state.users);

    useEffect(() => {
        dispatch(getUserByID({ id: Number(account?.userId) }));
    }, [dispatch, account]);

    return (
        <Box className="store-detail-container">
            <Box className="store-detail-header">
                <Grid container spacing={2}>
                    <Grid xs={6} md={4}>
                        <div className="store-info-header">
                            <Avatar
                                sx={{
                                    width: 60,
                                    height: 60,
                                    bgcolor: 'orange',
                                }}
                            >
                                Hi
                            </Avatar>
                            <div>
                                <Typography variant="h5">
                                    {user?.storeDesciptions[0]?.storeName}
                                </Typography>
                                <Typography>
                                    Ngày tham gia:{' '}
                                    <strong>
                                        {user?.storeDesciptions[0]
                                            ?.storeCreatedAt &&
                                            format(
                                                new Date(
                                                    user?.storeDesciptions[0]?.storeCreatedAt,
                                                ),
                                                'dd-MM-yyyy HH:mm',
                                            )}
                                    </strong>
                                </Typography>
                            </div>
                        </div>
                    </Grid>
                    <Grid xs={6} md={4}>
                        <Box>
                            <div className="store-info">
                                <Typography className="store-info-txt">
                                    <strong>Email : </strong>
                                    {user?.storeDesciptions[0]?.storeEmail}
                                </Typography>
                            </div>
                            <div className="store-info">
                                <Typography className="store-info-txt">
                                    <strong>Điện thoại: </strong>
                                    {user?.storeDesciptions[0]?.storePhone}
                                </Typography>
                            </div>
                            <div className="store-info">
                                <Typography className="store-info-txt">
                                    <strong>Địa chỉ:</strong>
                                    {user?.storeDesciptions[0]?.address}
                                </Typography>
                            </div>
                        </Box>
                    </Grid>
                    <Grid xs={6} md={4}>
                        <div className="btn-action-container">
                            <Button variant="text" color="error">
                                <Report
                                    sx={{
                                        fontSize: '35px',
                                    }}
                                />
                            </Button>
                            <Button>
                                <Rating
                                    name="read-only"
                                    defaultValue={4}
                                    precision={0.5}
                                    readOnly
                                />
                            </Button>
                        </div>
                    </Grid>
                </Grid>
            </Box>

            <hr />

            <Box>
                <MotorbikeForStoreComponent />
            </Box>

            <Container maxWidth="lg">
                <CommentForStoreComponent />
            </Container>
        </Box>
    );
};

export default StoreDetailByStoreComponent;

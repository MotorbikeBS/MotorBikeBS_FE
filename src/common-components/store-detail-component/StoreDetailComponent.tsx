import React from 'react';
import { Avatar, Box, Button, Grid, Typography } from '@mui/material';
import './style/style.scss';
import MotorbikeComponent from '../../pages/customer/motorbike-component/MotorbikeComponent';
import { useAppSelector } from '../../services/store/store';

const StoreDetailComponent = () => {
    const { account } = useAppSelector(state => state.account);
    return (
        <Box className="store-detail-container">
            <Box className="store-detail-header">
                <Grid container spacing={2}>
                    <Grid xs={4} md={4}>
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
                                    Vũ Phụng Hoàng
                                </Typography>
                                <Typography>
                                    Ngày tham gia: <strong>05/08/2023</strong>
                                </Typography>
                            </div>
                        </div>
                    </Grid>
                    <Grid xs={5} md={4}>
                        <div className="store-info">
                            <Typography className="store-info-txt">
                                <strong>Email : </strong>
                                vuphuonghoangxe@gmail.com
                            </Typography>
                        </div>
                        <div className="store-info">
                            <Typography className="store-info-txt">
                                <strong>Điện thoại: </strong>
                                0909170111
                            </Typography>
                        </div>
                        <div className="store-info">
                            <Typography className="store-info-txt">
                                <strong>Địa chỉ:</strong> Quận 8, Thành phố Hồ
                                Chí Minh
                            </Typography>
                        </div>
                    </Grid>
                    {account?.roleId === 3 && (
                        <Grid xs={3} md={4}>
                            <div className="sell-btn-container">
                                <Button variant="outlined">
                                    Đặt lịch bán xe
                                </Button>
                            </div>
                        </Grid>
                    )}
                </Grid>
            </Box>

            <hr />

            <Box>
                <MotorbikeComponent />
            </Box>
        </Box>
    );
};

export default StoreDetailComponent;

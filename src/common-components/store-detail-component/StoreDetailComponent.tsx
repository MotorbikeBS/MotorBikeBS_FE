import React from 'react';
import { Avatar, Box, Container, Grid, Paper, Typography } from '@mui/material';
import './style/style.scss';
import { useAppSelector } from '../../services/store/store';
import { useParams } from 'react-router-dom';
import { IStore } from '../../models/Store/Store';
import MotorbikeByStoreIdComponent from './MotorBikeByStoreIDComponent';

type storeParams = {
    storeId: number
}

const StoreDetailComponent = () => {
    const { storeId } = useParams<storeParams | any >();
    // const { account } = useAppSelector(state => state.account);
    const { stores } = useAppSelector((state) => state.store)

    if (!storeId) {
        return (
            <Container>
                <Paper elevation={3} sx={{ padding: 2 }}>
                    Cửa hàng không tồn tại
                </Paper>
            </Container>
        );
    }

    if (!storeId) {
        return (
            <Container>
                <Paper elevation={3} sx={{ padding: 2 }}>
                    Đợi tí......
                </Paper>
            </Container>
        );
    }

    const store = stores?.find(
        (st: IStore) => st.storeId === Number(storeId)
    )

    if (!storeId) {
        return (
            <Container>
                <Paper elevation={3} sx={{ padding: 2 }}>
                    Cửa hàng không tồn tại
                </Paper>
            </Container>
        );
    }

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
                                    {store?.storeName}
                                </Typography>
                                <Typography>
                                    Ngày tham gia: <strong>{store?.storeCreatedAt.toLocaleString()}</strong>
                                </Typography>
                            </div>
                        </div>
                    </Grid>
                    <Grid xs={5} md={4}>
                        <div className="store-info">
                            <Typography className="store-info-txt">
                                <strong>Email : </strong>
                                {store?.storeEmail}
                            </Typography>
                        </div>
                        <div className="store-info">
                            <Typography className="store-info-txt">
                                <strong>Điện thoại: </strong>
                                {store?.storePhone}
                            </Typography>
                        </div>
                        <div className="store-info">
                            <Typography className="store-info-txt">
                                <strong>Địa chỉ:</strong>
                                {store?.address}
                            </Typography>
                        </div>
                    </Grid>
                </Grid>
            </Box>

            <hr />

            <Box>
                <MotorbikeByStoreIdComponent />
            </Box>
        </Box>
    );
};

export default StoreDetailComponent;

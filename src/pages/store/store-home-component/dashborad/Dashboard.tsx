import React from 'react';
import { Box, Grid, Paper, Typography } from '@mui/material';
import './style/style.scss';
import useFormatCurrency from '../../../../hooks/useFormatCurrency';
import RevenueChart from './chart/RevenueChart';
import { useAppSelector } from '../../../../services/store/store';
import DashboardPayment from './chart/payment-chart/DashboardPayment';

const Dashboard = () => {
    const formatCurrency = useFormatCurrency();
    const { revenue } = useAppSelector((state) => state.bill);

    return (
        <>
            <Box
                sx={{
                    marginX: 14,
                    marginY: 4,
                }}
            >
                <Grid container spacing={3}>
                    <Grid item sm={6} md={4} xs={12}>
                        <Paper elevation={3} className="paper-total-revenue">
                            <Typography variant="h5">Tổng doanh thu của cửa hàng</Typography>
                            <Typography variant="h4">
                                {formatCurrency(
                                    Number(revenue && revenue?.total?.income),
                                )}
                            </Typography>
                        </Paper>
                        <Paper elevation={3} className="paper-total-revenue">
                            <Typography variant="h5">Tổng tiền thanh toán cho chủ xe </Typography>
                            <Typography variant="h4">
                                {formatCurrency(
                                    Number(revenue && revenue?.total?.expense),
                                )}
                            </Typography>
                        </Paper>
                    </Grid>
                    <Grid item md={8} xs={12} sm={6}>
                        <Paper elevation={3} className="paper-chart">
                            <RevenueChart />
                        </Paper>
                    </Grid>
                </Grid>
            </Box>
            <DashboardPayment />
        </>
    );
};

export default Dashboard;

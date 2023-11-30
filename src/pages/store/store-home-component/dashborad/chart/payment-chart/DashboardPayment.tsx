import { Box, Grid, Paper, Typography } from '@mui/material'
import React from 'react'
import { useAppSelector } from '../../../../../../services/store/store'
import useFormatCurrency from '../../../../../../hooks/useFormatCurrency'
import PaymentStatisticChartComponent from './PaymentStatisticChartComponent'

const DashboardPayment = () => {
    const { paymentStatistic } = useAppSelector((state) => state.store)
    const formatCurrency = useFormatCurrency();

    return (
        <Box
            sx={{
                marginX: 14,
                marginY: 4,
            }}
        >
            <Grid container spacing={3}>
                <Grid item sm={6} md={4} xs={12}>
                    <Paper elevation={3} className="paper-total-revenue">
                        <Typography variant="h5">Tổng số tiền đã nạp</Typography>
                        <Typography variant="h4">
                            {formatCurrency(
                                Number(paymentStatistic && paymentStatistic?.total),
                            )}
                        </Typography>
                    </Paper>
                </Grid>
                <Grid item md={8} xs={12} sm={6}>
                    <Paper elevation={3} className="paper-chart">
                        <PaymentStatisticChartComponent />
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    )
}

export default DashboardPayment
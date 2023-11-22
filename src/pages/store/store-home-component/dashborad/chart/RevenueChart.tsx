import React, { useEffect } from 'react';
import {
    BarElement,
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    Tooltip,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import {
    useAppDispatch,
    useAppSelector,
} from '../../../../../services/store/store';
import {
    clearRevenue,
    getRevenue,
} from '../../../../../services/features/bill/billSlice';
import { Box, Select, TextField, Typography } from '@mui/material';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const RevenueChart = () => {
    const dispatch = useAppDispatch();
    const { revenue } = useAppSelector((state) => state.bill);

    useEffect(() => {
        dispatch(clearRevenue());
        dispatch(
            getRevenue({
                startDate: '01/01/2023',
                endDate: '12/01/2023',
                // startDate: new Date(2023, 0, 1), 
                // endDate: new Date(2023, 11, 1),
                incomeType: 'Month',
            }),
        );
    }, [dispatch]);

    const data = {
        labels:
            (revenue && revenue?.bills.map((bill) => bill?.incomeTime)) || [],
        datasets: [
            {
                label: 'Chi tiêu',
                data:
                    (revenue && revenue?.bills.map((bill) => bill?.expense)) ||
                    [],
                backgroundColor: 'red',
                boderColor: 'black',
                boderWidth: 1,
            },
            {
                label: 'Doanh thu',
                data:
                    (revenue && revenue?.bills.map((bill) => bill?.income)) ||
                    [],
                backgroundColor: 'green',
                boderColor: 'black',
                boderWidth: 1,
            },
        ],
    };

    return (
        <div>
            <Typography sx={{ textAlign: 'center' }} variant="h5">
                Biểu đồ theo {revenue?.incomeType === 'Month' ? 'Tháng' : 'Năm'}
            </Typography>
            <Box
                sx={{
                    display: 'flex',
                }}
            >
                <TextField />
                <TextField />
                <Select></Select>
            </Box>
            <Bar
                style={{
                    padding: '20px',
                    width: '80%',
                }}
                data={data}
            />
        </div>
    );
};

export default RevenueChart;

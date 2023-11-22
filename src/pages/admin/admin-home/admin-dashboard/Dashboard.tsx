import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../services/store/store';
import { clearRevenue, getRevenueStatisticAdmin } from '../../../../services/features/admin/adminSlice';
import { Box, Container, Grid, InputLabel, MenuItem, Paper, Select, SelectChangeEvent, Stack, Typography } from '@mui/material';
import { Bar } from 'react-chartjs-2';
import './style/_style.scss'
import useFormatCurrency from '../../../../hooks/useFormatCurrency';
import { Controller, useForm } from 'react-hook-form';

interface ISelectYearField {
    year: number
}

const Dashboard = () => {
    const dispatch = useAppDispatch();
    const { revenue } = useAppSelector((state) => state.revenueAdmin);
    const [year, setYear] = React.useState<number>(2023)

    const handleChangeYear = (event: SelectChangeEvent<number>) => {
        // setYear(event.target.value as number)
        const selectedyear = event.target.value as number
        setYear(selectedyear)

        dispatch(clearRevenue())
        dispatch(getRevenueStatisticAdmin({
            year: selectedyear
        }))
        console.log(year)
    }

    const form = useForm<ISelectYearField>({
        defaultValues: {
            year: 2023
        }
    })
    const { control, handleSubmit, setValue } = form

    React.useEffect(() => {
        setValue('year', year);
    }, [year, setValue])

    // useEffect(() => {
    //     dispatch(clearRevenue());
    //     dispatch(getRevenueStatisticAdmin({
    //         year: 2023
    //     }));
    // }, [dispatch]);
    const monthNames = [
        'Tháng 1',
        'Tháng 2',
        'Tháng 3',
        'Tháng 4',
        'Tháng 5',
        'Tháng 6',
        'Tháng 7',
        'Tháng 8',
        'Tháng 9',
        'Tháng 10',
        'Tháng 11',
        'Tháng 12'
    ];
    const chartLabels = Object.keys(revenue || [])
        .filter(key => key.startsWith('month'))
        .map(key => {
            const monthIndex = parseInt(key.replace('month', ''));
            return monthNames[monthIndex - 1];
        }); const chartData = Object.values(revenue || []).filter(value => typeof value === 'number')

    // const chartTotal = Object.values(revenue?.total || []).filter(value => typeof value === 'number')

    const data = {
        labels: chartLabels,
        datasets: [
            {
                data: chartData,
                label: 'Tháng',
                backgroundColor: 'rgba(109, 247, 94, 3)',
                borderColor: 'rgba(109, 247, 94, 2)',
                borderWidth: 2,
            },
        ],
    };
    const formatCurrency = useFormatCurrency()

    return (
        <Container maxWidth='lg'>
            <Grid className='chart-bar'>
                <div className='chart-bar-title'>
                    <Typography
                        textAlign='center'
                        fontWeight='700'
                        fontFamily='serif'
                        fontSize='2rem'
                    >
                        Doanh thu
                    </Typography>
                </div>
                <div className='year-bar'>
                    <div className='chart-bar-revenue'>
                        <Paper>
                            <Typography
                                fontSize='1rem'
                                fontWeight='700'
                            >
                                Tổng doanh thu trong năm: {year} (01/{year} - 12/{year})
                            </Typography>
                            <Typography
                                fontSize='2rem'
                                fontWeight='700'
                            >
                                {revenue?.total !== undefined ? formatCurrency(revenue.total) : 'Chưa có thông tin'}
                            </Typography>
                        </Paper>

                    </div>
                    <div className='paper-form-year'>
                        <Paper>
                            <form noValidate>
                                <Controller
                                    control={control}
                                    name="year"

                                    render={({ field }) => (
                                        <>
                                            <Select
                                                {...field}
                                                label="Level"
                                                onChange={handleChangeYear}
                                                value={year}
                                                defaultValue={2023}
                                                fullWidth
                                            >
                                                <MenuItem value={2021}>Năm 2021</MenuItem>
                                                <MenuItem value={2022}>Năm 2022</MenuItem>
                                                <MenuItem value={2023}>Năm 2023</MenuItem>
                                                <MenuItem value={2024}>Năm 2024</MenuItem>
                                                <MenuItem value={2025}>Năm 2025</MenuItem>

                                            </Select>
                                        </>
                                    )}
                                />
                            </form>
                        </Paper>
                    </div>
                </div>
                <div>
                    <Bar
                        style={{
                            padding: '20px',
                            width: '100%',
                        }}
                        data={data}
                    />
                </div>
            </Grid>

        </Container>
    );
};

export default Dashboard;

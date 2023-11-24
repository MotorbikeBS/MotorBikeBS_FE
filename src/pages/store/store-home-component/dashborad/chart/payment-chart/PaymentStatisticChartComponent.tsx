import React from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useAppDispatch, useAppSelector } from '../../../../../../services/store/store';
import { Container, Grid, MenuItem, Paper, Select, SelectChangeEvent, Typography } from '@mui/material';
import { clearStore, getPaymentStatisticStore } from '../../../../../../services/features/store/storeSlice';
import { Controller, useForm } from 'react-hook-form';
import { Bar } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);
type ISelectYearField = {
    year: number
}

const PaymentStatisticChartComponent = () => {
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

    const dispatch = useAppDispatch()
    const { paymentStatistic } = useAppSelector((state) => state.store)
    const [year, setYear] = React.useState<number>(2023)

    const handleChangeYear = (event: SelectChangeEvent<number>) => {
        const selectedyear = event.target.value as number
        setYear(selectedyear)

        dispatch(clearStore())
        dispatch(getPaymentStatisticStore({
            year: selectedyear
        }))
    }
    React.useEffect(() => {
        dispatch(getPaymentStatisticStore({ year: year }));
    }, [dispatch]);
    const form = useForm<ISelectYearField>({
        defaultValues: {
            year: 2023
        }
    })
    const { control, setValue } = form

    React.useEffect(() => {
        setValue('year', year);
    }, [year, setValue])

    const chartLabels = Object.keys(paymentStatistic || [])
        .filter(key => key.startsWith('month'))
        .map(key => {
            const monthIndex = parseInt(key.replace('month', ''));
            return monthNames[monthIndex - 1];
        }); const chartData = Object.values(paymentStatistic || []).filter(value => typeof value === 'number')
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
                        Thống kê số tiền đã nạp
                    </Typography>
                </div>
                <div className='year-bar'>
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
}

export default PaymentStatisticChartComponent
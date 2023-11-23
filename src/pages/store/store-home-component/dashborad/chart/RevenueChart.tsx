import React, { useCallback, useEffect, useState } from 'react';
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
import {
    Box,
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    TextField,
    Typography,
} from '@mui/material';
import { format } from 'date-fns';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const RevenueChart = () => {
    const dispatch = useAppDispatch();
    const { revenue } = useAppSelector((state) => state.bill);

    const [startDateInput, setStartDateInput] = useState<Date>(
        new Date('01/02/2023'),
    );
    const [endDateInput, setEndDateInput] = useState<Date>(new Date());
    const [incomeTypeSelect, setIncomeTypeSelect] = useState<string>('Month');

    const handleChangeIncomeTypeSelect = (event: SelectChangeEvent) => {
        setIncomeTypeSelect(event.target.value);
    };

    const currentDate = new Date().toISOString().split('T')[0];
    const pastDate = new Date('01/02/2022').toISOString().split('T')[0];

    useEffect(() => {
        dispatch(clearRevenue());
        handleSubmit();
    }, [dispatch]);

    const handleSubmit = useCallback(() => {
        dispatch(
            getRevenue({
                startDate: format(new Date(startDateInput), 'MM/dd/yyyy'),
                endDate: format(new Date(endDateInput), 'MM/dd/yyyy'),
                incomeType: incomeTypeSelect,
            }),
        );
    }, [dispatch, startDateInput, endDateInput, incomeTypeSelect]);

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
                    margin: 2,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                }}
            >
                <TextField
                    type="date"
                    value={
                        startDateInput
                            ? startDateInput.toISOString().split('T')[0]
                            : ''
                    }
                    onChange={(e) =>
                        setStartDateInput(new Date(e.target.value))
                    }
                    InputLabelProps={{
                        shrink: true,
                    }}
                    inputProps={{
                        min: pastDate,
                        max: currentDate,
                    }}
                />
                <TextField
                    type="date"
                    value={
                        endDateInput
                            ? endDateInput.toISOString().split('T')[0]
                            : ''
                    }
                    onChange={(e) => setEndDateInput(new Date(e.target.value))}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    inputProps={{
                        max: currentDate,
                    }}
                />
                <FormControl sx={{ width: '40%' }}>
                    <InputLabel id="incomeType">Loại thu nhập</InputLabel>
                    <Select
                        labelId="incomeType"
                        value={incomeTypeSelect}
                        label="Loại thu nhập"
                        onChange={handleChangeIncomeTypeSelect}
                    >
                        <MenuItem value="Month">Month</MenuItem>
                        <MenuItem value="Year">Year</MenuItem>
                    </Select>
                </FormControl>
                <Button variant="outlined" onClick={handleSubmit}>
                    Áp dụng
                </Button>
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

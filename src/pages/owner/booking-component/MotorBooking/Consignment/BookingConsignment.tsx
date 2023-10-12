import { Box, Tab, Tabs } from '@mui/material'
import React, { useState } from 'react'
import PendingBooking from './BookingStatus/PendingBooking'
import ApproveBooking from './BookingStatus/ApproveBooking'
import CanncleBooking from './BookingStatus/CanncleBooking'

const BookingConsignment = () => {
    const [value, setValue] = useState<number>(0)

    const handleChangeTabs = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Box>
            <Tabs
                value={value}
                onChange={handleChangeTabs}
                indicatorColor='secondary'
                sx={{
                    ".Mui-selected": {
                        color: `orange`,
                    },
                }}
                centered
            >
                <Tab label='Chờ Duyệt' />
                <Tab label='Chấp nhận' />
                <Tab label='Từ Chối' />
            </Tabs>
            <Box flexGrow={4} marginTop='3rem'>
                {value === 0 && <PendingBooking />}
                {value === 1 && <ApproveBooking />}
                {value === 2 && <CanncleBooking />}
            </Box>
        </Box>
    );
}

export default BookingConsignment;
import { Box, Tab, Tabs } from '@mui/material'
import React, { useState } from 'react'
import PendingBooking from './booking-status/PendingBooking'
import AcceptBooking from './booking-status/AcceptBooking'
import RejectBooking from './booking-status/RejectBooking'

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
                {value === 1 && <AcceptBooking />}
                {value === 2 && <RejectBooking />}
            </Box>
        </Box>
    );
}

export default BookingConsignment;

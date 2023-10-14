import { Box, Tab, Tabs } from '@mui/material';
import React, { useState } from 'react'
import PendingBooking from '../consignment/booking-status/PendingBooking';
import ApproveBooking from '../consignment/booking-status/AcceptBooking';
import CanncleBooking from '../consignment/booking-status/RejectBooking';
import PendingBookingEarnLiving from './booking-earnliving-status/PendingBookingEarnLiving';
import AcceptBookingEarnLiving from './booking-earnliving-status/AcceptBookingEarnLiving';
import RejectBookingEarnLiving from './booking-earnliving-status/RejectBookingEarnLiving';

const BookingEarnLiving = () => {
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
                {value === 0 && <PendingBookingEarnLiving />}
                {value === 1 && <AcceptBookingEarnLiving />}
                {value === 2 && <RejectBookingEarnLiving />}
            </Box>
        </Box>
    );
}


export default BookingEarnLiving
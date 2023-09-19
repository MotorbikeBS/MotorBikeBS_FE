import React from 'react';
import { Box } from '@mui/material';
import CustomerMenuComponent from '../customer-menu-component/CustomerMenuComponent';
import FooterComponent from '../../../common-components/footer-component/FooterComponent';
import DateBookingComponent from './component/DateBookingComponent';



const DateBooking = () => {
    return (
        <>
            <CustomerMenuComponent />
            <Box></Box>
            <DateBookingComponent />
            <Box flexGrow={1} className="footer-style">
                <FooterComponent />
            </Box>
        </>
    );
};

export default DateBooking;

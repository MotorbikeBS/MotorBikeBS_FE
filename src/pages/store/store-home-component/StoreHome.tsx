import React from 'react';
import { Box } from '@mui/material';
import StoreMenuComponent from '../store-menu-component/StoreMenuComponent';
import FooterComponent from '../../../common-components/footer-component/FooterComponent';
import Dashboard from './dashborad/Dashboard';

const StoreHome = () => {
    return (
        <Box display="flex" flexDirection="column" height="100vh" width="100%">
            <StoreMenuComponent />

            <Box flexGrow={10}>
                <Dashboard />
            </Box>

            <Box flexGrow={1} className="footer-style">
                <FooterComponent />
            </Box>
        </Box>
    );
};

export default StoreHome;

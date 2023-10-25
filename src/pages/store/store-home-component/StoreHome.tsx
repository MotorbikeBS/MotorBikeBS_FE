import React from 'react';
import { Box, Typography } from '@mui/material';
import StoreMenuComponent from '../store-menu-component/StoreMenuComponent';
import FooterComponent from '../../../common-components/footer-component/FooterComponent';

const StoreHome = () => {
    return (
        <Box display="flex" flexDirection="column" height="100vh" width="100%">
            <StoreMenuComponent />

            <Box flexGrow={10} sx={{ background: 'yellow' }}>
                <Typography variant="h5">Store Home</Typography>
            </Box>

            <Box flexGrow={1} className="footer-style">
                <FooterComponent />
            </Box>
        </Box>
    );
};

export default StoreHome;

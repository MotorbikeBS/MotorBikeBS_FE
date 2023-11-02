import { Box } from '@mui/material';
import React from 'react'
import StoreMenuComponent from '../store-menu-component/StoreMenuComponent';
import FooterComponent from '../../../common-components/footer-component/FooterComponent';
import MotorbikeSoldComponent from './component/MotorbikeSoldComponent';

const MotorbikeSold = () => {
    return (
        <Box display="flex" flexDirection="column" height="100vh" width="100%">
            <Box flexGrow={1} zIndex={2}>
                <StoreMenuComponent />
            </Box>
            <Box flexGrow={10}>
                {/* <StoreMotorListComponent /> */}
                <MotorbikeSoldComponent />
            </Box>

            <Box flexGrow={1} className="footer-style">
                <FooterComponent />
            </Box>
        </Box>
    );
}

export default MotorbikeSold

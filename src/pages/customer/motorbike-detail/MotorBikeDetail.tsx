import React from 'react';

import MotorBikeDetailComponent from '../../../common-components/motorbike-detail-component/MotorbikeDetailComponent';
import CustomerMenuComponent from '../customer-menu-component/CustomerMenuComponent';
import { Box } from '@mui/material';
import FooterComponent from '../../../common-components/footer-component/FooterComponent';



const MotorBikeDetail = () => {
    return (
        <Box display="flex" flexDirection="column" height="100vh" width="100%">
            <Box flexGrow={1}>
                <CustomerMenuComponent />
            </Box>
            <Box flexGrow={9}>
                <MotorBikeDetailComponent />
            </Box>
            <Box flexGrow={1} className="footer-style">
                <FooterComponent />
            </Box>
        </Box>
    );
};

export default MotorBikeDetail;

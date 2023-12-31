import React from 'react';
import { Box } from '@mui/material';
import CustomerMenuComponent from '../../customer-menu-component/CustomerMenuComponent';
import FooterComponent from '../../../../common-components/footer-component/FooterComponent';
import BuyHistoryComponent from './component/BuyHistoryComponent';

const BuyHistory = () => {

    return (
        <>
            <Box display="flex" flexDirection="column" height="100vh" width="100%">
                <Box flexGrow={1} zIndex={2}>
                    <CustomerMenuComponent />
                </Box>

                <Box flexGrow={9}>
                    <BuyHistoryComponent />
                </Box>

                <Box flexGrow={1} className="footer-style">
                    <FooterComponent />
                </Box>
            </Box>
        </>
    );
};

export default BuyHistory;

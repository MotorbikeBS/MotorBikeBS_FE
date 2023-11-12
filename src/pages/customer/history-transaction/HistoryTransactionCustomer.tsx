import { Box } from '@mui/material';
import React from 'react';
import HistoryTransactionComponent from './component/HistoryTransactionComponent';
import CustomerMenuComponent from '../customer-menu-component/CustomerMenuComponent';
import FooterComponent from '../../../common-components/footer-component/FooterComponent';

const HistoryTransactionCustomer = () => {
    return (
        <>
            <Box display="flex" flexDirection="column" height="100vh" width="100%">
                <Box flexGrow={1} zIndex={2}>
                    <CustomerMenuComponent />
                </Box>

                <Box flexGrow={9}>
                    <HistoryTransactionComponent />
                </Box>

                <Box flexGrow={1} className="footer-style">
                    <FooterComponent />
                </Box>
            </Box>
        </>
    );
};

export default HistoryTransactionCustomer;

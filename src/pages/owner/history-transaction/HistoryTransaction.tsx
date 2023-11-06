import React from 'react';
import { Box } from '@mui/material';
import OwnerMenuComponent from '../owner-menu-component/OwnerMenuComponent';
import FooterComponent from '../../../common-components/footer-component/FooterComponent';
import HistoryTransactionComponent from './component/HistoryTransactionComponent';

const HistoryTransaction = () => {
    return (
        <Box display="flex" flexDirection="column" height="100vh" width="100%">
            <Box flexGrow={1} zIndex={2}>
                <OwnerMenuComponent />
            </Box>
            <Box flexGrow={10}>
                <HistoryTransactionComponent />
            </Box>

            <Box flexGrow={1} className="footer-style">
                <FooterComponent />
            </Box>
        </Box>
    );
};

export default HistoryTransaction;

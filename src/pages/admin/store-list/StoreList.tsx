import React from 'react';
import AdminMenuComponent from '../admin-menu-component/AdminMenuComponent';
import { Box } from '@mui/material';
import FooterComponent from '../../../common-components/footer-component/FooterComponent';
import StoreListNotVerify from './store-list-component/StoreListNotVerify';
import StoreListActive from './store-list-component/StoreListActive';

const StoreListAdmin = () => {
    return (
        <>
            <Box
                display="flex"
                flexDirection="column"
                height="100vh"
                width="100%"
            >
                <Box flexGrow={1} >
                    <AdminMenuComponent />
                </Box>
                <Box flexGrow={12}>
                    <Box flexGrow={6}>
                        <StoreListNotVerify />
                    </Box>
                    <Box flexGrow={6}>
                        <StoreListActive />
                    </Box>
                </Box>
                <Box flexGrow={1} className="footer-style">
                    <FooterComponent />
                </Box>
            </Box>
        </>
    );
};

export default StoreListAdmin;

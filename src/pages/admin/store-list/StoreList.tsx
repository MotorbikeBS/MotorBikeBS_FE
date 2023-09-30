import React from 'react';
import AdminMenuComponent from '../admin-menu-component/AdminMenuComponent';
import { Box } from '@mui/material';
import FooterComponent from '../../../common-components/footer-component/FooterComponent';
import StoreListComponent from './store-list-component/StoreListComponent';

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
                    <StoreListAdmin />
                </Box>
                <Box flexGrow={1} className="footer-style">
                    <FooterComponent />
                </Box>
            </Box>
        </>
    );
};

export default StoreListAdmin;

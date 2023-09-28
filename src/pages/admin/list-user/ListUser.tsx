import React from 'react';
import AdminMenuComponent from '../admin-menu-component/AdminMenuComponent';
import { Box } from '@mui/material';
import FooterComponent from '../../../common-components/footer-component/FooterComponent';
import ListUserComponent from './component/ListUserComponent';

const ListUser = () => {
    return (
        <>
            <Box
                display="flex"
                flexDirection="column"
                height="100vh"
                width="100%"
            >
                <Box flexGrow={1} zIndex={2}>
                    <AdminMenuComponent />
                </Box>

                    <ListUserComponent />
                <Box flexGrow={1} className="footer-style">
                    <FooterComponent />
                </Box>
            </Box>
        </>
    );
};

export default ListUser;

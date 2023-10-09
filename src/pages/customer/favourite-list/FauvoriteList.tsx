import React from 'react';
import CustomerMenuComponent from '../customer-menu-component/CustomerMenuComponent';
import { Box } from '@mui/material';
import FooterComponent from '../../../common-components/footer-component/FooterComponent';
import MotobikeFavouriteList from './motobike-favourite-list/MotobikeFavouriteList';

const FauvoriteList = () => {
    return (
        <Box
            display="flex"
            flexDirection="column"
            height="100vh"
            width="100%"
        >
            <Box flexGrow={1}>
                <CustomerMenuComponent />
            </Box>

            <Box flexGrow={10} >
                <MotobikeFavouriteList />
            </Box>

            <Box flexGrow={1} className="footer-style">
                <FooterComponent />
            </Box>
        </Box>
    );
};

export default FauvoriteList;

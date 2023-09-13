import React from 'react';
import CustomerMenuComponent from '../customer-menu-component/CustomerMenuComponent';
import { Box } from '@mui/material';
import FooterComponent from '../../../common-components/footer-component/FooterComponent';
import MotobikeFavouriteList from './motobike-favourite-list/MotobikeFavouriteList';

const FauvoriteList = () => {
    return (
        <>
            <CustomerMenuComponent />

            <MotobikeFavouriteList />

            <Box flexGrow={1} className="footer-style">
                <FooterComponent />
            </Box>
        </>
    );
};

export default FauvoriteList;

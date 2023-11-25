import React, { useEffect } from 'react';
import OwnerMenuComponent from '../owner-menu-component/OwnerMenuComponent';
import BannerComponent from '../../../common-components/banner-component/BannerComponent';
import StoreListComponent from '../../customer/store-list/StoreListComponent';
import FooterComponent from '../../../common-components/footer-component/FooterComponent';
import { Box } from '@mui/material';
import { useAppDispatch } from '../../../services/store/store';
import { returnMotorbike } from '../../../services/features/motorbike/motorbikeSlice';

const OwnerHome = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(returnMotorbike());
    }, [dispatch]);
    return (
        <Box display="flex" flexDirection="column" height="100vh" width="100%">
            {/* <Box flexGrow={1} zIndex={1}> */}
            <OwnerMenuComponent />
            {/* </Box> */}
            <Box flexGrow={1} zIndex={1}>
                <BannerComponent />
            </Box>
            <Box flexGrow={9}>
                <StoreListComponent />
            </Box>

            <Box flexGrow={1} className="footer-style">
                <FooterComponent />
            </Box>
        </Box>
    );
};

export default OwnerHome;

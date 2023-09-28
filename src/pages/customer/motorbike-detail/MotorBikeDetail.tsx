import React from 'react';

import MotorBikeDetailComponent from '../../../common-components/motorbike-detail-component/MotorbikeDetailComponent';
import CustomerMenuComponent from '../customer-menu-component/CustomerMenuComponent';
import { Box } from '@mui/material';
import FooterComponent from '../../../common-components/footer-component/FooterComponent';
import OwnerMenuComponent from '../../owner/owner-menu-component/OwnerMenuComponent';
import { useAppSelector } from '../../../services/store/store';



const MotorBikeDetail = () => {
    const { user } = useAppSelector(state => state.account)
    return (
        <Box display="flex" flexDirection="column" height="100vh" width="100%">
            <Box flexGrow={1}>
                {user?.roleId === 4 &&(

                <CustomerMenuComponent />
                )}
                 {user?.roleId === 3 &&(

<OwnerMenuComponent />
)}
                
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

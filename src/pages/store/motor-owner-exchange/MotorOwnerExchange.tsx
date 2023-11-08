import { Box, Tab, Tabs } from '@mui/material';
import React, { useState } from 'react';
import StoreMenuComponent from '../store-menu-component/StoreMenuComponent';
import ConsignmentMotorOwnerExchangeComponent from './component/ConsignmentMotorOwnerExchangeComponent';
import FooterComponent from '../../../common-components/footer-component/FooterComponent';
import LivelihoodMotorOwnerExchangeComponent from './component/LivelihoodMotorOwnerExchangeComponent';
import ListNegotiationMotorByStore from '../list-motor-negotion/list-motor-negotiation-pending/ListNegotiationMotorByStore';
import ListMotorAcceptNegotiation from '../list-motor-negotion/list-motor-accept-negotiation/ListMotorAcceptNegotiation';


const MotorOwnerExchange = () => {
    const [value, setValue] = useState<number>(0);

    const handleChangeTabs = (
        event: React.ChangeEvent<{}>,
        newValue: number,
    ) => {
        setValue(newValue);
    };

    return (
        <Box display="flex" flexDirection="column" height="100vh" width="100%">
            <Box flexGrow={1} zIndex={2}>
                <StoreMenuComponent />
            </Box>
            <Box flexGrow={9}>
                <Tabs
                    value={value}
                    onChange={handleChangeTabs}
                    indicatorColor="secondary"
                    sx={{
                        '.Mui-selected': {
                            color: `orange`,
                        },
                    }}
                    centered
                >
                    <Tab label="Xe kí gởi" />
                    <Tab label="Xe không kí gởi" />
                    <Tab label="Xe đang thương lượng" />
                    <Tab label="Xe đã thương lượng" />
                </Tabs>
                <Box>
                    {value === 0 && <ConsignmentMotorOwnerExchangeComponent />}
                    {value === 1 && <LivelihoodMotorOwnerExchangeComponent />}
                    {value === 2 && <ListNegotiationMotorByStore />}
                    {value === 3 && <ListMotorAcceptNegotiation />}
                </Box>
            </Box>

            <Box flexGrow={1} className="footer-style">
                <FooterComponent />
            </Box>
        </Box >
    );
};

export default MotorOwnerExchange;

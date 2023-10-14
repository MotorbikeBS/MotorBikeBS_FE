import { Box, Tab, Tabs } from '@mui/material';
import React, { useState } from 'react';
import StoreMenuComponent from '../store-menu-component/StoreMenuComponent';
import ConsignmentMotorOwnerExchangeComponent from './component/ConsignmentMotorOwnerExchangeComponent';
import FooterComponent from '../../../common-components/footer-component/FooterComponent';
import LivelihoodMotorOwnerExchangeComponent from './component/LivelihoodMotorOwnerExchangeComponent';

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
            <Box flexGrow={9} marginTop="0.5rem" marginBottom="5%">
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
                </Tabs>
                <Box flexGrow={4} marginTop="3rem">
                    {value === 0 && <ConsignmentMotorOwnerExchangeComponent />}
                    {value === 1 && <LivelihoodMotorOwnerExchangeComponent />}
                </Box>
            </Box>

            <Box flexGrow={1} className="footer-style">
                <FooterComponent />
            </Box>
        </Box>
    );
};

export default MotorOwnerExchange;

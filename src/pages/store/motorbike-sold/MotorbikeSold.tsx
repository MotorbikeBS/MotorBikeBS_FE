import { Box, Tab, Tabs } from '@mui/material';
import React, { useState } from 'react'
import StoreMenuComponent from '../store-menu-component/StoreMenuComponent';
import FooterComponent from '../../../common-components/footer-component/FooterComponent';
import MotorbikeSoldComponent from './component/MotorbikeSoldComponent';
import MotorbikeSoldOwnerComponent from './component/MotorbikeSoldOwnerComponent';

const MotorbikeSold = () => {
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
            <Box flexGrow={10}>
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
                <Tab label="Hóa đơn Khách hàng" />
                <Tab label="Hóa đơn với chủ xe" />
            </Tabs>
            <Box flexGrow={4} marginTop="3rem">
                {value === 0 && (
                    <MotorbikeSoldComponent />
                )}
                {value === 1 && (
                    <MotorbikeSoldOwnerComponent />
                )}
            </Box>
            </Box>

            <Box flexGrow={1} className="footer-style">
                <FooterComponent />
            </Box>
        </Box>
    );
}

export default MotorbikeSold

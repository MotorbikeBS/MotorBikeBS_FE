import React, { useState } from 'react';
import AdminMenuComponent from '../admin-menu-component/AdminMenuComponent';
import { Box, Tab, Tabs } from '@mui/material';
import FooterComponent from '../../../common-components/footer-component/FooterComponent';
import MotorBrand from './component/MotorBrand';
import MotorModel from './component/MotorModel';
import MotorType from './component/MotorType';

const MotorFields = () => {
    const [value, setValue] = useState<number>(0);

    const handleChangeTabs = (
        event: React.ChangeEvent<{}>,
        newValue: number,
    ) => {
        setValue(newValue);
    };

    return (
        <>
            <Box
                display="flex"
                flexDirection="column"
                height="100vh"
                width="100%"
            >
                <Box flexGrow={1}>
                    <AdminMenuComponent />
                </Box>

                <Box flexGrow={9} marginTop="2%" marginBottom="5%">
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
                        <Tab label="Brand" />
                        <Tab label="Model" />
                        <Tab label="Type" />
                    </Tabs>
                    <Box flexGrow={4} marginTop="3rem">
                        {value === 0 && <MotorBrand />}
                        {value === 1 && <MotorModel />}
                        {value === 2 && <MotorType />}
                    </Box>
                </Box>

                <Box flexGrow={1} className="footer-style">
                    <FooterComponent />
                </Box>
            </Box>
        </>
    );
};

export default MotorFields;

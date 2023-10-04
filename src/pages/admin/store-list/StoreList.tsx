import React, { useState } from 'react';
import AdminMenuComponent from '../admin-menu-component/AdminMenuComponent';
import { Box, Tab, Tabs } from '@mui/material';
import FooterComponent from '../../../common-components/footer-component/FooterComponent';
import StoreListNotVerify from './store-list-component/StoreListNotVerify';
import StoreListActive from './store-list-component/StoreListActive';
import StoreListInActive from './store-list-component/StoreListInActive';

const StoreListAdmin: React.FC = () => {
    const [value, setValue] = useState<number>(0);

    const handleChangeTabs = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue)
    }

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
                <Box flexGrow={10} marginTop='4%' marginBottom='4%'>

                    <Tabs
                        value={value}
                        onChange={handleChangeTabs}
                        indicatorColor='secondary'
                        sx={{
                            ".Mui-selected": {
                                color: `orange`,
                            },
                        }}
                        centered
                    >
                        <Tab label="Chưa Xác Thực" />
                        <Tab label="Đã Xác Minh" />
                        <Tab label="Đang Bị Khóa" />
                    </Tabs>

                    <Box flexGrow={4}>
                        {value === 0 && <StoreListNotVerify />}
                        {value === 1 && <StoreListActive />}
                        {value === 2 && <StoreListInActive />}
                    </Box>


                </Box>
                <Box flexGrow={1} className="footer-style">
                    <FooterComponent />
                </Box>
            </Box>
        </>
    );
};

export default StoreListAdmin;

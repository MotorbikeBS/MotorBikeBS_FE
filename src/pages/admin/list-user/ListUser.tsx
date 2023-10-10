import React, { useState } from 'react';
import AdminMenuComponent from '../admin-menu-component/AdminMenuComponent';
import { Box, Tab, Tabs } from '@mui/material';
import FooterComponent from '../../../common-components/footer-component/FooterComponent';
import ListUserActive from './ListUserComponent/ListUserActive';
import ListUserInActive from './ListUserComponent/ListUserInActive';

const ListUser = () => {
    const [value, setValue] = useState<number>(0)

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
                <Box flexGrow={1}>
                    <AdminMenuComponent />
                </Box>

                <Box flexGrow={10} marginTop='5%' marginBottom='5%'>
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
                        <Tab label='Đang hoạt động' />
                        <Tab label='Không hoạt động' />
                    </Tabs>
                    <Box flexGrow={4} marginTop='3rem'>
                        {value === 0 && <ListUserActive />}
                        {value === 1 && <ListUserInActive />}

                    </Box>
                </Box>

                <Box flexGrow={1} className="footer-style">
                    <FooterComponent />
                </Box>
            </Box>
        </>
    );
};

export default ListUser;

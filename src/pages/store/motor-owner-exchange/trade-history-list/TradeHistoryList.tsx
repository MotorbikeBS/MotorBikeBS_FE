import { Box, Tab, Tabs } from '@mui/material'
import React, { useState } from 'react'
import StoreMenuComponent from '../../store-menu-component/StoreMenuComponent'
import TradeListWithOwner from './trade-with-owner/TradeListWithOwner'
import TradeListWithCustomer from './trade-with-customer/TradeListWithCustomer'
import FooterComponent from '../../../../common-components/footer-component/FooterComponent'

const TradeHistoryList = () => {
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
                    <StoreMenuComponent />
                </Box>
                <Box
                    flexGrow={10}
                    marginTop='0.5rem'
                    marginBottom='5%'
                >
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
                        <Tab label='Giao dịch với chủ xe' />
                        <Tab label='Giao dịch với khách mua' />
                    </Tabs>
                    <Box flexGrow={4} marginTop='3rem'>
                        {value === 0 && <TradeListWithOwner />}
                        {value === 1 && <TradeListWithCustomer />}
                    </Box>
                </Box>
                <Box flexGrow={1} className="footer-style">
                    <FooterComponent />
                </Box>
            </Box>
        </>
    )
}

export default TradeHistoryList
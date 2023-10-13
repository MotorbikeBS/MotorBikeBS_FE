import { Box, Tab, Tabs } from '@mui/material'
import React, { useState } from 'react'
import StoreMenuComponent from '../store-menu-component/StoreMenuComponent'
import OwnerBookingComponent from './owner-booking-component/OwnerBookingComponent'
import CustomerBookingComponent from './customer-booking-component/CustomerBookingComponent'
import FooterComponent from '../../../common-components/footer-component/FooterComponent'

const BookingListStore = () => {
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
                        <Tab label='Lịch Hẹn Với Chủ Xe' />
                        <Tab label='Lịch Hẹn Với Khách Mua' />
                    </Tabs>
                    <Box flexGrow={4} marginTop='3rem'>
                        {value === 0 && <OwnerBookingComponent />}
                        {value === 1 && <CustomerBookingComponent />}

                    </Box>
                </Box>
                <Box flexGrow={1} className="footer-style">
                    <FooterComponent />
                </Box>
            </Box>
        </>
    )
}

export default BookingListStore
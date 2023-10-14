import { Box, Tab, Tabs } from '@mui/material'
import React, { useState } from 'react'
import OwnerMenuComponent from '../owner-menu-component/OwnerMenuComponent'
import FooterComponent from '../../../common-components/footer-component/FooterComponent'
import BookingConsignment from './motor-booking/consignment/BookingConsignment'
import BookingEarnLiving from './motor-booking/earnLiving/BookingEarnLiving'

const BookingListOwner = () => {
    const [value, setValue] = useState<number>(0)

    const handleChangeTabs = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue)
    }
    return (
        <>
            <Box display="flex"
                flexDirection="column"
                height="100vh"
                width="100%">

                <Box flexGrow={1}>
                    <OwnerMenuComponent />
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
                        <Tab label='Xe Kí Gửi' />
                        <Tab label='Xe Không Kí Gửi' />
                    </Tabs>
                    <Box flexGrow={4} marginTop='3rem'>
                        {value === 0 && <BookingConsignment />}
                        {value === 1 && <BookingEarnLiving />}

                    </Box>
                </Box>

                <Box flexGrow={1} className="footer-style">
                    <FooterComponent />
                </Box>
            </Box>
        </>
    )
}

export default BookingListOwner
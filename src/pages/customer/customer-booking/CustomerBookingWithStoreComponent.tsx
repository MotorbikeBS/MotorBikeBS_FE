import { Box } from '@mui/material'
import React from 'react'
import CustomerMenuComponent from '../customer-menu-component/CustomerMenuComponent'
import FooterComponent from '../../../common-components/footer-component/FooterComponent'
import CustomerBookingStoreList from './customer-booking-list/CustomerBookingStoreList'

const CustomerBookingComponentWithStore = () => {
    return (
        <>
            <Box
                display='flex'
                flexDirection='column'
                height="100vh"
                width="100%"
            >
                <Box flexGrow={1}>
                    <CustomerMenuComponent />
                </Box>
                <Box
                    flexGrow={10}
                    marginTop='0.5rem'
                    marginBottom='5%'
                >
                    <CustomerBookingStoreList />
                </Box>
                <Box flexGrow={1} className="footer-style">
                    <FooterComponent />
                </Box>
            </Box>
        </>
    )
}

export default CustomerBookingComponentWithStore
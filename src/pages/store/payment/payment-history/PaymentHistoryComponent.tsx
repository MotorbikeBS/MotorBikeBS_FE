import { Box } from '@mui/material'
import React from 'react'
import FooterComponent from '../../../../common-components/footer-component/FooterComponent'
import StorePaymentHistory from './store-payment-history/StorePaymentHistory'
import StoreMenuComponent from '../../store-menu-component/StoreMenuComponent'

const PaymentHistoryComponent = () => {
    return (
        <Box display="flex" flexDirection="column" height="100vh" width="100%">
            <Box flexGrow={1} zIndex={2}>
                <StoreMenuComponent />
            </Box>
            <Box flexGrow={10}>
                <StorePaymentHistory />
            </Box>
            <Box flexGrow={1} className="footer-style">
                <FooterComponent />
            </Box>
        </Box>
    )
}

export default PaymentHistoryComponent
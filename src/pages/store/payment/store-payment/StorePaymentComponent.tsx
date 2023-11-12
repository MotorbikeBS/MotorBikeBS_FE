import { Box } from '@mui/material'
import React from 'react'
import StoreMenuComponent from '../../store-menu-component/StoreMenuComponent'
import FooterComponent from '../../../../common-components/footer-component/FooterComponent'
import PaymentPointComponent from './payment-point/PaymentPoint'

const StorePaymentComponent = () => {
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
                    <PaymentPointComponent />
                </Box>
                <Box flexGrow={1} className="footer-style">
                    <FooterComponent />
                </Box>
            </Box>
        </>
    )
}

export default StorePaymentComponent
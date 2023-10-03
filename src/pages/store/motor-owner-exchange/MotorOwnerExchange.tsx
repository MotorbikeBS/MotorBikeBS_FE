import { Box } from '@mui/material'
import React from 'react'
import StoreMenuComponent from '../store-menu-component/StoreMenuComponent'
import MotorOwnerExchangeComponent from './component/MotorOwnerExchangeComponent'
import FooterComponent from '../../../common-components/footer-component/FooterComponent'

const MotorOwnerExchange = () => {
  return (
    <Box display="flex" flexDirection="column" height="100vh" width="100%">
    <Box flexGrow={1} zIndex={2}>
        <StoreMenuComponent />
    </Box>
    <Box flexGrow={9}>
        <MotorOwnerExchangeComponent />
      </Box>

    <Box flexGrow={1} className="footer-style">
        <FooterComponent />
    </Box>
</Box>
  )
}

export default MotorOwnerExchange

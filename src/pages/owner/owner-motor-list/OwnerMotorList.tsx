import { Box } from '@mui/material'
import React from 'react'
import OwnerMenuComponent from '../owner-menu-component/OwnerMenuComponent'
import FooterComponent from '../../../common-components/footer-component/FooterComponent'
import OwnerMotorListComponent from './component/OwnerMotorListComponent'

const OwnerMotorList = () => {
  return (
    <Box display="flex" flexDirection="column" height="100vh" width="100%">
    {/* <Box flexGrow={1} zIndex={2}> */}
        <OwnerMenuComponent />
    {/* </Box> */}
    <Box flexGrow={10}>
       <OwnerMotorListComponent />
    </Box>

    <Box flexGrow={1} className="footer-style">
        <FooterComponent />
    </Box>
</Box>
  )
}

export default OwnerMotorList

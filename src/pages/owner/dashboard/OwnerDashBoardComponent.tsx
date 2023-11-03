import { Box } from '@mui/material'
import React from 'react'
import OwnerMenuComponent from '../owner-menu-component/OwnerMenuComponent'
import DashBoardComponent from './owner-dashboard/DashBoardComponent'
import FooterComponent from '../../../common-components/footer-component/FooterComponent'

const OwnerDashBoardComponent = () => {
    return (
        <Box
            display="flex"
            flexDirection="column"
            height="100vh"
            width="100%"
        >
            <Box flexGrow={1} zIndex={1}>
                <OwnerMenuComponent />
            </Box>
            <Box flexGrow={9}>
                <DashBoardComponent />
            </Box>
            <Box flexGrow={1} className="footer-style">
                <FooterComponent />
            </Box>
        </Box>
    )
}

export default OwnerDashBoardComponent
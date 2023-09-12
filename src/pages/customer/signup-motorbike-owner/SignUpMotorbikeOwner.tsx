import { Box, Container, Typography } from '@mui/material'
import React from 'react'
import CustomerMenuComponent from '../customer-menu-component/CustomerMenuComponent'
import FooterComponent from '../../../common-components/footer-component/FooterComponent'

const SignUpMotorbikeOwner = () => {
    return (
        <Box
            display='flex'
            flexDirection='column'
            height='100vh'
            width='100%'
            flexGrow={12}
        >
            <Box flexGrow={1} zIndex={2}>
                <CustomerMenuComponent />
            </Box>
            <Box flexGrow={8} display='flex'>
                <Container>
                    <Typography>Đăng ký là chủ xe:</Typography>
                </Container>
            </Box>
            <Box flexGrow={1} className="footer-style">
                <FooterComponent />
            </Box>
        </Box>
    )
}

export default SignUpMotorbikeOwner
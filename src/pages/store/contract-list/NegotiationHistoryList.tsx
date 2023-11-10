import { Box } from '@mui/material'

import StoreMenuComponent from '../store-menu-component/StoreMenuComponent'
import FooterComponent from '../../../common-components/footer-component/FooterComponent'
import NegotiationListWithOwner from './negotiation-with-owner/NegotiationListWithOwner'

const NegotiationHistoryList = () => {

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
                    <NegotiationListWithOwner />
                </Box>
                <Box flexGrow={1} className="footer-style">
                    <FooterComponent />
                </Box>
            </Box>
        </>
    )
}

export default NegotiationHistoryList
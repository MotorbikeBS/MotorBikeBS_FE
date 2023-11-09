import { Box } from "@mui/material"
import OwnerMenuComponent from "../owner-menu-component/OwnerMenuComponent"
import FooterComponent from "../../../common-components/footer-component/FooterComponent"
import StoreNegotiationWithOwnerComponent from "./negotiation-with-store/StoreNegotiationWithOwnerComponent"


const NegotiationListOwner = () => {

    return (
        <>
            <Box
                display='flex'
                flexDirection='column'
                height="100vh"
                width="100%"
            >
                <Box flexGrow={1}>
                    <OwnerMenuComponent />
                </Box>
                <Box
                    flexGrow={10}
                    marginTop='0.5rem'
                    marginBottom='5%'
                >
                    <StoreNegotiationWithOwnerComponent />
                </Box>
                <Box flexGrow={1} className="footer-style">
                    <FooterComponent />
                </Box>
            </Box>
        </>
    )
}

export default NegotiationListOwner
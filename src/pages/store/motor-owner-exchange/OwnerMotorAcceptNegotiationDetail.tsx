import { Box } from '@mui/material';
import StoreMenuComponent from '../store-menu-component/StoreMenuComponent';
import FooterComponent from '../../../common-components/footer-component/FooterComponent';
import OwnerMotorAcceptNegotiationDetailComponent from './component/OwnerMotorAcceptNegotiationDetailComponent';

const OwnerMotorAcceptNegotitationDetail = () => {
    return (
        <Box display="flex" flexDirection="column" height="100vh" width="100%">
            <Box flexGrow={1} zIndex={2}>
                <StoreMenuComponent />
            </Box>
            <Box flexGrow={9}>
                <OwnerMotorAcceptNegotiationDetailComponent />
            </Box>

            <Box flexGrow={1} className="footer-style">
                <FooterComponent />
            </Box>
        </Box>
    );
};

export default OwnerMotorAcceptNegotitationDetail;

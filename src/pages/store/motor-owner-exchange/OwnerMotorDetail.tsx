import { Box } from "@mui/material";
import StoreMenuComponent from "../store-menu-component/StoreMenuComponent";
import OwnerMotorDetailComponent from "./component/OwnerMotorDetailComponent";
import FooterComponent from "../../../common-components/footer-component/FooterComponent";

const OwnerMotorDetail = () => {
    return (
        <Box display="flex" flexDirection="column" height="100vh" width="100%">
            <Box flexGrow={1} zIndex={2}>
                <StoreMenuComponent />
            </Box>
            <Box flexGrow={9}>
                <OwnerMotorDetailComponent />
            </Box>

            <Box flexGrow={1} className="footer-style">
                <FooterComponent />
            </Box>
        </Box>
    );
};

export default OwnerMotorDetail;

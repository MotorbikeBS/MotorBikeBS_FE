import React from "react";
import OwnerMenuComponent from "../../owner/owner-menu-component/OwnerMenuComponent";
import FooterComponent from "../../../common-components/footer-component/FooterComponent";
import { Box } from "@mui/material";
import StoreDetailComponent from "./StoreDetailComponent";

const StoreDetail = () => {
  return (
    <Box display="flex" flexDirection="column" height="100vh" width="100%">
      <Box flexGrow={1}>
        <OwnerMenuComponent />
      </Box>
      <Box flexGrow={9}>
        <StoreDetailComponent />
      </Box>
      <Box flexGrow={1} className="footer-style">
        <FooterComponent />
      </Box>
    </Box>
  );
};

export default StoreDetail;

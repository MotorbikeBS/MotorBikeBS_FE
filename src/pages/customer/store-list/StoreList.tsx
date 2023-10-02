import React from "react";
import { Box } from "@mui/material";
import FooterComponent from "../../../common-components/footer-component/FooterComponent";
import StoreListComponent from "./StoreListComponent";
import CustomerMenuComponent from "../customer-menu-component/CustomerMenuComponent";
import BannerComponent from "../../../common-components/banner-component/BannerComponent";

const StoreList = () => {
  return (

    <Box display="flex" flexDirection="column" height="100vh" width="100%">
      <Box flexGrow={1} zIndex={2}>
        <CustomerMenuComponent />
      </Box>

      <Box flexGrow={1} zIndex={1}>
        <BannerComponent />
      </Box>

      <Box flexGrow={9} >
        <StoreListComponent />
      </Box>

      <Box flexGrow={1} className="footer-style">
        <FooterComponent />
      </Box>
    </Box>
  );
};

export default StoreList;

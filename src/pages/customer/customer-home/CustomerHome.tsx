import React from "react";
import { Box } from "@mui/material";
import "./style/style.scss";
import CustomerMenuComponent from "../customer-menu-component/CustomerMenuComponent";
import BannerComponent from "../../../common-components/banner-component/BannerComponent";
import FooterComponent from "../../../common-components/footer-component/FooterComponent";
import MotorbikeComponent from "../Motorbike-components/MotorbikeComponent";

const CustomerHome = () => {
  return (
    <Box display="flex" flexDirection="column" height="100vh" width="100%">
      <Box flexGrow={1} zIndex={2}>
        <CustomerMenuComponent />
      </Box>

      <Box flexGrow={1} zIndex={1}>
        <BannerComponent />
      </Box>

      <Box flexGrow={9}>
        <MotorbikeComponent />
      </Box>

      <Box flexGrow={1} className="footer-style">
        <FooterComponent />
      </Box>
    </Box>
  );
};

export default CustomerHome;

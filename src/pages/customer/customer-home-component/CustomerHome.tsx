import React from "react";
import { Box, Typography } from "@mui/material";
import Footer from "../../../common-components/footer-component/Footer";
import "./style/style.scss";
import CustomerMenuComponent from "../customer-menu-component/CustomerMenuComponent";
import BannerComponent from "../../../common-components/banner-component/BannerComponent";

const CustomerHome = () => {
  return (
    <Box display="flex" flexDirection="column" height="100vh" width="100%">
      <Box flexGrow={1} zIndex={2}>
        <CustomerMenuComponent />
      </Box>

      <Box flexGrow={1} zIndex={1}>
        <BannerComponent />
      </Box>

      <Box flexGrow={6} sx={{ background: "yellow" }}>
        <Typography variant="h5">Customer Home</Typography>
      </Box>

      <Box flexGrow={1} className="footer-style">
        <Footer />
      </Box>
    </Box>
  );
};

export default CustomerHome;

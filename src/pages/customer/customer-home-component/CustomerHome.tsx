import React from "react";
import { Box } from "@mui/material";
import Footer from "../../../common-components/footer-component/Footer";
import "./style/style.scss";
import CustomerMenuComponent from "../customer-menu-component/CustomerMenuComponent";
import BannerComponent from "../../../common-components/banner-component/BannerComponent";
import ProductComponent from "../product-components.tsx/ProductComponent";

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
        <ProductComponent />
      </Box>

      <Box flexGrow={1} className="footer-style">
        <Footer />
      </Box>
    </Box>
  );
};

export default CustomerHome;

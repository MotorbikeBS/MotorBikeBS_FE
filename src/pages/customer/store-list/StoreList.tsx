import React from "react";
import { Box } from "@mui/material";
import FooterComponent from "../../../common-components/footer-component/FooterComponent";
import StoreListComponent from "./StoreListComponent";
import CustomerMenuComponent from "../customer-menu-component/CustomerMenuComponent";
import BannerComponent from "../../../common-components/banner-component/BannerComponent";

const StoreList = () => {
  return (
    <>
      <CustomerMenuComponent />
      <BannerComponent />

      <StoreListComponent />

      <Box flexGrow={1} className="footer-style">
        <FooterComponent />
      </Box>
    </>
  );
};

export default StoreList;

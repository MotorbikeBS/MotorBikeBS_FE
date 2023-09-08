import React from "react";
import OwnerMenuComponent from "../owner-menu-component/OwnerMenuComponent";
import BannerComponent from "../../../common-components/banner-component/BannerComponent";
import StoreListComponent from "../../customer/store-list/StoreListComponent";
import FooterComponent from "../../../common-components/footer-component/FooterComponent";
import { Box } from "@mui/material";

const OwnerHome = () => {
  return (
    <>
      <OwnerMenuComponent />
      <BannerComponent />

      <StoreListComponent />

      <Box flexGrow={1} className="footer-style">
        <FooterComponent />
      </Box>
    </>
  );
};

export default OwnerHome;

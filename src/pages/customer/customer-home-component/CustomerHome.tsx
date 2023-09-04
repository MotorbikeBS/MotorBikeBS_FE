import React from "react";
import { Box, Typography } from "@mui/material";
import Footer from "../../../common-components/footer-component/Footer";
import "./style/style.scss";
import CustomerMenuComponent from "../customer-menu-component/CustomerMenuComponent";
import UserProfile from "../../user-profile-component/UserProfile";

const CustomerHome = () => {
  return (
    <Box display="flex" flexDirection="column" height="100vh" width="100%">
      <CustomerMenuComponent />
      <Box flexGrow={2}>
        <Typography>Đây là Slide nè</Typography>
      </Box>
      <Box flexGrow={9} sx={{ background: "yellow" }}>
        <Typography variant="h5">Customer Home</Typography>
      </Box>

      <Box flexGrow={1} className="footer-style">
        <Footer />
      </Box>
    </Box>
  );
};

export default CustomerHome;

import React from "react";
import { Box, Typography } from "@mui/material";
import Footer from "../../../common-components/footer-component/Footer";
import MenuComponent from "../../../common-components/menu-component/MenuComponent";

const AdminHome = () => {
  return (
    <Box display="flex" flexDirection="column" height="100vh" width="100%">
      <MenuComponent />

      <Box flexGrow={2}></Box>

      <Box flexGrow={8} sx={{ background: "yellow" }}>
        <Typography variant="h5">Admin Home</Typography>
      </Box>

      <Box flexGrow={2} sx={{ background: "red" }}>
        <Footer />
      </Box>
    </Box>
  );
};

export default AdminHome;

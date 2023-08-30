import React from "react";
import { Box, Typography } from "@mui/material";
import AdminMenu from "../../../common-components/menu-component/AdminMenu";
import Footer from "../../../common-components/footer-component/Footer";

const AdminHome = () => {
  return (

    <Box display="flex" flexDirection="column" height="100vh" width='100%'>
      <AdminMenu />
      <Box flexGrow={2}>
      </Box>

      <Box flexGrow={8} sx={{ background: 'yellow' }}>
        <Typography variant="h5">Admin Home</Typography>
      </Box>

      <Box flexGrow={2} sx={{ background: 'red' }}>
        <Footer />
      </Box>
    </Box>

  );
};

export default AdminHome;

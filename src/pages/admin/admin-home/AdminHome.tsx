import React from "react";
import { Box, Typography } from "@mui/material";
import AdminMenuComponent from "../admin-menu-component/AdminMenuComponent";

const AdminDashboard = () => {
  return (
    <Box display="flex" flexDirection="column" height="100vh" width="100%">
      <AdminMenuComponent />
      <Box flexGrow={12} sx={{ background: "yellow" }}>
        <Typography variant="h5">Admin Home</Typography>
      </Box>

    </Box>
  );
};

export default AdminDashboard;

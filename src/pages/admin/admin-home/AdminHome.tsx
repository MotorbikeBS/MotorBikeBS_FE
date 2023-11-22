import React from "react";
import { Box, Typography } from "@mui/material";
import AdminMenuComponent from "../admin-menu-component/AdminMenuComponent";
import Dashboard from "./admin-dashboard/Dashboard";

const AdminDashboard = () => {
  return (
    <Box display="flex" flexDirection="column" height="100vh" width="100%">
      <AdminMenuComponent />

      <Box flexGrow={10}>
        <Dashboard />
      </Box>
    </Box>
  );
};

export default AdminDashboard;

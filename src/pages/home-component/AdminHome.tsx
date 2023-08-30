import { Box, Typography } from "@mui/material";
import AdminMenu from "../../common-components/menu-component/AdminMenu";
import Footer from "../../common-components/footer-component/Footer";

const AdminHome = () => {
  return (
    <div>
      <AdminMenu />
      <Box>
        <Typography variant="h5">Admin Home</Typography>
      </Box>
    </div>
  );
};

export default AdminHome;

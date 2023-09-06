import React from "react";
import { Box, Typography } from "@mui/material";
import StoreMenuComponent from "../store-menu-component/StoreMenuComponent";


const StoreHome = () => {
    return (
        <Box display="flex" flexDirection="column" height="100vh" width="100%">
            <StoreMenuComponent />
            <Box flexGrow={12} sx={{ background: "yellow" }}>
                <Typography variant="h5">Store Home</Typography>
            </Box>

        </Box>
    );
};

export default StoreHome;

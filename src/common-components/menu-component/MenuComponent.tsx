import { styled, alpha } from "@mui/material/styles";
import {
  AppBar,
  Toolbar,
  Typography,
  InputBase,
  Button,
  IconButton,
  Menu,
  MenuItem
} from "@mui/material";
import { useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import {
  AccountCircle,
  DriveFileRenameOutline,
  Notifications,
  SearchOutlined,
  BusinessCenter
} from "@mui/icons-material";
import "./style/style.scss";
import React from "react";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25)
  },
  marginRight: theme.spacing(2),
  marginLeft: 1,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(4),
    width: "auto"
  }
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "white",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 35, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "10ch"
    }
  }
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center"
}));

const AdminMenu = () => {
  const theme = useTheme();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar
      position="static"
      sx={{
        display: "flex",
        background: " #04618f",
        paddingLeft: theme.spacing(3)
      }}
    >
      <Button
        sx={{
          background: "white",
          width: "16%",
          marginLeft: "auto",
          alignItems: "center",
          gap: 1,
          "&:hover": {
            background: "#ccd6e6"
          }
        }}
      >
        <BusinessCenter />
        <Typography variant="subtitle2">Dành cho chủ cửa hàng </Typography>
      </Button>
      <Toolbar>
        <Link to="/admin-home" style={{ textDecoration: "none" }}>
          <Typography
            variant="h4"
            noWrap
            component="div"
            sx={{ color: "white", fontWeight: "700" }}
          >
            Motorbike BS
          </Typography>
        </Link>
        <Search>
          <SearchIconWrapper>
            <SearchOutlined />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Tìm Kiếm…"
            inputProps={{ "aria-label": "search" }}
          />
        </Search>
        <div className="menu-content">
          <Link to="/store-list" className="menu-link">
            <Typography className="menu-link-text">DS. Cửa hàng</Typography>
          </Link>
          <Link to="/post-list" className="menu-link">
            <Typography className="menu-link-text">Qlí. Tin</Typography>
          </Link>
          <Link to="/account-list" className="menu-link">
            <Typography className="menu-link-text">Qlí. Tài khoản</Typography>
          </Link>
        </div>
        <div className="menu-btn">
          <div className="menu-btn-icons">
            <Notifications fontSize="large" />
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle fontSize="large" />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right"
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "center"
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <Link
                to="/account/profile"
                style={{ textDecoration: "none", color: "black" }}
              >
                <MenuItem>Profile</MenuItem>
              </Link>
              <Link
                to="/account/dashboard"
                style={{ textDecoration: "none", color: "black" }}
              >
                <MenuItem>Dashboard</MenuItem>
              </Link>
              <Link
                to="/logout"
                style={{ textDecoration: "none", color: "black" }}
              >
                <MenuItem>Logout</MenuItem>
              </Link>
            </Menu>
          </div>

          <Button className="menu-btn-post">
            <DriveFileRenameOutline />
            <Typography>Đăng Tin</Typography>
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default AdminMenu;

import * as React from "react";
import { Search, StyledInputBase, SearchIconWrapper } from "./styledMUI/styled";
import {
    AppBar,
    Box,
    Toolbar,
    IconButton,
    Typography,
    Menu,
    Container,
    Button,
    Tooltip,
    MenuItem,
    useTheme
} from "@mui/material";
import { Link } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";

import {
    AccountCircle,
    DriveFileRenameOutline,
    Notifications,
    SearchOutlined,

} from "@mui/icons-material";

const pages = [
    {
        to: "/store-dashboard",
        name: "Thống kê"
    },
    {
        to: "/bike-list",
        name: "DS.Xe"
    },

    {
        to: "/request-list",
        name: "DS. Yêu cầu"
    },
    {
        to: "/booking-list",
        name: "DS. Lịch hẹn"
    }
];
const settings = [
    {
        to: "/user/profile",
        name: "Hồ sơ"
    },
    {
        to: "/user/wallet",
        name: "Ví"
    },
    {
        to: "/logout",
        name: "Đăng xuất"
    }
];

const StoreMenuComponent = () => {
    const theme = useTheme();

    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
        null
    );
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
        null
    );

    const [searchOpen, setSearchOpen] = React.useState(false);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const toggleSearch = () => {
        setSearchOpen(!searchOpen);
    };

    return (
        <>
            <AppBar
                position="static"
                sx={{
                    display: "flex",
                    background: "#04618f",
                    paddingLeft: theme.spacing(3)
                }}
            >
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <Link to="/store-home" style={{ textDecoration: "none" }}>
                            <Typography
                                variant="h4"
                                noWrap
                                component="div"
                                sx={{
                                    mr: 2,
                                    display: { xs: "none", md: "flex" },
                                    fontWeight: 700,
                                    color: "white"
                                }}
                            >
                                Motorbike BS
                            </Typography>
                        </Link>
                        <Search
                            sx={{
                                display: { xs: "none", md: "flex" }
                            }}
                        >
                            <SearchIconWrapper>
                                <SearchOutlined />
                            </SearchIconWrapper>
                            <StyledInputBase
                                placeholder="Tìm Kiếm…"
                                inputProps={{ "aria-label": "search" }}
                            />
                        </Search>

                        <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenNavMenu}
                                color="inherit"
                            >
                                <MenuIcon />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorElNav}
                                anchorOrigin={{
                                    vertical: "bottom",
                                    horizontal: "left"
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: "top",
                                    horizontal: "left"
                                }}
                                open={Boolean(anchorElNav)}
                                onClose={handleCloseNavMenu}
                                sx={{
                                    display: { xs: "block", md: "none" }
                                }}
                            >
                                {pages.map((page) => (
                                    <Link to={page.to} style={{ textDecoration: "none" }}>
                                        <MenuItem key={page.to} onClick={handleCloseNavMenu}>
                                            <Typography textAlign="center" sx={{ color: "black" }}>
                                                {page.name}
                                            </Typography>
                                        </MenuItem>
                                    </Link>
                                ))}
                            </Menu>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={toggleSearch}
                                color="inherit"
                            >
                                <SearchOutlined />
                            </IconButton>
                        </Box>

                        <Link
                            to="/store-home"
                            style={{
                                textDecoration: "none",
                                flexGrow: 1
                            }}
                        >
                            <Typography
                                variant="h5"
                                noWrap
                                component="div"
                                sx={{
                                    mr: 2,
                                    display: { xs: "flex", md: "none" },
                                    fontWeight: 700,
                                    color: "white"
                                }}
                            >
                                Motorbike BS
                            </Typography>
                        </Link>

                        <Box
                            sx={{ flexGrow: 1, display: { xs: "none", md: "flex" }, gap: 2 }}
                        >
                            {pages.map((page) => (
                                <Link
                                    key={page.to}
                                    to={page.to}
                                    style={{
                                        textDecoration: "none",
                                        fontSize: "1.1rem",
                                        fontWeight: "700",
                                        color: "white"
                                    }}
                                >
                                    {page.name}
                                </Link>
                            ))}
                        </Box>

                        <Box sx={{ display: "flex", flexGrow: 0 }}>

                            <Tooltip title="Thông báo">
                                <IconButton size="large" color="inherit">
                                    <Notifications />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Tài khoản">
                                <IconButton
                                    onClick={handleOpenUserMenu}
                                    size="large"
                                    aria-label="account of current user"
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
                                    color="inherit"
                                >
                                    <AccountCircle />
                                </IconButton>
                            </Tooltip>
                            <Menu
                                sx={{ mt: "45px" }}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: "top",
                                    horizontal: "right"
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: "top",
                                    horizontal: "right"
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                {settings.map((setting) => (
                                    <Link to={setting.to} style={{ textDecoration: "none" }}>
                                        <MenuItem key={setting.to} onClick={handleCloseUserMenu}>
                                            <Typography textAlign="center" sx={{ color: "black" }}>
                                                {setting.name}
                                            </Typography>
                                        </MenuItem>
                                    </Link>
                                ))}
                            </Menu>
                            <Button
                                sx={{
                                    display: { xs: "none", md: "flex" },
                                    color: "white",
                                    backgroundColor: "orange",
                                    "&:hover": {
                                        background: "#cf9025"
                                    }
                                }}
                            >
                                <DriveFileRenameOutline />
                                <Typography>Đăng Tin</Typography>
                            </Button>

                            <Tooltip
                                title="Đăng tin"
                                sx={{ display: { xs: "flex", md: "none" } }}
                            >
                                <IconButton size="large" color="inherit">
                                    <DriveFileRenameOutline />
                                </IconButton>
                            </Tooltip>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
            {searchOpen && (
                <Box sx={{ flexGrow: 1, display: "flex", backgroundColor: "#04618f" }}>
                    <Search sx={{ display: "flex", flexGrow: 1 }}>
                        <SearchIconWrapper>
                            <SearchOutlined />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Tìm Kiếm…"
                            inputProps={{ "aria-label": "search" }}
                        />
                    </Search>
                </Box>
            )}
        </>
    );
};

export default StoreMenuComponent;

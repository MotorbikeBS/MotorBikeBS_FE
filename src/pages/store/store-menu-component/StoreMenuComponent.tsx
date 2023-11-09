import * as React from 'react';
// import { Search, StyledInputBase, SearchIconWrapper } from './styledMUI/styled';
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
    useTheme,
} from '@mui/material';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';

import {
    AccountCircle,
    DriveFileRenameOutline,
    Notifications,
    // SearchOutlined,
} from '@mui/icons-material';
import './style/style.scss';
import { useAppDispatch } from '../../../services/store/store';
import { logoutUser } from '../../../services/features/auth/accountSlice';

const pages = [
    {
        to: '/dashboard',
        name: 'Thống kê',
    },
    {
        to: '/motorbike-exchange',
        name: 'Sàn chủ xe',
    },
    {
        to: '/motorbike-list',
        name: 'DS.Xe',
    },
    {
        to: '/booking-list',
        name: 'DS. Lịch hẹn',
    },
    {
        to: '/store/contract',
        name: 'Hợp đồng',
    },
    {
        to: '/transaction-history',
        name: 'Lịch sử giao dịch'
    }
];

const StoreMenuComponent = () => {
    const theme = useTheme();
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
        null,
    );
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
        null,
    );

    // const [searchOpen, setSearchOpen] = React.useState(false);

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

    // const toggleSearch = () => {
    //     setSearchOpen(!searchOpen);
    // };
    const isMenuItemActive = (to: string) => {
        return location.pathname === to;
    };

    const handleLogout = (data: any | undefined) => {
        dispatch(logoutUser(data))
            .unwrap()
            .then(() => {
                navigate('/login');
            });
    };
    return (
        <>
            <AppBar
                position="static"
                sx={{
                    display: 'flex',
                    background: '#04618f',
                    paddingLeft: theme.spacing(3),
                }}
            >
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <Link
                            to="/dashboard"
                            style={{ textDecoration: 'none' }}
                        >
                            <Typography
                                variant="h4"
                                noWrap
                                component="div"
                                sx={{
                                    mr: 2,
                                    display: { xs: 'none', md: 'flex' },
                                    fontWeight: 700,
                                    color: 'white',
                                }}
                            >
                                Motorbike BS
                            </Typography>
                        </Link>
                        {/* <Search
                            sx={{
                                display: { xs: 'none', md: 'flex' },
                            }}
                        >
                            <SearchIconWrapper>
                                <SearchOutlined />
                            </SearchIconWrapper>
                            <StyledInputBase
                                placeholder="Tìm Kiếm…"
                                inputProps={{ 'aria-label': 'search' }}
                            />
                        </Search> */}

                        <Box
                            sx={{
                                flexGrow: 1,
                                display: { xs: 'flex', md: 'none' },
                            }}
                        >
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
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                open={Boolean(anchorElNav)}
                                onClose={handleCloseNavMenu}
                                sx={{
                                    display: { xs: 'block', md: 'none' },
                                }}
                            >
                                {pages.map((page) => (
                                    <Link
                                        to={page.to}
                                        style={{ textDecoration: 'none' }}
                                        key={page.to}
                                    >
                                        <MenuItem
                                            key={page.to}
                                            onClick={handleCloseNavMenu}
                                        >
                                            <Typography
                                                textAlign="center"
                                                sx={{ color: 'black' }}
                                            >
                                                {page.name}
                                            </Typography>
                                        </MenuItem>
                                    </Link>
                                ))}
                            </Menu>
                            {/* <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={toggleSearch}
                                color="inherit"
                            >
                                <SearchOutlined />
                            </IconButton> */}
                        </Box>

                        <Link
                            to="/dashboard"
                            style={{
                                textDecoration: 'none',
                                flexGrow: 1,
                            }}
                        >
                            <Typography
                                variant="h5"
                                noWrap
                                component="div"
                                sx={{
                                    mr: 2,
                                    display: { xs: 'flex', md: 'none' },
                                    fontWeight: 700,
                                    color: 'white',
                                }}
                            >
                                Motorbike BS
                            </Typography>
                        </Link>

                        <Box
                            sx={{
                                flexGrow: 1,
                                display: { xs: 'none', md: 'flex' },
                                gap: 2,
                            }}
                        >
                            {pages.map((page) => (
                                <Link
                                    key={page.to}
                                    to={page.to}
                                    className={`link-customer ${isMenuItemActive(page.to)
                                        ? 'active'
                                        : ''
                                        }`}
                                >
                                    {page.name}
                                </Link>
                            ))}
                        </Box>

                        <Box sx={{ display: 'flex', flexGrow: 0 }}>
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
                                sx={{ mt: '45px' }}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                <MenuItem onClick={handleCloseUserMenu}>
                                    <Link
                                        to="/user/profile"
                                        style={{ textDecoration: 'none' }}
                                    >
                                        <Typography>Hồ Sơ</Typography>
                                    </Link>
                                </MenuItem>
                                <MenuItem onClick={handleCloseUserMenu}>
                                    <Link
                                        to="/user/payment-point"
                                        style={{ textDecoration: 'none' }}
                                    >
                                        <Typography>Ví Điểm</Typography>
                                    </Link>
                                </MenuItem>
                                <MenuItem onClick={handleCloseUserMenu}>
                                    <Link
                                        to="/"
                                        style={{ textDecoration: 'none' }}
                                        onClick={handleLogout}
                                    >
                                        <Typography>Đăng xuất</Typography>
                                    </Link>
                                </MenuItem>
                            </Menu>
                            <Button
                                sx={{
                                    display: { xs: 'none', md: 'flex' },
                                    color: 'white',
                                    backgroundColor: 'orange',
                                    '&:hover': {
                                        background: '#cf9025',
                                    },
                                }}
                            >
                                <DriveFileRenameOutline />
                                <Typography>Đẩy Bài</Typography>
                            </Button>

                            <Tooltip
                                title="Đăng tin"
                                sx={{ display: { xs: 'flex', md: 'none' } }}
                            >
                                <IconButton size="large" color="inherit">
                                    <DriveFileRenameOutline />
                                </IconButton>
                            </Tooltip>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
            {/* {searchOpen && (
                <Box
                    sx={{
                        flexGrow: 1,
                        display: 'flex',
                        backgroundColor: '#04618f',
                    }}
                >
                    <Search sx={{ display: 'flex', flexGrow: 1 }}>
                        <SearchIconWrapper>
                            <SearchOutlined />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Tìm Kiếm…"
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </Search>
                </Box>
            )} */}
        </>
    );
};

export default StoreMenuComponent;

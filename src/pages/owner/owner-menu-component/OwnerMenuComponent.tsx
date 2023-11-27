import React from 'react';
import {
    AppBar,
    Box,
    Container,
    IconButton,
    Menu,
    MenuItem,
    Toolbar,
    Tooltip,
    Typography,
    useTheme,
} from '@mui/material';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import MenuComponent from '../../../common-components/notify-component/NotifyComponent';
import { AccountCircle, Notifications } from '@mui/icons-material';
import MenuIcon from '@mui/icons-material/Menu';
import { useAppDispatch } from '../../../services/store/store';
import { logoutUser } from '../../../services/features/auth/accountSlice';

const pages = [
    {
        // store-list
        to: '/owner-home',
        name: 'Trang chủ',
    },
    {
        to: '/owner/dashboard',
        name: 'Bảng điều khiển',
    },
    {
        to: '/owner/motors',
        name: 'Kho xe',
    },
    {
        to: '/owner/negotiation',
        name: 'Thương Lượng',
    },
    {
        to: '/owner/receipt',
        name: 'Biên nhận',
    },
    {
        to: '/owner/history-transaction',
        name: 'Lịch sử giao dịch',
    },
];

const OwnerMenuComponent = () => {
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

    const [anchorElNotify, setAnchorElNotify] =
        React.useState<null | HTMLElement>(null);

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

    const handleOpenNotifyMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNotify(event.currentTarget);
    };

    const handleCloseNotifyMenu = () => {
        setAnchorElNotify(null);
    };
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
                            to="/owner-home"
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
                        </Box>

                        <Link
                            to="/customer-home"
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
                                    className={`link-customer ${
                                        isMenuItemActive(page.to)
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
                                <IconButton
                                    onClick={handleOpenNotifyMenu}
                                    size="large"
                                    color="inherit"
                                    aria-label="notifications"
                                    aria-controls="menu-notify"
                                    aria-haspopup="true"
                                >
                                    <Notifications />
                                </IconButton>
                            </Tooltip>
                            <MenuComponent
                                anchorElNotify={anchorElNotify}
                                handleCloseNotifyMenu={handleCloseNotifyMenu}
                            />
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
                                        to="/"
                                        style={{ textDecoration: 'none' }}
                                        onClick={handleLogout}
                                    >
                                        <Typography>Đăng xuất</Typography>
                                    </Link>
                                </MenuItem>
                            </Menu>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
        </>
    );
};

export default OwnerMenuComponent;

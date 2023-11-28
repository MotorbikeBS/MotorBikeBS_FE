import * as React from 'react';
// import { Search, StyledInputBase, SearchIconWrapper } from './styledMUI/style';
import {
    AppBar,
    Box,
    Toolbar,
    IconButton,
    Typography,
    Menu,
    Container,
    Tooltip,
    MenuItem,
    useTheme,
    Badge,
} from '@mui/material';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import MenuComponent from '../../../common-components/notify-component/NotifyComponent';
import { AccountCircle, Notifications } from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '../../../services/store/store';
import { logoutUser } from '../../../services/features/auth/accountSlice';

const pages = [
    {
        to: '/dashboard',
        name: 'Bảng thống kê',
    },
    {
        to: '/list-user',
        name: 'DS. Người dùng',
    },
    {
        to: '/store-list-admin',
        name: 'DS.Cửa hàng',
    },
    {
        to: '/motor-fields',
        name: 'DS.Cấu hình xe',
    },
];

const AdminMenuComponent = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useAppDispatch();
    const { notificationByUserId } = useAppSelector(
        (state) => state.notification,
    );
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
        null,
    );
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
        null,
    );

    const [anchorElNotify, setAnchorElNotify] =
        React.useState<null | HTMLElement>(null);

    const unReadNotification =
        notificationByUserId &&
        notificationByUserId.filter((notify) => notify?.isRead === false);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const isMenuItemActive = (to: string) => {
        return location.pathname === to;
    };

    const handleOpenNotifyMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNotify(event.currentTarget);
    };

    const handleCloseNotifyMenu = () => {
        setAnchorElNotify(null);
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
                                    <MenuItem
                                        key={page.to}
                                        onClick={handleCloseNavMenu}
                                    >
                                        <Link
                                            to={page.to}
                                            style={{ textDecoration: 'none' }}
                                        >
                                            <Typography
                                                textAlign="center"
                                                sx={{ color: 'black' }}
                                            >
                                                {page.name}
                                            </Typography>
                                        </Link>
                                    </MenuItem>
                                ))}
                            </Menu>
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
                                    {unReadNotification && (
                                        <Badge
                                            badgeContent={
                                                unReadNotification?.length
                                            }
                                            color="error"
                                        >
                                            <Notifications />
                                        </Badge>
                                    )}
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
                                {' '}
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

export default AdminMenuComponent;

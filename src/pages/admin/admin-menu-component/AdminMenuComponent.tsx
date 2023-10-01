import * as React from 'react';
import { Search, StyledInputBase, SearchIconWrapper } from './styledMUI/style';
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
} from '@mui/material';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';

import {
    AccountCircle,
    Notifications,
    SearchOutlined,
} from '@mui/icons-material';
import { useAppDispatch } from '../../../services/store/store';
import { logoutUser } from '../../../services/features/accountSlice';

const pages = [{
    to: '/dashboard',
    name: 'Bảng thống kê'
},
{
    to: '/list-user',
    name: 'DS. Người dùng',
},
{
    to: '/store-list-admin',
    name: 'DS.Cửa hàng'

}
];

const AdminMenuComponent = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useAppDispatch();

    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
        null,
    );
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
        null,
    );

    const [searchOpen, setSearchOpen] = React.useState(false);

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

    const toggleSearch = () => {
        setSearchOpen(!searchOpen);
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
                            to="/admin-home"
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
                        <Search
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
                        </Search>

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
                            to="/admin-home"
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
            {searchOpen && (
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
            )}
        </>
    );
};

export default AdminMenuComponent;

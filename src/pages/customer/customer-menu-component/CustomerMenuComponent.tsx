import * as React from 'react';
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
    TextField,
} from '@mui/material';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import './style/style.scss';

import {
    AccountCircle,
    Notifications,
    SearchOutlined,
    BusinessCenter,
    FavoriteBorderOutlined,
    DirectionsBike,
    Clear
} from '@mui/icons-material';
import './style/style.scss';
import MenuComponent from '../../../common-components/notify-component/NotifyComponent';
import { useAppDispatch } from '../../../services/store/store';
import { logoutUser } from '../../../services/features/auth/accountSlice';
import { getAllOnExchange, searchMotorByName } from '../../../services/features/motorbike/motorbikeSlice';
import FilterComponent from '../../../common-components/filter-component/FilterComponent';

const pages = [
    {
        to: '/customer-home',
        name: 'Trang chủ',
    },
    {
        to: '/store-list',
        name: 'DS. Cửa hàng',
    },
    {
        to: '/customer/my-booking',
        name: 'Lịch hẹn',
    },
    {
        to: '/buy-history',
        name: 'Lịch sử mua hàng',
    },
];

const CustomerMenuComponent = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useAppDispatch();
    const [searchTerm, setSearchTerm] = React.useState('');
    const [isButtonDisabled, setIsButtonDisabled] = React.useState(true);

    const handleSearch = () => {
        dispatch(searchMotorByName({ motorName: searchTerm }));
    };

    const handleClearSearch = () =>{
        dispatch(getAllOnExchange({ pageNumber: 1, pageSize: 6 }));
        setSearchTerm('');
        setIsButtonDisabled(true);
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value;
        setSearchTerm(newValue);
        setIsButtonDisabled(newValue.trim() === '');
    };


    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
        null,
    );
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
        null,
    );

    const [anchorElFilter, setAnchorElFilter] =
        React.useState<null | HTMLElement>(null);


    const handleOpenFilterBox = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElFilter(event.currentTarget);
    };

    const handleCloseFilterBox = () => {
        setAnchorElFilter(null);
    };


    const [anchorElNotify, setAnchorElNotify] =
        React.useState<null | HTMLElement>(null);

    const [searchOpen, setSearchOpen] = React.useState(false);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };
    const handleOpenNotifyMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNotify(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleCloseNotifyMenu = () => {
        setAnchorElNotify(null);
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
                <div
                    style={{
                        display: 'flex',
                        alignContent: 'flex-end',
                        justifyContent: 'flex-end',
                        gap: 8,
                    }}
                >
                    <Box
                        sx={{
                            display: { xs: 'none', md: 'flex' },
                            background: 'white',
                            borderRadius: '6px',
                            '&:hover': {
                                background: '#ccd6e6',
                            },
                        }}
                    >
                        <Link to="/customer/store-owner-signup">
                            <Button sx={{ gap: '5px' }}>
                                <BusinessCenter />
                                <Typography variant="subtitle2">
                                    Dành cho chủ cửa hàng{' '}
                                </Typography>
                            </Button>
                        </Link>
                    </Box>

                    <Box
                        sx={{
                            display: { xs: 'none', md: 'flex' },
                            background: 'white',
                            marginRight: '4px',
                            borderRadius: '6px',
                            '&:hover': {
                                background: '#ccd6e6',
                            },
                        }}
                    >
                        <Link to="/customer/bike-owner-signup">
                            <Button sx={{ gap: '5px' }}>
                                <DirectionsBike />
                                <Typography variant="subtitle2">
                                    Tôi là chủ xe{' '}
                                </Typography>
                            </Button>
                        </Link>
                    </Box>
                </div>
                <Tooltip title="Dành cho chủ cửa hàng">
                    <Box
                        sx={{
                            display: { xs: 'flex', md: 'none' },
                            background: 'white',
                            marginLeft: 'auto',
                            alignItems: 'center',
                            gap: 1,
                            '&:hover': {
                                background: '#ccd6e6',
                            },
                        }}
                    >
                        <Link to="/customer/store-owner-signup">
                            <Button>
                                <BusinessCenter />
                            </Button>
                        </Link>
                    </Box>
                </Tooltip>
                <Tooltip title="Tôi là chủ xe">
                    <Box
                        sx={{
                            display: { xs: 'flex', md: 'none' },
                            background: 'white',
                            marginLeft: 'auto',
                            alignItems: 'center',
                            gap: 1,
                            '&:hover': {
                                background: '#ccd6e6',
                            },
                        }}
                    >
                        <Link to="/customer/bike-owner-signup">
                            <Button>
                                <DirectionsBike />
                            </Button>
                        </Link>
                    </Box>
                </Tooltip>
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <Link
                            to="/customer-home"
                            style={{
                                textDecoration: 'none',
                                flexGrow: 1,
                            }}
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
                                display: { xs: 'none', md: 'flex' },
                                gap: '5px',
                            }}
                        >
                            <TextField
                                sx={{
                                    width: '350px',
                                    background: '#4389AB',
                                    '& .MuiInputBase-input': {
                                        padding: '11.5px 15px',
                                        color: 'white',
                                    },
                                }}
                                placeholder="Tìm kiếm xe..."
                                variant="outlined"
                                fullWidth
                                value={searchTerm}
                                onChange={handleInputChange}
                                InputProps={{
                                    endAdornment: searchTerm && (
                                      <Clear
                                        onClick={handleClearSearch}
                                        sx={{ cursor: 'pointer', color: 'white' }}
                                      />
                                    ),
                                  }}
                            />
                            <Button
                                variant="text"
                                disabled={isButtonDisabled}
                                onClick={handleSearch}
                            >
                                <SearchIcon
                                    sx={{ color: 'white', fontSize: '26px' }}
                                />
                            </Button>
                        </Box>

                        <Box
                            sx={{
                                display: { xs: 'none', md: 'flex' },
                            }}
                        >
                            <Tooltip title="Lọc">
                                <IconButton
                                    size="large"
                                    aria-label="account of current user"
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
                                    onClick={handleOpenFilterBox}
                                    color="inherit"
                                >
                                    <FilterAltIcon />
                                </IconButton>
                            </Tooltip>
                            <FilterComponent
                                anchorElFilter={anchorElFilter}
                                handleCloseFilter={handleCloseFilterBox}
                            />
                        </Box>

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
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenFilterBox}
                                color="inherit"
                            >
                                <FilterAltIcon />
                            </IconButton>
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
                                    className={`link-customer ${isMenuItemActive(page.to)
                                            ? 'active'
                                            : ''
                                        }`}
                                >
                                    {page.name}
                                </Link>
                            ))}
                        </Box>

                        <Box sx={{ display: 'flex', flexGrow: 0.5 }}>
                            <Tooltip
                                title="Yêu Thích"
                                onClick={() => navigate('/favourite-list')}
                            >
                                <IconButton size="large" color="inherit">
                                    <FavoriteBorderOutlined />
                                </IconButton>
                            </Tooltip>
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
            {searchOpen && (
                <Box
                    sx={{
                        flexGrow: 1,
                        display: 'flex',
                        backgroundColor: '#04618f',
                    }}
                >
                    <Box sx={{ display: 'flex', flexGrow: 1 }}>
                        <TextField
                            sx={{
                                background: '#4389AB',
                                '& .MuiInputBase-input': {
                                    padding: '11.5px 15px',
                                    color: 'white',
                                },
                            }}
                            placeholder="Tìm kiếm xe..."
                            variant="outlined"
                            fullWidth
                            value={searchTerm}
                            onChange={handleInputChange}
                            InputProps={{
                                endAdornment: searchTerm && (
                                  <Clear
                                    onClick={handleClearSearch}
                                    sx={{ cursor: 'pointer', color: 'white' }}
                                  />
                                ),
                              }}
                        />
                        <Button
                            variant="text"
                            disabled={isButtonDisabled}
                            onClick={handleSearch}
                        >
                            <SearchIcon
                                sx={{ color: 'white', fontSize: '26px' }}
                            />
                        </Button>
                    </Box>
                </Box>
            )}
        </>
    );
};

export default CustomerMenuComponent;

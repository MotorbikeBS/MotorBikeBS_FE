import React, { useState } from 'react';
import {
    Menu,
    Typography,
    Tabs,
    Tab,
    MenuItem,
    Avatar,
} from '@mui/material';
import { Link } from 'react-router-dom';

import notifications from './data/data';
import { Notification } from './model/Notify';

interface MenuComponentProps {
    anchorElNotify: HTMLElement | null;
    handleCloseNotifyMenu: () => void;
}

const NotifyComponent: React.FC<MenuComponentProps> = ({ anchorElNotify, handleCloseNotifyMenu }) => {
    const [selectedTab, setSelectedTab] = useState(1);

    const unreadNotifications = notifications.filter((notification: Notification) => !notification.isRead);

    const handleTabChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setSelectedTab(newValue);
    };
    const unreadNotificationStyles = {
        backgroundColor: 'rgba(199, 198, 197,0.8)'
    };

    return (
        <Menu
            sx={{ mt: '45px' }}
            id="menu-notify"
            anchorEl={anchorElNotify}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={Boolean(anchorElNotify)}
            onClose={handleCloseNotifyMenu}
        >
            <Typography variant="h5" sx={{ mr: 'auto', paddingLeft: '6px', fontWeight: '600' }}>
                Thông báo
            </Typography>

            <Tabs value={selectedTab} onChange={handleTabChange}>
                <Tab label="Tất cả" value={1} />
                <Tab
                    label={`Chưa đọc (${unreadNotifications.length})`}
                    value={2}
                />
            </Tabs>
            {selectedTab === 1 ? (
                <Link to="" style={{ textDecoration: 'none' }}>
                    {selectedTab === 1 ? (
                        <div>
                            {notifications.map((notification) => (
                                <MenuItem
                                    key={notification.id}
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '6px',
                                        ...(notification.isRead ? {} : unreadNotificationStyles),
                                    }}
                                >
                                    <Avatar alt="store" sx={{ width: 30, height: 30, bgcolor: 'orange' }}></Avatar>
                                    <Typography textAlign="left" sx={{ color: 'black' }}>
                                        {notification.store}
                                    </Typography>
                                    <Typography textAlign="left" sx={{ color: 'black' }}>
                                        {notification.message.length > 15
                                            ? `${notification.message.slice(0, 15)}...`
                                            : notification.message
                                        }
                                    </Typography>
                                </MenuItem>
                            ))}
                        </div>
                    ) : (
                        <div>
                            {unreadNotifications.map((notification) => (
                                <MenuItem
                                    key={notification.id}
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '6px',
                                        ...(notification.isRead ? {} : unreadNotificationStyles),
                                    }}
                                >
                                    <Avatar alt="store" sx={{ width: 30, height: 30, bgcolor: 'orange' }}></Avatar>
                                    <Typography textAlign="left" sx={{ color: 'black' }}>
                                        {notification.store}
                                    </Typography>
                                    <Typography textAlign="left" sx={{ color: 'black' }}>
                                        {notification.message.length > 15
                                            ? `${notification.message.slice(0, 15)}...`
                                            : notification.message
                                        }
                                    </Typography>
                                </MenuItem>
                            ))}
                        </div>
                    )}
                </Link>
            ) : (
                <Link to="" style={{ textDecoration: 'none' }}>
                    {unreadNotifications.map((notification) => (
                        <MenuItem key={notification.id} sx={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <Avatar alt="store" sx={{ width: 30, height: 30, bgcolor: 'orange' }}></Avatar>
                            <Typography textAlign="left" sx={{ color: 'black' }}>
                                {notification.store}
                            </Typography>
                            <Typography textAlign="left" sx={{ color: 'black' }}>
                                {notification.message.length > 15
                                    ? `${notification.message.slice(0, 15)}...`
                                    : notification.message
                                }
                            </Typography>
                        </MenuItem>
                    ))}
                </Link>
            )}
        </Menu>
    );
};

export default NotifyComponent;

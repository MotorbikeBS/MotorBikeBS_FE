import React, { useEffect, useState } from 'react';
import {
    Menu,
    Typography,
    Tabs,
    Tab,
    MenuItem,
    Avatar,
    Box,
    Tooltip,
} from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../services/store/store';
import {
    editNotificationMarkRead,
    getNotificationByUserID,
} from '../../services/features/notification/notificationSlice';
import { INotify } from '../../models/Notify/Notify';

interface MenuComponentProps {
    anchorElNotify: HTMLElement | null;
    handleCloseNotifyMenu: () => void;
}

const NotifyComponent: React.FC<MenuComponentProps> = ({
    anchorElNotify,
    handleCloseNotifyMenu,
}) => {
    const dispatch = useAppDispatch();
    const { account } = useAppSelector((state) => state.account);
    const { notificationByUserId } = useAppSelector(
        (state) => state.notification,
    );
    const [selectedTab, setSelectedTab] = useState(1);

    useEffect(() => {
        dispatch(getNotificationByUserID({ id: Number(account?.userId) }));
    }, [dispatch, account]);

    const unreadNotifications =
        notificationByUserId &&
        notificationByUserId.filter(
            (notification: INotify) => notification.isRead === false,
        );

    const handleTabChange = (
        event: React.ChangeEvent<{}>,
        newValue: number,
    ) => {
        setSelectedTab(newValue);
    };

    const unreadNotificationStyles = {
        backgroundColor: 'rgba(199, 198, 197,0.8)',
    };

    const handleIsRead = async (notificationId: number) => {
        if (notificationId) {
            await dispatch(
                editNotificationMarkRead({ notificationID: notificationId }),
            );
            dispatch(getNotificationByUserID({ id: Number(account?.userId) }));
        }
    };

    return (
        <Menu
            sx={{ mt: '45px', width: '100%', minWidth: '300px' }}
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
            <Box sx={{ width: '320px' }}>
                <Typography
                    variant="h5"
                    sx={{ mr: 'auto', paddingLeft: '12px', fontWeight: '600' }}
                >
                    Thông báo
                </Typography>

                <Tabs value={selectedTab} onChange={handleTabChange}>
                    <Tab label="Tất cả" value={1} />
                    <Tab
                        label={`Chưa đọc (${
                            unreadNotifications && unreadNotifications.length
                        })`}
                        value={2}
                    />
                </Tabs>
                {selectedTab === 1 ? (
                    <>
                        {selectedTab === 1 ? (
                            <div>
                                {notificationByUserId &&
                                notificationByUserId?.length === 0 ? (
                                    <Typography
                                        textAlign="center"
                                        sx={{ color: 'black', padding: '4px' }}
                                    >
                                        Bạn chưa có thông báo
                                    </Typography>
                                ) : (
                                    <>
                                        {notificationByUserId &&
                                            notificationByUserId.map(
                                                (notification) => (
                                                    <MenuItem
                                                        key={
                                                            notification.notificationId
                                                        }
                                                        sx={{
                                                            display: 'flex',
                                                            alignItems:
                                                                'center',
                                                            gap: '6px',
                                                            ...(notification.isRead
                                                                ? {}
                                                                : unreadNotificationStyles),
                                                        }}
                                                        onClick={() =>
                                                            handleIsRead(
                                                                notification?.notificationId,
                                                            )
                                                        }
                                                    >
                                                        <Tooltip
                                                            title={
                                                                <div>
                                                                    <Typography
                                                                        sx={{
                                                                            fontSize:
                                                                                '14px',
                                                                            fontWeight:
                                                                                '600',
                                                                        }}
                                                                    >
                                                                        {
                                                                            notification?.title
                                                                        }
                                                                    </Typography>
                                                                    <Typography
                                                                        sx={{
                                                                            fontSize:
                                                                                '12px',
                                                                        }}
                                                                    >
                                                                        {
                                                                            notification?.content
                                                                        }
                                                                    </Typography>
                                                                </div>
                                                            }
                                                        >
                                                            <div
                                                                style={{
                                                                    display:
                                                                        'flex',
                                                                    gap: '12px',
                                                                    alignItems:
                                                                        'center',
                                                                }}
                                                            >
                                                                <Avatar
                                                                    alt="store"
                                                                    sx={{
                                                                        width: 30,
                                                                        height: 30,
                                                                        bgcolor:
                                                                            'orange',
                                                                    }}
                                                                ></Avatar>
                                                                <Box>
                                                                    <Typography
                                                                        textAlign="left"
                                                                        sx={{
                                                                            color: 'black',
                                                                        }}
                                                                    >
                                                                        {notification
                                                                            .title
                                                                            .length >
                                                                        30
                                                                            ? `${notification.title.slice(
                                                                                  0,
                                                                                  30,
                                                                              )}...`
                                                                            : notification.title}
                                                                    </Typography>
                                                                    <Typography
                                                                        sx={{
                                                                            color: 'black',
                                                                        }}
                                                                    >
                                                                        {new Date(
                                                                            notification?.time,
                                                                        ).toLocaleDateString(
                                                                            'vi-VN',
                                                                        )}
                                                                    </Typography>{' '}
                                                                </Box>
                                                            </div>
                                                        </Tooltip>
                                                    </MenuItem>
                                                ),
                                            )}
                                    </>
                                )}
                            </div>
                        ) : (
                            <div>
                                {unreadNotifications &&
                                unreadNotifications?.length === 0 ? (
                                    <Typography
                                        textAlign="center"
                                        sx={{ color: 'black', padding: '4px' }}
                                    >
                                        Bạn chưa có thông báo chưa đọc
                                    </Typography>
                                ) : (
                                    <>
                                        {unreadNotifications &&
                                            unreadNotifications.map(
                                                (notification) => (
                                                    <MenuItem
                                                        key={
                                                            notification.notificationId
                                                        }
                                                        sx={{
                                                            display: 'flex',
                                                            alignItems:
                                                                'center',
                                                            gap: '6px',
                                                            ...(notification.isRead
                                                                ? {}
                                                                : unreadNotificationStyles),
                                                        }}
                                                        onClick={() =>
                                                            handleIsRead(
                                                                notification?.notificationId,
                                                            )
                                                        }
                                                    >
                                                        <Tooltip
                                                            title={
                                                                <div>
                                                                    <Typography
                                                                        sx={{
                                                                            fontSize:
                                                                                '14px',
                                                                            fontWeight:
                                                                                '600',
                                                                        }}
                                                                    >
                                                                        {
                                                                            notification?.title
                                                                        }
                                                                    </Typography>
                                                                    <Typography
                                                                        sx={{
                                                                            fontSize:
                                                                                '12px',
                                                                        }}
                                                                    >
                                                                        {
                                                                            notification?.content
                                                                        }
                                                                    </Typography>
                                                                </div>
                                                            }
                                                        >
                                                            <div
                                                                style={{
                                                                    display:
                                                                        'flex',
                                                                    gap: '12px',
                                                                    alignItems:
                                                                        'center',
                                                                }}
                                                            >
                                                                <Avatar
                                                                    alt="store"
                                                                    sx={{
                                                                        width: 30,
                                                                        height: 30,
                                                                        bgcolor:
                                                                            'orange',
                                                                    }}
                                                                ></Avatar>
                                                                <Box>
                                                                    <Typography
                                                                        textAlign="left"
                                                                        sx={{
                                                                            color: 'yelow',
                                                                        }}
                                                                    >
                                                                        {notification
                                                                            .title
                                                                            .length >
                                                                        30
                                                                            ? `${notification.title.slice(
                                                                                  0,
                                                                                  30,
                                                                              )}...`
                                                                            : notification.title}
                                                                    </Typography>
                                                                    <Typography
                                                                        sx={{
                                                                            color: 'black',
                                                                        }}
                                                                    >
                                                                        {new Date(
                                                                            notification?.time,
                                                                        ).toLocaleDateString(
                                                                            'vi-VN',
                                                                        )}
                                                                    </Typography>{' '}
                                                                </Box>
                                                            </div>
                                                        </Tooltip>
                                                    </MenuItem>
                                                ),
                                            )}
                                    </>
                                )}
                            </div>
                        )}
                    </>
                ) : (
                    <>
                        {unreadNotifications &&
                        unreadNotifications?.length === 0 ? (
                            <Typography
                                textAlign="center"
                                sx={{ color: 'black', padding: '4px' }}
                            >
                                Bạn chưa có thông báo chưa đọc
                            </Typography>
                        ) : (
                            <>
                                {unreadNotifications &&
                                    unreadNotifications.map((notification) => (
                                        <MenuItem
                                            key={notification.notificationId}
                                            sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '6px',
                                            }}
                                            onClick={() =>
                                                handleIsRead(
                                                    notification?.notificationId,
                                                )
                                            }
                                        >
                                            <Tooltip
                                                title={
                                                    <div>
                                                        <Typography
                                                            sx={{
                                                                fontSize:
                                                                    '14px',
                                                                fontWeight:
                                                                    '600',
                                                            }}
                                                        >
                                                            {
                                                                notification?.title
                                                            }
                                                        </Typography>
                                                        <Typography
                                                            sx={{
                                                                fontSize:
                                                                    '12px',
                                                            }}
                                                        >
                                                            {
                                                                notification?.content
                                                            }
                                                        </Typography>
                                                    </div>
                                                }
                                            >
                                                <div
                                                    style={{
                                                        display: 'flex',
                                                        gap: '12px',
                                                        alignItems: 'center',
                                                    }}
                                                >
                                                    <Avatar
                                                        alt="store"
                                                        sx={{
                                                            width: 30,
                                                            height: 30,
                                                            bgcolor: 'orange',
                                                        }}
                                                    ></Avatar>
                                                    <Box>
                                                        <Typography
                                                            textAlign="left"
                                                            sx={{
                                                                color: 'black',
                                                            }}
                                                        >
                                                            {notification?.title
                                                                .length > 30
                                                                ? `${notification?.title.slice(
                                                                      0,
                                                                      30,
                                                                  )}...`
                                                                : notification?.title}
                                                        </Typography>
                                                        <Typography
                                                            sx={{
                                                                color: 'black',
                                                            }}
                                                        >
                                                            {new Date(
                                                                notification?.time,
                                                            ).toLocaleDateString(
                                                                'vi-VN',
                                                            )}
                                                        </Typography>
                                                    </Box>
                                                </div>
                                            </Tooltip>
                                        </MenuItem>
                                    ))}
                            </>
                        )}
                    </>
                )}
            </Box>
        </Menu>
    );
};

export default NotifyComponent;

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import {
    Box,
    Button,
    CircularProgress,
    Container,
    Paper,
    Typography,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import { FavoriteBorderOutlined } from '@mui/icons-material';
import { Item } from './style/style-root';
import './style/style.scss';
import BookingDialog from '../booking-dialog-component/BookingDialog';
import useFormatCurrency from '../../../hooks/useFormatCurrency';
import { useAppDispatch, useAppSelector } from '../../../services/store/store';
import {
    clearMotor,
    getAllOnExchange,
} from '../../../services/features/motorbike/motorbikeSlice';
import { addToWishList } from '../../../services/features/motorbike/wishListSlice';

const MotorbikeComponent = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const { account } = useAppSelector((state) => state.account);
    const { motorbikes, error, loading } = useAppSelector(
        (state) => state.motorbikes,
    );

    const [isOpenDialog, setOpenDialog] = React.useState(false);
    const [isOpenSubmitDialog, setIsOpenSubmitDialog] = React.useState(false);
    const [isOpenCancelDialog, setIsOpenCancelDialog] = React.useState(false);
    const [motorbikeIdForDialog, setMotorbikeIdForDialog] = React.useState<
        number | null
    >(null);
    const formatCurrency = useFormatCurrency();

    const handleNavigateDetail = (motorbikeId: number) => {
        navigate(`/motorbike/${motorbikeId}`);
    };

    useEffect(() => {
        dispatch(clearMotor());
        dispatch(getAllOnExchange());
    }, [dispatch]);

    const handleOpenDialog = (motorbikeId: number) => {
        setMotorbikeIdForDialog(motorbikeId);
        setOpenDialog(true);
    };

    const handleAddToWishList = (motorId: number) => {
        dispatch(addToWishList({ motorId: motorId }));
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setIsOpenSubmitDialog(false);
        setIsOpenCancelDialog(false);
    };
    const handleOpenSubmitDialog = () => {
        setIsOpenSubmitDialog(true);
    };
    const handleCloseSubmitDialog = () => {
        setIsOpenSubmitDialog(false);
    };

    const handleOpenCancelDialog = () => {
        setIsOpenCancelDialog(true);
    };
    const handleCloseCancelDialog = () => {
        setIsOpenCancelDialog(false);
    };

    return (
        <Box
            sx={{
                flexGrow: 1,
                margin: '0 48px 0 48px',
            }}
        >
            {loading === true ? (
                <Box textAlign="center">
                    <CircularProgress />
                </Box>
            ) : (
                <>
                    {error ? (
                        <>
                            <Container className="wishlist-container-notFound">
                                <Paper elevation={3} sx={{ padding: 2 }}>
                                    {/* {error?.error[0]} */}
                                    Không tìm thấy xe
                                </Paper>
                            </Container>
                        </>
                    ) : motorbikes && motorbikes.length === 0 ? (
                        <>
                            <Container className="wishlist-container-notFound">
                                <Paper elevation={3} sx={{ padding: 2 }}>
                                    Sàn giao dịch hiện không có bài đăng nào.
                                </Paper>
                            </Container>
                        </>
                    ) : (
                        <>
                            <Grid
                                container
                                spacing={2}
                                className="product-grid"
                            >
                                {motorbikes &&
                                    motorbikes.map((motor) => (
                                        <Grid
                                            item
                                            xs={12}
                                            sm={6}
                                            md={4}
                                            lg={3}
                                            key={motor.motorId}
                                        >
                                            <Item className="product-item">
                                                <div
                                                    className="product-image"
                                                    onClick={() =>
                                                        handleNavigateDetail(
                                                            motor?.motorId,
                                                        )
                                                    }
                                                >
                                                    {motor?.motorbikeImages && (
                                                        <img
                                                            src={
                                                                motor
                                                                    ?.motorbikeImages[0]
                                                                    ?.imageLink ||
                                                                ''
                                                            }
                                                            alt="Đây là ảnh sản phẩm"
                                                        />
                                                    )}
                                                </div>
                                                <div className="product-information">
                                                    <Typography variant="h6">
                                                        {motor?.motorName}
                                                    </Typography>
                                                    <Typography
                                                        color="red"
                                                        fontWeight="700"
                                                        fontSize="18px"
                                                    >
                                                        Giá:{' '}
                                                        {formatCurrency(
                                                            motor?.price,
                                                        )}
                                                    </Typography>
                                                    {motor?.motorStatus
                                                        ?.motorStatusId ===
                                                    5 ? (
                                                        <Typography color="blue">
                                                            <strong>
                                                                Xe hiện không có
                                                                ở cửa hàng
                                                            </strong>
                                                        </Typography>
                                                    ) : (
                                                        <>
                                                            <br />
                                                        </>
                                                    )}
                                                    <div className="product-info-content">
                                                        <Typography>
                                                            <strong>
                                                                Cửa Hàng:
                                                            </strong>{' '}
                                                            {
                                                                motor?.store
                                                                    ?.storeName
                                                            }
                                                        </Typography>
                                                        <Typography>
                                                            <strong>
                                                                Loại Xe:{' '}
                                                            </strong>
                                                            {
                                                                motor?.motorType
                                                                    ?.title
                                                            }
                                                        </Typography>
                                                        <Typography>
                                                            <strong>
                                                                Odo:{' '}
                                                            </strong>
                                                            {motor?.odo} Km
                                                        </Typography>

                                                        <Typography>
                                                            <strong>
                                                                Đăng ký mới:
                                                            </strong>{' '}
                                                            {new Date(
                                                                motor?.year,
                                                            ).toLocaleDateString(
                                                                'vi-VN',
                                                            )}
                                                        </Typography>
                                                        <Typography>
                                                            <strong>
                                                                Ngày đăng bài:
                                                            </strong>{' '}
                                                            {new Date(
                                                                motor?.postingAt,
                                                            ).toLocaleDateString(
                                                                'vi-VN',
                                                            )}
                                                        </Typography>
                                                    </div>
                                                </div>
                                                {account?.roleId === 4 && (
                                                    <>
                                                        {motor?.motorStatus
                                                            ?.motorStatusId ===
                                                        5 ? (
                                                            <div className="btn-style">
                                                                <Button
                                                                    variant="outlined"
                                                                    onClick={() =>
                                                                        handleOpenDialog(
                                                                            motor?.motorId,
                                                                        )
                                                                    }
                                                                >
                                                                    Đặt lịch xem
                                                                    xe
                                                                </Button>
                                                                <Button
                                                                    className="btn-favorite"
                                                                    onClick={() =>
                                                                        handleAddToWishList(
                                                                            motor?.motorId,
                                                                        )
                                                                    }
                                                                >
                                                                    <FavoriteBorderOutlined />
                                                                </Button>
                                                            </div>
                                                        ) : (
                                                            <div className="btn-style-1">
                                                                <Button
                                                                    className="btn-favorite"
                                                                    onClick={() =>
                                                                        handleAddToWishList(
                                                                            motor?.motorId,
                                                                        )
                                                                    }
                                                                >
                                                                    <FavoriteBorderOutlined />
                                                                </Button>
                                                            </div>
                                                        )}
                                                    </>
                                                )}
                                            </Item>
                                        </Grid>
                                    ))}
                            </Grid>
                        </>
                    )}
                </>
            )}

            <BookingDialog
                open={isOpenDialog}
                openSubmit={isOpenSubmitDialog}
                openCancel={isOpenCancelDialog}
                onOpenSubmitDialog={handleOpenSubmitDialog}
                onCloseSubmitDialog={handleCloseSubmitDialog}
                onOpenCancelDialog={handleOpenCancelDialog}
                onCloseCancelDialog={handleCloseCancelDialog}
                onClose={handleCloseDialog}
                motorbikeId={motorbikeIdForDialog}
            />
        </Box>
    );
};

export default MotorbikeComponent;

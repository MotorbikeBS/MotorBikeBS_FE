import React, { useEffect } from 'react';
import { Box, Button, Container, Grid, Paper, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { Item } from '../../pages/customer/store-list/style/style-root';
import { FavoriteBorderOutlined } from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '../../services/store/store';
import { clearMotor, getMotorByStoreId } from '../../services/features/motorbike/motorbikeSlice';
import useFormatCurrency from '../../hooks/useFormatCurrency';
import BookingDialog from '../../pages/customer/booking-dialog-component/BookingDialog';
import { addToWishList } from '../../services/features/motorbike/wishListSlice';

type storeParams = {
    storeId: number;
};

const MotorbikeByStoreIdComponent = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const formatCurrency = useFormatCurrency();

    const [isOpenDialog, setOpenDialog] = React.useState(false);
    const [isOpenSubmitDialog, setIsOpenSubmitDialog] = React.useState(false);
    const [isOpenCancelDialog, setIsOpenCancelDialog] = React.useState(false);

    const { storeId } = useParams<storeParams | any>();
    const { account } = useAppSelector((state) => state.account);
    const { motorbikeByStoreId } = useAppSelector((state) => state.motorbikes);
    const [motorbikeIdForDialog, setMotorbikeIdForDialog] = React.useState<number | null>(null)

    const handleNavigateDetail = (motorbikeId: number) => {
        navigate(`/motorbike/${motorbikeId}`);
    };
    console.log(motorbikeByStoreId);

    useEffect(() => {
        dispatch(clearMotor())
        dispatch(getMotorByStoreId({ storeId: Number(storeId) }));
    }, [dispatch, storeId]);


    const handleOpenDialog = (motorbikeId: number) => {
        setMotorbikeIdForDialog(motorbikeId);
        setOpenDialog(true);
        console.log(motorbikeId)
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
    const handleAddToWishList = (motorId: number) => {
        dispatch(addToWishList({ motorId: motorId }))
    }

    return (
        <Box
            sx={{
                flexGrow: 1,
                margin: '0 48px 0 48px',
            }}
        >
            {motorbikeByStoreId && motorbikeByStoreId.length === 0 ? (
                <>
                    <Container>
                        <Paper elevation={3} sx={{ padding: 2 }}>
                            Cửa hàng này chưa có xe.
                        </Paper>
                    </Container>
                </>
            ) : (
                <>
                    <Grid container spacing={2} className="product-grid">
                        {motorbikeByStoreId &&
                            motorbikeByStoreId.map((motor) => (
                                <>
                                    {motor.motorStatus.motorStatusId === 1 && (
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
                                                            motor.motorId,
                                                        )
                                                    }
                                                >
                                                    {motor.motorbikeImages &&
                                                        motor.motorbikeImages
                                                            .length === 0 ? (
                                                        <>
                                                            <img
                                                                src="https://png.pngtree.com/element_origin_min_pic/16/10/21/277448a877a33e8d0efc778025291c86.jpg"
                                                                alt="Đây là ảnh sản phẩm"
                                                            />
                                                        </>
                                                    ) : (
                                                        <>
                                                            <img
                                                                src={
                                                                    motor
                                                                        .motorbikeImages[0]
                                                                        .imageLink
                                                                }
                                                                alt="Đây là ảnh sản phẩm"
                                                            />
                                                        </>
                                                    )}
                                                </div>
                                                <div className="product-information">
                                                    <Typography variant="h6">
                                                        {motor.motorName}
                                                    </Typography>
                                                    <Typography
                                                        color="red"
                                                        fontWeight="700"
                                                        fontSize="18px"
                                                    >
                                                        Giá:{' '}
                                                        {formatCurrency(
                                                            motor.price,
                                                        )}
                                                    </Typography>
                                                    <div className="product-info-content">
                                                        <Typography>
                                                            <strong>
                                                                Cửa Hàng:
                                                            </strong>{' '}
                                                            {
                                                                motor.store
                                                                    .storeName
                                                            }
                                                        </Typography>
                                                        <Typography>
                                                            <strong>
                                                                Loại Xe:{' '}
                                                            </strong>
                                                            {
                                                                motor.motorType
                                                                    .title
                                                            }
                                                        </Typography>
                                                        <Typography>
                                                            <strong>
                                                                Odo:{' '}
                                                            </strong>
                                                            {motor.odo} Km
                                                        </Typography>
                                                        {/* <Typography>
                                        <strong>Tình trạng: </strong>
                                        {motor.motorStatus.title}
                                    </Typography> */}
                                                        <Typography>
                                                            <strong>
                                                                Đăng ký mới:
                                                            </strong>{' '}
                                                            {new Date(
                                                                motor.year,
                                                            ).toLocaleDateString()}
                                                        </Typography>
                                                        {/* <Typography>
                                    <strong>Ngày đăng bài:</strong>{' '}
                                    {motor.postDate.toLocaleDateString()}
                                </Typography> */}
                                                    </div>
                                                </div>
                                                {account?.roleId === 4 && (
                                                    <div className="btn-style">
                                                        <Button
                                                            variant="outlined"
                                                            onClick={() =>
                                                                handleOpenDialog(motor.motorId)
                                                            }
                                                        >
                                                            Đặt lịch xem xe
                                                        </Button>
                                                        <Button
                                                            className="btn-favorite"
                                                            onClick={() => handleAddToWishList(motor.motorId)}
                                                        >
                                                            <FavoriteBorderOutlined />
                                                        </Button>
                                                    </div>
                                                )}
                                            </Item>
                                        </Grid>
                                    )}
                                </>
                            ))}
                    </Grid>
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

export default MotorbikeByStoreIdComponent;

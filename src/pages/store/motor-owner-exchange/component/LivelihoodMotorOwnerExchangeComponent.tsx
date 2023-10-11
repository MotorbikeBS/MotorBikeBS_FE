import React, { useEffect } from 'react';
import BookingDialog from '../../../customer/booking-dialog-component/BookingDialog';
import { Box, Button, Container, Grid, Paper, Typography } from '@mui/material';
import { Item } from '../style/style-root';
import { FavoriteBorderOutlined } from '@mui/icons-material';
import useFormatCurrency from '../../../../hooks/useFormatCurrency';
import { useNavigate } from 'react-router';
import {
    useAppDispatch,
    useAppSelector,
} from '../../../../services/store/store';
import { getAllOnStoreExchange } from '../../../../services/features/motorbikeSlice';

const LivelihoodMotorOwnerExchangeComponent = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { account } = useAppSelector((state) => state.account);
    const { motorbikesByOwner } = useAppSelector((state) => state.motorbikes);

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
        dispatch(getAllOnStoreExchange());
    }, [dispatch]);

    const handleOpenDialog = (motorbikeId: number) => {
        setMotorbikeIdForDialog(motorbikeId);
        setOpenDialog(true);
        console.log(motorbikeId);
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

    const motorbikesLivelihoodByOwner = motorbikesByOwner?.filter(
        (motor) => motor.motorStatus.motorStatusId === 5,
    );

    return (
        <Box
            sx={{
                flexGrow: 1,
                margin: '0 48px 0 48px',
            }}
        >
            {motorbikesLivelihoodByOwner &&
            motorbikesLivelihoodByOwner.length === 0 ? (
                <>
                    <Container className="wishlist-container-notFound">
                        <Paper elevation={3} sx={{ padding: 2 }}>
                            <Typography variant='h5'>
                                Sàn xe hiện không có bài đăng nào.
                            </Typography>
                        </Paper>
                    </Container>
                </>
            ) : (
                <>
                    <Grid container spacing={2} className="product-grid">
                        {motorbikesLivelihoodByOwner &&
                            motorbikesLivelihoodByOwner.map((motor) => (
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
                                            motor.motorbikeImages.length ===
                                                0 ? (
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
                                                {formatCurrency(motor.price)}
                                            </Typography>
                                            <div className="product-info-content">
                                                <Typography>
                                                    <strong>Người dùng:</strong>{' '}
                                                    {motor.owner.userName}
                                                </Typography>
                                                <Typography>
                                                    <strong>Loại Xe: </strong>
                                                    {motor.motorType.title}
                                                </Typography>
                                                <Typography>
                                                    <strong>Odo: </strong>
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
                                        {/* {account?.roleId === 4 && ( */}
                                        <div className="btn-style-1">
                                            <Button
                                                variant="outlined"
                                                onClick={() =>
                                                    handleOpenDialog(
                                                        motor.motorId,
                                                    )
                                                }
                                            >
                                                Đặt lịch xem xe
                                            </Button>
                                            {/* <Button className="btn-favorite">
                                                  <FavoriteBorderOutlined />
                                              </Button> */}
                                        </div>
                                        {/*  )} */}
                                    </Item>
                                </Grid>
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

export default LivelihoodMotorOwnerExchangeComponent;

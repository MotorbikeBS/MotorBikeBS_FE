import React, { useEffect, useState } from 'react';
import {
    Box,
    Button,
    CircularProgress,
    Container,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    Paper,
    Typography,
} from '@mui/material';
import { Item } from '../style/style-root';
import useFormatCurrency from '../../../../hooks/useFormatCurrency';
import { useNavigate } from 'react-router';
import {
    useAppDispatch,
    useAppSelector,
} from '../../../../services/store/store';
import {
    clearMotor,
    getAllOnStoreExchange,
} from '../../../../services/features/motorbike/motorbikeSlice';
import NegotiationDialog from '../../negotiation-modal-store/NegotiationDialog';
import { acceptDefaultPrice } from '../../../../services/features/negotiation/negotiationSlice';

const LivelihoodMotorOwnerExchangeComponent = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { motorbikesByOwner, loading } = useAppSelector(
        (state) => state.motorbikes,
    );

    const [isOpenPriceDefaultDialog, setIsOpenPriceDefaultDialog] =
        useState(false);
    const [motorbikeIdForBuyDialog, setMotorbikeIdForBuyDialog] = useState<
        number | null
    >(null);

    // const [isOpenDialog, setOpenDialog] = React.useState(false);
    // const [isOpenSubmitDialog, setIsOpenSubmitDialog] = React.useState(false);
    // const [isOpenCancelDialog, setIsOpenCancelDialog] = React.useState(false);
    // const [motorbikeIdForDialog, setMotorbikeIdForDialog] = React.useState<
    //     number | null
    // >(null);

    const [isOpenDialogNego, setOpenDialogNego] = React.useState(false);
    const [isOpenSubmitDialogNego, setIsOpenSubmitDialogNego] =
        React.useState(false);
    const [isOpenCancelDialogNego, setIsOpenCancelDialogNego] =
        React.useState(false);
    const [motorbikeIdForDialogNego, setMotorbikeIdForDialogNego] =
        React.useState<number | null>(null);
    const formatCurrency = useFormatCurrency();

    const handleNavigateDetail = (motorbikeId: number) => {
        navigate(`/motorbike/${motorbikeId}`);
    };

    useEffect(() => {
        dispatch(clearMotor());
        dispatch(getAllOnStoreExchange());
    }, [dispatch]);

    //Nego
    const handleOpenDialogNego = (motorId: number) => {
        setMotorbikeIdForDialogNego(motorId);
        setOpenDialogNego(true);
    };
    const handleOpenDialogPriceDefault = (motorId: number) => {
        setMotorbikeIdForBuyDialog(motorId);
        setIsOpenPriceDefaultDialog(true);
    };
    const handleAcceptDefaultPrice = (motorId: number | null) => {
        if (motorId !== null) {
            dispatch(acceptDefaultPrice({ motorId }));
            setIsOpenPriceDefaultDialog(false);
        }
    };
    const handleCloseDialogNego = () => {
        setOpenDialogNego(false);
        setIsOpenSubmitDialogNego(false);
        setIsOpenCancelDialogNego(false);
    };
    const handleCloseDialogPriceDefault = () => {
        setIsOpenPriceDefaultDialog(false);
    };
    const handleOpenSubmitDialogNego = () => {
        setIsOpenSubmitDialogNego(true);
    };
    const handleCloseSubmitDialogNego = () => {
        setIsOpenSubmitDialogNego(false);
    };
    const handleOpenCancelDialogNego = () => {
        setIsOpenCancelDialogNego(true);
    };
    const handleCloseCancelDialogNego = () => {
        setIsOpenCancelDialogNego(false);
    };
    const motorbikesLivelihoodByOwner = motorbikesByOwner?.filter(
        (motor) => motor.motorStatus?.motorStatusId === 5,
    );

    return (
        <Box
            sx={{
                flexGrow: 1,
                margin: '0 48px 0 48px',
            }}
        >
            {loading === true ? (
                <Box textAlign='center'>
                    <CircularProgress />
                </Box>
            ) : (
                <>
                    {motorbikesLivelihoodByOwner &&
                    motorbikesLivelihoodByOwner.length === 0 ? (
                        <>
                            <Container className="wishlist-container-notFound">
                                <Paper elevation={3} sx={{ padding: 2 }}>
                                    <Typography variant="h5">
                                        Sàn xe hiện không có bài đăng nào.
                                    </Typography>
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
                                                        {motor?.motorName}
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
                                                                Người dùng:
                                                            </strong>{' '}
                                                            {
                                                                motor.owner
                                                                    .userName
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
                                                {/* {account?.roleId === 4 && ( */}
                                                <Box
                                                    sx={{
                                                        display: 'flex',
                                                        flexDirection: 'row',
                                                        justifyContent:
                                                            'space-around',
                                                        margin: '6px 0px 6px 0px ',
                                                        maxWidth: '100%',
                                                    }}
                                                >
                                                    <Button
                                                        color="success"
                                                        variant="contained"
                                                        size="small"
                                                        onClick={() =>
                                                            handleOpenDialogNego(
                                                                motor.motorId,
                                                            )
                                                        }
                                                    >
                                                        Thương lượng
                                                    </Button>
                                                    <Button
                                                        size="small"
                                                        color="warning"
                                                        variant="contained"
                                                        onClick={() =>
                                                            handleOpenDialogPriceDefault(
                                                                motor.motorId,
                                                            )
                                                        }
                                                    >
                                                        Mua giá mặc định
                                                    </Button>
                                                </Box>
                                                {/*  )} */}
                                            </Item>
                                        </Grid>
                                    ))}
                            </Grid>
                        </>
                    )}
                </>
            )}

            <NegotiationDialog
                openNego={isOpenDialogNego}
                openSubmitNego={isOpenSubmitDialogNego}
                openCancelNego={isOpenCancelDialogNego}
                onOpenSubmitDialogNego={handleOpenSubmitDialogNego}
                onCloseSubmitDialogNego={handleCloseSubmitDialogNego}
                onOpenCancelDialogNego={handleOpenCancelDialogNego}
                onCloseCancelDialogNego={handleCloseCancelDialogNego}
                onClose={handleCloseDialogNego}
                motorIdNego={motorbikeIdForDialogNego}
            />
            <Dialog
                open={isOpenPriceDefaultDialog}
                onClose={handleCloseDialogPriceDefault}
            >
                <DialogTitle>Mua với giá hiện tại</DialogTitle>
                <DialogContent>
                    <Typography>
                        Bạn có chắc muốn mua với giá hiện tại?
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={handleCloseDialogPriceDefault}
                        color="error"
                    >
                        Hủy
                    </Button>
                    <Button
                        onClick={() =>
                            handleAcceptDefaultPrice(motorbikeIdForBuyDialog)
                        }
                        color="success"
                    >
                        Xác nhận
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default LivelihoodMotorOwnerExchangeComponent;

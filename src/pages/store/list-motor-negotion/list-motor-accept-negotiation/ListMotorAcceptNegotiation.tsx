import React, { useEffect } from 'react';
import { useNavigate } from 'react-router';
import {
    Box,
    Button,
    CircularProgress,
    Container,
    Grid,
    Paper,
    Typography,
} from '@mui/material';
import BookingAcceptNegotiationDialog from './booking-accept-negotiatin-dialog/BookingAcceptNegotiationDialog';
import useFormatCurrency from '../../../../hooks/useFormatCurrency';
import {
    useAppDispatch,
    useAppSelector,
} from '../../../../services/store/store';
import {
    clearNegotiation,
    getNegotiationRequest,
} from '../../../../services/features/negotiation/negotiationSlice';
import { Item } from '../../motor-owner-exchange/style/style-root';
import './style/_style.scss';

const ListMotorAcceptNegotiation = () => {
    const navigate = useNavigate();
    const formatCurrency = useFormatCurrency();

    const dispatch = useAppDispatch();
    const { negotiations, loading } = useAppSelector(
        (state) => state.negotiation,
    );

    const [negotiationIdForDialog, setNegotiationIdForDialog] = React.useState<
        number | null
    >(null);
    const [isOpenBookingDialog, setOpenBookingDialog] = React.useState(false);
    const [isOpenSubmitDialog, setIsOpenSubmitDialog] = React.useState(false);
    const [isOpenCancelDialog, setIsOpenCancelDialog] = React.useState(false);

    useEffect(() => {
        dispatch(clearNegotiation());
        dispatch(getNegotiationRequest());
    }, [dispatch]);

    const acceptPriceNegotiation = negotiations?.filter(
        (nego) => nego.negotiations[0]?.status === 'ACCEPT',
    );

    const handleNavigateDetail = (negotiationId: number) => {
        navigate(`/negotiation/detail/${negotiationId}`);
    };

    const handleOpenBookingDialog = (negotiationId: number) => {
        setNegotiationIdForDialog(negotiationId);
        setOpenBookingDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenBookingDialog(false);
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
                    {acceptPriceNegotiation &&
                    acceptPriceNegotiation.length === 0 ? (
                        <>
                            <Container className="accept-negotiation-notFound">
                                <Paper elevation={3} sx={{ padding: 2 }}>
                                    <Typography variant="h5">
                                        Chưa có xe mà bạn có thể tiến hành mua
                                        bán
                                    </Typography>
                                </Paper>
                            </Container>
                        </>
                    ) : (
                        <>
                            <Grid
                                container
                                spacing={2}
                                className="product-grid-accept-negotiation"
                            >
                                {acceptPriceNegotiation &&
                                    acceptPriceNegotiation.map((negoMoto) => (
                                        <Grid
                                            item
                                            xs={12}
                                            sm={6}
                                            md={4}
                                            lg={3}
                                            key={negoMoto?.motorId}
                                        >
                                            <Item className="product-item-accept-negotiation">
                                                <div
                                                    className="product-image-accept-negotiation"
                                                    onClick={() =>
                                                        handleNavigateDetail(
                                                            negoMoto
                                                                .negotiations[0]
                                                                .negotiationId,
                                                        )
                                                    }
                                                >
                                                    {negoMoto.motor
                                                        ?.motorbikeImages &&
                                                    negoMoto.motor
                                                        ?.motorbikeImages
                                                        .length === 0 ? (
                                                        <>
                                                            <img
                                                                src="https://png.pngtree.com/element_origin_min_pic/16/10/21/277448a877a33e8d0efc778025291c86.jpg"
                                                                alt="Đây là ảnh sản phẩm"
                                                            />
                                                        </>
                                                    ) : (
                                                        <img
                                                            src={
                                                                negoMoto.motor
                                                                    ?.motorbikeImages[0]
                                                                    ?.imageLink
                                                            }
                                                            alt="Đây là ảnh sản phẩm"
                                                        />
                                                    )}
                                                </div>
                                                <div className="product-information-accept-negotiation">
                                                    <Typography variant="h6">
                                                        {
                                                            negoMoto.motor
                                                                ?.motorName
                                                        }
                                                    </Typography>
                                                    <Typography
                                                        color="red"
                                                        fontWeight="700"
                                                        fontSize="18px"
                                                    >
                                                        Giá:{' '}
                                                        {formatCurrency(
                                                            negoMoto
                                                                .negotiations[0]
                                                                ?.finalPrice,
                                                        )}
                                                    </Typography>
                                                    <div className="info-content-accept-negotiation">
                                                        <Typography>
                                                            <strong>
                                                                Người dùng:
                                                            </strong>{' '}
                                                            {
                                                                negoMoto
                                                                    .receiver
                                                                    ?.userName
                                                            }
                                                        </Typography>
                                                        <Typography>
                                                            <strong>
                                                                Loại Xe:{' '}
                                                            </strong>
                                                            {
                                                                negoMoto.motor
                                                                    ?.motorType
                                                                    ?.title
                                                            }
                                                        </Typography>
                                                        <Typography>
                                                            <strong>
                                                                Odo:{' '}
                                                            </strong>
                                                            {
                                                                negoMoto.motor
                                                                    ?.odo
                                                            }{' '}
                                                            Km
                                                        </Typography>

                                                        <Typography>
                                                            <strong>
                                                                Đăng ký mới:
                                                            </strong>{' '}
                                                            {new Date(
                                                                negoMoto.motor?.year,
                                                            ).toLocaleDateString(
                                                                'vi-VN',
                                                                {
                                                                    year: 'numeric',
                                                                    month: '2-digit',
                                                                    day: '2-digit',
                                                                },
                                                            )}
                                                        </Typography>
                                                        <Typography>
                                                            <strong>
                                                                Ngày thỏa thuận:
                                                            </strong>{' '}
                                                            {new Date(
                                                                negoMoto.negotiations[0]?.startTime,
                                                            ).toLocaleDateString(
                                                                'vi-VN',
                                                                {
                                                                    year: 'numeric',
                                                                    month: '2-digit',
                                                                    day: '2-digit',
                                                                },
                                                            )}
                                                        </Typography>
                                                        <Typography>
                                                            <strong>
                                                                Thỏa thuận thông
                                                                qua:
                                                            </strong>{' '}
                                                            {new Date(
                                                                negoMoto.negotiations[0]?.endTime,
                                                            ).toLocaleDateString(
                                                                'vi-VN',
                                                                {
                                                                    year: 'numeric',
                                                                    month: '2-digit',
                                                                    day: '2-digit',
                                                                },
                                                            )}
                                                        </Typography>
                                                    </div>
                                                </div>
                                                <div className="btn-style-booking">
                                                    <Button
                                                        color="success"
                                                        size="small"
                                                        variant="contained"
                                                        onClick={() =>
                                                            handleOpenBookingDialog(
                                                                negoMoto
                                                                    .negotiations[0]
                                                                    .negotiationId,
                                                            )
                                                        }
                                                    >
                                                        Đặt lịch xem xe
                                                    </Button>
                                                </div>
                                            </Item>
                                        </Grid>
                                    ))}
                            </Grid>
                        </>
                    )}
                </>
            )}

            <BookingAcceptNegotiationDialog
                open={isOpenBookingDialog}
                openSubmit={isOpenSubmitDialog}
                openCancel={isOpenCancelDialog}
                onOpenSubmitDialog={handleOpenSubmitDialog}
                onCloseSubmitDialog={handleCloseSubmitDialog}
                onOpenCancelDialog={handleOpenCancelDialog}
                onCloseCancelDialog={handleCloseCancelDialog}
                onClose={handleCloseDialog}
                negotiationId={negotiationIdForDialog}
            />
        </Box>
    );
};

export default ListMotorAcceptNegotiation;

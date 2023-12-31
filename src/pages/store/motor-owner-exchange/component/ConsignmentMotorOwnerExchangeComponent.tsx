import React, { useEffect } from 'react';
import {
    Box,
    Button,
    CircularProgress,
    Container,
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
import ValuationDialog from '../../valuation-dialog-store/ValuationDialog';

const ConsignmentMotorOwnerExchangeComponent = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const { motorbikesByOwner, loading } = useAppSelector(
        (state) => state.motorbikes,
    );
    const [isOpenDialogValuation, setOpenDialogValuation] = React.useState(false);
    const [isOpenSubmitDialogValuation, setIsOpenSubmitDialogValuation] =
        React.useState(false);
    const [isOpenCancelDialogValuation, setIsOpenCancelDialogValuation] =
        React.useState(false);
    const [motorbikeIdForDialogValuation, setMotorbikeIdForValuation] =
        React.useState<number | null>(null);

    const formatCurrency = useFormatCurrency();

    const handleNavigateDetail = (motorbikeId: number) => {
        navigate(`/motorbike/${motorbikeId}`);
    };

    useEffect(() => {
        dispatch(clearMotor());
        dispatch(getAllOnStoreExchange({ pageNumber: 1, pageSize: 10 }));
    }, [dispatch]);


    const handleOpenDialogValuation = (motorId: number) => {
        setMotorbikeIdForValuation(motorId);
        setOpenDialogValuation(true);
    };




    const handleCloseDialogValuation = () => {
        setOpenDialogValuation(false);
        setIsOpenSubmitDialogValuation(false);
        setIsOpenCancelDialogValuation(false);
    };


    const handleOpenSubmitDialogNego = () => {
        setIsOpenSubmitDialogValuation(true);
    };





    const handleCloseSubmitDialogNego = () => {
        setIsOpenSubmitDialogValuation(false);
    };


    const handleOpenCancelDialogNego = () => {
        setIsOpenCancelDialogValuation(true);
    };

    const handleCloseCancelDialogNego = () => {
        setIsOpenCancelDialogValuation(false);
    };

    const motorbikesConsignmentByOwner = motorbikesByOwner?.filter(
        (motor) => motor.motorStatus?.motorStatusId === 4,
    );

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
                    {motorbikesConsignmentByOwner &&
                        motorbikesConsignmentByOwner.length === 0 ? (
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
                                {motorbikesConsignmentByOwner &&
                                    motorbikesConsignmentByOwner.map(
                                        (motor) => (
                                            <Grid
                                                item
                                                xs={12}
                                                sm={6}
                                                md={4}
                                                lg={3}
                                                key={motor?.motorId}
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
                                                        {motor?.motorbikeImages &&
                                                            motor?.motorbikeImages
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
                                                                            ?.motorbikeImages[0]
                                                                            ?.imageLink
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
                                                                motor?.price,
                                                            )}
                                                        </Typography>
                                                        <div className="product-info-content">
                                                            <Typography>
                                                                <strong>
                                                                    Người dùng:
                                                                </strong>{' '}
                                                                {
                                                                    motor?.owner
                                                                        ?.userName
                                                                }
                                                            </Typography>
                                                            <Typography>
                                                                <strong>
                                                                    Loại Xe:{' '}
                                                                </strong>
                                                                {
                                                                    motor
                                                                        ?.motorType
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
                                                                    Ngày đăng
                                                                    bài:
                                                                </strong>{' '}
                                                                {new Date(
                                                                    motor?.postingAt,
                                                                ).toLocaleDateString(
                                                                    'vi-VN',
                                                                )}
                                                            </Typography>
                                                        </div>
                                                    </div>
                                                    <Box
                                                        sx={{
                                                            display: 'flex',
                                                            flexDirection:
                                                                'row',
                                                            justifyContent:
                                                                'space-around',
                                                            margin: '6px 0px 6px 0px ',
                                                        }}
                                                    >
                                                        <Button
                                                            color="success"
                                                            variant="contained"
                                                            size="small"
                                                            onClick={() =>
                                                                handleOpenDialogValuation(
                                                                    motor?.motorId,
                                                                )
                                                            }
                                                        >
                                                            Tạo thương lượng
                                                        </Button>

                                                    </Box>
                                                </Item>
                                            </Grid>
                                        ),
                                    )}
                            </Grid>
                        </>
                    )}
                </>
            )}

            <ValuationDialog
                openValuation={isOpenDialogValuation}
                openSubmitValuation={isOpenSubmitDialogValuation}
                openCancelValuation={isOpenCancelDialogValuation}
                onOpenSubmitDialogValuation={handleOpenSubmitDialogNego}
                onCloseSubmitDialogValuation={handleCloseSubmitDialogNego}
                onOpenCancelDialogValuation={handleOpenCancelDialogNego}
                onCloseCancelDialogValuation={handleCloseCancelDialogNego}
                onClose={handleCloseDialogValuation}
                motorIdValuation={motorbikeIdForDialogValuation}
            />

        </Box>
    );
};

export default ConsignmentMotorOwnerExchangeComponent;

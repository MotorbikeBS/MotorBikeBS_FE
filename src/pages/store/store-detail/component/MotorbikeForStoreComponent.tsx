import {
    Box,
    CircularProgress,
    Container,
    Grid,
    Paper,
    Typography,
} from '@mui/material';
import React, { useEffect } from 'react';
import {
    useAppDispatch,
    useAppSelector,
} from '../../../../services/store/store';
import { Item } from '../../../customer/motorbike-component/style/style-root';
import { useNavigate } from 'react-router';
import useFormatCurrency from '../../../../hooks/useFormatCurrency';
import {
    clearMotor,
    getMotorByStoreId,
} from '../../../../services/features/motorbike/motorbikeSlice';

const MotorbikeForStoreComponent = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const formatCurrency = useFormatCurrency();

    const { motorbikeByStoreId, loading } = useAppSelector(
        (state) => state.motorbikes,
    );
    const { user } = useAppSelector((state) => state.users);

    useEffect(() => {
        dispatch(clearMotor());
        dispatch(
            getMotorByStoreId({
                storeId: Number(user?.storeDescriptions[0]?.storeId),
            }),
        );
    }, [dispatch, user]);

    const motorbikeByStoreIdFIlter =
        motorbikeByStoreId &&
        motorbikeByStoreId?.filter(
            (motor) =>
                motor?.motorStatus.motorStatusId === 1 ||
                motor?.motorStatus.motorStatusId === 4 ||
                motor?.motorStatus.motorStatusId === 5,
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
                    {motorbikeByStoreIdFIlter &&
                        motorbikeByStoreIdFIlter.length === 0 ? (
                        <>
                            <Container>
                                <Paper elevation={3} sx={{ padding: 2 }}>
                                    Cửa hàng này chưa có xe.
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
                                {motorbikeByStoreIdFIlter &&
                                    motorbikeByStoreIdFIlter.map((motor) => (
                                        <>
                                            {/* {motor.motorStatus.motorStatusId === 1 && ( */}
                                            <Grid
                                                item
                                                xs={12}
                                                sm={6}
                                                md={4}
                                                lg={3}
                                                key={motor.motorId}
                                            >
                                                <Item className="product-item">
                                                    <div className="product-image">
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
                                                    <div className="tag-motor-status">
                                                        <Typography variant="subtitle1">
                                                            {motor?.motorStatus
                                                                ?.motorStatusId ===
                                                                1
                                                                ? 'CÓ SẴN'
                                                                : motor
                                                                    ?.motorStatus
                                                                    ?.motorStatusId ===
                                                                    4
                                                                    ? 'KÍ GỬI'
                                                                    : motor
                                                                        ?.motorStatus
                                                                        ?.motorStatusId ===
                                                                        5
                                                                        ? 'KHÔNG KÍ GỬI'
                                                                        : 'CHƯA XÁC ĐỊNH'}
                                                        </Typography>
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
                                                                    motor
                                                                        .motorType
                                                                        .title
                                                                }
                                                            </Typography>
                                                            <Typography>
                                                                <strong>
                                                                    Odo:{' '}
                                                                </strong>
                                                                {motor.odo} Km
                                                            </Typography>
                                                            <Typography>
                                                                <strong>
                                                                    Đăng ký mới:
                                                                </strong>{' '}
                                                                {new Date(
                                                                    motor.year,
                                                                ).toLocaleDateString()}
                                                            </Typography>
                                                        </div>
                                                    </div>
                                                </Item>
                                            </Grid>
                                        </>
                                    ))}
                            </Grid>
                        </>
                    )}
                </>
            )}
        </Box>
    );
};

export default MotorbikeForStoreComponent;

import React from 'react';
import {
    Box,
    Button,
    Container,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Typography,
} from '@mui/material';
import {
    FmdGoodOutlined,
    MonetizationOnOutlined,
    Phone,
    Accessibility,
} from '@mui/icons-material';
import { useParams } from 'react-router';
import {
    useAppSelector,
} from '../../../../services/store/store';
import useFormatCurrency from '../../../../hooks/useFormatCurrency';
import Carousel from 'react-material-ui-carousel';
import { INegotiation } from '../../../../models/Negotiation/Negotiation';
import './style/_style.scss'
import BookingAcceptNegotiationDialog from '../list-motor-negotion/list-motor-accept-negotiation/booking-accept-negotiatin-dialog/BookingAcceptNegotiationDialog';

type motorbikeParams = {
    negotiationId: number;
};

const OwnerMotorAcceptNegotiationDetailComponent = () => {
    const formatPrice = useFormatCurrency();

    const { negotiationId } = useParams<motorbikeParams | any>();
    const { negotiations } = useAppSelector(state => state.negotiation)

    const [negotiationIdForDialog, setNegotiationIdForDialog] = React.useState<
        number | null
    >(null);
    const [isOpenBookingDialog, setOpenBookingDialog] = React.useState(false);
    const [isOpenSubmitDialog, setIsOpenSubmitDialog] = React.useState(false);
    const [isOpenCancelDialog, setIsOpenCancelDialog] = React.useState(false);

    // useEffect(() => {
    //     if (negotiation) {
    //         dispatch(getMotorModelById({ id: Number(negotiation?.motor?.modelId) }));
    //     }
    // }, [dispatch, negotiation]);

    if (!negotiationId) {
        return (
            <Container>
                <Paper elevation={3} sx={{ padding: 2 }}>
                    Xe máy không tồn tại
                </Paper>
            </Container>
        );
    }

    if (!negotiations) {
        return (
            <Container>
                <Paper elevation={3} sx={{ padding: 2 }}>
                    Loading... Chờ chút
                </Paper>
            </Container>
        );
    }


    const negoMotorDetails = negotiations.find(
        (mt: INegotiation) => mt.negotiations[0].negotiationId === Number(negotiationId),
    );

    if (!negoMotorDetails) {
        return (
            <Container>
                <Paper elevation={3} sx={{ padding: 2 }}>
                    Xe máy không tồn tại
                </Paper>
            </Container>
        );
    }

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
        <Container>
            <Box
                margin="20px 0 20px 0px"
                display="flex"
                justifyContent="space-between"
            >
                <Box
                    flexGrow={6}
                    flexDirection="column"
                    maxWidth="50%"
                    marginRight="40px"
                >
                    <Box flexGrow={4} marginBottom="30px">
                        <Carousel>
                            {negoMotorDetails.motor.motorbikeImages &&
                                negoMotorDetails.motor.motorbikeImages.length > 0 ? (
                                negoMotorDetails.motor.motorbikeImages.map((image) => (
                                    <div
                                        className="nego-motorbike-detail-images"
                                        key={image.imageId}
                                    >
                                        <img
                                            src={image?.imageLink}
                                            alt={`Hình ảnh thêm ${image.imageId}`}
                                        />
                                    </div>
                                ))
                            ) : negoMotorDetails.motor.motorbikeImages ? (
                                <div className="nego-motorbike-detail-images">
                                    <img
                                        src={
                                            negoMotorDetails?.motor?.motorbikeImages[0]
                                                ?.imageLink
                                        }
                                        alt={`Hình ảnh`}
                                    />
                                </div>
                            ) : null}
                        </Carousel>

                        <div className="nego-information-detail-motorbike">
                            <Typography
                                variant="h5"
                                fontWeight="bold"
                                margin="10px 0 20px 0"
                            >
                                {negoMotorDetails.motor.motorName}
                            </Typography>

                            <div className="nego-icon-infomation">
                                <MonetizationOnOutlined />
                                <Typography
                                    variant="h6"
                                    textAlign="left"
                                    color="red"
                                    fontWeight="bold"
                                >
                                    {formatPrice(negoMotorDetails.negotiations[0].finalPrice)}
                                </Typography>
                            </div>

                            <div className="nego-icon-infomation">
                                <Accessibility />
                                <div className="nego-store-detail-navigate">
                                    <Typography>
                                        {negoMotorDetails.receiver?.userName}
                                    </Typography>
                                </div>
                            </div>
                            <div className="nego-icon-infomation">
                                <Phone />
                                <Typography variant="body1">
                                    {negoMotorDetails.receiver?.phone}
                                </Typography>
                            </div>
                            <div className="nego-icon-infomation">
                                <FmdGoodOutlined />
                                <Typography variant="body1">
                                    {negoMotorDetails.receiver?.address}
                                </Typography>
                            </div>
                        </div>
                    </Box>
                    <Box flexGrow={2}>
                        <Typography
                            variant="h6"
                            fontWeight="bold"
                            marginBottom="10px"
                        >
                            Mô tả chi tiết:
                        </Typography>
                        <Typography>{negoMotorDetails.motor?.description}</Typography>
                    </Box>
                </Box>

                <Box flexGrow={4}>
                    <Box flexGrow={10}>
                        <Typography
                            variant="h5"
                            fontWeight="bold"
                            marginBottom="10px"
                            alignContent="center"
                            className="nn"
                        >
                            Thông số kỹ thuật:
                        </Typography>
                        <TableContainer component={Paper}>
                            <Table>
                                <TableBody>
                                    <TableRow>
                                        <TableCell className="nego-header-table">
                                            Hãng xe
                                        </TableCell>
                                        <TableCell>
                                            chưa get
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell
                                            style={{ fontWeight: 'bold' }}
                                        >
                                            Năm đăng ký
                                        </TableCell>
                                        <TableCell>
                                            {new Date(
                                                negoMotorDetails.motor.year,
                                            ).toLocaleDateString()}
                                        </TableCell>
                                    </TableRow>

                                    <TableRow>
                                        <TableCell className="nego-header-table">
                                            Model
                                        </TableCell>
                                        <TableCell>
                                            Chưa get
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="nego-header-table">
                                            Số Km đã đi
                                        </TableCell>
                                        <TableCell>{negoMotorDetails.motor.odo}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="nego-header-table">
                                            Loại Xe
                                        </TableCell>
                                        <TableCell>
                                            {negoMotorDetails.motor.motorType.title}
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="nego-header-table">
                                            Xuất Xứ
                                        </TableCell>
                                        <TableCell>Việt Nam</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-around',
                            margin: '24px 0px 6px 0px ',
                        }}
                    >

                        <Button
                            size="large"
                            color="success"
                            variant="contained"
                            onClick={() =>
                                handleOpenBookingDialog(negoMotorDetails?.negotiations[0].negotiationId)
                            }
                        >
                            Đặt lịch xem xe
                        </Button>
                    </Box>
                </Box>
            </Box>

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
        </Container>
    );
};

export default OwnerMotorAcceptNegotiationDetailComponent;

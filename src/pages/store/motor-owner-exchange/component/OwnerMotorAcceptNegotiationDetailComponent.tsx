import React, { useEffect, useState } from 'react';
import {
    Box,
    Button,
    Container,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
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
    useAppDispatch,
    useAppSelector,
} from '../../../../services/store/store';
import useFormatCurrency from '../../../../hooks/useFormatCurrency';
import Carousel from 'react-material-ui-carousel';
import BookingDialog from '../../../customer/booking-dialog-component/BookingDialog';
import NegotiationDialog from '../../negotiation-modal-store/NegotiationDialog';
import { acceptDefaultPrice } from '../../../../services/features/negotiation/negotiationSlice';
import { INegotiation } from '../../../../models/Negotiation/Negotiation';
import './style/_style.scss'
import { getMotorModelById } from '../../../../services/features/motorbike/motorFields';

type motorbikeParams = {
    motorbikeId: number;
};

const OwnerMotorAcceptNegotiationDetailComponent = () => {
    const dispatch = useAppDispatch();
    const { motorbikeId } = useParams<motorbikeParams | any>();
    const { negotiations } = useAppSelector(state=>state.negotiation)
    const { motorModel } = useAppSelector(state=>state.motorFields)

    useEffect(() => {
        if (motorbike) {
            dispatch(getMotorModelById({ id: Number(motorbike.motor.modelId) }))
        }
    }, [dispatch]);

    const [isOpenPriceDefaultDialog, setIsOpenPriceDefaultDialog] =
        useState(false);
    const [motorbikeIdForBuyDialog, setMotorbikeIdForBuyDialog] = useState<
        number | null
    >(null);
    const [isOpenDialogNego, setOpenDialogNego] = React.useState(false);
    const [isOpenSubmitDialogNego, setIsOpenSubmitDialogNego] =
        React.useState(false);
    const [isOpenCancelDialogNego, setIsOpenCancelDialogNego] =
        React.useState(false);
    const [motorbikeIdForDialogNego, setMotorbikeIdForDialogNego] =
        React.useState<number | null>(null);

    const formatPrice = useFormatCurrency();

    // const handleOpenDialogNego = (motorId: number) => {
    //     setMotorbikeIdForDialogNego(motorId);
    //     setOpenDialogNego(true);
    // };
    // const handleOpenDialogPriceDefault = (motorId: number) => {
    //     setMotorbikeIdForBuyDialog(motorId);
    //     setIsOpenPriceDefaultDialog(true);
    // };

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

    const handleOpenSubmitDialogNego = () => {
        setIsOpenSubmitDialogNego(true);
    };
    const handleCloseDialogPriceDefault = () => {
        setIsOpenPriceDefaultDialog(false);
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

    if (!motorbikeId) {
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

  
    const motorbike = negotiations.find(
        (mt: INegotiation) => mt.motorId === Number(motorbikeId),
    );

    if (!motorbike) {
        return (
            <Container>
                <Paper elevation={3} sx={{ padding: 2 }}>
                    Xe máy không tồn tại
                </Paper>
            </Container>
        );
    }


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
                            {motorbike.motor.motorbikeImages &&
                            motorbike.motor.motorbikeImages.length > 0 ? (
                                motorbike.motor.motorbikeImages.map((image) => (
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
                            ) : motorbike.motor.motorbikeImages ? (
                                <div className="nego-motorbike-detail-images">
                                    <img
                                        src={
                                            motorbike.motor.motorbikeImages[0]
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
                                {motorbike.motor.motorName}
                            </Typography>
                          
                                <div className="nego-icon-infomation">
                                    <MonetizationOnOutlined />
                                    <Typography
                                        variant="h6"
                                        textAlign="left"
                                        color="red"
                                        fontWeight="bold"
                                    >
                                        {formatPrice(motorbike.negotiations[0].finalPrice)}
                                    </Typography>
                                </div>
                        
                            <div className="nego-icon-infomation">
                                <Accessibility />
                                <div className="nego-store-detail-navigate">
                                    <Typography>
                                        {motorbike.receiver?.userName}
                                    </Typography>
                                </div>
                            </div>
                            <div className="nego-icon-infomation">
                                <Phone />
                                <Typography variant="body1">
                                    {motorbike.receiver?.phone}
                                </Typography>
                            </div>
                            <div className="nego-icon-infomation">
                                <FmdGoodOutlined />
                                <Typography variant="body1">
                                    {motorbike.receiver?.address}
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
                        <Typography>{motorbike.motor?.description}</Typography>
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
                                            {motorModel?.brand.brandName}
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
                                                motorbike.motor.year,
                                            ).toLocaleDateString()}
                                        </TableCell>
                                    </TableRow>
                                
                                    <TableRow>
                                        <TableCell className="nego-header-table">
                                            Model
                                        </TableCell>
                                        <TableCell>
                                  
                                            {motorModel?.modelName}
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="nego-header-table">
                                            Số Km đã đi
                                        </TableCell>
                                        <TableCell>{motorbike.motor.odo}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="nego-header-table">
                                            Loại Xe
                                        </TableCell>
                                        <TableCell>
                                            {motorbike.motor.motorType.title}
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
                            // onClick={() =>
                            //     handleOpenDialogPriceDefault(motorbike.motorId)
                            // }
                        >
                            Đặt lịch xem xe
                        </Button>
                    </Box>     
                </Box>
            </Box>
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
        </Container>
    );
};

export default OwnerMotorAcceptNegotiationDetailComponent;

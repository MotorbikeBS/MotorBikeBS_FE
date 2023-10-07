import React, { useState } from 'react'
import { Box, Button, Container, Paper, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from '@mui/material';
import { FmdGoodOutlined, MonetizationOnOutlined, Phone, Accessibility } from '@mui/icons-material';
import { useParams } from 'react-router';
import { useAppSelector } from '../../../../services/store/store';
import useFormatCurrency from '../../../../hooks/useFormatCurrency';
import { IMotorbike } from '../../../../models/Motorbike/Motorbike';
import Carousel from 'react-material-ui-carousel';
import BookingDialog from '../../../customer/booking-dialog-component/BookingDialog';

type motorbikeParams = {
    motorbikeId: number;
};

const OwnerMotorDetailComponent = () => {

    const { motorbikeId } = useParams<motorbikeParams | any>();
    const { account } = useAppSelector((state) => state.account);
    const { motorbikesByOwner } = useAppSelector((state) => state.motorbikes);
    const [isOpenDialog, setOpenDialog] = useState(false);
    const [isOpenSubmitDialog, setIsOpenSubmitDialog] = useState(false);
    const [isOpenCancelDialog, setIsOpenCancelDialog] = useState(false);
    const [motorbikeIdForDialog, setMotorbikeIdForDialog] = React.useState<number | null>(null)

    const formatPrice = useFormatCurrency();

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
    if (!motorbikeId) {
        return (
            <Container>
                <Paper elevation={3} sx={{ padding: 2 }}>
                    Xe máy không tồn tại
                </Paper>
            </Container>
        );
    }

    if (!motorbikesByOwner) {
        return (
            <Container>
                <Paper elevation={3} sx={{ padding: 2 }}>
                    Loading... Chờ chút
                </Paper>
            </Container>
        );
    }
    const motorbike = motorbikesByOwner.find(
        (mt: IMotorbike) => mt.motorId === Number(motorbikeId),
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
                            {motorbike.motorbikeImages &&
                                motorbike.motorbikeImages.length > 0 ? (
                                motorbike.motorbikeImages.map((image) => (
                                    <div
                                        className="motorbike-detail-images"
                                        key={image.imageId}
                                    >
                                        <img
                                            src={image?.imageLink}
                                            alt={`Hình ảnh thêm ${image.imageId}`}
                                        />
                                    </div>
                                ))
                            ) : motorbike.motorbikeImages ? (
                                <div className="motorbike-detail-images">
                                    <img
                                        src={
                                            motorbike.motorbikeImages[0]
                                                ?.imageLink
                                        }
                                        alt={`Hình ảnh`}
                                    />
                                </div>
                            ) : null}
                        </Carousel>

                        <div className="information-detail-motorbike">
                            <Typography
                                variant="h5"
                                fontWeight="bold"
                                margin="10px 0 20px 0"
                            >
                                {motorbike.motorName}
                            </Typography>
                            <div className="icon-infomation">
                                <MonetizationOnOutlined />
                                <Typography
                                    variant="h6"
                                    textAlign="left"
                                    color="red"
                                    fontWeight="bold"
                                >
                                    {formatPrice(motorbike.price)}
                                </Typography>
                            </div>
                            <div className="icon-infomation">
                                <Accessibility />
                                <div
                                    className='store-detail-navigate'
                                >
                                    <Typography>
                                        {motorbike.owner.userName}
                                    </Typography>
                                </div>
                            </div>
                            <div className="icon-infomation">
                                <Phone />
                                <Typography variant="body1">
                                    {motorbike.owner?.phone}
                                </Typography>
                            </div>
                            <div className="icon-infomation">
                                <FmdGoodOutlined />
                                <Typography variant="body1">
                                    {motorbike.owner.address}
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
                        <Typography>{motorbike.description}</Typography>
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
                                        <TableCell className="header-table">
                                            Hãng xe
                                        </TableCell>
                                        <TableCell>
                                            {motorbike.model.brand.brandName}
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
                                                motorbike.year,
                                            ).toLocaleDateString()}
                                        </TableCell>
                                    </TableRow>
                                    {/* <TableRow>
                                        <TableCell className="header-table">
                                            Tình trạng
                                        </TableCell>
                                        <TableCell>
                                            {motorbike.status}
                                        </TableCell>
                                    </TableRow> */}
                                    {/* <TableRow>
                                        <TableCell className="header-table">
                                            Dung tích
                                        </TableCell>
                                        <TableCell>
                                            {motorbike.vehicleCapacity} cc
                                        </TableCell>
                                    </TableRow> */}
                                    <TableRow>
                                        <TableCell className="header-table">
                                            Model
                                        </TableCell>
                                        <TableCell>
                                            {motorbike.model.modelName}
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="header-table">
                                            Số Km đã đi
                                        </TableCell>
                                        <TableCell>{motorbike.odo}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="header-table">
                                            Loại Xe
                                        </TableCell>
                                        <TableCell>
                                            {motorbike.motorType.title}
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="header-table">
                                            Xuất Xứ
                                        </TableCell>
                                        <TableCell>Việt Nam</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>
                    {account?.roleId === 4 && (
                        <Box
                            flexGrow={2}
                            marginTop="10%"
                            maxWidth="50%"
                            marginLeft="26%"
                        >
                            <Button
                                variant="outlined"
                                onClick={() =>
                                    handleOpenDialog(motorbike.motorId)
                                }
                            >
                                Đặt lịch xem xe
                            </Button>
                        </Box>
                    )}
                </Box>
            </Box>
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
        </Container>
    );
}

export default OwnerMotorDetailComponent

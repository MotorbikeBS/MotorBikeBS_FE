import React from 'react'
import { Box, Button, Container, Paper, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from '@mui/material';
import { FmdGoodOutlined, MonetizationOnOutlined, Phone, Accessibility } from '@mui/icons-material';
import { useParams } from 'react-router';
import { useAppSelector } from '../../../../services/store/store';
import useFormatCurrency from '../../../../hooks/useFormatCurrency';
import { IMotorbike } from '../../../../models/Motorbike/Motorbike';
import Carousel from 'react-material-ui-carousel';
import NegotiationDialog from '../../valuation-dialog-store/ValuationDialog';
import './style/_style.scss'
import ValuationDialog from '../../valuation-dialog-store/ValuationDialog';

type motorbikeParams = {
    motorbikeId: number;
};

const OwnerMotorDetailComponent = () => {

    const { motorbikeId } = useParams<motorbikeParams | any>();
    const { motorbikesByOwner } = useAppSelector((state) => state.motorbikes);


    const [isOpenDialogValuation, setOpenDialogValuation] = React.useState(false);
    const [isOpenSubmitDialogValuation, setIsOpenSubmitDialogValuation] =
        React.useState(false);
    const [isOpenCancelDialogValuation, setIsOpenCancelDialogValuation] =
        React.useState(false);
    const [motorbikeIdForDialogValuation, setMotorbikeIdForDialogValuation] =
        React.useState<number | null>(null);


    const formatPrice = useFormatCurrency();

    const handleOpenDialogValuation = (motorId: number) => {
        setMotorbikeIdForDialogValuation(motorId);
        setOpenDialogValuation(true);
    };


    const handleCloseDialogValuation = () => {
        setOpenDialogValuation(false);
        setIsOpenSubmitDialogValuation(false);
        setIsOpenCancelDialogValuation(false);
    };

    const handleOpenSubmitDialogValuation = () => {
        setIsOpenSubmitDialogValuation(true);
    };


    const handleCloseSubmitDialogValuation = () => {
        setIsOpenSubmitDialogValuation(false);
    };
    const handleOpenCancelDialogValuation = () => {
        setIsOpenCancelDialogValuation(true);
    };
    const handleCloseCancelDialogValuation = () => {
        setIsOpenCancelDialogValuation(false);
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
                                        className="nego-motorbike-detail-images"
                                        key={image.imageId}
                                    >
                                        <img
                                            src={image?.imageLink}
                                            alt={`Hình ảnh thêm ${image.imageId}`}
                                        />
                                    </div>
                                ))
                            ) : motorbike.motorbikeImages ? (
                                <div className="nego-motorbike-detail-images">
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

                        <div className="nego-information-detail-motorbike">
                            <Typography
                                variant="h5"
                                fontWeight="bold"
                                margin="10px 0 20px 0"
                            >
                                {motorbike.motorName}
                            </Typography>
                            <div className="nego-icon-infomation">
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
                            <div className="nego-icon-infomation">
                                <Accessibility />
                                <div
                                    className='nego-store-detail-navigate'
                                >
                                    <Typography>
                                        {motorbike.owner.userName}
                                    </Typography>
                                </div>
                            </div>
                            <div className="nego-icon-infomation">
                                <Phone />
                                <Typography variant="body1">
                                    {motorbike.owner?.phone}
                                </Typography>
                            </div>
                            <div className="nego-icon-infomation">
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
                                        <TableCell className="nego-header-table">
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
                                    <TableRow>
                                        <TableCell className="nego-header-table">
                                            Model
                                        </TableCell>
                                        <TableCell>
                                            {motorbike.model.modelName}
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="nego-header-table">
                                            Số Km đã đi
                                        </TableCell>
                                        <TableCell>{motorbike.odo}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className="nego-header-table">
                                            Loại Xe
                                        </TableCell>
                                        <TableCell>
                                            {motorbike.motorType.title}
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
                            flexDirection:
                                'row',
                            justifyContent:
                                'space-around',
                            margin: '24px 0px 6px 0px ',
                        }}
                    >
                        <Button
                            color="success"
                            variant="contained"
                            size="large"
                            onClick={() =>
                                handleOpenDialogValuation(
                                    motorbike.motorId,
                                )
                            }
                        >
                            Tạo thương lượng
                        </Button>
                    </Box>
                    {/* )} */}
                </Box>
            </Box>
            <ValuationDialog
                openValuation={isOpenDialogValuation}
                openSubmitValuation={isOpenSubmitDialogValuation}
                openCancelValuation={isOpenCancelDialogValuation}
                onOpenSubmitDialogValuation={handleOpenSubmitDialogValuation}
                onCloseSubmitDialogValuation={handleCloseSubmitDialogValuation}
                onOpenCancelDialogValuation={handleOpenCancelDialogValuation}
                onCloseCancelDialogValuation={handleCloseCancelDialogValuation}
                onClose={handleCloseDialogValuation}
                motorIdValuation={motorbikeIdForDialogValuation}
            />

        </Container>
    );
}

export default OwnerMotorDetailComponent

import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { IMotorbike } from '../../pages/customer/Motorbike-components/model/Motorbike';
import motorbikes from '../../pages/customer/data/data';
import {
    Box,
    Typography,
    Container,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Button
} from '@mui/material';
import { MonetizationOnOutlined, StoreOutlined, FmdGoodOutlined } from '@mui/icons-material';
import './style/style.scss';
import Carousel from 'react-material-ui-carousel';

type motorbikeParams = {
    motorbikeId: number;
}

const MotorBikeDetailComponent = () => {
    const { motorbikeId } = useParams<motorbikeParams | any>();

    if (!motorbikeId) {
        return (
            <Container>
                <Paper elevation={3} sx={{ padding: 2 }}>
                    Xe máy không tồn tại
                </Paper>
            </Container>
        );
    }
    const motorbike = motorbikes.find((mt: IMotorbike) => mt.id === Number(motorbikeId));

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
                margin='20px 0 20px 0px'
                display='flex'
                justifyContent='space-between'
            >
                <Box
                    flexGrow={6}
                    flexDirection='column'
                    maxWidth='50%'
                    marginRight='40px'
                >
                    <Box flexGrow={4} marginBottom='30px'>

                        <Carousel>
                            {motorbike.images && motorbike.images.length > 0 ? (
                                [motorbike.image, ...motorbike.images].map((image, index) => (
                                    <div className='motorbike-detail-images' key={index}>
                                        <img src={image} alt={`Hình ảnh thêm ${index + 1}`} />
                                    </div>
                                ))
                            ) : motorbike.image ? (
                                <div className='motorbike-detail-images'>
                                    <img src={motorbike.image} alt={`Hình ảnh`} />
                                </div>
                            ) : null}
                        </Carousel>

                        <div className='information-detail-motorbike'>
                            <Typography
                                variant='h5'
                                fontWeight='bold'
                                margin='10px 0 20px 0'
                            >
                                {motorbike.name}</Typography>
                            <div className='icon-infomation'>
                                <MonetizationOnOutlined />
                                <Typography
                                    variant='h6'
                                    textAlign='left'
                                    color='red'
                                    fontWeight='bold'
                                >
                                    {motorbike.price} VND
                                </Typography>
                            </div>
                            <div className='icon-infomation'>
                                <StoreOutlined />
                                <Link to=''>
                                    <Typography
                                    >
                                        {motorbike.storeName}</Typography>
                                </Link>
                            </div>
                            <div className='icon-infomation'>
                                <FmdGoodOutlined />
                                <Typography variant='body1'>288/3 Man Thiện, Tăng Nhơn Phú A, Thành Phố Thủ Đức, Thành Phố HCM</Typography>
                            </div>
                        </div>
                    </Box>
                    <Box flexGrow={2} >
                        <Typography
                            variant='h6'
                            fontWeight='bold'
                            marginBottom='10px'
                        >
                            Mô tả chi tiết:
                        </Typography>
                        <Typography>
                            {motorbike.description}
                        </Typography>
                    </Box>

                </Box>

                <Box flexGrow={4}>
                    <Box flexGrow={10}>
                        <Typography
                            variant='h5'
                            fontWeight='bold'
                            marginBottom='10px'
                            alignContent='center'
                            className='nn'
                        >
                            Thông số kỹ thuật:
                        </Typography>
                        <TableContainer component={Paper}>
                            <Table>
                                <TableBody>
                                    <TableRow>
                                        <TableCell className='header-table'>Hãng xe</TableCell>
                                        <TableCell>{motorbike.brand}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell style={{ fontWeight: 'bold' }}>Năm đăng ký</TableCell>
                                        <TableCell>{motorbike.yearRegister.toLocaleDateString()}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className='header-table'>Tình trạng</TableCell>
                                        <TableCell>{motorbike.status}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className='header-table'>Dung tích</TableCell>
                                        <TableCell>{motorbike.vehicleCapacity} cc</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className='header-table'>Model</TableCell>
                                        <TableCell>{motorbike.model}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className='header-table'>Số Km đã đi</TableCell>
                                        <TableCell>{motorbike.odo}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className='header-table'>Loại Xe</TableCell>
                                        <TableCell>{motorbike.motorType}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell className='header-table'>Xuất Xứ</TableCell>
                                        <TableCell>Việt Nam</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>
                    <Box
                        flexGrow={2}
                        marginTop='10%'
                        maxWidth='50%'
                        marginLeft='26%'
                    >
                        <Button
                            variant="outlined"
                            sx={{
                                "&:hover": {
                                    background: "#ccd6e6",
                                    color: '#fff'
                                }
                            }}
                        >
                            Đặt lịch xem xe
                        </Button>
                    </Box>
                </Box>

            </Box>
        </Container >
    );
};

export default MotorBikeDetailComponent;

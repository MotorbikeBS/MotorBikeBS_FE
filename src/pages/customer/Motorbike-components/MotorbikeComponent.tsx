import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { Box, Button, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import { FavoriteBorderOutlined } from '@mui/icons-material';
import { Item } from './style/style-root';
import { IMotorbike } from './model/Motorbike';
import './style/style.scss';
import items from '../data/data';
import BookingDialog from '../BookingDialogComponent/BookingDialog';

const MotorbikeComponent = () => {
    const navigate = useNavigate();
    const [isOpenDialog, setOpenDialog] = useState(false);
    const [isOpenSubmitDialog, setIsOpenSubmitDialog] = useState(false);
    const [isOpenCancelDialog, setIsOpenCancelDialog] = useState(false);

    const handleNavigateDetail = (motorbikeId: number) => {
        navigate(`/motorbike/${motorbikeId}`);
    };

    const handleOpenDialog = () => {
        setOpenDialog(true);
    };
    const handleCloseDialog = () => {
        setOpenDialog(false);
        setIsOpenSubmitDialog(false)
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
            <Grid container spacing={2} className="product-grid">
                {items.map((item: IMotorbike) => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
                        <Item className="product-item">
                            <div className="product-image" onClick={() => handleNavigateDetail(item.id)}>
                                <img src={item.image} alt="Đây là ảnh sản phẩm" />
                            </div>
                            <div className="product-information">
                                <Typography variant="h6">{item.name}</Typography>
                                <Typography color="red" fontWeight="700" fontSize="18px">
                                    Giá: {item.price}
                                </Typography>
                                <div className="product-info-content">
                                    <Typography>
                                        <strong>Cửa Hàng:</strong> {item.storeName}
                                    </Typography>
                                    <Typography>
                                        <strong>Loại Xe: </strong>
                                        {item.motorType}
                                    </Typography>
                                    <Typography>
                                        <strong>Odo: </strong>
                                        {item.odo} Km
                                    </Typography>
                                    <Typography>
                                        <strong>Tình trạng: </strong>
                                        {item.status}
                                    </Typography>
                                    <Typography>
                                        <strong>Đăng ký mới:</strong> {item.yearRegister.toLocaleDateString()}
                                    </Typography>
                                    <Typography>
                                        <strong>Ngày đăng bài:</strong> {item.postDate.toLocaleDateString()}
                                    </Typography>
                                </div>
                            </div>

                            <div className="btn-style">
                                <Button variant="outlined" onClick={handleOpenDialog}>
                                    Đặt lịch xem xe
                                </Button>
                                <Button className="btn-favorite">
                                    <FavoriteBorderOutlined />
                                </Button>
                            </div>
                        </Item>
                    </Grid>
                ))}
            </Grid>
            <BookingDialog
                open={isOpenDialog}
                openSubmit={isOpenSubmitDialog}
                openCancel={isOpenCancelDialog}
                onOpenSubmitDialog={handleOpenSubmitDialog}
                onCloseSubmitDialog={handleCloseSubmitDialog}
                onOpenCancelDialog={handleOpenCancelDialog}
                onCloseCancelDialog={handleCloseCancelDialog}
                onClose={handleCloseDialog}
            />
        </Box>
    );
};

export default MotorbikeComponent;

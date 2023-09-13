import React from 'react';
import { Box, Button, Dialog, DialogActions, DialogTitle, Grid, Typography } from '@mui/material';
import { useNavigate } from 'react-router';
import { IMotorbike } from '../../Motorbike-components/model/Motorbike';
import items from '../../data/data';
import { Item } from './style/style-root';
import { Favorite, DeleteOutline } from '@mui/icons-material';
import './style/style.scss';

const MotobikeFavouriteList = () => {
    const navigate = useNavigate();
    const [openDelete, setOpenDelete] = React.useState(false);

    const handleNavigateDetail = (motorbikeId: number) => {
        navigate(`/motorbike/${motorbikeId}`);
    };

    const handleClickDelete = () => {
        setOpenDelete(true);
    };

    const handleDeleteCan = () => {
        setOpenDelete(false);
    };

    const handleDeleteSuc = () => {
        navigate('/customer-home');
    };

    const handleDelete = () => {
        handleClickDelete();
    };

    return (
        <Box
            sx={{
                flexGrow: 1,
                margin: '18px 48px 0 48px',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    padding: '6px 6px',
                    backgroundColor: '#ccc'
                }}
            >
                <Button variant="outlined" color="error" className="btn-delete" onClick={handleDelete}>
                    <DeleteOutline />
                    <Typography variant="subtitle2">Xóa hết</Typography>
                </Button>
            </Box>

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
                                <Button variant="outlined">Đặt lịch xem xe</Button>
                                <Button className="btn-favorite">
                                    <Favorite />
                                </Button>
                            </div>
                        </Item>
                    </Grid>
                ))}
            </Grid>
            <Dialog open={openDelete} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
                <DialogTitle>Bạn có chắc chắn muốn xóa hết danh sách yêu thích không?</DialogTitle>
                <DialogActions>
                    <Button color="error" onClick={handleDeleteCan}>
                        Từ chối
                    </Button>
                    <Button color="success" onClick={handleDeleteSuc}>
                        Đồng ý
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default MotobikeFavouriteList;

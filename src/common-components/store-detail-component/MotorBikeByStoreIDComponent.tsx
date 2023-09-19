import React from 'react'
import { Box, Button, Grid, Typography } from '@mui/material';
import { useNavigate } from 'react-router';
import { Item } from '../../pages/customer/store-list/style/style-root';
import { FavoriteBorderOutlined } from '@mui/icons-material';
import items from '../../pages/customer/data/data';
import { IMotorbike } from '../../pages/customer/motorbike-component/model/Motorbike';


const MotorbikeByStoreIdComponent = () => {

    const navigate = useNavigate();

    const handleNavigateDetail = (motorbikeId: number) => {
        navigate(`/motorbike/${motorbikeId}`);
    }

    return (
        <Box sx={{ flexGrow: 1, margin: "0 48px 0 48px" }}>
            <Grid
                container
                spacing={{ xs: 2, md: 1 }}
                className='product-grid'
            >
                {items.map((item: IMotorbike) => (
                    <Grid xs={12} sm={6} md={4} lg={3} key={item.id}>
                        <Item
                            className='product-item'
                        >
                            <div className='product-image' onClick={() => handleNavigateDetail(item.id)}
                            >
                                <img src={item.image} alt='Đây là ảnh sản phẩm' />
                            </div>
                            <div className='product-information'>
                                <Typography variant='h6'>{item.name}</Typography>
                                <Typography
                                    color='red'
                                    fontWeight='700'
                                    fontSize='18px'
                                >
                                    Giá: {item.price}</Typography>
                                <div className='product-info-content'>
                                    <Typography><strong>Cửa Hàng:</strong> {item.storeName}</Typography>
                                    <Typography><strong>Loại Xe: </strong>{item.motorType}</Typography>
                                    <Typography><strong>Odo: </strong>{item.odo} Km</Typography>
                                    <Typography><strong>Tình trạng: </strong>{item.status}</Typography>
                                    <Typography><strong>Đăng ký mới:</strong> {item.yearRegister.toLocaleDateString()}</Typography>
                                    <Typography><strong>Ngày đăng bài:</strong> {item.postDate.toLocaleDateString()}</Typography>

                                </div>
                            </div>

                            <div className='btn-style'>
                                <Button variant="outlined">
                                    Đặt lịch xem xe
                                </Button>
                                <Button className='btn-favorite' >
                                    <FavoriteBorderOutlined />
                                </Button>
                            </div>

                        </Item>
                    </Grid>
                ))}
            </Grid>
        </Box >
    );
}

export default MotorbikeByStoreIdComponent

import React from 'react'
import { Box, Button, Typography } from '@mui/material'
import Grid from "@mui/material/Unstable_Grid2";
import { FavoriteBorderOutlined } from '@mui/icons-material';
import { Item } from './style/style-root'
import { IMotobike } from './model/Motorbike';
import './style/style.scss'

const items: IMotobike[] = [
    {
        id: 1,
        image: 'https://xevespa.vn/wp-content/uploads/2022/04/honda-vario-2017-2.jpg',
        images: [
            'https://cdn.xehoiviet.com/images/car/cropthumb/1200x752/2020/03/10/0832662233/vario-150-mau-cu-2o18-den-nham-mam-dong-bstp-9-chu-2ke038j7fae.jpg',
            'https://sb.nhattao.com/2018/12/11677460_D699A5EF-1D85-446E-9DD9-0ED8DF23F02F.jpeg'
        ],
        name: 'Vario',
        brand: 'Honda',
        model: 'Vario 150cc',
        price: 20000000,
        status: 'Đã sử dụng',
        storeName: 'Lê Vũ Store',
        yearRegister: new Date('2017-01-31'),
        postDate: new Date('2023-09-05'),
        motorType: 'Tay Ga',
        odo: 30000,
        description: 'Xe Zin chính chủ, sang tên nhanh chóng, chưa làm máy, odo thấp, chủ xe cũ là nữ nên đi xe giữ rất kỹ'
    },
    {
        id: 2,
        image: 'https://cdn-img.thethao247.vn/storage/files/linhseo/2022/11/23/gia-xe-air-blade-cu-cap-nhat-moi-nhat-2022-221662.jpg',
        images: [
            '',
            ''
        ],
        name: 'Air Blade',
        brand: 'Honda',
        model: 'Air Blade 150cc',
        price: 35000000,
        status: 'Đã sử dụng',
        storeName: 'Lê Vũ Store',
        yearRegister: new Date('2022-05-25'),
        postDate: new Date('2023-09-05'),
        motorType: 'Tay Ga',
        odo: 26000,
        description: 'Xe Zin chính chủ, sang tên nhanh chóng, chưa làm máy, odo thấp, chủ xe cũ là nữ nên đi xe giữ rất kỹ'
    },
    {
        id: 3,
        image: 'https://litteritcostsyou.org/wp-content/uploads/2020/05/co-nen-mua-wave-cu-duoi-2-trieu-min.jpg',
        images: [
            '',
            ''
        ],
        name: 'Xe Wave RSX',
        brand: 'Honda',
        model: 'Wave RSX 110cc',
        price: 5000000,
        status: 'Đã sử dụng',
        storeName: 'Lê Vũ Store',
        yearRegister: new Date('2016-01-31'),
        postDate: new Date('2023-09-05'),
        motorType: 'Xe Số',
        odo: 80000,
        description: 'Xe Zin chính chủ, sang tên nhanh chóng, chưa làm máy, odo thấp, chủ xe cũ là nữ nên đi xe giữ rất kỹ'
    },
    {
        id: 4,
        image: 'https://www.speeryamaha.com/wp-content/uploads/2020/09/Sirius-cu.jpg',
        images: [
            '',
            ''
        ],
        name: 'Xe Sirus',
        brand: 'Yamaha',
        model: 'Yamaha Sirus 110cc',
        price: 8000000,
        status: 'Đã sử dụng',
        storeName: 'Lê Vũ Store',
        yearRegister: new Date('2019-08-31'),
        postDate: new Date('2023-09-05'),
        motorType: 'Xe số ',
        odo: 50000,
        description: 'Xe Zin chính chủ, sang tên nhanh chóng, chưa làm máy, odo thấp, chủ xe cũ là nữ nên đi xe giữ rất kỹ'
    },

]

const ProductComponent = () => {
    return (
        <Box sx={{ flexGrow: 1, margin: "0 48px 0 48px" }}>
            <Grid
                container
                spacing={{ xs: 2, md: 1 }}
                columns={{ xs: 4, sm: 6, md: 12 }}
                className='product-grid'
            >
                {items.map((item) => (
                    <Grid xs={2} sm={8} md={3} key={item.id}>
                        <Item className='product-item'>
                            <div className='product-image'>
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
        </Box>
    );
}

export default ProductComponent
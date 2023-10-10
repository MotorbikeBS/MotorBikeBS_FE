import React, { useEffect, useMemo } from 'react';
import {
    Box,
    Button,
    Container,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Grid,
    Paper,
    Typography,
} from '@mui/material';
import { useNavigate } from 'react-router';
import { Item } from './style/style-root';
import { Favorite, DeleteOutline } from '@mui/icons-material';
import './style/style.scss';
import {
    useAppDispatch,
    useAppSelector,
} from '../../../../services/store/store';
import {
    deleteAllWishList,
    deleteWishlistByMotorId,
    getWishList,
} from '../../../../services/features/wishListSlice';
import useFormatCurrency from '../../../../hooks/useFormatCurrency';

const MotobikeFavouriteList = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const formatCurrency = useFormatCurrency();

    const { wishlists } = useAppSelector((state) => state.wishlist);

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

    const handleDelete = () => {
        handleClickDelete();
    };

    useEffect(() => {
        dispatch(getWishList());
    }, [dispatch]);

    const loadingData = () => {
        dispatch(getWishList());
    };

    const handleDeleteSuc = () => {
        dispatch(deleteAllWishList()).then(() => {
            loadingData();
            setTimeout(() => {
                setOpenDelete(false);
            }, 1000);
        });
    };

    const handleDeleteFavouriteByID = useMemo(
        () => (motorId: number) => {
            dispatch(deleteWishlistByMotorId({ motorId: motorId })).then(() => {
                loadingData();
            });
        },
        [dispatch, loadingData]
    );

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
                    padding: '0px 6px 0px 0px',
                }}
            >
                {wishlists && wishlists.length > 0 ? (
                    <Button
                        variant="outlined"
                        color="error"
                        className="btn-delete"
                        onClick={handleDelete}
                    >
                        <DeleteOutline />
                        <Typography variant="subtitle2">Xóa hết</Typography>
                    </Button>
                ) : (
                    <Container className="wishlist-container-notFound">
                        <Paper
                            elevation={3}
                            sx={{
                                padding: 4,
                            }}
                        >
                            <Typography variant="h5">
                                Danh sách yêu thích trống
                            </Typography>
                        </Paper>
                    </Container>
                )}
            </Box>

            <Grid container spacing={2} className="product-grid">
                {wishlists &&
                    wishlists.map((wishlist) => (
                        <Grid
                            item
                            xs={12}
                            sm={6}
                            md={4}
                            lg={3}
                            key={wishlist.motorId}
                        >
                            <Item className="product-item">
                                <div
                                    className="product-image"
                                    onClick={() =>
                                        handleNavigateDetail(
                                            wishlist.motor.motorId,
                                        )
                                    }
                                >
                                    <img
                                        src={
                                            wishlist.motor.motorbikeImages[0]
                                                ?.imageLink || ''
                                        }
                                        alt="Đây là ảnh sản phẩm"
                                    />
                                </div>
                                <div className="product-information">
                                    <Typography variant="h6">
                                        {wishlist.motor.motorName}
                                    </Typography>
                                    <Typography
                                        color="red"
                                        fontWeight="700"
                                        fontSize="18px"
                                    >
                                        Giá:{' '}
                                        {formatCurrency(wishlist.motor.price)}
                                    </Typography>
                                    <div className="product-info-content">
                                        <Typography>
                                            <strong>Cửa Hàng:</strong>{' '}
                                            {wishlist.motor.store.storeName}
                                        </Typography>
                                        <Typography>
                                            <strong>Loại Xe: </strong>
                                            {wishlist.motor.motorType.title}
                                        </Typography>
                                        <Typography>
                                            <strong>Odo: </strong>
                                            {wishlist.motor.odo}
                                        </Typography>

                                        <Typography>
                                            <strong>Đăng ký mới:</strong>
                                            {new Date(
                                                wishlist.motor.year,
                                            ).toLocaleDateString() || ''}
                                        </Typography>
                                        {/* <Typography>
                                        <strong>
                                            Ngày đăng bài:
                                        </strong>
                                        {new Date(
                                            wishlist.motor.year
                                        ).toLocaleDateString() || ''}
                                    </Typography> */}
                                    </div>
                                </div>

                                <div className="btn-style">
                                    <Button variant="outlined">
                                        Đặt lịch xem xe
                                    </Button>
                                    <Button
                                        className="btn-favorite"
                                        onClick={() =>
                                            handleDeleteFavouriteByID(
                                                wishlist.motorId,
                                            )
                                        }
                                    >
                                        <Favorite />
                                    </Button>
                                </div>
                            </Item>
                        </Grid>
                    ))}
            </Grid>
            <Dialog
                open={openDelete}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle>Xác nhận</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Bạn có chắc chắn muốn xóa hết danh sách yêu thích không?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button
                        color="error"
                        variant="outlined"
                        onClick={handleDeleteCan}
                    >
                        Từ chối
                    </Button>
                    <Button
                        color="success"
                        variant="outlined"
                        onClick={handleDeleteSuc}
                    >
                        Đồng ý
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default MotobikeFavouriteList;

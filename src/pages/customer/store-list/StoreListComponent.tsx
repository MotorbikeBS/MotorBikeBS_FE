import React from "react";
import { IStore } from "./model/Store";
import { Box, Button, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { Item } from "./style/style-root";
import "./style/style.scss";

const items: IStore[] = [
  {
    id: 1,
    image:
      "https://lh3.googleusercontent.com/p/AF1QipMBxbOVy3RITmfwsro460qSkKPAT_mCaJmFUeTZ=s1360-w1360-h1020",
    store_name: "Vũ Phụng Hoàng",
    store_phone: "0909170111",
    address: "Quận 8, Thành phố Hồ Chí Minh",
    store_email: "vuphuonghoangxe@gmail.com"
  },
  {
    id: 2,
    image:
      "https://lh3.googleusercontent.com/p/AF1QipMBxbOVy3RITmfwsro460qSkKPAT_mCaJmFUeTZ=s1360-w1360-h1020",
    store_name: "Vũ Phụng Hoàng",
    store_phone: "0909170111",
    address: "Quận 8, Thành phố Hồ Chí Minh",
    store_email: "vuphuonghoangxe@gmail.com"
  },
  {
    id: 3,
    image:
      "https://lh3.googleusercontent.com/p/AF1QipMBxbOVy3RITmfwsro460qSkKPAT_mCaJmFUeTZ=s1360-w1360-h1020",
    store_name: "Vũ Phụng Hoàng",
    store_phone: "0909170111",
    address: "Quận 8, Thành phố Hồ Chí Minh",
    store_email: "vuphuonghoangxe@gmail.com"
  },
  {
    id: 4,
    image:
      "https://lh3.googleusercontent.com/p/AF1QipMBxbOVy3RITmfwsro460qSkKPAT_mCaJmFUeTZ=s1360-w1360-h1020",
    store_name: "Vũ Phụng Hoàng",
    store_phone: "0909170111",
    address: "Quận 8, Thành phố Hồ Chí Minh",
    store_email: "vuphuonghoangxe@gmail.com"
  }
];

const StoreListComponent = () => {
  return (
    <>
      <Box sx={{ flexGrow: 1, margin: "0 48px 0 48px" }}>
        <Grid
          container
          spacing={{ xs: 2, md: 1 }}
          columns={{ xs: 4, sm: 6, md: 12 }}
          className="store-grid"
        >
          {items.map((item) => (
            <Grid xs={2} sm={8} md={3} key={item.id}>
              <Item className="store-item">
                <div className="store-image">
                  <img src={item.image} alt="Đây là ảnh sản phẩm" />
                </div>
                <div className="store-information">
                  <Typography variant="h6">
                    <strong>Cửa hàng: </strong>
                    {item.store_name}
                  </Typography>
                  <div className="store-info-content">
                    <Typography>
                      <strong>Điện thoại: </strong>
                      {item.store_phone}
                    </Typography>
                    <Typography>
                      <strong>Địa chỉ: </strong>
                      {item.address}
                    </Typography>
                    <Typography>
                      <strong>Email: </strong>
                      {item.store_email}
                    </Typography>
                  </div>
                </div>

                <div className="btn-style">
                  <Button variant="outlined">Chi tiết</Button>
                  <Button variant="outlined" color="warning">Bán xe</Button>
                </div>
              </Item>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
};

export default StoreListComponent;

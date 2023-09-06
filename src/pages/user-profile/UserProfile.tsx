import React from "react";
import {
  Avatar,
  Button,
  Grid,
  Stack,
  TextField,
  Typography,
  Radio,
  FormLabel
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import "./style/style.scss";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const navigate = useNavigate();

  const [selectedValue, setSelectedValue] = React.useState("male");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(event.target.value);
  };

  return (
    <div className="profile-container">
      <Grid container spacing={2}>
        <Grid item xs={6} md={3}>
          <div className="profile-ava">
            <Avatar sx={{ width: 52, height: 52, bgcolor: "orange" }}>
              Hi
            </Avatar>
            <div>
              <Typography className="edit-profile-name">Minh Tri</Typography>
              <Button className="edit-profile-btn" onClick={() => navigate('/user/edit-profile')}>
                <EditIcon />
                Sửa hồ sơ
              </Button>
            </div>
          </div>
          <hr />
          <Button className="change-password-button">Đổi mật khẩu</Button>
        </Grid>
        <Grid item xs={6} md={9}>
          <div className="profile-input-container">
            <Typography className="profile-input-heading">
              Hồ Sơ Của Tôi
            </Typography>
            <Stack spacing={3} className="profile-input-fields">
              <TextField
                label="Email"
                value="phanminhtri269@gmail.com"
                type="email"
                variant="outlined"
                disabled
              />
              <TextField
                label="Tên"
                value="Minh Tri"
                type="text"
                variant="outlined"
                disabled
              />
              <div>
                <FormLabel>Giới tính:</FormLabel>
                <Radio
                  checked={selectedValue === "male"}
                  onChange={handleChange}
                  value="male"
                  name="radio-buttons"
                  inputProps={{ "aria-label": "male" }}
                  disabled
                />
                Nam
                <Radio
                  checked={selectedValue === "female"}
                  onChange={handleChange}
                  value="female"
                  name="radio-buttons"
                  inputProps={{ "aria-label": "Female" }}
                  disabled
                />
                Nữ
                <Radio
                  checked={selectedValue === "other"}
                  onChange={handleChange}
                  value="other"
                  name="radio-buttons"
                  inputProps={{ "aria-label": "other" }}
                  disabled
                />
                Khác
              </div>
              <TextField
                label="Điện thoại"
                value="0908660977"
                type="text"
                variant="outlined"
                disabled
              />
              <TextField
                label="Địa chỉ"
                value="Quận 4, Tp.HCM"
                type="text"
                variant="outlined"
                disabled
              />
              <TextField
                label="Ngày sinh"
                value="11/01/2001"
                type="date"
                variant="outlined"
                disabled
              />
              <TextField
                label="Card"
                value="10"
                type="text"
                variant="outlined"
                disabled
              />
            </Stack>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default UserProfile;

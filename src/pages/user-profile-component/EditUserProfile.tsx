import React from "react";
import {
  Avatar,
  Button,
  Grid,
  Stack,
  TextField,
  Typography,
  Radio,
  FormLabel,
  Snackbar,
  Alert,
  Dialog,
  DialogTitle,
  DialogActions
} from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import ClearIcon from "@mui/icons-material/Clear";
import "./style/style.scss";
import { useNavigate } from "react-router-dom";

const EditUserProfile = () => {
  const navigate = useNavigate();
  const [selectedValue, setSelectedValue] = React.useState("male");
  const [openSave, setOpenSave] = React.useState(false);
  const [openCancel, setOpenCancel] = React.useState(false);

  const handleClickSave = () => {
    setOpenSave(true);
  };

  const handleClickCancel = () => {
    setOpenCancel(true);
  };

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSave(false);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(event.target.value);
  };

  const handleSave = () => {
    handleClickSave();
    setTimeout(() => {
      navigate("/user/profile");
    }, 2000);
  };

  const handleCancel = () => {
    handleClickCancel();
  };

  const handleCancelCan = () => {
    setOpenCancel(false);
  };

  const handleCancelSuc = () => {
    navigate("/user/profile");
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
            </div>
          </div>
          <hr />
          <Button className="change-password-button">Đổi mật khẩu</Button>
        </Grid>
        <Grid item xs={6} md={9}>
          <div className="profile-input-container">
            <Typography className="profile-input-heading">
              Chỉnh sửa hồ sơ
            </Typography>
            <Stack spacing={3} className="profile-input-fields">
              <TextField
                label="Email"
                value="phanminhtri269@gmail.com"
                type="email"
                variant="outlined"
              />
              <TextField
                label="Tên"
                value="Minh Tri"
                type="text"
                variant="outlined"
              />
              <div>
                <FormLabel>Giới tính:</FormLabel>
                <Radio
                  checked={selectedValue === "male"}
                  onChange={handleChange}
                  value="male"
                  name="radio-buttons"
                  inputProps={{ "aria-label": "male" }}
                />
                Nam
                <Radio
                  checked={selectedValue === "female"}
                  onChange={handleChange}
                  value="female"
                  name="radio-buttons"
                  inputProps={{ "aria-label": "Female" }}
                />
                Nữ
                <Radio
                  checked={selectedValue === "other"}
                  onChange={handleChange}
                  value="other"
                  name="radio-buttons"
                  inputProps={{ "aria-label": "other" }}
                />
                Khác
              </div>
              <TextField
                label="Điện thoại"
                value="0908660977"
                type="text"
                variant="outlined"
              />
              <TextField
                label="Địa chỉ"
                value="Quận 4, Tp.HCM"
                type="text"
                variant="outlined"
              />
              <TextField
                label="Ngày sinh"
                value="11/01/2001"
                type="date"
                variant="outlined"
              />
              <TextField
                label="Card"
                value="10"
                type="text"
                variant="outlined"
              />
            </Stack>
            <div className="edit-profile-btn">
              <Button variant="outlined" color="success" onClick={handleSave}>
                <DoneIcon />
                Lưu
              </Button>
              <Button variant="outlined" color="error" onClick={handleCancel}>
                <ClearIcon />
                Hủy bỏ
              </Button>
            </div>
          </div>
        </Grid>
      </Grid>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={openSave}
        autoHideDuration={1500}
        onClose={handleClose}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          Chỉnh sửa thành công
        </Alert>
      </Snackbar>
      <Dialog
        open={openCancel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle>Bạn có chắc chắn?</DialogTitle>
        <DialogActions>
          <Button color="error" onClick={handleCancelCan}>
            Từ chối
          </Button>
          <Button color="success" onClick={handleCancelSuc}>
            Đồng ý
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EditUserProfile;

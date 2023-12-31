import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";
import Grid from '@mui/material/Grid';
import { Item } from './style/style-root';
import "./style/style.scss";
import { useAppDispatch, useAppSelector } from "../../../services/store/store";
import { clearStore, getAllStore } from "../../../services/features/store/storeSlice";
import { IStore } from "../../../models/Store/Store";
import { Report } from "@mui/icons-material";
import ReportStoreDialog from "../../../common-components/report-store-dialog/ReportStoreDialog";

const StoreListComponent = () => {
  const navigate = useNavigate();

  const [isOpenReportDialog, setIsOpenReportDialog] = React.useState(false);
  const [isOpenSubmitReportDialog, setIsOpenSubmitReportDialog] = React.useState(false)
  const [isOpenCancelReportDialog, setIsOpenCancelReportDialog] = React.useState(false)
  const [storeIdForDialog, setStoreIdForDialog] = React.useState<number | null>(null)

  const handleNavigateDetail = (storeId: number) => {
    navigate(`/store/${storeId}`);
  };
  const dispatch = useAppDispatch()
  const { stores } = useAppSelector((state) => state.store)

  React.useEffect(() => {
    dispatch(clearStore())
    dispatch(getAllStore());
  }, [dispatch]);

  const handleOpenReportDialog = (storeId: number) => {
    setStoreIdForDialog(storeId);
    setIsOpenReportDialog(true)
  }
  const handleCloseReportDialog = () => {
    setIsOpenReportDialog(false)
    setIsOpenSubmitReportDialog(false)
    setIsOpenCancelReportDialog(false)
  }

  const handleOpenSubmitReportDialog = () => {
    setIsOpenSubmitReportDialog(true)
  }
  const handleCloseSubmitReportDialog = () => {
    setIsOpenSubmitReportDialog(false)
  }

  const handleOpenCancelReportDialog = () => {
    setIsOpenCancelReportDialog(true)
  }
  const handleCloseCancelReportDialog = () => {
    setIsOpenCancelReportDialog(false)
  }

  return (
    <Box
      sx={{
        flexGrow: 1,
        margin: '0 48px 0 48px',
      }}
    >
      <Grid
        container
        spacing={{ xs: 2, md: 6 }}
        className="store-grid"

      >
        {stores && stores.map((store: IStore) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={store.storeId}>
            <Item
              className="store-item"
            >
              <div
                className="store-image"
                onClick={() =>
                  handleNavigateDetail(
                    store.storeId,
                  )
                }>
                {store.storeImages && store.storeImages.length > 0 ? (
                  <img src={store.storeImages[0].imageLink} alt="Đây là hình ảnh cửa hàng" />

                ) : (
                  <img src='https://media.istockphoto.com/id/460635383/vi/vec-to/%C4%91%E1%BB%93-h%E1%BB%8Da-cho-kinh-doanh-b%E1%BA%A5t-%C4%91%E1%BB%99ng-s%E1%BA%A3n-c%C3%B3-d%E1%BA%A5u-ch%E1%BA%A5m-h%E1%BB%8Fi.jpg?s=612x612&w=0&k=20&c=ifCzN6xQmrkMiV1OGrPISc5zaECY66TwwLhpQbuj35o=' alt="Motorbike Image" />

                )}
              </div>
              <div className="store-information">
                <Typography variant="h6">
                  <strong>Cửa hàng: </strong>
                  {store.storeName}
                </Typography>
                <div className="store-info-content">
                  <Typography>
                    <strong>Điện thoại: </strong>
                    {store.storePhone}
                  </Typography>
                  <Typography>
                    <strong>Địa chỉ: </strong>
                    {store.address}
                  </Typography>
                </div>
              </div>

              <div className="btn-style">
                <Button
                  variant="outlined"
                  onClick={() =>
                    handleNavigateDetail(
                      store.storeId,
                    )
                  }
                >
                  Xem cửa hàng
                </Button>
                <Button
                  variant="text"
                  onClick={() => handleOpenReportDialog(
                    store.storeId
                  )}
                >
                  <Report />
                </Button>
              </div>
            </Item>

          </Grid>
        ))}
      </Grid>

      <ReportStoreDialog
        open={isOpenReportDialog}
        onClose={handleCloseReportDialog}
        openSubmit={isOpenSubmitReportDialog}
        openCancel={isOpenCancelReportDialog}
        onOpenSubmitDialog={handleOpenSubmitReportDialog}
        onCloseSubmitDialog={handleCloseSubmitReportDialog}
        onOpenCancelDialog={handleOpenCancelReportDialog}
        onCloseCancelDialog={handleCloseCancelReportDialog}
        storeId={storeIdForDialog}
      />
    </Box >

  );
};

export default StoreListComponent;
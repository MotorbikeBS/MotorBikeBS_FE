import { Box, Button, CircularProgress, Container, Paper, Typography } from '@mui/material';
import React from 'react';
import './style/_style.scss';
import {
    useAppDispatch,
    useAppSelector,
} from '../../../../services/store/store';
import useFormatCurrency from '../../../../hooks/useFormatCurrency';
import {
    clearContract,
    getAllContract,
} from '../../../../services/features/contract/contractSlice';
import TradeHistoryImgeDialog from '../../../../common-components/trade-history-img-dialog/TradeHistoryImgeDialog';
import ReUpdateContractDialogByStore from '../../contract-dialog-store/ReUpdateContractDialog';

const ContractListWithOwner = () => {
    const dispatch = useAppDispatch();
    const formattedCurrency = useFormatCurrency();
    const { getContracts, loading } = useAppSelector((state) => state.contract);

    const [fullImageContract, setFullImageContract] = React.useState(false);
    const [imageArray, setImageArray] = React.useState<string[]>([]);

    const [contractIdDialog, setContractIdDialog] = React.useState<
        number | null
    >(null);
    const [isOpenContractDialog, setIsOpenContractDialog] =
        React.useState(false);
    const [isOpenSubmitDialog, setIsOpenSubmitDialog] = React.useState(false);
    const [isOpenCancelDialog, setIsOpenCancelDialog] = React.useState(false);

    const loadData = React.useCallback(() => {
        dispatch(clearContract());
        dispatch(getAllContract());
    }, [dispatch]);

    React.useEffect(() => {
        loadData();
    }, [loadData]);

    const handleOpenFullImage = (imageUrls: string[]) => {
        setImageArray(imageUrls);
        setFullImageContract(true);
    };

    const handleOpenReUpdateContractDialog = (contractId: number) => {
        setContractIdDialog(contractId);
        setIsOpenContractDialog(true);
        console.log(contractId);
    };
    const handleCloseReUpdateContractDialog = () => {
        setIsOpenContractDialog(false);
        setIsOpenSubmitDialog(false);
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
        <Container className="container-lg" maxWidth="lg">
            <Typography className="h4-heading" variant="h4" gutterBottom>
                Danh sách hợp đồng với chủ xe
            </Typography>
            {loading === true ? (
                <Box textAlign="center">
                    <CircularProgress />
                </Box>
            ) : (
                <>
                    {getContracts?.map((contract) => (
                        <Paper
                            className="paper-contract-list"
                            key={
                                contract?.negotiations[0]?.contracts[0]?.contractId
                            }
                        >
                            <Box className="contract-row" display="flex">
                                <Box className="left-box" flexGrow={3}>
                                    <div className="image-contract-product">
                                        <img
                                            src={
                                                contract?.motor
                                                    ?.motorbikeImages[0]
                                                    ?.imageLink || ''
                                            }
                                            alt="Ảnh mô tả xe"
                                        />
                                    </div>
                                    <div className="product-contract">
                                        <Typography
                                            variant="h5"
                                            fontWeight={700}
                                            align="center"
                                        >
                                            {contract?.motor?.motorName}
                                        </Typography>
                                        <Typography
                                            variant="h6"
                                            fontWeight={700}
                                            align="center"
                                            color="red"
                                        >
                                            {formattedCurrency(
                                                contract?.negotiations[0]
                                                    ?.contracts[0]?.price,
                                            )}
                                        </Typography>
                                    </div>
                                    <div className="product-content">
                                        <Typography>
                                            <strong>Số KM: </strong>
                                            {contract?.motor?.odo} KM
                                        </Typography>
                                        <div className="register-date">
                                            <Typography>
                                                Ngày Đăng Ký:
                                            </Typography>
                                            <Typography>
                                                {new Date(
                                                    contract?.motor?.year,
                                                ).toLocaleDateString('vi-VN')}
                                            </Typography>
                                        </div>
                                        {/* <div className="tag-motorbike-status">
                                            <Typography variant="subtitle1">
                                                {contract?.motor?.motorStatus
                                                    ?.title === 'CONSIGNMENT'
                                                    ? 'ĐÃ ĐĂNG BÁN - KÝ GỬI'
                                                    : contract?.motor
                                                        ?.motorStatus
                                                        ?.title ===
                                                        'LIVELIHOOD'
                                                        ? 'ĐÃ ĐĂNG BÁN - KHÔNG KÝ GỬI'
                                                        : contract?.motor
                                                            ?.motorStatus
                                                            ?.title === 'STORAGE' && contract?.negotiations[0]?.contracts[0]?.storeId
                                                            ? 'ĐÃ CHUYỂN VÀO KHO'
                                                            : 'KHÔNG XÁC ĐỊNH'}
                                            </Typography>
                                        </div> */}
                                    </div>
                                </Box>
                                <Box className="right-box" flexGrow={9}>
                                    <div className="motorbike-owner-info">
                                        <div className="motorbike-owner-info-header">
                                            <Typography
                                                variant="h5"
                                                sx={{ color: '#f0c413' }}
                                            >
                                                Thông tin chủ xe:
                                            </Typography>
                                        </div>
                                        <div className="motorbike-owner-info-content">
                                            <Typography>
                                                <strong>Tên chủ xe:</strong>
                                                {contract?.receiver?.userName}
                                            </Typography>
                                            <Typography>
                                                <strong>Số điện thoại:</strong>
                                                {contract?.receiver?.phone}
                                            </Typography>
                                            <Typography>
                                                <strong>Email:</strong>
                                                {contract?.receiver?.email}
                                            </Typography>
                                            <Typography>
                                                <strong>Địa chỉ:</strong>
                                                {contract?.receiver?.address}
                                            </Typography>
                                        </div>
                                    </div>
                                    <div className="contract-owner-info">
                                        <div className="contract-owner-info-header">
                                            <Typography
                                                variant="h5"
                                                sx={{ color: '#35c206' }}
                                            >
                                                Thông tin hợp đồng
                                            </Typography>
                                        </div>
                                        <div className="contract-owner-info-content">
                                            <Typography>
                                                <strong>Ngày tạo:</strong>{' '}
                                                {new Date(
                                                    contract?.negotiations[0]?.contracts[0]?.createdAt,
                                                ).toLocaleDateString('vi-VN')}
                                            </Typography>
                                            <Typography>
                                                <strong>Nội dung:</strong>{' '}
                                                {
                                                    contract?.negotiations[0]
                                                        ?.contracts[0]?.content
                                                }
                                            </Typography>
                                            <div style={{ display: 'flex' }}>
                                                <Typography fontWeight={700}>
                                                    Trạng thái:
                                                </Typography>
                                                <Typography
                                                    sx={{
                                                        fontWeight: 'bold',
                                                        textShadow:
                                                            '2px 2px 4px rgba(255, 0, 0, 0.5)',
                                                        color: 'red',
                                                    }}
                                                >
                                                    {contract?.negotiations[0]
                                                        ?.contracts[0]
                                                        ?.status === 'PENDING'
                                                        ? 'CHỜ ĐỢI'
                                                        : contract
                                                            ?.negotiations[0]
                                                            ?.contracts[0]
                                                            ?.status ===
                                                            'ACCEPT'
                                                            ? 'CHẤP NHẬN'
                                                            : contract
                                                                ?.negotiations[0]
                                                                ?.contracts[0]
                                                                ?.status ===
                                                                'CANCEL'
                                                                ? 'SAI'
                                                                : contract
                                                                    ?.negotiations[0]
                                                                    ?.contracts[0]
                                                                    ?.status ===
                                                                    'REJECT' ? 'TỪ CHỐI'
                                                                    : 'CHƯA XÁC ĐỊNH'}
                                                </Typography>
                                            </div>
                                        </div>
                                        {contract?.negotiations[0]
                                            ?.contracts[0]?.status ===
                                            'CANCEL' ? (
                                            <div className="contract-owner-btn-contract">
                                                <Button
                                                    variant="contained"
                                                    size="small"
                                                    color="warning"
                                                    onClick={() =>
                                                        handleOpenReUpdateContractDialog(
                                                            contract
                                                                ?.negotiations[0]
                                                                ?.contracts[0]
                                                                ?.contractId,
                                                        )
                                                    }
                                                >
                                                    Tải Lại hợp đồng
                                                </Button>
                                            </div>
                                        ) : (
                                            <></>
                                        )}
                                    </div>
                                    <div className="image-contract">
                                        <div className="image-owner-info-header">
                                            <Typography
                                                variant="h5"
                                                sx={{ color: '#f0c413' }}
                                            >
                                                Hợp đồng
                                            </Typography>
                                        </div>
                                        <img
                                            src={
                                                contract?.negotiations[0]
                                                    ?.contracts[0]
                                                    ?.contractImages[0]
                                                    .imageLink
                                            }
                                            alt="Hợp đồng"
                                            onClick={() =>
                                                handleOpenFullImage(
                                                    contract?.negotiations[0]?.contracts[0]?.contractImages.map(
                                                        (image: any) =>
                                                            image.imageLink,
                                                    ) || [],
                                                )
                                            }
                                        />
                                    </div>
                                </Box>
                            </Box>
                        </Paper>
                    ))}
                </>
            )}
            <TradeHistoryImgeDialog
                isOpen={fullImageContract}
                onClose={() => setFullImageContract(false)}
                imageUrls={imageArray}
            />
            <ReUpdateContractDialogByStore
                open={isOpenContractDialog}
                openSubmit={isOpenSubmitDialog}
                openCancle={isOpenCancelDialog}
                onOpenSubmitDialog={handleOpenSubmitDialog}
                onCloseSubmitDialog={handleCloseSubmitDialog}
                onOpenCancelDialog={handleOpenCancelDialog}
                onCloseCancelDialog={handleCloseCancelDialog}
                onClose={handleCloseReUpdateContractDialog}
                contractId={contractIdDialog}
                loadData={loadData}
            />
        </Container>
    );
};

export default ContractListWithOwner;

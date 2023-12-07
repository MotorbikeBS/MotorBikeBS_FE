import React, { ReactNode, useState } from 'react';
import { Box, Button, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from '@mui/material';
import { ClearRounded } from '@mui/icons-material';
import './style/_style.scss';
import { useAppDispatch } from '../../../../services/store/store';
import useFormatCurrency from '../../../../hooks/useFormatCurrency';
import { ISelectRowValuation } from '../../../../models/Valuation/Valuation';
import { cancleValuation } from '../../../../services/features/valuation/valuationSlice';
import CreateNegoInforDialogByStore from '../../negotiation-dialog-store/CreateNegoInforDialogByStore';

interface NegotiationInforModalProps {
    isOpen: boolean;
    onClose: () => void;
    loadingData: () => void;
    data: ISelectRowValuation | null;
}

const ValuationInforModalByStore: React.FC<NegotiationInforModalProps> = ({
    isOpen,
    onClose,
    loadingData,
    data,
}) => {
    const dispatch = useAppDispatch();
    const formatPrice = useFormatCurrency();

    const [valuationIdDialog, setValuationIdDialog] = useState<number | null>(null)
    const [isOpenContractDialog, setIsOpenContractDialog] = useState(false)
    const [isOpenSubmitDialog, setIsOpenSubmitDialog] = useState(false)
    const [isOpenCancelDialog, setIsOpenCancelDialog] = React.useState(false);

    const handleOpenCreateContractDialog = (valuationId: number) => {
        setValuationIdDialog(valuationId)
        setIsOpenContractDialog(true)
    }
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
    const handleCloseCreateContractDialog = () => {
        setIsOpenContractDialog(false)
        setIsOpenSubmitDialog(false);
        setIsOpenCancelDialog(false);
    };

    const createData = (label: string, value: ReactNode | string) => ({
        label,
        value,
    });

    const rows = [
        createData('Tên Xe', data?.motorName),
        createData('Số đăng ký', data?.certificateNumber),
        createData('Năm đăng ký', data?.year ? data.year.toLocaleString() : 'N/A'),
        createData('Giá ban đầu',
            <Typography fontWeight='bold'>
                {data?.price !== undefined ? formatPrice(data.price) : 'N/A'}
            </Typography>
        ),
        createData('Giá đề xuất',
            <Typography fontWeight='bold'>
                {data?.storePrice !== undefined ? formatPrice(data.storePrice) : 'N/A'}
            </Typography>
        ),
        createData('Tên chủ xe', data?.ownerName),
        createData('Số điện thoại chủ xe', data?.ownerPhone),
        createData('Địa chỉ chủ xe', data?.ownerAddress),
        createData('Nội dung', data?.noteValuation),
        createData('Trạng thái yêu cầu', (
            data?.valuationStatus === 'PENDING' ? (
                <Typography color='red' fontWeight='700'>
                    Đang Chờ
                </Typography>
            ) : data?.valuationStatus === 'ACCEPT' ? (
                <Typography color='green' fontWeight='700'>
                    Đã Duyệt
                </Typography>
            ) : (
                <Typography color='black' fontWeight='700'>
                    Chưa Xác Định
                </Typography>
            )
        )),
        createData('Trạng thái xe', (
            data?.motorStatus === 'CONSIGNMENT' || data?.motorStatus === 4 ? (
                <Typography color='#E6A160' fontWeight='700'>
                    KÝ GỞI
                </Typography>
            ) : data?.motorStatus === 'NON-CONSIGNMENT' || data?.motorStatus === 5 ? (
                <Typography color='green' fontWeight='700' >KHÔNG KÍ GỞI</Typography>
            ) : (
                <Typography sx={{ color: '#3D609A' }}>CHƯA XÁC ĐỊNH</Typography>
            )
        )),
    ];

    const [isConfirmationModalOpen, setConfirmationModalOpen] = useState(false);

    const handleCancleValuation = () => {
        setConfirmationModalOpen(true);
    };

    const handleConfirmCancleValuation = () => {
        if (data && data.id) {
            dispatch(cancleValuation({ valuationId: data.id }))
                .then(() => {
                    loadingData();
                    setTimeout(() => {
                        onClose();
                    }, 1000);
                });
        }
        setConfirmationModalOpen(false)
    };

    return (
        <div>
            <Modal open={isOpen} onClose={onClose}>
                <div className='modal-container'>
                    <div className='modal-header'>
                        <Typography variant="h6" gutterBottom fontWeight='700'>
                            Thông tin yêu cầu
                        </Typography>
                        <div className='header-btn-close'>
                            <Button onClick={onClose}>
                                <ClearRounded />
                            </Button>
                        </div>
                    </div>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableBody>
                                {rows.map((row, index) => (
                                    <TableRow key={index}>
                                        <TableCell component="th" scope="row"
                                            sx={{
                                                fontWeight: '700'
                                            }}
                                        >
                                            {row.label}
                                        </TableCell>
                                        <TableCell align="left">{row.value}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    {data?.valuationStatus === 'PENDING' &&
                        (
                            <Box className='btn-negotiation-status'>
                                <Button
                                    variant="contained"
                                    color="error"
                                    onClick={handleCancleValuation}
                                >
                                    Hủy giao dịch
                                </Button>
                            </Box>
                        )}
                    {data?.valuationStatus === 'ACCEPT' && (
                        <Box className='btn-negotiation-status'>
                            <Button
                                variant="contained"
                                color="success"
                                onClick={(() => handleOpenCreateContractDialog(
                                    data.id
                                ))}
                            >
                                Tạo thông tin biên nhận
                            </Button>
                        </Box>
                    )}

                </div>
            </Modal>

            <Modal open={isConfirmationModalOpen} onClose={() => setConfirmationModalOpen(false)}>
                <div className='confirmation-modal-container'>
                    <Typography variant="h6" gutterBottom fontWeight='700'>
                        Xác nhận hủy giao dịch
                    </Typography>
                    <Typography>
                        Bạn có chắc chắn muốn hủy giao dịch này?
                    </Typography>
                    <Button
                        variant="outlined"
                        color="error"
                        onClick={handleConfirmCancleValuation}
                    >
                        Xác nhận
                    </Button>
                    <Button
                        variant="outlined"
                        color="primary"
                        onClick={() => setConfirmationModalOpen(false)}
                    >
                        Hủy
                    </Button>
                </div>
            </Modal>

            <CreateNegoInforDialogByStore
                open={isOpenContractDialog}
                openSubmit={isOpenSubmitDialog}
                openCancle={isOpenCancelDialog}
                onOpenSubmitDialog={handleOpenSubmitDialog}
                onCloseSubmitDialog={handleCloseSubmitDialog}
                onOpenCancelDialog={handleOpenCancelDialog}
                onCloseCancelDialog={handleCloseCancelDialog}
                onClose={handleCloseCreateContractDialog}
                valuationId={valuationIdDialog}
            />
        </div>
    );
};

export default ValuationInforModalByStore;

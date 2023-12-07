import React, { ReactNode } from 'react'
import { ISelectRowPostingHistory } from '../../../../../models/PostBooting/PostBooting'
import {
    Button,
    Grid,
    Modal,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Typography
} from '@mui/material';
import './style/_style.scss'
import { ClearRounded } from '@mui/icons-material';
import ExtensionPostBootingDialog from '../../extension-post-booting-dialog/ExtensionPostBootingDialog';
import ChangeLevelPostBoostingDialog from '../../change-level-post-booting-dialog/ChangeLevelPostBoostingDialog';

interface IPostBootingInforDialog {
    isOpen: boolean;
    onClose: () => void
    loadData: () => void
    data: ISelectRowPostingHistory | null
}

const PostBoostingInforDialog: React.FC<IPostBootingInforDialog> = ({
    isOpen,
    onClose,
    data,
    loadData
}) => {

    const [boostingIdChanglevelDialog, setBoostingIdChanglevelDialog] = React.useState<number | null>(null)
    const [isOpenChangeLevelDialog, setIsOpenChangeLevelDialog] = React.useState(false)
    const [isOpenSubmitDialog, setIsOpenSubmitDialog] = React.useState(false)
    const [isOpenCancelDialog, setIsOpenCancelDialog] = React.useState(false)

    const [boostingIdDialog, setBoostingIdDialog] = React.useState<number | null>(null)
    const [isOpenExtendDialog, setIsOpenExtendDialog] = React.useState(false)
    const [isOpenSubmitExtendDialog, setIsOpenSubmitExtendDialog] = React.useState(false)
    const [isOpenCancelExtendDialog, setIsOpenCancelExtendDialog] = React.useState(false)


    if (!data) {
        return null;
    }

    const createData = (label: string, value: ReactNode) => ({ label, value });
    const rows = [
        createData("PostBoostingID", data.id),
        createData('Tên Xe', data.motorName),
        createData('Số đăng ký', data.certificateNumber),
        createData('Ngày đẩy bài', data.startTime ? data.startTime.toLocaleString() : 'N/A'),
        createData('Ngày hết hạn', data.endTime ? data.endTime.toLocaleString() : 'N/A'),
        createData('Gói đẩy bài',
            (
                data?.level === 1 ? (
                    <Typography color='#f7d71e' fontWeight='700'>Default</Typography>
                ) : data?.level === 2 ? (
                    <Typography color='#63f2ab' fontWeight='700'>Medium</Typography>
                ) : data?.level === 3 ? (
                    <Typography color='#057a40' fontWeight='700'>Premium</Typography>
                )
                    : (
                        <></>
                    )
            )
        ),
        createData('Số coin đã trừ', (
            <Typography color='red' fontWeight='700'>-{data.qty} BS-COIN</Typography>

        )),
        createData('Trạng thái đẩy bài', (
            data?.status === 'ACCEPT' ? (
                <Typography color='green' fontWeight='700'>ĐANG ĐẨY BÀI</Typography>
            ) : data?.status === 'CANCEL' ? (
                <Typography color='red' fontWeight='700'>Hết Hạn</Typography>
            ) : (
                <></>
            )
        ))
    ]


    const handleOpenChangeLevelDialog = (boostingId: number) => {
        setBoostingIdChanglevelDialog(boostingId)
        setIsOpenChangeLevelDialog(true)
    }
    const handleCloseChangLevelDialog = () => {
        setIsOpenChangeLevelDialog(false)
        setIsOpenSubmitDialog(false)
        setIsOpenCancelDialog(false)
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

    const handleOpenExtendDialog = (boostingId: number) => {
        setBoostingIdDialog(boostingId)
        setIsOpenExtendDialog(true)
    }
    const handleCloseExtendDialog = () => {
        setIsOpenExtendDialog(false)
        setIsOpenSubmitExtendDialog(false);
        setIsOpenCancelExtendDialog(false);
    };
    const handleOpenSubmitExtendDialog = () => {
        setIsOpenSubmitExtendDialog(true);
    };

    const handleCloseSubmitExtendDialog = () => {
        setIsOpenSubmitExtendDialog(false);
    };
    const handleOpenCancelExtendDialog = () => {
        setIsOpenCancelExtendDialog(true);
    };
    const handleCloseCancelExtendDialog = () => {
        setIsOpenCancelExtendDialog(false);
    };

    return (
        <>
            <Modal
                open={isOpen}
                onClose={onClose}
            >
                <div className='modal-container'>
                    <div className='modal-header'>
                        <Typography variant="h4" gutterBottom fontWeight='700'>
                            Thông tin đẩy bài {data.motorName}
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
                                {rows.map((row) => (
                                    <TableRow key={row.label}>
                                        <TableCell component="th" scope="row">
                                            {row.label}
                                        </TableCell>
                                        <TableCell align="left">{row.value}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <div
                        className='posting-history-action'>
                        <Grid item>
                            <Button
                                variant="contained"
                                color="success"
                                onClick={(() => {
                                    handleOpenExtendDialog(
                                        data.id
                                    )
                                })}
                            >
                                Gia hạn
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button
                                variant="contained"
                                color="error"
                                onClick={(() => {
                                    handleOpenChangeLevelDialog(
                                        data.id
                                    )
                                })}
                            >
                                Đổi gói
                            </Button>
                        </Grid>
                    </div>
                </div>
            </Modal>
            <ExtensionPostBootingDialog
                open={isOpenExtendDialog}
                onClose={handleCloseExtendDialog}
                openSubmit={isOpenSubmitExtendDialog}
                openCancle={isOpenCancelExtendDialog}
                onOpenSubmitDialog={handleOpenSubmitExtendDialog}
                onCloseSubmitDialog={handleCloseSubmitExtendDialog}
                onOpenCancelDialog={handleOpenCancelExtendDialog}
                onCloseCancelDialog={handleCloseCancelExtendDialog}
                boostingId={boostingIdDialog}
                loadingData={loadData}
            />

            <ChangeLevelPostBoostingDialog
                open={isOpenChangeLevelDialog}
                onClose={handleCloseChangLevelDialog}
                openSubmit={isOpenSubmitDialog}
                openCancle={isOpenCancelDialog}
                onOpenSubmitDialog={handleOpenSubmitDialog}
                onCloseSubmitDialog={handleCloseSubmitDialog}
                onOpenCancelDialog={handleOpenCancelDialog}
                onCloseCancelDialog={handleCloseCancelDialog}
                boostingId={boostingIdChanglevelDialog}
                loadingData={loadData}
            />
        </>
    )
}

export default PostBoostingInforDialog
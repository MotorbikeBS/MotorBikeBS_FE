import React, { ReactNode, useState } from 'react'
import { ISelectRowReportStore } from '../../../../../models/Report/Report';
import { Button, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from '@mui/material';
import { ClearRounded } from '@mui/icons-material';
import './../style/style.scss'
import FullScreenReportImage from './FullScreenReportImage';
type IReportInforDialogProps = {
    isOpen: boolean
    onClose: () => void
    data: ISelectRowReportStore | null
    loadData: () => void
}
const ReportInformationDialog: React.FC<IReportInforDialogProps> = ({
    isOpen,
    onClose,
    data,
    loadData
}) => {
    const [fullscreenOpen, setFullscreenOpen] = useState(false)

    if (!data) {
        return null;
    }
    const createData = (label: string, value: ReactNode) => ({ label, value });
    const rows = [
        createData('Report ID', data.id),
        createData('Bằng chứng', (
            <div className='report image'>
                <img
                    src={data.imageReport[0]}
                    className='report image'
                    alt='image report'
                    style={{ width: '80px', height: 'auto' }}
                    onClick={() => setFullscreenOpen(true)}
                />

            </div>
        )),
        createData('Tiêu đề', data.title),
        createData('Nội dung', data.description),
        createData('Cửa hàng bị báo cáo', data.reportStore),
        createData('Số điện thoại cửa hàng', data.storePhone)
    ]
    return (
        <>
            <Modal
                open={isOpen}
                onClose={onClose}
            >
                <div className='modal-container'>
                    <div className='modal-header'>
                        <Typography variant="h4" gutterBottom fontWeight='700'>
                            Thông tin báo cáo cửa hàng: {data.reportStore}
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
                </div>
            </Modal>

            <FullScreenReportImage
                isOpen={fullscreenOpen}
                onClose={() => setFullscreenOpen(false)}
                imageUrls={Array.isArray(data.imageReport) ? data.imageReport : []}
            />
        </>
    )
}

export default ReportInformationDialog
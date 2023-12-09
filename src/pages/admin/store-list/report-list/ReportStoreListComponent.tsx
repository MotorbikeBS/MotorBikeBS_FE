import React from 'react'
import { useAppDispatch, useAppSelector } from '../../../../services/store/store'
import { clearReport, getListReportStorebyAdmin } from '../../../../services/features/report/reportSlice'
import { IReport, ISelectRowReportStore } from '../../../../models/Report/Report'
import { Container, Paper, Typography } from '@mui/material'
import { DataGrid, GridRowParams } from '@mui/x-data-grid'
import { columns } from './table/TableReport'
import ReportInformationDialog from '../modal-component/report-information-dialog/ReportInformationDialog'

const ReportStoreListComponent = () => {
    const dispatch = useAppDispatch()
    const { reportStores, loading } = useAppSelector((state) => state.report)

    const [selectedRow, setSelectedRow] = React.useState<ISelectRowReportStore | null>(null);
    const [isInforModalOpen, setIsInforModalOpen] = React.useState(false);

    const loadData = () => {
        dispatch(clearReport())
        dispatch(getListReportStorebyAdmin())
    }
    React.useEffect(() => {
        loadData()
    }, [dispatch])

    const handleRowDoubleClick = (params: GridRowParams) => {
        setSelectedRow(params.row as ISelectRowReportStore);
        setIsInforModalOpen(true);
    };
    const rows = React.useMemo(() => {
        return (
            reportStores?.map((report: IReport) => ({
                id: report?.reports?.[0]?.reportId || '',
                imageReport: report?.reports?.[0]?.reportImages[0]?.imageLink || '',
                title: report?.reports[0]?.title || '',
                description: report?.reports[0]?.description || '',
                reportStore: (report?.receiver?.storeDescriptions[0]?.storeName || []) || [],
                storePhone: (report?.receiver?.storeDescriptions[0]?.storePhone || []) || [],
                sender: report?.sender?.userName || '',
            })) || []
        );
    }, [reportStores]);
    return (
        <Container maxWidth='xl'>
            <Paper
                sx={{
                    marginBottom: '20px',
                    padding: '20px'
                }}
            >
                <Typography variant="h4" gutterBottom>
                    Danh sách cửa hàng bị báo cáo
                </Typography>
                <Typography fontSize="12px" gutterBottom color="red">
                    <strong>Lưu ý: </strong>Vui lòng nhấn đúp vào 1 hàng để xem
                    thông tin và cập nhật trạng thái.
                </Typography>
                <DataGrid
                    rows={rows ?? []}
                    columns={columns}
                    pageSizeOptions={[5, 10, 100]}
                    disableRowSelectionOnClick
                    onRowDoubleClick={handleRowDoubleClick}
                    autoHeight
                    localeText={{
                        noRowsLabel: 'Không có dữ liệu',
                    }}
                    loading={loading}
                />
            </Paper>
            <ReportInformationDialog
                isOpen={isInforModalOpen}
                onClose={() => setIsInforModalOpen(false)}
                data={selectedRow}
                loadData={loadData}
            />
        </Container>
    )
}

export default ReportStoreListComponent
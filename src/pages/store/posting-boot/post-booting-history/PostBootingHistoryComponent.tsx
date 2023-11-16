import React from 'react'
import {
    useAppDispatch,
    useAppSelector
} from '../../../../services/store/store'
import {
    clearPostBoostingHistory,
    getHistoryPostBoosting
} from '../../../../services/features/posting/postBootingSlice'
import {
    IPostBooting,
    ISelectRowPostingHistory
} from '../../../../models/PostBooting/PostBooting'
import {
    Container,
    Paper,
    Typography
} from '@mui/material'
import { columns } from './table-history-post-boosting/TableHistoryPostBoostign'
import {
    DataGrid,
    GridRowParams
} from '@mui/x-data-grid'
import { format } from 'date-fns'
import PostBoostingInforDialog from './post-boosting-info-dialog/PostBoostingInforDialog'


const PostBootingHistoryComponent = () => {
    const distpatch = useAppDispatch()
    const { postBootings } = useAppSelector((state) => state.postBooting)

    const [selectedRow, setSelectedRow] = React.useState<ISelectRowPostingHistory | null>(null);
    const [isInforModalOpen, setIsInforModalOpen] = React.useState(false);

    const loadData = () => {
        distpatch(clearPostBoostingHistory())
        distpatch(getHistoryPostBoosting())
    }
    React.useEffect(() => {
        distpatch(clearPostBoostingHistory())
        distpatch(getHistoryPostBoosting())
    }, [distpatch])

    const handleRowDoubleClick = (params: GridRowParams) => {
        setSelectedRow(params.row as ISelectRowPostingHistory);
        setIsInforModalOpen(true);
    };

    const rows = React.useMemo(() => {
        return postBootings?.map((postBoosting: IPostBooting) => ({
            id: postBoosting?.motor?.motorId,
            motorName: postBoosting?.motor?.motorName,
            certificateNumber: postBoosting?.motor?.certificateNumber,
            startTime: format(new Date(postBoosting?.pointHistories[0]?.postBoostings[0]?.startTime), 'dd-MM-yyyy'),
            endTime: format(new Date(postBoosting?.pointHistories[0]?.postBoostings[0]?.endTime), 'dd-MM-yyyy'),
            level: postBoosting?.pointHistories[0]?.postBoostings[0]?.level,
            qty: postBoosting?.pointHistories[0]?.qty,
            status: postBoosting?.pointHistories[0]?.postBoostings[0]?.status
        }))
    }, [postBootings])

    return (
        <Container maxWidth='xl'>
            <Paper
                sx={{
                    marginBottom: '20px',
                    padding: '20px'
                }}
            >
                <Typography variant="h4" gutterBottom>
                    Lịch sử đẩy bài
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
                />
            </Paper>
            <PostBoostingInforDialog
                isOpen={isInforModalOpen}
                onClose={() => setIsInforModalOpen(false)}
                data={selectedRow}
                loadData={loadData}
            />
        </Container>
    )
}

export default PostBootingHistoryComponent
import React, { useEffect, useMemo, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../services/store/store'
import { Container, Paper, Typography } from '@mui/material'
import { DataGrid, GridRowParams } from '@mui/x-data-grid'
import { format } from 'date-fns'
import { columns } from './negotiation-table/NegotiationTableStore'
import NegotiationInforModalByStore from './negotiation-infor-modal/NegotiationInforModalByStore'
import useFormatCurrency from '../../../hooks/useFormatCurrency'
import { INegotiation, ISelectRowNegotiation } from '../../../models/Negotiation/Negotiation'
import { clearNegotiation, getNegotiationRequest } from '../../../services/features/negotiation/negotiationSlice'

const ListNegotiationMotorByStore = () => {
    const dispatch = useAppDispatch()
    const formatCurrency = useFormatCurrency()
    const { negotiations } = useAppSelector((state) => state.negotiation)

    const [selectedRow, setSelectedRow] = useState<ISelectRowNegotiation | null>(null)
    const [isModalOpen, setIsModalOpen] = useState(false);


    useEffect(() => {
        dispatch(clearNegotiation())
        dispatch(getNegotiationRequest())
    }, [dispatch])

    const loadingData = () => {
        dispatch(clearNegotiation())
        dispatch(getNegotiationRequest())
    }

    const pendingNegotiation = useMemo(() => {
        return (negotiations ?? []).filter((
            nego: INegotiation) => nego.negotiations[0].status === 'PENDING')
    }, [negotiations])

    const rows = useMemo(() => {
        return pendingNegotiation.map((nego: INegotiation) => ({
            id: nego.negotiations[0].negotiationId,
            motorName: nego.motor.motorName,
            images: nego.motor.motorbikeImages[0].imageLink,
            certificateNumber: nego.motor.certificateNumber,
            year: format(new Date(nego.motor.year), 'dd/MM/yyyy'),
            price: formatCurrency(nego.motor.price),
            ownerPrice: nego.negotiations[0]?.ownerPrice,
            storePrice: nego.negotiations[0]?.storePrice,
            ownerName: nego.receiver?.userName,
            ownerPhone: nego.receiver?.phone,
            ownerAddress: nego.receiver?.address,
            negotiationStatus: nego.negotiations[0].status,
            motorStatus: nego.motor?.motorStatus.title

        }))
    }, [pendingNegotiation, formatCurrency])


    const handleRowDoubleClick = (params: GridRowParams) => {
        setSelectedRow(params.row as ISelectRowNegotiation);
        setIsModalOpen(true)
    }

    return (
        <Container maxWidth="xl">
            <Paper style={{ marginBottom: '20px', padding: '20px' }}>
                <Typography variant="h4" gutterBottom>
                    Danh sách xe đang thương lượng
                </Typography>
                <Typography fontSize='12px' gutterBottom color='red'>
                    <strong>Lưu ý: </strong>Vui lòng nhấn đúp vào 1 hàng để xem thông tin cửa hàng đang thương lượng và cập nhật trạng thái
                </Typography>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSizeOptions={[5, 10, 100]}
                    disableRowSelectionOnClick
                    onRowDoubleClick={handleRowDoubleClick}
                />

            </Paper>
            <NegotiationInforModalByStore
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                data={selectedRow}
                loadingData={loadingData}
            />


        </Container>
    )
}

export default ListNegotiationMotorByStore
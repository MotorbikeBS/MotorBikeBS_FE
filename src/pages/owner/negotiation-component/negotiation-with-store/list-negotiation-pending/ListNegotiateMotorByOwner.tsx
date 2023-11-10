import React, { useEffect, useMemo, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../../../services/store/store'
import { Container, Paper, Typography } from '@mui/material'
import { DataGrid, GridRowParams } from '@mui/x-data-grid'
import { format } from 'date-fns'
import { columns } from '../negotiation-table/NegotiationTableOwner'
import { clearValuation, getValuationRequest } from '../../../../../services/features/valuation/valuationSlice'
import { ISelectRowValuation, IValuation } from '../../../../../models/Valuation/Valuation'
import ValuationInforModalByOwner from '../negotiation-infor-modal/NegotiationInforModalByOwner'

const ListNegotiateMotorByOwner = () => {
    const dispatch = useAppDispatch()
    const { valuations, loading } = useAppSelector(
        (state) => state.valuation,
    );
    const [selectedRow, setSelectedRow] =
        useState<ISelectRowValuation | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        dispatch(clearValuation());
        dispatch(getValuationRequest());
    }, [dispatch]);

    const loadingData = () => {
        dispatch(clearValuation());
        dispatch(getValuationRequest());
    };

    const pendingValuation = useMemo(() => {
        return (valuations ?? []).filter(
            (valua: IValuation) => valua.valuations[0].status === 'PENDING',
        );
    }, [valuations]);

    const rows = useMemo(() => {
        return pendingValuation.map((valua: IValuation) => ({
            id: valua.valuations[0]?.valuationId,
            images: valua.motor?.motorbikeImages[0]?.imageLink,
            certificateNumber: valua.motor?.certificateNumber,
            year: format(new Date(valua.motor.year), 'dd/MM/yyyy'),
            price: valua.motor?.price,
            storePrice: valua.valuations[0].storePrice,
            storeName: valua?.sender?.storeDesciptions[0]?.storeName,
            storePhone: valua?.sender?.storeDesciptions[0]?.storePhone,
            storeAddress: valua?.sender?.storeDesciptions[0]?.address,
            noteValuation: valua?.valuations[0]?.description,
            valuationStatus: valua.valuations[0]?.status,
            motorStatus: valua.motor?.motorStatus.title,
        }))
    }, [pendingValuation]);


    const handleRowDoubleClick = (params: GridRowParams) => {
        setSelectedRow(params.row as ISelectRowValuation);
        setIsModalOpen(true);
    };
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
                    autoHeight
                    localeText={{
                        noRowsLabel: 'Không có dữ liệu',
                    }}
                    loading={loading}
                />

            </Paper>

            <ValuationInforModalByOwner
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                data={selectedRow}
                loadingData={loadingData}
            />
        </Container>
    )
}

export default ListNegotiateMotorByOwner
import React, { useEffect, useMemo, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../../../services/store/store'
import { clearNegotiation, getNegotiationRequest } from '../../../../services/features/negotiation/negotiationSlice'
import { INegotiation, ISelectRowNegotiation } from '../../../../models/Negotiation/Negotiation'
import { format } from 'date-fns'
import { DataGrid, GridRowParams } from '@mui/x-data-grid'
import { Container, Paper, Typography } from '@mui/material'
import { columns } from '../valuation-table/ValuationTableStore'
import NegotiationInforModalByStore from '../valuation-infor-dialog/ValuationInforModalByStore'
import ValuationInforModalByStore from '../valuation-infor-dialog/ValuationInforModalByStore'
import { ISelectRowValuation, IValuation } from '../../../../models/Valuation/Valuation'
import { clearValuation, getValuationRequest } from '../../../../services/features/valuation/valuationSlice'

const ListMotorAcceptNegotiation = () => {
    const dispatch = useAppDispatch();
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
    const acceptValuation = useMemo(() => {
        return (valuations ?? []).filter(
            (valua: IValuation) => valua.valuations[0].status === 'ACCEPT',
        );
    }, [valuations]);

    const rows = useMemo(() => {
        return acceptValuation.map((valua: IValuation) => ({
            id: valua.valuations[0]?.valueationId,

        }));
    }, [acceptValuation]);

    const handleRowDoubleClick = (params: GridRowParams) => {
        setSelectedRow(params.row as ISelectRowValuation);
        setIsModalOpen(true);
    };


    return (
        <Container maxWidth="xl">
            <Paper style={{ marginBottom: '20px', padding: '20px' }}>
                <Typography variant="h4" gutterBottom>
                    Danh sách thương lượng
                </Typography>
                <Typography fontSize="12px" gutterBottom color="red">
                    <strong>Lưu ý: </strong>Vui lòng nhấn đúp vào 1 hàng để xem
                    thông tin cửa hàng đang thương lượng và cập nhật trạng thái
                </Typography>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSizeOptions={[5, 10, 100]}
                    disableRowSelectionOnClick
                    onRowDoubleClick={handleRowDoubleClick}
                    loading={loading}
                    autoHeight
                    localeText={{
                        noRowsLabel: 'Không có dữ liệu',
                    }}
                />
            </Paper>
            <ValuationInforModalByStore
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                data={selectedRow}
                loadingData={loadingData}
            />
        </Container>)
}

export default ListMotorAcceptNegotiation
import React, { useMemo } from 'react';
import { Container } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { columns } from './table/Table';
import {
    useAppDispatch,
    useAppSelector,
} from '../../../../services/store/store';
import { IMotorbike } from '../../../../models/Motorbike/Motorbike';
import { getMotorByOwnerId } from '../../../../services/features/motorbikeSlice';

const ListMotorByOwnerId = () => {
    const dispatch = useAppDispatch();
    const { motorbikes } = useAppSelector((state) => state.motorbikes);
    const { account } = useAppSelector((state) => state.account);

    React.useEffect(() => {
        dispatch(getMotorByOwnerId({ ownerId: Number(account?.userId) }));
    }, [dispatch, account?.userId]);

    const rows = useMemo(() => {
        return (motorbikes ?? []).map((motor: IMotorbike) => ({
        id: motor.motorId,
        certificateNumber: motor.certificateNumber,
        motorName: motor.motorName,
        odo: motor.odo,
        year: motor.year,
        price: motor.price,
        modelName: motor.model.modelName,
        motorType: motor.motorType.title,
        motorStatus: motor.motorStatus.title,
    }))}, [motorbikes])

    return (
        <Container maxWidth="xl">
            <div
                style={{
                    marginBottom: '32px',
                    width: '100%',
                }}
            >
                <DataGrid
                    sx={{
                        '& .css-gl260s-MuiDataGrid-columnHeadersInner': {
                            background: '#ccc',
                        },
                    }}
                    rows={rows}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 5 },
                        },
                    }}
                    pageSizeOptions={[5, 10, 100]}
                />
            </div>
        </Container>
    );
};

export default ListMotorByOwnerId;

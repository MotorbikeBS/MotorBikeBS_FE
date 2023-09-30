import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useAppDispatch, useAppSelector } from '../../../../services/store/store';
import { getAllUser } from '../../../../services/features/userSlice';
import { columns } from '../../../../common-components/table/table';
import { IUser } from '../../../../models/User/UserInterface';
import { Container, Typography } from '@mui/material';



export default function DataTable() {
    const dispatch = useAppDispatch()
    const { users } = useAppSelector((state) => state.users);

    React.useEffect(() => {
        dispatch(getAllUser());
    }, [dispatch]);

    const rows = (users ?? []).map((user: IUser) => ({
        id: user.userId,
        userName: user.userName,
        idCard: user.idCard,
        email: user.email,
        phone: user.phone,
        roleTitle: user.role.title,
        userVerifyAt: user.userVerifyAt,
        status: user.status
    }));
    // const rows = (Array.isArray(users) ? users : []).map((user: IUser) => ({
    //     id: user.userId,

    // }));
    return (
        <Container maxWidth='xl'>
            <div style={{
                marginBottom: '32px', height: 400, width: '100%'
            }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 5 },
                        },
                    }}
                    pageSizeOptions={[5, 10, 100, 200]}
                />
            </div>
        </Container>
    );
}

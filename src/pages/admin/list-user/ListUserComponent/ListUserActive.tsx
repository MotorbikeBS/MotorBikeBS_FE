import React, { useEffect, useMemo } from 'react'
import { useAppDispatch, useAppSelector } from '../../../../services/store/store'
import { getAllUser } from '../../../../services/features/user/userSlice'
import { IUser } from '../../../../models/User/UserInterface'
import { Container, Typography } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { columns } from './table/Table'

const ListUserActive = () => {
    const dispatch = useAppDispatch()
    const { users } = useAppSelector((state) => state.users)

    useEffect(() => {
        dispatch(getAllUser())
    }, [dispatch])

    const activeAccount = useMemo(() => {
        return (users ?? []).filter((user: IUser) => user.status === 'ACTIVE');
    }, [users])

    const rows = useMemo(() => {
        return activeAccount.map((user: IUser) => ({
            id: user.userId,
            userName: user.userName,
            email: user.email,
            idCard: user.idCard,
            phone: user.phone,
            userVerifyAt: user.userVerifyAt,
            roleTitle: user.role.title,
            status: user.status
        }))
    }, [activeAccount])

    return (
        <Container maxWidth='xl'>
            <div style={{
                marginBottom: '32px', height: 400, width: '100%'
            }}>
                <Typography variant="h4" gutterBottom marginBottom='2rem'>
                    Danh sách người dùng đang hoạt động
                </Typography>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 5 },
                        },
                    }}
                    disableRowSelectionOnClick
                    pageSizeOptions={[5, 10, 100]}
                />
            </div>
        </Container>
    )
}

export default ListUserActive
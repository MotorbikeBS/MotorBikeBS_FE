import React from 'react';
import { Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { rows, columns } from './table/table';
import '../style/style.scss'

const DateBookingComponent = () => {
    return (
        <>
            <Box m={6}>
                {/* <Typography variant="h5" className='title_date_booking'>Lịch hẹn</Typography> */}
                <DataGrid
                    rows={rows}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 5,
                            },
                        },
                    }}
                    pageSizeOptions={[5]}
                />
            </Box>
        </>
    );
};

export default DateBookingComponent;

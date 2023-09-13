import { Box, Button, Typography } from '@mui/material';
import * as React from 'react';
import './style/style.scss';
import { useNavigate } from 'react-router';

const PageNotFound = () => {
    const navigate = useNavigate()
    return (
        <div>

            <Box className="page-container">
                <Typography variant="h1" className='text-404'>
                    404
                </Typography>
                <Typography variant="h4" className='text-not-found'>
                    PAGE NOT FOUND
                </Typography>
                <Button variant='outlined' color='secondary' onClick={()=> navigate('/customer-home')}>Quay về trang chủ</Button>
            </Box>
        </div>
    )
}

export default PageNotFound;

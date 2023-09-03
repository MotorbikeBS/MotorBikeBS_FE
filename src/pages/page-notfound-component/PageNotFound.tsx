import { Box, Typography } from '@mui/material';
import * as React from 'react';
import './style/style.scss';
import MenuComponent from '../../common-components/menu-component/MenuComponent';

const PageNotFound = () => {
    return (
        <div>

            <Box className="page-container">
                <Typography variant="h1" className='text-404'>
                    404
                </Typography>
                <Typography variant="h4" className='text-not-found'>
                    PAGE NOT FOUND
                </Typography>
            </Box>
        </div>
    )
}

export default PageNotFound;

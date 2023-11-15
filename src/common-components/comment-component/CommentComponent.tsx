import React from 'react';
import {
    Box,
    Button,
    Paper,
    Rating,
    Typography,
} from '@mui/material';

import './style/style.scss';
import CreateComment from './CreateComment';

const CommentComponent = () => {
    

    return (
        <>
            <Paper elevation={3} className='cmt-paper'>
                <Typography variant="h5">Bình luận</Typography>
                <hr />
                <Box sx={{ marginBottom: 2}}>
                    <Button variant='contained'>Chọn Yêu cầu để bình luận</Button>
                </Box>
                <Box className='request-title'>
                    <Typography className='request-title-text'>Yêu cầu thương lượng giá - Wave</Typography>
                </Box>
                <Box>
                    <CreateComment />
                </Box>
            </Paper>

            <Paper
                elevation={3}
                sx={{
                    paddingY: 2,
                    paddingX: 4,
                    marginBottom: 2,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                <Box className="cmt-box">
                    <Box className="user-date">
                        <Typography className="user-date-name">
                            Minh Trí
                        </Typography>
                        <Typography sx={{ color: '#ccc' }}>
                            Đã chỉnh sửa
                        </Typography>
                        <Typography variant="subtitle1">14-11-2023</Typography>
                    </Box>
                    <Box className="info-cmt">
                        <Rating readOnly defaultValue={4.5} precision={0.5} />
                        <Typography>Xe đẹp đó.</Typography>
                        <Typography>Thông tin request</Typography>
                    </Box>
                </Box>
                <Box>
                    <Button variant="outlined">Chỉnh sửa</Button>
                </Box>
            </Paper>
        </>
    );
};

export default CommentComponent;

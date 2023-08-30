import { Box, Typography } from '@mui/material';
import React from 'react';
import './style/style.scss';
import { Facebook, Twitter, YouTube } from '@mui/icons-material'

const Footer = () => {
    const supportItems = [
        "Trung Tâm mua bán",
        "An toàn mua bán",
        "Liên hệ hỗ trợ"
    ];
    const aboutUsItems = [
        "Giới thiệu",
        "Quy chế hoạt động sàn",
        "Chính sách bảo mật",
        "Giải quyết tranh chấp",
        "Tuyển dụng",
        "Truyền thông",
        "Blog"
    ]

    return (
        <div>
            <Box className='footer-container'>
                <Box className='footer-content-1'>
                    <Typography className='footer-content-1-heading'>
                        Hỗ trợ khách hàng
                    </Typography>
                    {supportItems.map((item, index) => (
                        <Typography
                            key={index}
                            className='footer-content-1-text'
                        >
                            {item}
                        </Typography>
                    ))}
                </Box>
                <Box className='footer-content-2'>
                    <Typography className='footer-content-2-heading'>
                        Về chúng tôi
                    </Typography>
                    {aboutUsItems.map((item, index) => (
                        <Typography
                            key={index}
                            className='footer-content-2-text'
                        >
                            {item}
                        </Typography>
                    ))}
                </Box>
                <Box className='footer-content-3'>
                    <Typography className='footer-content-3-heading'>
                        Kết nối với chúng tôi
                    </Typography>
                    <Box className='footer-social-icons'>
                        <Facebook className='footer-social-icon' sx={{ fontSize: "30" }} />
                        <YouTube className='footer-social-icon' />
                        <Twitter className='footer-social-icon' />
                    </Box>
                </Box>

            </Box>
        </div>
    );
};

export default Footer;

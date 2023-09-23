import React, { useEffect, useState } from 'react';
import './style/style.scss';
import { Button, Container, Typography } from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import PageNotFound from '../../page-notfound/PageNotFound';
import { useAppDispatch } from '../../../services/store/store';
import { verifyEmail } from '../../../services/features/accountSlice';

// Import hình ảnh

const VerifyAccount = () => {
    const [validUrl, setValidUrl] = useState(false);
    const { id, token } = useParams<{ id?: string; token?: string }>();
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (id && token) {
            dispatch(verifyEmail({ id: parseInt(id), token }))
                .then(() => {
                    setValidUrl(true);
                })
                .catch((error) => {
                    console.error('Xác minh không thành công:', error);
                });
        }
    }, [dispatch, id, token]);

    return (
        <div className="container">
            {validUrl ? (
                <Container>
                    <div className="success-message">
                        <Typography variant='h4'>Verify Successfully</Typography>
                        <img
                            src={`${process.env.PUBLIC_URL}/Successfully.png`}
                            alt="Success_Verify"
                            className="verify-image"
                        />

                    </div>
                    <Link to="/login" className='btn-container'>
                        <Button className="login-button">Login</Button>
                    </Link>
                </Container>
            ) : (
                <Typography>
                    <PageNotFound />
                </Typography>
            )}
        </div>

    )
}

export default VerifyAccount;

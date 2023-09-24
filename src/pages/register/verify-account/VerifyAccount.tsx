import React, { useEffect, useState } from 'react';
import './style/style.scss';
import { Button, Container, Typography } from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../services/store/store';
import { verifyEmail } from '../../../services/features/accountSlice';
import PageNotFound from '../../page-notfound/PageNotFound';

const VerifyAccount = () => {
    const [validUrl, setValidUrl] = useState(false);
    const { id, token } = useParams<{ id?: string; token?: string }>();
    const dispatch = useAppDispatch();
    const { user, error, loading } = useAppSelector((state) => state.account);

    useEffect(() => {
        if (id && token) {
            dispatch(verifyEmail({ id: parseInt(id), token }))
                .then(() => {
                    setValidUrl(true);
                })
                .catch((error) => {
                    console.error('Xác minh không thành công:', error);
                    setValidUrl(false);
                });
        }
    }, [dispatch, id, token]);

    return (
        <div className="container">
            <Container>
                {validUrl ? (
                    error ? (
                        <div className="error-message">
                            <Typography variant='h3' color='red'>Xác minh không thành công</Typography>
                            <img
                                src={`${process.env.PUBLIC_URL}/err.png`}
                                alt="Error_Verify"
                                className="err-image"
                            />
                            {Object.values(error).map((errorMessage, index) => (
                                <Typography key={index} variant="body1" color="error">
                                    {errorMessage}
                                </Typography>

                            ))}
                            <Link to="/login" className="btn-container">
                                <Button className="login-button">Quay lại trang đăng ký </Button>
                            </Link>

                        </div>
                    ) : (
                        <div className="success-message">
                            <Typography variant='h3' color='green'>Xác minh thành công</Typography>
                            <img
                                src={`${process.env.PUBLIC_URL}/Successfully.png`}
                                alt="Success_Verify"
                                className="verify-image"
                            />
                            <Link to="/login" className="btn-container">
                                <Button className="login-button">Đăng nhập</Button>
                            </Link>
                        </div>
                    )
                ) : (
                    <div className="page-notpound">
                        <Typography variant="body1" color="error">
                            <PageNotFound />
                        </Typography>
                    </div>
                )}
            </Container>
        </div>
    );
};

export default VerifyAccount;

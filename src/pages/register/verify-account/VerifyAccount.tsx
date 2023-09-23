import React, { useEffect, useState } from 'react'
import { Button, Container, Typography } from '@mui/material'
import './style/style.scss'
import PageNotFound from '../../page-notfound/PageNotFound'
import { Link, useParams } from 'react-router-dom'
import { useAppDispatch } from '../../../services/store/store'
import { verifyEmail } from '../../../services/features/accountSlice'
const VerifyAccount = () => {
    const [validUrl, setValidUrl] = useState(false)
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
        <div>
            {validUrl ? (
                <Container>
                    <div>
                        <Typography>Verify Successfully</Typography>
                    </div>
                    <img src='../../../../public/Successfully.png' alt='Success_Verify' />
                    <Link to='/login'>
                        <Button>
                            Login
                        </Button>
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
export default VerifyAccount
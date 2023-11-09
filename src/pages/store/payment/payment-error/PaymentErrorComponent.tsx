import { Button, Container, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import './style/_style.scss'
const PaymentErrorComponent = () => {
    return (
        <Container>
            <div className="container">
                <div className="error-message">
                    <Typography variant='h3' color='red'>Nạp điểm thất bại</Typography>
                    <img
                        src={`${process.env.PUBLIC_URL}/err.png`}
                        alt="Error_Verify"
                        className="err-payment"
                    />
                    <Link to="/" className="btn-container">
                        <Button className="login-button">Quay lại</Button>
                    </Link>
                </div>
            </div>
        </Container>
    )
}

export default PaymentErrorComponent